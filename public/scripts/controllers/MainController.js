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


  function loadShoes(){
    $scope.shoes = ShoeService.query();
    console.log("scope shoes 1:", $scope.shoes);

  }

  function setShoes (){
    loadShoes();
    console.log("scope shoes 2:", $scope.shoes);

    $scope.numShoeMatchesAll = MatesService.numShoeMatchesAll($scope.currentUser, $scope.shoes );
    $scope.numShoeMatchById  = MatesService.numShoeMatchById;
    $scope.addToLikes = MatesService.addToLikes;      
  }

  //addUser
  function addUser(newUser){
    $scope.currentUser = UserService.save(newUser, function(user) {});
  }
  //loadUsers
  function loadUsers(){
    $scope.users = UserService.query();
    console.log($scope.users);
  } 

  function loadMates(){
    MatesService.addMates($scope.currentUser, $scope.users);
  }

  function startInit(newUser){
    UserService.save(newUser, function successCallBack(user){
      $scope.currentUser = user;
    });
    UserService.query(function successCallBack(users){
      $scope.users = users;
      MatesService.addMates($scope.currentUser, $scope.users, "id");
      UserService.get({id: $scope.currentUser._id}, function(user){
        $scope.currentUser = user;
      });
    });
    ShoeService.query(function(shoes){
      $scope.shoes = shoes;
    });
  }

  function startLoginInit(){
    UserService.query(function successCallBack(users){
      $scope.users = users;
      MatesService.addMates($scope.currentUser, $scope.users, "obj");
      UserService.get({id: $scope.currentUser._id}, function(user){
        $scope.currentUser = user;
        debugger;
      });
    });
    ShoeService.query(function(shoes){
      $scope.shoes = shoes;
      console.log("getting shoes scope", $scope.shoes);
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

      UserByEmail.byEmail({
        email: loginUser.email
      }, function(data) {
        //console.log("the logged in user is :",data);
       // $rootScope.currentUser = data;
        $scope.currentUser = data;
          console.log("just logged in:" , $scope.currentUser);
          startLoginInit();
      });
      $scope.cancel();
    };
}]);
