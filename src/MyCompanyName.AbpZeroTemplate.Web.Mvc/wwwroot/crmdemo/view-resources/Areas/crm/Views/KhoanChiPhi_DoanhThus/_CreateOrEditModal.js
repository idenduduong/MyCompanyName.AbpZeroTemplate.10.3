(function ($) {
    app.modals.CreateOrEditKhoanChiPhi_DoanhThuModal = function () {

        var _khoanChiPhi_DoanhThusService = abp.services.app.khoanChiPhi_DoanhThus;

        var _modalManager;
        var _$khoanChiPhi_DoanhThuInformationForm = null;

		

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

            _$khoanChiPhi_DoanhThuInformationForm = _modalManager.getModal().find('form[name=KhoanChiPhi_DoanhThuInformationsForm]');
            _$khoanChiPhi_DoanhThuInformationForm.validate();
        };

		  

        this.save = function () {
            if (!_$khoanChiPhi_DoanhThuInformationForm.valid()) {
                return;
            }

            var khoanChiPhi_DoanhThu = _$khoanChiPhi_DoanhThuInformationForm.serializeFormToObject();
			 _modalManager.setBusy(true);
			 _khoanChiPhi_DoanhThusService.createOrEdit(
				khoanChiPhi_DoanhThu
			 ).done(function () {
               abp.notify.info(app.localize('SavedSuccessfully'));
               _modalManager.close();
               abp.event.trigger('app.createOrEditKhoanChiPhi_DoanhThuModalSaved');
			 }).always(function () {
               _modalManager.setBusy(false);
			});
        };
    };
})(jQuery);