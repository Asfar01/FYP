var express = require("express");
var socket = require("socket.io");
var router = express.Router();
var serv = require("../bin/www");
// require=require('esm')(module)
// var http = require('http');
/* GET home page. */
router.get("/", function (req, res, next) {
  res.status(200).send(`<h1>Express server is running</h1>`);
});

module.exports = router;
