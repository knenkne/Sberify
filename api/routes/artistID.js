const express = require('express');
const sberify = require('../sberify');

const router = express.Router();

router.get('/', function(req, res, next) {
  res.send('You have to pass specific URL "Artist"')
})

router.get('/:artistName', async function(req, res, next) {
  res.send(await sberify.getArtistID(req.params.artistName))
})

module.exports = router;
