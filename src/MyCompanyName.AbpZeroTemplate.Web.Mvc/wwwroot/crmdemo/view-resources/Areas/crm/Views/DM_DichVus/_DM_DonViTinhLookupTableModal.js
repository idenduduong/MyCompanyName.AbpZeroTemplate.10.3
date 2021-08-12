(function ($) {
    app.modals.DM_DonViTinhLookupTableModal = function () {

        var _modalManager;

        var _dM_HangHoasService = abp.services.app.dM_HangHoas;
        var _$dM_DonViTinhTable = $('#DM_DonViTinhTable');

        this.init = function (modalManager) {
            _modalManager = modalManager;
        };


        var dataTable = _$dM_DonViTinhTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _dM_HangHoasService.getAllDM_DonViTinhForLookupTable,
                inputFilter: function () {
                    return {
                        filter: $('#DM_DonViTinhTableFilter').val()
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

        $('#DM_DonViTinhTable tbody').on('click', '[id*=selectbtn]', function () {
            var data = dataTable.row($(this).parents('tr')).data();
            _modalManager.setResult(data);
            _modalManager.close();
        });

        function getDM_DonViTinh() {
            dataTable.ajax.reload();
        }

        $('#GetDM_DonViTinhButton').click(function (e) {
            e.preventDefault();
            getDM_DonViTinh();
        });

        $('#SelectButton').click(function (e) {
            e.preventDefault();
        });

        $(document).keypress(function (e) {
            if (e.which === 13) {
                getDM_DonViTinh();
            }
        });

    };
})(jQuery);

