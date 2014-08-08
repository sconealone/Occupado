/**
 * GET /
 * Home page.
 */
var BathroomStatus = require('../models/BathroomStatus');

exports.index = function(req, res, viewers) {
  BathroomStatus.find({}, function(err, br_statuses){
  	var bathroom_ids = [1, 2, 3, 4]
  	var occupied = new Array(4)
  	br_statuses.forEach(function(status){
  		var ind = bathroom_ids.indexOf(status.br_id)
  		if (ind >= 0 ){
  			occupied[status.br_id] = status
  			bathroom_ids.splice(ind, 1);
  		}
  	})

  	if(bathroom_ids.length > 0){
  		for(var i = 0; i < bathroom_ids.length; i++){
  			occupied[bathroom_ids[i]] = new BathroomStatus({
  				  br_id : bathroom_ids[i], 
				  in_use : false,
				  start_time : new Date(), 
				  number_of_uses : 0,
				  average_time : 0,
				  uses : []
	  			}).save()
  		}
  	}

  	  res.render('home', {
	    title: 'Home',
      viewers : viewers,
	    occupied : occupied
	  });
  })

};