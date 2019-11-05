const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require('mongoose');

const accessToken = 'CpEs40XlbNB7iEH8GVVReQBF1wYcfqLq7gWVmjoKt_0DzkE2dx9bs_yjaX_NNhx6'
const axiosInstance = axios.create({
    baseURL: 'https://api.genius.com',
    timeout: 3000,
    headers: {
        Authorization: `Bearer ${accessToken}`
    }
});

const Schemas = {
    artist: mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        name: String,
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
    const name = $('.header_with_cover_art-primary_info-title').text().trim()
    const lyrics = $('.lyrics').text().trim()
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

    normalizeName(name) {
        return name.split('').map((letter) => letter === '-' ? ' ' : letter).join('')
    }

    getArtist(name) {
        const normalizedName = this.normalizeName(name)

        return this.models.artists.findOne({ name: normalizedName }, (err, artist) => artist)
    }

    getFavoriteArtists() {
        return this.models.favoriteArtists.find({}, (err, artists) => artists)
    }

    async addArtistToFavorites(name) {
        const normalizedName = this.normalizeName(name)

        if (await this.models.favoriteArtists.exists({
                name: normalizedName
            })) {
            return `Favorite artist is already exists`
        }

        const favoriteArtist = new this.models.favoriteArtists({
            _id: new mongoose.Types.ObjectId(),
            name: normalizedName
        })

        return favoriteArtist.save()
            .then((result) => result)
            .catch((err) => err)
    }

    async removeArtistFromFavorites(name) {
        const normalizedName = this.normalizeName(name)

        return this.models.favoriteArtists.deleteOne({ name: normalizedName })
            .then((result) => result)
            .catch((err) => err)
    }

    async getSongFromGenius(url) {
        try {
            const songPage = await axios.get(url)
            const songPageText = await songPage.data
            const songPageHTML = cheerio.load(songPageText)
            
            const name = songPageHTML('.header_with_cover_art-primary_info-title')
                .text()
                .trim()
 
            const artist = songPageHTML('.header_with_cover_art-primary_info-primary_artist')
                .text()
                .trim()

            const geniusQuery = await axiosInstance.get(`https://api.genius.com/search?q=${new URLSearchParams(name).toString()}+${new URLSearchParams(artist).toString()}`)
            const songs = await geniusQuery.data
            const songID = songs.response.hits.find((hit) => hit.result.primary_artist.name === artist).result.id


            const musicPlayer = await axios.get(`https://genius.com/songs/${songID}/apple_music_player`)
            const musicPlayerText = await musicPlayer.data
            const musicPlayerHTML = cheerio.load(musicPlayerText)
            const songPlayerUrl = musicPlayerHTML('apple-music-player').attr('preview_track') ? JSON.parse(musicPlayerHTML('apple-music-player').attr('preview_track')).preview_url : null

            return ({name,  songPlayerUrl})

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
            
            const date = songPageHTML('.header_with_cover_art-primary_info .metadata_unit')
                .text()
                .replace('Released ', '')
                .trim()

            const image = songPageHTML('.cover_art-image').attr('src')

            const songsUrls = songPageHTML('.u-display_block')
                .map((index, song) => songPageHTML(song)
                .attr('href'))
                .get()

            const songs = await Promise.all(songsUrls.map(async (songUrl) => await this.getSongFromGenius(songUrl)))

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
        const response = await axiosInstance.get(`https://api.genius.com/search?q=${new URLSearchParams(name).toString()}`)
        const data = await response.data
        const artistID = data.response.hits.find((hit) => hit.result.primary_artist.name === name).result.primary_artist.id
        
        console.log(artistID)
        if (!artistID) {
            console.log(`There is no artist ${name}`)
            return
        }
        return artistID
    }

    async getArtistInfoFromGenius(id) {
        const response = await axiosInstance.get(`https://api.genius.com/artists/${id}?text_format=plain`)
        const data = await response.data
        const description = data.response.artist.description.plain
        const image = data.response.artist.image_url
        const headerImage = data.response.artist.header_image_url
        const facebook = data.response.artist.facebook_name 
        const twitter = data.response.artist.twitter_name
        const instagram = data.response.artist.instagram_name

        return ({description, facebook, twitter, instagram, image, headerImage})
    }

    async getArtistFromGenius(url) {
        try {
            const artistPage = await axios.get(url)
            const artistPageText = await artistPage.data
            const artistPageHTML = cheerio.load(artistPageText)

            const name = artistPageHTML('.profile_identity-name_iq_and_role_icon')
                .text()
                .trim()

            const albumsUrls = artistPageHTML('.vertical_album_card')
                .map((index, album) => artistPageHTML(album)
                .attr('href'))
                .get()


            const id = await this.getArtistIdFromGenius(name)
            const info = await this.getArtistInfoFromGenius(id)
            const albums = await Promise.all(albumsUrls.map(async (albumUrl) => await this.getAlbumFromGenius(albumUrl)))

            console.log({name, ...info, albums})
            return ({name, ...info, albums})

        } catch (err) {
            return err
        }
    }

    async saveArtistFromGeniusToDB(url) {
        const data = await this.getArtistFromGenius(url) 
        const artist = await new this.models.artists({
            _id: new mongoose.Types.ObjectId(),
            name: data.name,
            instagram_name: data.instagram,
            facebook_name: data.facebook,
            description: data.description,
            image: data.image,
            image_header: data.headerImage,
            albums: data.albums
        })

        return await artist.save()
            .then((result) => result)
            .catch((err) => err)
    }
}

const sberify = new Sberify(Schemas, Models)

// sberify.saveArtistFromGeniusToDB('https://genius.com/artists/saosin')

module.exports = sberify