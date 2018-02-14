(function () {
  angular
    .module('practicaltest')
    .controller('ModalCtrl', ModalCtrl);
    
    ModalCtrl.$inject = ['$uibModal', '$log', '$document'];

    function ModalCtrl($uibModal, $log, $document) {
      var $ctrl = this;

      $ctrl.animationsEnabled = true;

      $ctrl.open = function (data) {
        $uibModal.open({
          animation: $ctrl.animationsEnabled,
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: '/views/modal.html',
          controller: 'ModalInstanceCtrl',
          controllerAs: '$ctrl',
          resolve: {
            data: function () {
              return data;
            }
          }
        });
      };
    }
})();
