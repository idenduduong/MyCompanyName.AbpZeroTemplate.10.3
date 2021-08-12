(function ($) {
    app.modals.CreateOrEditDM_DonViTinhModal = function () {

        var _dM_DonViTinhsService = abp.services.app.dM_DonViTinhs;

        var _modalManager;
        var _$dM_DonViTinhInformationForm = null;

		

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

            _$dM_DonViTinhInformationForm = _modalManager.getModal().find('form[name=DM_DonViTinhInformationsForm]');
            _$dM_DonViTinhInformationForm.validate();
        };

		  

        this.save = function () {
            if (!_$dM_DonViTinhInformationForm.valid()) {
                return;
            }

            var dM_DonViTinh = _$dM_DonViTinhInformationForm.serializeFormToObject();
			 _modalManager.setBusy(true);
			 _dM_DonViTinhsService.createOrEdit(
				dM_DonViTinh
			 ).done(function () {
               abp.notify.info(app.localize('SavedSuccessfully'));
               _modalManager.close();
               abp.event.trigger('app.createOrEditDM_DonViTinhModalSaved');
			 }).always(function () {
               _modalManager.setBusy(false);
			});
        };
    };
})(jQuery);