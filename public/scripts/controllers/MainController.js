app.controller('MainController', ['$scope','$modal', '$log', function($scope, $modal, $log ){
   $scope.isCollapsed = true;
  $scope.showMiniSplash = function(){
    $scope.miniSplash = true;
  }

  $scope.main = {}
  $scope.main.test = "testing";
  $scope.main.matesShoePanel = {};
  $scope.main.showMatesShowPanel = false;
  $scope.showLoginModal = true;
  $scope.showLoginForm = false;
  $scope.showGuestLoginForm = true;

  $scope.open = function(){
    $scope.showLoginModal = true;
  }
  // $scope.main.matesShoePanel;
 

  // $scope.main.showMatesShowPanel = false;
  // $scope.animationsEnabled = true;

  // $scope.open = function(size) {

  //   var modalInstance = $modal.open({
  //     animation: $scope.animationsEnabled,
  //     templateUrl: 'views/templates/login.html',
  //     controller:  function ($scope, $modalInstance) {},
  //     size: size
  //   });

  //   modalInstance.result.then(function(modalData) {
  //     $scope.modalData = modalData;
  //   }, function() {
  //     $log.info('Modal dismissed at: ' + new Date());
  //   });
  // };


  // $scope.ok = function() {
  //   $modalInstance.close($scope.modalData);
  // };

  // $scope.cancel = function() {
  //   $modalInstance.dismiss('cancel');
  // };


}]);
