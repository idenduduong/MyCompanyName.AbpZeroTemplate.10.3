(function ($) {
    app.modals.ValueCardLookupTableModal = function () {

        var _modalManager;

        var _commonLookupService = abp.services.app.commonLookup;
        var _$packageCardTable = $('#ValueCardLookupTable');

        this.init = function (modalManager) {
            _modalManager = modalManager;
        };
        var valueCardLookupTable = _$valueCardTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            retrieve: true,
            listAction: {
                ajaxFunction: _commonLookupService.getAllValueCardForLookupTable,
                inputFilter: function () {
                    return {
                        cardCodeFilter: $('input[name=cardCodeFilter]').val(),
                        customerNameFilter: $('input[name=customerNameFilter]').val(),
                        customerPhoneFilter: $('input[name=customerPhoneFilter]').val(),

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
                    data: "cardCode"
                },
                {
                    autoWidth: false,
                    orderable: false,
                    targets: 2,
                    data: "customerName"
                },
                {
                    autoWidth: false,
                    orderable: false,
                    targets: 3,
                    data: "customerPhone"
                },
                {
                    autoWidth: false,
                    orderable: false,
                    targets: 4,
                    data: "cardBalance",
                    render: function (data) {
                        return '<span class="numeric-cell">' + $.number(data, 0) + '</span>';
                    }
                },
            ]
        });


        $('#ValueCardLookupTable tbody').on('click', '[id*=selectbtn]', function () {
            var data = valueCardLookupTable.row($(this).parents('tr')).data();
            _modalManager.setResult(data);
            _modalManager.close();
        });

        function getValueCardLookupTable() {
            valueCardLookupTable.ajax.reload();
        }


        $('#GetPackageButton').click(function (e) {
            e.preventDefault();
            getValueCardLookupTable();
        });

        $('#SelectButton').click(function (e) {
            e.preventDefault();
        });

        $(document).keypress(function (e) {
            if (e.which === 13) {
                getValueCardLookupTable();
            }
        });

    };
})(jQuery);

