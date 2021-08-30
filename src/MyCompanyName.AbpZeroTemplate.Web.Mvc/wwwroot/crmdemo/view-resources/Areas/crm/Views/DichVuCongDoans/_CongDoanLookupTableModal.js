(function ($) {
    app.modals.CongDoanLookupTableModal = function () {

        var _modalManager;

        var _dichVuCongDoansService = abp.services.app.dichVuCongDoans;
        var _$congDoanTable = $('#CongDoanTable');

        this.init = function (modalManager) {
            _modalManager = modalManager;
        };


        var dataTable = _$congDoanTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _dichVuCongDoansService.getAllCongDoanForLookupTable,
                inputFilter: function () {
                    return {
                        filter: $('#CongDoanTableFilter').val()
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

        $('#CongDoanTable tbody').on('click', '[id*=selectbtn]', function () {
            var data = dataTable.row($(this).parents('tr')).data();
            _modalManager.setResult(data);
            _modalManager.close();
        });

        function getCongDoan() {
            dataTable.ajax.reload();
        }

        $('#GetCongDoanButton').click(function (e) {
            e.preventDefault();
            getCongDoan();
        });

        $('#SelectButton').click(function (e) {
            e.preventDefault();
        });

        $(document).keypress(function (e) {
            if (e.which === 13) {
                getCongDoan();
            }
        });

    };
})(jQuery);

