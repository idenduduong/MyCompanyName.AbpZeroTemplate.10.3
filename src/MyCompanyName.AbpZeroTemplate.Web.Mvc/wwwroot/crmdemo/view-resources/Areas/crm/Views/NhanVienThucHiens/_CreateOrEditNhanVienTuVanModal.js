(function ($) {
    app.modals.CreateOrEditNhanVienTuVanModal = function () {
        
        var _nhanVienThucHiensService = abp.services.app.nhanVienThucHiens;

        var _modalManager;
        var _$nhanVienThucHienInformationForm = null;

        var _userLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/NhanVienThucHiens/UserLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/NhanVienThucHiens/_UserLookupTableModal.js',
            modalClass: 'UserLookupTableModal'
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

            _$nhanVienThucHienInformationForm = _modalManager.getModal().find('form[name=NhanVienThucHienInformationsForm]');
            _$nhanVienThucHienInformationForm.validate();
        };
        

        $('#OpenNhanVienLookupTableButton').click(function () {

            var nhanVienThucHien = _$nhanVienThucHienInformationForm.serializeFormToObject();

            _userLookupTableModal.open({ id: nhanVienThucHien.nhanVien, displayName: nhanVienThucHien.userName }, function (data) {
                _$nhanVienThucHienInformationForm.find('input[name=userName]').val(data.displayName);
                _$nhanVienThucHienInformationForm.find('input[name=nhanVien]').val(data.id);
            });
        });

        $('#ClearNhanVienNameButton').click(function () {
            _$nhanVienThucHienInformationForm.find('input[name=userName]').val('');
            _$nhanVienThucHienInformationForm.find('input[name=nhanVien]').val('');
        });
        



        this.save = function () {
            if (!_$nhanVienThucHienInformationForm.valid()) {
                return;
            }

            var nhanVienThucHien = _$nhanVienThucHienInformationForm.serializeFormToObject();
            _modalManager.setBusy(true);
            _nhanVienThucHiensService.createOrEdit(
                nhanVienThucHien
            ).done(function () {
                abp.notify.info(app.localize('SavedSuccessfully'));
                _modalManager.close();
                abp.event.trigger('app.createOrEditNhanVienThucHienModalSaved');
            }).always(function () {
                _modalManager.setBusy(false);
            });
        };
    };
})(jQuery);