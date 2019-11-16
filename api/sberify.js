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
    twitter_name: String,
    instagram_name: String,
    facebook_name: String,
    description: String,
    image: String,
    image_header: String,
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

function parseSongHTML(htmlText) {
  const $ = cheerio.load(htmlText)
  const name = $('.header_with_cover_art-primary_info-title')
    .text()
    .trim()
  const lyrics = $('.lyrics')
    .text()
    .trim()
  return {
    name,
    lyrics
  }
}

class Sberify {
  constructor(schemas, models) {
    this.schemas = schemas
    this.models = models

    this.getFavoriteArtists = this.getFavoriteArtists.bind(this)
    this.addArtistToFavorites = this.addArtistToFavorites.bind(this)
  }

  normalizeName(name) {
    return name
      .split('')
      .map(letter => (letter === '-' ? ' ' : letter))
      .join('')
  }

  async getSongLyrics(url) {
    try {
      const response = await axios.get(url)
      const text = await response.data
      const lyrics = parseSongHTML(text)

      return lyrics
    } catch (err) {
      return err
    }
  }

  async getAlbum(name) {
    const normalizedName = this.normalizeName(name)

    try {
      const artist = await this.models.artists.findOne(
        {
          albums: {
            $elemMatch: {
              name: new RegExp(`^${normalizedName}$`, 'i')
            }
          }
        },
        (err, artist) => artist
      )

      const album = artist.albums.find(album => album.name === normalizedName)

      return {
        artist: {
          name: artist.name,
          albums: artist.albums,
          headerImage: artist.image_header
        },
        ...album
      }
    } catch (err) {
      return null
    }
  }

  async getArtist(name) {
    const normalizedName = this.normalizeName(name)

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
    const normalizedName = this.normalizeName(name)

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
    const normalizedName = this.normalizeName(name)

    return this.models.favoriteArtists
      .deleteOne({ name: normalizedName })
      .then(result => result)
      .catch(err => err)
  }

  async getSongFromGenius(url) {
    try {
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
      const songPlayerUrl = musicPlayerHTML('apple-music-player').attr(
        'preview_track'
      )
        ? JSON.parse(
            musicPlayerHTML('apple-music-player').attr('preview_track')
          ).preview_url
        : null

      return { name, songPlayerUrl }
    } catch (err) {
      return err
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
      return `Artist is already exists`
    }

    const artist = await new this.models.artists({
      _id: new mongoose.Types.ObjectId(),
      name: data.name,
      twitter_name: data.twitter,
      instagram_name: data.instagram,
      facebook_name: data.facebook,
      description: data.description,
      image: data.image,
      image_header: data.headerImage,
      albums: data.albums
    })

    return await artist
      .save()
      .then(result => console.log(result))
      .catch(err => err)
  }
}

const sberify = new Sberify(Schemas, Models)

// sberify.saveArtistFromGeniusToDB('https://genius.com/artists/Linkin-Park')

module.exports = sberify
