$(document).ready(function() {

  // Place JavaScript code here...
  var socket = io.connect(window.location.href);
  socket.on('greet', function (data) {
    console.log(data);
    socket.emit('respond', { message: 'Hello to you too, Mr.Server!' });
  });

  socket.on('occupied', function(data){
  	console.log(data)
  	$("#bathroom_status_" + data["bathroom_id"]).addClass("Occupado");
  	$("#bathroom_status_" + data["bathroom_id"]).text("Occupado");
  });

  socket.on('unoccupied', function(data){
  	console.log(data)
  	$("#bathroom_status_" + data["bathroom_id"]).removeClass("Occupado");
  	$("#bathroom_status_" + data["bathroom_id"]).text("Available");
  });

});