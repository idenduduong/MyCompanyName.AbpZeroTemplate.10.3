(function ($) {
    app.modals.ImportDataLookupTableModal = function () {

        var _modalManager;

        var _customerDatasService = abp.services.app.commonLookup;
        var _$importDataTable = $('#ImportDataTable');

        this.init = function (modalManager) {
            _modalManager = modalManager;
        };


        var dataTable = _$importDataTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _customerDatasService.getAllImportDataListForLookupTable,
                inputFilter: function () {
                    return {
                        filter: $('#ImportDataTableFilter').val()
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
                    data: "importCode"
                },
                {
                    autoWidth: false,
                    orderable: false,
                    targets: 2,
                    data: "importTime",
                    render: function (data) {
                        if (data) {
                            return moment(data).format('L');
                        }
                        return "";
                    }
                }
            ]
        });

        $('#ImportDataTable tbody').on('click', '[id*=selectbtn]', function () {
            var data = dataTable.row($(this).parents('tr')).data();
            _modalManager.setResult(data);
            _modalManager.close();
        });

        function getImportData() {
            dataTable.ajax.reload();
        }

        $('#GetImportDataButton').click(function (e) {
            e.preventDefault();
            getImportData();
        });

        $('#SelectButton').click(function (e) {
            e.preventDefault();
        });

        $(document).keypress(function (e) {
            if (e.which === 13) {
                getImportData();
            }
        });

    };
})(jQuery);

