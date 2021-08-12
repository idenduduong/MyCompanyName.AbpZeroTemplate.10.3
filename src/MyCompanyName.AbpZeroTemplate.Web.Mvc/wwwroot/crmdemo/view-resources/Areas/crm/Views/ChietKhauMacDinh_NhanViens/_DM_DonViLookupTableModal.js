(function ($) {
    app.modals.DM_DonViLookupTableModal = function () {

        var _modalManager;

        var _chietKhauMacDinh_NhanViensService = abp.services.app.chietKhauMacDinh_NhanViens;
        var _$dM_DonViTable = $('#DM_DonViTable');

        this.init = function (modalManager) {
            _modalManager = modalManager;
        };


        var dataTable = _$dM_DonViTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _chietKhauMacDinh_NhanViensService.getAllDM_DonViForLookupTable,
                inputFilter: function () {
                    return {
                        filter: $('#DM_DonViTableFilter').val()
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

        $('#DM_DonViTable tbody').on('click', '[id*=selectbtn]', function () {
            var data = dataTable.row($(this).parents('tr')).data();
            _modalManager.setResult(data);
            _modalManager.close();
        });

        function getDM_DonVi() {
            dataTable.ajax.reload();
        }

        $('#GetDM_DonViButton').click(function (e) {
            e.preventDefault();
            getDM_DonVi();
        });

        $('#SelectButton').click(function (e) {
            e.preventDefault();
        });

        $(document).keypress(function (e) {
            if (e.which === 13) {
                getDM_DonVi();
            }
        });

    };
})(jQuery);

