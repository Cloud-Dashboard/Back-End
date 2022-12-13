// Selecciona el elemento svg para modificarlo, además se añaden los márgenes
var svgD = d3.select('svg'),
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
var colorD = d3.scale.category10()

// Configuración de las escalas de los ejes
var xD = d3.scale.linear().range([0, width]),
    x2D = d3.scale.linear().range([0, width]),
    yD = d3.scale.linear().range([height, 0]),
    y2D = d3.scale.linear().range([height2, 0])

// Dibuja los ejes
var xAxisD = d3.svg.axis().scale(xD).orient('bottom'),
    xAxis2D = d3.svg.axis().scale(x2D).orient('bottom'),
    yAxisD = d3.svg.axis().scale(yD).orient('left')

// Creación del brush
var brushD = d3.svg.brush().x(x2D).on('brush', brushD)

// Función para generar las líneas
var lineD = d3.svg
    .line()
    .defined(function(d) {
        return !isNaN(d.temperature)
    })
    .interpolate('cubic')
    .x(function(d) {
        return xD(d.Time)
    })
    .y(function(d) {
        return yD(d.temperature)
    })

var line2D = d3.svg
    .line()
    .defined(function(d) {
        return !isNaN(d.temperature)
    })
    .interpolate('cubic')
    .x(function(d) {
        return x2D(d.Time)
    })
    .y(function(d) {
        return y2D(d.temperature)
    })

// Agregar svg al seleccionado en el cuerpo
var svgD = d3
    .select('.svgDengue')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)

// Agregar elemento clip-path al svg
svgD
    .append('defs')
    .append('clipPath')
    .attr('id', 'clip')
    .append('rect')
    .attr('width', width)
    .attr('height', height)

// Traslada la ubicación del gráfico en el svg
var focusD = svgD
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

// Traslada la ubicación del gráfico en el svg para el brush
var contextD = svgD
    .append('g')
    .attr('transform', 'translate(' + margin2.left + ',' + margin2.top + ')')

//Función para leer los datos
d3.csv(
    'https://raw.githubusercontent.com/Cloud-Dashboard/Data-CSV/main/Dengue_Caracterizado.csv',
    function(error, data) {
        // Devuelve las propiedades claves de los datos
        colorD.domain(
            d3.keys(data[0]).filter(function(key) {
                return key !== 'Time'
            }),
        )

        //Función para verificar el formatos de los datos
        data.forEach(function(d) {
            d.Time = d.Time
        })

        // Establece color a las propiedades de la data
        var sourcesD = colorD.domain().map(function(name) {
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
        xD.domain(
            d3.extent(data, function(d) {
                return d.Time * 1.0
            }),
        )
        yD.domain([
            d3.min(sourcesD, function(c) {
                return d3.min(c.values, function(v) {
                    return v.temperature
                })
            }),
            d3.max(sourcesD, function(c) {
                return d3.max(c.values, function(v) {
                    return v.temperature
                })
            }),
        ])
        x2D.domain(xD.domain())
        y2D.domain(yD.domain())

        // Establece la ubicación del gráfico con el color
        var focuslineGroupsD = focusD
            .selectAll('g')
            .data(sourcesD)
            .enter()
            .append('g')

        // Establece las líneas y el color
        var focuslinesD = focuslineGroupsD
            .append('path')
            .attr('class', 'lineD')
            .attr('d', function(d) {
                return lineD(d.values)
            })
            .style('stroke', function(d) {
                return colorD(d.name)
            })
            .attr('clip-path', 'url(#clip)')

        // En la ubicación agrega los ejes
        focusD
            .append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + height + ')')
            .call(xAxisD)

        focusD.append('g').attr('class', 'y axis').call(yAxisD)

        // Agrega el nombre de los ejes
        svgD
            .append('text')
            .attr('x', 265)
            .attr('y', 430)
            .style('text-anchor', 'middle')
            .style('font-size', '15')
            .text('Días')

        svgD
            .append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', 15)
            .attr('x', -200)
            .attr('dy', '1em')
            .style('text-anchor', 'middle')
            .style('font-size', '15')
            .text('Datos')

        // Establece la ubicación del gráfico con el color para el brush
        var contextlineGroupsD = contextD
            .selectAll('g')
            .data(sourcesD)
            .enter()
            .append('g')

        // Establece las líneas y el color para el bursh
        var contextLinesD = contextlineGroupsD
            .append('path')
            .attr('class', 'lineD')
            .attr('d', function(d) {
                return line2D(d.values)
            })
            .style('stroke', function(d) {
                return colorD(d.name)
            })
            .attr('clip-path', 'url(#clip)')

        // Agrega los ejes para el brush
        contextD
            .append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + height2 + ')')
            .call(xAxis2D)

        contextD
            .append('g')
            .attr('class', 'x brushD')
            .call(brushD)
            .selectAll('rect')
            .attr('y', -6)
            .attr('height', height2 + 7)

        // Creación de la leyenda del gráfico
        var legendD = svgD
            .selectAll('.legendD')
            .data(sourcesD)
            .enter()
            .append('g')
            .attr('class', 'legendD')

        // Agrega las propiedades  y color para la leyanda
        legendD
            .append('path')
            .attr('class', 'lineD')
            .attr('d', function(d) {})
            .attr('data-legend', function(d) {
                return d.name
            })
            .style('stroke', function(d) {
                return colorD(d.name)
            })

        // Agrega el texto para la leyanda
        legendD
            .append('text')
            .datum(function(d) {
                return {
                    value: d.values[d.values.length - 1],
                }
            })
            .attr('transform', function(d) {
                return (
                    'translate(' + xD(d.value.Time) + ',' + yD(d.value.temperature) + ')'
                )
            })
            .attr('x', 3)
            .attr('dy', '.35em')
            .text(function(d) {
                return d.name
            })

        // Agrega la legenda al svg
        legend = svgD
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
function brushD() {
    xD.domain(brushD.empty() ? x2D.domain() : brushD.extent())
    focusD.selectAll('path.lineD').attr('d', function(d) {
        return lineD(d.values)
    })
    focusD.select('.x.axis').call(xAxisD)
    focusD.select('.y.axis').call(yAxisD)
}