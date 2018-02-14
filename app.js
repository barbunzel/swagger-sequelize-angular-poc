'use strict';

var SwaggerExpress = require('swagger-express-mw');
var Sequelize = require('sequelize');
var path = require('path');
var express = require('express');
var app = express();

var db = require('./api/models');
module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function (err, swaggerExpress) {
  if (err) { throw err; }

  db.sequelize.sync();

  // install middleware
  swaggerExpress.register(app);

  app.use(express.static(__dirname + '/client'));
  app.get('/', function (req, res) {
    res.sendFile(path.resolve('./client/views/index.html'));
  });

  var port = process.env.PORT || 10010;
  app.listen(port);
});
