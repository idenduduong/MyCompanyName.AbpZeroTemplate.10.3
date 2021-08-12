(function ($) {
    app.modals.CreateOrEditPositionModal = function () {

        var _positionsService = abp.services.app.positions;

        var _modalManager;
        var _$positionInformationForm = null;

		

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

            _$positionInformationForm = _modalManager.getModal().find('form[name=PositionInformationsForm]');
            _$positionInformationForm.validate();
        };

		  

        this.save = function () {
            if (!_$positionInformationForm.valid()) {
                return;
            }

            var position = _$positionInformationForm.serializeFormToObject();
			 _modalManager.setBusy(true);
			 _positionsService.createOrEdit(
				position
			 ).done(function () {
               abp.notify.info(app.localize('SavedSuccessfully'));
               _modalManager.close();
               abp.event.trigger('app.createOrEditPositionModalSaved');
			 }).always(function () {
               _modalManager.setBusy(false);
			});
        };
    };
})(jQuery);