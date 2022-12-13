// Función para asignar un formato a la url
function format_link(link) {
    if (link)
        return "<a href='" + link + "' target='_blank'>" + link + "</a>";
    else return "";
}
// Creación del DataTable asignando una url con los datos y el contenedor donde se
// colocará la tabla
CsvToHtmlTable.init({
    csv_path: "https://raw.githubusercontent.com/Cloud-Dashboard/Data-CSV/main/InfoDengue.csv",
    element: "table-containerDengue",
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
            title: 'Tabla_Dengue'
        }, {
            extend: 'excel',
            title: 'Tabla_Dengue'
        }, {
            extend: 'pdf',
            title: 'Tabla_Dengue'
        }, {
            extend: 'print',
            title: 'Tabla_Dengue'
        }]
    },


});