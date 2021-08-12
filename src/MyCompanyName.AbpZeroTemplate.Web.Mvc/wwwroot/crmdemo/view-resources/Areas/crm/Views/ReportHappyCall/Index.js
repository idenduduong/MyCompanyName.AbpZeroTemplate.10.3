(function () {
    $(function () {
        var $_reportKSHappyCallTable = $('#ReportKSHappyCallTable');
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

            //var fromDate = $('#ReportHappyCall_TuNgay').val();
            //var todate = $('#ReportHappyCall_DenNgay').val();
            var obj = {
                fromDate: $('#ReportHappyCall_TuNgay').val(),
                toDate: $('#ReportHappyCall_DenNgay').val()
            }
            abp.ui.setBusy($container);
            abp.services.app.reportKSHappyCall.exportReportKSHappyCall(obj).done(function (result) {
                app.downloadTempFile(result);
            }).always(function () {
                abp.ui.clearBusy($container);
            });
        });

        $('#RefreshSelectedDateRangeButton').click(function () {

            $('#ReportHappyCall_TuNgay').val("");
            $('#ReportHappyCall_DenNgay').val("");
        });

        var dataTable = $_reportKSHappyCallTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: abp.services.app.reportKSHappyCall.getAllReportKSHappyCall,
                inputFilter: function () {
                    return {
                        fromDate: $('#ReportHappyCall_TuNgay').val(),
                        toDate: $('#ReportHappyCall_DenNgay').val()
                    };
                }
            },
            columnDefs: [
                {
                    targets: 0,
                    data: "tenKhachHang"
                },
                {
                    targets: 1,
                    data: "profile"
                },
                {
                    targets: 2,
                    data: "phone"
                },
                {
                    targets: 3,
                    data: "ngaySinh"
                },
                {
                    targets: 4,
                    data: "tenDichVu"
                },
                {
                    targets: 5,
                    data: "khachHang"
                },
                {
                    targets: 6,
                    data: "ktv"
                },
                {
                    targets: 7,
                    data: "sale"
                },
                {
                    targets: 8,
                    data: "cskh"
                },
                {
                    targets: 9,
                    data: "keToan"
                },
                {
                    targets: 10,
                    data: "vienTruong"
                },
                {
                    targets: 11,
                    data: "vanDeKhac"
                },
                {
                    targets: 12,
                    data: "noiDung"
                },
                {
                    targets: 13,
                    data: "ngayKhaoSat"
                },
                {
                    targets: 14,
                    data: "goiLan1"
                },
                {
                    targets: 15,
                    data: "goiLan2"
                },
                {
                    targets: 15,
                    data: "goiLan3"
                },
                {
                    targets: 16,
                    data: "goiLan4"
                }
            ]
        });

        $('#GetReportKsHlButton').click(function (e) {

            getReportKSHappyCall();
        });

        function getReportKSHappyCall() {
            dataTable.ajax.reload();
        }
    });
})();