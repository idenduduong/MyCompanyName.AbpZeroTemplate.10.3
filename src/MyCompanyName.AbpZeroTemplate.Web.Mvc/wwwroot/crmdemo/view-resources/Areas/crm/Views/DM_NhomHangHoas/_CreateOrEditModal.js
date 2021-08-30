(function ($) {
    app.modals.CreateOrEditDM_NhomHangHoaModal = function () {

        var _dM_NhomHangHoasService = abp.services.app.dM_NhomHangHoas;

        var _modalManager;
        var _$dM_NhomHangHoaInformationForm = null;

        var _dM_KhoLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_NhomHangHoas/DM_KhoLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_NhomHangHoas/_DM_KhoLookupTableModal.js',
            modalClass: 'DM_KhoLookupTableModal'
        });

        var _ParentLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_NhomHangHoas/ParentLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_NhomHangHoas/_ParentLookupTableModal.js',
            modalClass: 'ParentLookupTableModal'
        })

        this.init = function (modalManager) {
            _modalManager = modalManager;

            var modal = _modalManager.getModal();
            modal.find('.numeric').number( true, 0 );;
            modal.find('.date-picker').datetimepicker({
                locale: abp.localization.currentLanguage.name,
                format: 'L'
            });
            modal.find('.date-picker').each(function () {
                if ($(this).val() == "01/01/0001") {
                    $(this).data("DateTimePicker").date(new Date());
                }
            })

            _organizationTree = new OrganizationTree();
            _organizationTree.init(_modalManager.getModal().find('.organization-tree'));
            _$dM_NhomHangHoaInformationForm = _modalManager.getModal().find('form[name=DM_NhomHangHoaInformationsForm]');
            _$dM_NhomHangHoaInformationForm.validate();
        };

        $('#OpenDM_KhoLookupTableButton').click(function () {

            var dM_NhomHangHoa = _$dM_NhomHangHoaInformationForm.serializeFormToObject();

            _dM_KhoLookupTableModal.open({ id: dM_NhomHangHoa.iD_Kho, displayName: dM_NhomHangHoa.dM_KhoTenKho }, function (data) {
                _$dM_NhomHangHoaInformationForm.find('input[name=dM_KhoTenKho]').val(data.displayName);
                _$dM_NhomHangHoaInformationForm.find('input[name=iD_Kho]').val(data.id);
            });
        });

        $('#OpenParentLookupTableButton').click(function () {

            var dM_NhomHangHoa = _$dM_NhomHangHoaInformationForm.serializeFormToObject();

            _ParentLookupTableModal.open({ id: dM_NhomHangHoa.iD_Parent, displayName: dM_NhomHangHoa.parentName }, function (data) {
                _$dM_NhomHangHoaInformationForm.find('input[name=parentName]').val(data.displayName);
                _$dM_NhomHangHoaInformationForm.find('input[name=iD_Parent]').val(data.id);
            });
        });

        $('#ClearDM_KhoTenKhoButton').click(function () {
            _$dM_NhomHangHoaInformationForm.find('input[name=dM_KhoTenKho]').val('');
            _$dM_NhomHangHoaInformationForm.find('input[name=iD_Kho]').val('');
        });
        $('#ClearParentButton').click(function () {
            _$dM_NhomHangHoaInformationForm.find('input[name=parentName]').val('');
            _$dM_NhomHangHoaInformationForm.find('input[name=iD_Parent]').val('');
        });



        this.save = function () {
            if (!_$dM_NhomHangHoaInformationForm.valid()) {
                return;
            }

            var dM_NhomHangHoa = _$dM_NhomHangHoaInformationForm.serializeFormToObject();
            _modalManager.setBusy(true);
            _dM_NhomHangHoasService.createOrEdit({
                dM_NhomHangHoa: dM_NhomHangHoa,
                organizationUnits: _organizationTree.getSelectedOrganizations()
            }
            ).done(function () {
                abp.notify.info(app.localize('SavedSuccessfully'));
                _modalManager.close();
                abp.event.trigger('app.createOrEditDM_NhomHangHoaModalSaved');
            }).always(function () {
                _modalManager.setBusy(false);
            });
        };
    };
})(jQuery);