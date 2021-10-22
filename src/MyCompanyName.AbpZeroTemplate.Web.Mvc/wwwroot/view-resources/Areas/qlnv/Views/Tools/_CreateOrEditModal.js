(function ($) {
    app.modals.CreateOrEditModal = function () {

        var _$service = abp.services.app.tools;

        var _modalManager;
        var _$InformationForm = null;

        var _unitLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'qlnv/Tools/UnitLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/qlnv/Views/Tools/_UnitLookupTableModal.js',
            modalClass: 'UnitLookupTableModal'
        });

        var _posLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'qlnv/Tools/PosLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/qlnv/Views/Tools/_PosLookupTableModal.js',
            modalClass: 'PosLookupTableModal'
        });

        this.init = function (modalManager) {
            _modalManager = modalManager;

            var modal = _modalManager.getModal();
            modal.find('.numeric').number(true, 0);;
            modal.find('.date-picker').datetimepicker({
                locale: abp.localization.currentLanguage.name,
                format: 'L'
            });
            modal.find('.date-picker').each(function () {
                if ($(this).val() == "01/01/0001") {
                    $(this).data("DateTimePicker").date(new Date());
                }
            })

            _$InformationForm = _modalManager.getModal().find('form[name=InformationsForm]');
            _$InformationForm.validate();
        };

        $('#OpenUnitLookupTableButton').click(function () {
            var InformationForm = _$InformationForm.serializeFormToObject();
            _unitLookupTableModal.open({ id: InformationForm.UnitCode, displayName: InformationForm.UnitName }, function (data) {
                _$InformationForm.find('input[name=unitCode]').val(data.displayName);
                _$InformationForm.find('input[name=unitName]').val(data.id);
            });
        });

        $('#OpenPosLookupTableButton').click(function () {
            var InformationForm = _$InformationForm.serializeFormToObject();
            _posLookupTableModal.open({ id: InformationForm.posCode, displayName: InformationForm.posName }, function (data) {
                _$InformationForm.find('input[name=posName]').val(data.displayName);
                _$InformationForm.find('input[name=posCode]').val(data.id);
            });
        });

        $('#ClearProvinceButton').click(function () {
            _$InformationForm.find('input[name=ProvinceName]').val('');
            _$InformationForm.find('input[name=ProvinceCode]').val('');
        });

        $('#ClearCommuneButton').click(function () {
            _$InformationForm.find('input[name=CommuneName]').val('');
            _$InformationForm.find('input[name=CommuneCode]').val('');
        });

        $('#ClearUnitButton').click(function () {
            _$InformationForm.find('input[name=UnitName]').val('');
            _$InformationForm.find('input[name=UnitCode]').val('');
        });

        this.save = function () {
            if (!_$InformationForm.valid()) {
                return;
            }

            var InformationForm = _$InformationForm.serializeFormToObject();
            _modalManager.setBusy(true);
            _$service.createOrEdit(InformationForm).done(function () {
                abp.notify.info(app.localize('SavedSuccessfully'));
                _modalManager.close();
                abp.event.trigger('app.createOrEditModalSaved');
            }).always(function () {
                _modalManager.setBusy(false);
            });
        };
    };
})(jQuery);