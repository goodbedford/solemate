angular
  .module('solemateApp')
  .controller('MessageController',  MessageController);

MessageController.$inject = [ '$scope', 'MessageService'];

function MessageController($scope, MessageService){
  $scope.test = "go bedford go bedford go";
} 