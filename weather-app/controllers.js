
// SET YOUR CONTROLLER
weatherApp.controller('homeController', ['$scope', '$resource', 'cityService', '$location', function($scope, $resource,cityService, $location){

  console.log($scope);

  $scope.city = cityService.city;
  $scope.$watch('city', function(oldValue, newValue){

    console.log('old value', oldValue);
    console.log('new value', newValue);

    // UPDATE 'cityService' WITH CURRENT SCOPE'S VALUE
    cityService.city = $scope.city

  });

  $scope.submit = function() {

    $location.path('/forecast');

  };

}]);

// SET ANOTHER CONTROLLER
weatherApp.controller('forecastController', ['$scope', 'cityService', '$resource', '$routeParams', function($scope, cityService, $resource, $routeParams){

  console.log($scope);
  $scope.city = cityService.city;
  $scope.days = $routeParams.days || '2';

  // API INTERFACE
  $scope.weatherAPI = $resource(
    'http://api.openweathermap.org/data/2.5/forecast/daily',
    {
      callback: 'JSON_CALLBACK'
    },
    {
      get: {

        method: 'JSONP'

      }
    }
  );

  $scope.weatherResult = $scope.weatherAPI.get({
    q: $scope.city,
    cnt: $scope.days,
    appId: '34f99a29bda31bee672ff980a7eef724'
  });

  console.log($scope.weatherResult);


  /*
   * CONVERT TO KELVIN = CELSIUS
   * ºC=K-º273.15
   * ºK=ºC+º273.15
   */

  $scope.convertToCelsius = function(degK) {

    return Math.round(degK - 273.15);

  };

  $scope.convertToDate = function(dt) {
    return new Date(dt * 1000);
  }

}]);
