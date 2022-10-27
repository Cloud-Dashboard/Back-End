var svgD = d3.select("svg"),
    margin = {
        top: 20,
        right: 20,
        bottom: 110,
        left: 80
    },
    margin = {
        top: 10,
        right: 10,
        bottom: 110,
        left: 80
    },
    margin2 = {
        top: 430,
        right: 10,
        bottom: 20,
        left: 80
    },
    width = 500 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom,
    height2 = 500 - margin2.top - margin2.bottom;

var color = d3.scale.category10();

var parseDate = d3.time.format("%Y%m").parse;

var x = d3.scale.linear().range([0, width]),
    x2 = d3.scale.linear().range([0, width]),
    y = d3.scale.linear().range([height, 0]),
    y2 = d3.scale.linear().range([height2, 0]);

var xAxis = d3.svg.axis().scale(x).orient("bottom"),
    xAxis2 = d3.svg.axis().scale(x2).orient("bottom"),
    yAxis = d3.svg.axis().scale(y).orient("left");

var brush = d3.svg.brush()
    .x(x2)
    .on("brush", brush);

var line = d3.svg.line()
    .defined(function (d) {
        return !isNaN(d.temperature);
    })
    .interpolate("cubic")
    .x(function (d) {
        return x(d.Time);
    })
    .y(function (d) {
        return y(d.temperature);
    });

var line2 = d3.svg.line()
    .defined(function (d) {
        return !isNaN(d.temperature);
    })
    .interpolate("cubic")
    .x(function (d) {
        return x2(d.Time);
    })
    .y(function (d) {
        return y2(d.temperature);
    });

var svgD = d3.select(".svgDengue").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

svgD.append("defs").append("clipPath")
    .attr("id", "clip")
    .append("rect")
    .attr("width", width)
    .attr("height", height);

var focusD = svgD.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var contextD = svgD.append("g")
    .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

d3.csv("https://raw.githubusercontent.com/Cloud-Dashboard/Data-CSV/main/Dengue_Caracterizado.csv", function (error, data) {

    color.domain(d3.keys(data[0]).filter(function (key) {
        return key !== "Time";
    }));

    data.forEach(function (d) {
        d.Time = d.Time;
    });

    var sources = color.domain().map(function (name) {
        return {
            name: name,
            values: data.map(function (d) {
                return {
                    Time: d.Time,
                    temperature: +d[name]
                };
            })
        };
    });

    x.domain(d3.extent(data, function (d) {
        return d.Time * 1.0;
    }));
    y.domain([d3.min(sources, function (c) {
        return d3.min(c.values, function (v) {
            return v.temperature;
        });
    }),
    d3.max(sources, function (c) {
        return d3.max(c.values, function (v) {
            return v.temperature;
        });
    })
    ]);
    x2.domain(x.domain());
    y2.domain(y.domain());

    var focuslineGroups = focusD.selectAll("g")
        .data(sources)
        .enter().append("g");

    var focuslines = focuslineGroups.append("path")
        .attr("class", "line")
        .attr("d", function (d) {
            return line(d.values);
        })
        .style("stroke", function (d) {
            return color(d.name);
        })
        .attr("clip-path", "url(#clip)");

    focusD.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    focusD.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    svgD.append("text") // text label for the x axis
        .attr("x", 265)
        .attr("y", 430)
        .style("text-anchor", "middle")
        .style("font-size", "15")
        .text("Días");

    svgD.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 15)
        .attr("x", -200)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .style("font-size", "15")
        .text("Datos");


    var contextlineGroups = contextD.selectAll("g")
        .data(sources)
        .enter().append("g");

    var contextLines = contextlineGroups.append("path")
        .attr("class", "line")
        .attr("d", function (d) {
            return line2(d.values);
        })
        .style("stroke", function (d) {
            return color(d.name);
        })
        .attr("clip-path", "url(#clip)");

    contextD.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height2 + ")")
        .call(xAxis2);

    contextD.append("g")
        .attr("class", "x brush")
        .call(brush)
        .selectAll("rect")
        .attr("y", -6)
        .attr("height", height2 + 7);



    var city = svgD.selectAll(".city")
        .data(sources)
        .enter().append("g")
        .attr("class", "city");

    city.append("path")
        .attr("class", "line")
        .attr("d", function (d) {

        })
        .attr("data-legend", function (d) {
            return d.name
        })
        .style("stroke", function (d) {
            return color(d.name);
        });

    city.append("text")
        .datum(function (d) {
            return {

                value: d.values[d.values.length - 1]
            };
        })
        .attr("transform", function (d) {
            return "translate(" + x(d.value.Time) + "," + y(d.value.temperature) + ")";
        })
        .attr("x", 3)
        .attr("dy", ".35em")
        .text(function (d) {
            return d.name;
        });


    legend = svgD.append("g")
        .attr("class", "legend")
        .attr("transform", "translate(230,30)") /*(110,30)*/
        .style("font-size", "12px")
        .call(d3.legend)

    setTimeout(function () {
        legend
            .style("font-size", "15px")
            .attr("data-style-padding", 5)
            .call(d3.legend)
    }, 1)

});

function brush() {
    x.domain(brush.empty() ? x2.domain() : brush.extent());
    focusD.selectAll("path.line").attr("d", function (d) {
        return line(d.values)
    });
    focusD.select(".x.axis").call(xAxis);
    focusD.select(".y.axis").call(yAxis);
}
