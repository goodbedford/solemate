app.controller('MainController', ['$scope', function($scope){
   $scope.isCollapsed = true;
  $scope.showMiniSplash = function(){
    $scope.miniSplash = true;
  }

  $scope.main = {}
  $scope.main.test = "testing";
  $scope.main.matesShoePanel = {};
  // $scope.main.matesShoePanel;
  $scope.main.showMatesShowPanel = false;

}]);
