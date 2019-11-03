const mongoose = require('mongoose');
const express = require('express');
const sberify = require('../sberify');

const router = express.Router();


router.get('/', (req, res, next) => {
    // console.log(sberify.models)
    // sberify.Schemas.favorite_arists.find({}, (err, data) => {
    //     res.send(data)
    // })
})

router.post('/:artist', async function (req, res, next) {
    res.send(await sberify.addArtistToFavorites(req.params.artist))
})

module.exports = router;