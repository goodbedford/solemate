app.factory('MessageService', [ function(){
  var msgs = [ {from: 1,
                to: 2,
                shoe: 1,
                body: "I glad you like theses shoes. Do you want to get the 7 and I get the 6.5?"
              }]
  var factory = {}
  factory.getMgs = function() {
    return msgs;
  }
  return factory;

}]);