const express = require('express')
const sberify = require('../sberify')

const router = express.Router()

router.get('/', (req, res, next) => {
  res.send('You have to pass specific URL "Album"')
})

router.get('/:name', async (req, res, next) => {
  res.send(await sberify.getAlbum(req.params.name))
})

module.exports = router
