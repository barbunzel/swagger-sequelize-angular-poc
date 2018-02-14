(function () {
  angular
    .module('practicaltest')
    .filter('phoneFilter', function () {
      return function (phone) {
        if (!phone) {
          return '';
        }

        var value = phone.toString().trim().replace(/^\+/, '');

        if (value.match(/[^0-9]/)) {
          return phone;
        }

        var city;
        var number;

        city = value.slice(0, 3);
        number = value.slice(3);
        number = number.slice(0, 3) + '-' + number.slice(3);

        return ('(' + city + ') ' + number).trim();
      };
    });
})();
