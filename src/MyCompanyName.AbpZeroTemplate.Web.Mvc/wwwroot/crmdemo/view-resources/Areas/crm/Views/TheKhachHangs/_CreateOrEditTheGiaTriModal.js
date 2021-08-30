(function ($) {
    app.modals.CreateOrEditTheGiaTriModal = function () {

        var _theKhachHangsService = abp.services.app.theKhachHangs;

        var _modalManager;
        var _$theKhachHangInformationForm = null;
        var _$nhanVienTuVanForm = null;
        var _$chietKhauTab = null;

        var _dM_NhomTheLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/TheKhachHangs/DM_NhomTheLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/TheKhachHangs/_DM_NhomTheLookupTableModal.js',
            modalClass: 'DM_NhomTheLookupTableModal'
        }); var _dM_DoiTuongLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/Common/DM_DoiTuongLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Common/_DM_DoiTuongLookupTableModal.js',
            modalClass: 'DM_DoiTuongLookupTableModal'
        }); var _dM_KhuyenMaiLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/TheKhachHangs/DM_KhuyenMaiLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/TheKhachHangs/_DM_KhuyenMaiLookupTableModal.js',
            modalClass: 'DM_KhuyenMaiLookupTableModal'
        });
        var _voucherLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/Common/VoucherLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Common/_VoucherLookupTableModal.js',
            modalClass: 'VoucherLookupTableModal'
        });
        var _userLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/Common/SaleLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Common/_SaleLookupTableModal.js',
            modalClass: 'SaleLookupTableModal'
        });
        var _organizationUnitLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/TheKhachHangs/OrganizationUnitLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/TheKhachHangs/_OrganizationUnitLookupTableModal.js',
            modalClass: 'OrganizationUnitLookupTableModal'
        }); var _dM_DacDiemKhachHangLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/TheKhachHangs/DM_DacDiemKhachHangLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/TheKhachHangs/_DM_DacDiemKhachHangLookupTableModal.js',
            modalClass: 'DM_DacDiemKhachHangLookupTableModal'
        }); var _dM_LienHeLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/TheKhachHangs/DM_LienHeLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/TheKhachHangs/_DM_LienHeLookupTableModal.js',
            modalClass: 'DM_LienHeLookupTableModal'
        });
        var _theHuyLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/TheKhachHangs/GetTheHuyLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/TheKhachHangs/_TheHuyLookupTableModal.js',
            modalClass: 'TheHuyLookupTableModal'
        });
        var _thanhToanTheModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/PhieuThus/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/PhieuThus/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditPhieuThuModal',
            width: '50%'
        });

        this.init = function (modalManager) {
            _modalManager = modalManager;

            var modal = _modalManager.getModal();
            modal.find('.numeric').number(true, 0);
            modal.find('#TheKhachHang_PTTangThem').number(true, 2);
            
            modal.find('.date-picker').datetimepicker({
                locale: abp.localization.currentLanguage.name,
                format: 'L'
            });
            modal.find('.date-picker').each(function () {
                if ($(this).val() == "01/01/0001") {
                    $(this).data("DateTimePicker").date(new Date());
                }
            })

            _$theKhachHangInformationForm = _modalManager.getModal().find('form[name=TheKhachHangInformationsForm]');
            _$nhanVienTuVanForm = _modalManager.getModal().find('form[name=NhanVienTuVanForm]');
            _$chietKhauTab = _$chietKhauTab == null ? ChietKhauNhanVien(_modalManager) : _$chietKhauTab;
            _$theKhachHangInformationForm.validate();
            _$nhanVienTuVanForm.validate();

        };

        $('#OpenDM_NhomTheLookupTableButton').click(function () {

            var theKhachHang = _$theKhachHangInformationForm.serializeFormToObject();

            _dM_NhomTheLookupTableModal.open({ id: theKhachHang.iD_NhomThe, displayName: theKhachHang.dM_NhomTheTenNhomThe }, function (data) {
                _$theKhachHangInformationForm.find('input[name=dM_NhomTheTenNhomThe]').val(data.displayName);
                _$theKhachHangInformationForm.find('input[name=iD_NhomThe]').val(data.id);
            });
        });

        $('#ClearDM_NhomTheTenNhomTheButton').click(function () {
            _$theKhachHangInformationForm.find('input[name=dM_NhomTheTenNhomThe]').val('');
            _$theKhachHangInformationForm.find('input[name=iD_NhomThe]').val('');
        });

        $('#OpenDM_DoiTuongLookupTableButton').click(function () {

            var theKhachHang = _$theKhachHangInformationForm.serializeFormToObject();

            _dM_DoiTuongLookupTableModal.open({ id: theKhachHang.iD_KhachHang, displayName: theKhachHang.dM_DoiTuongTenDoiTuong }, function (data) {
                _$theKhachHangInformationForm.find('input[name=dM_DoiTuongTenDoiTuong]').val(data.displayName);
                _$theKhachHangInformationForm.find('input[name=diaChi]').val(data.address);
                _$theKhachHangInformationForm.find('input[name=dienThoai]').val(data.phone);
                _$theKhachHangInformationForm.find('input[name=iD_KhachHang]').val(data.id);
            });
        });

        $('#ClearDM_DoiTuongTenDoiTuongButton').click(function () {
            _$theKhachHangInformationForm.find('input[name=dM_DoiTuongTenDoiTuong]').val('');
            _$theKhachHangInformationForm.find('input[name=diaChi]').val('');
            _$theKhachHangInformationForm.find('input[name=dienThoai]').val('');
            _$theKhachHangInformationForm.find('input[name=iD_KhachHang]').val('');
        });

        $('#OpenDM_KhuyenMaiLookupTableButton').click(function () {

            var theKhachHang = _$theKhachHangInformationForm.serializeFormToObject();

            _dM_KhuyenMaiLookupTableModal.open({}, function (data) {
                
                _$theKhachHangInformationForm.find('input[name=dM_KhuyenMaiTenKhuyenMai]').val(data.displayName);
                _$theKhachHangInformationForm.find('#DM_KhuyenMai_ID_KhuyenMai').val(data.id);
                //_$theKhachHangInformationForm.find('input[name=maVoucher]').val(data.voucher.voucherCode);
                //_$theKhachHangInformationForm.find('input[name=voucherId]').val(data.voucher.id);
                //_$theKhachHangInformationForm.find('input[name=voucherValue]').val(data.voucher.voucherValue);
                _$theKhachHangInformationForm.find('input[name=isPercentage]').val(data.isPercentage);
            });
        });

        $('#ClearDM_KhuyenMaiButton').click(function () {
            _$theKhachHangInformationForm.find('input[name=dM_KhuyenMaiTenKhuyenMai]').val('');
            _$theKhachHangInformationForm.find('#DM_KhuyenMai_ID_KhuyenMai').val('');
            //_$theKhachHangInformationForm.find('input[name=maVoucher]').val('');
            //_$theKhachHangInformationForm.find('input[name=voucherId]').val('');
            _$theKhachHangInformationForm.find('input[name=isPercentage]').val('');
        });

        $('#OpenUserLookupTableButton').click(function () {

            var theKhachHang = _$theKhachHangInformationForm.serializeFormToObject();

            _userLookupTableModal.open({ id: theKhachHang.iD_NhanVienLap, displayName: theKhachHang.userName }, function (data) {
                _$theKhachHangInformationForm.find('input[name=userName]').val(data.maNhanVien + " - " + data.tenNhanVien);
                _$theKhachHangInformationForm.find('input[name=iD_NhanVienLap]').val(data.id);
            });
        });

        $('#ClearUserNameButton').click(function () {
            _$theKhachHangInformationForm.find('input[name=userName]').val('');
            _$theKhachHangInformationForm.find('input[name=iD_NhanVienLap]').val('');
        });

        $('#OpenOrganizationUnitLookupTableButton').click(function () {

            var theKhachHang = _$theKhachHangInformationForm.serializeFormToObject();

            _organizationUnitLookupTableModal.open({ id: theKhachHang.iD_DonVi, displayName: theKhachHang.organizationUnitDisplayName }, function (data) {
                _$theKhachHangInformationForm.find('input[name=organizationUnitDisplayName]').val(data.displayName);
                _$theKhachHangInformationForm.find('input[name=iD_DonVi]').val(data.id);
            });
        });

        $('#ClearOrganizationUnitDisplayNameButton').click(function () {
            _$theKhachHangInformationForm.find('input[name=organizationUnitDisplayName]').val('');
            _$theKhachHangInformationForm.find('input[name=iD_DonVi]').val('');
        });

        $('#OpenDonViThuHuongLookupTableButton').click(function () {

            var theKhachHang = _$theKhachHangInformationForm.serializeFormToObject();

            _organizationUnitLookupTableModal.open({ id: theKhachHang.iD_DonVi, displayName: theKhachHang.organizationUnitDisplayName }, function (data) {
                _$theKhachHangInformationForm.find('input[name=donViThuHuongDisplayName]').val(data.displayName);
                _$theKhachHangInformationForm.find('input[name=iD_DonViThuHuong]').val(data.id);
            });
        });

        $('#ClearDonViThuHuongDisplayNameButton').click(function () {
            _$theKhachHangInformationForm.find('input[name=donViThuHuongDisplayName]').val('');
            _$theKhachHangInformationForm.find('input[name=iD_DonViThuHuong]').val('');
        });

        $('#OpenDM_DacDiemKhachHangLookupTableButton').click(function () {

            var theKhachHang = _$theKhachHangInformationForm.serializeFormToObject();

            _dM_DacDiemKhachHangLookupTableModal.open({ id: theKhachHang.iD_DacDiemKhachHang, displayName: theKhachHang.dM_DacDiemKhachHangTenDacDiem }, function (data) {
                _$theKhachHangInformationForm.find('input[name=dM_DacDiemKhachHangTenDacDiem]').val(data.displayName);
                _$theKhachHangInformationForm.find('input[name=iD_DacDiemKhachHang]').val(data.id);
            });
        });

        $('#ClearDM_DacDiemKhachHangTenDacDiemButton').click(function () {
            _$theKhachHangInformationForm.find('input[name=dM_DacDiemKhachHangTenDacDiem]').val('');
            _$theKhachHangInformationForm.find('input[name=iD_DacDiemKhachHang]').val('');
        });
        $('#OpenVoucherLookupTableButton').click(function () {

            var theKhachHang = _$theKhachHangInformationForm.serializeFormToObject();

            _voucherLookupTableModal.open({ khuyenMaiId: _$theKhachHangInformationForm.find('#DM_KhuyenMai_ID_KhuyenMai').val() }, function (data) {
                _$theKhachHangInformationForm.find('input[name=maVoucher]').val(data.voucher.voucherCode);
                _$theKhachHangInformationForm.find('input[name=voucherId]').val(data.voucher.id);
                _$theKhachHangInformationForm.find('input[name=voucherValue]').val(data.voucher.voucherValue);
            });
        });

        $('#ClearVoucherButton').click(function () {
            _$theKhachHangInformationForm.find('input[name=maVoucher]').val('');
            _$theKhachHangInformationForm.find('input[name=voucherId]').val('');
            _$theKhachHangInformationForm.find('input[name=voucherValue]').val('');
        });
        $('#OpenDonViThucHienLookupTableButton').click(function () {

            var theKhachHang = _$theKhachHangInformationForm.serializeFormToObject();

            _organizationUnitLookupTableModal.open({ id: theKhachHang.iD_DonViThucHien, displayName: theKhachHang.donViThucHienDisplayName }, function (data) {
                _$theKhachHangInformationForm.find('input[name=donViThucHienDisplayName]').val(data.displayName);
                _$theKhachHangInformationForm.find('input[name=iD_DonViThucHien]').val(data.id);
            });
        });

        $('#ClearDonViThucHienDisplayNameButton').click(function () {
            _$theKhachHangInformationForm.find('input[name=donViThucHienDisplayName]').val('');
            _$theKhachHangInformationForm.find('input[name=iD_DonViThucHien]').val('');
        });

        $('#OpenTheHuyLookupTableButton').click(function () {

            var theKhachHang = _$theKhachHangInformationForm.serializeFormToObject();

            _theHuyLookupTableModal.open({ id: theKhachHang.iD_TheCu, displayName: theKhachHang.theCuMaThe }, function (data) {
                _$theKhachHangInformationForm.find('input[name=theHuyMaThe]').val(data.maThe);
                _$theKhachHangInformationForm.find('input[name=iD_TheCu]').val(data.id);
            });
        });

        $('#ClearTheHuyButton').click(function () {
            _$theKhachHangInformationForm.find('input[name=theHuyMaThe]').val('');
            _$theKhachHangInformationForm.find('input[name=iD_TheCu]').val('');
        });
        $('#VoucherValue').change(function () {
            var menhGiaThe = parseFloat(_$theKhachHangInformationForm.find('input[name=menhGiaThe]').val());
            var discount = parseFloat(_$theKhachHangInformationForm.find('input[name=voucherValue]').val() == "" ? "0" : _$theKhachHangInformationForm.find('input[name=voucherValue]').val());
            if (discount > menhGiaThe) {
                abp.notify.warn(app.localize('TienChietKhauKhongTheLonHonThanhTien'));
            }
            
            var ptChietKhau = parseFloat(_$theKhachHangInformationForm.find('input[name=pTChietKhau]').val() == "" ? "0" : _$theKhachHangInformationForm.find('input[name=pTChietKhau]').val());
            var ptTangThem = parseFloat(_$theKhachHangInformationForm.find('input[name=pTTangThem]').val() == "" ? "0" : _$theKhachHangInformationForm.find('input[name=pTTangThem]').val());
            var tienChietKhau = (menhGiaThe - discount) * ptChietKhau / 100;
            var tienTangThem = (menhGiaThe - discount) * ptTangThem / 100;
            var thanhToan = (menhGiaThe - discount) - tienChietKhau;
            var tong = menhGiaThe + tienTangThem;
            _$theKhachHangInformationForm.find('input[name=tienChietKhau]').val(tienChietKhau);
            _$theKhachHangInformationForm.find('input[name=tienTangThem]').val(tienTangThem);
            _$theKhachHangInformationForm.find('input[name=phaiThanhToan]').val(thanhToan);
            _$theKhachHangInformationForm.find('input[name=tongTaiKhoan]').val(tong);
        });

        $('#TheKhachHang_MenhGiaThe').change(function () {
            
            var menhGiaThe = parseFloat($(this).val());
            var discount = parseFloat(_$theKhachHangInformationForm.find('input[name=voucherValue]').val() == "" ? "0" : _$theKhachHangInformationForm.find('input[name=voucherValue]').val());
            var ptChietKhau = parseFloat(_$theKhachHangInformationForm.find('input[name=pTChietKhau]').val() == "" ? "0" : _$theKhachHangInformationForm.find('input[name=pTChietKhau]').val());
            var ptTangThem = parseFloat(_$theKhachHangInformationForm.find('input[name=pTTangThem]').val() == "" ? "0" : _$theKhachHangInformationForm.find('input[name=pTTangThem]').val());
            var tienChietKhau = (menhGiaThe - discount) * ptChietKhau / 100;
            var tienTangThem = (menhGiaThe - discount) * ptTangThem / 100;
            var thanhToan = (menhGiaThe - discount) - tienChietKhau;
            var tong = menhGiaThe + tienTangThem;
            _$theKhachHangInformationForm.find('input[name=tienChietKhau]').val(tienChietKhau);
            _$theKhachHangInformationForm.find('input[name=tienTangThem]').val(tienTangThem);
            _$theKhachHangInformationForm.find('input[name=phaiThanhToan]').val(thanhToan);
            _$theKhachHangInformationForm.find('input[name=tongTaiKhoan]').val(tong);
        });

        $('#TheKhachHang_PTTangThem').change(function () {
            var menhGiaThe = parseFloat(_$theKhachHangInformationForm.find('input[name=menhGiaThe]').val());
            var discount = parseFloat(_$theKhachHangInformationForm.find('input[name=voucherValue]').val() == "" ? "0" : _$theKhachHangInformationForm.find('input[name=voucherValue]').val());
            var ptTangThem = parseFloat(_$theKhachHangInformationForm.find('input[name=pTTangThem]').val() == "" ? "0" : _$theKhachHangInformationForm.find('input[name=pTTangThem]').val());
            var tienTangThem = menhGiaThe * ptTangThem / 100;
            var tong = menhGiaThe + tienTangThem;
            _$theKhachHangInformationForm.find('input[name=tienTangThem]').val(tienTangThem);
            _$theKhachHangInformationForm.find('input[name=tongTaiKhoan]').val(tong);
        });
        $('#TheKhachHang_TienTangThem').change(function () {
            var menhGiaThe = parseFloat(_$theKhachHangInformationForm.find('input[name=menhGiaThe]').val());
            var discount = parseFloat(_$theKhachHangInformationForm.find('input[name=voucherValue]').val() == "" ? "0" : _$theKhachHangInformationForm.find('input[name=voucherValue]').val());
            var tienTangThem = parseFloat(_$theKhachHangInformationForm.find('input[name=tienTangThem]').val() == "" ? "0" : _$theKhachHangInformationForm.find('input[name=tienTangThem]').val());
            var ptTangThem = tienTangThem / menhGiaThe * 100;
            var tong = menhGiaThe + tienTangThem;
            _$theKhachHangInformationForm.find('input[name=pTTangThem]').val(ptTangThem);
            _$theKhachHangInformationForm.find('input[name=tongTaiKhoan]').val(tong);
        });
        $('#TheKhachHang_PTChietKhau').change(function () {
            var menhGiaThe = parseFloat(_$theKhachHangInformationForm.find('input[name=menhGiaThe]').val());
            
            var discount = parseFloat(_$theKhachHangInformationForm.find('input[name=voucherValue]').val() == "" ? "0" : _$theKhachHangInformationForm.find('input[name=voucherValue]').val());
            var ptChietKhau = parseFloat(_$theKhachHangInformationForm.find('input[name=pTChietKhau]').val() == "" ? "0" : _$theKhachHangInformationForm.find('input[name=pTChietKhau]').val());
            var tienChietKhau = (menhGiaThe - discount) * ptChietKhau / 100;
            var thanhToan = (menhGiaThe - discount) - tienChietKhau;
            _$theKhachHangInformationForm.find('input[name=tienChietKhau]').val(tienChietKhau);
            _$theKhachHangInformationForm.find('input[name=phaiThanhToan]').val(thanhToan);
        });
        $('#TheKhachHang_TienChietKhau').change(function () {
            
            var menhGiaThe = parseFloat(_$theKhachHangInformationForm.find('input[name=menhGiaThe]').val());
            var discount = parseFloat(_$theKhachHangInformationForm.find('input[name=voucherValue]').val() == "" ? "0" : _$theKhachHangInformationForm.find('input[name=voucherValue]').val());
            var tienChietKhau = parseFloat(_$theKhachHangInformationForm.find('input[name=tienChietKhau]').val() == "" ? "0" : _$theKhachHangInformationForm.find('input[name=tienChietKhau]').val());
            var ptChietKhau = tienChietKhau / (menhGiaThe - discount) * 100;
            var thanhToan = (menhGiaThe - discount) - tienChietKhau;
            _$theKhachHangInformationForm.find('input[name=pTChietKhau]').val(ptChietKhau);
            _$theKhachHangInformationForm.find('input[name=phaiThanhToan]').val(thanhToan);
        });
        
        var saveData = function (callback) {
            
            var numberOfEmployee = $('#ChietKhauNhanViensTable').DataTable().rows().count();
            
            if (numberOfEmployee == 0) {
                abp.notify.info(app.localize('BanCanThemNhanVien'));
                return;
            }
            if (!_$theKhachHangInformationForm.valid()) {
                return;
            }
            var totalPercentage = 0;
            var employees = $('#ChietKhauNhanViensTable').DataTable().rows().data();
            $.each(employees, function (key, value) {
                if (value.nhanVienThucHien.laNhanVienChinh == true) {
                    hasPrimarySale = true;
                }
                totalPercentage += value.nhanVienThucHien.tienChietKhau;
            });
            if (totalPercentage != 100) {
                abp.notify.info("Tổng phần trăm chiết khấu phải bằng 100");
                return;
            }
            
            var theKhachHang = _$theKhachHangInformationForm.serializeFormToObject();
            _modalManager.setBusy(true);
            _theKhachHangsService.createOrEdit(
                theKhachHang
            ).done(function (data) {
                
                abp.notify.info(app.localize('SavedSuccessfully'));
                //_modalManager.close();
                if (callback) {
                    callback(data);
                }
                abp.event.trigger('app.createOrEditTheKhachHangModalSaved');
            }).always(function () {
                _modalManager.setBusy(false);
            });
        };
        this.close = function () {
            _modalManager.close();
        }
        function openPhieuThuModal(idThe) {
            _thanhToanTheModal.open({ idThe: idThe });
            _modalManager.close();
        }
        this.saveWithOtherAction = function () {
            saveData(openPhieuThuModal);
        }
        this.save = function () {
            saveData();
        }
        this.saveAndClose = function () {
            saveData(function () {
                _modalManager.close();
            });
        }
    };
})(jQuery);