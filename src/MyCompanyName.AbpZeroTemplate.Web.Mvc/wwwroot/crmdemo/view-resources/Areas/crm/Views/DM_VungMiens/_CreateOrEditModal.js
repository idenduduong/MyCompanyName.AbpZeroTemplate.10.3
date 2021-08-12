(function ($) {
    app.modals.CreateOrEditDM_VungMienModal = function () {

        var _dM_VungMiensService = abp.services.app.dM_VungMiens;

        var _modalManager;
        var _$dM_VungMienInformationForm = null;

		

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

            _$dM_VungMienInformationForm = _modalManager.getModal().find('form[name=DM_VungMienInformationsForm]');
            _$dM_VungMienInformationForm.validate();
        };

		  

        this.save = function () {
            if (!_$dM_VungMienInformationForm.valid()) {
                return;
            }

            var dM_VungMien = _$dM_VungMienInformationForm.serializeFormToObject();
			 _modalManager.setBusy(true);
			 _dM_VungMiensService.createOrEdit(
				dM_VungMien
			 ).done(function () {
               abp.notify.info(app.localize('SavedSuccessfully'));
               _modalManager.close();
               abp.event.trigger('app.createOrEditDM_VungMienModalSaved');
			 }).always(function () {
               _modalManager.setBusy(false);
			});
        };
    };
})(jQuery);