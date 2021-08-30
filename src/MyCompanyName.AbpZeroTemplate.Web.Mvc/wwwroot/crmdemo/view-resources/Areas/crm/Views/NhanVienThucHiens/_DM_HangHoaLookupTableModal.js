(function ($) {
    app.modals.DM_HangHoaLookupTableModal = function () {

        var _modalManager;

        var _nhanVienThucHiensService = abp.services.app.nhanVienThucHiens;
        var _$dM_HangHoaTable = $('#DM_HangHoaTable');

        this.init = function (modalManager) {
            _modalManager = modalManager;
        };


        var dataTable = _$dM_HangHoaTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _nhanVienThucHiensService.getAllDM_HangHoaForLookupTable,
                inputFilter: function () {
                    return {
                        filter: $('#DM_HangHoaTableFilter').val()
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

        $('#DM_HangHoaTable tbody').on('click', '[id*=selectbtn]', function () {
            var data = dataTable.row($(this).parents('tr')).data();
            _modalManager.setResult(data);
            _modalManager.close();
        });

        function getDM_HangHoa() {
            dataTable.ajax.reload();
        }

        $('#GetDM_HangHoaButton').click(function (e) {
            e.preventDefault();
            getDM_HangHoa();
        });

        $('#SelectButton').click(function (e) {
            e.preventDefault();
        });

        $(document).keypress(function (e) {
            if (e.which === 13) {
                getDM_HangHoa();
            }
        });

    };
})(jQuery);

