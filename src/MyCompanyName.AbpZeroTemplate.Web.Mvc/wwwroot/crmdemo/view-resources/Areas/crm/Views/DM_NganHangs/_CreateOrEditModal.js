(function ($) {
    app.modals.CreateOrEditDM_NganHangModal = function () {

        var _dM_NganHangsService = abp.services.app.dM_NganHangs;

        var _modalManager;
        var _$dM_NganHangInformationForm = null;

		

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

            _$dM_NganHangInformationForm = _modalManager.getModal().find('form[name=DM_NganHangInformationsForm]');
            _$dM_NganHangInformationForm.validate();
        };

		  

        this.save = function () {
            if (!_$dM_NganHangInformationForm.valid()) {
                return;
            }

            var dM_NganHang = _$dM_NganHangInformationForm.serializeFormToObject();
			 _modalManager.setBusy(true);
			 _dM_NganHangsService.createOrEdit(
				dM_NganHang
			 ).done(function () {
               abp.notify.info(app.localize('SavedSuccessfully'));
               _modalManager.close();
               abp.event.trigger('app.createOrEditDM_NganHangModalSaved');
			 }).always(function () {
               _modalManager.setBusy(false);
			});
        };
    };
})(jQuery);