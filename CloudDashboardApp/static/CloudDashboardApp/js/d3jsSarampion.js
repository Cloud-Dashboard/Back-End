var svgS = d3.select('svg'),
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

var colorS = d3.scale.category10()

var parseDate = d3.time.format('%Y%m').parse

var xS = d3.scale.linear().range([0, width]),
  x2S = d3.scale.linear().range([0, width]),
  yS = d3.scale.linear().range([height, 0]),
  y2S = d3.scale.linear().range([height2, 0])

var xAxisS = d3.svg.axis().scale(xS).orient('bottom'),
  xAxis2S = d3.svg.axis().scale(x2S).orient('bottom'),
  yAxisS = d3.svg.axis().scale(yS).orient('left')

var brushS = d3.svg.brush().x(x2S).on('brush', brushS)

var lineS = d3.svg
  .line()
  .defined(function (d) {
    return !isNaN(d.temperature)
  })
  .interpolate('cubic')
  .x(function (d) {
    return xS(d.Time)
  })
  .y(function (d) {
    return yS(d.temperature)
  })

var line2S = d3.svg
  .line()
  .defined(function (d) {
    return !isNaN(d.temperature)
  })
  .interpolate('cubic')
  .x(function (d) {
    return x2S(d.Time)
  })
  .y(function (d) {
    return y2S(d.temperature)
  })

var svgS = d3
  .select('.svgSarampion')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)

svgS
  .append('defs')
  .append('clipPath')
  .attr('id', 'clip')
  .append('rect')
  .attr('width', width)
  .attr('height', height)

var focusS = svgS
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

var contextS = svgS
  .append('g')
  .attr('transform', 'translate(' + margin2.left + ',' + margin2.top + ')')

d3.csv(
  'https://raw.githubusercontent.com/Cloud-Dashboard/Data-CSV/main/Sarampion_Caracterizado.csv',
  function (error, data) {
    colorS.domain(
      d3.keys(data[0]).filter(function (key) {
        return key !== 'Time'
      }),
    )

    data.forEach(function (d) {
      d.Time = d.Time
    })

    var sourcesS = colorS.domain().map(function (name) {
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

    xS.domain(
      d3.extent(data, function (d) {
        return d.Time * 1.0
      }),
    )
    yS.domain([
      d3.min(sourcesS, function (c) {
        return d3.min(c.values, function (v) {
          return v.temperature
        })
      }),
      d3.max(sourcesS, function (c) {
        return d3.max(c.values, function (v) {
          return v.temperature
        })
      }),
    ])
    x2S.domain(xS.domain())
    y2S.domain(yS.domain())

    var focuslineGroupsS = focusS
      .selectAll('g')
      .data(sourcesS)
      .enter()
      .append('g')

    var focuslinesS = focuslineGroupsS
      .append('path')
      .attr('class', 'lineS')
      .attr('d', function (d) {
        return lineS(d.values)
      })
      .style('stroke', function (d) {
        return colorS(d.name)
      })
      .attr('clip-path', 'url(#clip)')

    focusS
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxisS)

    focusS.append('g').attr('class', 'y axis').call(yAxisS)

    svgS
      .append('text') // text label for the x axis
      .attr('x', 265)
      .attr('y', 430)
      .style('text-anchor', 'middle')
      .style('font-size', '15')
      .text('Días')

    svgS
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 15)
      .attr('x', -200)
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .style('font-size', '15')
      .text('Datos')

    var contextlineGroupsS = contextS
      .selectAll('g')
      .data(sourcesS)
      .enter()
      .append('g')

    var contextLinesS = contextlineGroupsS
      .append('path')
      .attr('class', 'lineS')
      .attr('d', function (d) {
        return line2S(d.values)
      })
      .style('stroke', function (d) {
        return colorS(d.name)
      })
      .attr('clip-path', 'url(#clip)')

    contextS
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height2 + ')')
      .call(xAxis2S)

    contextS
      .append('g')
      .attr('class', 'x brushS')
      .call(brushS)
      .selectAll('rect')
      .attr('y', -6)
      .attr('height', height2 + 7)

    var city = svgS
      .selectAll('.city')
      .data(sourcesS)
      .enter()
      .append('g')
      .attr('class', 'city')

    city
      .append('path')
      .attr('class', 'lineS')
      .attr('d', function (d) {})
      .attr('data-legend', function (d) {
        return d.name
      })
      .style('stroke', function (d) {
        return colorS(d.name)
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
          'translate(' + xS(d.value.Time) + ',' + yS(d.value.temperature) + ')'
        )
      })
      .attr('x', 3)
      .attr('dy', '.35em')
      .text(function (d) {
        return d.name
      })

    legend = svgS
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

function brushS() {
  xS.domain(brushS.empty() ? x2S.domain() : brushS.extent())
  focusS.selectAll('path.lineS').attr('d', function (d) {
    return lineS(d.values)
  })
  focusS.select('.x.axis').call(xAxisS)
  focusS.select('.y.axis').call(yAxisS)
}
