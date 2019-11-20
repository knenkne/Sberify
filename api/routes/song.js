const express = require('express')
const sberify = require('../sberify')

const router = express.Router()

router.get('/', function(req, res, next) {
  res.send('You have to pass specific URL "Artist-song-name-lyrics"')
})

router.get('/:name', async function(req, res, next) {
  res.send(await sberify.getSong(req.params.name))
})

router.post('/:name/updateLyrics', async function(req, res, next) {
  res.send(await sberify.updateLyrics(req.params.name))
})

module.exports = router
