(function ($) {
    app.modals.CreateOrEditImportDataModal = function () {

        var _importDatasService = abp.services.app.importDatas;

        var _modalManager;
        var _$importDataInformationForm = null;

		        var _userLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/ImportDatas/UserLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/ImportDatas/_UserLookupTableModal.js',
            modalClass: 'UserLookupTableModal'
        });        var _dataSourceLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/ImportDatas/DataSourceLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/ImportDatas/_DataSourceLookupTableModal.js',
            modalClass: 'DataSourceLookupTableModal'
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

            _$importDataInformationForm = _modalManager.getModal().find('form[name=ImportDataInformationsForm]');
            _$importDataInformationForm.validate();
        };

		          $('#OpenUserLookupTableButton').click(function () {

            var importData = _$importDataInformationForm.serializeFormToObject();

            _userLookupTableModal.open({ id: importData.importedBy, displayName: importData.userName }, function (data) {
                _$importDataInformationForm.find('input[name=userName]').val(data.displayName); 
                _$importDataInformationForm.find('input[name=importedBy]').val(data.id); 
            });
        });
		
		$('#ClearUserNameButton').click(function () {
                _$importDataInformationForm.find('input[name=userName]').val(''); 
                _$importDataInformationForm.find('input[name=importedBy]').val(''); 
        });
		
        $('#OpenDataSourceLookupTableButton').click(function () {

            var importData = _$importDataInformationForm.serializeFormToObject();

            _dataSourceLookupTableModal.open({ id: importData.dataSourceId, displayName: importData.dataSourceDisplayName }, function (data) {
                _$importDataInformationForm.find('input[name=dataSourceDisplayName]').val(data.displayName); 
                _$importDataInformationForm.find('input[name=dataSourceId]').val(data.id); 
            });
        });
		
		$('#ClearDataSourceDisplayNameButton').click(function () {
            _$importDataInformationForm.find('input[name=dataSourceDisplayName]').val(''); 
            _$importDataInformationForm.find('input[name=dataSourceId]').val(''); 
        });
		


        this.save = function () {
            if (!_$importDataInformationForm.valid()) {
                return;
            }

            var importData = _$importDataInformationForm.serializeFormToObject();
			 _modalManager.setBusy(true);
			 _importDatasService.createOrEdit(
				importData
			 ).done(function () {
               abp.notify.info(app.localize('SavedSuccessfully'));
               _modalManager.close();
               abp.event.trigger('app.createOrEditImportDataModalSaved');
			 }).always(function () {
               _modalManager.setBusy(false);
			});
        };
    };
})(jQuery);