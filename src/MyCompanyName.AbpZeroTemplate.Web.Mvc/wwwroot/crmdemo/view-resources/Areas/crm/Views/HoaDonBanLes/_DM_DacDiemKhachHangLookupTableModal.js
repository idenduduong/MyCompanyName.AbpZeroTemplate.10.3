(function ($) {
    app.modals.DM_DacDiemKhachHangLookupTableModal = function () {

        var _modalManager;

        var _hoaDonBanLesService = abp.services.app.hoaDonBanLes;
        var _$dM_DacDiemKhachHangTable = $('#DM_DacDiemKhachHangTable');

        this.init = function (modalManager) {
            _modalManager = modalManager;
        };


        var dataTable = _$dM_DacDiemKhachHangTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _hoaDonBanLesService.getAllDM_DacDiemKhachHangForLookupTable,
                inputFilter: function () {
                    return {
                        filter: $('#DM_DacDiemKhachHangTableFilter').val()
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

        $('#DM_DacDiemKhachHangTable tbody').on('click', '[id*=selectbtn]', function () {
            var data = dataTable.row($(this).parents('tr')).data();
            _modalManager.setResult(data);
            _modalManager.close();
        });

        function getDM_DacDiemKhachHang() {
            dataTable.ajax.reload();
        }

        $('#GetDM_DacDiemKhachHangButton').click(function (e) {
            e.preventDefault();
            getDM_DacDiemKhachHang();
        });

        $('#SelectButton').click(function (e) {
            e.preventDefault();
        });

        $(document).keypress(function (e) {
            if (e.which === 13) {
                getDM_DacDiemKhachHang();
            }
        });

    };
})(jQuery);

