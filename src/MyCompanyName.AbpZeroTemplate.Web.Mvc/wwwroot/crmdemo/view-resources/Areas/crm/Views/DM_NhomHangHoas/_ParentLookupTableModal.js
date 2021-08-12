(function ($) {
    app.modals.ParentLookupTableModal = function () {

        var _modalManager;

        var _dM_NhomHangHoasService = abp.services.app.dM_NhomHangHoas;
        var _$NhomHangHoaTable = $('#DM_NhomHangHoaTable');

        this.init = function (modalManager) {
            _modalManager = modalManager;
        };


        var dataTable = _$NhomHangHoaTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _dM_NhomHangHoasService.getAllDM_NhomHangHoaForLookupTable,
                inputFilter: function () {
                    return {
                        filter: $('#DM_NhomHangHoaTableFilter').val()
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

        $('#DM_NhomHangHoaTable tbody').on('click', '[id*=selectbtn]', function () {
            var data = dataTable.row($(this).parents('tr')).data();
            _modalManager.setResult(data);
            _modalManager.close();
        });

        function getDM_NhomHangHoa() {
            dataTable.ajax.reload();
        }

        $('#GetDM_NhomHangHoaButton').click(function (e) {
            e.preventDefault();
            getDM_NhomHangHoa();
        });

        $('#SelectButton').click(function (e) {
            e.preventDefault();
        });

        $(document).keypress(function (e) {
            if (e.which === 13) {
                getDM_NhomHangHoa();
            }
        });

    };
})(jQuery);

