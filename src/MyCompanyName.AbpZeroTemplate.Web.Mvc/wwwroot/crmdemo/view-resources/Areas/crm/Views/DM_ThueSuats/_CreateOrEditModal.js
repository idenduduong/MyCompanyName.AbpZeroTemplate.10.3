(function ($) {
    app.modals.CreateOrEditDM_ThueSuatModal = function () {

        var _dM_ThueSuatsService = abp.services.app.dM_ThueSuats;

        var _modalManager;
        var _$dM_ThueSuatInformationForm = null;

		

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

            _$dM_ThueSuatInformationForm = _modalManager.getModal().find('form[name=DM_ThueSuatInformationsForm]');
            _$dM_ThueSuatInformationForm.validate();
        };

		  

        this.save = function () {
            if (!_$dM_ThueSuatInformationForm.valid()) {
                return;
            }

            var dM_ThueSuat = _$dM_ThueSuatInformationForm.serializeFormToObject();
			 _modalManager.setBusy(true);
			 _dM_ThueSuatsService.createOrEdit(
				dM_ThueSuat
			 ).done(function () {
               abp.notify.info(app.localize('SavedSuccessfully'));
               _modalManager.close();
               abp.event.trigger('app.createOrEditDM_ThueSuatModalSaved');
			 }).always(function () {
               _modalManager.setBusy(false);
			});
        };
    };
})(jQuery);