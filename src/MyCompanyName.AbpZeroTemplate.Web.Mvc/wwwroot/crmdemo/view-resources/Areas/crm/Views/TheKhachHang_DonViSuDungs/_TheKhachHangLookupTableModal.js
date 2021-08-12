(function ($) {
    app.modals.TheKhachHangLookupTableModal = function () {

        var _modalManager;

        var _theKhachHang_DonViSuDungsService = abp.services.app.theKhachHang_DonViSuDungs;
        var _$theKhachHangTable = $('#TheKhachHangTable');

        this.init = function (modalManager) {
            _modalManager = modalManager;
        };


        var dataTable = _$theKhachHangTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _theKhachHang_DonViSuDungsService.getAllTheKhachHangForLookupTable,
                inputFilter: function () {
                    return {
                        filter: $('#TheKhachHangTableFilter').val()
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

        $('#TheKhachHangTable tbody').on('click', '[id*=selectbtn]', function () {
            var data = dataTable.row($(this).parents('tr')).data();
            _modalManager.setResult(data);
            _modalManager.close();
        });

        function getTheKhachHang() {
            dataTable.ajax.reload();
        }

        $('#GetTheKhachHangButton').click(function (e) {
            e.preventDefault();
            getTheKhachHang();
        });

        $('#SelectButton').click(function (e) {
            e.preventDefault();
        });

        $(document).keypress(function (e) {
            if (e.which === 13) {
                getTheKhachHang();
            }
        });

    };
})(jQuery);

