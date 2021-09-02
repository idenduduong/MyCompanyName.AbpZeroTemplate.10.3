(function ($) {
    app.modals.CreateOrEditDM_NhomTheModal = function () {

        var _dM_NhomThesService = abp.services.app.dM_NhomThes;

        var _modalManager;
        var _$dM_NhomTheInformationForm = null;

		

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

            _$dM_NhomTheInformationForm = _modalManager.getModal().find('form[name=DM_NhomTheInformationsForm]');
            _$dM_NhomTheInformationForm.validate();
        };

		  

        this.save = function () {
            if (!_$dM_NhomTheInformationForm.valid()) {
                return;
            }

            var dM_NhomThe = _$dM_NhomTheInformationForm.serializeFormToObject();
			 _modalManager.setBusy(true);
			 _dM_NhomThesService.createOrEdit(
				dM_NhomThe
			 ).done(function () {
               abp.notify.info(app.localize('SavedSuccessfully'));
               _modalManager.close();
               abp.event.trigger('app.createOrEditDM_NhomTheModalSaved');
			 }).always(function () {
               _modalManager.setBusy(false);
			});
        };
    };
})(jQuery);