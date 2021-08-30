(function ($) {
    app.modals.DM_DichVuLookupTableModal = function () {

        var _modalManager;

        var _commonLookupService = abp.services.app.commonLookup;
        var _$dM_DichVuTable = $('#DM_DichVuLookupTable');

        this.init = function (modalManager) {
            _modalManager = modalManager;
        };
        var dichVuLookupTable = _$dM_DichVuTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            retrieve: true,
            listAction: {
                ajaxFunction: _commonLookupService.getAllDM_DichVuForLookupTable,
                inputFilter: function () {
                    return {
                        tenNhomDichVuFilter: $('input[name=tenNhomDichVuFilter]').val(),
                        tenDichVuFilter: $('input[name=tenDichVuFilter]').val(),
                        maDichVuFilter: $('input[name=maDichVuFilter]').val(),

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
                    data: "code"
                },
                {
                    autoWidth: false,
                    orderable: false,
                    targets: 2,
                    data: "displayName"
                },
                {
                    autoWidth: false,
                    orderable: false,
                    targets: 3,
                    data: "tenNhom"
                },
                {
                    autoWidth: false,
                    orderable: false,
                    targets: 4,
                    data: "donGia",
                    render: function (data) {
                        return '<span class="numeric-cell">' + $.number(data, 0) + '</span>';
                    }
                },
            ]
        });


        $('#DM_DichVuLookupTable tbody').on('click', '[id*=selectbtn]', function () {
            var data = dichVuLookupTable.row($(this).parents('tr')).data();
            _modalManager.setResult(data);
            _modalManager.close();
        });

        function getDM_DichVuLookupTable() {
            dichVuLookupTable.ajax.reload();
        }


        $('#GetDM_DichVuButton').click(function (e) {
            e.preventDefault();
            getDM_DichVuLookupTable();
        });

        $('#SelectButton').click(function (e) {
            e.preventDefault();
        });

        $(document).keypress(function (e) {
            if (e.which === 13) {
                getDM_DichVuLookupTable();
            }
        });

    };
})(jQuery);

