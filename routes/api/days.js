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
  res.send( "get day num:" + req.params.day_num );
});


// POST to create new day
// POST /:day_num
router.post('/:day_num', function( req, res, next ) {
  res.send( "post day num:" + req.params.day_num );
});


// PUT to delete from or add to itineraries
// PUT /:day_num
router.put('/:day_num', function( req, res, next ) {
  res.send( "update day num:" + req.params.day_num );
});

// PUT /:day_num/hotel
router.put('/:day_num/hotel/', function( req, res, next ) {
  res.send( "update day num hotel:" + req.params.day_num );
});

// PUT /:day_num/restaurants
router.put('/:day_num/restaurants/', function( req, res, next ) {
  res.send( "update day num restaurants:" + req.params.day_num );
});

// PUT /:day_num/activities
router.put('/:day_num/activities/', function( req, res, next ) {
  res.send( "update day num activities:" + req.params.day_num );
});


// DELETE to delete days
// DELETE /:day_num
router.delete('/:day_num', function( req, res, next ) {
  res.send( "deleting day num:" + req.params.day_num );
});


module.exports = router;