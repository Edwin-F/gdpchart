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

    //define yAxis properties
    var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .ticks(10, "");
    
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

    //add y-axis
    chart.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.8em")
      .style("text-anchor", "end")
      .text("Gross Domestic Product, USA");

    //define tooltip properties
    var tooltip =  d3.select(".card")
      .append("div")
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden")
      .style("background", "yellow")
      .text("a simple tooltip");
        
    //set individual bars for data pts
    chart.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(new Date(d[0]));})
      .attr("y", function(d) { return y(d[1]);})
      .attr("height", function(d) { return height - y(d[1]);})
      .attr("width", barWidth)
      //code to make visible the tooltip
      .on("mouseover", function(d) {tooltip.text(d[1]); return tooltip.style("visibility", "visible"); })
      .on("mousemove", function() {return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left",(d3.event.pageX + 10)+ "px");})
      .on("mouseout", function() {return tooltip.style("visibility", "hidden");});

  });
});