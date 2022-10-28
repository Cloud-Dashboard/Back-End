var svgI = d3.select('svg'),
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

var colorI = d3.scale.category10()

var parseDate = d3.time.format('%Y%m').parse

var xI = d3.scale.linear().range([0, width]),
  x2I = d3.scale.linear().range([0, width]),
  yI = d3.scale.linear().range([height, 0]),
  y2I = d3.scale.linear().range([height2, 0])

var xAxisI = d3.svg.axis().scale(xI).orient('bottom'),
  xAxis2I = d3.svg.axis().scale(x2I).orient('bottom'),
  yAxisI = d3.svg.axis().scale(yI).orient('left')

var brushI = d3.svg.brush().x(x2I).on('brush', brushI)

var lineI = d3.svg
  .line()
  .defined(function (d) {
    return !isNaN(d.temperature)
  })
  .interpolate('cubic')
  .x(function (d) {
    return xI(d.Time)
  })
  .y(function (d) {
    return yI(d.temperature)
  })

var line2I = d3.svg
  .line()
  .defined(function (d) {
    return !isNaN(d.temperature)
  })
  .interpolate('cubic')
  .x(function (d) {
    return x2I(d.Time)
  })
  .y(function (d) {
    return y2I(d.temperature)
  })

var svgI = d3
  .select('.svgInfluenza')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)

svgI
  .append('defs')
  .append('clipPath')
  .attr('id', 'clip')
  .append('rect')
  .attr('width', width)
  .attr('height', height)

var focusI = svgI
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

var contextI = svgI
  .append('g')
  .attr('transform', 'translate(' + margin2.left + ',' + margin2.top + ')')

d3.csv(
  'https://raw.githubusercontent.com/Cloud-Dashboard/Data-CSV/main/Influenza_Caracterizado.csv',
  function (error, data) {
    colorI.domain(
      d3.keys(data[0]).filter(function (key) {
        return key !== 'Time'
      }),
    )

    data.forEach(function (d) {
      d.Time = d.Time
    })

    var sourcesI = colorI.domain().map(function (name) {
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

    xI.domain(
      d3.extent(data, function (d) {
        return d.Time * 1.0
      }),
    )
    yI.domain([
      d3.min(sourcesI, function (c) {
        return d3.min(c.values, function (v) {
          return v.temperature
        })
      }),
      d3.max(sourcesI, function (c) {
        return d3.max(c.values, function (v) {
          return v.temperature
        })
      }),
    ])
    x2I.domain(xI.domain())
    y2I.domain(yI.domain())

    var focuslineGroupsI = focusI
      .selectAll('g')
      .data(sourcesI)
      .enter()
      .append('g')

    var focuslinesI = focuslineGroupsI
      .append('path')
      .attr('class', 'lineI')
      .attr('d', function (d) {
        return lineI(d.values)
      })
      .style('stroke', function (d) {
        return colorI(d.name)
      })
      .attr('clip-path', 'url(#clip)')

    focusI
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxisI)

    focusI.append('g').attr('class', 'y axis').call(yAxisI)

    svgI
      .append('text') // text label for the x axis
      .attr('x', 265)
      .attr('y', 430)
      .style('text-anchor', 'middle')
      .style('font-size', '15')
      .text('Días')

    svgI
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 15)
      .attr('x', -200)
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .style('font-size', '15')
      .text('Datos')

    var contextlineGroupsI = contextI
      .selectAll('g')
      .data(sourcesI)
      .enter()
      .append('g')

    var contextLinesI = contextlineGroupsI
      .append('path')
      .attr('class', 'lineI')
      .attr('d', function (d) {
        return line2I(d.values)
      })
      .style('stroke', function (d) {
        return colorI(d.name)
      })
      .attr('clip-path', 'url(#clip)')

    contextI
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height2 + ')')
      .call(xAxis2I)

    contextI
      .append('g')
      .attr('class', 'x brushI')
      .call(brushI)
      .selectAll('rect')
      .attr('y', -6)
      .attr('height', height2 + 7)

    var city = svgI
      .selectAll('.city')
      .data(sourcesI)
      .enter()
      .append('g')
      .attr('class', 'city')

    city
      .append('path')
      .attr('class', 'lineI')
      .attr('d', function (d) {})
      .attr('data-legend', function (d) {
        return d.name
      })
      .style('stroke', function (d) {
        return colorI(d.name)
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
          'translate(' + xI(d.value.Time) + ',' + yI(d.value.temperature) + ')'
        )
      })
      .attr('x', 3)
      .attr('dy', '.35em')
      .text(function (d) {
        return d.name
      })

    legend = svgI
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

function brushI() {
  xI.domain(brushI.empty() ? x2I.domain() : brushI.extent())
  focusI.selectAll('path.lineI').attr('d', function (d) {
    return lineI(d.values)
  })
  focusI.select('.x.axis').call(xAxisI)
  focusI.select('.y.axis').call(yAxisI)
}
