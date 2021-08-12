(function ($) {
    app.modals.CreateOrEditReportDataModal = function () {

        var _reportDatasService = abp.services.app.reportDatas;

        var _modalManager;
        var _$reportDataInformationForm = null;

		

        this.init = function (modalManager) {
            _modalManager = modalManager;

			var modal = _modalManager.getModal();
            modal.find('.numberic').numeric_input();
            modal.find('.date-picker').datetimepicker({
                locale: abp.localization.currentLanguage.name,
                format: 'L'
            });
            modal.find('.date-picker').each(function(){
                if($(this).val()=="01/01/0001"){
                    $(this).data("DateTimePicker").date(new Date());
                }
            })

            _$reportDataInformationForm = _modalManager.getModal().find('form[name=ReportDataInformationsForm]');
            _$reportDataInformationForm.validate();
        };

		  

        this.save = function () {
            if (!_$reportDataInformationForm.valid()) {
                return;
            }

            var reportData = _$reportDataInformationForm.serializeFormToObject();
			 _modalManager.setBusy(true);
			 _reportDatasService.createOrEdit(
				reportData
			 ).done(function () {
               abp.notify.info(app.localize('SavedSuccessfully'));
               _modalManager.close();
               abp.event.trigger('app.createOrEditReportDataModalSaved');
			 }).always(function () {
               _modalManager.setBusy(false);
			});
        };
    };
})(jQuery);