(function ($) {
    app.modals.HoaDonBanLeLookupTableModal = function () {

        var _modalManager;

        var _hoaDonBanLe_DacDiemKhachHangsService = abp.services.app.hoaDonBanLe_DacDiemKhachHangs;
        var _$hoaDonBanLeTable = $('#HoaDonBanLeTable');

        this.init = function (modalManager) {
            _modalManager = modalManager;
        };


        var dataTable = _$hoaDonBanLeTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _hoaDonBanLe_DacDiemKhachHangsService.getAllHoaDonBanLeForLookupTable,
                inputFilter: function () {
                    return {
                        filter: $('#HoaDonBanLeTableFilter').val()
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

        $('#HoaDonBanLeTable tbody').on('click', '[id*=selectbtn]', function () {
            var data = dataTable.row($(this).parents('tr')).data();
            _modalManager.setResult(data);
            _modalManager.close();
        });

        function getHoaDonBanLe() {
            dataTable.ajax.reload();
        }

        $('#GetHoaDonBanLeButton').click(function (e) {
            e.preventDefault();
            getHoaDonBanLe();
        });

        $('#SelectButton').click(function (e) {
            e.preventDefault();
        });

        $(document).keypress(function (e) {
            if (e.which === 13) {
                getHoaDonBanLe();
            }
        });

    };
})(jQuery);

