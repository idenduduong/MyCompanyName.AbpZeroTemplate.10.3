(function ($) {
    app.modals.CreateOrEditHoaDonBanLeChiTietModal = function () {

        var _hoaDonBanLeChiTietsService = abp.services.app.hoaDonBanLeChiTiets;

        var _modalManager;
        var _$hoaDonBanLeChiTietInformationForm = null;
        

        // declare modalManager for subview
		        var _hoaDonBanLeLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/HoaDonBanLeChiTiets/HoaDonBanLeLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/HoaDonBanLeChiTiets/_HoaDonBanLeLookupTableModal.js',
            modalClass: 'HoaDonBanLeLookupTableModal'
        });        var _dM_HangHoaLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/HoaDonBanLeChiTiets/DM_HangHoaLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/HoaDonBanLeChiTiets/_DM_HangHoaLookupTableModal.js',
            modalClass: 'DM_HangHoaLookupTableModal'
        });        var _dM_KhoLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/HoaDonBanLeChiTiets/DM_KhoLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/HoaDonBanLeChiTiets/_DM_KhoLookupTableModal.js',
            modalClass: 'DM_KhoLookupTableModal'
        });        var _dM_DonViTinhLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/HoaDonBanLeChiTiets/DM_DonViTinhLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/HoaDonBanLeChiTiets/_DM_DonViTinhLookupTableModal.js',
            modalClass: 'DM_DonViTinhLookupTableModal'
        });        var _dM_LoHangLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/HoaDonBanLeChiTiets/DM_LoHangLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/HoaDonBanLeChiTiets/_DM_LoHangLookupTableModal.js',
            modalClass: 'DM_LoHangLookupTableModal'
        });
        var _dM_ThueSuatLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/HoaDonBanLeChiTiets/DM_ThueSuatLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/HoaDonBanLeChiTiets/_DM_ThueSuatLookupTableModal.js',
            modalClass: 'DM_ThueSuatLookupTableModal'
        });
        var _theLanLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/HoaDonBanLeChiTiets/TheLanLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/HoaDonBanLeChiTiets/_TheLanLookupTableModal.js',
            modalClass: 'TheLanLookupTableModal'
        });

        // declare common function
        
        function calcThanhTien() {
            var donGia = parseFloat(_$hoaDonBanLeChiTietInformationForm.find('input[name=donGia]').val());
            var soLuong = parseFloat(_$hoaDonBanLeChiTietInformationForm.find('input[name=soLuong]').val());
            var traLai = parseFloat(_$hoaDonBanLeChiTietInformationForm.find('input[name=soLuong_TL]').val() == "" ? 0 : _$hoaDonBanLeChiTietInformationForm.find('input[name=soLuong_TL]').val());
            if (traLai > soLuong) {
                abp.notify.info(app.localize('SoLuongTraLaiKhongTheLonHonSoLuong'));
                return;
            }
            var thanhTien = donGia * (soLuong - traLai);
            _$hoaDonBanLeChiTietInformationForm.find('input[name=thanhTien]').val(thanhTien);
            return thanhTien;
        }

        function calcThanhToan() {
            var thanhTien = calcThanhTien();
            var tienChietKhau = parseFloat(_$hoaDonBanLeChiTietInformationForm.find('input[name=tienChietKhau]').val());
            var thanhToan = thanhTien - tienChietKhau
            _$hoaDonBanLeChiTietInformationForm.find('input[name=thanhToan]').val(thanhToan);
            return thanhToan;
        }
        

        // init Component
        var initComponents = function (modal) {
            modal.find('.numeric').number( true, 0 );;
            modal.find('.date-picker').datetimepicker({
                locale: abp.localization.currentLanguage.name,
                format: 'L'
            });
            modal.find('.date-picker').each(function () {
                if ($(this).val() == "01/01/0001") {
                    $(this).data("DateTimePicker").date(new Date());
                }
            })
        };

        // declare event Handler
        var declareEventHandler = function () {
            $('#OpenHoaDonBanLeLookupTableButton').click(function () {

                var hoaDonBanLeChiTiet = _$hoaDonBanLeChiTietInformationForm.serializeFormToObject();

                _hoaDonBanLeLookupTableModal.open({ id: hoaDonBanLeChiTiet.iD_HoaDon, displayName: hoaDonBanLeChiTiet.hoaDonBanLeMaHoaDon }, function (data) {
                    _$hoaDonBanLeChiTietInformationForm.find('input[name=hoaDonBanLeMaHoaDon]').val(data.displayName);
                    _$hoaDonBanLeChiTietInformationForm.find('input[name=iD_HoaDon]').val(data.id);
                });
            });

            $('#ClearHoaDonBanLeMaHoaDonButton').click(function () {
                _$hoaDonBanLeChiTietInformationForm.find('input[name=hoaDonBanLeMaHoaDon]').val('');
                _$hoaDonBanLeChiTietInformationForm.find('input[name=iD_HoaDon]').val('');
            });

            $('#OpenDM_HangHoaLookupTableButton').click(function () {
                var hoaDonBanLeChiTiet = _$hoaDonBanLeChiTietInformationForm.serializeFormToObject();

                _dM_HangHoaLookupTableModal.open({ id: hoaDonBanLeChiTiet.iD_HangHoa, displayName: hoaDonBanLeChiTiet.dM_HangHoaTenHangHoa }, function (data) {
                    _$hoaDonBanLeChiTietInformationForm.find('input[name=dM_HangHoaTenHangHoa]').val(data.code + " - " + data.displayName);
                    _$hoaDonBanLeChiTietInformationForm.find('input[name=iD_HangHoa]').val(data.id);
                    _$hoaDonBanLeChiTietInformationForm.find('input[name=donGia]').val(data.donGia);
                    _$hoaDonBanLeChiTietInformationForm.find('input[name=dM_DonViTinhTenDonViTinh]').val(data.donViTinh);
                    _$hoaDonBanLeChiTietInformationForm.find('input[name=iD_DonViTinh]').val(data.iD_DonViTinh);
                });
            });

            $('#ClearDM_HangHoaTenHangHoaButton').click(function () {
                _$hoaDonBanLeChiTietInformationForm.find('input[name=dM_HangHoaTenHangHoa]').val('');
                _$hoaDonBanLeChiTietInformationForm.find('input[name=iD_HangHoa]').val('');
            });

            $('#OpenDM_KhoLookupTableButton').click(function () {

                var hoaDonBanLeChiTiet = _$hoaDonBanLeChiTietInformationForm.serializeFormToObject();

                _dM_KhoLookupTableModal.open({ id: hoaDonBanLeChiTiet.iD_KhoHang, displayName: hoaDonBanLeChiTiet.dM_KhoTenKho }, function (data) {
                    _$hoaDonBanLeChiTietInformationForm.find('input[name=dM_KhoTenKho]').val(data.displayName);
                    _$hoaDonBanLeChiTietInformationForm.find('input[name=iD_KhoHang]').val(data.id);
                });
            });

            $('#ClearDM_KhoTenKhoButton').click(function () {
                _$hoaDonBanLeChiTietInformationForm.find('input[name=dM_KhoTenKho]').val('');
                _$hoaDonBanLeChiTietInformationForm.find('input[name=iD_KhoHang]').val('');
            });

            $('#OpenDM_DonViTinhLookupTableButton').click(function () {

                var hoaDonBanLeChiTiet = _$hoaDonBanLeChiTietInformationForm.serializeFormToObject();

                _dM_DonViTinhLookupTableModal.open({ id: hoaDonBanLeChiTiet.iD_DonViTinh, displayName: hoaDonBanLeChiTiet.dM_DonViTinhTenDonViTinh }, function (data) {
                    _$hoaDonBanLeChiTietInformationForm.find('input[name=dM_DonViTinhTenDonViTinh]').val(data.displayName);
                    _$hoaDonBanLeChiTietInformationForm.find('input[name=iD_DonViTinh]').val(data.id);
                });
            });

            $('#ClearDM_DonViTinhTenDonViTinhButton').click(function () {
                _$hoaDonBanLeChiTietInformationForm.find('input[name=dM_DonViTinhTenDonViTinh]').val('');
                _$hoaDonBanLeChiTietInformationForm.find('input[name=iD_DonViTinh]').val('');
            });

            $('#OpenDM_LoHangLookupTableButton').click(function () {

                var hoaDonBanLeChiTiet = _$hoaDonBanLeChiTietInformationForm.serializeFormToObject();

                _dM_LoHangLookupTableModal.open({ id: hoaDonBanLeChiTiet.iD_LoHang, displayName: hoaDonBanLeChiTiet.dM_LoHangSoLo }, function (data) {
                    _$hoaDonBanLeChiTietInformationForm.find('input[name=dM_LoHangSoLo]').val(data.displayName);
                    _$hoaDonBanLeChiTietInformationForm.find('input[name=iD_LoHang]').val(data.id);
                });
            });

            $('#ClearDM_LoHangSoLoButton').click(function () {
                _$hoaDonBanLeChiTietInformationForm.find('input[name=dM_LoHangSoLo]').val('');
                _$hoaDonBanLeChiTietInformationForm.find('input[name=iD_LoHang]').val('');
            });

            $('#OpenDM_ThueSuatLookupTableButton').click(function () {

                var hoaDonBanLeChiTiet = _$hoaDonBanLeChiTietInformationForm.serializeFormToObject();

                _dM_ThueSuatLookupTableModal.open({ id: hoaDonBanLeChiTiet.iD_ThueSuat, displayName: hoaDonBanLeChiTiet.dM_ThueSuatMaThueSuat }, function (data) {
                    _$hoaDonBanLeChiTietInformationForm.find('input[name=dM_ThueSuatMaThueSuat]').val(data.displayName);
                    _$hoaDonBanLeChiTietInformationForm.find('input[name=iD_ThueSuat]').val(data.id);
                });
            });
            $('#OpenTheLanLookupTableButton').click(function () {
                var hangHoaId = $('input[name=iD_HangHoa]').val();
                var khachHangId = $('input[name=iD_KhachHang]').val();
                var hoaDonBanLeChiTiet = _$hoaDonBanLeChiTietInformationForm.serializeFormToObject();

                _theLanLookupTableModal.open({ displayName: hoaDonBanLeChiTiet.maTheLan, hangHoaId: hangHoaId, khachHangId: khachHangId }, function (data) {
                    _$hoaDonBanLeChiTietInformationForm.find('input[name=maTheLan]').val(data.maThe);
                });
            });
            $('#ClearDM_ThueSuatMaThueSuatButton').click(function () {
                _$hoaDonBanLeChiTietInformationForm.find('input[name=dM_ThueSuatMaThueSuat]').val('');
                _$hoaDonBanLeChiTietInformationForm.find('input[name=iD_ThueSuat]').val('');
            });

            $('#ClearDM_ThueSuatMaThueSuatButton').click(function () {
                _$hoaDonBanLeChiTietInformationForm.find('input[name=dM_ThueSuatMaThueSuat]').val('');
                _$hoaDonBanLeChiTietInformationForm.find('input[name=iD_ThueSuat]').val('');
            });

            $('#HoaDonBanLeChiTiet_DonGia').change(function () {
                var thanhTien=calcThanhTien();
                var ptChietKhau = parseFloat(_$hoaDonBanLeChiTietInformationForm.find('input[name=pTChietKhau]').val());
                var tienChietKhau = thanhTien * ptChietKhau / 100;
                _$hoaDonBanLeChiTietInformationForm.find('input[name=tienChietKhau]').val(tienChietKhau);
                calcThanhToan();
            });

            $('#HoaDonBanLeChiTiet_SoLuong').change(function () {
                
                var thanhTien = calcThanhTien();
                var ptChietKhau = parseFloat(_$hoaDonBanLeChiTietInformationForm.find('input[name=pTChietKhau]').val());
                var tienChietKhau = thanhTien * ptChietKhau / 100;
                _$hoaDonBanLeChiTietInformationForm.find('input[name=tienChietKhau]').val(tienChietKhau);
                calcThanhToan();
            });

            $('#HoaDonBanLeChiTiet_PTChietKhau').change(function () {
                var thanhTien = calcThanhTien();
                var ptChietKhau = parseFloat(_$hoaDonBanLeChiTietInformationForm.find('input[name=pTChietKhau]').val());
                var tienChietKhau = thanhTien * ptChietKhau / 100;
                _$hoaDonBanLeChiTietInformationForm.find('input[name=tienChietKhau]').val(tienChietKhau);
                calcThanhToan();
            });
            $('#HoaDonBanLeChiTiet_TienChietKhau').change(function () {
                var thanhTien = calcThanhTien();
                
                var tienChietKhau= parseFloat(_$hoaDonBanLeChiTietInformationForm.find('input[name=tienChietKhau]').val());
                var ptChietKhau = tienChietKhau/thanhTien * 100;
                _$hoaDonBanLeChiTietInformationForm.find('input[name=pTChietKhau]').val(ptChietKhau);
                calcThanhToan();
            });
            $('#HoaDonBanLeChiTiet_SoLuong_TL').change(function () {
                var thanhTien = calcThanhTien();
                var ptChietKhau = parseFloat(_$hoaDonBanLeChiTietInformationForm.find('input[name=pTChietKhau]').val());
                var tienChietKhau = thanhTien * ptChietKhau / 100;
                _$hoaDonBanLeChiTietInformationForm.find('input[name=tienChietKhau]').val(tienChietKhau);
                calcThanhToan();
            })
            $('#HoaDonBanLeChiTiet_ThanhToan').change(function () {
                var thanhTien = calcThanhTien();
                
                var thanhToan = parseFloat(_$hoaDonBanLeChiTietInformationForm.find('input[name=thanhToan]').val());
                var ptChietKhau = (thanhTien - thanhToan)/thanhTien * 100;
                var tienChietKhau = thanhTien-thanhToan;
            })
        };
        
        // init modal
        this.init = function (modalManager) {
            _modalManager = modalManager;

			var modal = _modalManager.getModal();
            
            initComponents(modal);
            declareEventHandler();
            _$hoaDonBanLeChiTietInformationForm = _modalManager.getModal().find('form[name=HoaDonBanLeChiTietInformationsForm]');
            _$hoaDonBanLeChiTietInformationForm.validate();
        };

        // save event
        this.save = function () {
            if (!_$hoaDonBanLeChiTietInformationForm.valid()) {
                return;
            }

            var hoaDonBanLeChiTiet = _$hoaDonBanLeChiTietInformationForm.serializeFormToObject();
			 _modalManager.setBusy(true);
			 _hoaDonBanLeChiTietsService.createOrEdit(
				hoaDonBanLeChiTiet
			 ).done(function () {
               abp.notify.info(app.localize('SavedSuccessfully'));
               _modalManager.close();
               abp.event.trigger('app.createOrEditHoaDonBanLeChiTietModalSaved');
			 }).always(function () {
               _modalManager.setBusy(false);
			});
        };
    };
})(jQuery);