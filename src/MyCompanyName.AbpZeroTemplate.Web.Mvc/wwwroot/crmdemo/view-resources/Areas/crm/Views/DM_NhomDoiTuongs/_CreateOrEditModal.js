(function ($) {
    app.modals.CreateOrEditDM_NhomDoiTuongModal = function () {

        var _dM_NhomDoiTuongsService = abp.services.app.dM_NhomDoiTuongs;

        var _modalManager;
        var _$dM_NhomDoiTuongInformationForm = null;

		

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

            _$dM_NhomDoiTuongInformationForm = _modalManager.getModal().find('form[name=DM_NhomDoiTuongInformationsForm]');
            _$dM_NhomDoiTuongInformationForm.validate();
        };

		  

        this.save = function () {
            if (!_$dM_NhomDoiTuongInformationForm.valid()) {
                return;
            }

            var dM_NhomDoiTuong = _$dM_NhomDoiTuongInformationForm.serializeFormToObject();
			 _modalManager.setBusy(true);
			 _dM_NhomDoiTuongsService.createOrEdit(
				dM_NhomDoiTuong
			 ).done(function () {
               abp.notify.info(app.localize('SavedSuccessfully'));
               _modalManager.close();
               abp.event.trigger('app.createOrEditDM_NhomDoiTuongModalSaved');
			 }).always(function () {
               _modalManager.setBusy(false);
			});
        };
    };
})(jQuery);