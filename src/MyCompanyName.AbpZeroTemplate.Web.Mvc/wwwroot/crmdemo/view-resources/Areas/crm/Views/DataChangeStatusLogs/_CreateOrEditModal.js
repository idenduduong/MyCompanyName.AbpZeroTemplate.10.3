(function ($) {
    app.modals.CreateOrEditDataChangeStatusLogModal = function () {

        var _dataChangeStatusLogsService = abp.services.app.dataChangeStatusLogs;

        var _modalManager;
        var _$dataChangeStatusLogInformationForm = null;

		        var _phoneLogLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DataChangeStatusLogs/PhoneLogLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DataChangeStatusLogs/_PhoneLogLookupTableModal.js',
            modalClass: 'PhoneLogLookupTableModal'
        });        var _dataProcessStatusLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DataChangeStatusLogs/DataProcessStatusLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DataChangeStatusLogs/_DataProcessStatusLookupTableModal.js',
            modalClass: 'DataProcessStatusLookupTableModal'
        });        var _reasonLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DataChangeStatusLogs/ReasonLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DataChangeStatusLogs/_ReasonLookupTableModal.js',
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

            _$dataChangeStatusLogInformationForm = _modalManager.getModal().find('form[name=DataChangeStatusLogInformationsForm]');
            _$dataChangeStatusLogInformationForm.validate();
        };

		          $('#OpenPhoneLogLookupTableButton').click(function () {

            var dataChangeStatusLog = _$dataChangeStatusLogInformationForm.serializeFormToObject();

            _phoneLogLookupTableModal.open({ id: dataChangeStatusLog.confirmedPhoneId, displayName: dataChangeStatusLog.phoneLogDurationBySecond }, function (data) {
                _$dataChangeStatusLogInformationForm.find('input[name=phoneLogDurationBySecond]').val(data.displayName); 
                _$dataChangeStatusLogInformationForm.find('input[name=confirmedPhoneId]').val(data.id); 
            });
        });
		
		$('#ClearPhoneLogDurationBySecondButton').click(function () {
                _$dataChangeStatusLogInformationForm.find('input[name=phoneLogDurationBySecond]').val(''); 
                _$dataChangeStatusLogInformationForm.find('input[name=confirmedPhoneId]').val(''); 
        });
		
        $('#OpenPhoneLog2LookupTableButton').click(function () {

            var dataChangeStatusLog = _$dataChangeStatusLogInformationForm.serializeFormToObject();

            _phoneLogLookupTableModal.open({ id: dataChangeStatusLog.communicationPhoneId, displayName: dataChangeStatusLog.phoneLogDurationBySecond2 }, function (data) {
                _$dataChangeStatusLogInformationForm.find('input[name=phoneLogDurationBySecond2]').val(data.displayName); 
                _$dataChangeStatusLogInformationForm.find('input[name=communicationPhoneId]').val(data.id); 
            });
        });
		
		$('#ClearPhoneLogDurationBySecond2Button').click(function () {
                _$dataChangeStatusLogInformationForm.find('input[name=phoneLogDurationBySecond2]').val(''); 
                _$dataChangeStatusLogInformationForm.find('input[name=communicationPhoneId]').val(''); 
        });
		
        $('#OpenDataProcessStatusLookupTableButton').click(function () {

            var dataChangeStatusLog = _$dataChangeStatusLogInformationForm.serializeFormToObject();

            _dataProcessStatusLookupTableModal.open({ id: dataChangeStatusLog.lastStatusId, displayName: dataChangeStatusLog.dataProcessStatusDisplayName }, function (data) {
                _$dataChangeStatusLogInformationForm.find('input[name=dataProcessStatusDisplayName]').val(data.displayName); 
                _$dataChangeStatusLogInformationForm.find('input[name=lastStatusId]').val(data.id); 
            });
        });
		
		$('#ClearDataProcessStatusDisplayNameButton').click(function () {
                _$dataChangeStatusLogInformationForm.find('input[name=dataProcessStatusDisplayName]').val(''); 
                _$dataChangeStatusLogInformationForm.find('input[name=lastStatusId]').val(''); 
        });
		
        $('#OpenDataProcessStatus2LookupTableButton').click(function () {

            var dataChangeStatusLog = _$dataChangeStatusLogInformationForm.serializeFormToObject();

            _dataProcessStatusLookupTableModal.open({ id: dataChangeStatusLog.statusId, displayName: dataChangeStatusLog.dataProcessStatusDisplayName2 }, function (data) {
                _$dataChangeStatusLogInformationForm.find('input[name=dataProcessStatusDisplayName2]').val(data.displayName); 
                _$dataChangeStatusLogInformationForm.find('input[name=statusId]').val(data.id); 
            });
        });
		
		$('#ClearDataProcessStatusDisplayName2Button').click(function () {
                _$dataChangeStatusLogInformationForm.find('input[name=dataProcessStatusDisplayName2]').val(''); 
                _$dataChangeStatusLogInformationForm.find('input[name=statusId]').val(''); 
        });
		
        $('#OpenReasonLookupTableButton').click(function () {

            var dataChangeStatusLog = _$dataChangeStatusLogInformationForm.serializeFormToObject();

            _reasonLookupTableModal.open({ id: dataChangeStatusLog.reasonId, displayName: dataChangeStatusLog.reasonDisplayName }, function (data) {
                _$dataChangeStatusLogInformationForm.find('input[name=reasonDisplayName]').val(data.displayName); 
                _$dataChangeStatusLogInformationForm.find('input[name=reasonId]').val(data.id); 
            });
        });
		
		$('#ClearReasonDisplayNameButton').click(function () {
                _$dataChangeStatusLogInformationForm.find('input[name=reasonDisplayName]').val(''); 
                _$dataChangeStatusLogInformationForm.find('input[name=reasonId]').val(''); 
        });
		


        this.save = function () {
            if (!_$dataChangeStatusLogInformationForm.valid()) {
                return;
            }

            var dataChangeStatusLog = _$dataChangeStatusLogInformationForm.serializeFormToObject();
			 _modalManager.setBusy(true);
			 _dataChangeStatusLogsService.createOrEdit(
				dataChangeStatusLog
			 ).done(function () {
               abp.notify.info(app.localize('SavedSuccessfully'));
               _modalManager.close();
               abp.event.trigger('app.createOrEditDataChangeStatusLogModalSaved');
			 }).always(function () {
               _modalManager.setBusy(false);
			});
        };
    };
})(jQuery);