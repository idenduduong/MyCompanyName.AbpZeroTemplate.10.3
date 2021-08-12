(function ($) {
    app.modals.ReasonLookupTableModal = function () {

        var _modalManager;

        var _recallDataLogsService = abp.services.app.recallDataLogs;
        var _$reasonTable = $('#ReasonTable');

        this.init = function (modalManager) {
            _modalManager = modalManager;
        };


        var dataTable = _$reasonTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _recallDataLogsService.getAllReasonForLookupTable,
                inputFilter: function () {
                    return {
                        filter: $('#ReasonTableFilter').val()
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

        $('#ReasonTable tbody').on('click', '[id*=selectbtn]', function () {
            var data = dataTable.row($(this).parents('tr')).data();
            _modalManager.setResult(data);
            _modalManager.close();
        });

        function getReason() {
            dataTable.ajax.reload();
        }

        $('#GetReasonButton').click(function (e) {
            e.preventDefault();
            getReason();
        });

        $('#SelectButton').click(function (e) {
            e.preventDefault();
        });

        $(document).keypress(function (e) {
            if (e.which === 13) {
                getReason();
            }
        });

    };
})(jQuery);

