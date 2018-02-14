'use strict';

var models = require('../models');

module.exports = {
  getClients: function (req, res) {
    models.Client.findAll({
      raw: true,
      include: [{
        model: models.Provider,
        attributes: ['id', 'name'],
        through: {
          where: {}
        }
      }]
    }).then(function (clients) {
      clients = flatten(clients);
      
      res.json(clients)
    });
  },
  newClient: function (req, res) {
    models.Client.create(req.swagger.params.client.value)
      .then(function (client) {
        models.Provider.findAll({
          where: {
            id: req.swagger.params.client.value.providers
          }
        }).then(function (provider) {
          client.addProviders(provider)
            .then(function (client) {
              res.json({success: client ? true : false});
            });
        });
      });
  },
  getClient: function (req, res) {
    models.Client.findAll({
      where: {
        id: req.swagger.params.clientId.value
      },
      raw: true,
      include: [{
        model: models.Provider,
        attributes: ['id', 'name'],
        through: {
          where: {}
        }
      }]
    }).then(function (client) {
      client = flatten(client);
      res.json(client);
    });
  },
  updateClient: function (req, res) {
    models.Client.find({
      where: {
        id: req.swagger.params.clientId.value
      }
    }).then(function (client) {
      models.Provider.findAll({
        where: {
          id: req.swagger.params.client.value.providers
        }
      }).then(function (provider) {
        client.addProviders(provider)
          .then(function (client) {
            models.Client.update(req.swagger.params.client.value, {
              where: {
                id: req.swagger.params.clientId.value
              }
            }).then(function (rows) {
              res.json({
                success: rows[0] > 0 ? true : false
              });
            });
          });
      });
    });
  },
  deleteClient: function (req, res) {
    models.Client.destroy({
      where: {
        id: req.swagger.params.clientId.value
      }
    }).then(function (rows) {
      res.json({
        success: rows > 0 ? true : false
      });
    });
  }
};

function flatten(array) {
  var seen = {};
  array = array.filter(function (item) {
    var previous;

    if (seen.hasOwnProperty(item.id)) {
        previous = seen[item.id];
        previous.providerNames.push(item['Providers.name']);
        previous.providerIds.push(item['Providers.id']);

        return false;
    }

    if (!Array.isArray(item['Providers.name'])) {
        item.providerNames = [item['Providers.name']];
        item.providerIds = [item['Providers.id']];
    }

    seen[item.id] = item;

    return true;
  });

  return array;
}