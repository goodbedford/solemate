app.controller('LeftPanelController', ['$scope', '$rootScope', 'UserService', 'MatesService', function($scope, $rootScope, UserService, MatesService) {
  $scope.lftPanel = {};
  $scope.lftPanel.users = UserService.getUsers(function(users){
    console.log(users)
    $scope.lftPanel.currentUser = $rootScope.currentUser;//users[0];
    $rootScope.currentUser.mates;
    //$scope.lftPanel.mates = MatesService.getMates(users, $scope.lftPanel.currentUser._id);

  });
  

}]);
