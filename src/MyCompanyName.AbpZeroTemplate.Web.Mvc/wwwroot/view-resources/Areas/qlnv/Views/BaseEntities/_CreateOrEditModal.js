﻿(function($) {
    app.modals.CreateOrEditBaseEntityModal = function() {
        var _baseEntitiesService = abp.services.app.baseEntities;
        var _modalManager;
        var _$baseEntityInformationForm = null;
        var _BaseEntityorganizationUnitLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'qlnv/BaseEntities/OrganizationUnitLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/qlnv/Views/BaseEntities/_BaseEntityOrganizationUnitLookupTableModal.js',
            modalClass: 'OrganizationUnitLookupTableModal'
        });
        this.init = function(modalManager) {
            _modalManager = modalManager;
            var modal = _modalManager.getModal();
            modal.find('.date-picker').datetimepicker({
                locale: abp.localization.currentLanguage.name,
                format: 'L'
            });
            _$baseEntityInformationForm = _modalManager.getModal().find('form[name=BaseEntityInformationsForm]');
            _$baseEntityInformationForm.validate();
        };
        $('#OpenOrganizationUnitLookupTableButton').click(function() {
            var baseEntity = _$baseEntityInformationForm.serializeFormToObject();
            _BaseEntityorganizationUnitLookupTableModal.open({
                id: baseEntity.organizationUnitId,
                displayName: baseEntity.organizationUnitDisplayName
            }, function(data) {
                _$baseEntityInformationForm.find('input[name=organizationUnitDisplayName]').val(data.displayName);
                _$baseEntityInformationForm.find('input[name=organizationUnitId]').val(data.id);
            });
        });
        $('#ClearOrganizationUnitDisplayNameButton').click(function() {
            _$baseEntityInformationForm.find('input[name=organizationUnitDisplayName]').val('');
            _$baseEntityInformationForm.find('input[name=organizationUnitId]').val('');
        });
        this.save = function() {
            if (!_$baseEntityInformationForm.valid()) {
                return;
            }
            if ($('#BaseEntity_OrganizationUnitId').prop('required') && $('#BaseEntity_OrganizationUnitId').val() == '') {
                abp.message.error(app.localize('{0}IsRequired', app.localize('OrganizationUnit')));
                return;
            }
            var baseEntity = _$baseEntityInformationForm.serializeFormToObject();
            _modalManager.setBusy(true);
            _baseEntitiesService.createOrEdit(
                baseEntity
            ).done(function() {
                abp.notify.info(app.localize('SavedSuccessfully'));
                _modalManager.close();
                abp.event.trigger('app.createOrEditBaseEntityModalSaved');
            }).always(function() {
                _modalManager.setBusy(false);
            });
        };
    };
})(jQuery);