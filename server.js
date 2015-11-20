//require express and other modules
var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'), 
  mongoose = require('mongoose'),
  request = require('request'),
  session = require('express-session'),
  dotenv = require('dotenv');
//require models

var Message = require("./models/message.js"),
    Shoe = require("./models/shoe.js"),
    User = require("./models/user.js");

// load dotenv
dotenv.load();



//connect to mongodb
mongoose.connect(
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/q_and_a'
);

//configure body-parser
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

//ERROR Handling
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

//middleware
//session
// app.use(session({
//   saveUninitialized: true,
//   resave: true,
//   secret: process.env.SESSION_SECRET,
//   cookie: { maxAge: 600000 }
  
// })); 

//routes

//Get Shoes
app.get('/api/shoes', function(req, res){
  Shoe.find({}, function(err, shoes){
    res.json(shoes);
  });
});
// Post Shoe
app.post('/api/shoes/', function(req, res){
  var newShoe = new Shoe({
    name: req.body.name,
    brand: req.body.brand,
    price: req.body.price,
    shoeUrl: req.body.shoeUrl,
    type: req.body.type
  });

  newShoe.save(function(err, savedShoe){
    res.json(savedShoe);
  });
});
//GET shoe by id
app.get('/api/shoes/:id', function(req, res){
  var shoe_id = req.params.id;
  Shoe.findOne({_id: shoe_id}, function(err, foundShoe){
    res.json(foundShoe);
  });
});
//PUT -UPDATE shoe by id
app.put('/api/shoes/:id', function(req, res){
  var shoe_id = req.params.id;
  Shoe.findOne({_id: shoe_id}, function(err, foundShoe){
    foundShoe.name = req.body.name;
    foundShoe.brand = req.body.brand;
    foundShoe.price = req.body.price;
    foundShoe.shoeUrl = req.body.shoeUrl;
    foundShoe.type = req.body.type;

    foundShoe.save(function(err, savedShoe){
      res.json(savedShoe);
    });
  }); 
});

//Delete shoe by id
app.delete('/api/shoes/:id', function(req, res){
  Shoe.find({_id: req.params.id}, function(err, user){
    console.log("shoe deleted", shoe);
    res.send("shoe was deleted:");
  });
});

//GET users
app.get('/api/users', function(req, res){
  User.find({}, function(err, users){
    res.json(users);
  });
});
//GET user by id
app.get('/api/users/:id', function(req, res){
  var user_id = req.params.id;
  User.findOne({_id: user_id})
      .populate("mates")
      .exec( function(err, foundUser){
        res.json(foundUser);
      });
});

//GET user by email
app.get('/api/users/email/:email', function(req, res){
  var user_email = req.params.email;
  User.findOne({email: user_email})
      .populate("mates")
      .exec( function(err, foundUser){
        console.log("found by email", foundUser);
        res.json(foundUser);
      });
});

//POST user
app.post('/api/users', function(req, res){
  var newUser = new User({
    username:  req.body.username, 
    email: req.body.email,
    password: req.body.password,
    leftFoot: req.body.leftFoot,
    rightFoot: req.body.rightFoot,
    shoeType: req.body.shoeType
  });
  console.log("the newUser::", newUser);

  newUser.save(function(err, savedUser){
    console.log(savedUser);
    if( err){
      console.log("some error with posting users", err);
    }
    res.json(savedUser);
  });

  // User.createSecure( newUser,
  //   function (err, secureUser){
  //     res.json(secureUser);
  //   }
  // );
});

//PUT - update user by id
app.put('/api/users/:id', function(req, res){
  var user_id = req.params.id;
  //console.log("req.body of update:", req.body)
  User.findOne({_id: user_id}, function(err, foundUser){
    //foundUser = req.body;
    //console.log("response from update user", foundUser)
  
    foundUser.username =  req.body.username;
    foundUser.email = req.body.email;
    foundUser.password = req.body.password;
    foundUser.leftFoot = req.body.leftFoot;
    foundUser.rightFoot = req.body.rightFoot;
    foundUser.shoeType = req.body.shoeType;
    foundUser.likes = req.body.likes;
    foundUser.messages = req.body.messages;
    foundUser.mates = req.body.mates;
    foundUser.save(function(err, savedUser){
      res.json(savedUser);
    });
  });
});

//Delete user by id
app.delete('/api/users/:id', function(req, res){
  var userId= req.params.id;
  User.findOneAndRemove({_id: req.params.id}, function(err, user){
    console.log("user deleted", userId);
    res.send("user was deleted:",userId);
  });
});

//Get Messages
app.get('/api/messages', function(req, res){
  Message.find({}, function(err, messages){
    res.json(messages);
  });
});
//GET Messages by id
app.get('/api/messages/:id', function(req, res){
  var msg_id = req.params.id;
  Shoe.findOne({_id: msg_id}, function(err, foundMsg){
    res.json(foundMsg);
  });
});
// Post Message
app.post('/api/messages/', function(req, res){
  var newMessages = new Message({
    name: req.body.name,
    brand: req.body.brand,
    price: req.body.price,
    shoeUrl: req.body.shoeUrl,
    type: req.body.type
  });

  newShoe.save(function(err, savedShoe){
    res.json(savedShoe);
  });
});

//Delete Message by id
app.delete('/api/messages/:id', function(req, res){
  Message.find({_id: req.params.id}, function(err, deletedMessage){
    console.log("message deleted", deletedMessage);
    res.send("message was deleted:");
  });
});


// set location for static files
app.use(express.static(__dirname + '/public'));

// load public/index.html file (angular app)
app.get('*', function (req, res) {
  res.sendFile(__dirname + '/public/views/index.html');
});
//listen on port 3000
app.listen(process.env.PORT || 3000, function() {
  console.log('server started on localhost:3000')
});
