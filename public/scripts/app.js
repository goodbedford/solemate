var app = angular.module('solemateApp', ['ngRoute', 'ngResource', 'ui.bootstrap']);


app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/templates/home.html',
      controller: 'MainController'
    })
    .when('/api/shoes', {
      templateUrl: 'views/templates/home.html',
      controller: 'MainController'
    })
    .otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
}]);

