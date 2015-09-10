var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


var ShoeSchema = new Schema({
  name: {
    type: String,
    default: "",
    required: true
  },
  brand: {
    type: String,
    default: "",
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  shoeUrl: {
    type: String,
    default: "",
    required: true
  },
  type: {
    type: String,
    default: "",
    required: true
  }
});

var Shoe = mongoose.model('Shoe', ShoeSchema);


module.exports = Shoe;
