(function ($) {
    app.modals.TheGiaTriLookupTableModal = function () {

        var _modalManager;
        
        var _hoaDonBanLesService = abp.services.app.hoaDonBanLes;
        var _$theLanTable = $('#TheGiaTriTable');
        this.init = function (modalManager) {
            _modalManager = modalManager;
        };


        var dataTable = _$theLanTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _hoaDonBanLesService.getAllTheGiaTriForLookupTable,
                inputFilter: function () {
                    return {
                        filter: $('#TheGiaTriTableFilter').val(),
                        khachHangId: $('input[name=khachHangId]').val(),
                        hangHoaId: $('input[name=hangHoaId]').val()
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
                },
                {
                    autoWidth: false,
                    orderable: false,
                    targets: 2,
                    data: "soDu"
                }
            ]
        });

        $('#TheGiaTriTable tbody').on('click', '[id*=selectbtn]', function () {
            var data = dataTable.row($(this).parents('tr')).data();
            _modalManager.setResult(data);
            _modalManager.close();
        });

        function getTheGiaTri() {
            dataTable.ajax.reload();
        }

        $('#GetTheGiaTriButton').click(function (e) {
            e.preventDefault();
            getTheGiaTri();
        });

        $('#SelectButton').click(function (e) {
            e.preventDefault();
        });

        $(document).keypress(function (e) {
            if (e.which === 13) {
                getTheGiaTri();
            }
        });

    };
})(jQuery);

