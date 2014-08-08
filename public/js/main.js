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

  socket.on('viewer', function(data){
    $(".viewer-count").first().text(data["viewers"] + " people watching");
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
    current_dislikes += 1
    var sum = (current_likes+current_dislikes);
    if (sum == 0) sum = 1;
    $("#bathroom_" + data["bathroom_id"] + "_dislikes").attr("value", (current_dislikes))
    $("#bathroom_" + data["bathroom_id"] + "_dislikes").text(Math.round((current_dislikes/(sum))*100) + "%")
    $("#bathroom_" + data["bathroom_id"] + "_likes").text(Math.round((current_likes/(sum))*100) + "%")

  });

  // Get the context of the canvas element we want to select
  var ctx = document.getElementById("myChart").getContext("2d");
  var start_index = 0;
  var data = {
      labels: ["Midnight", "1am", "2am", "3am", "4am", "5am", "6am", "7am", "8am", "9am", "10am", "11am", "12am", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm", "11pm"],
      datasets: [
          {
              label: "3rd Floor (2) ",
              fillColor: "rgba(220,220,220,0.2)",
              strokeColor: "rgba(220,220,220,1)",
              pointColor: "rgba(220,220,220,1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#fff",
              pointHighlightStroke: "rgba(220,220,220,1)",
              data: time_usage_data[0]
          },
          {
              label: "3rd Floor (2) ",
              fillColor: "rgba(152,0,0,0.2)",
              strokeColor: "rgba(152,0,0,1)",
              pointColor: "rgba(152,0,0,1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#fff",
              pointHighlightStroke: "rgba(152,0,0,1)",
              data: time_usage_data[1]
          },
          {
              label: "4th Floor (1) ",
              fillColor: "rgba(0, 143, 23, 0.2)",
              strokeColor: "rgba(0, 143, 23,1)",
              pointColor: "rgba(0, 143, 23, 1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#fff",
              pointHighlightStroke: "rgba(0, 143, 23, 1)",
              data: time_usage_data[2]
          },
          {
              label: "4th Floor (2) ",
              fillColor: "rgba(151,187,205,0.2)",
              strokeColor: "rgba(151,187,205,1)",
              pointColor: "rgba(151,187,205,1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#fff",
              pointHighlightStroke: "rgba(151,187,145,1)",
              data: time_usage_data[3]
          }
      ]
  };
  myLineChart = new Chart(ctx).Line(data, { responsive: true, multiTooltipTemplate: "<%= datasetLabel %>: <%= value %>", scaleShowLabels: true});

  // Get the context of the canvas element we want to select
  ctx = document.getElementById("myChart2").getContext("2d");
  data = {
      labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      datasets: [
          {
              label: "3rd Floor (1) ",
              fillColor: "rgba(220,220,220,0.2)",
              strokeColor: "rgba(220,220,220,1)",
              pointColor: "rgba(220,220,220,1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#fff",
              pointHighlightStroke: "rgba(220,220,220,1)",
              data: day_usage_data[0]
          },
          {
              label: "3rd Floor (2) ",
              fillColor: "rgba(152,0,0,0.2)",
              strokeColor: "rgba(152,0,0,1)",
              pointColor: "rgba(152,0,0,1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#fff",
              pointHighlightStroke: "rgba(152,0,0,1)",
              data: day_usage_data[1]
          },
          {
              label: "4th Floor (1) ",
              fillColor: "rgba(0, 143, 23,0.2)",
              strokeColor: "rgba(0, 143, 23,1)",
              pointColor: "rgba(0, 143, 23,1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#fff",
              pointHighlightStroke: "rgba(0, 143, 23,1)",
              data: day_usage_data[2]
          },
          {
              label: "4th Floor (2) ",
              fillColor: "rgba(151,187,205,0.2)",
              strokeColor: "rgba(151,187,205,1)",
              pointColor: "rgba(151,187,205,1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#fff",
              pointHighlightStroke: "rgba(151,187,145,1)",
              data: day_usage_data[3]
          }
      ]
  };
  myLineChart = new Chart(ctx).Line(data, { responsive: true, multiTooltipTemplate: "<%= datasetLabel %>: <%= value %>", scaleShowLabels: true});

  
});

function dislike(bathroom_id){
  $.get('/bathroom/dislike', {"bathroom_id" : bathroom_id});
}

function like(bathroom_id){
  $.get('/bathroom/like', {"bathroom_id" : bathroom_id});
}