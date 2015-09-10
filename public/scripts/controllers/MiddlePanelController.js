app.controller('MiddlePanelController', ['$scope', '$rootScope', 'UserService', 'MatesService', 'ShoeService', function($scope, $rootScope, UserService, MatesService, ShoeService) {
  $scope.mdlPanel = {};
  // console.log($scope.mdlPanel.shoes)
  console.log("shoe service:", ShoeService)
  $scope.mdlPanel.shoes = ShoeService.getShoes();

  $scope.likeShoe = false;
  $scope.perPage = 20;
  $scope.mdlPanel.users = UserService.getUsers(function( users ){


    $scope.mdlPanel.currentUser = users[0];
    $scope.mdlPanel.mates = MatesService.getMates(users, $scope.mdlPanel.currentUser.id);
    
    $scope.mdlPanel.numShoeMatches = UserService.numShoeMatches;
    $scope.mdlPanel.numShoeMatches2 = UserService.numShoeMatches2;
    $scope.mdlPanel.numShoeMatchesAll = UserService.numShoeMatchesAll;


    $scope.mdlPanel.addToWishList = UserService.addToWishList;
    $scope.mdlPanel.test = UserService.test;
  });


  //right panel
  $scope.showMsg = false;

  $scope.mdlPanel.getMatesShoePanel = function( matesArr){
    console.log(matesArr)
    $scope.main.matesShoePanel.mates = matesArr;
  }
  $scope.getArr = function(someArr){
    console.log("someArray1",someArr)
    $scope.main.test = someArr;
  }
  $scope.getArr2 = function(someArr){
    console.log("some arery2",someArr)
  }



}]);
