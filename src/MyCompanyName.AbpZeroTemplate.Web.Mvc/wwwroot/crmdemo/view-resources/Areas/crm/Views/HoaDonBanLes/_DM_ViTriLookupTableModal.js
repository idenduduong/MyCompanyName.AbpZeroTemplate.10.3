(function ($) {
    app.modals.DM_ViTriLookupTableModal = function () {
        
        var _modalManager;

        var _hoaDonBanLesService = abp.services.app.hoaDonBanLes;
        var _$dM_ViTriTable = $('#DM_ViTriTable');

        this.init = function (modalManager) {
            _modalManager = modalManager;
        };


        var dataTable = _$dM_ViTriTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _hoaDonBanLesService.getAllDM_ViTriForLookupTable,
                inputFilter: function () {
                    return {
                        filter: $('#DM_ViTriTableFilter').val()
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

        $('#DM_ViTriTable tbody').on('click', '[id*=selectbtn]', function () {
            var data = dataTable.row($(this).parents('tr')).data();
            _modalManager.setResult(data);
            _modalManager.close();
        });

        function getDM_ViTri() {
            dataTable.ajax.reload();
        }

        $('#GetDM_ViTriButton').click(function (e) {
            e.preventDefault();
            getDM_ViTri();
        });

        $('#SelectButton').click(function (e) {
            e.preventDefault();
        });

        $(document).keypress(function (e) {
            if (e.which === 13) {
                getDM_ViTri();
            }
        });

    };
})(jQuery);

