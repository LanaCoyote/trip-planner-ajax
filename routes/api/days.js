var express = require('express');
var router = express.Router();

var models = require('../../models');
var Hotel = models.Hotel;
var Restaurant = models.Restaurant;
var Activity = models.Activity;
var Day = models.Day;

// GET to retrieve data
// GET /  - retrieve all current days
router.get('/', function( req, res, next ) {
  Day.find({}).exec().then( function( days ) {
    res.json( days );
  });
});

// GET /:day_num  - retrieve the given day
router.get('/:day_num', function( req, res, next ) {
  Day.findOne({number: req.params.day_num}).populate('hotel activities restaurants').exec().then( function (day) {
    res.json( day );
  });
});


// POST to create new day
// POST /
router.post('/', function( req, res, next ) {
  Day.count({}).then(function(count) {
    Day.create({number: count+1}).then(function( info ) {
      res.json( info );
    });
  });
});

// PUT /:day_num/hotel
router.put('/:day_num/hotels/', function( req, res, next ) {
  Day.update({number: req.params.day_num}, {hotel: req.body.hotels}).then(function(info) {
    return Hotel.findOne({_id: req.body.hotels}).exec();
  }).then( function( hotel ) {
    res.json( hotel );
  });
});

// PUT /:day_num/restaurants
router.put('/:day_num/restaurants/', function( req, res, next ) {
  Day.findOne({number: req.params.day_num}).exec().then( function( day ) {
    day.restaurants.push( req.body.restaurants );
    return day.save();
  }).then( function() {
    return Restaurant.findOne({_id: req.body.restaurants}).exec();
  }).then( function( restaurant ) {
    res.json( restaurant )
  });
});

// PUT /:day_num/activities
router.put('/:day_num/activities/', function( req, res, next ) {
  Day.findOne({number: req.params.day_num}).exec().then( function( day ) {
    day.activities.push( req.body.activities );
    return day.save();
  }).then( function() {
    return Activity.findOne({_id: req.body.activities }).exec();
  }).then( function( activity ) {
    res.json( activity )
  });
});

// DELETE to delete days
// DELETE /:day_num
router.delete('/:day_num', function( req, res, next ) {
  Day.remove({number: req.params.day_num}).exec().then(function( info ) {
    res.json(info);
    return Day.find({number: {$gte: req.params.day_num}}).exec()
  }).then(function(days) {
    days.forEach(function(day) {
      day.number--;
      day.save();
    });
  });
});

// DELETE /:day_num/hotels
router.delete('/:day_num/hotels', function( req, res, next ) {
  Day.findOne({number: req.params.day_num}).populate('restaurants activities').exec().then( function( day ) {
    day.hotel = null;
    return day.save();
  }).then(function( day ) {
    res.json( day );
  });
});

// DELETE /:day_num/restaurants
router.delete('/:day_num/restaurants', function( req, res, next ) {
  Day.findOne({number: req.params.day_num}).populate('hotel restaurants activities').exec().then( function( day ) {
    var rest_idx = day.restaurants.map(function(id){ return id.toString() }).indexOf( req.body.restaurants );
    day.restaurants.splice( rest_idx, 1 );
    return day.save();
  }).then( function( day ) {
    res.json( day );
  });
});

// DELETE /:day_num/activities
router.delete('/:day_num/activities', function( req, res, next ) {
  Day.findOne({number: req.params.day_num}).populate('hotel restaurants activities').exec().then( function( day ) {
    var rest_idx = day.activities.map(function(id){ return id.toString() }).indexOf( req.body.activities );
    day.activities.splice( rest_idx, 1 );
    return day.save();
  }).then( function( day ) {
    res.json( day );
  });
});


module.exports = router;