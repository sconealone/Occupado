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
    time_usage_data = new Array(4)
    day_usage_data = new Array(4)

    occupied.forEach(function(occ){ 
      if(occ=== null || typeof(occ) === "") return;

      time_usage_data[occ.br_id-1] = Array.apply(null, new Array(24)).map(Number.prototype.valueOf,0);
      day_usage_data[occ.br_id-1] = Array.apply(null, new Array(7)).map(Number.prototype.valueOf,0);

      occ.uses.forEach(function(use){
        time_usage_data[occ.br_id-1][use.start_time.getHours()] += 1
        day_usage_data[occ.br_id-1][use.start_time.getDay()] += 1
      })
    })



    //Aggregate bathroom usage data over days of the week


  	  res.render('home', {
	    title: 'Home',
      viewers : viewers,
	    occupied : occupied,
      time_usage_data : time_usage_data,
      day_usage_data : day_usage_data
	  });
  })

};