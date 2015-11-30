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
router.put('/:day_num/hotel/', function( req, res, next ) {
  Day.update({number: req.params.day_num}, {hotel: req.body.hotel}).then(function(info) {
    res.json(info);
  });
});

// PUT /:day_num/restaurants
router.put('/:day_num/restaurants/', function( req, res, next ) {
  Day.update({number: req.params.day_num}, {restaurants: req.body.restaurants}).then(function( info ) {
    res.json(info);
  });  
});

// PUT /:day_num/activities
router.put('/:day_num/activities/', function( req, res, next ) {
  Day.update({number: req.params.day_num}, {activities: req.body.activities}).then(function( info ) {
    res.json(info);
  });  
});

// DELETE to delete days
// DELETE /:day_num
router.delete('/:day_num', function( req, res, next ) {
  Day.remove({number: req.params.day_num}).exec().then(function( info ) {
    res.json(info);
    return Day.find({number: {$ge:req.params.day_num}})
  }).then(function(days) {
    days.forEach(function(day) {
      day.number--;
      day.save();
    });
  });
});


module.exports = router;