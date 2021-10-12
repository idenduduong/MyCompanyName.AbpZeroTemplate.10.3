(function ($) {
    app.modals.CreateOrEditModal = function () {

        var _$service = abp.services.app.buuCucs;

        var _modalManager;
        var _$dM_QuanHuyenInformationForm = null;

        var _dM_TinhThanhLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'qlnv/BuuCucs/ProvinceLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/qlnv/Views/BuuCucs/_ProvinceLookupTableModal.js',
            modalClass: 'ProvinceLookupTableModal'
        });

        var _communeLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'qlnv/BuuCucs/CommuneLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/qlnv/Views/BuuCucs/_CommuneLookupTableModal.js',
            modalClass: 'CommuneLookupTableModal'
        });

        var _unitLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'qlnv/BuuCucs/UnitLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/qlnv/Views/BuuCucs/_UnitLookupTableModal.js',
            modalClass: 'UnitLookupTableModal'
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

            _$dM_QuanHuyenInformationForm = _modalManager.getModal().find('form[name=DM_QuanHuyenInformationsForm]');
            _$dM_QuanHuyenInformationForm.validate();
        };

        $('#OpenProvinceLookupTableButton').click(function () {
            var dM_QuanHuyen = _$dM_QuanHuyenInformationForm.serializeFormToObject();

            _dM_TinhThanhLookupTableModal.open({ id: dM_QuanHuyen.ProvinceCode, displayName: dM_QuanHuyen.ProvinceName }, function (data) {
                _$dM_QuanHuyenInformationForm.find('input[name=ProvinceName]').val(data.displayName);
                _$dM_QuanHuyenInformationForm.find('input[name=ProvinceCode]').val(data.id);
            });
        });

        $('#OpenCommuneLookupTableButton').click(function () {
            var dM_QuanHuyen = _$dM_QuanHuyenInformationForm.serializeFormToObject();

            _communeLookupTableModal.open({ id: dM_QuanHuyen.CommuneCode, displayName: dM_QuanHuyen.CommuneName }, function (data) {
                _$dM_QuanHuyenInformationForm.find('input[name=CommuneName]').val(data.displayName);
                _$dM_QuanHuyenInformationForm.find('input[name=CommuneCode]').val(data.id);
            });
        });

        $('#OpenUnitLookupTableButton').click(function () {
            var dM_QuanHuyen = _$dM_QuanHuyenInformationForm.serializeFormToObject();

            _unitLookupTableModal.open({ id: dM_QuanHuyen.UnitCode, displayName: dM_QuanHuyen.UnitName }, function (data) {
                _$dM_QuanHuyenInformationForm.find('input[name=UnitName]').val(data.displayName);
                _$dM_QuanHuyenInformationForm.find('input[name=UnitCode]').val(data.id);
            });
        });

        $('#ClearProvinceButton').click(function () {
            _$dM_QuanHuyenInformationForm.find('input[name=ProvinceName]').val('');
            _$dM_QuanHuyenInformationForm.find('input[name=ProvinceCode]').val('');
        });

        $('#ClearCommuneButton').click(function () {
            _$dM_QuanHuyenInformationForm.find('input[name=CommuneName]').val('');
            _$dM_QuanHuyenInformationForm.find('input[name=CommuneCode]').val('');
        });

        $('#ClearUnitButton').click(function () {
            _$dM_QuanHuyenInformationForm.find('input[name=UnitName]').val('');
            _$dM_QuanHuyenInformationForm.find('input[name=UnitCode]').val('');
        });

        this.save = function () {
            if (!_$dM_QuanHuyenInformationForm.valid()) {
                return;
            }

            var dM_QuanHuyen = _$dM_QuanHuyenInformationForm.serializeFormToObject();
            _modalManager.setBusy(true);
            _$service.createOrEdit(dM_QuanHuyen).done(function () {
                abp.notify.info(app.localize('SavedSuccessfully'));
                _modalManager.close();
                abp.event.trigger('app.createOrEditModalSaved');
            }).always(function () {
                _modalManager.setBusy(false);
            });
        };
    };
})(jQuery);