(function ($) {
    app.modals.CreateOrEditNhanVienThucHienModal = function () {

        var _nhanVienThucHiensService = abp.services.app.nhanVienThucHiens;

        var _modalManager;
        var _$nhanVienThucHienInformationForm = null;

		        var _dM_LoaiChungTuLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/NhanVienThucHiens/DM_LoaiChungTuLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/NhanVienThucHiens/_DM_LoaiChungTuLookupTableModal.js',
            modalClass: 'DM_LoaiChungTuLookupTableModal'
        });        var _userLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/NhanVienThucHiens/UserLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/NhanVienThucHiens/_UserLookupTableModal.js',
            modalClass: 'UserLookupTableModal'
        });        var _dM_HangHoaLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/NhanVienThucHiens/DM_HangHoaLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/NhanVienThucHiens/_DM_HangHoaLookupTableModal.js',
            modalClass: 'DM_HangHoaLookupTableModal'
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

            _$nhanVienThucHienInformationForm = _modalManager.getModal().find('form[name=NhanVienThucHienInformationsForm]');
            _$nhanVienThucHienInformationForm.validate();
        };

		          $('#OpenDM_LoaiChungTuLookupTableButton').click(function () {

            var nhanVienThucHien = _$nhanVienThucHienInformationForm.serializeFormToObject();

            _dM_LoaiChungTuLookupTableModal.open({ id: nhanVienThucHien.loaiChungTu, displayName: nhanVienThucHien.dM_LoaiChungTuLoaiChungTu }, function (data) {
                _$nhanVienThucHienInformationForm.find('input[name=dM_LoaiChungTuLoaiChungTu]').val(data.displayName); 
                _$nhanVienThucHienInformationForm.find('input[name=loaiChungTu]').val(data.id); 
            });
        });
		
		$('#ClearDM_LoaiChungTuLoaiChungTuButton').click(function () {
                _$nhanVienThucHienInformationForm.find('input[name=dM_LoaiChungTuLoaiChungTu]').val(''); 
                _$nhanVienThucHienInformationForm.find('input[name=loaiChungTu]').val(''); 
        });
		
        $('#OpenUserLookupTableButton').click(function () {

            var nhanVienThucHien = _$nhanVienThucHienInformationForm.serializeFormToObject();

            _userLookupTableModal.open({ id: nhanVienThucHien.nhanVien, displayName: nhanVienThucHien.userName }, function (data) {
                _$nhanVienThucHienInformationForm.find('input[name=userName]').val(data.displayName); 
                _$nhanVienThucHienInformationForm.find('input[name=nhanVien]').val(data.id); 
            });
        });
		
		$('#ClearUserNameButton').click(function () {
                _$nhanVienThucHienInformationForm.find('input[name=userName]').val(''); 
                _$nhanVienThucHienInformationForm.find('input[name=nhanVien]').val(''); 
        });
		
        $('#OpenDM_HangHoaLookupTableButton').click(function () {

            var nhanVienThucHien = _$nhanVienThucHienInformationForm.serializeFormToObject();

            _dM_HangHoaLookupTableModal.open({ id: nhanVienThucHien.iD_CongViec, displayName: nhanVienThucHien.dM_HangHoaTenHangHoa }, function (data) {
                _$nhanVienThucHienInformationForm.find('input[name=dM_HangHoaTenHangHoa]').val(data.displayName); 
                _$nhanVienThucHienInformationForm.find('input[name=iD_CongViec]').val(data.id); 
            });
        });
		
		$('#ClearDM_HangHoaTenHangHoaButton').click(function () {
                _$nhanVienThucHienInformationForm.find('input[name=dM_HangHoaTenHangHoa]').val(''); 
                _$nhanVienThucHienInformationForm.find('input[name=iD_CongViec]').val(''); 
        });
		
        $('#OpenUser2LookupTableButton').click(function () {

            var nhanVienThucHien = _$nhanVienThucHienInformationForm.serializeFormToObject();

            _userLookupTableModal.open({ id: nhanVienThucHien.iD_NhanVienChinh, displayName: nhanVienThucHien.userName2 }, function (data) {
                _$nhanVienThucHienInformationForm.find('input[name=userName2]').val(data.displayName); 
                _$nhanVienThucHienInformationForm.find('input[name=iD_NhanVienChinh]').val(data.id); 
            });
        });
		
		$('#ClearUserName2Button').click(function () {
                _$nhanVienThucHienInformationForm.find('input[name=userName2]').val(''); 
                _$nhanVienThucHienInformationForm.find('input[name=iD_NhanVienChinh]').val(''); 
        });
		


        this.save = function () {
            if (!_$nhanVienThucHienInformationForm.valid()) {
                return;
            }

            var nhanVienThucHien = _$nhanVienThucHienInformationForm.serializeFormToObject();
			 _modalManager.setBusy(true);
			 _nhanVienThucHiensService.createOrEdit(
				nhanVienThucHien
			 ).done(function () {
               abp.notify.info(app.localize('SavedSuccessfully'));
               _modalManager.close();
               abp.event.trigger('app.createOrEditNhanVienThucHienModalSaved');
			 }).always(function () {
               _modalManager.setBusy(false);
			});
        };
    };
})(jQuery);