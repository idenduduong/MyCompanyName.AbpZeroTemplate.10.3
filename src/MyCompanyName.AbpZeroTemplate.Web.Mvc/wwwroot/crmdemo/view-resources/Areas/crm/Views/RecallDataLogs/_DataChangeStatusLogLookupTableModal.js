(function ($) {
    app.modals.DataChangeStatusLogLookupTableModal = function () {

        var _modalManager;

        var _recallDataLogsService = abp.services.app.recallDataLogs;
        var _$dataChangeStatusLogTable = $('#DataChangeStatusLogTable');

        this.init = function (modalManager) {
            _modalManager = modalManager;
        };


        var dataTable = _$dataChangeStatusLogTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _recallDataLogsService.getAllDataChangeStatusLogForLookupTable,
                inputFilter: function () {
                    return {
                        filter: $('#DataChangeStatusLogTableFilter').val()
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

        $('#DataChangeStatusLogTable tbody').on('click', '[id*=selectbtn]', function () {
            var data = dataTable.row($(this).parents('tr')).data();
            _modalManager.setResult(data);
            _modalManager.close();
        });

        function getDataChangeStatusLog() {
            dataTable.ajax.reload();
        }

        $('#GetDataChangeStatusLogButton').click(function (e) {
            e.preventDefault();
            getDataChangeStatusLog();
        });

        $('#SelectButton').click(function (e) {
            e.preventDefault();
        });

        $(document).keypress(function (e) {
            if (e.which === 13) {
                getDataChangeStatusLog();
            }
        });

    };
})(jQuery);

