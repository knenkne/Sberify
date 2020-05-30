const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const mongoose = require('mongoose')
const prerender = require('prerender-node')

const config = require(path.join(__dirname, 'api/config/db'))

const indexRouter = require(path.join(__dirname, 'api/routes/index'))
const artistRouter = require(path.join(__dirname, 'api/routes/artist'))
const albumRouter = require(path.join(__dirname, 'api/routes/album'))
const songRouter = require(path.join(__dirname, 'api/routes/song'))

const PORT = process.env.PORT || 5000

mongoose.connect(config.url, {
  autoIndex: false,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false
})

express()
  .use(prerender)
  .use(bodyParser.text())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(logger('dev'))
  .use('/api', indexRouter)
  .use('/api/artist', artistRouter)
  .use('/api/album', albumRouter)
  .use('/api/song', songRouter)
  .use(express.static(path.join(__dirname, 'build')))
  .set('views', path.join(__dirname, 'api/views'))
  .set('view engine', 'pug')
  .get('/*', (req, res) =>
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
  )
  .listen(PORT, () => console.log(`Listening on ${PORT}`))
