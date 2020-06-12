var express = require('express');
var socket = require('socket.io');
var router = express.Router();
var serv = require('../bin/www');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).send(`<h1>Express server is running</h1>`);
});

var io = socket(serv);
io.on('connection', function(socket) {
  console.log('made socket connection');
});


module.exports = router;
