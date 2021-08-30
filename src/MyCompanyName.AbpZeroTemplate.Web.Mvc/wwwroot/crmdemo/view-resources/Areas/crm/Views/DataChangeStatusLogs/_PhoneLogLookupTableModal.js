(function ($) {
    app.modals.PhoneLogLookupTableModal = function () {

        var _modalManager;

        var _dataChangeStatusLogsService = abp.services.app.dataChangeStatusLogs;
        var _$phoneLogTable = $('#PhoneLogTable');

        this.init = function (modalManager) {
            _modalManager = modalManager;
        };


        var dataTable = _$phoneLogTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _dataChangeStatusLogsService.getAllPhoneLogForLookupTable,
                inputFilter: function () {
                    return {
                        filter: $('#PhoneLogTableFilter').val()
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

        $('#PhoneLogTable tbody').on('click', '[id*=selectbtn]', function () {
            var data = dataTable.row($(this).parents('tr')).data();
            _modalManager.setResult(data);
            _modalManager.close();
        });

        function getPhoneLog() {
            dataTable.ajax.reload();
        }

        $('#GetPhoneLogButton').click(function (e) {
            e.preventDefault();
            getPhoneLog();
        });

        $('#SelectButton').click(function (e) {
            e.preventDefault();
        });

        $(document).keypress(function (e) {
            if (e.which === 13) {
                getPhoneLog();
            }
        });

    };
})(jQuery);

