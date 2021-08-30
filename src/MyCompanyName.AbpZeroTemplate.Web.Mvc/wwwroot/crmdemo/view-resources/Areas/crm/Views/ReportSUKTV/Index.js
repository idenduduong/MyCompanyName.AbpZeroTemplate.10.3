(function () {
    $(function () {

        var $_reportSUKTVTable = $('#ReportSUKTVTable');

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

            var fromDate = $('#ReportSUKTV_TuNgay').val();
            var toDate = $('#ReportSUKTV_DenNgay').val();
            var donViBanId = $('#SaleOrgSelectionCombo').val();
            
            var obj = { fromDate: fromDate, toDate: toDate, donViBanId: donViBanId };
            abp.ui.setBusy($container);
            abp.services.app.reportSUKTV.exportReportSUKTV(obj).done(function (result) {
                
                app.downloadTempFile(result);
            }).always(function () {
                abp.ui.clearBusy($container);
            });
        });

        $('#RefreshSelectedDateRangeButton').click(function () {

            $('#ReportSUKTV_TuNgay').val("");
            $('#ReportSUKTV_DenNgay').val("");
        });

        var dataTable = $_reportSUKTVTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: abp.services.app.reportSUKTV.getAllReportSUKTV,
                inputFilter: function () {
                    return {
                        fromDate : $('#ReportSUKTV_TuNgay').val(),
                        toDate : $('#ReportSUKTV_DenNgay').val(),
                        donViBanId : $('#SaleOrgSelectionCombo').val(),
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
                    data: "sellingOrganizationName"
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
                    data: "performerName"
                },
                {
                    targets: 10,
                    data: "performerCode"
                },
                {
                    targets: 11,
                    data: "performedTime"
                },
                {
                    targets: 12,
                    data: "feedback"
                },
                {
                    targets: 13,
                    data: "salaryByMinute"
                },
                {
                    targets: 14,
                    data: "note"
                }
            ]
        });

        $('#GetReportSuKtvButton').click(function (e) {
          
            getReportSuKtv();
        });

        function getReportSuKtv() {
            dataTable.ajax.reload();
        }
    });
})();