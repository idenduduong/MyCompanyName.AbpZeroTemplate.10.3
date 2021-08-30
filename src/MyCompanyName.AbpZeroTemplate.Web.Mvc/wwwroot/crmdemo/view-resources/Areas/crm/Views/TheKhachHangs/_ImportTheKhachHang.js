(function ($) {
    app.modals.ImportTheKhachHangModal = function () {
        var _assignDataService = abp.services.app.theKhachHangs
        var _$importTheKhachHangDataForm = null;
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
            _$importTheKhachHangDataForm = _modalManager.getModal().find('form[name=ImportTheKhachHangForm]');

            debugger;
            $('#ImportTheKhachHangForm').ajaxForm({

                beforeSubmit: function (formData, jqForm, options) {

                    $('#ImportTheKhachHangForm').buttonBusy(true);

                    var $fileInput = $('#ImportTheKhachHangForm input[name=ImportFile]');
                    var files = $fileInput.get()[0].files;

                    if (!files.length) {
                        $('#ImportTheKhachHangForm').buttonBusy(false);
                        return false;
                    }

                    var file = files[0];

                    debugger
                    //File type check
                    var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
                    if ('|vnd.openxmlformats-officedocument.spreadsheetml.sheet|'.indexOf(type) === -1) {
                        abp.message.warn(app.localize('ImportData_Warn_FileType'));
                        $('#ImportTheKhachHangForm').buttonBusy(false);
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
                    $('#ImportTheKhachHangForm').buttonBusy(false);
                    abp.event.trigger('app.theKhachHangImported');
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