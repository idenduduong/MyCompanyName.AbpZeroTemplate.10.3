(function () {
    $(function () {

        var $_reportKSHLTable = $('#ReportKSHLTable');

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
            var fromDate = $('#ReportKSHL_TuNgay').val();
            var todate = $('#ReportKSHL_DenNgay').val();
            var obj = { fromDate : fromDate, todate : todate };
            abp.ui.setBusy($container);
            abp.services.app.reportKSHL.exportReportKSHL(obj).done(function (result) {
                
                app.downloadTempFile(result);
            }).always(function () {
                abp.ui.clearBusy($container);
            });
        });

        $('#RefreshSelectedDateRangeButton').click(function () {

            $('#ReportKSHL_TuNgay').val("");
            $('#ReportKSHL_DenNgay').val("");
        });

        var dataTable = $_reportKSHLTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: abp.services.app.reportKSHL.getAllReportKSHL,
                inputFilter: function () {
                    return {
                        fromDate: $('#ReportKSHL_TuNgay').val(),
                        toDate: $('#ReportKSHL_DenNgay').val(),
                    };
                }
            },
            columnDefs: [
                {
                    targets: 0,
                    data: "center"
                },
                {
                    targets: 1,
                    data: "maKhachHang"
                },
                {
                    targets: 2,
                    data: "tenKhachHang"
                },
                {
                    targets: 3,
                    data: "phone"
                },
                {
                    targets: 4,
                    data: "phanLoaiKH"
                },
                {
                    targets: 5,
                    data: "phanLoaiDV"
                },
                {
                    targets: 6,
                    data: "tenDichVu"
                },
                {
                    targets: 7,
                    data: "vienTruong"
                },
                {
                    targets: 8,
                    data: "ktv"
                },
                {
                    targets: 9,
                    data: "cskh"
                },
                {
                    targets: 10,
                    data: "keToan"
                },
                {
                    targets: 11,
                    data: "nvkd"
                },
                {
                    targets: 12,
                    data: "veSinh"
                },
                {
                    targets: 13,
                    data: "yKienKhachHang"
                },
                {
                    targets: 14,
                    data: "ndKhongHaiLong"
                },
                {
                    targets: 15,
                    data: "ngayDanhGia"
                },
                {
                    targets: 16,
                    data: "ghiChu"
                }
            ]
        });

        $('#GetReportKsHlButton').click(function (e) {

            getReportKsHl();
        });

        function getReportKsHl() {
            dataTable.ajax.reload();
        }

    });
})();