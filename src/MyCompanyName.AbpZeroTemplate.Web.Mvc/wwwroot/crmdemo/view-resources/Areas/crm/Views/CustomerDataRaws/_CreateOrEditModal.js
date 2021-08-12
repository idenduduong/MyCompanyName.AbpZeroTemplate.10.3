(function ($) {
    app.modals.CreateOrEditCustomerDataRawModal = function () {

        var _customerDataRawsService = abp.services.app.customerDataRaws;

        var _modalManager;
        var _$customerDataRawInformationForm = null;

		        var _importDataLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/CustomerDataRaws/ImportDataLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/CustomerDataRaws/_ImportDataLookupTableModal.js',
            modalClass: 'ImportDataLookupTableModal'
        });

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

            _$customerDataRawInformationForm = _modalManager.getModal().find('form[name=CustomerDataRawInformationsForm]');
            _$customerDataRawInformationForm.validate();
        };

		          $('#OpenImportDataLookupTableButton').click(function () {

            var customerDataRaw = _$customerDataRawInformationForm.serializeFormToObject();

            _importDataLookupTableModal.open({ id: customerDataRaw.importDataId, displayName: customerDataRaw.importDataImportCode }, function (data) {
                _$customerDataRawInformationForm.find('input[name=importDataImportCode]').val(data.displayName); 
                _$customerDataRawInformationForm.find('input[name=importDataId]').val(data.id); 
            });
        });
		
		$('#ClearImportDataImportCodeButton').click(function () {
                _$customerDataRawInformationForm.find('input[name=importDataImportCode]').val(''); 
                _$customerDataRawInformationForm.find('input[name=importDataId]').val(''); 
        });
		


        this.save = function () {
            if (!_$customerDataRawInformationForm.valid()) {
                return;
            }

            var customerDataRaw = _$customerDataRawInformationForm.serializeFormToObject();
			 _modalManager.setBusy(true);
			 _customerDataRawsService.createOrEdit(
				customerDataRaw
			 ).done(function () {
               abp.notify.info(app.localize('SavedSuccessfully'));
               _modalManager.close();
               abp.event.trigger('app.createOrEditCustomerDataRawModalSaved');
			 }).always(function () {
               _modalManager.setBusy(false);
			});
        };
    };
})(jQuery);