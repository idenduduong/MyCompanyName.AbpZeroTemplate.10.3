(function ($) {
    app.modals.CreateOrEditDM_TyGiaModal = function () {

        var _dM_TyGiasService = abp.services.app.dM_TyGias;

        var _modalManager;
        var _$dM_TyGiaInformationForm = null;

		        var _dM_TienTeLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_TyGias/DM_TienTeLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_TyGias/_DM_TienTeLookupTableModal.js',
            modalClass: 'DM_TienTeLookupTableModal'
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

            _$dM_TyGiaInformationForm = _modalManager.getModal().find('form[name=DM_TyGiaInformationsForm]');
            _$dM_TyGiaInformationForm.validate();
        };

		          $('#OpenDM_TienTeLookupTableButton').click(function () {

            var dM_TyGia = _$dM_TyGiaInformationForm.serializeFormToObject();

            _dM_TienTeLookupTableModal.open({ id: dM_TyGia.iD_NgoaiTe, displayName: dM_TyGia.dM_TienTeTenNgoaiTe }, function (data) {
                _$dM_TyGiaInformationForm.find('input[name=dM_TienTeTenNgoaiTe]').val(data.displayName); 
                _$dM_TyGiaInformationForm.find('input[name=iD_NgoaiTe]').val(data.id); 
            });
        });
		
		$('#ClearDM_TienTeTenNgoaiTeButton').click(function () {
                _$dM_TyGiaInformationForm.find('input[name=dM_TienTeTenNgoaiTe]').val(''); 
                _$dM_TyGiaInformationForm.find('input[name=iD_NgoaiTe]').val(''); 
        });
		


        this.save = function () {
            if (!_$dM_TyGiaInformationForm.valid()) {
                return;
            }

            var dM_TyGia = _$dM_TyGiaInformationForm.serializeFormToObject();
			 _modalManager.setBusy(true);
			 _dM_TyGiasService.createOrEdit(
				dM_TyGia
			 ).done(function () {
               abp.notify.info(app.localize('SavedSuccessfully'));
               _modalManager.close();
               abp.event.trigger('app.createOrEditDM_TyGiaModalSaved');
			 }).always(function () {
               _modalManager.setBusy(false);
			});
        };
    };
})(jQuery);