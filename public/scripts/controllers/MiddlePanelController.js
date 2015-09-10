app.controller('MiddlePanelController', ['$scope', '$rootScope', 'UserService', 'MatesService', 'ShoeService', function($scope, $rootScope, UserService, MatesService, ShoeService) {
  $scope.mdlPanel = {};
  // console.log($scope.mdlPanel.shoes)
  console.log("shoe service:", ShoeService)
  $scope.mdlPanel.shoes = ShoeService.getShoes();

  $scope.likeShoe = false;
  $scope.perPage = 20;
  $scope.mdlPanel.users = UserService.getUsers(function( users ){


    //$scope.mdlPanel.currentUser = users[0];
    //$scope.mdlPanel.mates = MatesService.getMates(users, $rootScope.currentUser._id);
    
  });

    $scope.mdlPanel.numShoeMatches = MatesService.numShoeMatches;
    $scope.mdlPanel.numShoeMatches2 = MatesService.numShoeMatches2;
    $scope.mdlPanel.numShoeMatchesAll = MatesService.numShoeMatchesAll;


    $scope.mdlPanel.addToLikes = MatesService.addToLikes;
    $scope.mdlPanel.test = UserService.test;

  //right panel
  $scope.showMsg = false;

  $scope.mdlPanel.getMatesShoePanel = function( matesArr){
    console.log(matesArr)
    $scope.main.matesShoePanel.mates = matesArr;
  }




}]);
