(function () {
  angular
    .module('practicaltest')
    .controller('ModalInstanceCtrl', ModalInstanceCtrl)

    ModalInstanceCtrl.$inject = [
      '$uibModalInstance',
      'providersService',
      'clientsService',
      '$window',
      'data'
    ];
    
    function ModalInstanceCtrl(
      $uibModalInstance,
      providersService,
      clientsService,
      $window,
      data
    ) {
      var $ctrl = this;
      $ctrl.providersSelected = [];
      $ctrl.okBtn = 'New Client';

      if (data) {
        $ctrl.client = data;
        $ctrl.providersSelected = data.providerIds;
        $ctrl.okBtn = 'Update Client';
      }

      providersService.findAll().$promise
        .then(function (response) {
          $ctrl.providers = JSON.parse(JSON.stringify(response));
        });

      $ctrl.addProvider = function (provider) {
        providersService.insertOne({name: provider}).$promise
          .then(function (response) {
            $ctrl.client.provider = '';
            $ctrl.providers.push(JSON.parse(JSON.stringify(response)));
          });
      };

      $ctrl.editProvider = function (provider) {
        $ctrl.providers[arrayObjectIndexOf($ctrl.providers, provider.id, 'id')]
          .editable = true;
      }

      $ctrl.updateProvider = function (provider) {
        providersService.update({id: provider.id}, provider).$promise
          .then(function (response) {
            var i = arrayObjectIndexOf($ctrl.providers, provider.id, 'id');
            $ctrl.providers[i].name = provider.name;
            $ctrl.providers[i].editable = false;
          });
      }

      $ctrl.deleteProvider = function (provider) {
        providersService.delete({id: provider.id}).$promise
          .then(function (response) {
            $ctrl.providers
              .splice(arrayObjectIndexOf($ctrl.providers, provider.id, 'id'), 1);
          });
      }

      $ctrl.toggleSelect = function toggleSelect(id) {
        var index = $ctrl.providersSelected.indexOf(id);
        
        if (index == -1) {
          $ctrl.providersSelected.push(id);
        } else {
          $ctrl.providersSelected.splice(index, 1);
        }
      }

      $ctrl.ok = function () {
        $ctrl.client.providers = $ctrl.providersSelected;
        if (data) {
          clientsService.update({id: data.id}, $ctrl.client).$promise
            .then(function (response) {
              $uibModalInstance.close();
              $window.location.href = '/';
            });
        } else {
          clientsService.insert($ctrl.client).$promise
            .then(function (response) {
              $uibModalInstance.close();
              $window.location.href = '/';
            });
        }
      };

      $ctrl.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };
    };

    function arrayObjectIndexOf(myArray, searchTerm, property) {
      for (var i = 0, len = myArray.length; i < len; i++) {
        if (myArray[i][property] === searchTerm) return i;
      }
      return -1;
    }
})();
