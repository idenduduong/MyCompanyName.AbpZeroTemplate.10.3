(function ($) {
    app.modals.PosLookupTableModal = function () {

        var _modalManager;
        var _service = abp.services.app.tools;
        var _$Table = $('#Table');

        this.init = function (modalManager) {
            _modalManager = modalManager;
        };

        var dataTable = _$Table.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _service.getAllPosForLookupTable,
                inputFilter: function () {
                    return {
                        filter: $('#Filter').val()
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
                    data: "id"
                },
                {
                    autoWidth: false,
                    orderable: false,
                    targets: 2,
                    data: "displayName"
                }
            ]
        });

        $('#Table tbody').on('click', '[id*=selectbtn]', function () {
            var data = dataTable.row($(this).parents('tr')).data();
            _modalManager.setResult(data);
            _modalManager.close();
        });

        function getDM_TinhThanh() {
            dataTable.ajax.reload();
        }

        $('#GetButton').click(function (e) {
            e.preventDefault();
            getDM_TinhThanh();
        });

        $('#SelectButton').click(function (e) {
            e.preventDefault();
        });

        $(document).keypress(function (e) {
            if (e.which === 13) {
                getDM_TinhThanh();
            }
        });

    };
})(jQuery);

