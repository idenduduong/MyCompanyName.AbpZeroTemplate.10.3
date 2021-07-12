﻿(function ($) {
    app.modals.CreateOrEditPhoneModal = function () {

        var _phonesService = abp.services.app.phones;

        var _modalManager;
        var _$phoneInformationForm = null;

		

        this.init = function (modalManager) {
            _modalManager = modalManager;

			var modal = _modalManager.getModal();
            modal.find('.date-picker').datetimepicker({
                locale: abp.localization.currentLanguage.name,
                format: 'L'
            });

            _$phoneInformationForm = _modalManager.getModal().find('form[name=PhoneInformationsForm]');
            _$phoneInformationForm.validate();
        };

		  

        this.save = function () {
            if (!_$phoneInformationForm.valid()) {
                return;
            }

            var phone = _$phoneInformationForm.serializeFormToObject();
			
			 _modalManager.setBusy(true);
			 _phonesService.createOrEdit(
				phone
			 ).done(function () {
               abp.notify.info(app.localize('SavedSuccessfully'));
               _modalManager.close();
               abp.event.trigger('app.createOrEditPhoneModalSaved');
			 }).always(function () {
               _modalManager.setBusy(false);
			});
        };
    };
})(jQuery);