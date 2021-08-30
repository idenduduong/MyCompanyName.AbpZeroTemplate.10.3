(function ($) {
    app.modals.ChangeDoiTuongImageModal = function () {

        var _modalManager;
        var $jcropApi = null;
        var uploadedFileName = null;

        var getDoiTuongImagePath = function (doiTuongId) {
            
            var date = new Date();
            return doiTuongId.length > 0 ?
                (abp.appPath + 'crm/DM_DoiTuongs/GetDoiTuongImageByDoiTuongId?doiTuongId=' + doiTuongId + '&v=' + date.getTime()) :
                (abp.appPath + 'Common/Images/default-profile-picture.png');
        }
        var _dM_DoiTuongsService = abp.services.app.dM_DoiTuongs;

        this.init = function (modalManager) {
            _modalManager = modalManager;

            $('#ChangeDoiTuongImageModalForm input[name=DoiTuongImage]').change(function () {
                $('#ChangeDoiTuongImageModalForm').submit();
            });

            $('#ChangeDoiTuongImageModalForm').ajaxForm({
                beforeSubmit: function (formData, jqForm, options) {

                    var $fileInput = $('#ChangeDoiTuongImageModalForm input[name=DoiTuongImage]');
                    var files = $fileInput.get()[0].files;

                    if (!files.length) {
                        return false;
                    }

                    var file = files[0];

                    //File type check
                    var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
                    if ('|jpg|jpeg|png|gif|'.indexOf(type) === -1) {
                        abp.message.warn(app.localize('DoiTuongImage_Warn_FileType'));
                        return false;
                    }

                    //File size check
                    if (file.size > 5242880) //5MB
                    {
                        abp.message.warn(app.localize('DoiTuongImage_Warn_SizeLimit', app.maxProfilPictureBytesUserFriendlyValue));
                        return false;
                    }

                    return true;
                },
                success: function (response) {
                    if (response.success) {
                        var $DoiTuongImageResize = $('#DoiTuongImageResize');

                        var profileFilePath = abp.appPath + 'Temp/Downloads/' + response.result.fileName + '?v=' + new Date().valueOf();
                        uploadedFileName = response.result.fileName;

                        if ($jcropApi) {
                            $jcropApi.destroy();
                        }

                        $DoiTuongImageResize.show();
                        $DoiTuongImageResize.attr('src', profileFilePath);
                        $DoiTuongImageResize.attr('originalWidth', response.result.width);
                        $DoiTuongImageResize.attr('originalHeight', response.result.height);

                        $DoiTuongImageResize.Jcrop({
                            setSelect: [0, 0, 100, 100],
                            aspectRatio: 1,
                            boxWidth: 400,
                            boxHeight: 400
                        }, function () {
                            $jcropApi = this;
                        });

                    } else {
                        abp.message.error(response.error.message);
                    }
                }
            });

            $('#DoiTuongImageResize').hide();
        };

        this.save = function () {
            if (!uploadedFileName) {
                return;
            }

            var resizeParams = {};
            if ($jcropApi) {
                resizeParams = $jcropApi.getSelection();
            }

            var containerWidth = $jcropApi.getContainerSize()[0];
            var containerHeight = $jcropApi.getContainerSize()[1];

            var originalWidth = containerWidth;
            var originalHeight = containerHeight;

            if ($('#DoiTuongImageResize')) {
                originalWidth = parseInt($('#DoiTuongImageResize').attr("originalWidth"));
                originalHeight = parseInt($('#DoiTuongImageResize').attr("originalHeight"));
            }

            var widthRatio = originalWidth / containerWidth;
            var heightRatio = originalHeight / containerHeight;

            _dM_DoiTuongsService.updateDoiTuongImage({
                dM_DoiTuongId: $('#ChangeDoiTuongImageModalForm input[name=dM_DoiTuongId]').val(),
                fileName: uploadedFileName,
                x: parseInt(resizeParams.x * widthRatio),
                y: parseInt(resizeParams.y * heightRatio),
                width: parseInt(resizeParams.w * widthRatio),
                height: parseInt(resizeParams.h * heightRatio)
            }).done(function () {
                $jcropApi.destroy();
                $jcropApi = null;
                $('.doituong-image').attr('src', getDoiTuongImagePath($('#ChangeDoiTuongImageModalForm input[name=dM_DoiTuongId]').val()));
                _modalManager.close();
            });
        };
    };
})(jQuery);