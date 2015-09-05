app.controller('LeftPanelController', ['$scope', 'UserService', function($scope, UserService) {
  $scope.lftPanel = {};
  $scope.lftPanel.users = UserService.getUsers();
  $scope.lftPanel.currentUser = $scope.lftPanel.users[0];
  $scope.lftPanel.mates = UserService.getMates($scope.lftPanel.users, $scope.lftPanel.currentUser.id);

}]);
