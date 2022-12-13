// Selecciona el elemento svg para modificarlo, además se añaden los márgenes
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
    // Tamaño y márgenes del gráfico
    width = 850 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom,
    height2 = 500 - margin2.top - margin2.bottom

// Creación de escala de colores
var colorS = d3.scale.category10()

// Configuración de las escalas de los ejes
var xS = d3.scale.linear().range([0, width]),
    x2S = d3.scale.linear().range([0, width]),
    yS = d3.scale.linear().range([height, 0]),
    y2S = d3.scale.linear().range([height2, 0])

// Dibuja los ejes
var xAxisS = d3.svg.axis().scale(xS).orient('bottom'),
    xAxis2S = d3.svg.axis().scale(x2S).orient('bottom'),
    yAxisS = d3.svg.axis().scale(yS).orient('left')

// Creación del brush
var brushS = d3.svg.brush().x(x2S).on('brush', brushS)

// Función para generar las líneas
var lineS = d3.svg
    .line()
    .defined(function(d) {
        return !isNaN(d.temperature)
    })
    .interpolate('cubic')
    .x(function(d) {
        return xS(d.Time)
    })
    .y(function(d) {
        return yS(d.temperature)
    })

var line2S = d3.svg
    .line()
    .defined(function(d) {
        return !isNaN(d.temperature)
    })
    .interpolate('cubic')
    .x(function(d) {
        return x2S(d.Time)
    })
    .y(function(d) {
        return y2S(d.temperature)
    })

// Agregar svg al seleccionado en el cuerpo
var svgS = d3
    .select('.svgSarampion')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)

// Agregar elemento clip-path al svg
svgS
    .append('defs')
    .append('clipPath')
    .attr('id', 'clip')
    .append('rect')
    .attr('width', width)
    .attr('height', height)

// Traslada la ubicación del gráfico en el svg
var focusS = svgS
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

// Traslada la ubicación del gráfico en el svg para el brush
var contextS = svgS
    .append('g')
    .attr('transform', 'translate(' + margin2.left + ',' + margin2.top + ')')

//Función para leer los datos
d3.csv(
    'https://raw.githubusercontent.com/Cloud-Dashboard/Data-CSV/main/Sarampion_Caracterizado.csv',
    function(error, data) {
        // Devuelve las propiedades claves de los datos
        colorS.domain(
            d3.keys(data[0]).filter(function(key) {
                return key !== 'Time'
            }),
        )

        //Función para verificar el formatos de los datos
        data.forEach(function(d) {
            d.Time = d.Time
        })

        // Establece color a las propiedades de la data
        var sourcesS = colorS.domain().map(function(name) {
            return {
                name: name,
                values: data.map(function(d) {
                    return {
                        Time: d.Time,
                        temperature: +d[name],
                    }
                }),
            }
        })

        // Regresa los valores para cada eje
        xS.domain(
            d3.extent(data, function(d) {
                return d.Time * 1.0
            }),
        )
        yS.domain([
            d3.min(sourcesS, function(c) {
                return d3.min(c.values, function(v) {
                    return v.temperature
                })
            }),
            d3.max(sourcesS, function(c) {
                return d3.max(c.values, function(v) {
                    return v.temperature
                })
            }),
        ])
        x2S.domain(xS.domain())
        y2S.domain(yS.domain())

        // Establece la ubicación del gráfico con el color
        var focuslineGroupsS = focusS
            .selectAll('g')
            .data(sourcesS)
            .enter()
            .append('g')

        // Establece las líneas y el color
        var focuslinesS = focuslineGroupsS
            .append('path')
            .attr('class', 'lineS')
            .attr('d', function(d) {
                return lineS(d.values)
            })
            .style('stroke', function(d) {
                return colorS(d.name)
            })
            .attr('clip-path', 'url(#clip)')

        // En la ubicación agrega los ejes
        focusS
            .append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + height + ')')
            .call(xAxisS)

        focusS.append('g').attr('class', 'y axis').call(yAxisS)

        // Agrega el nombre de los ejes
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

        // Establece la ubicación del gráfico con el color para el brush
        var contextlineGroupsS = contextS
            .selectAll('g')
            .data(sourcesS)
            .enter()
            .append('g')

        // Establece las líneas y el color para el bursh
        var contextLinesS = contextlineGroupsS
            .append('path')
            .attr('class', 'lineS')
            .attr('d', function(d) {
                return line2S(d.values)
            })
            .style('stroke', function(d) {
                return colorS(d.name)
            })
            .attr('clip-path', 'url(#clip)')

        // Agrega los ejes para el brush
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

        // Creación de la leyenda del gráfico
        var legendS = svgS
            .selectAll('.legendS')
            .data(sourcesS)
            .enter()
            .append('g')
            .attr('class', 'legendS')

        // Agrega las propiedades  y color para la leyanda
        legendS
            .append('path')
            .attr('class', 'lineS')
            .attr('d', function(d) {})
            .attr('data-legend', function(d) {
                return d.name
            })
            .style('stroke', function(d) {
                return colorS(d.name)
            })

        // Agrega el texto para la leyanda
        legendS
            .append('text')
            .datum(function(d) {
                return {
                    value: d.values[d.values.length - 1],
                }
            })
            .attr('transform', function(d) {
                return (
                    'translate(' + xS(d.value.Time) + ',' + yS(d.value.temperature) + ')'
                )
            })
            .attr('x', 3)
            .attr('dy', '.35em')
            .text(function(d) {
                return d.name
            })

        // Agrega la legenda al svg
        legend = svgS
            .append('g')
            .attr('class', 'legend')
            .attr('transform', 'translate(230,30)')
            .style('font-size', '12px')
            .call(d3.legend)

        // Tiempo de espera para visualizar la leyenda
        setTimeout(function() {
            legend
                .style('font-size', '15px')
                .attr('data-style-padding', 5)
                .call(d3.legend)
        }, 1)
    },
)

//Función para definir los ejes en el brush
function brushS() {
    xS.domain(brushS.empty() ? x2S.domain() : brushS.extent())
    focusS.selectAll('path.lineS').attr('d', function(d) {
        return lineS(d.values)
    })
    focusS.select('.x.axis').call(xAxisS)
    focusS.select('.y.axis').call(yAxisS)
}