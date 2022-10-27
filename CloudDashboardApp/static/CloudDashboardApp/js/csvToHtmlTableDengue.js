
        function format_link(link) {
            if (link)
                return "<a href='" + link + "' target='_blank'>" + link + "</a>";
            else return "";
        }

        CsvToHtmlTable.init({
            csv_path: "https://raw.githubusercontent.com/Cloud-Dashboard/Data-CSV/main/InfoDengue.csv",
            element: "table-containerDengue",
            allow_download: false,
            csv_options: {
                separator: ",",
                delimiter: '"'
            },
            datatables_options: {
                paging: true,
                info: false,
                lengthChange: false, /*cambiar a "false" para que solo muestre de 10 en 10 registros*/
                
            },

        });
