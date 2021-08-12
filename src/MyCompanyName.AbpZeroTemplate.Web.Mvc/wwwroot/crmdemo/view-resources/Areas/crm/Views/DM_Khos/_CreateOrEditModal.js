(function ($) {
    app.modals.CreateOrEditDM_KhoModal = function () {

        var _dM_KhosService = abp.services.app.dM_Khos;

        var _modalManager;
        var _$dM_KhoInformationForm = null;


		

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

            _organizationTree = new OrganizationTree();
            _organizationTree.init(_modalManager.getModal().find('.organization-tree'));
            _$dM_KhoInformationForm = _modalManager.getModal().find('form[name=DM_KhoInformationsForm]');
            _$dM_KhoInformationForm.validate();
        };

		  

        this.save = function () {
            if (!_$dM_KhoInformationForm.valid()) {
                return;
            }

            var dM_Kho = _$dM_KhoInformationForm.serializeFormToObject();
			 _modalManager.setBusy(true);
            _dM_KhosService.createOrEdit({
                dM_Kho:dM_Kho,
                organizationUnits: _organizationTree.getSelectedOrganizations()
            }).done(function () {
               abp.notify.info(app.localize('SavedSuccessfully'));
               _modalManager.close();
               abp.event.trigger('app.createOrEditDM_KhoModalSaved');
			 }).always(function () {
               _modalManager.setBusy(false);
			});
        };
    };
})(jQuery);