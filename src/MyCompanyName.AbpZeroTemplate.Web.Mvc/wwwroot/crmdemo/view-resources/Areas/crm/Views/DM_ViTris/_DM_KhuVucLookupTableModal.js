(function ($) {
    app.modals.DM_KhuVucLookupTableModal = function () {

        var _modalManager;

        var _dM_ViTrisService = abp.services.app.dM_ViTris;
        var _$dM_KhuVucTable = $('#DM_KhuVucTable');

        this.init = function (modalManager) {
            _modalManager = modalManager;
        };


        var dataTable = _$dM_KhuVucTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _dM_ViTrisService.getAllOrganizationUnitsForLookupTable,
                inputFilter: function () {
                    return {
                        filter: $('#DM_KhuVucTableFilter').val()
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

        $('#DM_KhuVucTable tbody').on('click', '[id*=selectbtn]', function () {
            var data = dataTable.row($(this).parents('tr')).data();
            _modalManager.setResult(data);
            _modalManager.close();
        });

        function getDM_KhuVuc() {
            dataTable.ajax.reload();
        }

        $('#GetDM_KhuVucButton').click(function (e) {
            e.preventDefault();
            getDM_KhuVuc();
        });

        $('#SelectButton').click(function (e) {
            e.preventDefault();
        });

        $(document).keypress(function (e) {
            if (e.which === 13) {
                getDM_KhuVuc();
            }
        });

    };
})(jQuery);

