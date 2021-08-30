(function ($) {
    app.modals.CreateOrEditNhanVienTuVanModal = function () {

        var _nhanVienTuVansService = abp.services.app.nhanVienTuVans;

        var _modalManager;
        var _$nhanVienTuVanInformationForm = null;

		        var _userLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/NhanVienTuVans/UserLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/NhanVienTuVans/_UserLookupTableModal.js',
            modalClass: 'UserLookupTableModal'
        });        var _dM_LoaiChungTuLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/NhanVienTuVans/DM_LoaiChungTuLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/NhanVienTuVans/_DM_LoaiChungTuLookupTableModal.js',
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

            _$nhanVienTuVanInformationForm = _modalManager.getModal().find('form[name=NhanVienTuVanInformationsForm]');
            _$nhanVienTuVanInformationForm.validate();
        };

		          $('#OpenUserLookupTableButton').click(function () {

            var nhanVienTuVan = _$nhanVienTuVanInformationForm.serializeFormToObject();

            _userLookupTableModal.open({ id: nhanVienTuVan.iD_NhanVien, displayName: nhanVienTuVan.userName }, function (data) {
                _$nhanVienTuVanInformationForm.find('input[name=userName]').val(data.displayName); 
                _$nhanVienTuVanInformationForm.find('input[name=iD_NhanVien]').val(data.id); 
            });
        });
		
		$('#ClearUserNameButton').click(function () {
                _$nhanVienTuVanInformationForm.find('input[name=userName]').val(''); 
                _$nhanVienTuVanInformationForm.find('input[name=iD_NhanVien]').val(''); 
        });
		
        $('#OpenDM_LoaiChungTuLookupTableButton').click(function () {

            var nhanVienTuVan = _$nhanVienTuVanInformationForm.serializeFormToObject();

            _dM_LoaiChungTuLookupTableModal.open({ id: nhanVienTuVan.loaiChungTu, displayName: nhanVienTuVan.dM_LoaiChungTuLoaiChungTu }, function (data) {
                _$nhanVienTuVanInformationForm.find('input[name=dM_LoaiChungTuLoaiChungTu]').val(data.displayName); 
                _$nhanVienTuVanInformationForm.find('input[name=loaiChungTu]').val(data.id); 
            });
        });
		
		$('#ClearDM_LoaiChungTuLoaiChungTuButton').click(function () {
                _$nhanVienTuVanInformationForm.find('input[name=dM_LoaiChungTuLoaiChungTu]').val(''); 
                _$nhanVienTuVanInformationForm.find('input[name=loaiChungTu]').val(''); 
        });
		


        this.save = function () {
            if (!_$nhanVienTuVanInformationForm.valid()) {
                return;
            }

            var nhanVienTuVan = _$nhanVienTuVanInformationForm.serializeFormToObject();
			 _modalManager.setBusy(true);
			 _nhanVienTuVansService.createOrEdit(
				nhanVienTuVan
			 ).done(function () {
               abp.notify.info(app.localize('SavedSuccessfully'));
               _modalManager.close();
               abp.event.trigger('app.createOrEditNhanVienTuVanModalSaved');
			 }).always(function () {
               _modalManager.setBusy(false);
			});
        };
    };
})(jQuery);