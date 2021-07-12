(function($) {
    app.modals.CreateOrEditChildModal = function() {
        var _childsService = abp.services.app.childs;
        var _modalManager;
        var _$childInformationForm = null;
        var _ChildbaseEntityLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'qlnv/Childs/BaseEntityLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/qlnv/Views/Childs/_ChildBaseEntityLookupTableModal.js',
            modalClass: 'BaseEntityLookupTableModal'
        });
        var _ChilduserLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'qlnv/Childs/UserLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/qlnv/Views/Childs/_ChildUserLookupTableModal.js',
            modalClass: 'UserLookupTableModal'
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
        $('#OpenBaseEntityLookupTableButton').click(function() {
            var child = _$childInformationForm.serializeFormToObject();
            _ChildbaseEntityLookupTableModal.open({
                id: child.baseEntityId,
                displayName: child.baseEntityBaseProp1
            }, function(data) {
                _$childInformationForm.find('input[name=baseEntityBaseProp1]').val(data.displayName);
                _$childInformationForm.find('input[name=baseEntityId]').val(data.id);
            });
        });
        $('#ClearBaseEntityBaseProp1Button').click(function() {
            _$childInformationForm.find('input[name=baseEntityBaseProp1]').val('');
            _$childInformationForm.find('input[name=baseEntityId]').val('');
        });
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
            if ($('#Child_BaseEntityId').prop('required') && $('#Child_BaseEntityId').val() == '') {
                abp.message.error(app.localize('{0}IsRequired', app.localize('BaseEntity')));
                return;
            }
            if ($('#Child_UserId').prop('required') && $('#Child_UserId').val() == '') {
                abp.message.error(app.localize('{0}IsRequired', app.localize('User')));
                return;
            }
            var child = _$childInformationForm.serializeFormToObject();
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