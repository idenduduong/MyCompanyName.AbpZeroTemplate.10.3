(function ($) {
    app.modals.DM_DoiTuongLookupTableModal = function () {

        var _modalManager;

        var _hoaDonBanLesService = abp.services.app.hoaDonBanLes;
        var _$dM_DoiTuongTable = $('#DM_DoiTuongTable');

        this.init = function (modalManager) {
            _modalManager = modalManager;
        };

        this.shown = function (modalManager) {
            modalManager.find('#DM_DoiTuongTable').DataTable().columns.adjust()
                .responsive.recalc();
        };

        var dataTable = _$dM_DoiTuongTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _hoaDonBanLesService.getAllDM_DoiTuongForLookupTable,
                inputFilter: function () {
                    return {
                        filter: $('#DM_DoiTuongTableFilter').val()
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
                    data: "group"
                },
                {
                    autoWidth: false,
                    orderable: false,
                    targets: 4,
                    data: "phone"
                },
                {
                    autoWidth: false,
                    orderable: false,
                    targets: 5,
                    data: "address"
                },
                {
                    autoWidth: false,
                    orderable: false,
                    targets: 6,
                    data: "dateOfBirth"
                },
                {
                    autoWidth: false,
                    orderable: false,
                    targets: 7,
                    data: "exchangeNumber"
                },
            ]
        });

        $('#DM_DoiTuongTable tbody').on('click', '[id*=selectbtn]', function () {
            var data = dataTable.row($(this).parents('tr')).data();
            _modalManager.setResult(data);
            _modalManager.close();
        });

        function getDM_DoiTuong() {
            dataTable.ajax.reload();
        }

        $('#GetDM_DoiTuongButton').click(function (e) {
            e.preventDefault();
            getDM_DoiTuong();
        });

        $('#SelectButton').click(function (e) {
            e.preventDefault();
        });

        $(document).keypress(function (e) {
            if (e.which === 13) {
                getDM_DoiTuong();
            }
        });

    };
})(jQuery);

