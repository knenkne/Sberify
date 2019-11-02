const express = require('express');
const cheerio = require('cheerio');
const axios = require('axios');
const Genius = require('genius-api');

const router = express.Router();


const accessToken = 'WfzqmX6kK-z2ri3UwFyxrqNFFywEZvOACOwtPopGkuCaibh0UUmJq8ALhDrd2IJX'
const genius = new Genius(accessToken)

Genius.prototype.getSongLyrics = async function getSongLyrics(geniusUrl) {
  try {
    const response = await axios.get(geniusUrl)
    const text = await response.data
    const lyrics = parseSongHTML(text)

    console.log(lyrics.lyrics)
    return lyrics
  } catch (err) {
    return err
  }
}

function parseSongHTML(htmlText) {
  const $ = cheerio.load(htmlText)
  const lyrics = $('.lyrics').text().trim()
  const releaseDate = $('release-date .song_info-info').text()
  return {
    lyrics,
    releaseDate,
  }
}


router.get('/', function (req, res, next) {
  res.send('You have to pass specific URL "Artist-song-name-lyrics"');
});

router.get('/:url', async function (req, res, next) {
  res.send(await genius.getSongLyrics(`https://genius.com/${req.params.url}`));
});

module.exports = router;