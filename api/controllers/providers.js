'use strict';

var models = require('../models');

module.exports = {
  getProviders: function (req, res) {
    models.Provider.findAll({
      raw: true
    }).then(function (providers) {
      res.json(providers)
    });
  },
  newProvider: function (req, res) {
    models.Provider.create(req.swagger.params.provider.value)
      .then(function (provider) {
        res.json(provider);
      });
  },
  updateProvider: function (req, res) {
    models.Provider.update(req.swagger.params.provider.value, {
      where: {
        id: req.swagger.params.providerId.value
      }
    }).then(function (rows) {
      res.json({
        success: rows[0] > 0 ? true : false
      });
    });
  },
  deleteProvider: function (req, res) {
    models.Provider.destroy({
      where: {
        id: req.swagger.params.providerId.value
      }
    }).then(function (rows) {
      res.json({
        success: rows > 0 ? true : false
      });
    });
  }
};
