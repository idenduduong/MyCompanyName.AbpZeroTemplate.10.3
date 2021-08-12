(function ($) {
    app.modals.CreateOrEditDM_NgheNghiepModal = function () {

        var _dM_NgheNghiepsService = abp.services.app.dM_NgheNghieps;

        var _modalManager;
        var _$dM_NgheNghiepInformationForm = null;

		

        this.init = function (modalManager) {
            _modalManager = modalManager;

			var modal = _modalManager.getModal();
            modal.find('.numberic').number(true,0);
            modal.find('.date-picker').datetimepicker({
                locale: abp.localization.currentLanguage.name,
                format: 'L'
            });
            modal.find('.date-picker').each(function(){
                if($(this).val()=="01/01/0001"){
                    $(this).data("DateTimePicker").date(new Date());
                }
            })

            _$dM_NgheNghiepInformationForm = _modalManager.getModal().find('form[name=DM_NgheNghiepInformationsForm]');
            _$dM_NgheNghiepInformationForm.validate();
        };

		  

        this.save = function () {
            if (!_$dM_NgheNghiepInformationForm.valid()) {
                return;
            }

            var dM_NgheNghiep = _$dM_NgheNghiepInformationForm.serializeFormToObject();
			 _modalManager.setBusy(true);
			 _dM_NgheNghiepsService.createOrEdit(
				dM_NgheNghiep
			 ).done(function () {
               abp.notify.info(app.localize('SavedSuccessfully'));
               _modalManager.close();
               abp.event.trigger('app.createOrEditDM_NgheNghiepModalSaved');
			 }).always(function () {
               _modalManager.setBusy(false);
			});
        };
    };
})(jQuery);