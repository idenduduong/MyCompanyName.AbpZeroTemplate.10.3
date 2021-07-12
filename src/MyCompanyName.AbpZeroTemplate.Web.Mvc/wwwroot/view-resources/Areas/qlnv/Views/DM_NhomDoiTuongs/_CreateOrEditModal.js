(function($) {
    app.modals.CreateOrEditDM_NhomDoiTuongsModal = function() {
        var _dM_NhomDoiTuongsService = abp.services.app.dM_NhomDoiTuongs;
        var _modalManager;
        var _$dM_NhomDoiTuongsInformationForm = null;
        this.init = function(modalManager) {
            _modalManager = modalManager;
            var modal = _modalManager.getModal();
            modal.find('.date-picker').datetimepicker({
                locale: abp.localization.currentLanguage.name,
                format: 'L'
            });
            _$dM_NhomDoiTuongsInformationForm = _modalManager.getModal().find('form[name=DM_NhomDoiTuongsInformationsForm]');
            _$dM_NhomDoiTuongsInformationForm.validate();
        };
        this.save = function() {
            if (!_$dM_NhomDoiTuongsInformationForm.valid()) {
                return;
            }
            var dM_NhomDoiTuongs = _$dM_NhomDoiTuongsInformationForm.serializeFormToObject();
            _modalManager.setBusy(true);
            _dM_NhomDoiTuongsService.createOrEdit(
                dM_NhomDoiTuongs
            ).done(function() {
                abp.notify.info(app.localize('SavedSuccessfully'));
                _modalManager.close();
                abp.event.trigger('app.createOrEditDM_NhomDoiTuongsModalSaved');
            }).always(function() {
                _modalManager.setBusy(false);
            });
        };
    };
})(jQuery);