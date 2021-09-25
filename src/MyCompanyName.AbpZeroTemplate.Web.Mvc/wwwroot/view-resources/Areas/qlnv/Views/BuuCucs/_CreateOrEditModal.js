(function ($) {
    app.modals.CreateOrEditModal = function () {

        var _$service = abp.services.app.buuCucs;

        var _modalManager;
        var _$dM_QuanHuyenInformationForm = null;
        var _dM_TinhThanhLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'qlnv/BuuCucs/ProvinceLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_QuanHuyens/_DM_TinhThanhLookupTableModal.js',
            modalClass: 'ProvinceLookupTableModal'
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

            _dM_TinhThanhLookupTableModal.open({ id: dM_QuanHuyen.iD_TinhThanh, displayName: dM_QuanHuyen.dM_TinhThanhTenTinhThanh }, function (data) {
                _$dM_QuanHuyenInformationForm.find('input[name=dM_TinhThanhTenTinhThanh]').val(data.displayName);
                _$dM_QuanHuyenInformationForm.find('input[name=iD_TinhThanh]').val(data.id);
            });
        });

        $('#ClearDM_TinhThanhTenTinhThanhButton').click(function () {
            _$dM_QuanHuyenInformationForm.find('input[name=dM_TinhThanhTenTinhThanh]').val('');
            _$dM_QuanHuyenInformationForm.find('input[name=iD_TinhThanh]').val('');
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