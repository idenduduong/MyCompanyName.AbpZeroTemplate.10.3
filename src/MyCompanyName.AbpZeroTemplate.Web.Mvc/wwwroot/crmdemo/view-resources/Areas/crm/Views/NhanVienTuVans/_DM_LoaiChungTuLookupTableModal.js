(function ($) {
    app.modals.DM_LoaiChungTuLookupTableModal = function () {

        var _modalManager;

        var _nhanVienTuVansService = abp.services.app.nhanVienTuVans;
        var _$dM_LoaiChungTuTable = $('#DM_LoaiChungTuTable');

        this.init = function (modalManager) {
            _modalManager = modalManager;
        };


        var dataTable = _$dM_LoaiChungTuTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _nhanVienTuVansService.getAllDM_LoaiChungTuForLookupTable,
                inputFilter: function () {
                    return {
                        filter: $('#DM_LoaiChungTuTableFilter').val()
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

        $('#DM_LoaiChungTuTable tbody').on('click', '[id*=selectbtn]', function () {
            var data = dataTable.row($(this).parents('tr')).data();
            _modalManager.setResult(data);
            _modalManager.close();
        });

        function getDM_LoaiChungTu() {
            dataTable.ajax.reload();
        }

        $('#GetDM_LoaiChungTuButton').click(function (e) {
            e.preventDefault();
            getDM_LoaiChungTu();
        });

        $('#SelectButton').click(function (e) {
            e.preventDefault();
        });

        $(document).keypress(function (e) {
            if (e.which === 13) {
                getDM_LoaiChungTu();
            }
        });

    };
})(jQuery);

