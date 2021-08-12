(function ($) {
    app.modals.NguonKhachHangLookupTableModal = function () {

        var _modalManager;

        var _dM_DoiTuongsService = abp.services.app.dM_DoiTuongs;
        var _$nguonKhachHangTable = $('#NguonKhachHangTable');

        this.init = function (modalManager) {
            _modalManager = modalManager;
        };


        var dataTable = _$nguonKhachHangTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _dM_DoiTuongsService.getAllNguonKhachHangForLookupTable,
                inputFilter: function () {
                    return {
                        filter: $('#NguonKhachHangTableFilter').val()
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

        $('#NguonKhachHangTable tbody').on('click', '[id*=selectbtn]', function () {
            var data = dataTable.row($(this).parents('tr')).data();
            _modalManager.setResult(data);
            _modalManager.close();
        });

        function getNguonKhachHang() {
            dataTable.ajax.reload();
        }

        $('#GetNguonKhachHangButton').click(function (e) {
            e.preventDefault();
            getNguonKhachHang();
        });

        $('#SelectButton').click(function (e) {
            e.preventDefault();
        });

        $(document).keypress(function (e) {
            if (e.which === 13) {
                getNguonKhachHang();
            }
        });

    };
})(jQuery);

