const express = require('express')
const sberify = require('../sberify')

const router = express.Router()

router.get('/', function(req, res, next) {
  res.send('You have to pass specific URL "Artist-song-name-lyrics"')
})

router.get('/:url', async function(req, res, next) {
  res.send(
    await sberify.getSongLyrics(`https://genius.com/${req.params.url}-lyrics`)
  )
})

module.exports = router
