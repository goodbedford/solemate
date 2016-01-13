angular
  .module('solemateApp')
  .controller('MessageController',  MessageController);

MessageController.$inject = [ '$scope', '$stateParams','MessageService', 'UserService'];

function MessageController($scope, $stateParams, MessageService, UserService){
  $scope.test = "go bedford go bedford go";
  console.log("the stateParams", $stateParams);
    UserService.get({id: $stateParams.userId}, function(user){
      $scope.currentUser = user;
    });

    MessageService.getMsgs({userId: $stateParams.userId}, function(msg){
      $scope.messages = msg;
    });

} 