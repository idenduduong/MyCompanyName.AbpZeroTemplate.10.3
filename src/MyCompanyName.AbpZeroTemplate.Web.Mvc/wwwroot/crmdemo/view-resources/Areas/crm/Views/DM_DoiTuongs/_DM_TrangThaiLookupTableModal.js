(function ($) {
    app.modals.DM_TrangThaiLookupTableModal = function () {

        var _modalManager;

        var _dM_DoiTuongsService = abp.services.app.dM_DoiTuongs;
        var _$dM_TrangThaiTable = $('#DM_TrangThaiTable');

        this.init = function (modalManager) {
            _modalManager = modalManager;
        };


        var dataTable = _$dM_TrangThaiTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _dM_DoiTuongsService.getAllDM_TrangThaiForLookupTable,
                inputFilter: function () {
                    return {
                        filter: $('#DM_TrangThaiTableFilter').val()
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

        $('#DM_TrangThaiTable tbody').on('click', '[id*=selectbtn]', function () {
            var data = dataTable.row($(this).parents('tr')).data();
            _modalManager.setResult(data);
            _modalManager.close();
        });

        function getDM_TrangThai() {
            dataTable.ajax.reload();
        }

        $('#GetDM_TrangThaiButton').click(function (e) {
            e.preventDefault();
            getDM_TrangThai();
        });

        $('#SelectButton').click(function (e) {
            e.preventDefault();
        });

        $(document).keypress(function (e) {
            if (e.which === 13) {
                getDM_TrangThai();
            }
        });

    };
})(jQuery);

