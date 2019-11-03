const express = require('express');
const sberify = require('../sberify');

const router = express.Router();


router.get('/', async (req, res, next) => {
    res.send(await sberify.getFavoriteArtists())
})

router.post('/add/:artist', async function (req, res, next) {
    res.send(await sberify.addArtistToFavorites(req.params.artist))
})

router.post('/remove/:artist', async function (req, res, next) {
    res.send(await sberify.removeArtistFromFavorites(req.params.artist))
})

module.exports = router;