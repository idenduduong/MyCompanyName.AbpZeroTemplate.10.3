(function ($) {
    app.modals.CustomerDataLookupTableModal = function () {

        var _modalManager;

        var _assignDataLogsService = abp.services.app.assignDataLogs;
        var _$customerDataTable = $('#CustomerDataTable');

        this.init = function (modalManager) {
            _modalManager = modalManager;
        };


        var dataTable = _$customerDataTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _assignDataLogsService.getAllCustomerDataForLookupTable,
                inputFilter: function () {
                    return {
                        filter: $('#CustomerDataTableFilter').val()
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

        $('#CustomerDataTable tbody').on('click', '[id*=selectbtn]', function () {
            var data = dataTable.row($(this).parents('tr')).data();
            _modalManager.setResult(data);
            _modalManager.close();
        });

        function getCustomerData() {
            dataTable.ajax.reload();
        }

        $('#GetCustomerDataButton').click(function (e) {
            e.preventDefault();
            getCustomerData();
        });

        $('#SelectButton').click(function (e) {
            e.preventDefault();
        });

        $(document).keypress(function (e) {
            if (e.which === 13) {
                getCustomerData();
            }
        });

    };
})(jQuery);

