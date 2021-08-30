(function ($) {
    app.modals.ImportDM_DoiTuongDataModal = function () {
        var _assignDataService = abp.services.app.dM_DoiTuongs
        var _$importDM_DoiTuongDataForm = null;
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
            modal.find('.numberic').number(true, 0);
            _$importDM_DoiTuongDataForm = _modalManager.getModal().find('form[name=ImportDM_DoiTuongDataForm]');

            debugger;
            $('#ImportDM_DoiTuongDataForm').ajaxForm({
                
                beforeSubmit: function (formData, jqForm, options) {

                    $('#ImportDM_DoiTuongDataForm').buttonBusy(true);

                    var $fileInput = $('#ImportDM_DoiTuongDataForm input[name=ImportFile]');
                    var files = $fileInput.get()[0].files;

                    if (!files.length) {
                        $('#ImportDM_DoiTuongDataForm').buttonBusy(false);
                        return false;
                    }

                    var file = files[0];

                    debugger
                    //File type check
                    var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
                    if ('|vnd.openxmlformats-officedocument.spreadsheetml.sheet|'.indexOf(type) === -1) {
                        abp.message.warn(app.localize('ImportData_Warn_FileType'));
                        $('#ImportDM_DoiTuongDataForm').buttonBusy(false);
                        return false;
                    }

                    //File size check
                    //if (file.size > 5242880) //5MB
                    //{
                    //    abp.message.warn(app.localize('DoiTuongImage_Warn_SizeLimit', app.maxProfilPictureBytesUserFriendlyValue));
                    //    return false;
                    //}

                    return true;
                },

                
                success: function (response) {
                    debugger;
                    abp.message.success("ImportSuccessfully");
                    $('#ImportDM_DoiTuongDataForm').buttonBusy(false);
                    abp.event.trigger('app.dM_DoiTuongDataImported');
                    _modalManager.close();
                    if (response.success) {


                    } else {
                        abp.message.error(response.error.message);
                    }
                }
            });
        };

    }
})(jQuery)