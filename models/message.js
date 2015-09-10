var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    User = require("./user.js"),
    Shoe = require("./shoe.js");


var MessageSchema = new Schema({
    fromUser: {type: Schema.Types.ObjectId,
             ref: "User"
           },
    toUser: {type: Schema.Types.ObjectId,
             ref: "User"
           },
    shoe: {type: Schema.Types.ObjectId,
             ref: "Shoe"
           },
    body: {type: String, default: ""}
  });




var Message = mongoose.model("Message", MessageSchema);


module.exports = Message;