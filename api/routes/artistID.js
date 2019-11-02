var express = require('express');
const axios = require('axios');
const Genius = require('genius-api');

var router = express.Router();

const accessToken = 'WfzqmX6kK-z2ri3UwFyxrqNFFywEZvOACOwtPopGkuCaibh0UUmJq8ALhDrd2IJX'
const genius = new Genius(accessToken)

Genius.prototype.getArtistID = async function getArtistID(name) {
  const parsedName = name.replace('-', ' ').toLowerCase()

  console.log(this)
  try {
    const response = await axios.get(`https://api.genius.com/search?q=${parsedName}`, {
      headers: {
        Authorization: this.AuthHeader.Authentication,
      }
    })

    const hits = await response.data.response.hits

    for (const hit of hits) {
      if (hit.type === 'song' && hit.result.primary_artist.name.toLowerCase() === parsedName) {
        return hit.result.primary_artist.id.toString()
      }
    }

  } catch (err) {
    return err
  }
}

router.get('/', function(req, res, next) {
  res.send('You have to pass specific URL "Artist"')
})

router.get('/:url', async function(req, res, next) {
  res.send(await genius.getArtistID(req.params.url))
})

module.exports = router;
