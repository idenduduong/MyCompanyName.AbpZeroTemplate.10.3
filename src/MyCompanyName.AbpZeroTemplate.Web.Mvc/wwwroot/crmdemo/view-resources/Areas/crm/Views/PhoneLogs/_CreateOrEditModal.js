(function ($) {
    app.modals.CreateOrEditPhoneLogModal = function () {

        var _phoneLogsService = abp.services.app.phoneLogs;

        var _modalManager;
        var _$phoneLogInformationForm = null;

		        var _userLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/PhoneLogs/UserLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/PhoneLogs/_UserLookupTableModal.js',
            modalClass: 'UserLookupTableModal'
        });        var _customerDataLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/PhoneLogs/CustomerDataLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/PhoneLogs/_CustomerDataLookupTableModal.js',
            modalClass: 'CustomerDataLookupTableModal'
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

            _$phoneLogInformationForm = _modalManager.getModal().find('form[name=PhoneLogInformationsForm]');
            _$phoneLogInformationForm.validate();
        };

		          $('#OpenUserLookupTableButton').click(function () {

            var phoneLog = _$phoneLogInformationForm.serializeFormToObject();

            _userLookupTableModal.open({ id: phoneLog.employeeId, displayName: phoneLog.userName }, function (data) {
                _$phoneLogInformationForm.find('input[name=userName]').val(data.displayName); 
                _$phoneLogInformationForm.find('input[name=employeeId]').val(data.id); 
            });
        });
		
		$('#ClearUserNameButton').click(function () {
                _$phoneLogInformationForm.find('input[name=userName]').val(''); 
                _$phoneLogInformationForm.find('input[name=employeeId]').val(''); 
        });
		
        $('#OpenCustomerDataLookupTableButton').click(function () {

            var phoneLog = _$phoneLogInformationForm.serializeFormToObject();

            _customerDataLookupTableModal.open({ id: phoneLog.customerDataId, displayName: phoneLog.customerDataName }, function (data) {
                _$phoneLogInformationForm.find('input[name=customerDataName]').val(data.displayName); 
                _$phoneLogInformationForm.find('input[name=customerDataId]').val(data.id); 
            });
        });
		
		$('#ClearCustomerDataNameButton').click(function () {
                _$phoneLogInformationForm.find('input[name=customerDataName]').val(''); 
                _$phoneLogInformationForm.find('input[name=customerDataId]').val(''); 
        });
		


        this.save = function () {
            if (!_$phoneLogInformationForm.valid()) {
                return;
            }

            var phoneLog = _$phoneLogInformationForm.serializeFormToObject();
			 _modalManager.setBusy(true);
			 _phoneLogsService.createOrEdit(
				phoneLog
			 ).done(function () {
               abp.notify.info(app.localize('SavedSuccessfully'));
               _modalManager.close();
               abp.event.trigger('app.createOrEditPhoneLogModalSaved');
			 }).always(function () {
               _modalManager.setBusy(false);
			});
        };
    };
})(jQuery);