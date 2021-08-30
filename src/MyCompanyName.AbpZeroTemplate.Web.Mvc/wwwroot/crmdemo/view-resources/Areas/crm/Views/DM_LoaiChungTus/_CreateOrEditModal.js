(function ($) {
    app.modals.CreateOrEditDM_LoaiChungTuModal = function () {

        var _dM_LoaiChungTusService = abp.services.app.dM_LoaiChungTus;

        var _modalManager;
        var _$dM_LoaiChungTuInformationForm = null;

		

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

            _$dM_LoaiChungTuInformationForm = _modalManager.getModal().find('form[name=DM_LoaiChungTuInformationsForm]');
            _$dM_LoaiChungTuInformationForm.validate();
        };

		  

        this.save = function () {
            if (!_$dM_LoaiChungTuInformationForm.valid()) {
                return;
            }

            var dM_LoaiChungTu = _$dM_LoaiChungTuInformationForm.serializeFormToObject();
			 _modalManager.setBusy(true);
			 _dM_LoaiChungTusService.createOrEdit(
				dM_LoaiChungTu
			 ).done(function () {
               abp.notify.info(app.localize('SavedSuccessfully'));
               _modalManager.close();
               abp.event.trigger('app.createOrEditDM_LoaiChungTuModalSaved');
			 }).always(function () {
               _modalManager.setBusy(false);
			});
        };
    };
})(jQuery);