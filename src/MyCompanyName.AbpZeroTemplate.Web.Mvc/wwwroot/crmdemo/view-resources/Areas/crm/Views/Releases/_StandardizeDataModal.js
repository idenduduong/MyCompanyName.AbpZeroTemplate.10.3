(function ($) {
    app.modals.StandardizeDataModal = function () {

        var _releasesService = abp.services.app.releases;

        var _modalManager;
        var _$releaseInformationForm = null;

        this.init = function (modalManager) {
            _modalManager = modalManager;

            var modal = _modalManager.getModal();
            modal.find('.numeric').number(true, 0);

            _$releaseInformationForm = _modalManager.getModal().find('form[name=StandardizeDataForm]');
            _$releaseInformationForm.validate();
        };

        this.save = function () {
            if (!_$releaseInformationForm.valid()) {
                return;
            }

            var release = _$releaseInformationForm.serializeFormToObject();
            _modalManager.setBusy(true);
            _releasesService.standardizeData(
                release
            ).done(function () {
                abp.notify.info(app.localize('SavedSuccessfully'));
                _modalManager.close();
                abp.event.trigger('app.createOrEditReleaseModalSaved');
            }).always(function () {
                _modalManager.setBusy(false);
            });
        };
    };
})(jQuery);