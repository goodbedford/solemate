var app = angular.module('solemateApp', ['ngResource', 'ui.bootstrap', 'ui.router', 'ngAnimate']);


app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
  
  //any unmatched url redirect to home
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home',{
      url: '/',
      templateUrl: 'views/templates/home.html',
      controller: 'MainController'
    })
    .state('shoes',{
      url: '/api/shoes', 
      templateUrl: 'views/templates/home.html',
      controller: 'MainController'
    })
    .state('messages', {
      url:'/api/users/:userId/messages', 
      templateUrl: 'views/templates/messages.html',
      controller: 'MessageController'
    });

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
}]);

