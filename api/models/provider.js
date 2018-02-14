'use strict';

var Sequelize = require('sequelize');

module.exports = function (sequelize) {
  sequelize.define('Provider', {
    name: {
      type: Sequelize.STRING
    }
  });
}
