const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require('mongoose');


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
}

const sberify = new Sberify(Schemas, Models)

module.exports = sberify