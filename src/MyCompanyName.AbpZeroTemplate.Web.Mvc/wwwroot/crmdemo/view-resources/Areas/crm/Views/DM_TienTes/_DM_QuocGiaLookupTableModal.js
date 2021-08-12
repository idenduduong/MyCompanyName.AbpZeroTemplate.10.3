(function ($) {
    app.modals.DM_QuocGiaLookupTableModal = function () {

        var _modalManager;

        var _dM_TienTesService = abp.services.app.dM_TienTes;
        var _$dM_QuocGiaTable = $('#DM_QuocGiaTable');

        this.init = function (modalManager) {
            _modalManager = modalManager;
        };


        var dataTable = _$dM_QuocGiaTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _dM_TienTesService.getAllDM_QuocGiaForLookupTable,
                inputFilter: function () {
                    return {
                        filter: $('#DM_QuocGiaTableFilter').val()
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

        $('#DM_QuocGiaTable tbody').on('click', '[id*=selectbtn]', function () {
            var data = dataTable.row($(this).parents('tr')).data();
            _modalManager.setResult(data);
            _modalManager.close();
        });

        function getDM_QuocGia() {
            dataTable.ajax.reload();
        }

        $('#GetDM_QuocGiaButton').click(function (e) {
            e.preventDefault();
            getDM_QuocGia();
        });

        $('#SelectButton').click(function (e) {
            e.preventDefault();
        });

        $(document).keypress(function (e) {
            if (e.which === 13) {
                getDM_QuocGia();
            }
        });

    };
})(jQuery);

