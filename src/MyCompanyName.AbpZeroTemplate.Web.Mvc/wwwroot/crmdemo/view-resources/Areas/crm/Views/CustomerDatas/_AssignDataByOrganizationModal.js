(function ($) {
    app.modals.AssignDataByOrganizationModal = function () {
        var _assignDataService = abp.services.app.customerDatas
        var _$assignDataByOrganizationForm = null;
        var _organizationTree;
        _organizationTree = new OrganizationTree();
        _organizationTree.init($('.organization-tree'));
        this.init = function (modalManager) {
            _modalManager = modalManager;

            var modal = _modalManager.getModal();
            modal.find('.numeric').number(true, 0);
            modal.find('.date-picker').datetimepicker({
                locale: abp.localization.currentLanguage.name,
                format: 'L'
            });
            modal.find('.date-picker').each(function () {
                if ($(this).val() == "01/01/0001") {
                    $(this).data("DateTimePicker").date(new Date());
                }
            })

            _$assignDataByOrganizationForm = _modalManager.getModal().find('form[name=AssignDataByOrganizationForm]');
            _$assignDataByOrganizationForm.validate();
        };
       
        $('#AssignDataButton').click(function (e) {
            e.preventDefault();
            if (!_$assignDataByOrganizationForm.valid()) {
                return;
            }

            var data = _$assignDataByOrganizationForm.serializeFormToObject();
            data.organizationIds= _organizationTree.getSelectedOrganizations();
            _modalManager.setBusy(true);
            _assignDataService.assignDataByOrganization(
                data
            ).done(function () {
                abp.notify.info(app.localize('AssignSuccessfully'));
                //_modalManager.close();
                //abp.event.trigger('app.createOrEditCustomerDataModalSaved');
            }).always(function () {
                _modalManager.setBusy(false);
            });
        })
    }
})(jQuery);