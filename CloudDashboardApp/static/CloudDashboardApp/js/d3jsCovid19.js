var svgC = d3.select('svg'),
  margin = {
    top: 20,
    right: 20,
    bottom: 110,
    left: 80,
  },
  margin = {
    top: 10,
    right: 10,
    bottom: 110,
    left: 80,
  },
  margin2 = {
    top: 430,
    right: 10,
    bottom: 20,
    left: 80,
  },
  width = 850 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom,
  height2 = 500 - margin2.top - margin2.bottom

var colorC = d3.scale.category10()

var parseDate = d3.time.format('%Y%m').parse

var xC = d3.scale.linear().range([0, width]),
  x2C = d3.scale.linear().range([0, width]),
  yC = d3.scale.linear().range([height, 0]),
  y2C = d3.scale.linear().range([height2, 0])

var xAxisC = d3.svg.axis().scale(xC).orient('bottom'),
  xAxis2C = d3.svg.axis().scale(x2C).orient('bottom'),
  yAxisC = d3.svg.axis().scale(yC).orient('left')

var brushC = d3.svg.brush().x(x2C).on('brush', brushC)

var lineC = d3.svg
  .line()
  .defined(function (d) {
    return !isNaN(d.temperature)
  })
  .interpolate('cubic')
  .x(function (d) {
    return xC(d.Time)
  })
  .y(function (d) {
    return yC(d.temperature)
  })

var line2C = d3.svg
  .line()
  .defined(function (d) {
    return !isNaN(d.temperature)
  })
  .interpolate('cubic')
  .x(function (d) {
    return x2C(d.Time)
  })
  .y(function (d) {
    return y2C(d.temperature)
  })

var svgC = d3
  .select('.svgCovid')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)

svgC
  .append('defs')
  .append('clipPath')
  .attr('id', 'clip')
  .append('rect')
  .attr('width', width)
  .attr('height', height)

var focusC = svgC
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

var contextC = svgC
  .append('g')
  .attr('transform', 'translate(' + margin2.left + ',' + margin2.top + ')')

d3.csv(
  'https://raw.githubusercontent.com/Cloud-Dashboard/Data-CSV/main/COVID19_Caracterizado.csv',
  function (error, data) {
    colorC.domain(
      d3.keys(data[0]).filter(function (key) {
        return key !== 'Time'
      }),
    )

    data.forEach(function (d) {
      d.Time = d.Time
    })

    var sourcesC = colorC.domain().map(function (name) {
      return {
        name: name,
        values: data.map(function (d) {
          return {
            Time: d.Time,
            temperature: +d[name],
          }
        }),
      }
    })

    xC.domain(
      d3.extent(data, function (d) {
        return d.Time * 1.0
      }),
    )
    yC.domain([
      d3.min(sourcesC, function (c) {
        return d3.min(c.values, function (v) {
          return v.temperature
        })
      }),
      d3.max(sourcesC, function (c) {
        return d3.max(c.values, function (v) {
          return v.temperature
        })
      }),
    ])
    x2C.domain(xC.domain())
    y2C.domain(yC.domain())

    var focuslineGroupsC = focusC
      .selectAll('g')
      .data(sourcesC)
      .enter()
      .append('g')

    var focuslinesC = focuslineGroupsC
      .append('path')
      .attr('class', 'lineC')
      .attr('d', function (d) {
        return lineC(d.values)
      })
      .style('stroke', function (d) {
        return colorC(d.name)
      })
      .attr('clip-path', 'url(#clip)')

    focusC
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxisC)

    focusC.append('g').attr('class', 'y axis').call(yAxisC)

    svgC
      .append('text') // text label for the x axis
      .attr('x', 265)
      .attr('y', 430)
      .style('text-anchor', 'middle')
      .style('font-size', '15')
      .text('Días')

    svgC
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 15)
      .attr('x', -200)
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .style('font-size', '15')
      .text('Datos')

    var contextlineGroupsC = contextC
      .selectAll('g')
      .data(sourcesC)
      .enter()
      .append('g')

    var contextLinesC = contextlineGroupsC
      .append('path')
      .attr('class', 'lineC')
      .attr('d', function (d) {
        return line2C(d.values)
      })
      .style('stroke', function (d) {
        return colorC(d.name)
      })
      .attr('clip-path', 'url(#clip)')

    contextC
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height2 + ')')
      .call(xAxis2C)

    contextC
      .append('g')
      .attr('class', 'x brushC')
      .call(brushC)
      .selectAll('rect')
      .attr('y', -6)
      .attr('height', height2 + 7)

    var city = svgC
      .selectAll('.city')
      .data(sourcesC)
      .enter()
      .append('g')
      .attr('class', 'city')

    city
      .append('path')
      .attr('class', 'lineC')
      .attr('d', function (d) {})
      .attr('data-legend', function (d) {
        return d.name
      })
      .style('stroke', function (d) {
        return colorC(d.name)
      })

    city
      .append('text')
      .datum(function (d) {
        return {
          value: d.values[d.values.length - 1],
        }
      })
      .attr('transform', function (d) {
        return (
          'translate(' + xC(d.value.Time) + ',' + yC(d.value.temperature) + ')'
        )
      })
      .attr('x', 3)
      .attr('dy', '.35em')
      .text(function (d) {
        return d.name
      })

    legend = svgC
      .append('g')
      .attr('class', 'legend')
      .attr('transform', 'translate(230,30)')
      .style('font-size', '12px')
      .call(d3.legend)

    setTimeout(function () {
      legend
        .style('font-size', '15px')
        .attr('data-style-padding', 5)
        .call(d3.legend)
    }, 1)
  },
)

function brushC() {
  xC.domain(brushC.empty() ? x2C.domain() : brushC.extent())
  focusC.selectAll('path.lineC').attr('d', function (d) {
    return lineC(d.values)
  })
  focusC.select('.x.axis').call(xAxisC)
  focusC.select('.y.axis').call(yAxisC)
}
