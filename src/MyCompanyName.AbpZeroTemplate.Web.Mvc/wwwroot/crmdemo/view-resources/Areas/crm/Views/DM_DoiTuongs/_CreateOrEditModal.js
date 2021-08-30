(function ($) {
    app.modals.CreateOrEditDM_DoiTuongModal = function () {

        // declare variable

        // service
        var _dM_DoiTuongsService = abp.services.app.dM_DoiTuongs;

        // local variable
        var _modalManager;
        var _$dM_DoiTuongCommonInfoForm = null;
        var _$dM_DoiTuongDetailForm = null;
        var processControl = null;


        // pick NhomDoiTuong modal
        var _dM_NhomDoiTuongLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_DoiTuongs/DM_NhomDoiTuongLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_DoiTuongs/_DM_NhomDoiTuongLookupTableModal.js',
            modalClass: 'DM_NhomDoiTuongLookupTableModal'
        });

        // pick TinhThanh modal
        var _dM_TinhThanhLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_DoiTuongs/DM_TinhThanhLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_DoiTuongs/_DM_TinhThanhLookupTableModal.js',
            modalClass: 'DM_TinhThanhLookupTableModal'
        });

        var _dM_NgheNghiepLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/Common/DM_NgheNghiepLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Common/_DM_NgheNghiepLookupTableModal.js',
            modalClass: 'DM_NgheNghiepLookupTableModal'
        });

        // pick QuanHuyen modal
        var _dM_QuanHuyenLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_DoiTuongs/DM_QuanHuyenLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_DoiTuongs/_DM_QuanHuyenLookupTableModal.js',
            modalClass: 'DM_QuanHuyenLookupTableModal'
        });

        // pick User modal
        var _userLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/Common/SaleLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Common/_SaleLookupTableModal.js',
            modalClass: 'SaleLookupTableModal'
        });

        // pick KhachHang modal
        var _nguonKhachHangLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_DoiTuongs/NguonKhachHangLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_DoiTuongs/_NguonKhachHangLookupTableModal.js',
            modalClass: 'NguonKhachHangLookupTableModal'
        });

        //pick QuocGia modal
        var _dM_QuocGiaLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_DoiTuongs/DM_QuocGiaLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_DoiTuongs/_DM_QuocGiaLookupTableModal.js',
            modalClass: 'DM_QuocGiaLookupTableModal'
        });

        // pick TrangThai modal
        var _dM_TrangThaiLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_DoiTuongs/DM_TrangThaiLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_DoiTuongs/_DM_TrangThaiLookupTableModal.js',
            modalClass: 'DM_TrangThaiLookupTableModal'
        });

        // pick DoiTuong modal
        var _dM_DoiTuongLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/Common/DM_DoiTuongSecondaryLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Common/_DM_DoiTuongSecondaryLookupTableModal.js',
            modalClass: 'DM_DoiTuongSecondaryLookupTableModal'
        });
        var _organizationUnitLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_DoiTuongs/OrganizationUnitLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_DoiTuongs/_OrganizationUnitLookupTableModal.js',
            modalClass: 'OrganizationUnitLookupTableModal'
        });
        // change image modal
        var _changeImageModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_DoiTuongs/ChangeImageModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_DoiTuongs/_ChangeImageModal.js',
            modalClass: 'ChangeDoiTuongImageModal'
        });

        // initialize
        this.init = function (modalManager) {
            _modalManager = modalManager;

            var modal = _modalManager.getModal();
            modal.find('.numeric').number(true, 0);;
            modal.find('.date-picker').datetimepicker({
                locale: abp.localization.currentLanguage.name,
                format: 'L'
            });
            modal.find('.date-picker').each(function () {
                if ($(this).val() == "01/01/0001") {
                    $(this).data("DateTimePicker").date(new Date());
                }
            })

            _$dM_DoiTuongCommonInfoForm = _modalManager.getModal().find('form[name=DM_DoiTuongCommonInfoForm]');
            _$dM_DoiTuongCommonInfoForm.validate();
            //$("#DM_TinhThanhTenTinhThanh").rules("add", {
            //    required: true,
            //});
            //$("#DM_QuanHuyenTenQuanHuyen").rules("add", {
            //    required: true,
            //});
            //$("#DM_NhomDoiTuongTenNhom").rules("add", {
            //    required: true,
            //});
            //$("#DonViQuanLyDisplayName").rules("add", {
            //    required: true,
            //});
            //$("#DM_DoiTuong_DienThoai").rules("add", {
            //    required: true,
            //    digits: true,
            //    minlength: 10,
            //    maxlength: 11
            //});

            $form = modal.find('#fileupload').fileupload({
                dataType: 'json'
            });
            // khởi tạo danh sách file đã upload
            var id = modal.find('input[name=id]').val();

            if (typeof id != 'undefined' && id) {
                $.ajax({
                    type: 'GET',
                    contentType: "application/json; charset=utf-8",
                    url: '/crm/DM_DoiTuongs/GetFileList/' + id,
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

        // begin Pick NhomDoiTuong modal event

        // open NhomDoiTuong modal
        $('#OpenDM_NhomDoiTuongLookupTableButton').click(function () {

            var dM_DoiTuong = _$dM_DoiTuongCommonInfoForm.serializeFormToObject();

            _dM_NhomDoiTuongLookupTableModal.open({ id: dM_DoiTuong.dM_NhomDoiTuongId, displayName: dM_DoiTuong.dM_NhomDoiTuongTenNhom }, function (data) {
                _$dM_DoiTuongCommonInfoForm.find('input[name=dM_NhomDoiTuongTenNhom]').val(data.displayName);
                _$dM_DoiTuongCommonInfoForm.find('input[name=dM_NhomDoiTuongId]').val(data.id);
            });
        });

        // clear NhomDoiTuong
        $('#ClearDM_NhomDoiTuongTenNhomButton').click(function () {
            _$dM_DoiTuongCommonInfoForm.find('input[name=dM_NhomDoiTuongTenNhom]').val('');
            _$dM_DoiTuongCommonInfoForm.find('input[name=dM_NhomDoiTuongId]').val('');
        });

        // end NhomDoiTuong modal event


        // begin Pick DoiTuong modal event

        // open DoiTuong modal
        $('#OpenDoiTuongLookupTableButton').click(function () {

            var dM_DoiTuong = _$dM_DoiTuongCommonInfoForm.serializeFormToObject();

            _dM_DoiTuongLookupTableModal.open({ id: dM_DoiTuong.id_NguoiGioiThieu, displayName: dM_DoiTuong.nguoiGioiThieu, currentId: dM_DoiTuong.id }, function (data) {
                _$dM_DoiTuongCommonInfoForm.find('input[name=nguoiGioiThieu]').val(data.code + " - " + data.displayName);
                _$dM_DoiTuongCommonInfoForm.find('input[name=iD_NguoiGioiThieu]').val(data.id);
            });
        });

        // clear DoiTuong
        $('#ClearDoiTuongNameButton').click(function () {
            _$dM_DoiTuongCommonInfoForm.find('input[name=nguoiGioiThieu]').val('');
            _$dM_DoiTuongCommonInfoForm.find('input[name=iD_NguoiGioiThieu]').val('');
        });

        // end DoiTuong modal event


        // begin pick TinhThanh modal control

        // open modal event
        $('#OpenDM_TinhThanhLookupTableButton').click(function () {

            var dM_DoiTuong = _$dM_DoiTuongCommonInfoForm.serializeFormToObject();

            _dM_TinhThanhLookupTableModal.open({ id: dM_DoiTuong.dM_TinhThanhId, displayName: dM_DoiTuong.dM_TinhThanhTenTinhThanh }, function (data) {
                _$dM_DoiTuongCommonInfoForm.find('input[name=dM_TinhThanhTenTinhThanh]').val(data.displayName);
                _$dM_DoiTuongCommonInfoForm.find('input[name=dM_TinhThanhId]').val(data.id);
            });
        });

        // clear TinhThanh event
        $('#ClearDM_TinhThanhTenTinhThanhButton').click(function () {
            _$dM_DoiTuongCommonInfoForm.find('input[name=dM_TinhThanhTenTinhThanh]').val('');
            _$dM_DoiTuongCommonInfoForm.find('input[name=dM_TinhThanhId]').val('');
        });


        // end pick TinhThanh modal control

        // begin pick QuanHuyen modal control

        // open model event
        $('#OpenDM_QuanHuyenLookupTableButton').click(function () {

            var dM_DoiTuong = _$dM_DoiTuongCommonInfoForm.serializeFormToObject();

            _dM_QuanHuyenLookupTableModal.open({ id: dM_DoiTuong.dM_QuanHuyenId, iDTinhThanh: dM_DoiTuong.dM_TinhThanhId, displayName: dM_DoiTuong.dM_QuanHuyenTenQuanHuyen }, function (data) {
                _$dM_DoiTuongCommonInfoForm.find('input[name=dM_QuanHuyenTenQuanHuyen]').val(data.displayName);
                _$dM_DoiTuongCommonInfoForm.find('input[name=dM_QuanHuyenId]').val(data.id);
            });
        });

        // clear QuanHuyen event
        $('#ClearDM_QuanHuyenTenQuanHuyenButton').click(function () {
            _$dM_DoiTuongCommonInfoForm.find('input[name=dM_QuanHuyenTenQuanHuyen]').val('');
            _$dM_DoiTuongCommonInfoForm.find('input[name=dM_QuanHuyenId]').val('');
        });

        // end pick QuanHuyen modal control

        // begin pick User modal control
        // open modal event
        $('#OpenNVTVLookupTableButton').click(function () {

            var dM_DoiTuong = _$dM_DoiTuongCommonInfoForm.serializeFormToObject();

            _userLookupTableModal.open({ id: dM_DoiTuong.iD_NhanVienPhuTrach, displayName: dM_DoiTuong.userName }, function (data) {
                _$dM_DoiTuongCommonInfoForm.find('input[name=nhanVienTuVan]').val(data.maNhanVien + " - " + data.tenNhanVien);
                _$dM_DoiTuongCommonInfoForm.find('input[name=iD_NhanVienPhuTrach]').val(data.id);
            });
        });

        // clear User event		
        $('#ClearNVTVButton').click(function () {
            _$dM_DoiTuongCommonInfoForm.find('input[name=nhanVienTuVan]').val('');
            _$dM_DoiTuongCommonInfoForm.find('input[name=iD_NhanVienPhuTrach]').val('');
        });

        // end pick User modal control

        // begin pick NguonKhachHang modal control
        // open modal event
        $('#OpenNguonKhachHangLookupTableButton').click(function () {

            var dM_DoiTuong = _$dM_DoiTuongCommonInfoForm.serializeFormToObject();

            _nguonKhachHangLookupTableModal.open({ id: dM_DoiTuong.nguonKhachHangId, displayName: dM_DoiTuong.nguonKhachHangTenNguonKhach }, function (data) {
                _$dM_DoiTuongCommonInfoForm.find('input[name=nguonKhachHangTenNguonKhach]').val(data.displayName);
                _$dM_DoiTuongCommonInfoForm.find('input[name=nguonKhachHangId]').val(data.id);
            });
        });

        // clear NguonKhachHang event
        $('#ClearNguonKhachHangTenNguonKhachButton').click(function () {
            _$dM_DoiTuongCommonInfoForm.find('input[name=nguonKhachHangTenNguonKhach]').val('');
            _$dM_DoiTuongCommonInfoForm.find('input[name=nguonKhachHangId]').val('');
        });

        // end pick NguonKhachHang modal control

        // begin pick QuocGia modal control
        // open modal event
        $('#OpenDM_QuocGiaLookupTableButton').click(function () {

            var dM_DoiTuong = _$dM_DoiTuongCommonInfoForm.serializeFormToObject();

            _dM_QuocGiaLookupTableModal.open({ id: dM_DoiTuong.dM_QuocGiaId, displayName: dM_DoiTuong.dM_QuocGiaTenNuoc }, function (data) {
                _$dM_DoiTuongCommonInfoForm.find('input[name=dM_QuocGiaTenNuoc]').val(data.displayName);
                _$dM_DoiTuongCommonInfoForm.find('input[name=dM_QuocGiaId]').val(data.id);
            });
        });

        // clear QuocGia event
        $('#ClearDM_QuocGiaTenNuocButton').click(function () {
            _$dM_DoiTuongCommonInfoForm.find('input[name=dM_QuocGiaTenNuoc]').val('');
            _$dM_DoiTuongCommonInfoForm.find('input[name=dM_QuocGiaId]').val('');
        });

        $('#OpenNgheNghiepLookupTableButton').click(function () {

            var dM_DoiTuong = _$dM_DoiTuongCommonInfoForm.serializeFormToObject();

            _dM_NgheNghiepLookupTableModal.open({ id: dM_DoiTuong.ngheNghiepId, displayName: dM_DoiTuong.ngheNghiepDisplayName }, function (data) {
                _$dM_DoiTuongCommonInfoForm.find('input[name=ngheNghiepDisplayName]').val(data.displayName);
                _$dM_DoiTuongCommonInfoForm.find('input[name=ngheNghiepId]').val(data.id);
            });
        });
        
        $('#ClearNgheNghiepDisplayNameButton').click(function () {
            _$dM_DoiTuongCommonInfoForm.find('input[name=ngheNghiepDisplayName]').val('');
            _$dM_DoiTuongCommonInfoForm.find('input[name=ngheNghiepId]').val('');
        });

        // end pick QuocGia modal control

        $('#OpenDonViQuanLyLookupTableButton').click(function () {

            var doiTuong = _$dM_DoiTuongCommonInfoForm.serializeFormToObject();

            _organizationUnitLookupTableModal.open({ id: doiTuong.iD_DonViQuanLy, displayName: doiTuong.donViQuanLyDisplayName }, function (data) {
                
                _$dM_DoiTuongCommonInfoForm.find('input[name=donViQuanLyDisplayName]').val(data.displayName);
                _$dM_DoiTuongCommonInfoForm.find('input[name=iD_DonViQuanLy]').val(data.id);
            });
        });

        $('#ClearDonViQuanLyDisplayNameButton').click(function () {
            _$dM_DoiTuongCommonInfoForm.find('input[name=donViQuanLyDisplayName]').val('');
            _$dM_DoiTuongCommonInfoForm.find('input[name=iD_DonViQuanLy]').val('');
        });

        // begin change image control
        // open modal event
        $('#DM_DoiTuongChangeImageButton').click(function () {
            var dM_DoiTuong = _$dM_DoiTuongCommonInfoForm.serializeFormToObject();
            _changeImageModal.open({ id: dM_DoiTuong.id });
        });

        $('#DM_DichVuProcessTabLink').click(function () {

            processControl = processControl == null ? CongDoanController(_modalManager) : processControl;
        });
        // end change image control



        // save event
        this.save = function () {
            
            if (!_$dM_DoiTuongCommonInfoForm.valid()) {
                return;
            }

            // add lại các file đã tải lên server
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

            $('#fileupload').append('<input type="hidden" id="FileDinhKems" name="FileDinhKems" value="' + tepdinhkem + '">');
            var dM_DoiTuong = _$dM_DoiTuongCommonInfoForm.serializeFormToObject();
            
            dM_DoiTuong.dM_QuocGiaId = _$dM_DoiTuongCommonInfoForm.find('input[name=dM_QuocGiaId]:checked').val();
            dM_DoiTuong.gioiTinhNam = _$dM_DoiTuongCommonInfoForm.find('input[name=gioiTinhNam]:checked').val();
            _modalManager.setBusy(true);
            _dM_DoiTuongsService.createOrEdit(
                dM_DoiTuong
            ).done(function (data) {
                abp.notify.info(app.localize('SavedSuccessfully'));
                _modalManager.setResult(data);
                _modalManager.close();
                abp.event.trigger('app.createOrEditDM_DoiTuongModalSaved');
            }).always(function () {
                _modalManager.setBusy(false);
            });
        };
    };
})(jQuery);


//$('#OpenDM_TrangThaiLookupTableButton').click(function () {

//    var dM_DoiTuong = _$dM_DoiTuongCommonInfoForm.serializeFormToObject();

//    _dM_TrangThaiLookupTableModal.open({ id: dM_DoiTuong.dM_TrangThaiId, displayName: dM_DoiTuong.dM_TrangThaiTenTrangThai }, function (data) {
//        _$dM_DoiTuongCommonInfoForm.find('input[name=dM_TrangThaiTenTrangThai]').val(data.displayName);
//        _$dM_DoiTuongCommonInfoForm.find('input[name=dM_TrangThaiId]').val(data.id);
//    });
//});

//$('#ClearDM_TrangThaiTenTrangThaiButton').click(function () {
//    _$dM_DoiTuongCommonInfoForm.find('input[name=dM_TrangThaiTenTrangThai]').val('');
//    _$dM_DoiTuongCommonInfoForm.find('input[name=dM_TrangThaiId]').val('');
//});