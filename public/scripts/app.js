var app = angular.module('questionApp', ['ngRoute', 'ngResource']);


app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
  $routeProvider
    .when('/',  {
      templateUrl: 'views/templates/home.html',
      controller: 'HomeCtrl'
    })
    .when('/:id', {
      templateUrl: 'views/templates/anwsers.html',
      controller: 'AnswerCtrl'
    })
    .when('/api/shoes',{
      templateUrl: 'views/templates/home.html',
      controller: 'HomeCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
}]);



app.service('QnA', ['$resource', function($resource){
  return $resource('/api/questions/:id', {id: '@_id'},{
    update: {
      method: 'PUT'
    }
  });
}]);



app.service('Answer', ['$resource', function($resource) {
  return $resource('/api/questions/:questionId/answers/:id', {id: '@_id'},{
    update: {
      method: 'PUT'
    }
  });
}]);

app.service("Aws", ['$resource', function($resource) {
  return $resource('/api/shoes/:id', {id: '@_id'});
}]);

  app.controller('HomeCtrl',['$scope', 'QnA', 'Aws', function($scope, QnA, Aws){
    $scope.questions = QnA.query();
    $scope.question = {}
    $scope.viewNewForm = false;

  $scope.askAws = function(){
    $scope.shoeUrls = Aws.query();
    console.log("this is client shoes:::", $scope.shoeUrls)
  }

  $scope.askQuestion = function(){
    $scope.viewNewForm = true;
  }

  $scope.newQuestion = function(){
    QnA.save($scope.question);
    $scope.questions.push($scope.question)
    $scope.viewNewForm = false;
    $scope.question = {};
  }

  // $scope.editQuestion = function(){
  //   $scope.questions.get(id: $routeParams.questionId)
  // }
}]);



