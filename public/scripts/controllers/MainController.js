app.controller('MainController', ['$scope', '$modal', '$rootScope', '$resource', function($scope, $modal, $rootScope, $resource ) {
  $scope.isCollapsed = true;
  $scope.showMiniSplash = function() {
    $scope.miniSplash = true;
  }

  $scope.main = {}
  $scope.main.test = "testing";
  $scope.main.matesShoePanel = {};
  $scope.main.showMatesShowPanel = false;
  //modal
  $scope.showLoginModal = true;
  $scope.showLoginForm = false;
  $scope.showSignUpForm = false;
  $scope.showGuestLoginForm = true;

  $scope.open = function() {
    $scope.showLoginModal = true;
    $scope.showLoginForm = true;
    $scope.showSignUpForm = false;
    $scope.showGuestLoginForm = false;
  }
  $scope.cancel = function() {
    $scope.guest = {};

    if ($scope.showGuestLoginForm == true) {
      $scope.showGuestLoginForm = false;
      $scope.showSignUpForm = false;
      $scope.showLoginModal = false;

    } else if ($scope.showLoginForm == true) {
      $scope.showLoginForm = false;
      $scope.showGuestLoginForm = false;
      $scope.showSignUpForm = false;
      $scope.showLoginModal = false;

    } else {
      $scope.showSignUpForm = false;
      $scope.showGuestLoginForm = false;
      $scope.showLoginForm = false;

      $scope.showLoginModal = false;

    }
  }
  //guest
  $scope.guest = {};
  $scope.guest = {shoeType: "w"};

  //root scope
  $rootScope.currentUser = {};
  





  //submit $scope.guest
  $scope.main.submitGuest = function() {

    $scope.guest.shoeType; //mens womens
    $scope.guest.leftFootSize;
    $scope.guest.rightFootSize;
    $scope.guest.username = "guest";



    console.log($scope.guest.shoeType);
    $rootScope.currentUser = $scope.guest;
    console.log($scope.currentUser);

  }

  //signup scope
  $scope.signup = {};
  $scope.signup = {shoeType: "w" };

  $scope.submitSignUpForm = function(){

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
