
const path = require('path')
const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const config = require(path.join(__dirname, 'api/config/db'));

const artistRouter = require(path.join(__dirname, 'api/routes/artist'))

const PORT = process.env.PORT || 5000

mongoose.connect(config.url, { useUnifiedTopology: true, useNewUrlParser: true });


express()
  .use(express.static(path.join(__dirname, 'build')))
  .use('/api/artist', artistRouter)
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))