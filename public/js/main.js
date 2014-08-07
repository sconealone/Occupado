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

  socket.on('unoccupied', function(data){
    console.log(data)
    $("#bathroom_status_" + data["bathroom_id"]).removeClass("Occupado");
    $("#bathroom_status_" + data["bathroom_id"]).text("Available");
  });

  socket.on('like', function(data){
    console.log(data)
    if($("#bathroom_" + data["bathroom_id"] + "_likes").attr("value") == "NaN"){
      var current_likes = 0;
    }
    else{
        var current_likes = parseInt($("#bathroom_" + data["bathroom_id"] + "_likes").attr("value"));
    }
    if($("#bathroom_" + data["bathroom_id"] + "_likes").attr("value") == "NaN"){
      var current_dislikes = 0;
    }
    else{
        var current_dislikes = parseInt($("#bathroom_" + data["bathroom_id"] + "_dislikes").attr("value"));
    }
    current_likes += 1
    $("#bathroom_" + data["bathroom_id"] + "_likes").attr("value", (current_likes))
    var sum = (current_likes+current_dislikes);
    if (sum == 0) sum = 1;

    $("#bathroom_" + data["bathroom_id"] + "_likes").text(Math.round((current_likes/sum)*100) + "%")
    $("#bathroom_" + data["bathroom_id"] + "_dislikes").text(Math.round((current_dislikes/(sum))*100) + "%")
  });

  socket.on('dislike', function(data){
    console.log(data)
    if($("#bathroom_" + data["bathroom_id"] + "_likes").attr("value") == "NaN"){
      var current_likes = 0;
    }
    else{
        var current_likes = parseInt($("#bathroom_" + data["bathroom_id"] + "_likes").attr("value"));
    }
    if($("#bathroom_" + data["bathroom_id"] + "_likes").attr("value") == "NaN"){
      var current_dislikes = 0;
    }
    else{
        var current_dislikes = parseInt($("#bathroom_" + data["bathroom_id"] + "_dislikes").attr("value"));
    }
    var sum = (current_likes+current_dislikes);
    if (sum == 0) sum = 1;
    current_dislikes += 1
    $("#bathroom_" + data["bathroom_id"] + "_dislikes").attr("value", (current_dislikes))
    $("#bathroom_" + data["bathroom_id"] + "_dislikes").text(Math.round((current_dislikes/(sum))*100) + "%")
    $("#bathroom_" + data["bathroom_id"] + "_likes").text(Math.round((current_likes/(sum))*100) + "%")

  });

});

function dislike(bathroom_id){
  $.get('/bathroom/dislike', {"bathroom_id" : bathroom_id});
}

function like(bathroom_id){
  $.get('/bathroom/like', {"bathroom_id" : bathroom_id});
}