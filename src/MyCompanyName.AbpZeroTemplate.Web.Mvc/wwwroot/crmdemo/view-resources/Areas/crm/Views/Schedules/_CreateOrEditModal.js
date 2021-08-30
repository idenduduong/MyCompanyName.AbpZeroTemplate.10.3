(function ($) {
    app.modals.CreateOrEditScheduleModal = function () {

        var _schedulesService = abp.services.app.schedules;

        var _modalManager;
        var _$scheduleInformationForm = null;

        var _nhatKySuDungTheLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/Schedules/NhatKySuDungTheLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/Schedules/_NhatKySuDungTheLookupTableModal.js',
            modalClass: 'NhatKySuDungTheLookupTableModal'
        }); var _userLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/Schedules/UserLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/Schedules/_UserLookupTableModal.js',
            modalClass: 'UserLookupTableModal'
        }); var _organizationUnitLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/Schedules/OrganizationUnitLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/Schedules/_OrganizationUnitLookupTableModal.js',
            modalClass: 'OrganizationUnitLookupTableModal'
        }); var _dM_DoiTuongLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/Schedules/DM_DoiTuongLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/Schedules/_DM_DoiTuongLookupTableModal.js',
            modalClass: 'DM_DoiTuongLookupTableModal'
        });

        this.init = function (modalManager) {
            _modalManager = modalManager;

            var modal = _modalManager.getModal();
            modal.find('.numberic').number(true, 0);
            modal.find('.date-picker').datetimepicker({
                locale: abp.localization.currentLanguage.name,
                format: 'L'
            });
            modal.find('.date-picker').each(function () {
                if ($(this).val() == "01/01/0001") {
                    $(this).data("DateTimePicker").date(new Date());
                }
            })

            _$scheduleInformationForm = _modalManager.getModal().find('form[name=ScheduleInformationsForm]');
            _$scheduleInformationForm.validate();
        };

        $('#OpenNhatKySuDungTheLookupTableButton').click(function () {

            var schedule = _$scheduleInformationForm.serializeFormToObject();

            _nhatKySuDungTheLookupTableModal.open({ id: schedule.lastActivityId, displayName: schedule.nhatKySuDungTheUserName }, function (data) {
                _$scheduleInformationForm.find('input[name=nhatKySuDungTheUserName]').val(data.displayName);
                _$scheduleInformationForm.find('input[name=lastActivityId]').val(data.id);
            });
        });

        $('#ClearNhatKySuDungTheUserNameButton').click(function () {
            _$scheduleInformationForm.find('input[name=nhatKySuDungTheUserName]').val('');
            _$scheduleInformationForm.find('input[name=lastActivityId]').val('');
        });

        $('#OpenUserLookupTableButton').click(function () {

            var schedule = _$scheduleInformationForm.serializeFormToObject();

            _userLookupTableModal.open({ id: schedule.saleId, displayName: schedule.userName }, function (data) {
                _$scheduleInformationForm.find('input[name=userName]').val(data.displayName);
                _$scheduleInformationForm.find('input[name=saleId]').val(data.id);
            });
        });

        $('#ClearUserNameButton').click(function () {
            _$scheduleInformationForm.find('input[name=userName]').val('');
            _$scheduleInformationForm.find('input[name=saleId]').val('');
        });

        $('#OpenUser2LookupTableButton').click(function () {

            var schedule = _$scheduleInformationForm.serializeFormToObject();

            _userLookupTableModal.open({ id: schedule.userId, displayName: schedule.userName2 }, function (data) {
                _$scheduleInformationForm.find('input[name=userName2]').val(data.displayName);
                _$scheduleInformationForm.find('input[name=userId]').val(data.id);
            });
        });

        $('#ClearUserName2Button').click(function () {
            _$scheduleInformationForm.find('input[name=userName2]').val('');
            _$scheduleInformationForm.find('input[name=userId]').val('');
        });

        $('#OpenOrganizationUnitLookupTableButton').click(function () {

            var schedule = _$scheduleInformationForm.serializeFormToObject();

            _organizationUnitLookupTableModal.open({ id: schedule.iD_DonViThucHien, displayName: schedule.organizationUnitDisplayName }, function (data) {
                _$scheduleInformationForm.find('input[name=organizationUnitDisplayName]').val(data.displayName);
                _$scheduleInformationForm.find('input[name=iD_DonViThucHien]').val(data.id);
            });
        });

        $('#ClearOrganizationUnitDisplayNameButton').click(function () {
            _$scheduleInformationForm.find('input[name=organizationUnitDisplayName]').val('');
            _$scheduleInformationForm.find('input[name=iD_DonViThucHien]').val('');
        });

        $('#OpenDM_DoiTuongLookupTableButton').click(function () {

            var schedule = _$scheduleInformationForm.serializeFormToObject();

            _dM_DoiTuongLookupTableModal.open({ id: schedule.khachHangId, displayName: schedule.dM_DoiTuongTenDoiTuong }, function (data) {
                _$scheduleInformationForm.find('input[name=dM_DoiTuongTenDoiTuong]').val(data.displayName);
                _$scheduleInformationForm.find('input[name=khachHangId]').val(data.id);
            });
        });

        $('#ClearDM_DoiTuongTenDoiTuongButton').click(function () {
            _$scheduleInformationForm.find('input[name=dM_DoiTuongTenDoiTuong]').val('');
            _$scheduleInformationForm.find('input[name=khachHangId]').val('');
        });



        this.save = function () {
            if (!_$scheduleInformationForm.valid()) {
                return;
            }

            var schedule = _$scheduleInformationForm.serializeFormToObject();
            _modalManager.setBusy(true);
            _schedulesService.createOrEdit(
                schedule
            ).done(function () {
                abp.notify.info(app.localize('SavedSuccessfully'));
                _modalManager.close();
                abp.event.trigger('app.createOrEditScheduleModalSaved');
            }).always(function () {
                _modalManager.setBusy(false);
            });
        };
    };
})(jQuery);