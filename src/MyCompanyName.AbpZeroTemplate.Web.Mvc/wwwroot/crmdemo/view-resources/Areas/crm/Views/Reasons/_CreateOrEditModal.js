(function ($) {
    app.modals.CreateOrEditReasonModal = function () {

        var _reasonsService = abp.services.app.reasons;

        var _modalManager;
        var _$reasonInformationForm = null;

		

        this.init = function (modalManager) {
            _modalManager = modalManager;

			var modal = _modalManager.getModal();
            //modal.find('.numeric').number(true, 0);
            modal.find('.date-picker').datetimepicker({
                locale: abp.localization.currentLanguage.name,
                format: 'L'
            });
            modal.find('.date-picker').each(function(){
                if($(this).val()=="01/01/0001"){
                    $(this).data("DateTimePicker").date(new Date());
                }
            })

            _$reasonInformationForm = _modalManager.getModal().find('form[name=ReasonInformationsForm]');
            _$reasonInformationForm.validate();
        };

		  

        this.save = function () {
            if (!_$reasonInformationForm.valid()) {
                return;
            }

            var reason = _$reasonInformationForm.serializeFormToObject();
			 _modalManager.setBusy(true);
			 _reasonsService.createOrEdit(
				reason
			 ).done(function () {
               abp.notify.info(app.localize('SavedSuccessfully'));
               _modalManager.close();
               abp.event.trigger('app.createOrEditReasonModalSaved');
			 }).always(function () {
               _modalManager.setBusy(false);
			});
        };
    };
})(jQuery);