/**
 * POST /bathroom/occupied
 * Login page.
 */
var BathroomStatus = require('../models/BathroomStatus');

exports.occupied = function(req, res) {
  BathroomStatus.findOne({br_id : req.query.bathroom_id}, function(err, br){
  	br.in_use = true;
  	br.start_time = new Date();
  	br.number_of_uses += 1;
  	br.save()
  });
	res.status(200).end()
};

exports.unoccupied = function(req, res) {
  BathroomStatus.findOne({br_id : req.query.bathroom_id}, function(err, br){
  	br.in_use = false;
  	br.uses.push({start_time : br.start_time, end_time : new Date()})
  	br.save()
  });
	res.status(200).end()
};