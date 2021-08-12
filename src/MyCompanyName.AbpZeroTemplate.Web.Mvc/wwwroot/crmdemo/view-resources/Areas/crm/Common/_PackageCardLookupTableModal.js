(function ($) {
    app.modals.PackageCardLookupTableModal = function () {

        var _modalManager;

        var _commonLookupService = abp.services.app.commonLookup;
        var _$packageCardTable = $('#PackageCardLookupTable');

        this.init = function (modalManager) {
            _modalManager = modalManager;
        };
        var packageLookupTable = _$packageCardTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            retrieve: true,
            listAction: {
                ajaxFunction: _commonLookupService.getAllPackageForLookupTable,
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
                {
                    autoWidth: false,
                    orderable: false,
                    targets: 5,
                    data: "package"
                },
                {
                    autoWidth: false,
                    orderable: false,
                    targets: 6,
                    data: "packageRemainingQuantity"
                },
            ]
        });


        $('#PackageCardLookupTable tbody').on('click', '[id*=selectbtn]', function () {
            var data = packageLookupTable.row($(this).parents('tr')).data();
            _modalManager.setResult(data);
            _modalManager.close();
        });

        function getPackageLookupTable() {
            packageLookupTable.ajax.reload();
        }


        $('#GetPackageButton').click(function (e) {
            e.preventDefault();
            getPackageLookupTable();
        });

        $('#SelectButton').click(function (e) {
            e.preventDefault();
        });

        $(document).keypress(function (e) {
            if (e.which === 13) {
                getPackageLookupTable();
            }
        });

    };
})(jQuery);

