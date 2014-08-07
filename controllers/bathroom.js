/**
 * POST /bathroom/occupied
 * Login page.
 */
var BathroomStatus = require('../models/BathroomStatus');

exports.occupied = function(req, res) {
  BathroomStatus.findOne({br_id : req.query.bathroom_id}, function(err, br){
    console.log(br);
  	br.in_use = true;
  	br.start_time = new Date();
  	br.save()
  });
	res.status(200).end()
};

exports.unoccupied = function(req, res) {
  BathroomStatus.findOne({br_id : req.query.bathroom_id}, function(err, br){
    console.log(br);
  	br.in_use = false;
  	br.uses.push({start_time : br.start_time, end_time : new Date()})
    var summ = 0;
    for(var i = 0; i < br.uses.length; i++){
      summ += Math.round((br.uses[i].end_time - br.uses[i].start_time)/1000);
    }
    br.average = summ/br.uses.length;
  	br.save()
  });
	res.status(200).end()
};