var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function($routeProvider) {//What to do when particular hash is set
  $routeProvider

  .when('/', {
    templateUrl: 'pages/main.html',
    controller: 'mainController'

  })

  .when('/second/', {  //pass value to the url ej: url?param=value
    templateUrl: 'pages/second.html',
    controller: 'secondController'

  })

  .when('/second/:num', {  //pass value to the url ej: url?param=value
    templateUrl: 'pages/second.html',
    controller: 'secondController'

  })

});

// custom Service

myApp.service('nameService', function() {

  var self = this;

  this.name = 'Ivan Dong'

  this.namelength = function() {

    return self.name.length;

  };

})

// mainController

myApp.controller('mainController', ['$scope', '$location', '$log', 'nameService', function($scope, $location, $log, nameService){

  $scope.name = nameService.name;

  $scope.$watch('name', function(){
    nameService.name = $scope.name;
  });

  $log.info($location.path()); // look for hash identifier

  $log.main = 'Property from main' // services are singletones
  $log.log($log);
  $log.log($scope);

  $log.log(nameService.name);
  $log.log(nameService.namelength());


}])


// secondController
myApp.controller('secondController', ['$scope', '$log', '$routeParams', 'nameService', function($scope, $log, $routeParams, nameService){

  $scope.name = nameService.name;
  $scope.num = $routeParams.num || 'N/A'; // get values from hash

  $log.second = 'Property from second'
  $log.log($log); // same object in both controllers (singleton)
  $log.log($scope);

  $scope.$watch('name', function(){
    nameService.name = $scope.name;
  });

}])