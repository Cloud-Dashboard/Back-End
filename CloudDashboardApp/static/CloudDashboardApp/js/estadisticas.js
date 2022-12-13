// Función para convertir JSON a CSV
function JSON2CSV(objArray) {
    // Proceso para convertir el JSON introducido a strings planos y 
    // retornar el nuevo formato corrrespondiente a CSV
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';
    var line = '';

    if ($("#labels").is(':checked')) {
        var head = array[0];
        if ($("#quote").is(':checked')) {
            for (var index in array[0]) {
                var value = index + "";
                line += '"' + value.replace(/"/g, '""') + '",';
            }
        } else {
            for (var index in array[0]) {
                line += index + ',';
            }
        }

        line = line.slice(0, -1);
        str += line + '\r\n';
    }

    for (var i = 0; i < array.length; i++) {
        var line = '';

        if ($("#quote").is(':checked')) {
            for (var index in array[i]) {
                var value = array[i][index] + "";
                line += '"' + value.replace(/"/g, '""') + '",';
            }
        } else {
            for (var index in array[i]) {
                line += array[i][index] + ',';
            }
        }

        line = line.slice(0, -1);
        str += line + '\r\n';
    }
    return str;
}

// Método que envía una solicitud a la url para cargar el archivo como un objeto
d3.csv("https://raw.githubusercontent.com/Cloud-Dashboard/Data-CSV/main/InfoDengue.csv", function(data) {

    data.forEach(function(d) {
        d.Confirmados = +d.Confirmados;
    });

    // Calculo del máximo, mínimo, media y desviación estándar de los datos
    var confirmadosmax = d3.max(data, function(d) {
            return d.Confirmados;
        }),
        confirmadosmin = d3.min(data, function(d) {

            return d.Confirmados || Infinity;
        }),
        confirmadosmean = d3.mean(data, function(d) {
            return d.Confirmados;
        }),
        confirmadosstd = d3.deviation(data, function(d) {
            return d.Confirmados;
        });

    // Creación del objeto con el encabezado y el cuerpo para el CSV
    var items = [{
        min: "Mínimo",
        max: "Máximo",
        mean: "Media",
        std: "Desviación estándar"
    }, {
        min: confirmadosmax,
        max: confirmadosmin,
        mean: confirmadosmean,
        std: confirmadosstd
    }];

    // Convierte el objeto a JSON
    var jsonObject = JSON.stringify(items);

    // Función de descarga asignada a un botón
    $("#downloadDengue").click(function() {
        // Se utiliza el JSON y este se convierte en un formato CSV,
        // se le asigna un nombre y se descarga
        var json_pre = jsonObject;
        var json = $.parseJSON(json_pre);

        var csv = JSON2CSV(json);
        var downloadLink = document.createElement("a");
        var blob = new Blob(["\ufeff", csv]);
        var url = URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.download = "Estadisticas_Dengue.csv";

        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    });

    d3.select(".minD").text(confirmadosmin);
    d3.select(".maxD").text(confirmadosmax);
    d3.select(".meanD").text(confirmadosmean);
    d3.select(".stdD").text(confirmadosstd);




});



d3.csv("https://raw.githubusercontent.com/Cloud-Dashboard/Data-CSV/main/InfoCOVID19.csv", function(data) {


    data.forEach(function(d) {
        d.Confirmados = +d.Confirmados;
    });

    // Compute the extent of the data set in age and years.
    var confirmadosmax = d3.max(data, function(d) {
            return d.Confirmados;
        }),
        confirmadosmin = d3.min(data, function(d) {

            return d.Confirmados || Infinity;
        }),
        confirmadosmean = d3.mean(data, function(d) {
            return d.Confirmados;
        }),
        confirmadosstd = d3.deviation(data, function(d) {
            return d.Confirmados;
        });

    // Creación del objeto con el encabezado y el cuerpo para el CSV
    var items = [{
        min: "Mínimo",
        max: "Máximo",
        mean: "Media",
        std: "Desviación estándar"
    }, {
        min: confirmadosmin,
        max: confirmadosmax,
        mean: confirmadosmean,
        std: confirmadosstd
    }];

    // Convierte el objeto a JSON
    var jsonObject = JSON.stringify(items);

    // Función de descarga asignada a un botón
    $("#downloadCovid").click(function() {
        // Se utiliza el JSON y este se convierte en un formato CSV,
        // se le asigna un nombre y se descarga
        var json_pre = jsonObject;
        var json = $.parseJSON(json_pre);

        var csv = JSON2CSV(json);
        var downloadLink = document.createElement("a");
        var blob = new Blob(["\ufeff", csv]);
        var url = URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.download = "Estadisticas_COVID19.csv";

        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    });

    d3.select(".minC").text(confirmadosmin);
    d3.select(".maxC").text(confirmadosmax);
    d3.select(".meanC").text(confirmadosmean);
    d3.select(".stdC").text(confirmadosstd);

});




d3.csv("https://raw.githubusercontent.com/Cloud-Dashboard/Data-CSV/main/InfoInfluenza.csv", function(data) {

    data.forEach(function(d) {
        d.AH1N12009 = +d.AH1N12009;
    });

    // Compute the extent of the data set in age and years.
    var confirmadosmax = d3.max(data, function(d) {
            return d.AH1N12009;
        }),
        confirmadosmin = d3.min(data, function(d) {

            return d.AH1N12009 || Infinity;
        }),
        confirmadosmean = d3.mean(data, function(d) {
            return d.AH1N12009;
        }),
        confirmadosstd = d3.deviation(data, function(d) {
            return d.AH1N12009;
        });

    // Creación del objeto con el encabezado y el cuerpo para el CSV
    var items = [{
        min: "Mínimo",
        max: "Máximo",
        mean: "Media",
        std: "Desviación estándar"
    }, {
        min: confirmadosmax,
        max: confirmadosmin,
        mean: confirmadosmean,
        std: confirmadosstd
    }];

    // Convierte el objeto a JSON
    var jsonObject = JSON.stringify(items);

    // Función de descarga asignada a un botón
    $("#downloadInfluenza").click(function() {
        // Se utiliza el JSON y este se convierte en un formato CSV,
        // se le asigna un nombre y se descarga
        var json_pre = jsonObject;
        var json = $.parseJSON(json_pre);

        var csv = JSON2CSV(json);
        var downloadLink = document.createElement("a");
        var blob = new Blob(["\ufeff", csv]);
        var url = URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.download = "Estadisticas_Influenza.csv";

        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    });

    d3.select(".minA").text(confirmadosmin);
    d3.select(".maxA").text(confirmadosmax);
    d3.select(".meanA").text(confirmadosmean);
    d3.select(".stdA").text(confirmadosstd);

});




d3.csv("https://raw.githubusercontent.com/Cloud-Dashboard/Data-CSV/main/InfoSarampion.csv", function(data) {

    data.forEach(function(d) {
        d.CASOS = +d.CASOS;
    });

    // Compute the extent of the data set in age and years.
    var confirmadosmax = d3.max(data, function(d) {
            return d.CASOS;
        }),
        confirmadosmin = d3.min(data, function(d) {

            return d.CASOS || Infinity;
        }),
        confirmadosmean = d3.mean(data, function(d) {
            return d.CASOS;
        }),
        confirmadosstd = d3.deviation(data, function(d) {
            return d.CASOS;
        });

    // Creación del objeto con el encabezado y el cuerpo para el CSV
    var items = [{
        min: "Mínimo",
        max: "Máximo",
        mean: "Media",
        std: "Desviación estándar"
    }, {
        min: confirmadosmin,
        max: confirmadosmax,
        mean: confirmadosmean,
        std: confirmadosstd
    }];

    // Convierte el objeto a JSON
    var jsonObject = JSON.stringify(items);

    // Función de descarga asignada a un botón
    $("#downloadSarampion").click(function() {
        // Se utiliza el JSON y este se convierte en un formato CSV,
        // se le asigna un nombre y se descarga
        var json_pre = jsonObject;
        var json = $.parseJSON(json_pre);

        var csv = JSON2CSV(json);
        var downloadLink = document.createElement("a");
        var blob = new Blob(["\ufeff", csv]);
        var url = URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.download = "Estadisticas_Sarampion.csv";

        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    });

    d3.select(".minS").text(confirmadosmin);
    d3.select(".maxS").text(confirmadosmax);
    d3.select(".meanS").text(confirmadosmean);
    d3.select(".stdS").text(confirmadosstd);


});