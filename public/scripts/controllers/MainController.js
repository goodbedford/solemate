app.controller('MainController', ['$scope', '$rootScope', '$resource', '$http', 'UserService', 'MatesService', function($scope, $rootScope, $resource, $http, UserService, MatesService) {
  $scope.isCollapsed = true;
  $scope.showMiniSplash = function() {
    $scope.miniSplash = true;
  };

  $scope.main = {};
  $scope.main.test = "testing";
  $scope.main.matesShoePanel = {};
  $scope.main.showMatesShowPanel = false;
  //modal show or hide
  $scope.showLoginModal = true;
  $scope.showLoginForm = false;
  $scope.showSignUpForm = false;
  $scope.showGuestLoginForm = true;

  //open modal
  // $scope.open = function() {
  //     $scope.showLoginModal = true;
  //     $scope.showLoginForm = true;
  //     $scope.showSignUpForm = false;
  //     $scope.showGuestLoginForm = false;
  //   };
    //close modal
  $scope.cancel = function() {
      $scope.guest = {};

      $scope.showGuestLoginForm = false;
      $scope.showLoginForm = false;
      $scope.showSignUpForm = false;
      $scope.showLoginModal = false;

      //you don't need these conditionals
      // if ($scope.showGuestLoginForm == true) {
      //   $scope.showGuestLoginForm = false;
      //   $scope.showSignUpForm = false;
      //   $scope.showLoginModal = false;

      // } else if ($scope.showLoginForm == true) {
      //   $scope.showLoginForm = false;
      //   $scope.showGuestLoginForm = false;
      //   $scope.showSignUpForm = false;
      //   $scope.showLoginModal = false;

      // } else {
      //   $scope.showSignUpForm = false;
      //   $scope.showGuestLoginForm = false;
      //   $scope.showLoginForm = false;

      //   $scope.showLoginModal = false;

      // }
    };
  //guest
  $scope.guest = {};
  $scope.guest = {
    shoeType: "w"
  };

  //root scope
  $rootScope.currentUser = {};
  $rootScope.currentUser.mates = [];
  $rootScope.currentUser.likes = [];
  $rootScope.displayMates = [];


  //submit $scope.guest
  $scope.main.submitGuest = function() {
    var guest = {
        username:  "guest",
        email: "guest@gmail.com",
        password: "password",
        leftFoot: $scope.guest.leftFootSize,
        rightFoot: $scope.guest.rightFootSize,
        shoeType: $scope.guest.shoeType
    };


    $http({
      method: 'post',
      data: guest,
      url: "api/users"
    })
    .then(function successCallBack(result){
      console.log( "this user has been created", result);
    })
    .fail(function failCallBack(error){
        console.log("the error for guest post",error );
    });


    // console.log($scope.guest.shoeType);
    // $rootScope.currentUser = $scope.guest;
    // console.log($scope.currentUser);

  };

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

    UserService.save(newUser, function(user) {
      console.log(user);
      $rootScope.currentUser = user;
      console.log("root scope: ", $rootScope.currentUser)
    });

    UserService.getUsers(function(users) {
      MatesService.addMates(users);
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
          // users.forEach(function(user){
          //   if( user.leftFoot == $rootScope.currentUser.rightFoot &&
          //       user.rightFoot == $rootScope.currentUser.leftFoot){
          //     //console.log("this is current user before addMates", $rootScope.currentUser.mates)

          //     $rootScope.currentUser.mates.push(user._id);
          //     console.log("this is current user in addMates", $rootScope.currentUser)
          //     // console.log("user to:", user)
          //      UserService.update({id: $rootScope.currentUser._id},$rootScope.currentUser, function(updatedUser){
          //      console.log("updated user:",updatedUser);
          //      });
          //   }
          // });
          MatesService.addMates(users);
        });
      });
      $scope.cancel();
    }
    // $scope.main.matesShoePanel;

}]);
