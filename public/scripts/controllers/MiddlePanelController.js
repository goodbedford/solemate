app.controller('MiddlePanelController', ['$scope', 'UserService', 'ShoeService', function($scope, UserService, ShoeService) {
  $scope.mdlPanel = {};
  $scope.mdlPanel.shoes = ShoeService.getShoes();
  // console.log($scope.mdlPanel.shoes)
  $scope.mdlPanel.users = UserService.getUsers();
  $scope.mdlPanel.currentUser = $scope.mdlPanel.users[0];
  //$scope.mdlPanel.mates = UserService.getUsers($scope.mdlPanel.users);
 // $scope.mdlPanel.mates = UserService.getUsers($scope.mdlPanel.users);

}]);
