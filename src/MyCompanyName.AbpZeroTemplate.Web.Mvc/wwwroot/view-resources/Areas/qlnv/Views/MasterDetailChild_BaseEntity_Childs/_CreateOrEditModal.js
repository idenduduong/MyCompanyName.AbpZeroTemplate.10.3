﻿(function($) {
    app.modals.MasterDetailChild_BaseEntity_CreateOrEditChildModal = function() {
        var _childsService = abp.services.app.childs;
        var _modalManager;
        var _$childInformationForm = null;
        var _ChilduserLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'qlnv/MasterDetailChild_BaseEntity_Childs/UserLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/qlnv/Views/MasterDetailChild_BaseEntity_Childs/_ChildUserLookupTableModal.js',
            modalClass: 'MasterDetailChild_BaseEntity_UserLookupTableModal'
        });
        this.init = function(modalManager) {
            _modalManager = modalManager;
            var modal = _modalManager.getModal();
            modal.find('.date-picker').datetimepicker({
                locale: abp.localization.currentLanguage.name,
                format: 'L'
            });
            _$childInformationForm = _modalManager.getModal().find('form[name=ChildInformationsForm]');
            _$childInformationForm.validate();
        };
        $('#OpenUserLookupTableButton').click(function() {
            var child = _$childInformationForm.serializeFormToObject();
            _ChilduserLookupTableModal.open({
                id: child.userId,
                displayName: child.userName
            }, function(data) {
                _$childInformationForm.find('input[name=userName]').val(data.displayName);
                _$childInformationForm.find('input[name=userId]').val(data.id);
            });
        });
        $('#ClearUserNameButton').click(function() {
            _$childInformationForm.find('input[name=userName]').val('');
            _$childInformationForm.find('input[name=userId]').val('');
        });
        this.save = function() {
            if (!_$childInformationForm.valid()) {
                return;
            }
            if ($('#Child_UserId').prop('required') && $('#Child_UserId').val() == '') {
                abp.message.error(app.localize('{0}IsRequired', app.localize('User')));
                return;
            }
            var child = _$childInformationForm.serializeFormToObject();
            child.baseEntityId = $('#MasterDetailChild_BaseEntity_ChildsId').val();
            _modalManager.setBusy(true);
            _childsService.createOrEdit(
                child
            ).done(function() {
                abp.notify.info(app.localize('SavedSuccessfully'));
                _modalManager.close();
                abp.event.trigger('app.createOrEditChildModalSaved');
            }).always(function() {
                _modalManager.setBusy(false);
            });
        };
    };
})(jQuery);