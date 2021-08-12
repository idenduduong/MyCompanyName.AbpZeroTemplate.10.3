(function ($) {
    app.modals.CreateOrEditNguonKhachHangModal = function () {

        var _nguonKhachHangsService = abp.services.app.nguonKhachHangs;

        var _modalManager;
        var _$nguonKhachHangInformationForm = null;

		

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

            _$nguonKhachHangInformationForm = _modalManager.getModal().find('form[name=NguonKhachHangInformationsForm]');
            _$nguonKhachHangInformationForm.validate();
        };

		  

        this.save = function () {
            if (!_$nguonKhachHangInformationForm.valid()) {
                return;
            }

            var nguonKhachHang = _$nguonKhachHangInformationForm.serializeFormToObject();
			 _modalManager.setBusy(true);
			 _nguonKhachHangsService.createOrEdit(
				nguonKhachHang
			 ).done(function () {
               abp.notify.info(app.localize('SavedSuccessfully'));
               _modalManager.close();
               abp.event.trigger('app.createOrEditNguonKhachHangModalSaved');
			 }).always(function () {
               _modalManager.setBusy(false);
			});
        };
    };
})(jQuery);