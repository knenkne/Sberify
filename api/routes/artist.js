const mongoose = require('mongoose');
const express = require('express');

const router = express.Router();

const artistSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    instagram_name: String,
    facebook_name: String,
    description: String,
    image: String
})

const artistsModel = mongoose.model('artists', artistSchema)
console.log(artistsModel)

router.get('/', (req, res, next) => {
    res.send('You have to pass specific URL "Artist"')
})

router.get('/:name', function (req, res, next) {
    artistsModel.find({}, (err, data) => {
        res.send(data)
    });
})


module.exports = router;