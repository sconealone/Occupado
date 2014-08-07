var mongoose = require('mongoose');

var bathroomStatusSchema = new mongoose.Schema({
  br_id : Number, // 1,2,3,4 for the bathrooms we have in use
  in_use : Boolean,
  start_time : Date, //Of use
  average : Number,
  count: Number,
  uses : [{
    start_time : Date,
    end_time : Date
  }],
  ratings : [Number]
});

module.exports = mongoose.model('BathroomStatus', bathroomStatusSchema);
