(function ($) {
    app.modals.TheKhachHangChiTietLookupTableModal = function () {

        var _modalManager;

        var _releasesService = abp.services.app.releases;
        var _$theKhachHangChiTietTable = $('#TheKhachHangChiTietTable');

        this.init = function (modalManager) {
            _modalManager = modalManager;
        };


        var dataTable = _$theKhachHangChiTietTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _releasesService.getAllTheKhachHangChiTietForLookupTable,
                inputFilter: function () {
                    return {
                        filter: $('#TheKhachHangChiTietTableFilter').val()
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

        $('#TheKhachHangChiTietTable tbody').on('click', '[id*=selectbtn]', function () {
            var data = dataTable.row($(this).parents('tr')).data();
            _modalManager.setResult(data);
            _modalManager.close();
        });

        function getTheKhachHangChiTiet() {
            dataTable.ajax.reload();
        }

        $('#GetTheKhachHangChiTietButton').click(function (e) {
            e.preventDefault();
            getTheKhachHangChiTiet();
        });

        $('#SelectButton').click(function (e) {
            e.preventDefault();
        });

        $(document).keypress(function (e) {
            if (e.which === 13) {
                getTheKhachHangChiTiet();
            }
        });

    };
})(jQuery);

