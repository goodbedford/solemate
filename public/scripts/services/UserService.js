app.factory('UserService', [function() {
  var users = [{
    id: 1,
    username: 'username01',
    email: 'test01@gmail.com',
    password: 'password',
    rightFoot: '6.5',
    leftFoot: '7.0',
    shoeType: 'w',
    mates: [2,3],
    wishlist: [{}],
    msg: []
  }, {
    id: 2,
    username: 'username02',
    email: 'test02@gmail.com',
    password: 'password',
    rightFoot: '7.0',
    leftFoot: '6.5',
    shoeType: 'w',
    mates: [1],
    wishlist: [{}],
    msg: []
  }, {
    id: 3,
    username: 'username03',
    email: 'test03@gmail.com',
    password: 'password',
    rightFoot: '7.0',
    leftFoot: '6.5',
    shoeType: 'w',
    mates: [1],
    wishlist: [{}],
    msg: []
  }];

  var factory = {}
  factory.getUsers = function() {
    return users;
  }
  factory.getUserById = function(id) {
    var foundUser = null;
    users.forEach( function(user){
      if (user.id == id) {
        foundUser = user;
      }
    });
    return foundUser;
  }
  factory.addUser = function() {
    newUser = {};
  }
  factory.getMates = function(users, currentId) {
    var mates = [];
    users.forEach(function(user){
      if (user.id == currentId){
        user.mates.forEach( function(mate){
          foundMate = factory.getUserById(mate);
          mates.push(foundMate);
        });
      }
    });
    return mates;
  }


  return factory;
}]);
