(function ($) {
    app.modals.DM_KhoLookupTableModal = function () {

        var _modalManager;

        var _viTriHangTrongKhosService = abp.services.app.viTriHangTrongKhos;
        var _$dM_KhoTable = $('#DM_KhoTable');

        this.init = function (modalManager) {
            _modalManager = modalManager;
        };


        var dataTable = _$dM_KhoTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _viTriHangTrongKhosService.getAllDM_KhoForLookupTable,
                inputFilter: function () {
                    return {
                        filter: $('#DM_KhoTableFilter').val()
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

        $('#DM_KhoTable tbody').on('click', '[id*=selectbtn]', function () {
            var data = dataTable.row($(this).parents('tr')).data();
            _modalManager.setResult(data);
            _modalManager.close();
        });

        function getDM_Kho() {
            dataTable.ajax.reload();
        }

        $('#GetDM_KhoButton').click(function (e) {
            e.preventDefault();
            getDM_Kho();
        });

        $('#SelectButton').click(function (e) {
            e.preventDefault();
        });

        $(document).keypress(function (e) {
            if (e.which === 13) {
                getDM_Kho();
            }
        });

    };
})(jQuery);

