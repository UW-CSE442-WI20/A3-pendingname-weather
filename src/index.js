// set the dimensions and margins of the graph
var margin = {top: 20, right: 80, bottom: 30, left: 60},
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
    .key(function(d) { return d.Year;})
    .entries(theData);
	
  var categories = ["Defense", "Education", "General Government", "Health Care", "Interest", "Other Spending", "Pensions", "Protection", "Transportation", "Welfare"];
  var category = [0,1,2,3,4,5,6,7,8,9];
  var stackedData = d3.stack()
    .keys(category)
	.value(function(d, key) {
		console.log(d.values[key]);
	  return d.values[key].Spending;
	})
	(sumstat)
	
  var x = d3.scaleLinear()
    .domain([2000, 2024])         // This is the min and the max of the data: 0 to 100 if percentages
    .range([0, width]);       // This is the corresponding value I want in Pixel
  svg
    .append('g')
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).tickFormat(d3.format("d")));

// Y scale and Axis
  var y = d3.scaleLinear()
    .domain([0, 6000])
    .range([height, 0]);       // This is the corresponding value I want in Pixel
  svg
    .append('g')
    .call(d3.axisLeft(y));

  var res = sumstat.map(function(d){ return d.key }) // list of group names
  var color = d3.scaleOrdinal()
    .domain(res)
    .range(['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00','#f7c82d','#a65628','#f781bf','#999999', '#4287f5'])

  svg.selectAll(".line")
    .data(stackedData)
    .enter()
    .append("path")
	  .style("fill", function(d) { name = categories[d.key]; return color(name); })
	  
      //.attr("fill", function(d) { return color(d.key) })
      .attr("stroke", function(d){ return color(d.key) }) // todo: have different color for line
      .attr("stroke-width", 1.5)
      .attr("d", d3.area()
        .x(function(d, i) { return x(d.data.key); })
        .y0(function(d) { return y(d[0]); })
        .y1(function(d) { return y(d[1]); })
      )
});

// Handmade legend
svg.append("circle").attr("cx",20).attr("cy",50).attr("r", 6).style("fill", "#69b3a2")
svg.append("circle").attr("cx",20).attr("cy",70).attr("r", 6).style("fill", "#69b3a2")
svg.append("circle").attr("cx",20).attr("cy",90).attr("r", 6).style("fill", "#69b3a2")
svg.append("circle").attr("cx",20).attr("cy",110).attr("r", 6).style("fill", "#69b3a2")
svg.append("circle").attr("cx",20).attr("cy",130).attr("r", 6).style("fill", "#69b3a2")
svg.append("circle").attr("cx",20).attr("cy",150).attr("r", 6).style("fill", "#69b3a2")
svg.append("circle").attr("cx",20).attr("cy",170).attr("r", 6).style("fill", "#69b3a2")
svg.append("circle").attr("cx",20).attr("cy",190).attr("r", 6).style("fill", "#69b3a2")
svg.append("circle").attr("cx",20).attr("cy",210).attr("r", 6).style("fill", "#69b3a2")
svg.append("circle").attr("cx",20).attr("cy",230).attr("r", 6).style("fill", "#69b3a2")

svg.append("text").attr("x", 30).attr("y", 50).text("Welfare").style("font-size", "15px").attr("alignment-baseline","middle")
svg.append("text").attr("x", 30).attr("y", 70).text("Transportation").style("font-size", "15px").attr("alignment-baseline","middle")
svg.append("text").attr("x", 30).attr("y", 90).text("Protection").style("font-size", "15px").attr("alignment-baseline","middle")
svg.append("text").attr("x", 30).attr("y", 110).text("Pensions").style("font-size", "15px").attr("alignment-baseline","middle")
svg.append("text").attr("x", 30).attr("y", 130).text("Other Spending").style("font-size", "15px").attr("alignment-baseline","middle")
svg.append("text").attr("x", 30).attr("y", 150).text("Interest").style("font-size", "15px").attr("alignment-baseline","middle")
svg.append("text").attr("x", 30).attr("y", 170).text("Health Care").style("font-size", "15px").attr("alignment-baseline","middle")
svg.append("text").attr("x", 30).attr("y", 190).text("General Government").style("font-size", "15px").attr("alignment-baseline","middle")
svg.append("text").attr("x", 30).attr("y", 210).text("Education").style("font-size", "15px").attr("alignment-baseline","middle")
svg.append("text").attr("x", 30).attr("y", 230).text("Defense").style("font-size", "15px").attr("alignment-baseline","middle")

//
// Add one dot in the legend for each name.

// var size = 20
// svg.selectAll("myrect")
//     .data(theData)
//     .enter()
//     .append("rect")
//     .attr("x", 400)
//     .attr("y", function(d,i){ return 10 + i*(size+5)}) // 100 is where the first dot appears. 25 is the distance between dots
//     .attr("width", size)
//     .attr("height", size)
//     .style("fill", function(d){ return color(d)})
//     .on("mouseover", highlight)
//     .on("mouseleave", noHighlight)
//
// // Add one dot in the legend for each name.
// svg.selectAll("mylabels")
//     .data(theData)
//     .enter()
//     .append("text")
//     .attr("x", 400 + size*1.2)
//     .attr("y", function(d,i){ return 10 + i*(size+5) + (size/2)}) // 100 is where the first dot appears. 25 is the distance between dots
//     .style("fill", function(d){ return color(d)})
//     .text(function(d){ return d})
//     .attr("text-anchor", "left")
//     .style("alignment-baseline", "middle")
//     .on("mouseover", highlight)
//     .on("mouseleave", noHighlight);


