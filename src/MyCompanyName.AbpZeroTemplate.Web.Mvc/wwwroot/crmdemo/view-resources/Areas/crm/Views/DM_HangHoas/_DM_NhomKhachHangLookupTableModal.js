(function ($) {
    app.modals.DM_NhomKhachHangLookupTableModal = function () {

        var _modalManager;

        var _dM_HangHoasService = abp.services.app.dM_HangHoas;
        var _$dM_NhomKhachHangTable = $('#DM_NhomKhachHangTable');

        this.init = function (modalManager) {
            _modalManager = modalManager;
        };


        var dataTable = _$dM_NhomKhachHangTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _dM_HangHoasService.getAllDM_NhomKhachHangForLookupTable,
                inputFilter: function () {
                    return {
                        filter: $('#DM_NhomKhachHangTableFilter').val()
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

        $('#DM_NhomKhachHangTable tbody').on('click', '[id*=selectbtn]', function () {
            var data = dataTable.row($(this).parents('tr')).data();
            _modalManager.setResult(data);
            _modalManager.close();
        });

        function getDM_NhomKhachHang() {
            dataTable.ajax.reload();
        }

        $('#GetDM_NhomKhachHangButton').click(function (e) {
            e.preventDefault();
            getDM_NhomKhachHang();
        });

        $('#SelectButton').click(function (e) {
            e.preventDefault();
        });

        $(document).keypress(function (e) {
            if (e.which === 13) {
                getDM_NhomKhachHang();
            }
        });

    };
})(jQuery);

