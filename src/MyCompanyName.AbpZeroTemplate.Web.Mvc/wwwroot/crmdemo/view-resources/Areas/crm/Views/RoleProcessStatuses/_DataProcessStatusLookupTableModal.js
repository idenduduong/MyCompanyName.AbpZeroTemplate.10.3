(function ($) {
    app.modals.DataProcessStatusLookupTableModal = function () {

        var _modalManager;

        var _roleProcessStatusesService = abp.services.app.roleProcessStatuses;
        var _$dataProcessStatusTable = $('#DataProcessStatusTable');

        this.init = function (modalManager) {
            _modalManager = modalManager;
        };


        var dataTable = _$dataProcessStatusTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _roleProcessStatusesService.getAllDataProcessStatusForLookupTable,
                inputFilter: function () {
                    return {
                        filter: $('#DataProcessStatusTableFilter').val()
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

        $('#DataProcessStatusTable tbody').on('click', '[id*=selectbtn]', function () {
            var data = dataTable.row($(this).parents('tr')).data();
            _modalManager.setResult(data);
            _modalManager.close();
        });

        function getDataProcessStatus() {
            dataTable.ajax.reload();
        }

        $('#GetDataProcessStatusButton').click(function (e) {
            e.preventDefault();
            getDataProcessStatus();
        });

        $('#SelectButton').click(function (e) {
            e.preventDefault();
        });

        $(document).keypress(function (e) {
            if (e.which === 13) {
                getDataProcessStatus();
            }
        });

    };
})(jQuery);

