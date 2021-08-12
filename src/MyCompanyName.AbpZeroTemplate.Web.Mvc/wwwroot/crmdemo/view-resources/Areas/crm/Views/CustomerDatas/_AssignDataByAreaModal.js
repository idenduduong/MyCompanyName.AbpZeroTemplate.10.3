(function ($) {
    app.modals.AssignDataByAreaModal = function () {
        var _assignDataService = abp.services.app.customerDatas
        var _$assignDataByAreaForm = null;
        this.init = function (modalManager) {
            _modalManager = modalManager;

            var modal = _modalManager.getModal();
            modal.find('.numeric').number(true, 0);
            modal.find('.date-picker').datetimepicker({
                locale: abp.localization.currentLanguage.name,
                format: 'L'
            });
            modal.find('.select2me').select2({
                width: "100%"
            });
            modal.find('.date-picker').each(function () {
                if ($(this).val() == "01/01/0001") {
                    $(this).data("DateTimePicker").date(new Date());
                }
            })

            _$assignDataByAreaForm = _modalManager.getModal().find('form[name=AssignDataByAreaForm]');
            _$assignDataByAreaForm.validate();
        };
        $('#AssignDataButton').click(function (e) {
            e.preventDefault();
            if (!_$assignDataByAreaForm.valid()) {
                return;
            }
            var data = {};
            //var data = _$assignDataByAreaForm.serializeFormToObject();
            data.areaId = $('[name=areaId]').val();
            data.quantity = $('[name=quantity]').val();
            _modalManager.setBusy(true);
            _assignDataService.assignDataByArea(
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
})(jQuery)