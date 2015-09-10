app.factory('UserService', ['$resource', function($resource) {


    return $resource('/api/users/:id', {
      id: '@_id'
    }, {
      update: {
        method: 'PUT'
      },
      getUsers: {
        method: 'GET',
        isArray: true
      },
      getUserById: {
        method: 'GET',
        isArray: false
      }
    });
  }])
  .factory('MatesService', ['$rootScope', 'UserService', function($rootScope, UserService) {
    var factory = {}


    // factory.getShoes = function() {
    //   return shoes;
    // }
    // factory.getUserById = function(id) {
    //   var foundUser = null;
    //   users.forEach(function(user) {
    //     if (user.id == id) {
    //       foundUser = user;
    //     }
    //   });
    //   return foundUser;
    // }


    factory.addUser = function() {
      newUser = {};
    }

    factory.addMates = function(users) {
      //console.log("currenUser in before :", $rootScope.currentUser.mates)
      users.forEach(function(user) {
        if (user.leftFoot == $rootScope.currentUser.rightFoot &&
            user.rightFoot == $rootScope.currentUser.leftFoot) {
          $rootScope.displayMates.push(user);
          if($rootScope.currentUser.mates.indexOf(user._id) < 0){
          $rootScope.currentUser.mates.push(user._id);
          console.log("this is current user in addMates", $rootScope.currentUser.mates)
            // console.log("user to:", user)
          UserService.update(
          {
            id: $rootScope.currentUser._id
          }, $rootScope.currentUser, function(updatedUser) {
            console.log("updated user:", updatedUser);
          });
          }
        }
      });
    }

    //searches 
    factory.getMates = function(users, currentId) {
      var mates = [];
      users.forEach(function(user) {
        if (user.id == currentId) {
          user.mates.forEach(function(mate) {
            var foundMate = UserService.getUserById(mate);
            mates.push(foundMate);
          });
        }
      });
      return mates;
    }

    factory.numShoeMatches = function( shoeId) {
      //var num = 0;
      var matesWithShoeMatch = [];
      var mates = [];
      // $rootScope.currentUser.mates.forEach(function(mateId) {
      //   var foundMate = UserService.getUserById(mateId);
      //   mates.push(foundMate)
      // });
      // console.log("mates", mates)
      $rootScope.displayMates.forEach(function(mate) {
        //console.log("mate likes:", mate)
        mate.likes.forEach(function(shoe_id) {
          if (shoeId == shoe_id) {
            //num += 1;
            matesWithShoeMatch.push(mate)
              //console.log("Im in here,", num)
          } else {
            console.log("didn't find shoe Matches")
          }
        });
      });
      return matesWithShoeMatch;
    }
    factory.numShoeMatchesAll = function(shoes) {
      var num = 0;
      var matesWithShoeMatch = [];
      var mates = [];
      // currentUser.mates.forEach(function(mateId) {
      //   var foundMate = UserService.getUserById({id:mateId}, function(user){
      //     mates.push(user)
      //   });
        
      // });
      // console.log("mates", mates)
      $rootScope.displayMates.forEach(function(mate) {
        //console.log("mate likes:", mate)
        shoes.forEach(function(shoe) {

          mate.likes.forEach(function(shoe_id) {
            if (shoe.id == shoe_id) {
              num += 1;
              //matesWithShoeMatch.push(mate)
              //console.log("Im in here,", num)
            } else {
              console.log("didn't find shoe Matches")
            }
          });
        })
      });
      return num;
    }

    factory.numShoeMatches2 = function(shoe) {
      //var num = 0;
      console.log("clicked numShoeMatches2");
      var shoePanel = {};
      var matesWithShoeMatch = [];
      // currentUser.mates.forEach(function(mateId) {
      //   var foundMate = UserService.getUserById(mateId);
      //   mates.push(foundMate)
      // });
      // console.log("mates", mates)
      $rootScope.displayMates.forEach(function(mate) {
        console.log("mate likes:", mate)
        mate.likes.forEach(function(shoe_id) {
          if (shoe.id == shoe_id) {
            //num += 1;
            matesWithShoeMatch.push(mate)
              //console.log("Im in here,", num)
          } else {
            console.log("didn't find shoe Matches2")
          }
        });
      });
      shoePanel = {
        mates: matesWithShoeMatch,
        shoe: shoe.shoeUrl
      };
      console.log("shoe panel:", shoePanel)
      return shoePanel;
    }

    factory.test = function(shoeId) {
      return shoeId;
    }

    factory.addTolikes = function(shoeId) {
      console.log("clicked");
      // if ($rootScope.currentUser.likes.indexOf(shoeId) < 0) {
      //   $rootScope.currentUser.likes.push(shoeId)
      //   console.log("user likes after:", $rootScope.currentUser.likes)
      // } else {
      //   var index = $rootScope.currentUser.likes.indexOf(shoeId);
      //   $rootScope.currentUser.likes.splice(index, 1);
      //   console.log("user likes else::", $rootScope.currentUser.likes)
      // }
    }

    return factory;
  }]);
  // var users = [{
  //   id: 1,
  //   username: 'username01',
  //   email: 'test01@gmail.com',
  //   password: 'password',
  //   rightFoot: '6.5',
  //   leftFoot: '7.0',
  //   shoeType: 'w',  
  //   mates: [2, 3],
  //   likes: [],
  //   msg: []
  // }, {
  //   id: 2,
  //   username: 'username02',
  //   email: 'test02@gmail.com',
  //   password: 'password',
  //   rightFoot: '7.0',
  //   leftFoot: '6.5',
  //   shoeType: 'w',
  //   mates: [1],
  //   likes: [1],
  //   msg: []
  // }, {
  //   id: 3,
  //   username: 'username03',
  //   email: 'test03@gmail.com',
  //   password: 'password',
  //   rightFoot: '7.0',
  //   leftFoot: '6.5',
  //   shoeType: 'w',
  //   mates: [1],
  //   likes: [1, 2],
  //   msg: []
  // }];


// return factory;
