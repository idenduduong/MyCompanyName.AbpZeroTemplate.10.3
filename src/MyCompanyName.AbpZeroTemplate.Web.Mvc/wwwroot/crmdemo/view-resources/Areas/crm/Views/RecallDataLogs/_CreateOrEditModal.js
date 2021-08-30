(function ($) {
    app.modals.CreateOrEditRecallDataLogModal = function () {

        var _recallDataLogsService = abp.services.app.recallDataLogs;

        var _modalManager;
        var _$recallDataLogInformationForm = null;

		        var _userLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/RecallDataLogs/UserLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/RecallDataLogs/_UserLookupTableModal.js',
            modalClass: 'UserLookupTableModal'
        });        var _customerDataLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/RecallDataLogs/CustomerDataLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/RecallDataLogs/_CustomerDataLookupTableModal.js',
            modalClass: 'CustomerDataLookupTableModal'
        });        var _reasonLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/RecallDataLogs/ReasonLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/RecallDataLogs/_ReasonLookupTableModal.js',
            modalClass: 'ReasonLookupTableModal'
        });        var _dataProcessStatusLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/RecallDataLogs/DataProcessStatusLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/RecallDataLogs/_DataProcessStatusLookupTableModal.js',
            modalClass: 'DataProcessStatusLookupTableModal'
        });        var _dataChangeStatusLogLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/RecallDataLogs/DataChangeStatusLogLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/RecallDataLogs/_DataChangeStatusLogLookupTableModal.js',
            modalClass: 'DataChangeStatusLogLookupTableModal'
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

            _$recallDataLogInformationForm = _modalManager.getModal().find('form[name=RecallDataLogInformationsForm]');
            _$recallDataLogInformationForm.validate();
        };

		          $('#OpenUserLookupTableButton').click(function () {

            var recallDataLog = _$recallDataLogInformationForm.serializeFormToObject();

            _userLookupTableModal.open({ id: recallDataLog.userId, displayName: recallDataLog.userName }, function (data) {
                _$recallDataLogInformationForm.find('input[name=userName]').val(data.displayName); 
                _$recallDataLogInformationForm.find('input[name=userId]').val(data.id); 
            });
        });
		
		$('#ClearUserNameButton').click(function () {
                _$recallDataLogInformationForm.find('input[name=userName]').val(''); 
                _$recallDataLogInformationForm.find('input[name=userId]').val(''); 
        });
		
        $('#OpenCustomerDataLookupTableButton').click(function () {

            var recallDataLog = _$recallDataLogInformationForm.serializeFormToObject();

            _customerDataLookupTableModal.open({ id: recallDataLog.customerDataId, displayName: recallDataLog.customerDataName }, function (data) {
                _$recallDataLogInformationForm.find('input[name=customerDataName]').val(data.displayName); 
                _$recallDataLogInformationForm.find('input[name=customerDataId]').val(data.id); 
            });
        });
		
		$('#ClearCustomerDataNameButton').click(function () {
                _$recallDataLogInformationForm.find('input[name=customerDataName]').val(''); 
                _$recallDataLogInformationForm.find('input[name=customerDataId]').val(''); 
        });
		
        $('#OpenReasonLookupTableButton').click(function () {

            var recallDataLog = _$recallDataLogInformationForm.serializeFormToObject();

            _reasonLookupTableModal.open({ id: recallDataLog.reasonId, displayName: recallDataLog.reasonDisplayName }, function (data) {
                _$recallDataLogInformationForm.find('input[name=reasonDisplayName]').val(data.displayName); 
                _$recallDataLogInformationForm.find('input[name=reasonId]').val(data.id); 
            });
        });
		
		$('#ClearReasonDisplayNameButton').click(function () {
                _$recallDataLogInformationForm.find('input[name=reasonDisplayName]').val(''); 
                _$recallDataLogInformationForm.find('input[name=reasonId]').val(''); 
        });
		
        $('#OpenDataProcessStatusLookupTableButton').click(function () {

            var recallDataLog = _$recallDataLogInformationForm.serializeFormToObject();

            _dataProcessStatusLookupTableModal.open({ id: recallDataLog.dataProcessStatusId, displayName: recallDataLog.dataProcessStatusDisplayName }, function (data) {
                _$recallDataLogInformationForm.find('input[name=dataProcessStatusDisplayName]').val(data.displayName); 
                _$recallDataLogInformationForm.find('input[name=dataProcessStatusId]').val(data.id); 
            });
        });
		
		$('#ClearDataProcessStatusDisplayNameButton').click(function () {
                _$recallDataLogInformationForm.find('input[name=dataProcessStatusDisplayName]').val(''); 
                _$recallDataLogInformationForm.find('input[name=dataProcessStatusId]').val(''); 
        });
		
        $('#OpenDataChangeStatusLogLookupTableButton').click(function () {

            var recallDataLog = _$recallDataLogInformationForm.serializeFormToObject();

            _dataChangeStatusLogLookupTableModal.open({ id: recallDataLog.dataChangeStatusLogId, displayName: recallDataLog.dataChangeStatusLogNewStatusName }, function (data) {
                _$recallDataLogInformationForm.find('input[name=dataChangeStatusLogNewStatusName]').val(data.displayName); 
                _$recallDataLogInformationForm.find('input[name=dataChangeStatusLogId]').val(data.id); 
            });
        });
		
		$('#ClearDataChangeStatusLogNewStatusNameButton').click(function () {
                _$recallDataLogInformationForm.find('input[name=dataChangeStatusLogNewStatusName]').val(''); 
                _$recallDataLogInformationForm.find('input[name=dataChangeStatusLogId]').val(''); 
        });
		


        this.save = function () {
            if (!_$recallDataLogInformationForm.valid()) {
                return;
            }

            var recallDataLog = _$recallDataLogInformationForm.serializeFormToObject();
			 _modalManager.setBusy(true);
			 _recallDataLogsService.createOrEdit(
				recallDataLog
			 ).done(function () {
               abp.notify.info(app.localize('SavedSuccessfully'));
               _modalManager.close();
               abp.event.trigger('app.createOrEditRecallDataLogModalSaved');
			 }).always(function () {
               _modalManager.setBusy(false);
			});
        };
    };
})(jQuery);