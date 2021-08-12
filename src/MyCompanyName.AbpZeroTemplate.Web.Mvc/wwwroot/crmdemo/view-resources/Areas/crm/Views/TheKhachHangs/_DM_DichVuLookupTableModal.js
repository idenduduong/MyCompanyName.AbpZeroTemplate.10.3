(function ($) {
    app.modals.DM_DichVuLookupTableModal = function () {

        var _modalManager;

        var _theKhachHangsService = abp.services.app.theKhachHangs;
        var _$dM_DichVuTable = $('#DM_DichVuTable');

        this.init = function (modalManager) {
            _modalManager = modalManager;
        };


        var dataTable = _$dM_DichVuTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _theKhachHangsService.getAllDM_DichVuForLookupTable,
                inputFilter: function () {
                    return {
                        filter: $('#DM_DichVuTableFilter').val()
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
                    data: "donGia",
                    render: function (data) {
                        return '<span class="numeric-cell">' + $.number(data, 0) + '</span>'; 
                    }
                },
            ]
        });

        $('#DM_DichVuTable tbody').on('click', '[id*=selectbtn]', function () {
            var data = dataTable.row($(this).parents('tr')).data();
            _modalManager.setResult(data);
            _modalManager.close();
        });

        function getDM_DichVu() {
            dataTable.ajax.reload();
        }

        $('#GetDM_DichVuButton').click(function (e) {
            e.preventDefault();
            getDM_DichVu();
        });

        $('#SelectButton').click(function (e) {
            e.preventDefault();
        });

        $(document).keypress(function (e) {
            if (e.which === 13) {
                getDM_DichVu();
            }
        });

    };
})(jQuery);

