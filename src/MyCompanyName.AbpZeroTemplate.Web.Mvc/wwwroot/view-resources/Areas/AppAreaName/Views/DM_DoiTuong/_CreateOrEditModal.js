(function($) {
    app.modals.CreateOrEditDM_DoiTuongModal = function() {
        var _dM_DoiTuongService = abp.services.app.dM_DoiTuong;
        var _modalManager;
        var _$dM_DoiTuongInformationForm = null;
        this.init = function(modalManager) {
            _modalManager = modalManager;
            var modal = _modalManager.getModal();
            modal.find('.date-picker').datetimepicker({
                locale: abp.localization.currentLanguage.name,
                format: 'L'
            });
            _$dM_DoiTuongInformationForm = _modalManager.getModal().find('form[name=DM_DoiTuongInformationsForm]');
            _$dM_DoiTuongInformationForm.validate();
        };
        this.save = function() {
            if (!_$dM_DoiTuongInformationForm.valid()) {
                return;
            }
            var dM_DoiTuong = _$dM_DoiTuongInformationForm.serializeFormToObject();
            _modalManager.setBusy(true);
            _dM_DoiTuongService.createOrEdit(
                dM_DoiTuong
            ).done(function() {
                abp.notify.info(app.localize('SavedSuccessfully'));
                _modalManager.close();
                abp.event.trigger('app.createOrEditDM_DoiTuongModalSaved');
            }).always(function() {
                _modalManager.setBusy(false);
            });
        };
    };
})(jQuery);