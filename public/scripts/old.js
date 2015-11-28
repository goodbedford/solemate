
//
    UserService.save(newUser, function(newUser){
      $scope.currentUser = newUser;
      UserService.query(users, function(users){
        $scope.users = users;
        MatesService.addMates($scope.currentUser, $scope.users);
      });
    });

    