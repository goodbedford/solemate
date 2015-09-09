app.factory('UserService', '$resource',  [function($resource) {
  // var users = [{
  //   id: 1,
  //   username: 'username01',
  //   email: 'test01@gmail.com',
  //   password: 'password',
  //   rightFoot: '6.5',
  //   leftFoot: '7.0',
  //   shoeType: 'w',
  //   mates: [2, 3],
  //   wishlist: [],
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
  //   wishlist: [1],
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
  //   wishlist: [1, 2],
  //   msg: []
  // }];

  // var factory = {}
  // factory.getUsers = function() {
  //   return users;
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
  // factory.addUser = function() {
  //   newUser = {};
  // }

  // //searches t
  // factory.getMates = function(users, currentId) {
  //   var mates = [];
  //   users.forEach(function(user) {
  //     if (user.id == currentId) {
  //       user.mates.forEach(function(mate) {
  //         var foundMate = factory.getUserById(mate);
  //         mates.push(foundMate);
  //       });
  //     }
  //   });
  //   return mates;
  // }

  // factory.numShoeMatches = function(currentUser, shoeId) {
  //   //var num = 0;
  //   var matesWithShoeMatch = [];
  //   var mates = [];
  //   currentUser.mates.forEach(function(mateId) {
  //     var foundMate = factory.getUserById(mateId);
  //     mates.push(foundMate)
  //   });
  //   // console.log("mates", mates)
  //   mates.forEach(function(mate) {
  //     //console.log("mate wishlist:", mate)
  //     mate.wishlist.forEach(function(shoe_id) {
  //       if (shoeId == shoe_id) {
  //         //num += 1;
  //         matesWithShoeMatch.push(mate)
  //           //console.log("Im in here,", num)
  //       } else {
  //         console.log("didn't find shoe Matches")
  //       }
  //     });
  //   });
  //   return matesWithShoeMatch;
  // }
  // factory.numShoeMatchesAll = function(currentUser, shoes) {
  //   var num = 0;
  //   var matesWithShoeMatch = [];
  //   var mates = [];
  //   currentUser.mates.forEach(function(mateId) {
  //     var foundMate = factory.getUserById(mateId);
  //     mates.push(foundMate)
  //   });
  //   // console.log("mates", mates)
  //   mates.forEach(function(mate) {
  //     //console.log("mate wishlist:", mate)
  //     shoes.forEach(function(shoe) {

  //       mate.wishlist.forEach(function(shoe_id) {
  //         if (shoe.id == shoe_id) {
  //           num += 1;
  //           //matesWithShoeMatch.push(mate)
  //             //console.log("Im in here,", num)
  //         } else {
  //           console.log("didn't find shoe Matches")
  //         }
  //       });
  //     })
  //   });
  //   return num;
  // }

  // factory.numShoeMatches2 = function(currentUser, shoe) {
  //   //var num = 0;
  //   console.log("clicked numShoeMatches2");
  //   var shoePanel = {};
  //   var matesWithShoeMatch = [];
  //   var mates = [];
  //   currentUser.mates.forEach(function(mateId) {
  //     var foundMate = factory.getUserById(mateId);
  //     mates.push(foundMate)
  //   });
  //   // console.log("mates", mates)
  //   mates.forEach(function(mate) {
  //     console.log("mate wishlist:", mate)
  //     mate.wishlist.forEach(function(shoe_id) {
  //       if (shoe.id == shoe_id) {
  //         //num += 1;
  //         matesWithShoeMatch.push(mate)
  //           //console.log("Im in here,", num)
  //       } else {
  //         console.log("didn't find shoe Matches2")
  //       }
  //     });
  //   });
  //   shoePanel = {
  //     mates: matesWithShoeMatch,
  //     shoe: shoe.shoeUrl
  //   };
  //   console.log("shoe panel:", shoePanel)
  //   return shoePanel;
  // }

  // factory.test = function(shoeId) {
  //   return shoeId;
  // }

  // factory.addToWishList = function(user, shoeId) {
  //   console.log("clicked")
  //   if (user.wishlist.indexOf(shoeId) < 0) {
  //     user.wishlist.push(shoeId)
  //     console.log("user wishlist after:", user.wishlist)
  //   } else {
  //     var index = user.wishlist.indexOf(shoeId);
  //     user.wishlist.splice(index, 1);
  //     console.log("user wishlist else::", user.wishlist)
  //   }
  // }

  return factory;
}]);
