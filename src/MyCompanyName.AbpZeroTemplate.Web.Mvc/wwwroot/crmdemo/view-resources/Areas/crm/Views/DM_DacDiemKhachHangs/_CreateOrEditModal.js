(function ($) {
    app.modals.CreateOrEditDM_DacDiemKhachHangModal = function () {

        var _dM_DacDiemKhachHangsService = abp.services.app.dM_DacDiemKhachHangs;

        var _modalManager;
        var _$dM_DacDiemKhachHangInformationForm = null;

		

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

            _$dM_DacDiemKhachHangInformationForm = _modalManager.getModal().find('form[name=DM_DacDiemKhachHangInformationsForm]');
            _$dM_DacDiemKhachHangInformationForm.validate();
        };

		  

        this.save = function () {
            if (!_$dM_DacDiemKhachHangInformationForm.valid()) {
                return;
            }

            var dM_DacDiemKhachHang = _$dM_DacDiemKhachHangInformationForm.serializeFormToObject();
			 _modalManager.setBusy(true);
			 _dM_DacDiemKhachHangsService.createOrEdit(
				dM_DacDiemKhachHang
			 ).done(function () {
               abp.notify.info(app.localize('SavedSuccessfully'));
               _modalManager.close();
               abp.event.trigger('app.createOrEditDM_DacDiemKhachHangModalSaved');
			 }).always(function () {
               _modalManager.setBusy(false);
			});
        };
    };
})(jQuery);