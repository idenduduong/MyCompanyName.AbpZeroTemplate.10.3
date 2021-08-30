(function ($) {
    app.modals.CreateOrEditDataSourceModal = function () {

        var _dataSourcesService = abp.services.app.dataSources;

        var _modalManager;
        var _$dataSourceInformationForm = null;

		

        this.init = function (modalManager) {
            _modalManager = modalManager;

			var modal = _modalManager.getModal();
            //modal.find('.numberic').number(true, 0);
            modal.find('.date-picker').datetimepicker({
                locale: abp.localization.currentLanguage.name,
                format: 'L'
            });
            modal.find('.date-picker').each(function(){
                if($(this).val()=="01/01/0001"){
                    $(this).data("DateTimePicker").date(new Date());
                }
            })

            _$dataSourceInformationForm = _modalManager.getModal().find('form[name=DataSourceInformationsForm]');
            _$dataSourceInformationForm.validate();
        };

		  

        this.save = function () {
            if (!_$dataSourceInformationForm.valid()) {
                return;
            }

            var dataSource = _$dataSourceInformationForm.serializeFormToObject();
			 _modalManager.setBusy(true);
			 _dataSourcesService.createOrEdit(
				dataSource
			 ).done(function () {
               abp.notify.info(app.localize('SavedSuccessfully'));
               _modalManager.close();
               abp.event.trigger('app.createOrEditDataSourceModalSaved');
			 }).always(function () {
               _modalManager.setBusy(false);
			});
        };
    };
})(jQuery);