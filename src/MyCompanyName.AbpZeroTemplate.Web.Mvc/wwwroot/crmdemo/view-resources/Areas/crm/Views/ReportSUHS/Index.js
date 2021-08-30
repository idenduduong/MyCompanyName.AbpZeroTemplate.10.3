(function () {
    $(function () {

        var $_reportSUHSTable = $('#ReportSUHSTable');

        $container = $('#container');
        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });
        $('.date-picker').each(function () {
            if ($(this).val() == "01/01/0001") {
                $(this).data("DateTimePicker").date(new Date());
            }
        });

        $('#ExportButton').click(function () {

            var fromDate = $('#ReportSUHS_TuNgay').val();
            var toDate = $('#ReportSUHS_DenNgay').val();
            var donViBanId = $('#RoleSelectionCombo').val();
            
            var obj = { fromDate: fromDate, toDate: toDate, donViBanId: donViBanId };
            abp.ui.setBusy($container);
            abp.services.app.reportSUHS.exportReportSUHS(obj).done(function (result) {

                app.downloadTempFile(result);
            }).always(function () {
                abp.ui.clearBusy($container);
            });;
        });
        $('#ExportSaleReportButton').click(function () {

            var fromDate = $('#ReportSUHS_TuNgay').val();
            var toDate = $('#ReportSUHS_DenNgay').val();
            var donViBanId = $('#RoleSelectionCombo').val();
            
            var obj = { fromDate: fromDate, toDate: toDate, donViBanId: donViBanId };
            abp.ui.setBusy($container);
            abp.services.app.reportSUHS.exportSaleReport(obj).done(function (result) {

                app.downloadTempFile(result);
            }).always(function () {
                abp.ui.clearBusy($container);
            });;
        });

        $('#RefreshSelectedDateRangeButton').click(function () {

            $('#ReportSUHS_TuNgay').val("");
            $('#ReportSUHS_DenNgay').val("");
        });

        var dataTable = $_reportSUHSTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: abp.services.app.reportSUHS.getAllReportSUHS,
                inputFilter: function () {
                    return {
                        fromDate : $('#ReportSUHS_TuNgay').val(),
                        toDate : $('#ReportSUHS_DenNgay').val(),
                        donViBanId : $('#RoleSelectionCombo').val(),
                    };
                }
            },
            columnDefs: [
                {
                    targets: 0,
                    data: "date",
                    render: function (date) {
                        if (date) {
                            return moment(date).format('L');
                        }
                        return "";
                    }
                },
                {
                    targets: 1,
                    data: "customerManagementOrganizationName"
                },
                {
                    targets: 2,
                    data: "performedOrganizationName"
                },
                {
                    targets: 3,
                    data: "customerCode"
                },
                {
                    targets: 4,
                    data: "customerName"
                },
                {
                    targets: 5,
                    data: "customerPhone"
                },
                {
                    targets: 6,
                    data: "customerCarePackage"
                },
                {
                    targets: 7,
                    data: "serviceGroup"
                },
                {
                    targets: 8,
                    data: "serviceName"
                },
                {
                    targets: 9,
                    data: "sellerName"
                },
                {
                    targets: 10,
                    data: "sellerCode"
                },
                {
                    targets: 11,
                    data: "checkIn"
                },
                {
                    targets: 12,
                    data: "checkOut"
                },
                {
                    targets: 13,
                    data: "room"
                },
                {
                    targets: 14,
                    data: "note"
                }
            ]
        });

        $('#GetReportSuHsButton').click(function (e) {

            getReportSuHs();
        });

        function getReportSuHs() {
            dataTable.ajax.reload();
        }

    });
})();