(function ($) {
    app.modals.CreateOrEditChangeStatusFlowModal = function () {

        var _changeStatusFlowsService = abp.services.app.changeStatusFlows;

        var _modalManager;
        var _$changeStatusFlowInformationForm = null;

		        var _dataProcessStatusLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/ChangeStatusFlows/DataProcessStatusLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/ChangeStatusFlows/_DataProcessStatusLookupTableModal.js',
            modalClass: 'DataProcessStatusLookupTableModal'
        });

        this.init = function (modalManager) {
            _modalManager = modalManager;

			var modal = _modalManager.getModal();
            modal.find('.numeric').number(true, 0);
            modal.find('.date-picker').datetimepicker({
                locale: abp.localization.currentLanguage.name,
                format: 'L'
            });
            modal.find('.date-picker').each(function(){
                if($(this).val()=="01/01/0001"){
                    $(this).data("DateTimePicker").date(new Date());
                }
            })

            _$changeStatusFlowInformationForm = _modalManager.getModal().find('form[name=ChangeStatusFlowInformationsForm]');
            _$changeStatusFlowInformationForm.validate();
        };

		          $('#OpenDataProcessStatusLookupTableButton').click(function () {

            var changeStatusFlow = _$changeStatusFlowInformationForm.serializeFormToObject();

            _dataProcessStatusLookupTableModal.open({ id: changeStatusFlow.fromStatusId, displayName: changeStatusFlow.dataProcessStatusDisplayName }, function (data) {
                _$changeStatusFlowInformationForm.find('input[name=dataProcessStatusDisplayName]').val(data.displayName); 
                _$changeStatusFlowInformationForm.find('input[name=fromStatusId]').val(data.id); 
            });
        });
		
		$('#ClearDataProcessStatusDisplayNameButton').click(function () {
                _$changeStatusFlowInformationForm.find('input[name=dataProcessStatusDisplayName]').val(''); 
                _$changeStatusFlowInformationForm.find('input[name=fromStatusId]').val(''); 
        });
		
        $('#OpenDataProcessStatus2LookupTableButton').click(function () {

            var changeStatusFlow = _$changeStatusFlowInformationForm.serializeFormToObject();

            _dataProcessStatusLookupTableModal.open({ id: changeStatusFlow.toStatusId, displayName: changeStatusFlow.dataProcessStatusDisplayName2 }, function (data) {
                _$changeStatusFlowInformationForm.find('input[name=dataProcessStatusDisplayName2]').val(data.displayName); 
                _$changeStatusFlowInformationForm.find('input[name=toStatusId]').val(data.id); 
            });
        });
		
		$('#ClearDataProcessStatusDisplayName2Button').click(function () {
                _$changeStatusFlowInformationForm.find('input[name=dataProcessStatusDisplayName2]').val(''); 
                _$changeStatusFlowInformationForm.find('input[name=toStatusId]').val(''); 
        });
		


        this.save = function () {
            if (!_$changeStatusFlowInformationForm.valid()) {
                return;
            }

            var changeStatusFlow = _$changeStatusFlowInformationForm.serializeFormToObject();
			 _modalManager.setBusy(true);
			 _changeStatusFlowsService.createOrEdit(
				changeStatusFlow
			 ).done(function () {
               abp.notify.info(app.localize('SavedSuccessfully'));
               _modalManager.close();
               abp.event.trigger('app.createOrEditChangeStatusFlowModalSaved');
			 }).always(function () {
               _modalManager.setBusy(false);
			});
        };
    };
})(jQuery);