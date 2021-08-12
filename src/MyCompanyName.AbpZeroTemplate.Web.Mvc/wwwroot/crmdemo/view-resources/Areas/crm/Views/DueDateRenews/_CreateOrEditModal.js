(function ($) {
    app.modals.CreateOrEditDueDateRenewModal = function () {

        var _dueDateRenewsService = abp.services.app.dueDateRenews;

        var _modalManager;
        var _$dueDateRenewInformationForm = null;

		        var _customerDataLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DueDateRenews/CustomerDataLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DueDateRenews/_CustomerDataLookupTableModal.js',
            modalClass: 'CustomerDataLookupTableModal'
        });        var _userLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DueDateRenews/UserLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DueDateRenews/_UserLookupTableModal.js',
            modalClass: 'UserLookupTableModal'
        });        var _reasonLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DueDateRenews/ReasonLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DueDateRenews/_ReasonLookupTableModal.js',
            modalClass: 'ReasonLookupTableModal'
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

            _$dueDateRenewInformationForm = _modalManager.getModal().find('form[name=DueDateRenewInformationsForm]');
            _$dueDateRenewInformationForm.validate();
        };

		          $('#OpenCustomerDataLookupTableButton').click(function () {

            var dueDateRenew = _$dueDateRenewInformationForm.serializeFormToObject();

            _customerDataLookupTableModal.open({ id: dueDateRenew.customerDataId, displayName: dueDateRenew.customerDataName }, function (data) {
                _$dueDateRenewInformationForm.find('input[name=customerDataName]').val(data.displayName); 
                _$dueDateRenewInformationForm.find('input[name=customerDataId]').val(data.id); 
            });
        });
		
		$('#ClearCustomerDataNameButton').click(function () {
                _$dueDateRenewInformationForm.find('input[name=customerDataName]').val(''); 
                _$dueDateRenewInformationForm.find('input[name=customerDataId]').val(''); 
        });
		
        $('#OpenUserLookupTableButton').click(function () {

            var dueDateRenew = _$dueDateRenewInformationForm.serializeFormToObject();

            _userLookupTableModal.open({ id: dueDateRenew.requestBy, displayName: dueDateRenew.userName }, function (data) {
                _$dueDateRenewInformationForm.find('input[name=userName]').val(data.displayName); 
                _$dueDateRenewInformationForm.find('input[name=requestBy]').val(data.id); 
            });
        });
		
		$('#ClearUserNameButton').click(function () {
                _$dueDateRenewInformationForm.find('input[name=userName]').val(''); 
                _$dueDateRenewInformationForm.find('input[name=requestBy]').val(''); 
        });
		
        $('#OpenReasonLookupTableButton').click(function () {

            var dueDateRenew = _$dueDateRenewInformationForm.serializeFormToObject();

            _reasonLookupTableModal.open({ id: dueDateRenew.reasonId, displayName: dueDateRenew.reasonDescription }, function (data) {
                _$dueDateRenewInformationForm.find('input[name=reasonDescription]').val(data.displayName); 
                _$dueDateRenewInformationForm.find('input[name=reasonId]').val(data.id); 
            });
        });
		
		$('#ClearReasonDescriptionButton').click(function () {
                _$dueDateRenewInformationForm.find('input[name=reasonDescription]').val(''); 
                _$dueDateRenewInformationForm.find('input[name=reasonId]').val(''); 
        });
		
        $('#OpenUser2LookupTableButton').click(function () {

            var dueDateRenew = _$dueDateRenewInformationForm.serializeFormToObject();

            _userLookupTableModal.open({ id: dueDateRenew.approvedBy, displayName: dueDateRenew.userName2 }, function (data) {
                _$dueDateRenewInformationForm.find('input[name=userName2]').val(data.displayName); 
                _$dueDateRenewInformationForm.find('input[name=approvedBy]').val(data.id); 
            });
        });
		
		$('#ClearUserName2Button').click(function () {
                _$dueDateRenewInformationForm.find('input[name=userName2]').val(''); 
                _$dueDateRenewInformationForm.find('input[name=approvedBy]').val(''); 
        });
		


        this.save = function () {
            if (!_$dueDateRenewInformationForm.valid()) {
                return;
            }

            var dueDateRenew = _$dueDateRenewInformationForm.serializeFormToObject();
			 _modalManager.setBusy(true);
			 _dueDateRenewsService.createOrEdit(
				dueDateRenew
			 ).done(function () {
               abp.notify.info(app.localize('SavedSuccessfully'));
               _modalManager.close();
               abp.event.trigger('app.createOrEditDueDateRenewModalSaved');
			 }).always(function () {
               _modalManager.setBusy(false);
			});
        };
    };
})(jQuery);