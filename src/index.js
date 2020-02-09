

console.log('hello world')


// stolen from https://www.d3-graph-gallery.com/intro_d3js.html

// set the dimensions and margins of the graph
var margin = {top: 10, right: 40, bottom: 30, left: 30},
    width = 1000 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;
	
var d3 = require("d3");

// append the svg object to the body of the page
var svG = d3.select("#display")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// todo: load proper data
var data = [ {x:2010, y:10}, {x:2012, y:20}, {x:2005, y:20} ]

// X scale and Axis
var x = d3.scaleLinear()
    .domain([2000, 2020])         // This is the min and the max of the data: 0 to 100 if percentages
    .range([0, width]);       // This is the corresponding value I want in Pixel
svG
  .append('g')
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x).tickFormat(d3.format("d")));

// Y scale and Axis
var y = d3.scaleLinear()
    .domain([0, 100])         // todo: change domain to be > total spending
    .range([height, 0]);       // This is the corresponding value I want in Pixel
svG
  .append('g')
  .call(d3.axisLeft(y));

// Add 3 dots for 0, 50 and 100%
svG
  .selectAll("whatever")
  .data(data)
  .enter()
  .append("circle")
    .attr("cx", function(d){ return x(d.x) })
    .attr("cy", function(d){ return y(d.y) })
    .attr("r", 7)
//
// // var csvFile = require();
d3.csv('./federal_spending_2020_2024.csv').then(function(data) {

   console.log(data[0]);
    console.log(data[1]);
    console.log(data[2]);
    console.log(data[3]);
    console.log(data[4]);
});