(function () {
    $(function () {
        var $_reportLichSuSuDungTable = $('#ReportLichSuSuDungTable');
        $container = $('#container');
        var _$theKhachHangInformationForm = $('form[name=ReportLichSuDung]');

        var _dM_DoiTuongLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/Common/DM_DoiTuongLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Common/_DM_DoiTuongLookupTableModal.js',
            modalClass: 'DM_DoiTuongLookupTableModal'
        });

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

            var fromDate = $('#ReportLichSuSuDungThe_TuNgay').val();
            var toDate = $('#ReportLichSuSuDungThe_DenNgay').val();
            var donViBanId = $('#SaleOrgSelectionCombo').val();
            var id_KhachHang = $('input[name=iD_KhachHang]').val();
          
            var obj = { fromDate: fromDate, toDate: toDate, donViBanId: donViBanId, id_KhachHang: id_KhachHang };
         
            abp.ui.setBusy($container);
            abp.services.app.reportLichSuSuDungThe.exportReport(obj).done(function (result) { 
                app.downloadTempFile(result);
            }).always(function () {
                abp.ui.clearBusy($container);
            });

        });

        $('#OpenDM_DoiTuongLookupTableButton').click(function () {

            var theKhachHang = _$theKhachHangInformationForm.serializeFormToObject();

            _dM_DoiTuongLookupTableModal.open({ id: theKhachHang.iD_KhachHang, displayName: theKhachHang.dM_DoiTuongTenDoiTuong }, function (data) {
                _$theKhachHangInformationForm.find('input[name=dM_DoiTuongTenDoiTuong]').val(data.displayName);
                _$theKhachHangInformationForm.find('input[name=iD_KhachHang]').val(data.id);
            });
        });

        $('#ClearDM_DoiTuongTenDoiTuongButton').click(function () {
            _$theKhachHangInformationForm.find('input[name=dM_DoiTuongTenDoiTuong]').val('');
            _$theKhachHangInformationForm.find('input[name=iD_KhachHang]').val('');
        });

        $('#RefreshSelectedDateRangeButton').click(function () {

            $('#ReportLichSuSuDungThe_TuNgay').val("");
            $('#ReportLichSuSuDungThe_DenNgay').val("");
            $('#SaleOrgSelectionCombo').val("0");
            _$theKhachHangInformationForm.find('input[name=dM_DoiTuongTenDoiTuong]').val('');
            _$theKhachHangInformationForm.find('input[name=iD_KhachHang]').val('');
        });

        var dataTable = $_reportLichSuSuDungTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: abp.services.app.reportLichSuSuDungThe.getAllReportLichSuSungThe,
                inputFilter: function () {
                    return {
                        fromDate: $('#ReportLichSuSuDungThe_TuNgay').val(),
                        toDate: $('#ReportLichSuSuDungThe_DenNgay').val(),
                        donViBanId: $('#SaleOrgSelectionCombo').val(),
                        id_KhachHang: $('input[name=iD_KhachHang]').val()
                    };
                }
            },
            columnDefs: [
                {
                    targets: 0,
                    data: "customerCode"
                },
                {
                    targets: 1,
                    data: "customerName"
                },
                {
                    targets: 2,
                    data: "customerPhone"
                },
                {
                    targets: 3,
                    data: "customerGender"
                },
                {
                    targets: 4,
                    data: "customerAddress"
                },
                {
                    targets: 5,
                    data: "managementOrganizationName"
                },
                {
                    targets: 6,
                    data: "cardCode"
                },
                {
                    targets: 7,
                    data: "sellingOrganizationName"
                },
                {
                    targets: 8,
                    data: "date",
                    render: function (data) {
                        return moment(data).format('L');
                    }
                    
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
                    data: "cardType"
                },
                {
                    targets: 12,
                    data: "serviceGroup"
                },
                {
                    targets: 13,
                    data: "service"
                },
                {
                    targets: 14,
                    data: "isComplete"
                },
                //{
                //    targets: 15,
                //    data: "soBuoiConLai"
                //},
                //{
                //    targets: 16,
                //    data: "soBuoiDaDung"
                //},
                //{
                //    targets: 17,
                //    data: "lssd.soTienConLai"
                //},
                //{
                //    targets: 18,
                //    data: "lssd.stt"
                //},
                //{
                //    targets: 19,
                //    data: "isBuoiTang"
                //}
            ]
        });

        $('#GetReportLichSuSuDungButton').click(function (e) {
            e.preventDefault();
            getReportLichSuSuDung();
        });

        function getReportLichSuSuDung() {
            dataTable.ajax.reload();
        }
    });
})();