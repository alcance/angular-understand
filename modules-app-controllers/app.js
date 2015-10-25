// MODULE
// One object in the global namespace
var myApp = angular.module('myApp', ['ngMessages', 'ngResource']) // list of modules that app is dependent on.

// Controller

myApp.controller('mainController', function($scope, $log, $filter, $resource) {

  $log.log('== TESTING LOG SERVICE METHODS ==')
  $log.log('Hello');
  $log.info('Cool info');
  $log.warn('Warning! This is going to implode!');
  $log.debug('Debug information');
  $log.error('System down! Abort!');

  $scope.name = 'Vala';
  $scope.formattedName = $filter('uppercase')($scope.name);

  $log.info($scope.name);
  $log.info($scope.formattedName);

  console.log($resource);

});

var searchPeople = function(firstName, lastName, height, age, occupation){

  return 'Ivan Dong';

}
// You can take a function and convert it to a string
var searchPeopleString = searchPeople.toString();
console.log(searchPeopleString);

// This is how angular knows what to inject (DI)
// throw an array of arguments

console.log(angular.injector().annotate(searchPeople));
// ['firstName', 'lastName', 'height', 'occupation']

