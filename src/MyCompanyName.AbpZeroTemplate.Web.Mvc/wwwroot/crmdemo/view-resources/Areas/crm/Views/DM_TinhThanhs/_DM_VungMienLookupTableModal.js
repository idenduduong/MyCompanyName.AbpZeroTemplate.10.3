(function ($) {
    app.modals.DM_VungMienLookupTableModal = function () {

        var _modalManager;

        var _dM_TinhThanhsService = abp.services.app.dM_TinhThanhs;
        var _$dM_VungMienTable = $('#DM_VungMienTable');

        this.init = function (modalManager) {
            _modalManager = modalManager;
        };


        var dataTable = _$dM_VungMienTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _dM_TinhThanhsService.getAllDM_VungMienForLookupTable,
                inputFilter: function () {
                    return {
                        filter: $('#DM_VungMienTableFilter').val()
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

        $('#DM_VungMienTable tbody').on('click', '[id*=selectbtn]', function () {
            var data = dataTable.row($(this).parents('tr')).data();
            _modalManager.setResult(data);
            _modalManager.close();
        });

        function getDM_VungMien() {
            dataTable.ajax.reload();
        }

        $('#GetDM_VungMienButton').click(function (e) {
            e.preventDefault();
            getDM_VungMien();
        });

        $('#SelectButton').click(function (e) {
            e.preventDefault();
        });

        $(document).keypress(function (e) {
            if (e.which === 13) {
                getDM_VungMien();
            }
        });

    };
})(jQuery);

