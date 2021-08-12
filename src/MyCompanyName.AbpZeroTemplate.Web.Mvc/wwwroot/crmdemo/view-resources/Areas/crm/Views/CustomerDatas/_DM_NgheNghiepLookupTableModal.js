(function ($) {
    app.modals.DM_NgheNghiepLookupTableModal = function () {

        var _modalManager;

        var _customerDatasService = abp.services.app.customerDatas;
        var _$dM_NgheNghiepTable = $('#DM_NgheNghiepTable');

        this.init = function (modalManager) {
            _modalManager = modalManager;
        };


        var dataTable = _$dM_NgheNghiepTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _customerDatasService.getAllDM_NgheNghiepForLookupTable,
                inputFilter: function () {
                    return {
                        filter: $('#DM_NgheNghiepTableFilter').val()
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

        $('#DM_NgheNghiepTable tbody').on('click', '[id*=selectbtn]', function () {
            var data = dataTable.row($(this).parents('tr')).data();
            _modalManager.setResult(data);
            _modalManager.close();
        });

        function getDM_NgheNghiep() {
            dataTable.ajax.reload();
        }

        $('#GetDM_NgheNghiepButton').click(function (e) {
            e.preventDefault();
            getDM_NgheNghiep();
        });

        $('#SelectButton').click(function (e) {
            e.preventDefault();
        });

        $(document).keypress(function (e) {
            if (e.which === 13) {
                getDM_NgheNghiep();
            }
        });

    };
})(jQuery);

