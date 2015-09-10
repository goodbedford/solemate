var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  bcrypt = require('bcrypt'),
  salt = bcrypt.genSalt(10),
  session = require('express-session'),
  Shoe = require('./shoe.js'),
  Message = require('./message.js'),

  ObjectId = Schema.Types.ObjectId;

var UserSchema = new Schema({
  username: {
    type: String,
    default: "",
    required: true
  },
  email: {
    type: String,
    default: "",
    required: true
  },
  password: {
    type: String,
    default: "",
    required: true
  },
  leftFoot: {
    type: String,
    default: "",
    required: true
  },
  rightFoot: {
    type: String,
    default: "",
    required: true
  },
  shoeType: {
    type: String,
    default: "",
    required: true
  },
  likes: [{
    type: ObjectId,
    ref: 'Shoe'
  }],
  messages: [{
    type: ObjectId,
    ref: 'Message'
  }],

  mates: [{
    type: ObjectId,
    ref: 'User'
  }]
});

UserSchema.statics.createSecure = function(userData, callback) {
  var that = this;

  //hash password user enters at sign up
  bcrypt.genSalt(function(err, salt) {
    bcrypt.hash(userData.password, salt, function(err, hash) {

      //create the new user and save to db 
      that.create({
        username: userData.username,
        email: userData.email,
        password: hash
      }, callback);
    });
  });
};

//authenticate user when logging in
UserSchema.statics.authenticate = function(email, password, callback) {
  // find user by email and check password
  this.findOne({
    email: email
  }, function(err, user) {

    if (user === null) {
      callback("error: No email", null)
        //throw new Error('Can\'t find user with email-' + email);
    } else if (user.checkPassword(password)) {
      callback(null, user);
    }
  });
};

//checkpassword method
UserSchema.methods.checkPassword = function(userPassword) {
  return bcrypt.compareSync(userPassword, this.password);
};

var User = mongoose.model('User', UserSchema);

module.exports = User;
