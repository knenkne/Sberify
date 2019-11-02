var express = require('express');
var router = express.Router();

router.get('/api', function(req, res, next) {
  res.render('index', { title: 'Sberify' });
});

module.exports = router;
