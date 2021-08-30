(function ($) {
    app.modals.CreateOrEditDM_QuocGiaModal = function () {

        var _dM_QuocGiasService = abp.services.app.dM_QuocGias;

        var _modalManager;
        var _$dM_QuocGiaInformationForm = null;

		

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

            _$dM_QuocGiaInformationForm = _modalManager.getModal().find('form[name=DM_QuocGiaInformationsForm]');
            _$dM_QuocGiaInformationForm.validate();
        };

		  

        this.save = function () {
            if (!_$dM_QuocGiaInformationForm.valid()) {
                return;
            }

            var dM_QuocGia = _$dM_QuocGiaInformationForm.serializeFormToObject();
			 _modalManager.setBusy(true);
			 _dM_QuocGiasService.createOrEdit(
				dM_QuocGia
			 ).done(function () {
               abp.notify.info(app.localize('SavedSuccessfully'));
               _modalManager.close();
               abp.event.trigger('app.createOrEditDM_QuocGiaModalSaved');
			 }).always(function () {
               _modalManager.setBusy(false);
			});
        };
    };
})(jQuery);