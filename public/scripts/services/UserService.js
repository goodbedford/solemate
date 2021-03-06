app.factory('UserService', ['$resource', function($resource) {


    return $resource('/api/users/:id', {
      id: '@_id'
    }, {
      update: {
        method: 'PUT'
      },
      query: {
        method: 'GET',
        isArray: true
      },
      get: {
        method: 'GET',
        isArray: false
      }
    });
  }])
  .factory('MatesService', ['$rootScope', 'UserService', function($rootScope, UserService) {
    var factory = {};

    factory.findById = function(source, id) {
      return source.filter(function( obj ) {
          // coerce both obj.id and id to numbers 
          // for val & type comparison
          return obj._id == id;
      })[ 0 ];
    };
    factory.addUser = function() {
      newUser = {};
    };

    factory.addMates = function(currentUser, users, str) {
      //for each user if feet are opposite
      // push user._id into currentUser mateShoe
      var foundMate;      
      if( str === "id"){
        users.forEach(function(user) {
        // console.log("the currentUser in addMates:", currentUser);
        // console.log("the user in users:", user);
          if( currentUser.mates.indexOf(user._id ) < 0 ){
              console.log("inside addmatess user._id:", user._id);
              console.log("inside addmates user:", user); 
            if (user.leftFoot == currentUser.rightFoot && user.rightFoot == currentUser.leftFoot) {
                  currentUser.mates.push(user._id);
                  console.log("user._id", user._id);
                  console.log("currentUser to:", currentUser);
            } 
          }
        });
        UserService.update({
          id: currentUser._id
        }, currentUser, function(updatedUser) {
          console.log("updated user:", updatedUser);
        });
        } else if ( str === "obj"){
          console.log("the obj currentUser in addMates:", currentUser);
          users.forEach(function(user) {
              //check if users shoe matches
              if (user.leftFoot == currentUser.rightFoot && user.rightFoot == currentUser.leftFoot) {
                //check if user is in current user mates array
                foundMate = factory.findById(currentUser.mates, user._id);
                if( foundMate){
                    console.log("user:",user,"already in currentUser.mates");
                } else {
                  //push user into current user mates matches array
                  currentUser.mates.push(user);
                  console.log("user._id", user._id);
                  console.log("currentUser:", currentUser.mates); 
                }
              } else{
                console.log("shoes size don't match user:", user);
              }
          });
          UserService.update({
            id: currentUser._id
          }, currentUser, function(updatedUser) {
            console.log("updated user:", updatedUser);
          });
        } else {
          console.log("error");
        }
      };

    //searches 
    factory.getMates = function(currentId, users) {
      var mates = [];
      users.forEach(function(user) {
        if (user._id == currentId) {
          user.mates.forEach(function(mate) {
            var foundMate = UserService.get(mate);
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

        currentUser.likes.forEach(function(currentUserShoeId){
          console.log("currentUserShoeId:",currentUserShoeId);
          mate.likes.forEach(function(mateShoeId){
            console.log("mateShoeId:", mateShoeId);
            if(mateShoeId == currentUserShoeId){
              matesWithShoeMatch.push(mate);
              console.log("pushed mate", mate);
            }
          });
        });
      });
      console.log("num of shoe matches:", matesWithShoeMatch.length);
      return matesWithShoeMatch;
    };
    
    factory.matchesPerShoe = function(matesWithShoeMatches, shoeId){
      var matesPerShoe = [];
      var tempMate = {};
      var index;
      matesWithShoeMatches.forEach(function(mate){
        index = mate.likes.indexOf(shoeId);
        console.log("the mate likes", mate.likes);
        console.log("the shoeId", shoeId);

        if( index >= 0) {
          console.log("the matePerShoe",matesPerShoe);
          tempMate._id = mate._id;
          tempMate.username = mate.username;
          tempMate.shoeId = shoeId;
          matesPerShoe.push(tempMate);
          console.log("the mates PerShoe", matesPerShoe);
        }
      });
      return matesPerShoe;
    };
    // factory.numShoeMatches2 = function(shoe) {
    //   //var num = 0;
    //   console.log("clicked numShoeMatches2");
    //   var shoePanel = {};
    //   var matesWithShoeMatch = [];
    //   // currentUser.mates.forEach(function(mateId) {
    //   //   var foundMate = UserService.get(mateId);
    //   //   mates.push(foundMate)
    //   // });
    //   // console.log("mates", mates)
    //   $rootScope.displayMates.forEach(function(mate) {
    //     console.log("mate likes:", mate);
    //     mate.likes.forEach(function(shoe_id) {
    //       if (shoe.id == shoe_id) {
    //         //num += 1;
    //         matesWithShoeMatch.push(mate);
    //           //console.log("Im in here,", num)
    //       } else {
    //         console.log("didn't find shoe Matches2");
    //       }
    //     });
    //   shoePanel = {
    //     mates: matesWithShoeMatch,
    //     shoe: shoe.shoeUrl
    //   };
    //   console.log("shoe panel:", shoePanel);
    //   return shoePanel;
    // };

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
