var mongoose = require('mongoose');
var HotelSchema = require('./hotel').schema;
var RestaurantSchema = require('./restaurant').schema;
var ActivitySchema = require('./activity').schema;

var Fkey = mongoose.Schema.Types.ObjectId;
var DaySchema = new mongoose.Schema({
  number: {type:Number},
  hotel: {type: Fkey, ref: "Hotel"},
  restaurants: [{type: Fkey, ref: "Restaurant"}],
  activities: [{type: Fkey, ref: "Activity"}],
});

module.exports = mongoose.model('Day', DaySchema);
