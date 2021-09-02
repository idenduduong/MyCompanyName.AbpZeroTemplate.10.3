(function ($) {
    app.modals.DM_KhuyenMaiLookupTableModal = function () {

        var _modalManager;

        var _theKhachHangsService = abp.services.app.theKhachHangs;
        var _$dM_KhuyenMaiTable = $('#DM_KhuyenMaiTable');

        this.init = function (modalManager) {
            _modalManager = modalManager;
        };


        var dataTable = _$dM_KhuyenMaiTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _theKhachHangsService.getAllDM_KhuyenMaiForLookupTable,
                inputFilter: function () {
                    return {
                        filter: $('#DM_KhuyenMaiTableFilter').val()
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

        $('#DM_KhuyenMaiTable tbody').on('click', '[id*=selectbtn]', function () {
            var data = dataTable.row($(this).parents('tr')).data();
            _modalManager.setResult(data);
            _modalManager.close();
        });

        function getDM_KhuyenMai() {
            dataTable.ajax.reload();
        }

        $('#GetDM_KhuyenMaiButton').click(function (e) {
            e.preventDefault();
            getDM_KhuyenMai();
        });

        $('#SelectButton').click(function (e) {
            e.preventDefault();
        });

        $(document).keypress(function (e) {
            if (e.which === 13) {
                getDM_KhuyenMai();
            }
        });

    };
})(jQuery);
