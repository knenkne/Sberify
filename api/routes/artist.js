const express = require('express')
const sberify = require('../sberify')

const router = express.Router()

router.get('/', (req, res, next) => {
  res.send('You have to pass specific URL "Artist"')
})

router.get('/:name', async (req, res, next) => {
  res.send(await sberify.getArtist(req.params.name))
})

router.put('/:name', async function(req, res, next) {
  res.send(
    await sberify.saveArtistFromGeniusToDB(
      `https://genius.com/artists/${req.params.name}`
    )
  )
})

module.exports = router
