app.controller('MainController', ['$scope', '$rootScope', '$resource', '$http', '$modal', 'UserService', 'MatesService', 'ShoeService', 'MessageService', function($scope, $rootScope, $resource, $http, $modal, UserService, MatesService, ShoeService, MessageService) {
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

  function deleteGuest( email, newUser) {
    UserByEmail = $resource('/api/users/email/:email', {
      email: '@email'
    }, {
      byEmail: {
        method: 'GET'
      }
    });
    UserByEmail.byEmail({email: email})
    .$promise
    .then(function(user){
      UserService.delete(user);
    })
    .then(function(){
      startInit(newUser);
    });
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
      $scope.matchesPerShoe  = MatesService.matchesPerShoe;
    })
    .then(function(){
      $scope.addToLikes = MatesService.addToLikes;      
    })
    .then(function(){
      $scope.matesPerShoe = [];
    });
  }

  $scope.showMatchPerShoe = function(matesAll, shoeId){
    $scope.matesPerShoe = MatesService.matchesPerShoe(matesAll, shoeId);
    debugger;
  };

  $scope.showMsgPanel = function(){
    $scope.msgBody = "We have similar taste in shoes. Lets get these shoes together.";
  };

  $scope.postMsg = function(user) {
    console.log("inside Postmg", user);
    var newMsg = {
      body: $scope.msgBody,
      fromUser: $scope.currentUser._id,
      toUser: user._id,
      shoe: user.shoeId
    };
    console.log("newMsg:", newMsg);
    MessageService.save({userId: user._id}, newMsg, function(msg){
      console.log("success msg:", msg);
    });
  };

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
    deleteGuest(guest.email, guest);
    $scope.cancel();

    // $http({
    //   method: 'post',
    //   data: guest,
    //   url: "api/users"
    // })
    // .then(function successCallBack(result){
    //   console.log( "this user has been created", result);
    //   console.log( "this user has been created", result.data);
    //   $scope.currentUser = result.data;
    // })
    // .catch(function failCallBack(error){
    //     console.log("the error for guest post",error );
    // });

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
    $scope.cancel();
  };
}]);
