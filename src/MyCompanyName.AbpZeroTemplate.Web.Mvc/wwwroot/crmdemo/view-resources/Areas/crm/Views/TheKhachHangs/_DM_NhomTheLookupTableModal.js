(function ($) {
    app.modals.DM_NhomTheLookupTableModal = function () {

        var _modalManager;

        var _theKhachHangsService = abp.services.app.theKhachHangs;
        var _$dM_NhomTheTable = $('#DM_NhomTheTable');

        this.init = function (modalManager) {
            _modalManager = modalManager;
        };


        var dataTable = _$dM_NhomTheTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _theKhachHangsService.getAllDM_NhomTheForLookupTable,
                inputFilter: function () {
                    return {
                        filter: $('#DM_NhomTheTableFilter').val()
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

        $('#DM_NhomTheTable tbody').on('click', '[id*=selectbtn]', function () {
            var data = dataTable.row($(this).parents('tr')).data();
            _modalManager.setResult(data);
            _modalManager.close();
        });

        function getDM_NhomThe() {
            dataTable.ajax.reload();
        }

        $('#GetDM_NhomTheButton').click(function (e) {
            e.preventDefault();
            getDM_NhomThe();
        });

        $('#SelectButton').click(function (e) {
            e.preventDefault();
        });

        $(document).keypress(function (e) {
            if (e.which === 13) {
                getDM_NhomThe();
            }
        });

    };
})(jQuery);

