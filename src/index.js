// set the dimensions and margins of the graph
var margin = {
        top: 60,
        right: 350,
        bottom: 100,
        left: 60
    },
    width = 1000 - margin.left - margin.right,
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

//button to swap over datasets
d3.select("body").append("button")
    .text("Reset")
    .attr("id", "reset-button")
    .on("click", function () {
        //rejoin data
        svg.selectAll("*").remove();
        reDraw(csvFile);


        // circle.exit().remove();//remove unneeded circles
        // circle.enter().append("circle")
        //     .attr("r",0);//create any new circles needed

        // //update all circles to new positions
        // circle.transition()
        //     .duration(500)
        //     .attr("cx",function(d,i){
        //         var spacing = lineLength/(eval("dataArray"+dataIndex).length);
        //         return xBuffer+(i*spacing)
        //     })
        //     .attr("cy",yBuffer)
        //     .attr("r",function(d,i){return d});

        // d3.select("text").text("dataset"+dataIndex);

    });//end click function

function reDraw(csvFileName) {
    console.log('redraw');
    // clear display

    d3.csv(csvFileName).then(function (theData) {
        var sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
            .key(function (d) {
                return d.Year;
            })
            .entries(theData);

        var categories = ["Defense", "Education", "General Government", "Health Care", "Interest", "Other Spending", "Pensions", "Protection", "Transportation", "Welfare"];
        var category = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

        // the y-scale max value to use when zooming in on a category.
        // this doesn't have to be hardcoded, but i couldn't get it to work otherwise.
        var categoryYMax = [1000, 200, 100, 2000, 1000, 1000, 2000, 100, 200, 1000];
        var stackedData = d3.stack()
            .keys(category)
            .value(function (d, key) {
                return d.values[key].Spending;
            })
            (sumstat)

        var x = d3.scaleLinear()
            .domain([2000, 2024]) // This is the min and the max of the data: 0 to 100 if percentages
            .range([0, width]); // This is the corresponding value I want in Pixel

        // Y scale and Axis
        var y = d3.scaleLinear()
        //.domain([0, d3.max(theData, function(d) { console.log(d); return +d.Spending; })*1.2])
            .domain([0, 6000])
            .range([height, 0]); // This is the corresponding value I want in Pixel

        var yAxis;
        var xAxis;

        function displayX() {
            xAxis = svg
                .append('g')
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x).tickFormat(d3.format("d")));
        }

        function displayY() {
            yAxis = d3.axisLeft(y);
            svg
                .append('g')
                .attr("class", "yaxis")
                .call(yAxis);
        }

        displayX();
        displayY();

        // text label for the x axis
        svg.append("text")
            .attr("transform",
                "translate(" + (width / 2) + " ," +
                (height + margin.top) + ")")
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

        var clip = svg.append("defs").append("svg:clipPath")
            .attr("id", "clip")
            .append("svg:rect")
            .attr("width", width)
            .attr("height", height)
            .attr("x", 0)
            .attr("y", 0);

        var brush = d3.brushX()                 // Add the brush feature using the d3.brush function
            .extent([[0, 0], [width, height]]) // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
            .on("end", updateChart) // Each time the brush selection changes, trigger the 'updateChart' function

        var areaChart = svg.append('g')
            .attr("clip-path", "url(#clip)")

        areaChart
            .append("g")
            .attr("class", "brush")
            .call(brush);

        var idleTimeout

        function idled() {
            idleTimeout = null;
        }

        // A function that update the chart for given boundaries
        function updateChart() {
            extent = d3.event.selection
            if (!extent) {
                if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); // This allows to wait a little bit
                x.domain(d3.extent(data, function (d) {
                    return d.Year;
                }))
            } else {
                x.domain([x.invert(extent[0]), x.invert(extent[1])])
                areaChart.select(".brush").call(brush.move, null) // This remove the grey brush area as soon as the selection has been done
            }
            // Update axis and area position
            xAxis.transition().duration(1000).call(d3.axisBottom(x).ticks(5))
            areaChart
                .selectAll("path")
                .transition().duration(1000)
                .attr("d", area)
        }

        function handleMouseOver(d, i) { // Add interactivity
            tooltip.style("display", null);
            d3.select(this).transition()
                .duration('50')
                .attr('opacity', '0.85');
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
            var xPos = d3.mouse(this)[0] - 15;
            var yPos = d3.mouse(this)[1] - 25;
            tooltip.attr("transform", "translate(" + xPos + "," + yPos + ")");
            tooltip.select("text")
                .text(categories[i])
                .attr("id", "tooltip");
        }

        function handleMouseClick(d, i) {
            svg.select(".yaxis").remove();
            // rescale
            y.domain([0, categoryYMax[i]])
            //svg.select(".yaxis")
            //        .transition().duration(1500).ease()  // https://github.com/mbostock/d3/wiki/Transitions#wiki-d3_ease
            //        .call(yAxis);


            var categ = categories[i]
            var colour = color(categ)
            var lineColour = lineColor(i)
            console.log(lineColour)

            tooltip.style("display", "none");
            areaChart.selectAll("path").remove()

            area = d3.area()
                .x(function (d) {
                    return x(d.key);
                })
                .y0(function (d) {
                    return y(0);
                })
                .y1(function (d) {
                    return y(d.values[i].Spending);
                })

            areaChart.append("path")
                .datum(sumstat)
                .style("fill", colour)
                .attr("stroke", lineColour)
                .attr("stroke-width", 1)
                .attr("id", categ)
                .attr("d", area)
                .on("mouseover", handleMouseOver)
                .on("mouseout", handleMouseOut)
                .on("mousemove", function (d, i) {
                    const currentXPosition = d3.mouse(this)[0];
                    const currentYPosition = d3.mouse(this)[1];

                    const xValue = x.invert(currentXPosition);
                    const yValue = y.invert(currentYPosition);

                    var year = Math.round(xValue);
                    var xPos = d3.mouse(this)[0] - 15;
                    var yPos = d3.mouse(this)[1] - 25;
                    tooltip.attr("transform", "translate(" + xPos + "," + yPos + ")");
                    tooltip.select("text")
                        .text(categ)
                        .attr("id", "tooltip");
                })

            tooltip = appendTooltip();
            displayY();
        }

        function appendTooltip() {
            var tooltip = svg.append("g")
                .attr("class", tooltip)
                .style("display", "none");
            tooltip.append("text")
                .attr("x", 15)
                .attr("dy", "1.2em")
                .style("font_size", "1.25em")
                .attr("font-weight", "bold");
            return tooltip;
        }

        var res = sumstat.map(function (d) {
            return d.key
        }) // list of group names
        var color = d3.scaleOrdinal()
            .domain(res)
            .range(["#4e79a7", "#f28e2c", "#e15759", "#76b7b2", "#59a14f", "#edc949", "#af7aa1", "#ff9da7", "#9c755f", "#bab0ab"])

        var lineColor = d3.scaleOrdinal()
            .domain(res)
            .range(["#3a5a7d", "#ca6a0c", "#c62325", "#4d938e", "#42783b", "#d3a914", "#8b537c", "#ff364a", "#755747", "#918179"])

        var area = d3.area()
            .x(function (d, i) {
                return x(d.data.key);
            })
            .y0(function (d) {
                return y(d[0]);
            })
            .y1(function (d) {
                return y(d[1]);
            });

        areaChart.selectAll(".line")
            .data(stackedData)
            .enter()
            .append("path")
            .style("fill", function (d) {
                name = categories[d.key];
                return color(name);
            })
            .attr("stroke", function (d) {
                return lineColor(d.key)
            }) // todo: have different color for line
            .attr("stroke-width", 1)
            .attr("id", function (d) {
                return categories[d.key]
            })
            .attr("d", area)
            .on("mouseover", handleMouseOver)
            .on("mouseout", handleMouseOut)
            .on("mousemove", handleMouseMove)
            .on("click", handleMouseClick)

        var tooltip = appendTooltip();

        var size = 24
        svg.selectAll(".line")
            .data(categories)
            .enter()
            .append("rect")
            .attr("x", 600)
            .attr("y", function (d, i) {
                return 260 - i * (size + 5)
            }) // 100 is where the first dot appears. 25 is the distance between dots
            .attr("width", size)
            .attr("height", size)
            .style("fill", function (d) {
                return color(d)
            })

        // Add one dot in the legend for each name.
        svg.selectAll("mylabels")
            .data(categories)
            .enter()
            .append("text")
            .attr("x", 600 + size * 1.2)
            .attr("y", function (d, i) {
                return 260 - i * (size + 5) + (size / 2)
            }) // 100 is where the first dot appears. 25 is the distance between dots
            .style("fill", function (d) {
                return color(d)
            })
            .text(function (d) {
                return d
            })
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle")
    });
}

reDraw(csvFile);