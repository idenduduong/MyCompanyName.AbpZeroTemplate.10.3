(function ($) {
    app.modals.TheHuyLookupTableModal = function () {
        
        var _modalManager;
        
        var _theKhachHangsService = abp.services.app.theKhachHangs;
        var _$theHuyTable = $('#TheHuyTable');
        this.init = function (modalManager) {
            _modalManager = modalManager;
        };


        var dataTable = _$theHuyTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _theKhachHangsService.getAllTheKhachHangForLookupTable,
                inputFilter: function () {
                    return {
                        filter: $('#TheHuyTableFilter').val()
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
                    data: "maThe"
                },
                {
                    autoWidth: false,
                    orderable: false,
                    targets: 2,
                    data: "maKhachHang"
                },
                {
                    autoWidth: false,
                    orderable: false,
                    targets: 3,
                    data: "soDu",
                    render: function (data) {
                        return $.number(data, 0);
                    }
                }
            ]
        });

        $('#TheHuyTable tbody').on('click', '[id*=selectbtn]', function () {
            var data = dataTable.row($(this).parents('tr')).data();
            _modalManager.setResult(data);
            _modalManager.close();
        });

        function getTheHuy() {
            dataTable.ajax.reload();
        }

        $('#GetTheHuyButton').click(function (e) {
            e.preventDefault();
            getTheHuy();
        });

        $('#SelectButton').click(function (e) {
            e.preventDefault();
        });

        $(document).keypress(function (e) {
            if (e.which === 13) {
                getTheHuy();
            }
        });

    };
})(jQuery);

