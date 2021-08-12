(function ($) {
    app.modals.CreateOrEditTheLanModal = function () {

        var _theKhachHangsService = abp.services.app.theKhachHangs;
        var _theKhachHangChiTietsService = abp.services.app.theKhachHangChiTiets;

        var _modalManager;
        var _$theKhachHangInformationForm = null;
        var _$nhanVienTuVanForm = null;
        var _$chitietTab = null;
        var _$chiTietDichVuForm = null;
        var _$chietKhauTab = null;
        var dichVuController = null;
        var _dM_NhomTheLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/TheKhachHangs/DM_NhomTheLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/TheKhachHangs/_DM_NhomTheLookupTableModal.js',
            modalClass: 'DM_NhomTheLookupTableModal'
        }); var _dM_DoiTuongLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/Common/DM_DoiTuongLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Common/_DM_DoiTuongLookupTableModal.js',
            modalClass: 'DM_DoiTuongLookupTableModal'
        }); var _dM_TienTeLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/TheKhachHangs/DM_TienTeLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/TheKhachHangs/_DM_TienTeLookupTableModal.js',
            modalClass: 'DM_TienTeLookupTableModal'
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
        });
        var _dM_LienHeLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/TheKhachHangs/DM_LienHeLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/TheKhachHangs/_DM_LienHeLookupTableModal.js',
            modalClass: 'DM_LienHeLookupTableModal'
        });
        var _dM_KhuyenMaiLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/TheKhachHangs/DM_KhuyenMaiLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/TheKhachHangs/_DM_KhuyenMaiLookupTableModal.js',
            modalClass: 'DM_KhuyenMaiLookupTableModal'
        });
        var _voucherLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/Common/VoucherLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Common/_VoucherLookupTableModal.js',
            modalClass: 'VoucherLookupTableModal'
        });
        var _dM_DichVuLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/Common/DM_DichVuLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Common/_DM_DichVuLookupTableModal.js',
            modalClass: 'DM_DichVuLookupTableModal',
            width: "50%"
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

        function calcThanhTien() {
            var soLuong = parseFloat(_$chiTietDichVuForm.find('input[name=soLuong]').val());
            var soLuongTang = parseFloat(_$chiTietDichVuForm.find('input[name=soLuongTang]').val());
            var soLuongDaSuDung = parseFloat(_$chiTietDichVuForm.find('input[name=soLuongDaSuDung]').val());
            var traLaiHHDV = _$chiTietDichVuForm.find('input[name=traLaiHHDV]').val();
            
            var traLai = parseFloat(_$chiTietDichVuForm.find('input[name=soLuongTraLai]').val() == "" ? 0 : _$chiTietDichVuForm.find('input[name=soLuongTraLai]').val());
            //if (traLai > soLuong) {
            //    abp.notify.info(app.localize('SoLuongTraLaiKhongTheLonHonSoLuong'));
            //    return;
            //}
            //if (traLaiHHDV == "true") {
            //    soLuong = soLuongDaSuDung;
            //}

            var donGia = parseFloat(_$chiTietDichVuForm.find('input[name=donGia]').val());
            var thanhTien = donGia * soLuong;
            _$chiTietDichVuForm.find('input[name=thanhTien]').val(thanhTien);
            return thanhTien;
        }

        function calcThanhToan() {

            var isPercentage = _$theKhachHangInformationForm.find('input[name=isPercentage]').val();

            var laHangTang = _$chiTietDichVuForm.find('input[name=laTangKem]').prop('checked');
            var discount = 0;
            if (_$theKhachHangInformationForm.find('input[name=voucherValue]').val() == undefined || _$theKhachHangInformationForm.find('input[name=voucherValue]').val() == "") {
                discount = 0;
            }
            else {
                discount = parseFloat(_$theKhachHangInformationForm.find('input[name=voucherValue]').val())
            }

            
            if (laHangTang == true) {
                _$chiTietDichVuForm.find('input[name=thanhToan]').val(0);
                return 0;
            }
            var thanhTien = calcThanhTien();
            var tienChietKhau = parseFloat(_$chiTietDichVuForm.find('input[name=tienChietKhau]').val());
            if (_$theKhachHangInformationForm.find('input[name=voucherValue]').val() != undefined && _$theKhachHangInformationForm.find('input[name=voucherValue]').val() != "") {
                if (isPercentage == "true") {
                    tienChietKhau += thanhTien * discount / 100;
                }
                else {
                    if (discount >= thanhTien) {
                        tienChietKhau = thanhTien;
                    }
                    else if (discount + tienChietKhau >= thanhTien) {
                        tienChietKhau = thanhTien;
                    }
                    else {
                        tienChietKhau = tienChietKhau + discount;
                    }
                }
            }

            var thanhToan = thanhTien - tienChietKhau
            _$chiTietDichVuForm.find('input[name=thanhToan]').val(thanhToan);
            return thanhToan;
        }
        this.init = function (modalManager) {
            _modalManager = modalManager;

            var modal = _modalManager.getModal();
            modal.find('.numeric').number(true, 0);
            modal.find('#TheKhachHangChiTiet_PTChietKhau').number(true, 2);
            //modal.find('.date-picker').datetimepicker({
            //    locale: abp.localization.currentLanguage.name,
            //    format: 'L'
            //});
            //modal.find('.date-picker').each(function () {
            //    if ($(this).val() == "01/01/0001") {
            //        $(this).data("DateTimePicker").date(new Date());
            //    }
            //})

            _$theKhachHangInformationForm = _modalManager.getModal().find('form[name=TheKhachHangInformationsForm]');
            _$nhanVienTuVanForm = _modalManager.getModal().find('form[name=NhanVienTuVanForm]');
            _$chiTietDichVuForm = _modalManager.getModal().find('form[name=ChiTietDichVuForm]');
            _$theKhachHangInformationForm.validate();
            _$nhanVienTuVanForm.validate();
            modal.find('.antikeydown').keydown(function (e) {
                if (e.which === 13) {
                    e.stopPropagation();
                }
            });
            _$chitietTab = _$chitietTab == null ? ChiTietHangHoaDichVu(_modalManager) : _$chitietTab;
            _$chietKhauTab = _$chietKhauTab == null ? ChietKhauNhanVien(_modalManager) : _$chietKhauTab;
            //modal.find('#hanghoa-list').height('500').enhsplitter({
            //    vertical: true,
            //    percent: true,
            //    position: '100%',
            //    limit: 300,
            //    onDrag: function (event, splitter_container) {
            //        modal.find('#TheKhachHangChiTietsTable').DataTable().columns.adjust()
            //            .responsive.recalc();
            //    }
            //});
        };

        this.shown = function (modal) {
            
            modal.find('#TheKhachHangChiTietsTable').DataTable().columns.adjust().responsive.recalc();
        };
        $('#TheKhachHang_NgayApDung').datetimepicker({
            format: 'L',
            locale: abp.localization.currentLanguage.name
        });
        $('#TheKhachHang_NgayHetHan').datetimepicker({
            format: 'L',
            locale: abp.localization.currentLanguage.name
        });
        $('#TheKhachHang_NgayMua').datetimepicker({
            format: 'L',
            locale: abp.localization.currentLanguage.name
        }).on('dp.change', function (e) {
            
            var ngayMua = $(this).data('DateTimePicker').date();
            $('#TheKhachHang_NgayApDung').data('DateTimePicker').date(ngayMua);
            ngayMua = new Date(ngayMua);
            ngayMua.setFullYear(ngayMua.getFullYear() + 1);
            $('#TheKhachHang_NgayHetHan').data('DateTimePicker').date(ngayMua);
        })

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
                _$theKhachHangInformationForm.find('input[name=iD_KhachHang]').val(data.id);
                _$theKhachHangInformationForm.find('input[name=dienThoai]').val(data.phone);
                _$theKhachHangInformationForm.find('input[name=diaChi]').val(data.address)
            });
        });

        $('#ClearDM_DoiTuongTenDoiTuongButton').click(function () {
            _$theKhachHangInformationForm.find('input[name=dM_DoiTuongTenDoiTuong]').val('');
            _$theKhachHangInformationForm.find('input[name=iD_KhachHang]').val('');
            _$theKhachHangInformationForm.find('input[name=dienThoai]').val();
            _$theKhachHangInformationForm.find('input[name=diaChi]').val()
        });

        $('#OpenUserLookupTableButton').click(function () {

            var theKhachHang = _$theKhachHangInformationForm.serializeFormToObject();

            _userLookupTableModal.open({ id: theKhachHang.iD_NhanVienLap, displayName: theKhachHang.userName }, function (data) {
                _$theKhachHangInformationForm.find('input[name=userName]').val(data.tenNhanVien);
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

            _organizationUnitLookupTableModal.open({ id: theKhachHang.iD_DonViThuHuong, displayName: theKhachHang.donViThuHuongDisplayName }, function (data) {
                _$theKhachHangInformationForm.find('input[name=donViThuHuongDisplayName]').val(data.displayName);
                _$theKhachHangInformationForm.find('input[name=iD_DonViThuHuong]').val(data.id);
            });
        });

        $('#ClearDonViThuHuongDisplayNameButton').click(function () {
            _$theKhachHangInformationForm.find('input[name=donViThuHuongDisplayName]').val('');
            _$theKhachHangInformationForm.find('input[name=iD_DonViThuHuong]').val('');
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


        $('#OpenDM_HangHoaLookupTableButton').click(function () {
            //var theKhachHang = _$theKhachHangInformationForm.serializeFormToObject();
            _dM_DichVuLookupTableModal.open({ id: null, displayName: null }, function (data) {
                $('input[name=dM_HangHoaTenHangHoa]').val(data.displayName);
                $('input[name=iD_HangHoa]').val(data.id);
                $('input[name=donGia]').val(data.donGia);
                $('input[name=soLuong]').val(1);
                $('input[name=soLuongTang]').val(0);
                $('input[name=soLuongDaSuDung]').val(0);
                $('input[name=tienDaSuDung]').val(0);
                $('input[name=pTChietKhau]').val(0);
                $('input[name=soLuongTraLai]').val(0);
                $('input[name=donGia]').trigger("change");
            });


        });

        $('#ClearDM_HangHoaTenHangHoaButton').click(function () {
            $('input[name=dM_HangHoaTenHangHoa]').val('');
            $('input[name=iD_HangHoa]').val('');
            $('input[name=donGia]').val('');
            $('input[name=soLuong]').val(0);
            $('input[name=donGia]').trigger("change");
        });

        //$('#TheKhachHang_DiscountFromVoucher').change(function () {
        //    var thanhTien = calcThanhTien();
        //    var discount = 0;
        //    if (_$theKhachHangInformationForm.find('input[name=discountFromVoucher]').val() == undefined || _$theKhachHangInformationForm.find('input[name=discountFromVoucher]').val() == "") {
        //        discount = 0;
        //    }
        //    else {
        //        discount = parseFloat(_$theKhachHangInformationForm.find('input[name=discountFromVoucher]').val())
        //    }
        //    if (discount > thanhTien) {
        //        abp.notify.warn(app.localize('TienChietKhauKhongTheLonHonThanhTien'));
        //    }
        //    var ptChietKhau = parseFloat(_$chiTietDichVuForm.find('input[name=pTChietKhau]').val());
        //    var tienChietKhau = (thanhTien - discount) * ptChietKhau / 100;
        //    _$chiTietDichVuForm.find('input[name=tienChietKhau]').val(tienChietKhau);
        //    calcThanhToan();
        //});

        $('#TheKhachHangChiTiet_DonGia').change(function () {
            var thanhTien = calcThanhTien();
            var discount = 0;
            if (_$theKhachHangInformationForm.find('input[name=voucherValue]').val() == undefined || _$theKhachHangInformationForm.find('input[name=voucherValue]').val() == "") {
                discount = 0;
            }
            else {
                discount = parseFloat(_$theKhachHangInformationForm.find('input[name=voucherValue]').val())
            }
            if (discount > thanhTien) {
                abp.notify.warn(app.localize('TienChietKhauKhongTheLonHonThanhTien'));
            }
            var ptChietKhau = parseFloat(_$chiTietDichVuForm.find('input[name=pTChietKhau]').val());
            var tienChietKhau = thanhTien * ptChietKhau / 100;
            _$chiTietDichVuForm.find('input[name=tienChietKhau]').val(tienChietKhau);
            calcThanhToan();
        });

        $('#TheKhachHangChiTiet_SoLuong').change(function () {

            var thanhTien = calcThanhTien();
            var discount = 0;
            if (_$theKhachHangInformationForm.find('input[name=voucherValue]').val() == undefined || _$theKhachHangInformationForm.find('input[name=voucherValue]').val() == "") {
                discount = 0;
            }
            else {
                discount = parseFloat(_$theKhachHangInformationForm.find('input[name=voucherValue]').val())
            }
            //if (discount > thanhTien) {
            //    abp.notify.warn(app.localize('TienChietKhauKhongTheLonHonThanhTien'));
            //}
            var ptChietKhau = parseFloat(_$chiTietDichVuForm.find('input[name=pTChietKhau]').val());
            var tienChietKhau = thanhTien * ptChietKhau / 100;
            _$chiTietDichVuForm.find('input[name=tienChietKhau]').val(tienChietKhau);
            calcThanhToan();
        });

        $('#TheKhachHangChiTiet_PTChietKhau').change(function () {
            var thanhTien = calcThanhTien();
            var isPercentage = _$theKhachHangInformationForm.find('input[name=isPercentage]').val();
            var discount = 0;
            if (_$theKhachHangInformationForm.find('input[name=voucherValue]').val() == undefined || _$theKhachHangInformationForm.find('input[name=voucherValue]').val() == "") {
                discount = 0;
            }
            else {
                discount = parseFloat(_$theKhachHangInformationForm.find('input[name=voucherValue]').val())
            }
            //if (discount > thanhTien) {
            //    abp.notify.warn(app.localize('TienChietKhauKhongTheLonHonThanhTien'));
            //}
            var ptChietKhau = parseFloat(_$chiTietDichVuForm.find('input[name=pTChietKhau]').val());
            var tienChietKhau = 0;
            if (isPercentage == "true") {
                tienChietKhau = thanhTien * (100 - discount) / 100 * ptChietKhau / 100;
            }
            else {
                tienChietKhau = (thanhTien - discount) * ptChietKhau / 100;
            }

            _$chiTietDichVuForm.find('input[name=tienChietKhau]').val(tienChietKhau);
            calcThanhToan();
        });
        $('#TheKhachHangChiTiet_TienChietKhau').change(function () {
            var thanhTien = calcThanhTien();
            var isPercentage = _$theKhachHangInformationForm.find('input[name=isPercentage]').val();
            var discount = 0;
            if (_$theKhachHangInformationForm.find('input[name=voucherValue]').val() == undefined || _$theKhachHangInformationForm.find('input[name=voucherValue]').val() == "") {
                discount = 0;
            }
            else {
                discount = parseFloat(_$theKhachHangInformationForm.find('input[name=voucherValue]').val())
            }
            if (discount > thanhTien) {
                abp.notify.warn(app.localize('TienChietKhauKhongTheLonHonThanhTien'));
            }
            var tienChietKhau = parseFloat(_$chiTietDichVuForm.find('input[name=tienChietKhau]').val());
            if (isPercentage == "true") {
                thanhTien = thanhTien * (100 - discount) / 100;
            }
            else {
                thanhTien = thanhTien - discount;
            }
            var ptChietKhau = tienChietKhau / thanhTien * 100;
            _$chiTietDichVuForm.find('input[name=pTChietKhau]').val(ptChietKhau);
            calcThanhToan();
        });
        $('#TheKhachHangChiTiet_SoLuong_TraLai').change(function () {
            var thanhTien = calcThanhTien();
            var discount = 0;
            if (_$theKhachHangInformationForm.find('input[name=voucherValue]').val() == undefined || _$theKhachHangInformationForm.find('input[name=voucherValue]').val() == "") {
                discount = 0;
            }
            else {
                discount = parseFloat(_$theKhachHangInformationForm.find('input[name=voucherValue]').val())
            }
            if (discount > thanhTien) {
                abp.notify.warn(app.localize('TienChietKhauKhongTheLonHonThanhTien'));
            }
            var ptChietKhau = parseFloat(_$chiTietDichVuForm.find('input[name=pTChietKhau]').val());
            var tienChietKhau = (thanhTien) * ptChietKhau / 100;
            _$chiTietDichVuForm.find('input[name=tienChietKhau]').val(tienChietKhau);
            calcThanhToan();
        })
        $('#TheKhachHangChiTiet_ThanhToan').change(function () {
            var thanhTien = calcThanhTien();

            var thanhToan = parseFloat(_$chiTietDichVuForm.find('input[name=thanhToan]').val());
            var discount = 0;
            if (_$theKhachHangInformationForm.find('input[name=voucherValue]').val() == undefined || _$theKhachHangInformationForm.find('input[name=voucherValue]').val() == "") {
                discount = 0;
            }
            else {
                discount = parseFloat(_$theKhachHangInformationForm.find('input[name=voucherValue]').val())
            }
            if (discount > thanhTien) {
                abp.notify.warn(app.localize('TienChietKhauKhongTheLonHonThanhTien'));
            }
            var ptChietKhau = (thanhTien - thanhToan) / thanhTien * 100;
            var tienChietKhau = thanhTien - thanhToan;
            _$chiTietDichVuForm.find('input[name=pTChietKhau]').val(ptChietKhau);
            _$chiTietDichVuForm.find('input[name=tienChietKhau]').val(tienChietKhau);
        })

        $('#HangHoaDichVuTabLink').click(function () {
            _$chitietTab = _$chitietTab == null ? ChiTietHangHoaDichVu(_modalManager) : _$chitietTab;
        });
        //$('#ChietKhauNhanVienTabLink').click(function () {
        //    _$chitietTab = _$chitietTab == null ? ChiTietHangHoaDichVu(_modalManager) : _$chitietTab;
        //});
        var saveData = function (callback) {
            
            var numberOfService = $('#ChiTietDichVuTable').DataTable().rows().count();
            var employees = $('#ChietKhauNhanViensTable').DataTable().rows().data();
            var numberOfEmployee = employees.count();
            if (numberOfService == 0) {
                abp.notify.info(app.localize('BanCanChonDichVu'));
                return;
            }
            if (numberOfEmployee == 0) {
                abp.notify.info(app.localize('BanCanThemNhanVien'));
                return;
            }
            
            var hasPrimarySale = false;
            var totalPercentage = 0;
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
            if (!hasPrimarySale) {
                abp.notify.info(app.localize('BanCanThemNhanVienChinh'));
                return;
            }
            if (!_$theKhachHangInformationForm.valid()) {
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