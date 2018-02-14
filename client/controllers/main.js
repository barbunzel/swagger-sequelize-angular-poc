(function () {
  angular
    .module('practicaltest')
    .controller('MainController', MainController);

    MainController.$inject = ['$window', 'clientsService'];

    function MainController($window, clientsService) {
      var vm = this;
      vm.clients = [];
      vm.property = '';
      vm.reverse = false;

      clientsService.findAll().$promise
        .then(function (response) {
          vm.clients = JSON.parse(JSON.stringify(response));
          vm.clients.forEach (function (i, index) {
            i.providers = i.providerNames.join(', ');
          });
        });

      vm.delete = function (client) {
        var message = 'Are you sure you want to continue?';
        if (action = confirm(message)) {
          clientsService.delete({ id: client.id }).$promise
            .then(function (success) {
              $window.location.href = '/';
            });
        }
      }

      vm.sortBy = function (property) {
        vm.reverse = (vm.property === property) ? !vm.reverse : false;
        vm.property = property;
      }
    }
})();
