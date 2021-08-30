(function ($) {
    app.modals.CreateOrEditTuVanKhachHangModal = function () {

        var _tuVanKhachHangsService = abp.services.app.tuVanKhachHangs;

        var _modalManager;
        var _$tuVanKhachHangInformationForm = null;

		        var _organizationUnitLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/TuVanKhachHangs/OrganizationUnitLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/TuVanKhachHangs/_OrganizationUnitLookupTableModal.js',
            modalClass: 'OrganizationUnitLookupTableModal'
        });        var _userLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/TuVanKhachHangs/UserLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/TuVanKhachHangs/_UserLookupTableModal.js',
            modalClass: 'UserLookupTableModal'
        });        var _dM_DoiTuongLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/TuVanKhachHangs/DM_DoiTuongLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/TuVanKhachHangs/_DM_DoiTuongLookupTableModal.js',
            modalClass: 'DM_DoiTuongLookupTableModal'
        });        var _dM_HangHoaLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/TuVanKhachHangs/DM_HangHoaLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/TuVanKhachHangs/_DM_HangHoaLookupTableModal.js',
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

            _$tuVanKhachHangInformationForm = _modalManager.getModal().find('form[name=TuVanKhachHangInformationsForm]');
            _$tuVanKhachHangInformationForm.validate();
        };

		          $('#OpenOrganizationUnitLookupTableButton').click(function () {

            var tuVanKhachHang = _$tuVanKhachHangInformationForm.serializeFormToObject();

            _organizationUnitLookupTableModal.open({ id: tuVanKhachHang.iD_DonVi, displayName: tuVanKhachHang.organizationUnitDisplayName }, function (data) {
                _$tuVanKhachHangInformationForm.find('input[name=organizationUnitDisplayName]').val(data.displayName); 
                _$tuVanKhachHangInformationForm.find('input[name=iD_DonVi]').val(data.id); 
            });
        });
		
		$('#ClearOrganizationUnitDisplayNameButton').click(function () {
                _$tuVanKhachHangInformationForm.find('input[name=organizationUnitDisplayName]').val(''); 
                _$tuVanKhachHangInformationForm.find('input[name=iD_DonVi]').val(''); 
        });
		
        $('#OpenUserLookupTableButton').click(function () {

            var tuVanKhachHang = _$tuVanKhachHangInformationForm.serializeFormToObject();

            _userLookupTableModal.open({ id: tuVanKhachHang.iD_NhanVien, displayName: tuVanKhachHang.userName }, function (data) {
                _$tuVanKhachHangInformationForm.find('input[name=userName]').val(data.displayName); 
                _$tuVanKhachHangInformationForm.find('input[name=iD_NhanVien]').val(data.id); 
            });
        });
		
		$('#ClearUserNameButton').click(function () {
                _$tuVanKhachHangInformationForm.find('input[name=userName]').val(''); 
                _$tuVanKhachHangInformationForm.find('input[name=iD_NhanVien]').val(''); 
        });
		
        $('#OpenDM_DoiTuongLookupTableButton').click(function () {

            var tuVanKhachHang = _$tuVanKhachHangInformationForm.serializeFormToObject();

            _dM_DoiTuongLookupTableModal.open({ id: tuVanKhachHang.iD_KhachHang, displayName: tuVanKhachHang.dM_DoiTuongTenDoiTuong }, function (data) {
                _$tuVanKhachHangInformationForm.find('input[name=dM_DoiTuongTenDoiTuong]').val(data.displayName); 
                _$tuVanKhachHangInformationForm.find('input[name=iD_KhachHang]').val(data.id); 
            });
        });
		
		$('#ClearDM_DoiTuongTenDoiTuongButton').click(function () {
                _$tuVanKhachHangInformationForm.find('input[name=dM_DoiTuongTenDoiTuong]').val(''); 
                _$tuVanKhachHangInformationForm.find('input[name=iD_KhachHang]').val(''); 
        });
		
        $('#OpenDM_HangHoaLookupTableButton').click(function () {

            var tuVanKhachHang = _$tuVanKhachHangInformationForm.serializeFormToObject();

            _dM_HangHoaLookupTableModal.open({ id: tuVanKhachHang.iD_DichVu, displayName: tuVanKhachHang.dM_HangHoaTenHangHoa }, function (data) {
                _$tuVanKhachHangInformationForm.find('input[name=dM_HangHoaTenHangHoa]').val(data.displayName); 
                _$tuVanKhachHangInformationForm.find('input[name=iD_DichVu]').val(data.id); 
            });
        });
		
		$('#ClearDM_HangHoaTenHangHoaButton').click(function () {
                _$tuVanKhachHangInformationForm.find('input[name=dM_HangHoaTenHangHoa]').val(''); 
                _$tuVanKhachHangInformationForm.find('input[name=iD_DichVu]').val(''); 
        });
		


        this.save = function () {
            if (!_$tuVanKhachHangInformationForm.valid()) {
                return;
            }

            var tuVanKhachHang = _$tuVanKhachHangInformationForm.serializeFormToObject();
			 _modalManager.setBusy(true);
			 _tuVanKhachHangsService.createOrEdit(
				tuVanKhachHang
			 ).done(function () {
               abp.notify.info(app.localize('SavedSuccessfully'));
               _modalManager.close();
               abp.event.trigger('app.createOrEditTuVanKhachHangModalSaved');
			 }).always(function () {
               _modalManager.setBusy(false);
			});
        };
    };
})(jQuery);