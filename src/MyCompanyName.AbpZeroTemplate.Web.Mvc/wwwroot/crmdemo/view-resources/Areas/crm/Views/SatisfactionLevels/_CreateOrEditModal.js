(function ($) {
    app.modals.CreateOrEditSatisfactionLevelModal = function () {

        var _satisfactionLevelsService = abp.services.app.satisfactionLevels;

        var _modalManager;
        var _$satisfactionLevelInformationForm = null;

		

        this.init = function (modalManager) {
            _modalManager = modalManager;

			var modal = _modalManager.getModal();
            modal.find('.numeric').number(true, 0);
            modal.find('.date-picker').datetimepicker({
                locale: abp.localization.currentLanguage.name,
                format: 'L'
            });
            modal.find('.date-picker').each(function(){
                if($(this).val()=="01/01/0001"){
                    $(this).data("DateTimePicker").date(new Date());
                }
            })

            _$satisfactionLevelInformationForm = _modalManager.getModal().find('form[name=SatisfactionLevelInformationsForm]');
            _$satisfactionLevelInformationForm.validate();
        };

		  

        this.save = function () {
            if (!_$satisfactionLevelInformationForm.valid()) {
                return;
            }

            var satisfactionLevel = _$satisfactionLevelInformationForm.serializeFormToObject();
			 _modalManager.setBusy(true);
			 _satisfactionLevelsService.createOrEdit(
				satisfactionLevel
			 ).done(function () {
               abp.notify.info(app.localize('SavedSuccessfully'));
               _modalManager.close();
               abp.event.trigger('app.createOrEditSatisfactionLevelModalSaved');
			 }).always(function () {
               _modalManager.setBusy(false);
			});
        };
    };
})(jQuery);