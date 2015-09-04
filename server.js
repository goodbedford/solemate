//require express and other modules
var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  request = require('request'),
  dotenv = require('dotenv');
//require models
var Question = require('./models/question');
var Answer = require('./models/answer');

// load dotenv
dotenv.load();

//AWS APAC 
var util = require('util'),
    OperationHelper = require('apac').OperationHelper;

var opHelper = new OperationHelper({
    awsId:     process.env.ACCESS_KEY_ID,
    awsSecret: process.env.SECRET_ACCESS_KEY,
    assocId:   process.env.ASSOCIATE_TAG,
    // xml2jsOptions: an extra, optional, parameter for if you want to pass additional options for the xml2js module. (see https://github.com/Leonidas-from-XIV/node-xml2js#options)
    version:   '2013-08-01'
    // your version of using product advertising api, default: 2013-08-01
});


// execute(operation, params, callback)
// operation: select from http://docs.aws.amazon.com/AWSECommerceService/latest/DG/SummaryofA2SOperations.html
// params: parameters for operation (optional)
// callback(err, parsed, raw): callback function handling results. err = potential errors raised from xml2js.parseString() or http.request(). parsed = xml2js parsed response. raw = raw xml response.

// opHelper.execute('ItemSearch', {
//   'SearchIndex': 'Shoes',
//   'Keywords': 'shoes',
//   'ResponseGroup': 'ItemAttributes,Offers'
// }, function(err, results) { // you can add a third parameter for the raw xml response, "results" here are currently parsed using xml2js
//     console.log(results);
// });

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

//routes

//Get Shoes
app.get('/api/shoes', function(req, res){
 //  //console.log(opHelper)
 // request.get("http://webservices.amazon.com/onca/xml?AWSAccessKeyId=AKIAIGDDFE3CAEAE4CCQ&AssociateTag=solemate-20&Condition=New&Keywords=shoes&Operation=ItemSearch&ResponseGroup=Images&SearchIndex=Shoes&Service=AWSECommerceService&Timestamp=2015-09-03T19%3A24%3A59.000Z&Version=2011-08-01&Signature=7x2%2Fbm0qEQC96VZDvGQNVrWBSbTAAU4NYuFBU0WqTf8%3D", function(err, respond, body){
 //  //console.log(body)
 //  //data = XML.parse(body)
 //  res.body
 // });

 opHelper.execute('ItemSearch', {
   'SearchIndex': 'Shoes',
   'Keywords': 'shoes',
   'ResponseGroup': 'Images,'
 }, function(err, results) { // you can add a third parameter for the raw xml response, "results" here are currently parsed using xml2js
     //console.log(results.ItemSearchResponse.Items);
     //console.log(util.inspect(results, false, null));
     // console.log( results.ItemSearchResponse.OperationRequest[0])
     //console.log( results.ItemSearchResponse.Items[0].Item[0].ItemAttributes[0].Title)
     
     //console.log(results.ItemSearchResponse.Items[0])
     //Get Image
     var images = results.ItemSearchResponse.Items[0].Item;
     var imgUrl = [];
     images.forEach( function (img) {
      //console.log(img.MediumImage[0].URL)
      imgUrl.push(img.MediumImage[0].URL['0'])
     })
     res.send(imgUrl)
     //Get title
     // var items = results.ItemSearchResponse.Items[0].Item;
     // var titles = [];
     //  console.log(items.forEach(function(item){
     //   titles.push(item.ItemAttributes[0].Title);
     //  }));
     //  console.log(titles)
     // res.send(titles)
     //res.send( results.ItemSearchResponse.Items[0].Item[0].ItemAttributes[0].Title)

 });

});

//GET questions
app.get('/api/questions', function(req, res) {
  Question.find({}, function(err, questions) {
    res.json(questions);
  });
});

//GET questions id
app.get('/api/questions/:id', function(req, res) {
  var targetId = req.params.id;
  Question.findOne({
      _id: targetId
    },
    function(err, foundUser) {
      res.json(foundUser);
    });
});


//POST question
app.post('/api/questions', function(req, res) {
  var newQuestion = new Question({
    text: req.body.text
  });

  newQuestion.save(function(err, savedQuestion) {
    res.json(savedQuestion);
    console.log("error msg:", err.errors.text.message)
    // err.forEach(function(msg){
    //   console.log(msg )
    // });
  });
});

//PUT question
app.put('/api/questions/:id', function(req, res) {
  var targetId = req.params.id;

  Question.findOne({
    _id: targetId
  }, function(err, foundQuestion) {
    foundQuestion.text = req.body.text || foundQuestion.text;

    foundQuestion.save(function(err, savedQuestion) {
      res.json(savedQuestion);
    });
  });
});

//DELETE question
app.delete('/api/questions/:id', function(req, res) {
  var targetId = req.params.id;

  Question.findOneAndRemove({
    _id: targetId
  }, function(error, deleteQuestion) {
    res.json("Deleted: " + deleteQuestion);
  });
});

//POST answer 
app.post('/api/questions/:question_id/answers', function(req, res) {
  var targetId = req.params.question_id;
  console.log(req.body);
  var newAnswer = new Answer(req.body);
  Question.findOne({
    _id: targetId
  }, function(err, foundQuestion) {
    foundQuestion.answers.push(newAnswer);
    foundQuestion.save(function(err, savedQuestion) {
      res.json(savedQuestion);
    });
  });
});
//PUT answer
app.put('/api/questions/:question_id/answers/:id', function(req, res) {
  var targetId = req.params.question_id;
  var answerId = req.params.id;
    console.log("found answer",req.body)

  Question.findOne({
    _id: targetId
  }, function(err, foundQuestion) {
    var foundAnswer = foundQuestion.answers.id(answerId);
    foundAnswer.content = req.body.content;
    foundQuestion.save(function(err, savedQuestion) {
      res.json(savedQuestion);
    });
  });
});

//Delete anwser
app.delete('/api/questions/:question_id/answers/:id', function(req, res) {
  var targetId = req.params.question_id;
  var answerId = req.params.id;
  Question.findOne({
    _id: targetId
  }, function(err, foundQuestion) {
    var foundAnswer = foundQuestion.answers.id(answerId);
    foundAnswer.remove();
    foundQuestion.save(function(err, savedQuestion) {
      res.json(foundAnswer);
    });
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
