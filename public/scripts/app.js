var app = angular.module('solemateApp', ['ngRoute', 'ngResource', 'ui.bootstrap']);


app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/templates/home.html',
      controller: 'HomeController'
    })
    .when('/:id', {
      templateUrl: 'views/templates/anwsers.html',
      controller: 'AnswerCtrl'
    })
    .when('/api/shoes', {
      templateUrl: 'views/templates/home.html',
      controller: 'HomeController'
    })
    .otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
}]);

