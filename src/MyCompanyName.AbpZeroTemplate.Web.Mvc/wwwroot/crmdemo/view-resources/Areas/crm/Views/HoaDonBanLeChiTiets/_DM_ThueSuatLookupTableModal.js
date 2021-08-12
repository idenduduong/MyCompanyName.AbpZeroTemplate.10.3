(function ($) {
    app.modals.DM_ThueSuatLookupTableModal = function () {

        var _modalManager;

        var _hoaDonBanLeChiTietsService = abp.services.app.hoaDonBanLeChiTiets;
        var _$dM_ThueSuatTable = $('#DM_ThueSuatTable');

        this.init = function (modalManager) {
            _modalManager = modalManager;
        };


        var dataTable = _$dM_ThueSuatTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _hoaDonBanLeChiTietsService.getAllDM_ThueSuatForLookupTable,
                inputFilter: function () {
                    return {
                        filter: $('#DM_ThueSuatTableFilter').val()
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

        $('#DM_ThueSuatTable tbody').on('click', '[id*=selectbtn]', function () {
            var data = dataTable.row($(this).parents('tr')).data();
            _modalManager.setResult(data);
            _modalManager.close();
        });

        function getDM_ThueSuat() {
            dataTable.ajax.reload();
        }

        $('#GetDM_ThueSuatButton').click(function (e) {
            e.preventDefault();
            getDM_ThueSuat();
        });

        $('#SelectButton').click(function (e) {
            e.preventDefault();
        });

        $(document).keypress(function (e) {
            if (e.which === 13) {
                getDM_ThueSuat();
            }
        });

    };
})(jQuery);

