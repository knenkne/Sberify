const express = require('express')
const sberify = require('../sberify')

const router = express.Router()

router.get('/', (req, res, next) => {
  res.send('You have to pass specific URL "Artist"')
})

router.get('/:name', async (req, res, next) => {
  res.send(await sberify.getArtist(req.params.name))
})

router.get('/find/:match', async (req, res, next) => {
  res.send(await sberify.getArtists(req.params.match))
})

router.put('/:name', async function(req, res, next) {
  try {
    await sberify.saveArtistFromGeniusToDB(
      `https://genius.com/artists/${req.params.name}`
    )
    res.send(`${req.params.name} was added`)

    // res.send(`${req.params.name} was added`)
  } catch (err) {
    res.status(400).send(err.message)
  }
})

module.exports = router
