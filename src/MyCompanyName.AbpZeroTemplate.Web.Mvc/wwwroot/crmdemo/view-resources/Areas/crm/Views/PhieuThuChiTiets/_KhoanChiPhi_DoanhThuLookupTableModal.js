(function ($) {
    app.modals.KhoanChiPhi_DoanhThuLookupTableModal = function () {

        var _modalManager;

        var _phieuThuChiTietsService = abp.services.app.phieuThuChiTiets;
        var _$khoanChiPhi_DoanhThuTable = $('#KhoanChiPhi_DoanhThuTable');

        this.init = function (modalManager) {
            _modalManager = modalManager;
        };


        var dataTable = _$khoanChiPhi_DoanhThuTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _phieuThuChiTietsService.getAllKhoanChiPhi_DoanhThuForLookupTable,
                inputFilter: function () {
                    return {
                        filter: $('#KhoanChiPhi_DoanhThuTableFilter').val()
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

        $('#KhoanChiPhi_DoanhThuTable tbody').on('click', '[id*=selectbtn]', function () {
            var data = dataTable.row($(this).parents('tr')).data();
            _modalManager.setResult(data);
            _modalManager.close();
        });

        function getKhoanChiPhi_DoanhThu() {
            dataTable.ajax.reload();
        }

        $('#GetKhoanChiPhi_DoanhThuButton').click(function (e) {
            e.preventDefault();
            getKhoanChiPhi_DoanhThu();
        });

        $('#SelectButton').click(function (e) {
            e.preventDefault();
        });

        $(document).keypress(function (e) {
            if (e.which === 13) {
                getKhoanChiPhi_DoanhThu();
            }
        });

    };
})(jQuery);

