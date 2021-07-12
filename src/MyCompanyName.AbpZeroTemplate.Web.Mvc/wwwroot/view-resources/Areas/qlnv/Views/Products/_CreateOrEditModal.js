﻿(function($) {
    app.modals.CreateOrEditProductModal = function() {
        var _productsService = abp.services.app.products;
        var _modalManager;
        var _$productInformationForm = null;
        var _ProductuserLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'qlnv/Products/UserLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/qlnv/Views/Products/_ProductUserLookupTableModal.js',
            modalClass: 'UserLookupTableModal'
        });
        this.init = function(modalManager) {
            _modalManager = modalManager;
            var modal = _modalManager.getModal();
            modal.find('.date-picker').datetimepicker({
                locale: abp.localization.currentLanguage.name,
                format: 'L'
            });
            _$productInformationForm = _modalManager.getModal().find('form[name=ProductInformationsForm]');
            _$productInformationForm.validate();
        };
        $('#OpenUserLookupTableButton').click(function() {
            var product = _$productInformationForm.serializeFormToObject();
            _ProductuserLookupTableModal.open({
                id: product.userId,
                displayName: product.userName
            }, function(data) {
                _$productInformationForm.find('input[name=userName]').val(data.displayName);
                _$productInformationForm.find('input[name=userId]').val(data.id);
            });
        });
        $('#ClearUserNameButton').click(function() {
            _$productInformationForm.find('input[name=userName]').val('');
            _$productInformationForm.find('input[name=userId]').val('');
        });
        this.save = function() {
            if (!_$productInformationForm.valid()) {
                return;
            }
            if ($('#Product_UserId').prop('required') && $('#Product_UserId').val() == '') {
                abp.message.error(app.localize('{0}IsRequired', app.localize('User')));
                return;
            }
            var product = _$productInformationForm.serializeFormToObject();
            _modalManager.setBusy(true);
            _productsService.createOrEdit(
                product
            ).done(function() {
                abp.notify.info(app.localize('SavedSuccessfully'));
                _modalManager.close();
                abp.event.trigger('app.createOrEditProductModalSaved');
            }).always(function() {
                _modalManager.setBusy(false);
            });
        };
    };
})(jQuery);