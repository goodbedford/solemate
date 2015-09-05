app.controller('MainController', ['$scope', function($scope){
   $scope.isCollapsed = true;
  $scope.showMiniSplash = function(){
    $scope.miniSplash = true;
  }
}]);
