(function ($) {
    app.modals.ChangeStatusWithAdditionalDataModal = function () {

        var _customerDatasService = abp.services.app.customerDatas;
        var _commonService = abp.services.app.commonLookup;

        var _modalManager;
        var _$changeStatusForm = null;
        
        

        var getDateFilter = function (element) {
            if (element.data("DateTimePicker").date() == null) {
                return null;
            }
            return element.data("DateTimePicker").date().format("YYYY-MM-DDT00:00:00Z");
        }

        this.init = function (modalManager) {
            _modalManager = modalManager;

            var modal = _modalManager.getModal();
            
            //modal.find('.numberic').number(true, 0);
            modal.find('.datetime-picker').datetimepicker({
                locale: abp.localization.currentLanguage.name,
                minDate: moment()
            });

            _$changeStatusForm = _modalManager.getModal().find('form[name=ChangeStatusForm]');
            _$changeStatusForm.validate();

            $form = modal.find('#fileupload').fileupload({
                url: 'dataChangeStatusLog/Upload',
                dataType: 'json'
            });
            // khởi tạo danh sách file đã upload
            var id = modal.find('input[name=id]').val();

            if (typeof id != 'undefined' && id) {
                $.ajax({
                    type: 'GET',
                    contentType: "application/json; charset=utf-8",
                    url: '/crm/DataChangeStatusLogs/GetFileList/' + id,
                    success: function (data) {


                        $('#fileupload').fileupload('option', 'done').call($('#fileupload'), $.Event('done'), { result: { files: data.files } })
                        $('#fileupload').removeClass('fileupload-processing');
                        return true;
                    },
                    error: function (request, status, error) {
                        //  alert(request.responseText);
                        $('#fileupload').addClass('fileupload-processing');
                    }


                }

                );
            }
        };


        this.save = function () {
            if (!_$changeStatusForm.valid()) {
                return;
            }
            var tepdinhkem = "";
            var thumbs = "";
            $(".preview a").each(function () {
                if (tepdinhkem == "") {
                    tepdinhkem += $(this).attr("href");
                    var n = $(this).attr("href").lastIndexOf("/");
                    thumbs += $(this).attr("href").substring(0, n) + "/thumbs" + $(this).attr("href").substring(n, $(this).attr("href").length) + ".80x80.jpg";
                }
                else {
                    tepdinhkem += ";" + $(this).attr("href");
                    var n = $(this).attr("href").lastIndexOf("/");
                    thumbs += ";" + $(this).attr("href").substring(0, n) + "/thumbs" + $(this).attr("href").substring(n, $(this).attr("href").length) + ".80x80.jpg";
                }
            });

            $('#fileupload').append('<input type="hidden" id="ConsultingFiles" name="ConsultingFiles" value="' + tepdinhkem + '">');
            var customerData = _$changeStatusForm.serializeFormToObject();
            _modalManager.setBusy(true);
            _customerDatasService.changeDataStatus(
                customerData
            ).done(function () {
                abp.notify.info(app.localize('SavedSuccessfully'));
                _modalManager.close();
                abp.event.trigger('app.createOrEditCustomerDataModalSaved');
            }).always(function () {
                _modalManager.setBusy(false);
            });
        };
    };
})(jQuery);