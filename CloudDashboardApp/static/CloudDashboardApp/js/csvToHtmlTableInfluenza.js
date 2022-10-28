
function format_link(link) {
  if (link)
      return "<a href='" + link + "' target='_blank'>" + link + "</a>";
  else return "";
}

CsvToHtmlTable.init({
  csv_path: "https://raw.githubusercontent.com/Cloud-Dashboard/Data-CSV/main/InfoInfluenza.csv",
  element: "table-containerInfluenza",
  allow_download: false,
  csv_options: {
      separator: ",",
      delimiter: '"'
  },
  datatables_options: {
    
    dom:
    "<f>"+
    "<'row'<'col-sm-12'tr>>" +
    "<'row'<'col-sm-4'i><'col-sm-4 text-center'l><'col-sm-4'p>>",

      paging: true,
      info: false,
      lengthChange: false, /*cambiar a "false" para que solo muestre de 10 en 10 registros*/
      
  },
  

});

