(function ($) {
    app.modals.CreateOrEditAssigneBulkleDataLogModal = function () {

        var _assigneBulkleDataLogsService = abp.services.app.assigneBulkleDataLogs;

        var _modalManager;
        var _$assigneBulkleDataLogInformationForm = null;

		        var _userLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/AssigneBulkleDataLogs/UserLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/AssigneBulkleDataLogs/_UserLookupTableModal.js',
            modalClass: 'UserLookupTableModal'
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

            _$assigneBulkleDataLogInformationForm = _modalManager.getModal().find('form[name=AssigneBulkleDataLogInformationsForm]');
            _$assigneBulkleDataLogInformationForm.validate();
        };

		          $('#OpenUserLookupTableButton').click(function () {

            var assigneBulkleDataLog = _$assigneBulkleDataLogInformationForm.serializeFormToObject();

            _userLookupTableModal.open({ id: assigneBulkleDataLog.assignedByUserId, displayName: assigneBulkleDataLog.userName }, function (data) {
                _$assigneBulkleDataLogInformationForm.find('input[name=userName]').val(data.displayName); 
                _$assigneBulkleDataLogInformationForm.find('input[name=assignedByUserId]').val(data.id); 
            });
        });
		
		$('#ClearUserNameButton').click(function () {
                _$assigneBulkleDataLogInformationForm.find('input[name=userName]').val(''); 
                _$assigneBulkleDataLogInformationForm.find('input[name=assignedByUserId]').val(''); 
        });
		


        this.save = function () {
            if (!_$assigneBulkleDataLogInformationForm.valid()) {
                return;
            }

            var assigneBulkleDataLog = _$assigneBulkleDataLogInformationForm.serializeFormToObject();
			 _modalManager.setBusy(true);
			 _assigneBulkleDataLogsService.createOrEdit(
				assigneBulkleDataLog
			 ).done(function () {
               abp.notify.info(app.localize('SavedSuccessfully'));
               _modalManager.close();
               abp.event.trigger('app.createOrEditAssigneBulkleDataLogModalSaved');
			 }).always(function () {
               _modalManager.setBusy(false);
			});
        };
    };
})(jQuery);