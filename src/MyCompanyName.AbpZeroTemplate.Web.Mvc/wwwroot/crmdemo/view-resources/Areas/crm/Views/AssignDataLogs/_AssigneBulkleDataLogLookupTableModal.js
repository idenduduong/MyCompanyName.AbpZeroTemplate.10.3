(function ($) {
    app.modals.AssigneBulkleDataLogLookupTableModal = function () {

        var _modalManager;

        var _assignDataLogsService = abp.services.app.assignDataLogs;
        var _$assigneBulkleDataLogTable = $('#AssigneBulkleDataLogTable');

        this.init = function (modalManager) {
            _modalManager = modalManager;
        };


        var dataTable = _$assigneBulkleDataLogTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _assignDataLogsService.getAllAssigneBulkleDataLogForLookupTable,
                inputFilter: function () {
                    return {
                        filter: $('#AssigneBulkleDataLogTableFilter').val()
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

        $('#AssigneBulkleDataLogTable tbody').on('click', '[id*=selectbtn]', function () {
            var data = dataTable.row($(this).parents('tr')).data();
            _modalManager.setResult(data);
            _modalManager.close();
        });

        function getAssigneBulkleDataLog() {
            dataTable.ajax.reload();
        }

        $('#GetAssigneBulkleDataLogButton').click(function (e) {
            e.preventDefault();
            getAssigneBulkleDataLog();
        });

        $('#SelectButton').click(function (e) {
            e.preventDefault();
        });

        $(document).keypress(function (e) {
            if (e.which === 13) {
                getAssigneBulkleDataLog();
            }
        });

    };
})(jQuery);

