$('document').ready(function() {
 
  var url = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json';
  
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  $.getJSON(url, function(jsonData) {
    var data = jsonData.data;
    console.log('success');
    //console.log(data);
    //console.log(JSON.stringify(jsonData));

    d3.select(".notes")
      .append("text")
      .text(jsonData.description);

    var margin = {top: 5, right: 10, bottom: 30, left: 75},
        width = 1000 -margin.left - margin. right,
        height = 500 - margin.top - margin.bottom;
 
    var barWidth = Math.ceil(width / data.length);
    
    //format x range for dates from data
    minDate = new Date(data[0][0]);
    maxDate = new Date(data[data.length - 1][0]);
    
    //set x scale and range for chart
    var x = d3.time.scale()
      .range([0, width])
      .domain([minDate, maxDate]);
    
    //set y scale and range for chart
    var y = d3.scale.linear()
      .range([height, 0])
      .domain([0, d3.max(data, function(d) { return d[1];})]);

    //define xAxis properties
    var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .ticks(d3.time.years, 5);
    
    //set chart area size
    var chart = d3.select(".chart")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //add x-axis
    chart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);
    
    //set individual bars for data pts
    chart.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(new Date(d[0]));})
      .attr("y", function(d) { return y(d[1]);})
      .attr("height", function(d) { return height - y(d[1]);})
      .attr("width", barWidth);

  });
});