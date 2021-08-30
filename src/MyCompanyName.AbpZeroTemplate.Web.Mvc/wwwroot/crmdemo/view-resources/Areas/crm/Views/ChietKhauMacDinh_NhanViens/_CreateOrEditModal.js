(function ($) {
    app.modals.CreateOrEditChietKhauMacDinh_NhanVienModal = function () {

        var _chietKhauMacDinh_NhanViensService = abp.services.app.chietKhauMacDinh_NhanViens;

        var _modalManager;
        var _$chietKhauMacDinh_NhanVienInformationForm = null;

		        var _dM_HangHoaLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/ChietKhauMacDinh_NhanViens/DM_HangHoaLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/ChietKhauMacDinh_NhanViens/_DM_HangHoaLookupTableModal.js',
            modalClass: 'DM_HangHoaLookupTableModal'
        });        var _userLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/ChietKhauMacDinh_NhanViens/UserLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/ChietKhauMacDinh_NhanViens/_UserLookupTableModal.js',
            modalClass: 'UserLookupTableModal'
        });        var _dM_DonViLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/ChietKhauMacDinh_NhanViens/DM_DonViLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/ChietKhauMacDinh_NhanViens/_DM_DonViLookupTableModal.js',
            modalClass: 'DM_DonViLookupTableModal'
        });        var _dM_NhomHangHoaLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/ChietKhauMacDinh_NhanViens/DM_NhomHangHoaLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/ChietKhauMacDinh_NhanViens/_DM_NhomHangHoaLookupTableModal.js',
            modalClass: 'DM_NhomHangHoaLookupTableModal'
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

            _$chietKhauMacDinh_NhanVienInformationForm = _modalManager.getModal().find('form[name=ChietKhauMacDinh_NhanVienInformationsForm]');
            _$chietKhauMacDinh_NhanVienInformationForm.validate();
        };

		          $('#OpenDM_HangHoaLookupTableButton').click(function () {

            var chietKhauMacDinh_NhanVien = _$chietKhauMacDinh_NhanVienInformationForm.serializeFormToObject();

            _dM_HangHoaLookupTableModal.open({ id: chietKhauMacDinh_NhanVien.dM_HangHoaId, displayName: chietKhauMacDinh_NhanVien.dM_HangHoaTenHangHoa }, function (data) {
                _$chietKhauMacDinh_NhanVienInformationForm.find('input[name=dM_HangHoaTenHangHoa]').val(data.displayName); 
                _$chietKhauMacDinh_NhanVienInformationForm.find('input[name=dM_HangHoaId]').val(data.id); 
            });
        });
		
		$('#ClearDM_HangHoaTenHangHoaButton').click(function () {
                _$chietKhauMacDinh_NhanVienInformationForm.find('input[name=dM_HangHoaTenHangHoa]').val(''); 
                _$chietKhauMacDinh_NhanVienInformationForm.find('input[name=dM_HangHoaId]').val(''); 
        });
		
        $('#OpenUserLookupTableButton').click(function () {

            var chietKhauMacDinh_NhanVien = _$chietKhauMacDinh_NhanVienInformationForm.serializeFormToObject();

            _userLookupTableModal.open({ id: chietKhauMacDinh_NhanVien.userId, displayName: chietKhauMacDinh_NhanVien.userName }, function (data) {
                _$chietKhauMacDinh_NhanVienInformationForm.find('input[name=userName]').val(data.displayName); 
                _$chietKhauMacDinh_NhanVienInformationForm.find('input[name=userId]').val(data.id); 
            });
        });
		
		$('#ClearUserNameButton').click(function () {
                _$chietKhauMacDinh_NhanVienInformationForm.find('input[name=userName]').val(''); 
                _$chietKhauMacDinh_NhanVienInformationForm.find('input[name=userId]').val(''); 
        });
		
        $('#OpenDM_DonViLookupTableButton').click(function () {

            var chietKhauMacDinh_NhanVien = _$chietKhauMacDinh_NhanVienInformationForm.serializeFormToObject();

            _dM_DonViLookupTableModal.open({ id: chietKhauMacDinh_NhanVien.dM_DonViId, displayName: chietKhauMacDinh_NhanVien.dM_DonViTenDonVi }, function (data) {
                _$chietKhauMacDinh_NhanVienInformationForm.find('input[name=dM_DonViTenDonVi]').val(data.displayName); 
                _$chietKhauMacDinh_NhanVienInformationForm.find('input[name=dM_DonViId]').val(data.id); 
            });
        });
		
		$('#ClearDM_DonViTenDonViButton').click(function () {
                _$chietKhauMacDinh_NhanVienInformationForm.find('input[name=dM_DonViTenDonVi]').val(''); 
                _$chietKhauMacDinh_NhanVienInformationForm.find('input[name=dM_DonViId]').val(''); 
        });
		
        $('#OpenDM_NhomHangHoaLookupTableButton').click(function () {

            var chietKhauMacDinh_NhanVien = _$chietKhauMacDinh_NhanVienInformationForm.serializeFormToObject();

            _dM_NhomHangHoaLookupTableModal.open({ id: chietKhauMacDinh_NhanVien.dM_NhomHangHoaId, displayName: chietKhauMacDinh_NhanVien.dM_NhomHangHoaTenNhom }, function (data) {
                _$chietKhauMacDinh_NhanVienInformationForm.find('input[name=dM_NhomHangHoaTenNhom]').val(data.displayName); 
                _$chietKhauMacDinh_NhanVienInformationForm.find('input[name=dM_NhomHangHoaId]').val(data.id); 
            });
        });
		
		$('#ClearDM_NhomHangHoaTenNhomButton').click(function () {
                _$chietKhauMacDinh_NhanVienInformationForm.find('input[name=dM_NhomHangHoaTenNhom]').val(''); 
                _$chietKhauMacDinh_NhanVienInformationForm.find('input[name=dM_NhomHangHoaId]').val(''); 
        });
		


        this.save = function () {
            if (!_$chietKhauMacDinh_NhanVienInformationForm.valid()) {
                return;
            }

            var chietKhauMacDinh_NhanVien = _$chietKhauMacDinh_NhanVienInformationForm.serializeFormToObject();
			 _modalManager.setBusy(true);
			 _chietKhauMacDinh_NhanViensService.createOrEdit(
				chietKhauMacDinh_NhanVien
			 ).done(function () {
               abp.notify.info(app.localize('SavedSuccessfully'));
               _modalManager.close();
               abp.event.trigger('app.createOrEditChietKhauMacDinh_NhanVienModalSaved');
			 }).always(function () {
               _modalManager.setBusy(false);
			});
        };
    };
})(jQuery);