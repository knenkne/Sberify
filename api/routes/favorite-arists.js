const mongoose = require('mongoose');
const express = require('express');

const router = express.Router();

const favoriteArtistSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String
})

const favoriteArtistModel = mongoose.model('favorite_artists', favoriteArtistSchema)

router.get('/', (req, res, next) => {
    res.send('Favorite artists')
})

router.get('/:id', function (req, res, next) {
    favoriteArtistModel.findById(req.params.id)
        .exec()
        .then((doc) => {
            console.log(doc)
            res.status(200).json(doc)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({error: err})
        })
})

router.post('/:artist', function (req, res, next) {
    const favoriteArtist = new favoriteArtistModel({
        _id: new mongoose.Types.ObjectId(),
        name: req.params.artist.split('').map((letter) => letter === '-' ? ' ' : letter).join('')
    })

    favoriteArtist.save()
        .then((result) => console.log(result))
        .catch((err) => console.log(err))
})

module.exports = router;