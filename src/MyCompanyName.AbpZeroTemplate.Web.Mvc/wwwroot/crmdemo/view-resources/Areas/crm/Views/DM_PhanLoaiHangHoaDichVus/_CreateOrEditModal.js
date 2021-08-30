(function ($) {
    app.modals.CreateOrEditDM_PhanLoaiHangHoaDichVuModal = function () {

        var _dM_PhanLoaiHangHoaDichVusService = abp.services.app.dM_PhanLoaiHangHoaDichVus;

        var _modalManager;
        var _$dM_PhanLoaiHangHoaDichVuInformationForm = null;

		

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

            _$dM_PhanLoaiHangHoaDichVuInformationForm = _modalManager.getModal().find('form[name=DM_PhanLoaiHangHoaDichVuInformationsForm]');
            _$dM_PhanLoaiHangHoaDichVuInformationForm.validate();
        };

		  

        this.save = function () {
            if (!_$dM_PhanLoaiHangHoaDichVuInformationForm.valid()) {
                return;
            }

            var dM_PhanLoaiHangHoaDichVu = _$dM_PhanLoaiHangHoaDichVuInformationForm.serializeFormToObject();
			 _modalManager.setBusy(true);
			 _dM_PhanLoaiHangHoaDichVusService.createOrEdit(
				dM_PhanLoaiHangHoaDichVu
			 ).done(function () {
               abp.notify.info(app.localize('SavedSuccessfully'));
               _modalManager.close();
               abp.event.trigger('app.createOrEditDM_PhanLoaiHangHoaDichVuModalSaved');
			 }).always(function () {
               _modalManager.setBusy(false);
			});
        };
    };
})(jQuery);