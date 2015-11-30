app.controller('MainController', ['$scope', '$rootScope', '$resource', '$http', '$modal', 'UserService', 'MatesService', 'ShoeService', function($scope, $rootScope, $resource, $http, $modal, UserService, MatesService, ShoeService) {
  $scope.isCollapsed = true;
  $scope.showMiniSplash = function() {
    $scope.miniSplash = true;
  };

  //modal show or hide
  $scope.showLoginModal = true;
  $scope.showLoginForm = false;
  $scope.showSignUpForm = false;
  $scope.showGuestLoginForm = true;

  // display matching shoe count
  $scope.perPage= 20;

  // Login In scope
  $scope.login = {};

  //add hearts to shoes
  $scope.likeShoe = false;
  $scope.numShoeMatchesAll = [];
  $scope.isLiked = MatesService.isLiked;

  function setShoes (){
    loadShoes();
    console.log("scope shoes 2:", $scope.shoes);

    $scope.numShoeMatchesAll = MatesService.numShoeMatchesAll($scope.currentUser, $scope.shoes );
    $scope.numShoeMatchById  = MatesService.numShoeMatchById;
    $scope.addToLikes = MatesService.addToLikes;      
  }


  // function startInit(newUser){
  //   UserService.save(newUser, function successCallBack(user){
  //     $scope.currentUser = user;
  //   });
  //   UserService.query(function successCallBack(users){
  //     $scope.users = users;
  //     MatesService.addMates($scope.currentUser, $scope.users, "id");
  //     UserService.get({id: $scope.currentUser._id}, function(user){
  //       $scope.currentUser = user;
  //     });
  //   });
  //   ShoeService.query(function successCallBack(shoes){
  //     $scope.shoes = shoes;

  //   });
  // }
  // function startLoginInit(){
  //   UserService.query(function successCallBack(users){
  //     $scope.users = users;
  //     MatesService.addMates($scope.currentUser, $scope.users, "obj");
  //     UserService.get({id: $scope.currentUser._id}, function(user){
  //       $scope.currentUser = user;
  //     });
  //   });
  //   ShoeService.query(function(shoes){
  //     $scope.shoes = shoes;
  //     console.log("getting shoes scope", $scope.shoes);
  //     $scope.numShoeMatchesAll = MatesService.numShoeMatchesAll($scope.currentUser, $scope.shoes );
  //     $scope.numShoeMatchById  = MatesService.numShoeMatchById;
  //     $scope.addToLikes = MatesService.addToLikes;      
  //     debugger;
  //   });
  // }
  function startInit(newUser){
    UserService.save(newUser)
    .$promise
    .then(function(user){
      $scope.currentUser = user;
    })
    .then(function(){
      UserService.query()
      .$promise
      .then(function(users){
        $scope.users= users;
      })
      .then(function(){
        MatesService.addMates($scope.currentUser, $scope.users, "id");
        UserService.get({id: $scope.currentUser._id})
        .$promise
        .then(function(user){
          $scope.currentUser = user;
        });
      });
    });
    ShoeService.query(function successCallBack(shoes){
      $scope.shoes = shoes;

    });
  }

  function startLoginInit(){
    UserService.query()
    .$promise
    .then(function(users){
      $scope.users = users;
    })
    .then(function(){
      MatesService.addMates($scope.currentUser, $scope.users, "obj");
      UserService.get({id: $scope.currentUser._id})
      .$promise
      .then(function(user){
        $scope.currentUser = user;
      });
    });
    ShoeService.query()
    .$promise
    .then(function(shoes){
      $scope.shoes = shoes;
    })
    .then(function(){
      $scope.numShoeMatchesAll = MatesService.numShoeMatchesAll($scope.currentUser, $scope.shoes );
    })
    .then(function(){
      $scope.numShoeMatchById  = MatesService.numShoeMatchById;
    })
    .then(function(){
      $scope.addToLikes = MatesService.addToLikes;      
    });
  }


  $scope.cancel = function() {
      $scope.guest = {};

      $scope.showGuestLoginForm = false;
      $scope.showLoginForm = false;
      $scope.showSignUpForm = false;
      $scope.showLoginModal = false;
    };

  //guest
  $scope.guest = {};
  $scope.guest = {
    shoeType: "w"
  };


  //submit $scope.guest
  $scope.submitGuest = function() {
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
      console.log( "this user has been created", result.data);
      $scope.currentUser = result.data;
    })
    .throw(function failCallBack(error){
        console.log("the error for guest post",error );
    });

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
    };
    startInit(newUser);
    $scope.cancel();
  };

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

      UserByEmail.byEmail({email: loginUser.email})
      .$promise
      .then(function(user){
        $scope.currentUser = user;
        console.log("just logged in as:", $scope.currentUser);
      })
      .then(function(){
        startLoginInit();
      });
      // UserByEmail.byEmail({
      //   email: loginUser.email
      // }, function(data) {
      //   //console.log("the logged in user is :",data);
      //  // $rootScope.currentUser = data;
      //   $scope.currentUser = data;
      //     console.log("just logged in:" , $scope.currentUser);
      //     startLoginInit();
      // });
      $scope.cancel();
    };
}]);
