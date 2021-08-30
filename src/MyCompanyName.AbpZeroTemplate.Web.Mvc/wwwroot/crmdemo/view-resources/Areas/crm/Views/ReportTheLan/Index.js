(function () {
    $(function () {

        var $_reportTheLanTable = $('#ReportTheLanTable');

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
            var fromDate = $('#ReportTheLan_TuNgay').val();
            var toDate = $('#ReportTheLan_DenNgay').val();
            //Don vi ban
            var donViBanId = $('#SaleOrgSelectionCombo').val();
            //Huy chuyen doi
            var huyChuyenDoi = $('#ReportTheLan_HuyChuyenDoi').is(':checked')
            //Huy khong mua
            var huyKhongMua = $('#ReportTheLan_HuyKhongMua').is(':checked')
            //Khach hang moi
            var khachHangMoi = $('#ReportTheLan_KhachHangMoi').is(':checked')
            //Khach hang chia sale
            var khachHangChiaSale = $('#ReportTheLan_ChiaSale').is(':checked')

            
            var obj = {
                fromDate: fromDate, toDate: toDate, donViBanId: donViBanId, huyChuyenDoi: huyChuyenDoi,
                huyKhongMua: huyKhongMua, khachHangMoi: khachHangMoi, khachHangChiaSale: khachHangChiaSale
            };
            abp.ui.setBusy($container);
            abp.services.app.reportTheLan.exportReportTheLan(obj).done(function (result) {
                
                app.downloadTempFile(result);
            }).always(function () {
                abp.ui.clearBusy($container);
            });;
        });

       

        $('#RefreshSelectedDateRangeButton').click(function () {

            $('#ReportTheLan_TuNgay').val("");
            $('#ReportTheLan_DenNgay').val("");
            $('#SaleOrgSelectionCombo').val("0");
            $('input[name=isTranfered]').prop('checked', false);
            $('input[name=isCancel]').prop('checked', false);
            $('input[name=isNewCustomer]').prop('checked', false);
            $('input[name=isSharingSale]').prop('checked', false);
            
        });

        var dataTable = $_reportTheLanTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: abp.services.app.reportTheLan.getAllReportTheLan,
                inputFilter: function () {
                    return {
                        fromDate: $('#ReportTheLan_TuNgay').val(),
                        toDate: $('#ReportTheLan_DenNgay').val(),
                        donViBanId: $('#SaleOrgSelectionCombo').val(),
                        huyChuyenDoi: $('#ReportTheLan_HuyChuyenDoi').is(':checked'),
                        huyKhongMua: $('#ReportTheLan_HuyKhongMua').is(':checked'),
                        khachHangMoi: $('#ReportTheLan_KhachHangMoi').is(':checked'),
                        khachHangChiaSale: $('#ReportTheLan_ChiaSale').is(':checked')
                    };
                }
            },
            columnDefs: [
                {
                    targets: 0,
                    data: "ngayMua"
                },
                {
                    targets: 1,
                    data: "saleCenter"
                },
                {
                    targets: 2,
                    data: "center"
                },
                {
                    targets: 3,
                    data: "maKhachHang"
                },
                {
                    targets: 4,
                    data: "tenKhachHang"
                },
                {
                    targets: 5,
                    data: "gioiTinh"
                },
                {
                    targets: 6,
                    data: "diaChi"
                },
                {
                    targets: 7,
                    data: "phone"
                },
                {
                    targets: 8,
                    data: "cccd"
                },
                {
                    targets: 9,
                    data: "nhomThe"
                },
                {
                    targets: 10,
                    data: "menhGiaThe"
                },
            ]
        });

        $('#GetReportTheLanButton').click(function (e) {

            getReportTheLan();
        });

        function getReportTheLan() {
            dataTable.ajax.reload();
        }

    });
})();

