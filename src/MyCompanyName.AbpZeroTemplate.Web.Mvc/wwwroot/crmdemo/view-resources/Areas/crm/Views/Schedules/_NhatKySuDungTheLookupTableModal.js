(function ($) {
    app.modals.NhatKySuDungTheLookupTableModal = function () {

        var _modalManager;

        var _schedulesService = abp.services.app.schedules;
        var _$nhatKySuDungTheTable = $('#NhatKySuDungTheTable');

        this.init = function (modalManager) {
            _modalManager = modalManager;
        };


        var dataTable = _$nhatKySuDungTheTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _schedulesService.getAllNhatKySuDungTheForLookupTable,
                inputFilter: function () {
                    return {
                        filter: $('#NhatKySuDungTheTableFilter').val()
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

        $('#NhatKySuDungTheTable tbody').on('click', '[id*=selectbtn]', function () {
            var data = dataTable.row($(this).parents('tr')).data();
            _modalManager.setResult(data);
            _modalManager.close();
        });

        function getNhatKySuDungThe() {
            dataTable.ajax.reload();
        }

        $('#GetNhatKySuDungTheButton').click(function (e) {
            e.preventDefault();
            getNhatKySuDungThe();
        });

        $('#SelectButton').click(function (e) {
            e.preventDefault();
        });

        $(document).keypress(function (e) {
            if (e.which === 13) {
                getNhatKySuDungThe();
            }
        });

    };
})(jQuery);

