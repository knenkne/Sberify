const axios = require('axios');
const cheerio = require('cheerio');
const Sberify = require('genius-api');

const accessToken = 'WfzqmX6kK-z2ri3UwFyxrqNFFywEZvOACOwtPopGkuCaibh0UUmJq8ALhDrd2IJX'
const sberify = new Sberify(accessToken)

const axiosInstance = axios.create({
    baseURL: 'https://api.genius.com',
    timeout: 3000,
    headers: {
        Authorization: `Bearer ${accessToken}`
    }
});

function parseSongHTML(htmlText) {
    const $ = cheerio.load(htmlText)
    const lyrics = $('.lyrics').text().trim()
    const releaseDate = $('release-date .song_info-info').text()
    return {
        lyrics,
        releaseDate,
    }
}

Sberify.prototype.getSongLyrics = async function getSongLyrics(geniusUrl) {
    try {
        const response = await axios.get(geniusUrl)
        const text = await response.data
        const lyrics = parseSongHTML(text)

        return lyrics
    } catch (err) {
        return err
    }
}

Sberify.prototype.getArtistID = async function getArtistID(name) {
    const parsedName = name.replace('-', ' ').toLowerCase()

    try {
        const response = await axiosInstance.get(`/search?q=${parsedName}`)
        const hits = await response.data.response.hits

        for (const hit of hits) {
            if (hit.type === 'song' && hit.result.primary_artist.name.toLowerCase() === parsedName) {
                return hit.result.primary_artist.id.toString()
            }
        }

    } catch (err) {
        return err
    }
}

Sberify.prototype.getSongs = async function getSongs(artistID) {
    try {
        const response = await axiosInstance.get(`/artists/${artistID}/songs?sort=popularity`)
        const songs = await response.data.response.songs.filter((song) => song.primary_artist.id === parseInt(artistID))

        return songs

    } catch (err) {
        return err
    }
}

Sberify.prototype.getAlbums = async function getAlbums(artistID) {
    const albums = []
    try {
        const response = await axiosInstance.get(`/artists/${artistID}/songs?per_page=25`)
        const songsIDs = await response.data.response.songs.filter((song) => song.primary_artist.id === parseInt(artistID)).map((song) => song.id)

        for (const songID of songsIDs) {
            const response = await axiosInstance.get(`/songs/${songID}?text_format=plain`)
            const album = await response.data.response.song.album

            console.log(album)

            albums.push(album)
        }

        return albums
    } catch (err) {
        return err
    }
}

module.exports = sberify