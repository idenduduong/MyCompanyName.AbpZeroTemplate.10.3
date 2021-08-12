(function ($) {
    app.modals.DM_QuanHuyenLookupTableModal = function () {

        var _modalManager;

        var _customerDatasService = abp.services.app.customerDatas;
        var _$dM_QuanHuyenTable = $('#DM_QuanHuyenTable');

        this.init = function (modalManager) {
            _modalManager = modalManager;
        };


        var dataTable = _$dM_QuanHuyenTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _customerDatasService.getAllDM_QuanHuyenForLookupTable,
                inputFilter: function () {
                    return {
                        filter: $('#DM_QuanHuyenTableFilter').val()
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

        $('#DM_QuanHuyenTable tbody').on('click', '[id*=selectbtn]', function () {
            var data = dataTable.row($(this).parents('tr')).data();
            _modalManager.setResult(data);
            _modalManager.close();
        });

        function getDM_QuanHuyen() {
            dataTable.ajax.reload();
        }

        $('#GetDM_QuanHuyenButton').click(function (e) {
            e.preventDefault();
            getDM_QuanHuyen();
        });

        $('#SelectButton').click(function (e) {
            e.preventDefault();
        });

        $(document).keypress(function (e) {
            if (e.which === 13) {
                getDM_QuanHuyen();
            }
        });

    };
})(jQuery);

