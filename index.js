$('document').ready(function() {
 
  var url = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json';
  
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  $.getJSON(url, function(jsonData) {
    var data = jsonData.data;
    console.log('success');
    console.log(data);
    console.log(JSON.stringify(jsonData));

  });
});