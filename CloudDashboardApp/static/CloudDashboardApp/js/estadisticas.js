

d3.csv("https://raw.githubusercontent.com/Cloud-Dashboard/Data-CSV/main/InfoDengue.csv", function (data) {

  data.forEach(function (d) {
    d.Confirmados = +d.Confirmados;
  });

  // Compute the extent of the data set in age and years.
  var confirmadosmax = d3.max(data, function (d) {
    return d.Confirmados;
  }),
    confirmadosmin = d3.min(data, function (d)  {
      
      return d.Confirmados || Infinity;
    }),
    confirmadosmean = d3.mean(data, function (d) {
      return d.Confirmados;
    }),
    confirmadosstd = d3.deviation(data, function (d) {
      return d.Confirmados;
    });


  d3.select(".minD").text(confirmadosmin);
  d3.select(".maxD").text(confirmadosmax);
  d3.select(".meanD").text(confirmadosmean);
  d3.select(".stdD").text(confirmadosstd);


  

});



d3.csv("https://raw.githubusercontent.com/Cloud-Dashboard/Data-CSV/main/InfoCOVID19.csv", function (data) {


 data.forEach(function (d) {
    d.Confirmados = +d.Confirmados;
  });

  // Compute the extent of the data set in age and years.
  var confirmadosmax = d3.max(data, function (d) {
    return d.Confirmados;
  }),
    confirmadosmin = d3.min(data, function (d)  {
      
      return d.Confirmados || Infinity;
    }),
    confirmadosmean = d3.mean(data, function (d) {
      return d.Confirmados;
    }),
    confirmadosstd = d3.deviation(data, function (d) {
      return d.Confirmados;
    });


  d3.select(".minC").text(confirmadosmin);
  d3.select(".maxC").text(confirmadosmax);
  d3.select(".meanC").text(confirmadosmean);
  d3.select(".stdC").text(confirmadosstd);

});




d3.csv("https://raw.githubusercontent.com/Cloud-Dashboard/Data-CSV/main/InfoInfluenza.csv", function (data) {




  data.forEach(function (d) {
    d.AH1N12009 = +d.AH1N12009;
  });

  // Compute the extent of the data set in age and years.
  var confirmadosmax = d3.max(data, function (d) {
    return d.AH1N12009;
  }),
    confirmadosmin = d3.min(data, function (d)  {
     
      return d.AH1N12009 || Infinity;
    }),
    confirmadosmean = d3.mean(data, function (d) {
      return d.AH1N12009;
    }),
    confirmadosstd = d3.deviation(data, function (d) {
      return d.AH1N12009;
    });



  d3.select(".minA").text(confirmadosmin);
  d3.select(".maxA").text(confirmadosmax);
  d3.select(".meanA").text(confirmadosmean);
  d3.select(".stdA").text(confirmadosstd);
  
});




d3.csv("https://raw.githubusercontent.com/Cloud-Dashboard/Data-CSV/main/InfoSarampion.csv", function (data) {

  data.forEach(function (d) {
    d.CASOS = +d.CASOS;
  });

  // Compute the extent of the data set in age and years.
  var confirmadosmax = d3.max(data, function (d) {
    return d.CASOS;
  }),
    confirmadosmin = d3.min(data, function (d)  {
      
      return d.CASOS || Infinity;
    }),
    confirmadosmean = d3.mean(data, function (d) {
      return d.CASOS;
    }),
    confirmadosstd = d3.deviation(data, function (d) {
      return d.CASOS;
    });


  d3.select(".minS").text(confirmadosmin);
  d3.select(".maxS").text(confirmadosmax);
  d3.select(".meanS").text(confirmadosmean);
  d3.select(".stdS").text(confirmadosstd);
  

});



