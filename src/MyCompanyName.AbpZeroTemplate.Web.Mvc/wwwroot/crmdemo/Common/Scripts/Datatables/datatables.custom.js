/************************************************************************
* Overrides default settings for datatables                             *
*************************************************************************/
(function ($) {
    if (!$.fn.dataTable) {
        return;
    }
    $.fn.dataTable.Responsive.defaults.details.renderer = function (api, rowIdx, columns) {
        var data = $.map(columns, function (col, i) {
            return col.hidden ?
                '<tr data-dt-row="' + col.rowIndex + '" data-dt-column="' + col.columnIndex + '">' +
                '<td width="30%">' + col.title + ':' + '</td> ' +
                '<td width="70%">' + col.data + '</td>' +
                '</tr>' :
                '';
        }).join('');

        return data ?
            $('<table/>').addClass('datatable-child-table').append(data) :
            false;
    };
    $.fn.dataTable.Responsive.defaults.details.target = ".expand";
    $.fn.dataTable.Responsive.defaults.details.type = "column";
    $.fn.dataTable.defaults.bFilter = false;
})(jQuery);