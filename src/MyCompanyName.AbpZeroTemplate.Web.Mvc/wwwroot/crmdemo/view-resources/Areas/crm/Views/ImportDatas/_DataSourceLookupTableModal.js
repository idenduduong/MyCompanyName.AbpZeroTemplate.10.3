(function ($) {
    app.modals.DataSourceLookupTableModal = function () {

        var _modalManager;

        var _importDatasService = abp.services.app.importDatas;
        var _$dataSourceTable = $('#DataSourceTable');

        this.init = function (modalManager) {
            _modalManager = modalManager;
        };


        var dataTable = _$dataSourceTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _importDatasService.getAllDataSourceForLookupTable,
                inputFilter: function () {
                    return {
                        filter: $('#DataSourceTableFilter').val()
                    };
                }
            },
            columnDefs: [
                {
                    targets: 0,
                    data: null,
                    orderable: false,
                    autoWidth: false,
                    defaultContent: "<div class=\"text-center\"><input id='selectbtn' class='btn btn-success' type='button' width='25px' value='" + app.localize('Select') + "' /></div>"
                },
                {
                    autoWidth: false,
                    orderable: false,
                    targets: 1,
                    data: "displayName"
                }
            ]
        });

        $('#DataSourceTable tbody').on('click', '[id*=selectbtn]', function () {
            var data = dataTable.row($(this).parents('tr')).data();
            _modalManager.setResult(data);
            _modalManager.close();
        });

        function getDataSource() {
            dataTable.ajax.reload();
        }

        $('#GetDataSourceButton').click(function (e) {
            e.preventDefault();
            getDataSource();
        });

        $('#SelectButton').click(function (e) {
            e.preventDefault();
        });

        $(document).keypress(function (e) {
            if (e.which === 13) {
                getDataSource();
            }
        });

    };
})(jQuery);

