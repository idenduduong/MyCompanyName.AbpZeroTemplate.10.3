(function ($) {
    app.modals.CreateOrEditDM_HinhThucVanChuyenModal = function () {

        var _dM_HinhThucVanChuyensService = abp.services.app.dM_HinhThucVanChuyens;

        var _modalManager;
        var _$dM_HinhThucVanChuyenInformationForm = null;

		

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

            _$dM_HinhThucVanChuyenInformationForm = _modalManager.getModal().find('form[name=DM_HinhThucVanChuyenInformationsForm]');
            _$dM_HinhThucVanChuyenInformationForm.validate();
        };

		  

        this.save = function () {
            if (!_$dM_HinhThucVanChuyenInformationForm.valid()) {
                return;
            }

            var dM_HinhThucVanChuyen = _$dM_HinhThucVanChuyenInformationForm.serializeFormToObject();
			 _modalManager.setBusy(true);
			 _dM_HinhThucVanChuyensService.createOrEdit(
				dM_HinhThucVanChuyen
			 ).done(function () {
               abp.notify.info(app.localize('SavedSuccessfully'));
               _modalManager.close();
               abp.event.trigger('app.createOrEditDM_HinhThucVanChuyenModalSaved');
			 }).always(function () {
               _modalManager.setBusy(false);
			});
        };
    };
})(jQuery);