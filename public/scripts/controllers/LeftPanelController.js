app.controller('LeftPanelController', ['$scope', '$rootScope', 'UserService', 'MatesService', function($scope, $rootScope, UserService, MatesService) {
  $scope.lftPanel = {};
  $scope.lftPanel.users = UserService.getUsers(function(users) {
    console.log(users);
    //$scope.currentUser = $rootScope.currentUser; //users[0];

    // $scope.lftPanel.currentUser = $rootScope.currentUser; //users[0];
    // $rootScope.currentUser.mates = Mates¬Service.get;
   $scope.currentUser.mates = MatesService.getMates(users, $scope.currentUser._id);

  });
}]);
