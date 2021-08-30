(function ($) {
    app.modals.PhieuThuLookupTableModal = function () {

        var _modalManager;

        var _phieuThuChiTietsService = abp.services.app.phieuThuChiTiets;
        var _$phieuThuTable = $('#PhieuThuTable');

        this.init = function (modalManager) {
            _modalManager = modalManager;
        };


        var dataTable = _$phieuThuTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _phieuThuChiTietsService.getAllPhieuThuForLookupTable,
                inputFilter: function () {
                    return {
                        filter: $('#PhieuThuTableFilter').val()
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

        $('#PhieuThuTable tbody').on('click', '[id*=selectbtn]', function () {
            var data = dataTable.row($(this).parents('tr')).data();
            _modalManager.setResult(data);
            _modalManager.close();
        });

        function getPhieuThu() {
            dataTable.ajax.reload();
        }

        $('#GetPhieuThuButton').click(function (e) {
            e.preventDefault();
            getPhieuThu();
        });

        $('#SelectButton').click(function (e) {
            e.preventDefault();
        });

        $(document).keypress(function (e) {
            if (e.which === 13) {
                getPhieuThu();
            }
        });

    };
})(jQuery);

