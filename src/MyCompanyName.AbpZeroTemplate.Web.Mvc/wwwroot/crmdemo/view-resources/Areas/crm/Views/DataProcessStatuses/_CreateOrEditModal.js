(function ($) {
    app.modals.CreateOrEditDataProcessStatusModal = function () {

        var _dataProcessStatusesService = abp.services.app.dataProcessStatuses;
        var _commonService = abp.services.app.commonLookup;
        var _modalManager;
        var _$dataProcessStatusInformationForm = null;

		

        this.init = function (modalManager) {
            _modalManager = modalManager;

			var modal = _modalManager.getModal();
            modal.find('.numeric').number(true,0);
            modal.find('.date-picker').datetimepicker({
                locale: abp.localization.currentLanguage.name,
                format: 'L'
            });
            modal.find('.date-picker').each(function(){
                if($(this).val()=="01/01/0001"){
                    $(this).data("DateTimePicker").date(new Date());
                }
            })

            _$dataProcessStatusInformationForm = _modalManager.getModal().find('form[name=DataProcessStatusInformationsForm]');
            _$dataProcessStatusInformationForm.validate();
        };


        this.save = function () {
            if (!_$dataProcessStatusInformationForm.valid()) {
                return;
            }

            var dataProcessStatus = _$dataProcessStatusInformationForm.serializeFormToObject();
			 _modalManager.setBusy(true);
			 _dataProcessStatusesService.createOrEdit(
				dataProcessStatus
			 ).done(function () {
               abp.notify.info(app.localize('SavedSuccessfully'));
               _modalManager.close();
               abp.event.trigger('app.createOrEditDataProcessStatusModalSaved');
			 }).always(function () {
               _modalManager.setBusy(false);
			});
        };
    };
})(jQuery);