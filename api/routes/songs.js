const express = require('express');
const sberify = require('../sberify')

const router = express.Router();


router.get('/', async function (req, res, next) {
    res.send('You have to pass specific URL "Artist"')
})

router.get('/:artistID', async function (req, res, next) {
    res.send(await sberify.getSongs(req.params.artistID))
})

module.exports = router;