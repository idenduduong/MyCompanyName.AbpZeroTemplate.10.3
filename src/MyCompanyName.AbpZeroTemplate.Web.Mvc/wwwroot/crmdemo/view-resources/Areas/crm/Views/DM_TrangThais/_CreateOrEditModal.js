(function ($) {
    app.modals.CreateOrEditDM_TrangThaiModal = function () {

        var _dM_TrangThaisService = abp.services.app.dM_TrangThais;

        var _modalManager;
        var _$dM_TrangThaiInformationForm = null;

		

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

            _$dM_TrangThaiInformationForm = _modalManager.getModal().find('form[name=DM_TrangThaiInformationsForm]');
            _$dM_TrangThaiInformationForm.validate();
        };

		  

        this.save = function () {
            if (!_$dM_TrangThaiInformationForm.valid()) {
                return;
            }

            var dM_TrangThai = _$dM_TrangThaiInformationForm.serializeFormToObject();
			 _modalManager.setBusy(true);
			 _dM_TrangThaisService.createOrEdit(
				dM_TrangThai
			 ).done(function () {
               abp.notify.info(app.localize('SavedSuccessfully'));
               _modalManager.close();
               abp.event.trigger('app.createOrEditDM_TrangThaiModalSaved');
			 }).always(function () {
               _modalManager.setBusy(false);
			});
        };
    };
})(jQuery);