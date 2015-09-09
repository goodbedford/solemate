app.controller('MiddlePanelController', ['$scope', 'UserService', 'ShoeService', function($scope, UserService, ShoeService) {
  $scope.mdlPanel = {};
  $scope.mdlPanel.shoes = ShoeService.getShoes();
  // console.log($scope.mdlPanel.shoes)
  $scope.mdlPanel.users = UserService.getUsers();
  $scope.mdlPanel.currentUser = $scope.mdlPanel.users[0];
  $scope.mdlPanel.mates = UserService.getMates($scope.mdlPanel.users, $scope.mdlPanel.currentUser.id);
  
  $scope.mdlPanel.numShoeMatches = UserService.numShoeMatches;
  $scope.mdlPanel.numShoeMatches2 = UserService.numShoeMatches2;
  $scope.mdlPanel.numShoeMatchesAll = UserService.numShoeMatchesAll;


  $scope.mdlPanel.addToWishList = UserService.addToWishList;
  $scope.mdlPanel.test = UserService.test;

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
