const express = require('express');
const sberify = require('../sberify')

const router = express.Router();


router.get('/', function (req, res, next) {
  res.send('You have to pass specific URL "artistID"');
});

router.get('/:artistID', async function (req, res, next) {
  res.send(await sberify.getAlbums(`${req.params.artistID}`));
});

module.exports = router;