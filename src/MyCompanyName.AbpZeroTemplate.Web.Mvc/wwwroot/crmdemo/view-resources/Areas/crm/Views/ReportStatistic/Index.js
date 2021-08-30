(function () {
    $(function () {

        var $_reportStatisticTable = $('#ReportStatisticTable');

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
            //Ngay ban the 
            var fromDate = $('#ReportStatistic_TuNgay').val();
            var toDate = $('#ReportStatistic_DenNgay').val();
            //Don vi ban
            var donViBanId = $('#SaleOrgSelectionCombo').val();
            //Huy chuyen doi
            var huyChuyenDoi = $('#ReportStatistic_HuyChuyenDoi').is(':checked')
            //Huy khong mua
            var huyKhongMua = $('#ReportStatistic_HuyKhongMua').is(':checked')
            //Khach hang moi
            var khachHangMoi = $('#ReportStatistic_KhachHangMoi').is(':checked')
            //Khach hang chia sale
            var khachHangChiaSale = $('#ReportStatistic_ChiaSale').is(':checked')
            
            var obj = {
                fromDate: fromDate, toDate: toDate, donViBanId: donViBanId, huyChuyenDoi: huyChuyenDoi,
                huyKhongMua: huyKhongMua, khachHangMoi: khachHangMoi, khachHangChiaSale: khachHangChiaSale
            };
            abp.ui.setBusy($container);
            abp.services.app.packageStatisticReports.export(obj).done(function (result) {

                app.downloadTempFile(result);
            }).always(function () {
                abp.ui.clearBusy($container);
            });

        });



        $('#RefreshSelectedDateRangeButton').click(function () {

            $('#ReportStatistic_TuNgay').val("");
            $('#ReportStatistic_DenNgay').val("");
            $('#SaleOrgSelectionCombo').val("0");
            $('input[name=isTranfered]').prop('checked', false);
            $('input[name=isCancel]').prop('checked', false);
            $('input[name=isNewCustomer]').prop('checked', false);
            $('input[name=isSharingSale]').prop('checked', false);

        });

        var dataTable = $_reportStatisticTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: abp.services.app.packageStatisticReports.getAllReportThongKe,
                inputFilter: function () {
                    return {
                        fromDate: $('#ReportStatistic_TuNgay').val(),
                        toDate: $('#ReportStatistic_DenNgay').val(),
                        donViBanId: $('#SaleOrgSelectionCombo').val(),
                        huyChuyenDoi: $('#ReportStatistic_HuyChuyenDoi').is(':checked'),
                        huyKhongMua: $('#ReportStatistic_HuyKhongMua').is(':checked'),
                        khachHangMoi: $('#ReportStatistic_KhachHangMoi').is(':checked'),
                        khachHangChiaSale: $('#ReportStatistic_ChiaSale').is(':checked')
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
                    data: "customerManagementOrganizationName"
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
                    data: "customerGender",
                    render: function (gioiTinh) {
                        if (gioiTinh) {
                            return app.localize("Nam");
                        }
                        return app.localize("Nu");
                    }
                },
                {
                    targets: 6,
                    data: "customerAddress"
                },
                {
                    targets: 7,
                    data: "customerPhone"
                },
                {
                    targets: 8,
                    data: "customerIdentifyNumber"
                },
                {
                    targets: 9,
                    data: "cardType"
                },
                {
                    targets: 10,
                    data: "realRevenue",
                    render: function (data) {
                        return '<span class="numeric-cell">' + $.number(data, 0) + '</span>';
                    }

                },
            ]
        });

        $('#GetReportStatisticButton').click(function (e) {

            getReportStatistic();
        });


        function getReportStatistic() {
            dataTable.ajax.reload();
        }

    });
})();

