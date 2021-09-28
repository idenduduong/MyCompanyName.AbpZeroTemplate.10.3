(function ($) {
    app.modals.UnitLookupTableModal = function () {

        var _modalManager;

        var _dM_QuanHuyensService = abp.services.app.buuCucs;
        var _$dM_TinhThanhTable = $('#DM_TinhThanhTable');

        this.init = function (modalManager) {
            _modalManager = modalManager;
        };

        var dataTable = _$dM_TinhThanhTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _dM_QuanHuyensService.getAllUnitForLookupTable,
                inputFilter: function () {
                    return {
                        filter: $('#DM_TinhThanhTableFilter').val()
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

        $('#DM_TinhThanhTable tbody').on('click', '[id*=selectbtn]', function () {
            var data = dataTable.row($(this).parents('tr')).data();
            _modalManager.setResult(data);
            _modalManager.close();
        });

        function getDM_TinhThanh() {
            dataTable.ajax.reload();
        }

        $('#GetDM_TinhThanhButton').click(function (e) {
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

