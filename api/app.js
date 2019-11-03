const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const config = require('./config/db');

const indexRouter = require('./routes/index');
const lyricsRouter = require('./routes/lyrics');
const artistIDRouter = require('./routes/artistID');
const songsRouter = require('./routes/songs');
const albumsRouter = require('./routes/albums');
const favoriteArtistsRouter = require('./routes/favorite-arists');

const app = express();
const Schema = mongoose.Schema;

// mongo DB connect
// mongoose.connect(config.url, { useUnifiedTopology: true, useNewUrlParser: true})
// const db = mongoose.connection
// console.log(db)
// db.on('error', console.error.bind(console, 'MongoDB connection error:'))
// db.on('connected', console.error.bind(console, 'MongoDB connection success'))
mongoose.connect(config.url, { useUnifiedTopology: true, useNewUrlParser: true })

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../build')));

app.use('/', indexRouter);
app.use('/lyrics', lyricsRouter);
app.use('/artistID', artistIDRouter);
app.use('/songs', songsRouter);
app.use('/albums', albumsRouter);
app.use('/favorite-artists', favoriteArtistsRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;