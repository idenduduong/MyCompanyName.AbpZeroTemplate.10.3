(function ($) {
    app.modals.DM_NganHangLookupTableModal = function () {

        var _modalManager;

        var _dM_DonVisService = abp.services.app.dM_DonVis;
        var _$dM_NganHangTable = $('#DM_NganHangTable');

        this.init = function (modalManager) {
            _modalManager = modalManager;
        };


        var dataTable = _$dM_NganHangTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _dM_DonVisService.getAllDM_NganHangForLookupTable,
                inputFilter: function () {
                    return {
                        filter: $('#DM_NganHangTableFilter').val()
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

        $('#DM_NganHangTable tbody').on('click', '[id*=selectbtn]', function () {
            var data = dataTable.row($(this).parents('tr')).data();
            _modalManager.setResult(data);
            _modalManager.close();
        });

        function getDM_NganHang() {
            dataTable.ajax.reload();
        }

        $('#GetDM_NganHangButton').click(function (e) {
            e.preventDefault();
            getDM_NganHang();
        });

        $('#SelectButton').click(function (e) {
            e.preventDefault();
        });

        $(document).keypress(function (e) {
            if (e.which === 13) {
                getDM_NganHang();
            }
        });

    };
})(jQuery);

