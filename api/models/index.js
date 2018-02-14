'use strict';

var config = require('../../config/config');
var Sequelize = require('sequelize');
var sequelize = new Sequelize(
  config.db.name,
  config.db.user,
  config.db.password,
  { logging: false }
);
var db = {};

sequelize.import('./client.js');
sequelize.import('./provider.js');

db.Client = sequelize.models.Client;
db.Provider = sequelize.models.Provider;

db.Client.belongsToMany(db.Provider, {through: 'Client_Provider'});
db.Provider.belongsToMany(db.Client, {through: 'Client_Provider'});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;