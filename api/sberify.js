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

            // ADD NULL IF PLAYER DOESN'T EXIST
            const songPlayerUrl = JSON.parse(musicPlayerHTML('apple-music-player').attr('preview_track')).preview_url || null

            // console.table({name,  player_url: songPlayerUrl})

            return ({name,  player_url: songPlayerUrl})
        } catch (err) {
            return err
        }
    }

    async getAlbumFromGenius(url) {
        try {
            const albumPage = await axios.get(url)
            const albumPageText = await albumPage.data
            const songPageHTML = cheerio.load(albumPageText)

            const songsUrls = songPageHTML('.u-display_block').map((index, item) => songPageHTML(item).attr('href')).get()
            const songs = await Promise.all(songsUrls.map(async (songUrl) => await this.getSongFromGenius(songUrl)))
            console.log(songs)

        } catch (err) {
            return err
        }
    }
}

const sberify = new Sberify(Schemas, Models)

sberify.getAlbumFromGenius('https://genius.com/albums/Architects/Holy-hell')

module.exports = sberify