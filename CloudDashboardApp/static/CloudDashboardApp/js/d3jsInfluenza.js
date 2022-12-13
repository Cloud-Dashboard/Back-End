// Selecciona el elemento svg para modificarlo, además se añaden los márgenes
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
    // Tamaño y márgenes del gráfico
    width = 850 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom,
    height2 = 500 - margin2.top - margin2.bottom

// Creación de escala de colores
var colorI = d3.scale.category10()

// Configuración de las escalas de los ejes
var xI = d3.scale.linear().range([0, width]),
    x2I = d3.scale.linear().range([0, width]),
    yI = d3.scale.linear().range([height, 0]),
    y2I = d3.scale.linear().range([height2, 0])

// Dibuja los ejes
var xAxisI = d3.svg.axis().scale(xI).orient('bottom'),
    xAxis2I = d3.svg.axis().scale(x2I).orient('bottom'),
    yAxisI = d3.svg.axis().scale(yI).orient('left')

// Creación del brush
var brushI = d3.svg.brush().x(x2I).on('brush', brushI)

// Función para generar las líneas
var lineI = d3.svg
    .line()
    .defined(function(d) {
        return !isNaN(d.temperature)
    })
    .interpolate('cubic')
    .x(function(d) {
        return xI(d.Time)
    })
    .y(function(d) {
        return yI(d.temperature)
    })

var line2I = d3.svg
    .line()
    .defined(function(d) {
        return !isNaN(d.temperature)
    })
    .interpolate('cubic')
    .x(function(d) {
        return x2I(d.Time)
    })
    .y(function(d) {
        return y2I(d.temperature)
    })

// Agregar svg al seleccionado en el cuerpo
var svgI = d3
    .select('.svgInfluenza')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)

// Agregar elemento clip-path al svg
svgI
    .append('defs')
    .append('clipPath')
    .attr('id', 'clip')
    .append('rect')
    .attr('width', width)
    .attr('height', height)

// Traslada la ubicación del gráfico en el svg
var focusI = svgI
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

// Traslada la ubicación del gráfico en el svg para el brush
var contextI = svgI
    .append('g')
    .attr('transform', 'translate(' + margin2.left + ',' + margin2.top + ')')

//Función para leer los datos
d3.csv(
    'https://raw.githubusercontent.com/Cloud-Dashboard/Data-CSV/main/Influenza_Caracterizado.csv',
    function(error, data) {
        // Devuelve las propiedades claves de los datos
        colorI.domain(
            d3.keys(data[0]).filter(function(key) {
                return key !== 'Time'
            }),
        )

        //Función para verificar el formatos de los datos
        data.forEach(function(d) {
            d.Time = d.Time
        })

        // Establece color a las propiedades de la data
        var sourcesI = colorI.domain().map(function(name) {
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
        xI.domain(
            d3.extent(data, function(d) {
                return d.Time * 1.0
            }),
        )
        yI.domain([
            d3.min(sourcesI, function(c) {
                return d3.min(c.values, function(v) {
                    return v.temperature
                })
            }),
            d3.max(sourcesI, function(c) {
                return d3.max(c.values, function(v) {
                    return v.temperature
                })
            }),
        ])
        x2I.domain(xI.domain())
        y2I.domain(yI.domain())

        // Establece la ubicación del gráfico con el color
        var focuslineGroupsI = focusI
            .selectAll('g')
            .data(sourcesI)
            .enter()
            .append('g')

        // Establece las líneas y el color
        var focuslinesI = focuslineGroupsI
            .append('path')
            .attr('class', 'lineI')
            .attr('d', function(d) {
                return lineI(d.values)
            })
            .style('stroke', function(d) {
                return colorI(d.name)
            })
            .attr('clip-path', 'url(#clip)')

        // En la ubicación agrega los ejes
        focusI
            .append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + height + ')')
            .call(xAxisI)

        focusI.append('g').attr('class', 'y axis').call(yAxisI)

        // Agrega el nombre de los ejes
        svgI
            .append('text')
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

        // Establece la ubicación del gráfico con el color para el brush
        var contextlineGroupsI = contextI
            .selectAll('g')
            .data(sourcesI)
            .enter()
            .append('g')

        // Establece las líneas y el color para el bursh
        var contextLinesI = contextlineGroupsI
            .append('path')
            .attr('class', 'lineI')
            .attr('d', function(d) {
                return line2I(d.values)
            })
            .style('stroke', function(d) {
                return colorI(d.name)
            })
            .attr('clip-path', 'url(#clip)')

        // Agrega los ejes para el brush
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

        // Creación de la leyenda del gráfico
        var legendI = svgI
            .selectAll('.legendI')
            .data(sourcesI)
            .enter()
            .append('g')
            .attr('class', 'legendI')

        // Agrega las propiedades  y color para la leyanda
        legendI
            .append('path')
            .attr('class', 'lineI')
            .attr('d', function(d) {})
            .attr('data-legend', function(d) {
                return d.name
            })
            .style('stroke', function(d) {
                return colorI(d.name)
            })

        // Agrega el texto para la leyanda
        legendI
            .append('text')
            .datum(function(d) {
                return {
                    value: d.values[d.values.length - 1],
                }
            })
            .attr('transform', function(d) {
                return (
                    'translate(' + xI(d.value.Time) + ',' + yI(d.value.temperature) + ')'
                )
            })
            .attr('x', 3)
            .attr('dy', '.35em')
            .text(function(d) {
                return d.name
            })

        // Agrega la legenda al svg
        legend = svgI
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
function brushI() {
    xI.domain(brushI.empty() ? x2I.domain() : brushI.extent())
    focusI.selectAll('path.lineI').attr('d', function(d) {
        return lineI(d.values)
    })
    focusI.select('.x.axis').call(xAxisI)
    focusI.select('.y.axis').call(yAxisI)
}