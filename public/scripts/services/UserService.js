app.factory('UserService', [function() {
  var users = [{
    id: 1,
    username: 'username01',
    email: 'test01@gmail.com',
    password: 'password',
    rightFoot: '6.5',
    leftFoot: '7.0',
    shoeType: 'w',
    peopleMatches: [],
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
    peopleMatches: [],
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
    peopleMatches: [],
    wishlist: [{}],
    msg: []
  }];

  var factory = {}
  factory.getUsers = function() {
    return users;
  }
  factory.addUser = function() {
    newUser = {};
  }
  factory.checkForMatch = function(user){

  }

  return factory;
}]);
