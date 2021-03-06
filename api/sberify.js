const axios = require('axios')
const cheerio = require('cheerio')
const mongoose = require('mongoose')

const accessToken =
  'H98Uk09tlFxhdKvbLR1JLWBmVtGxJqp_eXbI2bn-BWcboLT0JWSNHuzFnbOb5YpO'
const axiosInstance = axios.create({
  baseURL: 'https://api.genius.com',
  timeout: 15000,
  headers: {
    Authorization: `Bearer ${accessToken}`
  }
})

const Schemas = {
  artist: mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    socials: Object,
    description: String,
    image: String,
    headerImage: String,
    video_url: String,
    albums: Array
  }),
  favoriteArtist: mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String
  })
}

const Models = {
  artists: mongoose.model('artists', Schemas.artist),
  favoriteArtists: mongoose.model('favorite_artists', Schemas.favoriteArtist)
}

class Sberify {
  constructor(schemas, models) {
    this.schemas = schemas
    this.models = models

    this.getFavoriteArtists = this.getFavoriteArtists.bind(this)
    this.addArtistToFavorites = this.addArtistToFavorites.bind(this)
  }

  async updateLyrics(name, lyrics) {
    const normalizedName = decodeURIComponent(name)

    try {
      await this.models.artists.updateMany(
        {},
        {
          $set: {
            'albums.$[album].songs.$[song].lyrics': lyrics
          }
        },
        {
          arrayFilters: [
            {
              'album.songs': {
                $elemMatch: {
                  name: normalizedName
                }
              }
            },
            {
              'song.name': { $eq: normalizedName }
            }
          ]
        }
      )
    } catch (err) {
      return null
    }
  }

  async getSong(name) {
    const normalizedName = decodeURIComponent(name)

    try {
      const artist = await this.models.artists.findOne(
        {
          albums: {
            $elemMatch: {
              songs: {
                $elemMatch: {
                  name: normalizedName
                }
              }
            }
          }
        },
        (err, artist) => artist
      )

      const album = artist.albums.find(album =>
        album.songs.find(song => song.name === normalizedName)
      )
      const song = album.songs.find(song => song.name === normalizedName)

      return {
        artist: artist.name,
        artistImage: artist.headerImage,
        album,
        ...song
      }
    } catch (err) {
      return null
    }
  }

  async getAlbum(name) {
    const normalizedName = decodeURIComponent(name)

    try {
      const artist = await this.models.artists.findOne(
        {
          albums: {
            $elemMatch: {
              name: normalizedName
            }
          }
        },
        (err, artist) => artist
      )

      const album = artist.albums.find(album => album.name === normalizedName)

      return {
        artist: {
          name: artist.name,
          albums: artist.albums.filter(album => album.name !== normalizedName),
          headerImage: artist.headerImage
        },
        ...album
      }
    } catch (err) {
      return null
    }
  }

  async getArtists(name) {
    const normalizedName = decodeURIComponent(name)
    const artists = await this.models.artists.find(
      { name: new RegExp(`^${normalizedName}`, 'i') },
      (err, artists) => artists
    )

    return artists.slice(0, 3)
  }

  async getArtist(name) {
    const normalizedName = decodeURIComponent(name)
    const artist = await this.models.artists.findOne(
      { name: new RegExp(`^${normalizedName}$`, 'i') },
      (err, artist) => artist
    )

    return artist
  }

  getFavoriteArtists() {
    return this.models.favoriteArtists.find({}, (err, artists) => artists)
  }

  async addArtistToFavorites(name) {
    const normalizedName = decodeURIComponent(name)

    if (
      await this.models.favoriteArtists.exists({
        name: normalizedName
      })
    ) {
      return `Favorite artist is already exists`
    }

    const favoriteArtist = new this.models.favoriteArtists({
      _id: new mongoose.Types.ObjectId(),
      name: normalizedName
    })

    return favoriteArtist
      .save()
      .then(result => result)
      .catch(err => err)
  }

  async removeArtistFromFavorites(name) {
    const normalizedName = decodeURIComponent(name)

    return this.models.favoriteArtists
      .deleteOne({ name: normalizedName })
      .then(result => result)
      .catch(err => err)
  }

  async getSongFromGenius(url) {
    const songPage = await axios.get(url)
    const songPageText = await songPage.data
    const songPageHTML = cheerio.load(songPageText)

    const name = songPageHTML('.header_with_cover_art-primary_info-title')
      .text()
      .trim()

    const artist = songPageHTML(
      '.header_with_cover_art-primary_info-primary_artist'
    )
      .text()
      .trim()

    const lyrics = songPageHTML('.lyrics')
      .text()
      .trim()

    try {
      const geniusQuery = await axiosInstance.get(
        `https://api.genius.com/search?q=${new URLSearchParams(
          name
        ).toString()}+${new URLSearchParams(artist).toString()}`
      )
      const songs = await geniusQuery.data
      const songID = songs.response.hits.find(
        hit => hit.result.primary_artist.name === artist
      ).result.id

      const musicPlayer = await axios.get(
        `https://genius.com/songs/${songID}/apple_music_player`
      )
      const musicPlayerText = await musicPlayer.data
      const musicPlayerHTML = cheerio.load(musicPlayerText)
      const songPlayerUrl = JSON.parse(
        musicPlayerHTML('apple-music-player').attr('preview_track')
      ).preview_url

      return { name, songPlayerUrl, lyrics }
    } catch (err) {
      return { name, songPlayerUrl: null, lyrics }
    }
  }

  async getAlbumFromGenius(url) {
    try {
      const albumPage = await axios.get(url)
      const albumPageText = await albumPage.data
      const songPageHTML = cheerio.load(albumPageText)

      const name = songPageHTML('.header_with_cover_art-primary_info-title')
        .text()
        .trim()

      const date = songPageHTML(
        '.header_with_cover_art-primary_info .metadata_unit'
      )
        .text()
        .replace('Released ', '')
        .trim()

      const image = songPageHTML('.cover_art-image').attr('src')

      const songsUrls = songPageHTML('.u-display_block')
        .map((index, song) => songPageHTML(song).attr('href'))
        .get()

      const songs = await Promise.all(
        songsUrls.map(async songUrl => await this.getSongFromGenius(songUrl))
      )

      return {
        name,
        date,
        image,
        songs
      }
    } catch (err) {
      return err
    }
  }

  async getArtistIdFromGenius(name) {
    const response = await axiosInstance.get(
      `https://api.genius.com/search?q=${new URLSearchParams(name).toString()}`
    )
    const data = await response.data
    const artistID = data.response.hits.find(
      hit => hit.result.primary_artist.name === name
    ).result.primary_artist.id

    if (!artistID) {
      return `There is no artist ${name}`
    }
    return artistID
  }

  async getArtistInfoFromGenius(id) {
    const response = await axiosInstance.get(
      `https://api.genius.com/artists/${id}?text_format=plain`
    )
    const data = await response.data
    const description = data.response.artist.description.plain
    const image = data.response.artist.image_url
    const headerImage = data.response.artist.header_image_url
    const facebook = data.response.artist.facebook_name || null
    const twitter = data.response.artist.twitter_name || null
    const instagram = data.response.artist.instagram_name || null

    return { description, facebook, twitter, instagram, image, headerImage }
  }

  async getArtistFromGenius(url) {
    try {
      const artistPage = await axios.get(url)
      const artistPageText = await artistPage.data
      const artistPageHTML = cheerio.load(artistPageText)

      const name = artistPageHTML('.mini_card-subtitle')
        .first()
        .text()
        .trim()

      const albumsUrls = artistPageHTML('.vertical_album_card')
        .map((index, album) => artistPageHTML(album).attr('href'))
        .get()

      const id = await this.getArtistIdFromGenius(name)
      const info = await this.getArtistInfoFromGenius(id)
      const albums = await Promise.all(
        albumsUrls.map(
          async albumUrl => await this.getAlbumFromGenius(albumUrl)
        )
      )

      return { name, ...info, albums }
    } catch (err) {
      return err
    }
  }

  async saveArtistFromGeniusToDB(url) {
    const data = await this.getArtistFromGenius(url)

    if (await this.models.artists.exists({ name: data.name })) {
      throw new Error(`Error: ${data.name} already exists`)
    }

    if (data.name === 'Error') {
      throw new Error('Error: Not found on Genius')
    }

    const artist = await new this.models.artists({
      _id: new mongoose.Types.ObjectId(),
      name: data.name,
      socials: {
        twitter: data.twitter,
        instagram: data.instagram,
        facebook: data.facebook
      },
      description: data.description,
      image: data.image,
      headerImage: data.headerImage,
      albums: data.albums
    })

    return await artist
      .save()
      .then(result => result)
      .catch(() => {
        throw new Error('Error: GeniusAPI timeout')
      })
  }
}

const sberify = new Sberify(Schemas, Models)

module.exports = sberify
