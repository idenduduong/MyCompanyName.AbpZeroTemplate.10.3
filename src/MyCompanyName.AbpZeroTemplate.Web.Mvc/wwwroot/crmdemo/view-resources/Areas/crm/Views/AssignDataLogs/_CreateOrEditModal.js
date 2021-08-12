(function ($) {
    app.modals.CreateOrEditAssignDataLogModal = function () {

        var _assignDataLogsService = abp.services.app.assignDataLogs;

        var _modalManager;
        var _$assignDataLogInformationForm = null;

		        var _customerDataLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/AssignDataLogs/CustomerDataLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/AssignDataLogs/_CustomerDataLookupTableModal.js',
            modalClass: 'CustomerDataLookupTableModal'
        });        var _organizationUnitLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/AssignDataLogs/OrganizationUnitLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/AssignDataLogs/_OrganizationUnitLookupTableModal.js',
            modalClass: 'OrganizationUnitLookupTableModal'
        });        var _userLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/AssignDataLogs/UserLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/AssignDataLogs/_UserLookupTableModal.js',
            modalClass: 'UserLookupTableModal'
        });        var _dataProcessStatusLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/AssignDataLogs/DataProcessStatusLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/AssignDataLogs/_DataProcessStatusLookupTableModal.js',
            modalClass: 'DataProcessStatusLookupTableModal'
        });        var _assigneBulkleDataLogLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/AssignDataLogs/AssigneBulkleDataLogLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/AssignDataLogs/_AssigneBulkleDataLogLookupTableModal.js',
            modalClass: 'AssigneBulkleDataLogLookupTableModal'
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

            _$assignDataLogInformationForm = _modalManager.getModal().find('form[name=AssignDataLogInformationsForm]');
            _$assignDataLogInformationForm.validate();
        };

		          $('#OpenCustomerDataLookupTableButton').click(function () {

            var assignDataLog = _$assignDataLogInformationForm.serializeFormToObject();

            _customerDataLookupTableModal.open({ id: assignDataLog.customerDataId, displayName: assignDataLog.customerDataName }, function (data) {
                _$assignDataLogInformationForm.find('input[name=customerDataName]').val(data.displayName); 
                _$assignDataLogInformationForm.find('input[name=customerDataId]').val(data.id); 
            });
        });
		
		$('#ClearCustomerDataNameButton').click(function () {
                _$assignDataLogInformationForm.find('input[name=customerDataName]').val(''); 
                _$assignDataLogInformationForm.find('input[name=customerDataId]').val(''); 
        });
		
        $('#OpenOrganizationUnitLookupTableButton').click(function () {

            var assignDataLog = _$assignDataLogInformationForm.serializeFormToObject();

            _organizationUnitLookupTableModal.open({ id: assignDataLog.organizationUnitId, displayName: assignDataLog.organizationUnitDisplayName }, function (data) {
                _$assignDataLogInformationForm.find('input[name=organizationUnitDisplayName]').val(data.displayName); 
                _$assignDataLogInformationForm.find('input[name=organizationUnitId]').val(data.id); 
            });
        });
		
		$('#ClearOrganizationUnitDisplayNameButton').click(function () {
                _$assignDataLogInformationForm.find('input[name=organizationUnitDisplayName]').val(''); 
                _$assignDataLogInformationForm.find('input[name=organizationUnitId]').val(''); 
        });
		
        $('#OpenUserLookupTableButton').click(function () {

            var assignDataLog = _$assignDataLogInformationForm.serializeFormToObject();

            _userLookupTableModal.open({ id: assignDataLog.employeeId, displayName: assignDataLog.userName }, function (data) {
                _$assignDataLogInformationForm.find('input[name=userName]').val(data.displayName); 
                _$assignDataLogInformationForm.find('input[name=employeeId]').val(data.id); 
            });
        });
		
		$('#ClearUserNameButton').click(function () {
                _$assignDataLogInformationForm.find('input[name=userName]').val(''); 
                _$assignDataLogInformationForm.find('input[name=employeeId]').val(''); 
        });
		
        $('#OpenDataProcessStatusLookupTableButton').click(function () {

            var assignDataLog = _$assignDataLogInformationForm.serializeFormToObject();

            _dataProcessStatusLookupTableModal.open({ id: assignDataLog.dataProcessStatusId, displayName: assignDataLog.dataProcessStatusDisplayName }, function (data) {
                _$assignDataLogInformationForm.find('input[name=dataProcessStatusDisplayName]').val(data.displayName); 
                _$assignDataLogInformationForm.find('input[name=dataProcessStatusId]').val(data.id); 
            });
        });
		
		$('#ClearDataProcessStatusDisplayNameButton').click(function () {
                _$assignDataLogInformationForm.find('input[name=dataProcessStatusDisplayName]').val(''); 
                _$assignDataLogInformationForm.find('input[name=dataProcessStatusId]').val(''); 
        });
		
        $('#OpenUser2LookupTableButton').click(function () {

            var assignDataLog = _$assignDataLogInformationForm.serializeFormToObject();

            _userLookupTableModal.open({ id: assignDataLog.recalledByUserId, displayName: assignDataLog.userName2 }, function (data) {
                _$assignDataLogInformationForm.find('input[name=userName2]').val(data.displayName); 
                _$assignDataLogInformationForm.find('input[name=recalledByUserId]').val(data.id); 
            });
        });
		
		$('#ClearUserName2Button').click(function () {
                _$assignDataLogInformationForm.find('input[name=userName2]').val(''); 
                _$assignDataLogInformationForm.find('input[name=recalledByUserId]').val(''); 
        });
		
        $('#OpenAssigneBulkleDataLogLookupTableButton').click(function () {

            var assignDataLog = _$assignDataLogInformationForm.serializeFormToObject();

            _assigneBulkleDataLogLookupTableModal.open({ id: assignDataLog.assigneBulkleDataLogId, displayName: assignDataLog.assigneBulkleDataLogTenantId }, function (data) {
                _$assignDataLogInformationForm.find('input[name=assigneBulkleDataLogTenantId]').val(data.displayName); 
                _$assignDataLogInformationForm.find('input[name=assigneBulkleDataLogId]').val(data.id); 
            });
        });
		
		$('#ClearAssigneBulkleDataLogTenantIdButton').click(function () {
                _$assignDataLogInformationForm.find('input[name=assigneBulkleDataLogTenantId]').val(''); 
                _$assignDataLogInformationForm.find('input[name=assigneBulkleDataLogId]').val(''); 
        });
		


        this.save = function () {
            if (!_$assignDataLogInformationForm.valid()) {
                return;
            }

            var assignDataLog = _$assignDataLogInformationForm.serializeFormToObject();
			 _modalManager.setBusy(true);
			 _assignDataLogsService.createOrEdit(
				assignDataLog
			 ).done(function () {
               abp.notify.info(app.localize('SavedSuccessfully'));
               _modalManager.close();
               abp.event.trigger('app.createOrEditAssignDataLogModalSaved');
			 }).always(function () {
               _modalManager.setBusy(false);
			});
        };
    };
})(jQuery);