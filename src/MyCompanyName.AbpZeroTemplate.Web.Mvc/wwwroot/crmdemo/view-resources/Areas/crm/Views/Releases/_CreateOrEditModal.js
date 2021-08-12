(function ($) {
    app.modals.CreateOrEditReleaseModal = function () {

        var _releasesService = abp.services.app.releases;

        var _modalManager;
        var _$releaseInformationForm = null;

        var _theKhachHangLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/Releases/TheKhachHangLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/Releases/_TheKhachHangLookupTableModal.js',
            modalClass: 'TheKhachHangLookupTableModal'
        }); var _theKhachHangChiTietLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/Releases/TheKhachHangChiTietLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/Releases/_TheKhachHangChiTietLookupTableModal.js',
            modalClass: 'TheKhachHangChiTietLookupTableModal'
        }); var _dM_DoiTuongLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/Releases/DM_DoiTuongLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/Releases/_DM_DoiTuongLookupTableModal.js',
            modalClass: 'DM_DoiTuongLookupTableModal'
        }); var _userLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/Releases/UserLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/Releases/_UserLookupTableModal.js',
            modalClass: 'UserLookupTableModal'
        });

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

            _$releaseInformationForm = _modalManager.getModal().find('form[name=ReleaseInformationsForm]');
            _$releaseInformationForm.validate();
        };

        $('#OpenTheKhachHangLookupTableButton').click(function () {

            var release = _$releaseInformationForm.serializeFormToObject();

            _theKhachHangLookupTableModal.open({ id: release.fromCardId, displayName: release.theKhachHangMaThe }, function (data) {
                _$releaseInformationForm.find('input[name=theKhachHangMaThe]').val(data.displayName);
                _$releaseInformationForm.find('input[name=fromCardId]').val(data.id);
            });
        });

        $('#ClearTheKhachHangMaTheButton').click(function () {
            _$releaseInformationForm.find('input[name=theKhachHangMaThe]').val('');
            _$releaseInformationForm.find('input[name=fromCardId]').val('');
        });

        $('#OpenTheKhachHang2LookupTableButton').click(function () {

            var release = _$releaseInformationForm.serializeFormToObject();

            _theKhachHangLookupTableModal.open({ id: release.toCardId, displayName: release.theKhachHangMaThe2 }, function (data) {
                _$releaseInformationForm.find('input[name=theKhachHangMaThe2]').val(data.displayName);
                _$releaseInformationForm.find('input[name=toCardId]').val(data.id);
            });
        });

        $('#ClearTheKhachHangMaThe2Button').click(function () {
            _$releaseInformationForm.find('input[name=theKhachHangMaThe2]').val('');
            _$releaseInformationForm.find('input[name=toCardId]').val('');
        });

        $("#FromCardId").select2({
            width: "100%",
            height: '34px',
            //tags: true,
            allowClear: true,
            placeholder: "Tìm kiếm đối tượng",
            ajax: {
                url: '/api/services/app/releases/getAllTheKhachHangForLookupTable',
                dataType: 'json',
                //delay: 1000,
                method: 'POST',
                contentType: 'application/json',
                data: function (params) {
                    
                    var cardType = $("[name=releaseType]").val() == 0? true:null;
                    var query = {
                        isTheLan: cardType,
                        filter: params.term,
                        skipCount: (params.page - 1 || 0) * 15,
                        maxResultCount: 15
                    }
                    return JSON.stringify(query);
                },
                processResults: function (data, params) {
                    params.page = params.page || 1;
                    
                    var select2Data = $.map(data.result.items, function (val, i) {
                        return {
                            id: val.theKhachHang.id,
                            text: val.theKhachHang.maThe,
                            customerName: val.dM_DoiTuongTenDoiTuong,
                            customerPhone: val.dM_DoiTuongPhone,
                            soDu: val.theKhachHang.soDu
                        }
                    });
                    
                    return {
                        results: select2Data,
                        pagination: {
                            more: (params.page * 15) < data.result.totalCount
                        }
                    };
                }
            },
        });

        $('#FromCardId').on("select2:select", function (e) {
            
            var releaseType = $("[name=releaseType]").val();
            var selectedOption = e.params.data;
            $('[name=dM_DoiTuongTenDoiTuong]').val(selectedOption.customerName);
            if (releaseType == 1) {
                $('#Release_Amount').val(selectedOption.soDu);
            }
        });

        $("#ToCardId").select2({
            width: "100%",
            height: '34px',
            //tags: true,
            allowClear: true,
            placeholder: "Tìm kiếm đối tượng",
            ajax: {
                url: '/api/services/app/releases/getAllTheKhachHangForLookupTable',
                dataType: 'json',
                //delay: 1000,
                method: 'POST',
                contentType: 'application/json',
                data: function (params) {
                    
                    var cardType = $("[name=releaseType]").val() == "0" ? true : null;
                    var query = {
                        isTheLan: cardType,
                        filter: params.term,
                        skipCount: (params.page - 1 || 0) * 15,
                        maxResultCount: 15
                    }
                    return JSON.stringify(query);
                },
                processResults: function (data, params) {
                    params.page = params.page || 1;
                    
                    var select2Data = $.map(data.result.items, function (val, i) {
                        return {
                            id: val.theKhachHang.id,
                            text: val.theKhachHang.maThe,
                            customerName: val.dM_DoiTuongTenDoiTuong,
                            customerPhone: val.dM_DoiTuongPhone,
                            soDu: val.theKhachHang.soDu
                        }
                    });
                    
                    return {
                        results: select2Data,
                        pagination: {
                            more: (params.page * 15) < data.result.totalCount
                        }
                    };
                }
            },
        });

        $('#ToCardId').on("select2:select", function (e) {
            
            var selectedOption = e.params.data;
            $('[name=dM_DoiTuongTenDoiTuong2]').val(selectedOption.customerName);
        });

        $('[name=releaseType]').change(function () {
            
            var releaseType = $("[name=releaseType]").val();
            if (releaseType == "1") {
                $('.theKhachHangChiTietCtr').hide();
                $('.feeCtr').hide();
            }
            else {
                $('.theKhachHangChiTietCtr').show();
                $('.feeCtr').show();
            }
        });

        $("#PackageId").select2({
            width: "100%",
            height: '34px',
            //tags: true,
            allowClear: true,
            placeholder: "Tìm kiếm đối tượng",
            ajax: {
                url: '/api/services/app/theKhachHangs/getAllPackageByCardForRelease',
                dataType: 'json',
                //delay: 1000,
                data: function (params) {
                    
                    var cardId = $("[name=fromCardId]").val();
                    var query = {
                        iD_TheKhachHang: cardId,
                        filter: params.term,
                        skipCount: (params.page - 1 || 0) * 15,
                        maxResultCount: 15
                    }

                    // Query parameters will be ?search=[term]&type=public
                    return query;
                },
                processResults: function (data, params) {
                    params.page = params.page || 1;
                    
                    var select2Data = $.map(data.result.items, function (val, i) {
                        return {
                            id: val.theKhachHangChiTiet.id,
                            text: val.theKhachHangChiTiet.serviceName,
                            soLuong: val.theKhachHangChiTiet.soLuong,
                            soLuongDaSuDung: val.theKhachHangChiTiet.soLuongDaSuDung
                        }
                    });
                    
                    return {
                        results: select2Data,
                        pagination: {
                            more: (params.page * 15) < data.result.totalCount
                        }
                    };
                }
            }
        });

        $('#PackageId').on("select2:select", function (e) {
            
            var selectedOption = e.params.data;
            $('#Release_Amount').val(selectedOption.soLuong - selectedOption.soLuongDaSuDung);
        });

        this.save = function () {
            if (!_$releaseInformationForm.valid()) {
                return;
            }

            var release = _$releaseInformationForm.serializeFormToObject();
            _modalManager.setBusy(true);
            _releasesService.createOrEdit(
                release
            ).done(function () {
                abp.notify.info(app.localize('SavedSuccessfully'));
                _modalManager.close();
                abp.event.trigger('app.createOrEditReleaseModalSaved');
            }).always(function () {
                _modalManager.setBusy(false);
            });
        };
    };
})(jQuery);