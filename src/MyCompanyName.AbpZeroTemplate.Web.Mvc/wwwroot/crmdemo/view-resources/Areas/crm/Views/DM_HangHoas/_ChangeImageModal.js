(function ($) {
    app.modals.ChangeHangHoaImageModal = function () {

        var _modalManager;
        var $jcropApi = null;
        var uploadedFileName = null;

        var getHangHoaImagePath = function (hangHoaId) {
            
            var date = new Date();
            return hangHoaId.length > 0 ?
                (abp.appPath + 'crm/DM_HangHoas/GetHangHoaImageByHangHoaId?hangHoaId=' + hangHoaId + '&v=' + date.getTime()) :
                (abp.appPath + 'Common/Images/default-profile-picture.png');
        }
        var _dM_HangHoasService = abp.services.app.dM_HangHoas;

        this.init = function (modalManager) {
            _modalManager = modalManager;

            $('#ChangeHangHoaImageModalForm input[name=HangHoaImage]').change(function () {
                $('#ChangeHangHoaImageModalForm').submit();
            });

            $('#ChangeHangHoaImageModalForm').ajaxForm({
                beforeSubmit: function (formData, jqForm, options) {

                    var $fileInput = $('#ChangeHangHoaImageModalForm input[name=HangHoaImage]');
                    var files = $fileInput.get()[0].files;

                    if (!files.length) {
                        return false;
                    }

                    var file = files[0];

                    //File type check
                    var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
                    if ('|jpg|jpeg|png|gif|'.indexOf(type) === -1) {
                        abp.message.warn(app.localize('HangHoaImage_Warn_FileType'));
                        return false;
                    }

                    //File size check
                    if (file.size > 5242880) //5MB
                    {
                        abp.message.warn(app.localize('HangHoaImage_Warn_SizeLimit', app.maxProfilPictureBytesUserFriendlyValue));
                        return false;
                    }

                    return true;
                },
                success: function (response) {
                    if (response.success) {
                        var $HangHoaImageResize = $('#HangHoaImageResize');

                        var profileFilePath = abp.appPath + 'Temp/Downloads/' + response.result.fileName + '?v=' + new Date().valueOf();
                        uploadedFileName = response.result.fileName;

                        if ($jcropApi) {
                            $jcropApi.destroy();
                        }

                        $HangHoaImageResize.show();
                        $HangHoaImageResize.attr('src', profileFilePath);
                        $HangHoaImageResize.attr('originalWidth', response.result.width);
                        $HangHoaImageResize.attr('originalHeight', response.result.height);

                        $HangHoaImageResize.Jcrop({
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

            $('#HangHoaImageResize').hide();
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

            if ($('#HangHoaImageResize')) {
                originalWidth = parseInt($('#HangHoaImageResize').attr("originalWidth"));
                originalHeight = parseInt($('#HangHoaImageResize').attr("originalHeight"));
            }

            var widthRatio = originalWidth / containerWidth;
            var heightRatio = originalHeight / containerHeight;

            _dM_HangHoasService.updateHangHoaImage({
                dM_HangHoaId: $('#ChangeHangHoaImageModalForm input[name=dM_HangHoaId]').val(),
                fileName: uploadedFileName,
                x: parseInt(resizeParams.x * widthRatio),
                y: parseInt(resizeParams.y * heightRatio),
                width: parseInt(resizeParams.w * widthRatio),
                height: parseInt(resizeParams.h * heightRatio)
            }).done(function () {
                $jcropApi.destroy();
                $jcropApi = null;
                $('.hanghoa-image').attr('src', getHangHoaImagePath($('#ChangeHangHoaImageModalForm input[name=dM_HangHoaId]').val()));
                _modalManager.close();
            });
        };
    };
})(jQuery);