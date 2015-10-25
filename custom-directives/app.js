var myApp = angular.module('myApp', []);

myApp.controller('mainController', ['$scope', function($scope){

  $scope.name = 'Ivan';

   // directive has access to this if you dont isolate the scope
  $scope.people = [
    {
      name: 'Ivan Dong',
      address: '123 Main St',
      city: 'Hermosillo',
      state: 'SON',
      zip: '44555'
    },
    {
      name: 'Kary Luna',
      address: '345 Krz Ave',
      city: 'Guaymas',
      state: 'SON',
      zip: '55666'
    },
    {
      name: 'Vala Martz',
      address: '777 Alien Orb',
      city: 'Sector I',
      state: 'Mars',
      zip: '99777'
    }
  ]

  $scope.formattedAddress = function(person) {
    return person.address + '. ' + person.city + ', ' + person.state + '. ' + person.zip;
  };

  // FUNCTION TO FORMAT ADDRESS OF PERSON

}]);

myApp.directive('searchResults', function() { // directives has access to parent scope
  return {
    restrict: 'AECM',
    templateUrl: '../js/directives/searchresults.html',
    replace: true,
    transclude: true, // Include one document inside another.
    // PLACE A COPY OF ONE DOCUMENT AT A PARTICULAR POINT INSIDE ANOTHER
    scope: { //isolated scope (own object scope for directive)
      //personName: '@', // 'text'
      //personNameSpecial: '@personName'
      //personAddress: '@' // 'text'
      personObject: '=', // 'two way binding' and pass object into directive

      // PASS FUNCTIONS TO ISOLATED SCOPE
      formattedAddressFunction: '&'

    },

    link: function(scope, elem, attrs) { // this will trigger everytime you use a directive
      console.log('==== LINKING ===='); // control output, scope, etc.
      console.log('scope', scope);
      console.log('elements', elem);
      console.log('attrs', attrs);

    }, // END: LINK
    compile: function(elem, attrs) { // get access to view
      // runs once. edit the html on the fly
      console.log('Compiling...');
      //elem.removeAttr('class');
      console.log(elem.html());

      return {

        post: function(scope, elements, attrs) { // you know what are you working with
          console.log('Post linking');

          console.log(elements);
          if (scope.personObject.name == 'Kary Luna') {
            elements.removeAttr('class');
          }
          console.log(scope);
        }

      }; // END: return link

    }, // END: compile
  } // END: DOD
});