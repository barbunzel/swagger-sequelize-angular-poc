(function () {
  angular
    .module('practicaltest')
    .factory('providersService', providersService);

    providersService.$inject = ['$resource'];

    function providersService($resource) {
      return $resource('', null, {
        findAll: {
          method: 'GET',
          url: '/api/v1/providers/',
          isArray: true
        },
        insertOne: {
          method: 'POST',
          url: '/api/v1/providers',
          params: {
            name: '@name'
          }
        },
        update: {
          method: 'PUT',
          url: '/api/v1/providers/:id',
          params: {
            id: '@id',
          }
        },
        delete: {
          method: 'DELETE',
          url: '/api/v1/providers/:id',
          params: { id: '@id' }
        }
      });
    }
})();
