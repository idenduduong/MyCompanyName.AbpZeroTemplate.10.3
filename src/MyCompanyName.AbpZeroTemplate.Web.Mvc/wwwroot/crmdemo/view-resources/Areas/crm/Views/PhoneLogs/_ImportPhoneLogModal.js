(function ($) {
    app.modals.ImportPhoneLogModal = function () {
        var _phoneLogsService = abp.services.app.phoneLogs
        var _$importPhoneLogForm = null;
        this.init = function (modalManager) {
            
            _modalManager = modalManager;

            var modal = _modalManager.getModal();
            modal.find('.numberic').number(true, 0);
            modal.find('.date-picker').datetimepicker({
                locale: abp.localization.currentLanguage.name,
            });
            modal.find('.date-picker').each(function () {
                if ($(this).val() == "01/01/0001") {
                    $(this).data("DateTimePicker").date(new Date());
                }
            })
            modal.find('.numberic').number(true, 0);
            _$importCustomerDataForm = _modalManager.getModal().find('form[name=ImportPhoneLogForm]');
            //_$importCustomerDataForm.validate();
            
            //$('#ImportCustomerDataButton').click(function (e) {
            //    _$importCustomerDataForm.submit();
            //})
            $('#ImportPhoneLogForm').ajaxForm({
                beforeSubmit: function (formData, jqForm, options) {
                    
                    $('#ImportPhoneLogForm').buttonBusy(true);
                    
                    var $fileInput = $('#ImportPhoneLogForm input[name=ImportFile]');
                    var files = $fileInput.get()[0].files;

                    if (!files.length) {
                        $('#ImportPhoneLogForm').buttonBusy(false);
                        return false;
                    }

                    var file = files[0];

                    //File type check
                    var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
                    if ('|vnd.openxmlformats-officedocument.spreadsheetml.sheet|'.indexOf(type) === -1) {
                        abp.message.warn(app.localize('ImportData_Warn_FileType'));
                        $('#ImportPhoneLogForm').buttonBusy(false);
                        return false;
                    }
                },
                success: function (response) {
                    
                    abp.message.success("ImportSuccessfully");
                    $('#ImportPhoneLogForm').buttonBusy(false);
                    _modalManager.close();
                }
            });
        };

        

        //$('#ImportCustomerDataButton').click(function (e) {
        //    e.preventDefault();
        //    if (!_$importCustomerDataForm.valid()) {
        //        return;
        //    }

        //    var data = _$importCustomerDataForm.serializeFormToObject();
        //    _modalManager.setBusy(true);
        //    _assignDataService.assignDataByArea(
        //        data
        //    ).done(function () {
        //        abp.notify.info(app.localize('AssignSuccessfully'));
        //        //_modalManager.close();
        //        //abp.event.trigger('app.createOrEditCustomerDataModalSaved');
        //    }).always(function () {
        //        _modalManager.setBusy(false);
        //    });
        //})
    }
})(jQuery)