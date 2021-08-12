(function ($) {
    app.modals.CreateOrEditDM_LoaiPhongModal = function () {

        var _dM_LoaiPhongsService = abp.services.app.dM_LoaiPhongs;

        var _modalManager;
        var _$dM_LoaiPhongInformationForm = null;

		

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

            _$dM_LoaiPhongInformationForm = _modalManager.getModal().find('form[name=DM_LoaiPhongInformationsForm]');
            _$dM_LoaiPhongInformationForm.validate();
        };

		  

        this.save = function () {
            if (!_$dM_LoaiPhongInformationForm.valid()) {
                return;
            }

            var dM_LoaiPhong = _$dM_LoaiPhongInformationForm.serializeFormToObject();
			 _modalManager.setBusy(true);
			 _dM_LoaiPhongsService.createOrEdit(
				dM_LoaiPhong
			 ).done(function () {
               abp.notify.info(app.localize('SavedSuccessfully'));
               _modalManager.close();
               abp.event.trigger('app.createOrEditDM_LoaiPhongModalSaved');
			 }).always(function () {
               _modalManager.setBusy(false);
			});
        };
    };
})(jQuery);