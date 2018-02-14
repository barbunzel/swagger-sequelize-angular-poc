'use strict';

var Sequelize = require('sequelize');

module.exports = function (sequelize) {
  sequelize.define('Client', {
    name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.STRING
    }
  });
}
