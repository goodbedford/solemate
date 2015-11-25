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
    var factory = {};


    factory.addUser = function() {
      newUser = {};
    };

    factory.addMates = function(currentUser, users) {
      //for each user if feet are opposite
      // push user._id into currentUser mates
      users.forEach(function(user) {
        if (user.leftFoot == currentUser.rightFoot && user.rightFoot == currentUser.leftFoot) {
              currentUser.mates.push(user._id);
              console.log("currentUser to:", currentUser);
          }
      });
      UserService.update({
        id: currentUser._id
      }, currentUser, function(updatedUser) {
        console.log("updated user:", updatedUser);
      });
      UserService.getUserById({id: currentUser._id} ,function(user){
      currentUser = user;
      console.log("user in addMates:", user);
      console.log("curren user in addMates:", currentUser);

      });

    };

    //searches 
    factory.getMates = function(currentId, users) {
      var mates = [];
      users.forEach(function(user) {
        if (user._id == currentId) {
          user.mates.forEach(function(mate) {
            var foundMate = UserService.getUserById(mate);
            mates.push(foundMate);
          });
        }
      });
      return mates;
    };

    factory.numShoeMatchById = function(currentUser, shoeId) {
      //var num = 0;
      var matesWithShoeMatch = [];
      currentUser.mates.forEach(function(mate) {
        //console.log("mate likes:", mate)
        mate.likes.forEach(function(shoe_id) {
          if (shoeId == shoe_id) {
            matesWithShoeMatch.push(mate);
          } else {
            console.log("didn't find shoe Matches");
          }
        });
      });
      return matesWithShoeMatch;
    };
    factory.numShoeMatchesAll = function(currentUser, shoes) {
      console.log("currentUser all:", currentUser);
      console.log("shoes :", shoes);
      var matesWithShoeMatch = [];
      currentUser.mates.forEach(function(mate){

        currentUser.likes.forEach(function(currentUserShoe){
          console.log("currentUserShoe:",currentUserShoe);
          mate.likes.forEach(function(mateShoe){
            console.log("mateShoe:", mateShoe);
            if(mateShoe == currentUserShoe){
              matesWithShoeMatch.push(mateShoe);
              console.log("pushed mateShoe", mateShoe);
            }
          });
        });
      });
      console.log("num of shoe matches:", matesWithShoeMatch.length);
      return matesWithShoeMatch;
    };
    
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
        console.log("mate likes:", mate);
        mate.likes.forEach(function(shoe_id) {
          if (shoe.id == shoe_id) {
            //num += 1;
            matesWithShoeMatch.push(mate);
              //console.log("Im in here,", num)
          } else {
            console.log("didn't find shoe Matches2");
          }
        });
      });
      shoePanel = {
        mates: matesWithShoeMatch,
        shoe: shoe.shoeUrl
      };
      console.log("shoe panel:", shoePanel);
      return shoePanel;
    };

    factory.test = function(shoeId) {
      return shoeId;
    };

    factory.addToLikes = function(currentUser, shoeId) {
       console.log("clicked");
       console.log("shoeId:", shoeId);
       console.log("current user", currentUser);
      if (currentUser.likes.indexOf(shoeId) < 0) {
        currentUser.likes.push(shoeId);
        console.log("user likes after:", currentUser.likes);
      } else {
        var index = currentUser.likes.indexOf(shoeId);
        currentUser.likes.splice(index, 1);
        console.log("user likes else::", currentUser.likes);
      }
      UserService.update({_id: currentUser._id},currentUser, function(data){
          console.log("this person was updated", data);
      });
    };

    factory.isLiked = function(currentUser, shoeId){
      var isLiked = false;
      if (currentUser.likes.indexOf(shoeId) < 0) {
          isLiked = false;
      } else {
          isLiked = true;
      }
      return isLiked;
    };

    return factory;
  }]);



// return factory;
