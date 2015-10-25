// BUILD A CUSTOM SERVICE
// App ID: 34f99a29bda31bee672ff980a7eef724
// http://api.openweathermap.org/data/2.5/forecast?q=London,us&cnt=2&appid=34f99a29bda31bee672ff980a7eef724

// create a default value for a service property
weatherApp.service('cityService', function(){

  this.city = 'New York, NY';

});


// CUSTOME SERVICE TO GET WEATHER DATA
weatherApp.service('weatherService', ['$resource', function($resource){

  // API INTERFACE
  this.GetWeather = function(city, days) {
    var weatherAPI = $resource(
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

    return weatherAPI.get({
      q: city,
      cnt: days,
      appId: '34f99a29bda31bee672ff980a7eef724'
    });

  }

}]);