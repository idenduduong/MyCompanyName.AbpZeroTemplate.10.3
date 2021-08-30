(function ($) {
    app.modals.CreateOrEditMaChungTuModal = function () {

        var _maChungTusService = abp.services.app.maChungTus;

        var _modalManager;
        var _$maChungTuInformationForm = null;

		        var _organizationUnitLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/MaChungTus/OrganizationUnitLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/MaChungTus/_OrganizationUnitLookupTableModal.js',
            modalClass: 'OrganizationUnitLookupTableModal'
        });

        this.init = function (modalManager) {
            _modalManager = modalManager;

			var modal = _modalManager.getModal();
            modal.find('.numeric').number( true, 0 );;
            modal.find('.date-picker').datetimepicker({
                locale: abp.localization.currentLanguage.name,
                format: 'L'
            });
            modal.find('.date-picker').each(function(){
                if($(this).val()=="01/01/0001"){
                    $(this).data("DateTimePicker").date(new Date());
                }
            })

            _$maChungTuInformationForm = _modalManager.getModal().find('form[name=MaChungTuInformationsForm]');
            _$maChungTuInformationForm.validate();
        };

		          $('#OpenOrganizationUnitLookupTableButton').click(function () {

            var maChungTu = _$maChungTuInformationForm.serializeFormToObject();

            _organizationUnitLookupTableModal.open({ id: maChungTu.iD_DonVi, displayName: maChungTu.organizationUnitDisplayName }, function (data) {
                _$maChungTuInformationForm.find('input[name=organizationUnitDisplayName]').val(data.displayName); 
                _$maChungTuInformationForm.find('input[name=iD_DonVi]').val(data.id); 
            });
        });
		
		$('#ClearOrganizationUnitDisplayNameButton').click(function () {
                _$maChungTuInformationForm.find('input[name=organizationUnitDisplayName]').val(''); 
                _$maChungTuInformationForm.find('input[name=iD_DonVi]').val(''); 
        });
		


        this.save = function () {
            if (!_$maChungTuInformationForm.valid()) {
                return;
            }

            var maChungTu = _$maChungTuInformationForm.serializeFormToObject();
			 _modalManager.setBusy(true);
			 _maChungTusService.createOrEdit(
				maChungTu
			 ).done(function () {
               abp.notify.info(app.localize('SavedSuccessfully'));
               _modalManager.close();
               abp.event.trigger('app.createOrEditMaChungTuModalSaved');
			 }).always(function () {
               _modalManager.setBusy(false);
			});
        };
    };
})(jQuery);