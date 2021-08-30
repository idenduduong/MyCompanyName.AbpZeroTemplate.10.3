(function ($) {
    app.modals.DM_LienHeLookupTableModal = function () {

        var _modalManager;

        var _theKhachHangsService = abp.services.app.theKhachHangs;
        var _$dM_LienHeTable = $('#DM_LienHeTable');

        this.init = function (modalManager) {
            _modalManager = modalManager;
        };


        var dataTable = _$dM_LienHeTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _theKhachHangsService.getAllDM_LienHeForLookupTable,
                inputFilter: function () {
                    return {
                        filter: $('#DM_LienHeTableFilter').val()
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
                },
                {
                    autoWidth: false,
                    orderable: false,
                    targets: 2,
                    data: "phone"
                },
                {
                    autoWidth: false,
                    orderable: false,
                    targets: 3,
                    data: "email"
                }
            ]
        });

        $('#DM_LienHeTable tbody').on('click', '[id*=selectbtn]', function () {
            var data = dataTable.row($(this).parents('tr')).data();
            _modalManager.setResult(data);
            _modalManager.close();
        });

        function getDM_LienHe() {
            dataTable.ajax.reload();
        }

        $('#GetDM_LienHeButton').click(function (e) {
            e.preventDefault();
            getDM_LienHe();
        });

        $('#SelectButton').click(function (e) {
            e.preventDefault();
        });

        $(document).keypress(function (e) {
            if (e.which === 13) {
                getDM_LienHe();
            }
        });

    };
})(jQuery);

