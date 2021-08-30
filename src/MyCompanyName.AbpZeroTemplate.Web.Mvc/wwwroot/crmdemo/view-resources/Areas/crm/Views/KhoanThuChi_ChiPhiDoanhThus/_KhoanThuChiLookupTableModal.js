(function ($) {
    app.modals.KhoanThuChiLookupTableModal = function () {

        var _modalManager;

        var _khoanThuChi_ChiPhiDoanhThusService = abp.services.app.khoanThuChi_ChiPhiDoanhThus;
        var _$khoanThuChiTable = $('#KhoanThuChiTable');

        this.init = function (modalManager) {
            _modalManager = modalManager;
        };


        var dataTable = _$khoanThuChiTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _khoanThuChi_ChiPhiDoanhThusService.getAllKhoanThuChiForLookupTable,
                inputFilter: function () {
                    return {
                        filter: $('#KhoanThuChiTableFilter').val()
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

        $('#KhoanThuChiTable tbody').on('click', '[id*=selectbtn]', function () {
            var data = dataTable.row($(this).parents('tr')).data();
            _modalManager.setResult(data);
            _modalManager.close();
        });

        function getKhoanThuChi() {
            dataTable.ajax.reload();
        }

        $('#GetKhoanThuChiButton').click(function (e) {
            e.preventDefault();
            getKhoanThuChi();
        });

        $('#SelectButton').click(function (e) {
            e.preventDefault();
        });

        $(document).keypress(function (e) {
            if (e.which === 13) {
                getKhoanThuChi();
            }
        });

    };
})(jQuery);

