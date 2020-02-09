

console.log('hello world')


// stolen from https://www.d3-graph-gallery.com/intro_d3js.html

// set the dimensions and margins of the graph
var margin = {top: 20, right: 60, bottom: 30, left: 30},
    width = 800 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

var d3 = require("d3");

// append the svg object to the body of the page
var svg = d3.select("#display")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// // todo: load proper data
// var data = [ {x:2010, y:10}, {x:2012, y:20}, {x:2005, y:20} ]
//
// X scale and Axis
//
// // Add 3 dots for 0, 50 and 100%
// svG
//   .selectAll("whatever")
//   .data(data)
//   .enter()
//   .append("circle")
//     .attr("cx", function(d){ return x(d.x) })
//     .attr("cy", function(d){ return y(d.y) })
//     .attr("r", 7)

const csvFile = require('./data/pivoted_data.csv');
d3.csv(csvFile).then(function(theData) {
  var sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
    .key(function(d) { return d.Category;})
    .entries(theData);

var x = d3.scaleLinear()
    .domain([1995, 2020])         // This is the min and the max of the data: 0 to 100 if percentages
    .range([0, width]);       // This is the corresponding value I want in Pixel
svg
  .append('g')
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x).tickFormat(d3.format("d")));

// Y scale and Axis
var y = d3.scaleLinear()
    .domain([0, 1000])         // todo: change domain to be > total spending
    .range([height, 0]);       // This is the corresponding value I want in Pixel
svg
  .append('g')
  .call(d3.axisLeft(y));

var res = sumstat.map(function(d){ return d.key }) // list of group names
  var color = d3.scaleOrdinal()
    .domain(res)
    .range(['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00','#f7c82d','#a65628','#f781bf','#999999', '#4287f5'])

svg.selectAll(".line")
      .data(sumstat)
      .enter()
      .append("path")
        .attr("fill", "none")
        .attr("stroke", function(d){ return color(d.key) })
        .attr("stroke-width", 1.5)
        .attr("d", function(d){
          return d3.line()
            .x(function(d) { return x(d.Year); })
            .y(function(d) { return y(d.Spending); })
            (d.values)
            })
});
