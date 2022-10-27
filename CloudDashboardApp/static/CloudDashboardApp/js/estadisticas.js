

d3.csv("https://raw.githubusercontent.com/Cloud-Dashboard/Data-CSV/main/InfoDengue.csv", function(data1){
    

 
  data=(data1.map(function(d){ return d.Confirmados}));

  const div = d3.select(".data-utils");
  div.select("#std").text(d3.deviation(data));
  div.select("#min").text(d3.min(data));
  div.select("#max").text(d3.max(data));
  div.select("#extent").text(d3.extent(data));
  div.select("#sum").text(d3.sum(data));
  div.select("#median").text(d3.median(data));
  div.select("#mean").text(d3.mean(data));
  div.select("#asc").text(data.sort(d3.ascending));
  div.select("#desc").text(data.sort(d3.descending));
  div.select("#quantile").text(d3.quantile(data.sort(d3.ascending), 0.25));

});


