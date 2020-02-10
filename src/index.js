// set the dimensions and margins of the graph
var margin = {
        top: 60,
        right: 60,
        bottom: 100,
        left: 60
    },
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


const csvFile = require('./data/pivoted_data.csv');
d3.csv(csvFile).then(function(theData) {
    var sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
        .key(function(d) {
            return d.Year;
        })
        .entries(theData);

    var categories = ["Defense", "Education", "General Government", "Health Care", "Interest", "Other Spending", "Pensions", "Protection", "Transportation", "Welfare"];
    var category = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    var stackedData = d3.stack()
        .keys(category)
        .value(function(d, key) {
            return d.values[key].Spending;
        })
        (sumstat)

    var x = d3.scaleLinear()
        .domain([2000, 2024]) // This is the min and the max of the data: 0 to 100 if percentages
        .range([0, width]); // This is the corresponding value I want in Pixel
    svg
        .append('g')
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickFormat(d3.format("d")));

    // Y scale and Axis
    var y = d3.scaleLinear()
        .domain([0, 6000])
        .range([height, 0]); // This is the corresponding value I want in Pixel
    svg
        .append('g')
        .call(d3.axisLeft(y));

    // text label for the x axis
    svg.append("text")
        .attr("transform",
            "translate(" + (width / 2) + " ," +
            (height + margin.top + 20) + ")")
        .style("text-anchor", "middle")
        .text("Year");

    // text label for the y axis
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Billions of USD");

    function handleMouseOver(d, i) { // Add interactivity
        tooltip.style("display", null);
        d3.select(this).transition()
            .duration('50')
            .attr('opacity', '.85');
    }

    function handleMouseOut(d, i) {
        tooltip.style("display", "none");
        d3.select(this).transition()
            .duration('50')
            .attr('opacity', '1');
    }

    function handleMouseMove(d, i) {
        const currentXPosition = d3.mouse(this)[0];
        const currentYPosition = d3.mouse(this)[1];

        const xValue = x.invert(currentXPosition);
        const yValue = y.invert(currentYPosition);

        var year = Math.round(xValue);

        //console.log(year + ", " + yValue);
        //console.log(stackedData[year.toString()]);
        console.log(categories[i]);
        console.log(xValue + ", " + yValue);
        var xPos = d3.mouse(this)[0] - 15;
        var yPos = d3.mouse(this)[1] - 55;
        tooltip.attr("transform", "translate(" + xPos + "," + yPos + ")");
        tooltip.select("text").text(categories[i]);
    }

    var res = sumstat.map(function(d) {
        return d.key
    }) // list of group names
    var color = d3.scaleOrdinal()
        .domain(res)
        .range(["#4e79a7", "#f28e2c", "#e15759", "#76b7b2", "#59a14f", "#edc949", "#af7aa1", "#ff9da7", "#9c755f", "#bab0ab"])

    var lineColor = d3.scaleOrdinal()
        .domain(res)
        .range(["#3a5a7d", "#ca6a0c", "#c62325", "#4d938e", "#42783b", "#d3a914", "#8b537c", "#ff364a", "#755747", "#918179"])

    var area = d3.area()
        .x(function(d, i) {
            return x(d.data.key);
        })
        .y0(function(d) {
            return y(d[0]);
        })
        .y1(function(d) {
            return y(d[1]);
        });

    svg.selectAll(".line")
        .data(stackedData)
        .enter()
        .append("path")
        .style("fill", function(d) {
            name = categories[d.key];
            return color(name);
        })
        .attr("stroke", function(d) {
            return lineColor(d.key)
        }) // todo: have different color for line
        .attr("stroke-width", 1)
        .attr("id", function(d) {
            return categories[d.key]
        })
        .attr("d", area)
        .on("mouseover", handleMouseOver)
        .on("mouseout", handleMouseOut)
        .on("mousemove", handleMouseMove)

    var tooltip = svg.append("g")
        .attr("class", tooltip)
        .style("display", "none");
    tooltip.append("text")
        .attr("x", 15)
        .attr("dy", "1.2em")
        .style("font_size", "1.25em")
        .attr("font-weight", "bold");
});