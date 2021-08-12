(function ($) {
    app.modals.TheLanLookupTableModal = function () {

        var _modalManager;

        var _hoaDonBanLeChiTietsService = abp.services.app.hoaDonBanLeChiTiets;
        var _$theLanTable = $('#TheLanTable');
        var khachHangId = $('input[name=khachHangId]').val();
        var hangHoaId = $('input[name=hangHoaId]').val();
        this.init = function (modalManager) {
            _modalManager = modalManager;
        };


        var dataTable = _$theLanTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _hoaDonBanLeChiTietsService.getAllTheLanForLookupTable,
                inputFilter: function () {
                    return {
                        filter: $('#TheLanTableFilter').val(),
                        khachHangId: khachHangId,
                        hangHoaId: hangHoaId
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
                    data: "maThe"
                }
            ]
        });

        $('#TheLanTable tbody').on('click', '[id*=selectbtn]', function () {
            var data = dataTable.row($(this).parents('tr')).data();
            _modalManager.setResult(data);
            _modalManager.close();
        });

        function getTheLan() {
            dataTable.ajax.reload();
        }

        $('#GetTheLanButton').click(function (e) {
            e.preventDefault();
            getTheLan();
        });

        $('#SelectButton').click(function (e) {
            e.preventDefault();
        });

        $(document).keypress(function (e) {
            if (e.which === 13) {
                getTheLan();
            }
        });

    };
})(jQuery);

