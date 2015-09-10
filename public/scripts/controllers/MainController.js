app.controller('MainController', ['$scope', '$rootScope', '$resource', 'UserService', 'MatesService', function($scope, $rootScope, $resource, UserService, MatesService) {
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
  $scope.guest = {
    shoeType: "w"
  };

  //root scope
  $rootScope.currentUser = {};
  $rootScope.currentUser.mates = {};

  //submit $scope.guest
  $scope.main.submitGuest = function() {

    $scope.guest.shoeType; //mens womens
    $scope.guest.leftFootSize;
    $scope.guest.rightFootSize;
    $scope.guest.username = "guest";



    console.log($scope.guest.shoeType);
    //$rootScope.currentUser = $scope.guest;
    console.log($scope.currentUser);

  }

  //signup scope
  $scope.signup = {};
  $scope.signup = {
    shoeType: "w"
  };

  $scope.submitSignUpForm = function() {
    var newUser = {
      username: $scope.signup.username,
      email: $scope.signup.email,
      password: $scope.signup.password,
      leftFoot: $scope.signup.leftFoot,
      rightFoot: $scope.signup.rightFoot,
      shoeType: $scope.signup.shoeType
    }

    UserService.save(newUser, function(data) {
      console.log(data);
      $rootScope.currentUser = data;
      console.log("root scope: ", $rootScope.currentUser)
    });
    $scope.cancel();
  }

  // Login In scope
  $scope.login = {};
  $scope.submitLoginForm = function() {
      var loginUser = {
        email: $scope.login.email,
        password: $scope.login.password
      };
      UserByEmail = $resource('/api/users/email/:email', {
        email: '@email'
      }, {
        byEmail: {
          method: 'GET'
        }
      });

      UserByEmail.byEmail({
        email: loginUser.email
      }, function(data) {
        //console.log(data);
        $rootScope.currentUser = data;

        UserService.getUsers(function(users) {
          users.forEach(function(user){
            if( user.leftFoot == $rootScope.currentUser.rightFoot &&
                user.rightFoot == $rootScope.currentUser.leftFoot){
              //console.log("this is current user before addMates", $rootScope.currentUser.mates)

              $rootScope.currentUser.mates.push(user);
              console.log("this is current user in addMates", $rootScope.currentUser.mates)
              // console.log("user to:", user)
               UserService.update({id: $rootScope.currentUser._id},$rootScope.currentUser, function(updatedUser){
               console.log("updated user:",updatedUser);
               });
            }
          });

          //MatesService.addMates(users);
          //console.log("this is rootscope in mates service", $rootScope.currentUser);
        });
      });
      $scope.cancel();
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
