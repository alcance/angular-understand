/*
* DIRECTIVE: An instruction to AngularJS to
* manipulate a piece of the DOM
* Ex: 'Add class', 'Hide this', 'Create this', etc
*/

var myApp = angular.module('myApp', []);

myApp.controller('mainController', ['$scope', '$filter', '$timeout', '$http', function($scope, $filter, $timeout, $http) {

  $scope.handle = '';

  $scope.lowerCaseHandle = function() {
    return $filter('lowercase')($scope.handle);
  };

  $scope.characters = 5;

  /*  WE NOW GET THIS DATA FROM A REST SERVICE API
  $scope.rules = [

  { rulename: 'Must be 5 characters'},
  { rulename: 'Must not be used elsewhere'},
  { rulename: 'Must be cool'}

  ];
  */

  console.log($scope.rules);

  $scope.alertClick = function() {
    alert('Clicked');
  };

  $scope.name = 'Ivan Dong'

  $scope.$watch('handle', function(newValue, oldValue) {
    console.log('Handle changed!');
    console.log('Old value: ', oldValue);
    console.log('New value: ', newValue);
  });

  setTimeout(function(){

    $scope.$apply(function(){
       $scope.handle = 'newtwitterhandle';
       console.log('Scope changed!');
    });

  }, 3000);

  $timeout(function(){
    $scope.handle = 'othertwitterhandle';
    console.log('Scope changed. No need of $apply');
  }, 5000);


  // Request data from API using $http service
  $http.get('https://api.parse.com/1/classes/Rules', {
    headers: {// passing headers for Parse usage
      'X-Parse-Application-Id': 'ueEiDcYcQAQEpSLrSh54KoQ2GpZW80S4Z5o9K8mx',
      'X-Parse-REST-API-Key': 'F5jrSp4GmE0G9bb88R9GUhgV75OM0WaQoDUnmNGI'
    }
  })
    .success(function(data){
      console.log(data.results);
      $scope.rules = data.results;
    })
    .error(function(data, status){
      console.log('Response: ', data, status)
    });

    $scope.newRule = '';

    $scope.addRule = function() {
      $http.post('https://api.parse.com/1/classes/Rules', {
        name: $scope.newRule
      }, {
        headers: {
          'X-Parse-Application-Id': 'ueEiDcYcQAQEpSLrSh54KoQ2GpZW80S4Z5o9K8mx',
          'X-Parse-REST-API-Key': 'F5jrSp4GmE0G9bb88R9GUhgV75OM0WaQoDUnmNGI',
          'Content-Type': 'application/json'
        }
      })
      .success(function(data){
        console.log(data);
        $scope.rules.push($scope.newRule);
        $scope.newRule = '';
      })
      .error(function(data, status){
        console.log('Error: ', data, status);
      })
    };



}])