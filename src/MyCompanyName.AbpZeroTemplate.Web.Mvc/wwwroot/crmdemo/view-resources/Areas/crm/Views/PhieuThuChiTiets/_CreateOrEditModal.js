(function ($) {
    app.modals.CreateOrEditPhieuThuChiTietModal = function () {

        var _phieuThuChiTietsService = abp.services.app.phieuThuChiTiets;

        var _modalManager;
        var _$phieuThuChiTietInformationForm = null;

		        var _phieuThuLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/PhieuThuChiTiets/PhieuThuLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/PhieuThuChiTiets/_PhieuThuLookupTableModal.js',
            modalClass: 'PhieuThuLookupTableModal'
        });        var _dM_DoiTuongLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/PhieuThuChiTiets/DM_DoiTuongLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/PhieuThuChiTiets/_DM_DoiTuongLookupTableModal.js',
            modalClass: 'DM_DoiTuongLookupTableModal'
        });        var _dM_NganHangLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/PhieuThuChiTiets/DM_NganHangLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/PhieuThuChiTiets/_DM_NganHangLookupTableModal.js',
            modalClass: 'DM_NganHangLookupTableModal'
        });        var _userLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/PhieuThuChiTiets/UserLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/PhieuThuChiTiets/_UserLookupTableModal.js',
            modalClass: 'UserLookupTableModal'
        });        var _khoanChiPhi_DoanhThuLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/PhieuThuChiTiets/KhoanChiPhi_DoanhThuLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/PhieuThuChiTiets/_KhoanChiPhi_DoanhThuLookupTableModal.js',
            modalClass: 'KhoanChiPhi_DoanhThuLookupTableModal'
        });        var _theKhachHangLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/PhieuThuChiTiets/TheKhachHangLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/PhieuThuChiTiets/_TheKhachHangLookupTableModal.js',
            modalClass: 'TheKhachHangLookupTableModal'
        });        var _dM_LoaiChungTuLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/PhieuThuChiTiets/DM_LoaiChungTuLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/PhieuThuChiTiets/_DM_LoaiChungTuLookupTableModal.js',
            modalClass: 'DM_LoaiChungTuLookupTableModal'
        });

        this.init = function (modalManager) {
            _modalManager = modalManager;

			var modal = _modalManager.getModal();
            modal.find('.numeric').number( true, 0 );;
            modal.find('.date-picker').datetimepicker({
                locale: abp.localization.currentLanguage.name,
                format: 'L'
            });
            modal.find('.date-picker').each(function(){
                if($(this).val()=="01/01/0001"){
                    $(this).data("DateTimePicker").date(new Date());
                }
            })

            _$phieuThuChiTietInformationForm = _modalManager.getModal().find('form[name=PhieuThuChiTietInformationsForm]');
            _$phieuThuChiTietInformationForm.validate();
        };

		          $('#OpenPhieuThuLookupTableButton').click(function () {

            var phieuThuChiTiet = _$phieuThuChiTietInformationForm.serializeFormToObject();

            _phieuThuLookupTableModal.open({ id: phieuThuChiTiet.iD_PhieuThu, displayName: phieuThuChiTiet.phieuThuMaPhieuThu }, function (data) {
                _$phieuThuChiTietInformationForm.find('input[name=phieuThuMaPhieuThu]').val(data.displayName); 
                _$phieuThuChiTietInformationForm.find('input[name=iD_PhieuThu]').val(data.id); 
            });
        });
		
		$('#ClearPhieuThuMaPhieuThuButton').click(function () {
                _$phieuThuChiTietInformationForm.find('input[name=phieuThuMaPhieuThu]').val(''); 
                _$phieuThuChiTietInformationForm.find('input[name=iD_PhieuThu]').val(''); 
        });
		
        $('#OpenDM_DoiTuongLookupTableButton').click(function () {

            var phieuThuChiTiet = _$phieuThuChiTietInformationForm.serializeFormToObject();

            _dM_DoiTuongLookupTableModal.open({ id: phieuThuChiTiet.iD_KhachHang, displayName: phieuThuChiTiet.dM_DoiTuongTenDoiTuong }, function (data) {
                _$phieuThuChiTietInformationForm.find('input[name=dM_DoiTuongTenDoiTuong]').val(data.displayName); 
                _$phieuThuChiTietInformationForm.find('input[name=iD_KhachHang]').val(data.id); 
            });
        });
		
		$('#ClearDM_DoiTuongTenDoiTuongButton').click(function () {
                _$phieuThuChiTietInformationForm.find('input[name=dM_DoiTuongTenDoiTuong]').val(''); 
                _$phieuThuChiTietInformationForm.find('input[name=iD_KhachHang]').val(''); 
        });
		
        $('#OpenDM_NganHangLookupTableButton').click(function () {

            var phieuThuChiTiet = _$phieuThuChiTietInformationForm.serializeFormToObject();

            _dM_NganHangLookupTableModal.open({ id: phieuThuChiTiet.iD_NganHang, displayName: phieuThuChiTiet.dM_NganHangTenNganHang }, function (data) {
                _$phieuThuChiTietInformationForm.find('input[name=dM_NganHangTenNganHang]').val(data.displayName); 
                _$phieuThuChiTietInformationForm.find('input[name=iD_NganHang]').val(data.id); 
            });
        });
		
		$('#ClearDM_NganHangTenNganHangButton').click(function () {
                _$phieuThuChiTietInformationForm.find('input[name=dM_NganHangTenNganHang]').val(''); 
                _$phieuThuChiTietInformationForm.find('input[name=iD_NganHang]').val(''); 
        });
		
        $('#OpenUserLookupTableButton').click(function () {

            var phieuThuChiTiet = _$phieuThuChiTietInformationForm.serializeFormToObject();

            _userLookupTableModal.open({ id: phieuThuChiTiet.userId, displayName: phieuThuChiTiet.userName }, function (data) {
                _$phieuThuChiTietInformationForm.find('input[name=userName]').val(data.displayName); 
                _$phieuThuChiTietInformationForm.find('input[name=userId]').val(data.id); 
            });
        });
		
		$('#ClearUserNameButton').click(function () {
                _$phieuThuChiTietInformationForm.find('input[name=userName]').val(''); 
                _$phieuThuChiTietInformationForm.find('input[name=userId]').val(''); 
        });
		
        $('#OpenKhoanChiPhi_DoanhThuLookupTableButton').click(function () {

            var phieuThuChiTiet = _$phieuThuChiTietInformationForm.serializeFormToObject();

            _khoanChiPhi_DoanhThuLookupTableModal.open({ id: phieuThuChiTiet.iD_KhoanThu, displayName: phieuThuChiTiet.khoanChiPhi_DoanhThuMa }, function (data) {
                _$phieuThuChiTietInformationForm.find('input[name=khoanChiPhi_DoanhThuMa]').val(data.displayName); 
                _$phieuThuChiTietInformationForm.find('input[name=iD_KhoanThu]').val(data.id); 
            });
        });
		
		$('#ClearKhoanChiPhi_DoanhThuMaButton').click(function () {
                _$phieuThuChiTietInformationForm.find('input[name=khoanChiPhi_DoanhThuMa]').val(''); 
                _$phieuThuChiTietInformationForm.find('input[name=iD_KhoanThu]').val(''); 
        });
		
        $('#OpenTheKhachHangLookupTableButton').click(function () {

            var phieuThuChiTiet = _$phieuThuChiTietInformationForm.serializeFormToObject();

            _theKhachHangLookupTableModal.open({ id: phieuThuChiTiet.iD_TheThoanhToan, displayName: phieuThuChiTiet.theKhachHangMaThe }, function (data) {
                _$phieuThuChiTietInformationForm.find('input[name=theKhachHangMaThe]').val(data.displayName); 
                _$phieuThuChiTietInformationForm.find('input[name=iD_TheThoanhToan]').val(data.id); 
            });
        });
		
		$('#ClearTheKhachHangMaTheButton').click(function () {
                _$phieuThuChiTietInformationForm.find('input[name=theKhachHangMaThe]').val(''); 
                _$phieuThuChiTietInformationForm.find('input[name=iD_TheThoanhToan]').val(''); 
        });
		
        $('#OpenDM_LoaiChungTuLookupTableButton').click(function () {

            var phieuThuChiTiet = _$phieuThuChiTietInformationForm.serializeFormToObject();

            _dM_LoaiChungTuLookupTableModal.open({ id: phieuThuChiTiet.loaiCT, displayName: phieuThuChiTiet.dM_LoaiChungTuLoaiChungTu }, function (data) {
                _$phieuThuChiTietInformationForm.find('input[name=dM_LoaiChungTuLoaiChungTu]').val(data.displayName); 
                _$phieuThuChiTietInformationForm.find('input[name=loaiCT]').val(data.id); 
            });
        });
		
		$('#ClearDM_LoaiChungTuLoaiChungTuButton').click(function () {
                _$phieuThuChiTietInformationForm.find('input[name=dM_LoaiChungTuLoaiChungTu]').val(''); 
                _$phieuThuChiTietInformationForm.find('input[name=loaiCT]').val(''); 
        });
		


        this.save = function () {
            if (!_$phieuThuChiTietInformationForm.valid()) {
                return;
            }

            var phieuThuChiTiet = _$phieuThuChiTietInformationForm.serializeFormToObject();
			 _modalManager.setBusy(true);
			 _phieuThuChiTietsService.createOrEdit(
				phieuThuChiTiet
			 ).done(function () {
               abp.notify.info(app.localize('SavedSuccessfully'));
               _modalManager.close();
               abp.event.trigger('app.createOrEditPhieuThuChiTietModalSaved');
			 }).always(function () {
               _modalManager.setBusy(false);
			});
        };
    };
})(jQuery);