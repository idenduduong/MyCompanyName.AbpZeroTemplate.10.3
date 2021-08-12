(function ($) {
    app.modals.DM_LoaiPhongLookupTableModal = function () {

        var _modalManager;

        var _dM_ViTrisService = abp.services.app.dM_ViTris;
        var _$dM_LoaiPhongTable = $('#DM_LoaiPhongTable');

        this.init = function (modalManager) {
            _modalManager = modalManager;
        };


        var dataTable = _$dM_LoaiPhongTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _dM_ViTrisService.getAllDM_LoaiPhongForLookupTable,
                inputFilter: function () {
                    return {
                        filter: $('#DM_LoaiPhongTableFilter').val()
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

        $('#DM_LoaiPhongTable tbody').on('click', '[id*=selectbtn]', function () {
            var data = dataTable.row($(this).parents('tr')).data();
            _modalManager.setResult(data);
            _modalManager.close();
        });

        function getDM_LoaiPhong() {
            dataTable.ajax.reload();
        }

        $('#GetDM_LoaiPhongButton').click(function (e) {
            e.preventDefault();
            getDM_LoaiPhong();
        });

        $('#SelectButton').click(function (e) {
            e.preventDefault();
        });

        $(document).keypress(function (e) {
            if (e.which === 13) {
                getDM_LoaiPhong();
            }
        });

    };
})(jQuery);

