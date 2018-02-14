(function () {
  angular
    .module('practicaltest')
    .factory('clientsService', clientsService);

    clientsService.$inject = ['$resource'];

    function clientsService($resource) {
      return $resource('', null, {
        findAll: {
          method: 'GET',
          url: '/api/v1/clients/',
          isArray: true
        },
        insert: {
          method: 'POST',
          url: '/api/v1/clients',
          params: {
            name: '@name',
            email: '@email',
            phone: '@phone',
            providers: '@providers'
          }
        },
        findOne: {
          method: 'GET',
          url: '/api/v1/clients/:id'
        },
        update: {
          method: 'PUT',
          url: '/api/v1/clients/:id',
          params: {
            id: '@id'
          }
        },
        delete: {
          method: 'DELETE',
          url: '/api/v1/clients/:id',
          params: { id: '@id' }
        }
      });
    }
})();
