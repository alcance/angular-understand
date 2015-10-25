
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
weatherApp.controller('forecastController', ['$scope', 'cityService', '$routeParams', 'weatherService', function($scope, cityService, $routeParams, weatherService){

  console.log($scope);
  $scope.city = cityService.city;
  $scope.days = $routeParams.days || '2';

  $scope.weatherResult = weatherService.GetWeather($scope.city, $scope.days);

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
