(function ($) {
    app.modals.CreateOrEditDM_KhuVucModal = function () {

        var _dM_KhuVucsService = abp.services.app.dM_KhuVucs;

        var _modalManager;
        var _$dM_KhuVucInformationForm = null;

		

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

            _$dM_KhuVucInformationForm = _modalManager.getModal().find('form[name=DM_KhuVucInformationsForm]');
            _$dM_KhuVucInformationForm.validate();
        };

		  

        this.save = function () {
            if (!_$dM_KhuVucInformationForm.valid()) {
                return;
            }

            var dM_KhuVuc = _$dM_KhuVucInformationForm.serializeFormToObject();
			 _modalManager.setBusy(true);
			 _dM_KhuVucsService.createOrEdit(
				dM_KhuVuc
			 ).done(function () {
               abp.notify.info(app.localize('SavedSuccessfully'));
               _modalManager.close();
               abp.event.trigger('app.createOrEditDM_KhuVucModalSaved');
			 }).always(function () {
               _modalManager.setBusy(false);
			});
        };
    };
})(jQuery);