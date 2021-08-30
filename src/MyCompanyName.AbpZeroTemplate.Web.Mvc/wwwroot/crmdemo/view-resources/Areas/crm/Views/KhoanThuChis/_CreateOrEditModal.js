(function ($) {
    app.modals.CreateOrEditKhoanThuChiModal = function () {

        var _khoanThuChisService = abp.services.app.khoanThuChis;

        var _modalManager;
        var _$khoanThuChiInformationForm = null;

		

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

            _$khoanThuChiInformationForm = _modalManager.getModal().find('form[name=KhoanThuChiInformationsForm]');
            _$khoanThuChiInformationForm.validate();
        };

		  

        this.save = function () {
            if (!_$khoanThuChiInformationForm.valid()) {
                return;
            }

            var khoanThuChi = _$khoanThuChiInformationForm.serializeFormToObject();
			 _modalManager.setBusy(true);
			 _khoanThuChisService.createOrEdit(
				khoanThuChi
			 ).done(function () {
               abp.notify.info(app.localize('SavedSuccessfully'));
               _modalManager.close();
               abp.event.trigger('app.createOrEditKhoanThuChiModalSaved');
			 }).always(function () {
               _modalManager.setBusy(false);
			});
        };
    };
})(jQuery);