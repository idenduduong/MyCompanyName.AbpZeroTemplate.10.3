(function ($) {
    app.modals.CreateOrEditRoleProcessStatusModal = function () {

        var _roleProcessStatusesService = abp.services.app.roleProcessStatuses;

        var _modalManager;
        var _$roleProcessStatusInformationForm = null;

		        var _dataProcessStatusLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/RoleProcessStatuses/DataProcessStatusLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/RoleProcessStatuses/_DataProcessStatusLookupTableModal.js',
            modalClass: 'DataProcessStatusLookupTableModal'
        });

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

            _$roleProcessStatusInformationForm = _modalManager.getModal().find('form[name=RoleProcessStatusInformationsForm]');
            _$roleProcessStatusInformationForm.validate();
        };

		          $('#OpenDataProcessStatusLookupTableButton').click(function () {

            var roleProcessStatus = _$roleProcessStatusInformationForm.serializeFormToObject();

            _dataProcessStatusLookupTableModal.open({ id: roleProcessStatus.dataProcessStatusId, displayName: roleProcessStatus.dataProcessStatusDisplayName }, function (data) {
                _$roleProcessStatusInformationForm.find('input[name=dataProcessStatusDisplayName]').val(data.displayName); 
                _$roleProcessStatusInformationForm.find('input[name=dataProcessStatusId]').val(data.id); 
            });
        });
		
		$('#ClearDataProcessStatusDisplayNameButton').click(function () {
                _$roleProcessStatusInformationForm.find('input[name=dataProcessStatusDisplayName]').val(''); 
                _$roleProcessStatusInformationForm.find('input[name=dataProcessStatusId]').val(''); 
        });
		


        this.save = function () {
            if (!_$roleProcessStatusInformationForm.valid()) {
                return;
            }

            var roleProcessStatus = _$roleProcessStatusInformationForm.serializeFormToObject();
			 _modalManager.setBusy(true);
			 _roleProcessStatusesService.createOrEdit(
				roleProcessStatus
			 ).done(function () {
               abp.notify.info(app.localize('SavedSuccessfully'));
               _modalManager.close();
               abp.event.trigger('app.createOrEditRoleProcessStatusModalSaved');
			 }).always(function () {
               _modalManager.setBusy(false);
			});
        };
    };
})(jQuery);