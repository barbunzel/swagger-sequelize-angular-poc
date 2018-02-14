(function () {
  angular
    .module('practicaltest', ['ngResource', 'ngRoute', 'ui.bootstrap'])
    .config(['$routeProvider', '$locationProvider', 
      function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider
          .when('/', {
            templateUrl: '/views/home.html',
            controller: 'MainController as vm'
          })
          .when('/add', {
            templateUrl: '/views/new.html',
            controller: 'modalctrl as $ctrl'
          })
          .when('/edit/:id', {
            templateUrl: '/views/home.html',
            controller: 'MainController as vm'
          })
          .when('/delete/:id', {
            templateUrl: '/views/home.html',
            controller: 'MainController as vm'
          })
          .otherwise({ redirectTo: '/' });
      }]);
})();
