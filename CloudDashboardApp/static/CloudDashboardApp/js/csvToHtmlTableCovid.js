 // Función para asignar un formato a la url
 function format_link(link) {
     if (link)
         return "<a href='" + link + "' target='_blank'>" + link + "</a>";
     else return "";
 }
 // Creación del DataTable asignando una url con los datos y el contenedor donde se
 // colocará la tabla
 CsvToHtmlTable.init({
     csv_path: "https://raw.githubusercontent.com/Cloud-Dashboard/Data-CSV/main/InfoCOVID19.csv",
     element: "table-containerCovid",
     allow_download: false,
     csv_options: {
         separator: ",",
         delimiter: '"'
     },
     // Opciones básicas del DataTable y botones para descargar la tabla en diferentes formatos
     datatables_options: {
         paging: true,
         info: false,
         lengthChange: false,
         dom: 'Bfrtip',
         buttons: ['copy', {
             extend: 'csv',
             title: 'Tabla_COVID19'
         }, {
             extend: 'excel',
             title: 'Tabla_COVID19'
         }, {
             extend: 'pdf',
             title: 'Tabla_COVID19'
         }, {
             extend: 'print',
             title: 'Tabla_COVID19'
         }]
     },


 });