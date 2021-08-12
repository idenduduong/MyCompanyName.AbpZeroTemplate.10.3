var NhanVienThucHien = function (_modalManager) {
    var modal = _modalManager.getModal();
    var _$nhanVienForm = modal.find('form[name=AddNhanVienThucHienForm]');
    var _$hoaDonBanLeInformationForm = _modalManager.getModal().find('form[name=HoaDonBanLeInformationsForm]');
    var _$theKhachHangInformationForm = modal.find('form[name=TheKhachHangInformationsForm]');
    var _$nhanVienThucHiensTable = $('#NhanVienThucHiensTable');
    var _nhanVienThucHiensService = abp.services.app.nhanVienThucHiens;
    
    var idTheKhachHang = modal.find('input[name=id]').val();
    idTheKhachHang = (idTheKhachHang == "" || idTheKhachHang == undefined) ? modal.find('input[name=tempId]').val() : idTheKhachHang;

    $('.date-picker').datetimepicker({
        locale: abp.localization.currentLanguage.name,
        format: 'L'
    });

    var _permissions = {
        create: true, //abp.auth.hasPermission('Pages.NhanVienThucHiens.Create'),
        edit: true, // abp.auth.hasPermission('Pages.NhanVienThucHiens.Edit'),
        'delete': true //abp.auth.hasPermission('Pages.NhanVienThucHiens.Delete')
    };

    var _userLookupTableModal = new app.ModalManager({
        viewUrl: abp.appPath + 'crm/Common/KTVLookupTableModal',
        scriptUrl: abp.appPath + 'view-resources/Areas/crm/Common/_KTVLookupTableModal.js',
        modalClass: 'KTVLookupTableModal'
    });

    var nhanVienThucHien = _$nhanVienThucHiensTable.DataTable({
        paging: true,
        serverSide: true,
        processing: true,
        listAction: {
            ajaxFunction: _nhanVienThucHiensService.getAll,
            inputFilter: function () {
                return {
                    maChungTu: idTheKhachHang,
                    filter: $('#ChietKhauNhanViensTableFilter').val(),
                    userNameFilter: $('#UserNameFilterId').val(),
                    minTienChietKhauFilter: $('#MinTienChietKhauFilterId').val(),
                    maxTienChietKhauFilter: $('#MaxTienChietKhauFilterId').val(),
                };
            }
        },
        columnDefs: [
            {
                width: 120,
                targets: 0,
                data: null,
                orderable: false,
                autoWidth: false,
                defaultContent: '',
                rowAction: {
                    cssClass: 'btn btn-brand dropdown-toggle',
                    text: '<i class="fa fa-cog"></i> ' + app.localize('Actions') + ' <span class="caret"></span>',
                    items: [
                        {
                            text: app.localize('Edit'),
                            visible: function () {
                                return _permissions.edit;
                            },
                            action: function (data) {
                                _createOrEditModal.open({ id: data.record.nhanVienThucHien.id });
                            }
                        },
                        {
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deleteChietKhauNhanVien(data.record.nhanVienThucHien);
                            }
                        }]
                }
            },

            {
                targets: 1,
                data: "userName"
            },
            {
                targets: 2,
                data: "nhanVienThucHien.tienChietKhau"
            },
            {
                targets: 3,
                data: "nhanVienThucHien.ptDoanhThuDuocHuong"
            },
            {
                targets: 4,
                data: "nhanVienThucHien.dienGiai"
            }

        ],
        select: {
            style: 'single'
        }
    });

    nhanVienThucHien
        .on('select', function (e, dt, type, indexes) {

            var count = nhanVienThucHien.rows({ selected: true }).count();

            if (count > 0) {
                RenderNhanVienForm(nhanVienThucHien.rows({ selected: true }).data()[0]);
            }
        });
    function getNhanVienThucHiens() {
        nhanVienThucHien.ajax.reload();
    }

    function deleteChietKhauNhanVien(nhanVienThucHien) {
        abp.message.confirm(
            '',
            function (isConfirmed) {
                if (isConfirmed) {
                    _nhanVienThucHiensService.delete({
                        id: nhanVienThucHien.id
                    }).done(function () {
                        getNhanVienThucHiens(true);
                        abp.notify.success(app.localize('SuccessfullyDeleted'));
                    });
                }
            }
        );
    }
    

    function RenderNhanVienForm(data) {
        
        _$nhanVienForm.find('input[name=id]').val(data.nhanVienThucHien.id);
        _$nhanVienForm.find('input[name=userName]').val(data.userName);
        _$nhanVienForm.find('input[name=nhanVien]').val(data.nhanVienThucHien.nhanVien);
        _$nhanVienForm.find('input[name=tienChietKhau]').val(data.nhanVienThucHien.tienChietKhau);
        _$nhanVienForm.find('input[name=pTDoanhThuDuocHuong]').val(data.nhanVienThucHien.ptDoanhThuDuocHuong);
        _$nhanVienForm.find('input[name=dienGiai]').val(data.nhanVienThucHien.dienGiai);
        _$nhanVienForm.find('input[name=laNhanVienChinh]').prop("checked", data.nhanVienThucHien.laNhanVienChinh);
    }
    
    $('.OpenNhanVienThucHienLookupTableButton').click(function () {

        
        var nhanVienThucHien = $(this).parents('tr');

        _userLookupTableModal.open({ id: nhanVienThucHien.find('input[name=nhanVien]').val(), displayName: nhanVienThucHien.find('input[name=userName]').val() }, function (data) {
            
            nhanVienThucHien.find('input[name=tenNhanVienThucHien]').val(data.tenNhanVien);
            nhanVienThucHien.find('input[name=ngayThucHien]').data("DateTimePicker").date(new Date());
            nhanVienThucHien.find('input[name=nhanVien]').val(data.id);
        });
    });

    $('.ClearNhanVienThucHienButton').click(function () {
        var nhanVienThucHien = $(this).parents('tr');
        nhanVienThucHien.find('input[name=tenNhanVienThucHien]').val('');
        nhanVienThucHien.find('input[name=nhanVien]').val('');
    });
    $('#OpenNhanVienThucHienLookupTableButton').click(function () {
        var nhanVienThucHien = _$nhanVienForm.serializeFormToObject();
        _userLookupTableModal.open({ id: nhanVienThucHien.id, displayName: nhanVienThucHien.userName}, function (data) {
            
            _$nhanVienForm.find('input[name=tenNhanVienThucHien]').val(data.tenNhanVien);
            _$nhanVienForm.find('input[name=nhanVien]').val(data.id);
            _$nhanVienForm.find('input[name=ngayThucHien]').data("DateTimePicker").date(new Date());
        });
    });

    $('#ClearNhanVienThucHienButton').click(function () {
        _$nhanVienForm.find('input[name=tenNhanVienThucHien]').val('');
        _$nhanVienForm.find('input[name=nhanVien]').val('');
    });

    var saveNhanVienThucHien = function () {
        if (!_$nhanVienForm.valid()) {
            return;
        }
        var nhanVienThucHien = _$nhanVienForm.serializeFormToObject();
        $('#NhanVienThucHienTable td .m-checkable').each(function () {
            if ($(this).prop("checked")) {
                var currentRow = $(this).parents("tr");
                currentRow.find('input[name=tenNhanVienThucHien]').val(nhanVienThucHien.tenNhanVienThucHien);
                currentRow.find('input[name=ngayThucHien]').data("DateTimePicker").date(nhanVienThucHien.ngayThucHien);
                currentRow.find('input[name=nhanVien]').val(nhanVienThucHien.nhanVien);
                currentRow.find('select[name=danhGia]').val(nhanVienThucHien.danhGia);
                currentRow.find('select[name=danhGia]').trigger("change");
            }
        })
    };
    function clearNhanVienThucHienForm() {
        _$nhanVienForm.find('input[name=tenNhanVienThucHien]').val('');
        _$nhanVienForm.find('input[name=nhanVien]').val('');
        _$nhanVienForm.find('input[name=tienChietKhau]').val('');
        _$nhanVienForm.find('input[name=pTDoanhThuDuocHuong]').val('');
        _$nhanVienForm.find('input[name=dienGiai]').val('');
    };
    $('.save-nhanvienthuchien-button').click(function () {
        saveNhanVienThucHien();
        //clearNhanVienThucHienForm();
        $('.create-nhanvienthuchien-button').show();
        $('form[name=AddNhanVienThucHienForm]').hide();
    })
    $('.create-nhanvienthuchien-button').click(function () {
        
        $('form[name=AddNhanVienThucHienForm]').show();
        $(this).hide();
    })

    
    modal.find('#CreateNewChietKhauNhanVienButton').click(function () {
        _$nhanVienForm[0].reset();
    });
    

    modal.find('#GetChietKhauNhanViensButton').click(function (e) {
        e.preventDefault();
        getNhanVienThucHiens();
    });

    $(document).keypress(function (e) {
        if (e.which === 13) {
            getNhanVienThucHiens();
        }
    });
    return true;
};
var DichVuController = function (_modalManager) {
    
    var _chitietHangHoaDichVuTab = _modalManager.getModal().find('#HangHoaDichVuTab');
    var _tongTien = _modalManager.getModal().find('input[name=tongTienHang]');
    var hoaDonId = _modalManager.getModal().find('input[name=id]').val();
    var tempId = _modalManager.getModal().find('input[name=tempId]').val();
    var isTempData = false;
    var khachHangId = null; 
    if (hoaDonId == "" || hoaDonId == undefined) {
        hoaDonId = tempId;
        isTempData = true;
    }
    
    
    if (hoaDonId == "") {
        return;
    }
    var _$hoaDonBanLeChiTietsTable = $('#HoaDonBanLeChiTietsTable');
    var _hoaDonBanLeChiTietsService = abp.services.app.hoaDonBanLeChiTiets;

    $('.date-picker').datetimepicker({
        locale: abp.localization.currentLanguage.name,
        format: 'L'
    });

    var _permissions = {
        create: abp.auth.hasPermission('Pages.HoaDonBanLeChiTiets.Create'),
        edit: abp.auth.hasPermission('Pages.HoaDonBanLeChiTiets.Edit'),
        'delete': abp.auth.hasPermission('Pages.HoaDonBanLeChiTiets.Delete')
    };

    var _createOrEditModal = new app.ModalManager({
        viewUrl: abp.appPath + 'crm/HoaDonBanLeChiTiets/CreateOrEditModal',
        scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/HoaDonBanLeChiTiets/_CreateOrEditModal.js',
        modalClass: 'CreateOrEditHoaDonBanLeChiTietModal'
    });

    var _viewHoaDonBanLeChiTietModal = new app.ModalManager({
        viewUrl: abp.appPath + 'crm/HoaDonBanLeChiTiets/ViewhoaDonBanLeChiTietModal',
        modalClass: 'ViewHoaDonBanLeChiTietModal'
    });

    var dataTable = _$hoaDonBanLeChiTietsTable.DataTable({
        paging: true,
        serverSide: true,
        processing: true,
        //fnServerData: function (sSource, aoData, fnCallback) {
        //    
        //    $.getJSON(sSource, aoData, function (json) {
        //        //take the processing time and put it in a div
        //        alert(json.additionalData.tongTienHang);
        //        //pass the data to the standard callback and draw the table
        //        fnCallback(json);
        //    });
        //},
        fnDrawCallback: function (oSettings) {
            
            var additionalData = oSettings.rawServerResponse.additionalData;
            _tongTien.val(additionalData.tongTienHang);
        },
        listAction: {
            ajaxFunction: _hoaDonBanLeChiTietsService.getAll,
            inputFilter: function () {
                return {
                    filter: _chitietHangHoaDichVuTab.find('#HoaDonBanLeChiTietsTableFilter').val(),
                    hoaDonId: hoaDonId,
                    hoaDonTempId: tempId,
                    minSoThuTuFilter: _chitietHangHoaDichVuTab.find('#MinSoThuTuFilterId').val(),
                    maxSoThuTuFilter: _chitietHangHoaDichVuTab.find('#MaxSoThuTuFilterId').val(),
                    minThoiGianFilter: _chitietHangHoaDichVuTab.find('#MinThoiGianFilterId').val(),
                    maxThoiGianFilter: _chitietHangHoaDichVuTab.find('#MaxThoiGianFilterId').val(),
                    minThoiGianBaoHanhFilter: _chitietHangHoaDichVuTab.find('#MinThoiGianBaoHanhFilterId').val(),
                    maxThoiGianBaoHanhFilter: _chitietHangHoaDichVuTab.find('#MaxThoiGianBaoHanhFilterId').val(),
                    minLoaiThoiGianBHFilter: _chitietHangHoaDichVuTab.find('#MinLoaiThoiGianBHFilterId').val(),
                    maxLoaiThoiGianBHFilter: _chitietHangHoaDichVuTab.find('#MaxLoaiThoiGianBHFilterId').val(),
                    iD_MaVachFilter: _chitietHangHoaDichVuTab.find('#ID_MaVachFilterId').val(),
                    chatLieuFilter: _chitietHangHoaDichVuTab.find('#ChatLieuFilterId').val(),
                    mauSacFilter: _chitietHangHoaDichVuTab.find('#MauSacFilterId').val(),
                    kichCoFilter: _chitietHangHoaDichVuTab.find('#KichCoFilterId').val(),
                    minSoLuongFilter: _chitietHangHoaDichVuTab.find('#MinSoLuongFilterId').val(),
                    maxSoLuongFilter: _chitietHangHoaDichVuTab.find('#MaxSoLuongFilterId').val(),
                    minDonGiaFilter: _chitietHangHoaDichVuTab.find('#MinDonGiaFilterId').val(),
                    maxDonGiaFilter: _chitietHangHoaDichVuTab.find('#MaxDonGiaFilterId').val(),
                    minThanhTienFilter: _chitietHangHoaDichVuTab.find('#MinThanhTienFilterId').val(),
                    maxThanhTienFilter: _chitietHangHoaDichVuTab.find('#MaxThanhTienFilterId').val(),
                    minPTChietKhauFilter: _chitietHangHoaDichVuTab.find('#MinPTChietKhauFilterId').val(),
                    maxPTChietKhauFilter: _chitietHangHoaDichVuTab.find('#MaxPTChietKhauFilterId').val(),
                    minTienChietKhauFilter: _chitietHangHoaDichVuTab.find('#MinTienChietKhauFilterId').val(),
                    maxTienChietKhauFilter: _chitietHangHoaDichVuTab.find('#MaxTienChietKhauFilterId').val(),
                    minTienThueFilter: _chitietHangHoaDichVuTab.find('#MinTienThueFilterId').val(),
                    maxTienThueFilter: _chitietHangHoaDichVuTab.find('#MaxTienThueFilterId').val(),
                    minPTChiPhiFilter: _chitietHangHoaDichVuTab.find('#MinPTChiPhiFilterId').val(),
                    maxPTChiPhiFilter: _chitietHangHoaDichVuTab.find('#MaxPTChiPhiFilterId').val(),
                    minTienChiPhiFilter: _chitietHangHoaDichVuTab.find('#MinTienChiPhiFilterId').val(),
                    maxTienChiPhiFilter: _chitietHangHoaDichVuTab.find('#MaxTienChiPhiFilterId').val(),
                    minThanhToanFilter: _chitietHangHoaDichVuTab.find('#MinThanhToanFilterId').val(),
                    maxThanhToanFilter: _chitietHangHoaDichVuTab.find('#MaxThanhToanFilterId').val(),
                    minGiaVonFilter: _chitietHangHoaDichVuTab.find('#MinGiaVonFilterId').val(),
                    maxGiaVonFilter: _chitietHangHoaDichVuTab.find('#MaxGiaVonFilterId').val(),
                    ghiChuFilter: _chitietHangHoaDichVuTab.find('#GhiChuFilterId').val(),
                    userNhapFilter: _chitietHangHoaDichVuTab.find('#UserNhapFilterId').val(),
                    minSoLanDaInFilter: _chitietHangHoaDichVuTab.find('#MinSoLanDaInFilterId').val(),
                    maxSoLanDaInFilter: _chitietHangHoaDichVuTab.find('#MaxSoLanDaInFilterId').val(),
                    iD_TangKemFilter: _chitietHangHoaDichVuTab.find('#ID_TangKemFilterId').val(),
                    tangKemFilter: _chitietHangHoaDichVuTab.find('#TangKemFilterId').val(),
                    minThoiGianThucHienFilter: _chitietHangHoaDichVuTab.find('#MinThoiGianThucHienFilterId').val(),
                    maxThoiGianThucHienFilter: _chitietHangHoaDichVuTab.find('#MaxThoiGianThucHienFilterId').val(),
                    minSoLuong_TLFilter: _chitietHangHoaDichVuTab.find('#MinSoLuong_TLFilterId').val(),
                    maxSoLuong_TLFilter: _chitietHangHoaDichVuTab.find('#MaxSoLuong_TLFilterId').val(),
                    minSoLuong_YCFilter: _chitietHangHoaDichVuTab.find('#MinSoLuong_YCFilterId').val(),
                    maxSoLuong_YCFilter: _chitietHangHoaDichVuTab.find('#MaxSoLuong_YCFilterId').val(),
                    chieuFilter: _chitietHangHoaDichVuTab.find('#ChieuFilterId').val(),
                    sangFilter: _chitietHangHoaDichVuTab.find('#SangFilterId').val(),
                    minPTThueFilter: _chitietHangHoaDichVuTab.find('#MinPTThueFilterId').val(),
                    maxPTThueFilter: _chitietHangHoaDichVuTab.find('#MaxPTThueFilterId').val(),
                    maNhanVienThucHienFilter: _chitietHangHoaDichVuTab.find('#MaNhanVienThucHienFilterId').val(),
                    tenNhanVienThucHienFilter: _chitietHangHoaDichVuTab.find('#TenNhanVienThucHienFilterId').val(),
                    maNhanVienTuVanFilter: _chitietHangHoaDichVuTab.find('#MaNhanVienTuVanFilterId').val(),
                    tenNhanVienTuVanFilter: _chitietHangHoaDichVuTab.find('#TenNhanVienTuVanFilterId').val(),
                    maTheLanFilter: _chitietHangHoaDichVuTab.find('#MaTheLanFilterId').val(),
                    maTheGiaTriFilter: _chitietHangHoaDichVuTab.find('#MaTheGiaTriFilterId').val(),
                    hoaDonBanLeMaHoaDonFilter: _chitietHangHoaDichVuTab.find('#HoaDonBanLeMaHoaDonFilterId').val(),
                    dM_HangHoaTenHangHoaFilter: _chitietHangHoaDichVuTab.find('#DM_HangHoaTenHangHoaFilterId').val(),
                    dM_KhoTenKhoFilter: _chitietHangHoaDichVuTab.find('#DM_KhoTenKhoFilterId').val(),
                    dM_DonViTinhTenDonViTinhFilter: _chitietHangHoaDichVuTab.find('#DM_DonViTinhTenDonViTinhFilterId').val(),
                    dM_LoHangSoLoFilter: _chitietHangHoaDichVuTab.find('#DM_LoHangSoLoFilterId').val(),
                    dM_ThueSuatMaThueSuatFilter: _chitietHangHoaDichVuTab.find('#DM_ThueSuatMaThueSuatFilterId').val()
                };
            }
        },
        columnDefs: [
            {
                width: 120,
                targets: 0,
                data: null,
                orderable: false,
                autoWidth: false,
                defaultContent: '',
                rowAction: {
                    cssClass: 'btn btn-brand dropdown-toggle',
                    text: '<i class="fa fa-cog"></i> ' + app.localize('Actions') + ' <span class="caret"></span>',
                    items: [
                        {
                            text: app.localize('View'),
                            action: function (data) {
                                _viewHoaDonBanLeChiTietModal.open({ data: data.record });
                            }
                        },
                        {
                            text: app.localize('Edit'),
                            visible: function () {
                                return _permissions.edit;
                            },
                            action: function (data) {
                                khachHangId = _modalManager.getModal().find('input[name=iD_DoiTuong]').val();
                                
                                _createOrEditModal.open({ id: data.record.hoaDonBanLeChiTiet.id, khachHangId: khachHangId, hoaDonId: hoaDonId });
                            }
                        },
                        {
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deleteHoaDonBanLeChiTiet(data.record.hoaDonBanLeChiTiet);
                            }
                        }]
                }
            },
            {
                targets: 1,
                data: "dM_HangHoaTenHangHoa"
            },
            {
                targets: 2,
                data: "dM_DonViTinhTenDonViTinh"
            },
            {
                targets: 3,
                data: "hoaDonBanLeChiTiet.thoiGian",
                render: function (thoiGian) {
                    if (thoiGian) {
                        return moment(thoiGian).format('L');
                    }
                    return "";
                }

            },
            {
                targets: 4,
                data: "hoaDonBanLeChiTiet.thoiGianThucHien"
            },
            {
                targets: 5,
                data: "hoaDonBanLeChiTiet.soLuong"
            },
            {
                targets: 6,
                data: "hoaDonBanLeChiTiet.donGia"
            },
            {
                targets: 7,
                data: "hoaDonBanLeChiTiet.thanhTien",
                render: function (data) {
                    return '<span class="numeric-cell">' + $.number(data, 0) + '</span>'; 
                }
            },
            {
                targets: 8,
                data: "hoaDonBanLeChiTiet.ptChietKhau",
                render: function (data) {
                    return '<span class="numeric-cell">' + $.number(data, 0) + '</span>'; 
                }
            },
            {
                targets: 9,
                data: "hoaDonBanLeChiTiet.tienChietKhau",
                render: function (data) {
                    return '<span class="numeric-cell">' + $.number(data, 0) + '</span>'; 
                }
            },
            {
                targets: 10,
                data: "hoaDonBanLeChiTiet.thanhToan",
                render: function (data) {
                    return '<span class="numeric-cell">' + $.number(data, 0) + '</span>'; 
                }
            },
            {
                targets: 11,
                data: "hoaDonBanLeChiTiet.ghiChu"
            },
            {
                targets: 12,
                data: "hoaDonBanLeChiTiet.tangKem",
                render: function (tangKem) {
                    if (tangKem) {
                        return '<i class="la la-check-square m--font-success" title="True"></i>';
                    }
                    return '<i class="la la-times-circle" title="False"></i>';
                }

            },
            
            {
                targets: 13,
                data: "hoaDonBanLeChiTiet.soLuong_TL"
            },
            {
                targets: 14,
                data: "hoaDonBanLeChiTiet.maTheLan"
            },
            {
                targets: 15,
                data: "hoaDonBanLeChiTiet.maTheGiaTri"
            }
            
            
        ]
    });


    function getHoaDonBanLeChiTiets() {
        dataTable.ajax.reload();
    }

    function deleteHoaDonBanLeChiTiet(hoaDonBanLeChiTiet) {
        abp.message.confirm(
            '',
            function (isConfirmed) {
                if (isConfirmed) {
                    _hoaDonBanLeChiTietsService.delete({
                        id: hoaDonBanLeChiTiet.id
                    }).done(function () {
                        getHoaDonBanLeChiTiets(true);
                        abp.notify.success(app.localize('SuccessfullyDeleted'));
                    });
                }
            }
        );
    }

    _chitietHangHoaDichVuTab.find('#ShowAdvancedFiltersSpan').click(function () {
        _chitietHangHoaDichVuTab.find('#ShowAdvancedFiltersSpan').hide();
        _chitietHangHoaDichVuTab.find('#HideAdvancedFiltersSpan').show();
        _chitietHangHoaDichVuTab.find('#AdvacedAuditFiltersArea').slideDown();
    });

    _chitietHangHoaDichVuTab.find('#HideAdvancedFiltersSpan').click(function () {
        _chitietHangHoaDichVuTab.find('#HideAdvancedFiltersSpan').hide();
        _chitietHangHoaDichVuTab.find('#ShowAdvancedFiltersSpan').show();
        _chitietHangHoaDichVuTab.find('#AdvacedAuditFiltersArea').slideUp();
    });

    _chitietHangHoaDichVuTab.find('#CreateNewHoaDonBanLeChiTietButton').click(function () {
        khachHangId = _modalManager.getModal().find('input[name=iD_DoiTuong]').val();
        if (khachHangId == "" || khachHangId == undefined) {
            abp.notify.info(app.localize('YouNeedSelectCustomerFirst'));
            return;
        }
        _createOrEditModal.open({ id: null, hoaDonId: hoaDonId, isTempData: isTempData, khachHangId: khachHangId });
    });

    _chitietHangHoaDichVuTab.find('#ExportToExcelButton').click(function () {
        _hoaDonBanLeChiTietsService
            .getHoaDonBanLeChiTietsToExcel({
                filter: _chitietHangHoaDichVuTab.find('#HoaDonBanLeChiTietsTableFilter').val(),
                minSoThuTuFilter: _chitietHangHoaDichVuTab.find('#MinSoThuTuFilterId').val(),
                maxSoThuTuFilter: _chitietHangHoaDichVuTab.find('#MaxSoThuTuFilterId').val(),
                minThoiGianFilter: _chitietHangHoaDichVuTab.find('#MinThoiGianFilterId').val(),
                maxThoiGianFilter: _chitietHangHoaDichVuTab.find('#MaxThoiGianFilterId').val(),
                minThoiGianBaoHanhFilter: _chitietHangHoaDichVuTab.find('#MinThoiGianBaoHanhFilterId').val(),
                maxThoiGianBaoHanhFilter: _chitietHangHoaDichVuTab.find('#MaxThoiGianBaoHanhFilterId').val(),
                minLoaiThoiGianBHFilter: _chitietHangHoaDichVuTab.find('#MinLoaiThoiGianBHFilterId').val(),
                maxLoaiThoiGianBHFilter: _chitietHangHoaDichVuTab.find('#MaxLoaiThoiGianBHFilterId').val(),
                iD_MaVachFilter: _chitietHangHoaDichVuTab.find('#ID_MaVachFilterId').val(),
                chatLieuFilter: _chitietHangHoaDichVuTab.find('#ChatLieuFilterId').val(),
                mauSacFilter: _chitietHangHoaDichVuTab.find('#MauSacFilterId').val(),
                kichCoFilter: _chitietHangHoaDichVuTab.find('#KichCoFilterId').val(),
                minSoLuongFilter: _chitietHangHoaDichVuTab.find('#MinSoLuongFilterId').val(),
                maxSoLuongFilter: _chitietHangHoaDichVuTab.find('#MaxSoLuongFilterId').val(),
                minDonGiaFilter: _chitietHangHoaDichVuTab.find('#MinDonGiaFilterId').val(),
                maxDonGiaFilter: _chitietHangHoaDichVuTab.find('#MaxDonGiaFilterId').val(),
                minThanhTienFilter: _chitietHangHoaDichVuTab.find('#MinThanhTienFilterId').val(),
                maxThanhTienFilter: _chitietHangHoaDichVuTab.find('#MaxThanhTienFilterId').val(),
                minPTChietKhauFilter: _chitietHangHoaDichVuTab.find('#MinPTChietKhauFilterId').val(),
                maxPTChietKhauFilter: _chitietHangHoaDichVuTab.find('#MaxPTChietKhauFilterId').val(),
                minTienChietKhauFilter: _chitietHangHoaDichVuTab.find('#MinTienChietKhauFilterId').val(),
                maxTienChietKhauFilter: _chitietHangHoaDichVuTab.find('#MaxTienChietKhauFilterId').val(),
                minTienThueFilter: _chitietHangHoaDichVuTab.find('#MinTienThueFilterId').val(),
                maxTienThueFilter: _chitietHangHoaDichVuTab.find('#MaxTienThueFilterId').val(),
                minPTChiPhiFilter: _chitietHangHoaDichVuTab.find('#MinPTChiPhiFilterId').val(),
                maxPTChiPhiFilter: _chitietHangHoaDichVuTab.find('#MaxPTChiPhiFilterId').val(),
                minTienChiPhiFilter: _chitietHangHoaDichVuTab.find('#MinTienChiPhiFilterId').val(),
                maxTienChiPhiFilter: _chitietHangHoaDichVuTab.find('#MaxTienChiPhiFilterId').val(),
                minThanhToanFilter: _chitietHangHoaDichVuTab.find('#MinThanhToanFilterId').val(),
                maxThanhToanFilter: _chitietHangHoaDichVuTab.find('#MaxThanhToanFilterId').val(),
                minGiaVonFilter: _chitietHangHoaDichVuTab.find('#MinGiaVonFilterId').val(),
                maxGiaVonFilter: _chitietHangHoaDichVuTab.find('#MaxGiaVonFilterId').val(),
                ghiChuFilter: _chitietHangHoaDichVuTab.find('#GhiChuFilterId').val(),
                userNhapFilter: _chitietHangHoaDichVuTab.find('#UserNhapFilterId').val(),
                minSoLanDaInFilter: _chitietHangHoaDichVuTab.find('#MinSoLanDaInFilterId').val(),
                maxSoLanDaInFilter: _chitietHangHoaDichVuTab.find('#MaxSoLanDaInFilterId').val(),
                iD_TangKemFilter: _chitietHangHoaDichVuTab.find('#ID_TangKemFilterId').val(),
                tangKemFilter: _chitietHangHoaDichVuTab.find('#TangKemFilterId').val(),
                minThoiGianThucHienFilter: _chitietHangHoaDichVuTab.find('#MinThoiGianThucHienFilterId').val(),
                maxThoiGianThucHienFilter: _chitietHangHoaDichVuTab.find('#MaxThoiGianThucHienFilterId').val(),
                minSoLuong_TLFilter: _chitietHangHoaDichVuTab.find('#MinSoLuong_TLFilterId').val(),
                maxSoLuong_TLFilter: _chitietHangHoaDichVuTab.find('#MaxSoLuong_TLFilterId').val(),
                minSoLuong_YCFilter: _chitietHangHoaDichVuTab.find('#MinSoLuong_YCFilterId').val(),
                maxSoLuong_YCFilter: _chitietHangHoaDichVuTab.find('#MaxSoLuong_YCFilterId').val(),
                chieuFilter: _chitietHangHoaDichVuTab.find('#ChieuFilterId').val(),
                sangFilter: _chitietHangHoaDichVuTab.find('#SangFilterId').val(),
                minPTThueFilter: _chitietHangHoaDichVuTab.find('#MinPTThueFilterId').val(),
                maxPTThueFilter: _chitietHangHoaDichVuTab.find('#MaxPTThueFilterId').val(),
                maNhanVienThucHienFilter: _chitietHangHoaDichVuTab.find('#MaNhanVienThucHienFilterId').val(),
                tenNhanVienThucHienFilter: _chitietHangHoaDichVuTab.find('#TenNhanVienThucHienFilterId').val(),
                maNhanVienTuVanFilter: _chitietHangHoaDichVuTab.find('#MaNhanVienTuVanFilterId').val(),
                tenNhanVienTuVanFilter: _chitietHangHoaDichVuTab.find('#TenNhanVienTuVanFilterId').val(),
                maTheLanFilter: _chitietHangHoaDichVuTab.find('#MaTheLanFilterId').val(),
                maTheGiaTriFilter: _chitietHangHoaDichVuTab.find('#MaTheGiaTriFilterId').val(),
                hoaDonBanLeMaHoaDonFilter: _chitietHangHoaDichVuTab.find('#HoaDonBanLeMaHoaDonFilterId').val(),
                dM_HangHoaTenHangHoaFilter: _chitietHangHoaDichVuTab.find('#DM_HangHoaTenHangHoaFilterId').val(),
                dM_KhoTenKhoFilter: _chitietHangHoaDichVuTab.find('#DM_KhoTenKhoFilterId').val(),
                dM_DonViTinhTenDonViTinhFilter: _chitietHangHoaDichVuTab.find('#DM_DonViTinhTenDonViTinhFilterId').val(),
                dM_LoHangSoLoFilter: _chitietHangHoaDichVuTab.find('#DM_LoHangSoLoFilterId').val(),
                dM_ThueSuatMaThueSuatFilter: _chitietHangHoaDichVuTab.find('#DM_ThueSuatMaThueSuatFilterId').val()
            })
            .done(function (result) {
                app.downloadTempFile(result);
            });
    });

    abp.event.on('app.createOrEditHoaDonBanLeChiTietModalSaved', function () {
        getHoaDonBanLeChiTiets();
    });

    _chitietHangHoaDichVuTab.find('#GetHoaDonBanLeChiTietsButton').click(function (e) {
        e.preventDefault();
        getHoaDonBanLeChiTiets();
    });

    _chitietHangHoaDichVuTab.find(document).keypress(function (e) {
        if (e.which === 13) {
            getHoaDonBanLeChiTiets();
        }
    });
    return true;
};
var ChietKhauNhanVien = function (_modalManager) {
    var modal = _modalManager.getModal();
    var _$nhanVienForm = modal.find('form[name=NhanVienTuVanForm]');
    var _$theKhachHangInformationForm = modal.find('form[name=TheKhachHangInformationsForm]');
    var _$nhanVienThucHiensTable = $('#ChietKhauNhanViensTable');
    var _chietKhauNhanViensService = abp.services.app.nhanVienThucHiens;
    
    var idTheKhachHang = modal.find('input[name=id]').val();
    idTheKhachHang = (idTheKhachHang == "" || idTheKhachHang == undefined) ? modal.find('input[name=tempId]').val() : idTheKhachHang;

    $('.date-picker').datetimepicker({
        locale: abp.localization.currentLanguage.name,
        format: 'L'
    });

    var _permissions = {
        create: true, //abp.auth.hasPermission('Pages.NhanVienThucHiens.Create'),
        edit: true, //abp.auth.hasPermission('Pages.NhanVienThucHiens.Edit'),
        'delete': true //abp.auth.hasPermission('Pages.NhanVienThucHiens.Delete')
    };

    var _userLookupTableModal = new app.ModalManager({
        viewUrl: abp.appPath + 'crm/Common/SaleLookupTableModal',
        scriptUrl: abp.appPath + 'view-resources/Areas/crm/Common/_SaleLookupTableModal.js',
        modalClass: 'SaleLookupTableModal'
    });

    var chietKhauNhanVien = _$nhanVienThucHiensTable.DataTable({
        paging: true,
        serverSide: true,
        processing: true,
        listAction: {
            ajaxFunction: _chietKhauNhanViensService.getAll,
            inputFilter: function () {
                return {
                    maChungTu: idTheKhachHang,
                    filter: $('#ChietKhauNhanViensTableFilter').val(),
                    userNameFilter: $('#UserNameFilterId').val(),
                    minTienChietKhauFilter: $('#MinTienChietKhauFilterId').val(),
                    maxTienChietKhauFilter: $('#MaxTienChietKhauFilterId').val(),
                };
            }
        },
        columnDefs: [
            {
                width: 120,
                targets: 0,
                data: null,
                orderable: false,
                autoWidth: false,
                defaultContent: '',
                rowAction: {
                    cssClass: 'btn btn-brand dropdown-toggle',
                    text: '<i class="fa fa-cog"></i> ' + app.localize('Actions') + ' <span class="caret"></span>',
                    items: [
                        {
                            text: app.localize('Edit'),
                            visible: function () {
                                return _permissions.edit;
                            },
                            action: function (data) {
                                _createOrEditModal.open({ id: data.record.nhanVienThucHien.id });
                            }
                        },
                        {
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deleteChietKhauNhanVien(data.record.nhanVienThucHien);
                            }
                        }]
                }
            },

            {
                targets: 1,
                data: "userName"
            },
            {
                targets: 2,
                data: "nhanVienThucHien.tienChietKhau"
            },
            {
                targets: 3,
                data: "nhanVienThucHien.laNhanVienChinh",
                render: function (laNhanVienChinh) {
                    if (laNhanVienChinh) {
                        return '<i class="la la-check-square m--font-success" title="True"></i>';
                    }
                    return '<i class="la la-times-circle" title="False"></i>';
                }
            }

        ],
        select: {
            style: 'single'
        }
    });

    chietKhauNhanVien
        .on('select', function (e, dt, type, indexes) {

            var count = chietKhauNhanVien.rows({ selected: true }).count();

            if (count > 0) {
                RenderNhanVienForm(chietKhauNhanVien.rows({ selected: true }).data()[0]);
                $('.save-nhanvien-button').show();
                $(".cancel-nhanvien-button").show();
                $(".add-nhanvien-button").hide();
            }
        });
    function getChietKhauNhanViens() {
        chietKhauNhanVien.ajax.reload();
    }

    function deleteChietKhauNhanVien(nhanVienThucHien) {
        abp.message.confirm(
            '',
            function (isConfirmed) {
                if (isConfirmed) {
                    _chietKhauNhanViensService.delete({
                        id: nhanVienThucHien.id
                    }).done(function () {
                        getChietKhauNhanViens(true);
                        abp.notify.success(app.localize('SuccessfullyDeleted'));
                    });
                }
            }
        );
    }
    

    function RenderNhanVienForm(data) {
        
        _$nhanVienForm.find('input[name=id]').val(data.nhanVienThucHien.id);
        _$nhanVienForm.find('input[name=userName]').val(data.userName);
        _$nhanVienForm.find('input[name=nhanVien]').val(data.nhanVienThucHien.nhanVien);
        _$nhanVienForm.find('input[name=tienChietKhau]').val(data.nhanVienThucHien.tienChietKhau);
        _$nhanVienForm.find('input[name=laNhanVienChinh]').prop("checked", data.nhanVienThucHien.laNhanVienChinh);
    }
    
    $('#OpenNhanVienLookupTableButton').click(function () {

        var nhanVienThucHien = _$nhanVienForm.serializeFormToObject();
        
        _userLookupTableModal.open({ id: nhanVienThucHien.nhanVien, displayName: nhanVienThucHien.userName }, function (data) {
            _$nhanVienForm.find('input[name=userName]').val(data.tenNhanVien);
            _$nhanVienForm.find('input[name=nhanVien]').val(data.id);
            _$nhanVienForm.find('input[name=tienChietKhau]').val(data.ptChietKhau);
        });
    });

    $('#ClearNhanVienButton').click(function () {
        _$nhanVienForm.find('input[name=userName]').val('');
        _$nhanVienForm.find('input[name=nhanVien]').val('');
        _$nhanVienForm.find('input[name=tienChietKhau]').val('');
    });
    function ClearForm() {
        _$nhanVienForm.find('input[name=id]').val('');
        _$nhanVienForm.find('input[name=userName]').val('');
        _$nhanVienForm.find('input[name=nhanVien]').val('');
        _$nhanVienForm.find('input[name=tienChietKhau]').val('');
    }

    var saveNhanVienTuVan = function () {
        if (!_$nhanVienForm.valid()) {
            return;
        }
        var theKhachHang = _$theKhachHangInformationForm.serializeFormToObject();

        var theKhachHangId = theKhachHang.tempId == "" ? theKhachHang.id : theKhachHang.tempId;
        var nhanVienThucHien = _$nhanVienForm.serializeFormToObject();
        nhanVienThucHien.maChungTu = theKhachHangId;
        nhanVienThucHien.loaiChungTu = 11;
        _modalManager.setBusy(true);
        _chietKhauNhanViensService.createOrEdit(
            nhanVienThucHien
        ).done(function () {
            abp.notify.info(app.localize('SavedSuccessfully'));
            
            getChietKhauNhanViens();
            ClearForm();
        }).always(function () {
            _modalManager.setBusy(false);
        });
    };

    $('.save-nhanvien-button').click(function () {
        saveNhanVienTuVan();
    })
    $(".reset-nhanvien-button").click(function () {
        ClearForm();
        var data = chietKhauNhanVien.rows({ selected: true }).data()[0];
        RenderNhanVienForm(data);
    })
    $(".cancel-nhanvien-button").click(function () {
        ClearForm();
    })
    
    modal.find('#CreateNewChietKhauNhanVienButton').click(function () {
        _$nhanVienForm[0].reset();
    });
    

    modal.find('#GetChietKhauNhanViensButton').click(function (e) {
        e.preventDefault();
        getChietKhauNhanViens();
    });

    $(document).keypress(function (e) {
        if (e.which === 13) {
            getChietKhauNhanViens();
        }
    });
    return true;
};
var ChiTietHangHoaDichVu = function (_modalManager) {

    var _chitietHangHoaDichVuTab = _modalManager.getModal().find('#HangHoaDichVuTab');
    var _idThe = _modalManager.getModal().find('[name=id]').val() == "" ? _modalManager.getModal().find('[name=tempId]').val() : _modalManager.getModal().find('[name=id]').val();
    var _$chiTietDichVuTable = $('#ChiTietDichVuTable');

    var _theKhachHangChiTietsService = abp.services.app.theKhachHangChiTiets;
    var _$chiTietDichVuForm = _modalManager.getModal().find('form[name=ChiTietDichVuForm]');
    var _$thongTinTheLanForm = _modalManager.getModal().find('form[name=TheKhachHangInformationsForm]');

    $('.date-picker').datetimepicker({
        locale: abp.localization.currentLanguage.name,
        format: 'L'
    });

    var _permissions = {
        create: abp.auth.hasPermission('Pages.TheKhachHangs.Create'),
        edit: abp.auth.hasPermission('Pages.TheKhachHangs.Edit'),
        'delete': abp.auth.hasPermission('Pages.TheKhachHangs.Edit')
    };

    var _createOrEditModal = new app.ModalManager({
        viewUrl: abp.appPath + 'crm/TheKhachHangChiTiets/CreateOrEditModal',
        scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/TheKhachHangChiTiets/_CreateOrEditModal.js',
        modalClass: 'CreateOrEditTheKhachHangChiTietModal'
    });

    var _viewTheKhachHangChiTietModal = new app.ModalManager({
        viewUrl: abp.appPath + 'crm/TheKhachHangChiTiets/ViewtheKhachHangChiTietModal',
        modalClass: 'ViewTheKhachHangChiTietModal'
    });

    var chiTietDichVuTable = _$chiTietDichVuTable.DataTable({
        paging: true,
        serverSide: true,
        processing: true,
        responsive: true,
        //drawCallback: function (settings) {
        //    
        //    var api = this.api();

        //    var currentPageDataSet = api.rows({ page: 'current' }).data();
        //    var $tbody = $('#TheKhachHangChiTietsTable tbody');
        //    var isEven = (currentPageDataSet.length +1) % 2 === 0;
        //    var $tr = (isEven) ? $('<tr role="row" class="even"></tr>') : $('<tr role="row"  class="odd"></tr>');
        //    $tbody.append($tr);
        //},
        listAction: {
            ajaxFunction: _theKhachHangChiTietsService.getAll,
            inputFilter: function () {
                return {
                    filter: _chitietHangHoaDichVuTab.find('#TheKhachHangChiTietsTableFilter').val(),
                    iD_TheKhachHang: _idThe,
                    laHangTang: false,
                    minSoLuongFilter: _chitietHangHoaDichVuTab.find('#MinSoLuongFilterId').val(),
                    maxSoLuongFilter: _chitietHangHoaDichVuTab.find('#MaxSoLuongFilterId').val(),
                    minDonGiaFilter: _chitietHangHoaDichVuTab.find('#MinDonGiaFilterId').val(),
                    maxDonGiaFilter: _chitietHangHoaDichVuTab.find('#MaxDonGiaFilterId').val(),
                    minPTChietKhauFilter: _chitietHangHoaDichVuTab.find('#MinPTChietKhauFilterId').val(),
                    maxPTChietKhauFilter: _chitietHangHoaDichVuTab.find('#MaxPTChietKhauFilterId').val(),
                    minTienChietKhauFilter: _chitietHangHoaDichVuTab.find('#MinTienChietKhauFilterId').val(),
                    maxTienChietKhauFilter: _chitietHangHoaDichVuTab.find('#MaxTienChietKhauFilterId').val(),
                    minThanhToanFilter: _chitietHangHoaDichVuTab.find('#MinThanhToanFilterId').val(),
                    maxThanhToanFilter: _chitietHangHoaDichVuTab.find('#MaxThanhToanFilterId').val(),
                    ghiChuFilter: _chitietHangHoaDichVuTab.find('#GhiChuFilterId').val(),
                    minSoLuongTangFilter: _chitietHangHoaDichVuTab.find('#MinSoLuongTangFilterId').val(),
                    maxSoLuongTangFilter: _chitietHangHoaDichVuTab.find('#MaxSoLuongTangFilterId').val(),
                    minNgayTraLaiFilter: _chitietHangHoaDichVuTab.find('#MinNgayTraLaiFilterId').val(),
                    maxNgayTraLaiFilter: _chitietHangHoaDichVuTab.find('#MaxNgayTraLaiFilterId').val(),
                    minSoLuongTraLaiFilter: _chitietHangHoaDichVuTab.find('#MinSoLuongTraLaiFilterId').val(),
                    maxSoLuongTraLaiFilter: _chitietHangHoaDichVuTab.find('#MaxSoLuongTraLaiFilterId').val(),
                    minTienDaSuDungFilter: _chitietHangHoaDichVuTab.find('#MinTienDaSuDungFilterId').val(),
                    maxTienDaSuDungFilter: _chitietHangHoaDichVuTab.find('#MaxTienDaSuDungFilterId').val(),
                    traLaiHHDVFilter: _chitietHangHoaDichVuTab.find('#TraLaiHHDVFilterId').val(),
                    iD_SanPhamChinhFilter: _chitietHangHoaDichVuTab.find('#ID_SanPhamChinhFilterId').val(),
                    laTangKemFilter: _chitietHangHoaDichVuTab.find('#LaTangKemFilterId').val(),
                    minSoLuongDaSuDungFilter: _chitietHangHoaDichVuTab.find('#MinSoLuongDaSuDungFilterId').val(),
                    maxSoLuongDaSuDungFilter: _chitietHangHoaDichVuTab.find('#MaxSoLuongDaSuDungFilterId').val(),
                    dM_HangHoaTenHangHoaFilter: _chitietHangHoaDichVuTab.find('#DM_HangHoaTenHangHoaFilterId').val()
                };
            }
        },
        select: {
            style: 'single'
        },
        columnDefs: [
            {
                width: 20,
                targets: 0,
                data: null,
                orderable: false,
                defaultContent: '',
                rowAction: [
                    {
                        visible: function () {
                            return _permissions.delete;
                        },
                        element: $('<button class="btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--remove" title="' + app.localize('Delete') + '"><i class="la la-remove"></i></button>')
                            .click(function () {
                                var data = $(this).data();

                                _theKhachHangChiTietsService.delete({ id: data.theKhachHangChiTiet.id });
                                chiTietDichVuTable.ajax.reload();
                                abp.notify.info(app.localize('DeleteSuccessfully'));
                            }
                            )
                    }
                ]
            },
            {
                width: 120,
                targets: 0,
                data: null,
                orderable: false,
                autoWidth: false,
                defaultContent: '',
                rowAction: {
                    cssClass: 'btn btn-brand dropdown-toggle',
                    text: '<i class="fa fa-cog"></i> ' + app.localize('Actions') + ' <span class="caret"></span>',
                    items: [
                        {
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deleteTheKhachHangChiTiet(data.record.theKhachHangChiTiet);
                            }
                        }]
                }
            },
            {
                targets: 1,
                data: "dM_HangHoaTenHangHoa"
            },
            {
                targets: 2,
                data: "theKhachHangChiTiet.donGia",
                render: function (data) {
                    return '<span class="numeric-cell">' + $.number(data, 0) + '</span>';
                }
            },
            {
                targets: 3,
                data: "theKhachHangChiTiet.soLuong"
            },
            {
                targets: 4,
                data: "theKhachHangChiTiet.soLuongTang"
            },
            {
                targets: 5,
                data: null,
                render: function (data) {

                    return parseInt(data.theKhachHangChiTiet.soLuong != null ? data.theKhachHangChiTiet.soLuong : "0") + parseInt(data.theKhachHangChiTiet.soLuongTang != null ? data.theKhachHangChiTiet.soLuongTang : "0") - parseInt(data.theKhachHangChiTiet.soLuongDaSuDung != null ? data.theKhachHangChiTiet.soLuongDaSuDung : "0");
                }
            },
            {
                targets: 6,
                data: "theKhachHangChiTiet.tienDaSuDung",
                render: function (data) {
                    return '<span class="numeric-cell">' + $.number(data, 0) + '</span>';
                }
            },


            {
                targets: 7,
                data: "theKhachHangChiTiet.soLuongDaSuDung",
                render: function (data) {
                    return '<span class="numeric-cell">' + $.number(data, 0) + '</span>';
                }
            },

            {
                targets: 8,
                data: "theKhachHangChiTiet.ptChietKhau",
                render: function (data) {
                    return '<span class="numeric-cell">' + $.number(data, 0) + '</span>';
                }
            },
            {
                targets: 9,
                data: "theKhachHangChiTiet.tienChietKhau",
                render: function (data) {
                    return '<span class="numeric-cell">' + $.number(data, 0) + '</span>';
                }
            },
            {
                targets: 10,
                data: "theKhachHangChiTiet.ngayTraLai",
                render: function (ngayTraLai) {
                    if (ngayTraLai) {
                        return moment(ngayTraLai).format('L');
                    }
                    return "";
                }

            },
            {
                targets: 11,
                data: "theKhachHangChiTiet.soLuongTraLai"
            },
            {
                targets: 12,
                data: "theKhachHangChiTiet.thanhToan",
                render: function (data) {
                    return '<span class="numeric-cell">' + $.number(data, 0) + '</span>';
                }
            },
            {
                targets: 13,
                data: "theKhachHangChiTiet.ghiChu"
            }
        ]
    });
    //_$chiTietDichVuForm.find("input[name=laTangKem]").attr("disabled", "disabled");
    function ClearForm() {

    }
    chiTietDichVuTable
        .on('select', function (e, dt, type, indexes) {

            var count = chiTietDichVuTable.rows({ selected: true }).count();

            if (count > 0) {
                var data = chiTietDichVuTable.rows({ selected: true }).data()[0];
                renderDetailForm(data);


                if (data.theKhachHangChiTiet.laTangKem) {
                    $('input[name=soLuongTang]').attr("disabled", "disabled");
                    $('input[name=soLuongTang]').attr("disabled", "disabled");
                    $('input[name=thanhToan]').attr("disabled", "disabled");
                    $('input[name=tienChietKhau]').attr("disabled", "disabled");
                    $('input[name=pTChietKhau]').attr("disabled", "disabled");
                }
                else {
                    $('input[name=soLuongTang]').removeAttr("disabled");
                    $('input[name=soLuongTang]').removeAttr("disabled");
                    $('input[name=thanhToan]').removeAttr("disabled");
                    $('input[name=tienChietKhau]').removeAttr("disabled");
                    $('input[name=pTChietKhau]').removeAttr("disabled");
                }
                $('#AddNewDichVuButton').hide();
                $('.save-dichvu-button').show();
                //if (!data.theKhachHangChiTiet.traLaiHHDV && _modalManager.getModal().find('input[name=id]').val() != "" && data.theKhachHangChiTiet.laTangKem == false) {
                //    $('.traLai-dichvu-button').show();
                //}
                //else {
                //    $('.traLai-dichvu-button').hide();
                //}
                $('.save-dichvu-button').removeAttr("disabled");
            }


            return null;
        });
    function clearDetailForm() {
        _$chiTietDichVuForm[0].reset();
        _$chiTietDichVuForm.find('input[name=id]').val('');
        $('input[name=soLuongTang]').val(0).removeAttr("disabled");
        $('input[name=soLuongTang]').val(0).removeAttr("disabled");
        $('input[name=thanhToan]').val(0).removeAttr("disabled");
        $('input[name=tienChietKhau]').val(0).removeAttr("disabled");
        $('input[name=pTChietKhau]').val(0).removeAttr("disabled");
    }
    $('input[name=laTangKem]').change(function () {
        if ($(this).prop('checked') == true) {
            $('input[name=soLuongTang]').val(0);
            $('input[name=thanhToan]').val(0);
            $('input[name=tienChietKhau]').val(0);
            $('input[name=ptChietKhau]').val(0);
            $('input[name=soLuongTang]').val(0).attr("disabled", "disabled");
            $('input[name=thanhToan]').val(0).attr("disabled", "disabled");
            $('input[name=tienChietKhau]').val(0).attr("disabled", "disabled");
            $('input[name=ptChietKhau]').val(0).attr("disabled", "disabled");
        }

    });

    $('.save-dichvu-button').click(function () {
        var dichVuChiTiet = _$chiTietDichVuForm.serializeFormToObject();
        var theKhachHang = _$thongTinTheLanForm.serializeFormToObject();

        if (dichVuChiTiet.iD_HangHoa == "" || dichVuChiTiet.id == undefined) {
            return;
        }
        if (dichVuChiTiet.soLuong == "0" || dichVuChiTiet.soLuong == "" || dichVuChiTiet.soLuong == undefined) {
            return;
        }
        $.extend(true, dichVuChiTiet, { iD_TheKhachHang: theKhachHang.id == "" ? theKhachHang.tempId : theKhachHang.id });
        _theKhachHangChiTietsService.createOrEdit(
            dichVuChiTiet
        ).done(function () {
            abp.notify.info(app.localize('SavedSuccessfully'));
            //abp.event.trigger('app.createOrEditTheKhachHangChiTietModalSaved');

            var voucherId = _$thongTinTheLanForm.find("input[name=voucherId]").val();
            clearDetailForm();
            var voucherValue = theKhachHang.voucherValue;
            var thanhTien = dichVuChiTiet.donGia * dichVuChiTiet.soLuong;
            if (voucherValue > thanhTien) {
                voucherValue = voucherValue - thanhTien;
            }
            _$thongTinTheLanForm.find('input[name=voucherValue]').val(voucherValue);

            getChiTietDichVus();
        })
    });

    $('.traLai-dichvu-button').click(function () {

        //var thanhTien = calcThanhTien();
        var daSuDung = parseFloat(_$chiTietDichVuForm.find('input[name=soLuongDaSuDung]').val());
        var donGia = parseFloat(_$chiTietDichVuForm.find('input[name=donGia]').val());
        var soLuong = parseFloat(_$chiTietDichVuForm.find('input[name=soLuong]').val());
        var soLuongTang = parseFloat(_$chiTietDichVuForm.find('input[name=soLuongTang]').val());
        var traLai = soLuong + soLuongTang - daSuDung;

        //var ptChietKhau = parseFloat(_$chiTietDichVuForm.find('input[name=pTChietKhau]').val())
        //var thanhToan = donGia * daSuDung * (100 - ptChietKhau) / 100;
        //var thanhTien = donGia * daSuDung;
        //var tienChietKhau = thanhTien * ptChietKhau / 100;
        //_$chiTietDichVuForm.find('input[name=tienChietKhau]').val(tienChietKhau);
        _$chiTietDichVuForm.find('input[name=soLuongTraLai]').val(traLai);
        //_$chiTietDichVuForm.find('input[name=thanhTien]').val(thanhTien);
        //_$chiTietDichVuForm.find('input[name=thanhToan]').val(thanhToan);
        _$chiTietDichVuForm.find('input[name=traLaiHHDV]').val(true);
        //$('.traLai-dichvu-button').hide();
        //_$chiTietDichVuForm.find('input[name=pTChietKhau]').attr("disabled", true);
        //_$chiTietDichVuForm.find('input[name=tienChietKhau]').attr("disabled", true);
    });
    $('.reset-button').click(function () {
        var data = $('#ChiTietDichVuTable').DataTable().rows({ selected: true }).data()[0];
        renderDetailForm(data);
        //if (!data.theKhachHangChiTiet.traLaiHHDV) {
        //    $('.traLai-dichvu-button').show()
        //}
        //$('.cancel-button').hide();
    });
    $('.cancel-button').click(function () {
        clearDetailForm();
    });

    function renderDetailForm(data) {

        if (data == null) {
            return;
        }
        clearDetailForm();

        //if (!data.theKhachHangChiTiet.traLaiHHDV && _modalManager.getModal().find('input[name=id]').val() != "" && data.theKhachHangChiTiet.laTangKem == false) {
        //    $('.traLai-dichvu-button').show();
        //}
        //else {
        //    $('.traLai-dichvu-button').hide();
        //}
        _$chiTietDichVuForm.find('input[name=id]').val(data.theKhachHangChiTiet.id);
        _$chiTietDichVuForm.find('input[name=dM_HangHoaTenHangHoa]').val(data.dM_HangHoaTenHangHoa);
        _$chiTietDichVuForm.find('input[name=iD_HangHoa]').val(data.theKhachHangChiTiet.iD_HangHoa);
        _$chiTietDichVuForm.find('input[name=soLuong]').val(data.theKhachHangChiTiet.soLuong);
        _$chiTietDichVuForm.find('input[name=donGia]').val(data.theKhachHangChiTiet.donGia);
        _$chiTietDichVuForm.find('input[name=pTChietKhau]').val(data.theKhachHangChiTiet.ptChietKhau);
        _$chiTietDichVuForm.find('input[name=tienChietKhau]').val(data.theKhachHangChiTiet.tienChietKhau);
        _$chiTietDichVuForm.find('input[name=thanhToan]').val(data.theKhachHangChiTiet.thanhToan);
        _$chiTietDichVuForm.find('input[name=soLuongTang]').val(data.theKhachHangChiTiet.soLuongTang);
        _$chiTietDichVuForm.find('input[name=tienDaSuDung]').val(data.theKhachHangChiTiet.tienDaSuDung);
        _$chiTietDichVuForm.find('input[name=soLuongDaSuDung]').val(data.theKhachHangChiTiet.soLuongDaSuDung);
        _$chiTietDichVuForm.find('input[name=traLaiHHDV]').val(data.theKhachHangChiTiet.traLaiHHDV);
        _$chiTietDichVuForm.find('input[name=ngayTraLai]').val(data.theKhachHangChiTiet.ngayTraLai);
        _$chiTietDichVuForm.find('input[name=soLuongTraLai]').val(data.theKhachHangChiTiet.soLuongTraLai);
        _$chiTietDichVuForm.find('input[name=ghiChu]').val(data.theKhachHangChiTiet.ghiChu);
        _$chiTietDichVuForm.find('input[name=laTangKem]').prop("checked", data.theKhachHangChiTiet.laTangKem);
        $('.cancel-button').show();
        return true;

    }

    function getChiTietDichVus() {
        chiTietDichVuTable.ajax.reload();
    }

    function deleteTheKhachHangChiTiet(theKhachHangChiTiet) {
        abp.message.confirm(
            '',
            function (isConfirmed) {
                if (isConfirmed) {
                    _theKhachHangChiTietsService.delete({
                        id: theKhachHangChiTiet.id
                    }).done(function () {
                        getTheKhachHangChiTiets(true);
                        abp.notify.success(app.localize('SuccessfullyDeleted'));
                    });
                }
            }
        );
    }



    _chitietHangHoaDichVuTab.find('#CreateNewTheKhachHangChiTietButton').click(function () {
        _createOrEditModal.open();
    });

    $('#ExportToExcelButton').click(function () {
        _theKhachHangChiTietsService
            .getTheKhachHangChiTietsToExcel({
                filter: $('#TheKhachHangChiTietsTableFilter').val(),
                minSoLuongFilter: $('#MinSoLuongFilterId').val(),
                maxSoLuongFilter: $('#MaxSoLuongFilterId').val(),
                minDonGiaFilter: $('#MinDonGiaFilterId').val(),
                maxDonGiaFilter: $('#MaxDonGiaFilterId').val(),
                minPTChietKhauFilter: $('#MinPTChietKhauFilterId').val(),
                maxPTChietKhauFilter: $('#MaxPTChietKhauFilterId').val(),
                minTienChietKhauFilter: $('#MinTienChietKhauFilterId').val(),
                maxTienChietKhauFilter: $('#MaxTienChietKhauFilterId').val(),
                minThanhToanFilter: $('#MinThanhToanFilterId').val(),
                maxThanhToanFilter: $('#MaxThanhToanFilterId').val(),
                ghiChuFilter: $('#GhiChuFilterId').val(),
                minSoLuongTangFilter: $('#MinSoLuongTangFilterId').val(),
                maxSoLuongTangFilter: $('#MaxSoLuongTangFilterId').val(),
                minNgayTraLaiFilter: $('#MinNgayTraLaiFilterId').val(),
                maxNgayTraLaiFilter: $('#MaxNgayTraLaiFilterId').val(),
                minSoLuongTraLaiFilter: $('#MinSoLuongTraLaiFilterId').val(),
                maxSoLuongTraLaiFilter: $('#MaxSoLuongTraLaiFilterId').val(),
                minTienDaSuDungFilter: $('#MinTienDaSuDungFilterId').val(),
                maxTienDaSuDungFilter: $('#MaxTienDaSuDungFilterId').val(),
                traLaiHHDVFilter: $('#TraLaiHHDVFilterId').val(),
                iD_SanPhamChinhFilter: $('#ID_SanPhamChinhFilterId').val(),
                laTangKemFilter: $('#LaTangKemFilterId').val(),
                minSoLuongDaSuDungFilter: $('#MinSoLuongDaSuDungFilterId').val(),
                maxSoLuongDaSuDungFilter: $('#MaxSoLuongDaSuDungFilterId').val(),
                theKhachHangMaTheFilter: $('#TheKhachHangMaTheFilterId').val(),
                dM_HangHoaTenHangHoaFilter: $('#DM_HangHoaTenHangHoaFilterId').val()
            })
            .done(function (result) {
                app.downloadTempFile(result);
            });
    });

    abp.event.on('app.createOrEditTheKhachHangChiTietModalSaved', function () {
        getTheKhachHangChiTiets();
    });

    _chitietHangHoaDichVuTab.find('#GetTheKhachHangChiTietsButton').click(function (e) {
        e.preventDefault();
        getTheKhachHangChiTiets();
    });

    return true;
};
(function ($) {
    app.modals.CreateOrEditTheLanModal = function () {

        var _theKhachHangsService = abp.services.app.theKhachHangs;
        var _theKhachHangChiTietsService = abp.services.app.theKhachHangChiTiets;

        var _modalManager;
        var _$theKhachHangInformationForm = null;
        var _$nhanVienTuVanForm = null;
        var _$chitietTab = null;
        var _$chiTietDichVuForm = null;
        var _$chietKhauTab = null;
        var dichVuController = null;
        var _dM_NhomTheLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/TheKhachHangs/DM_NhomTheLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/TheKhachHangs/_DM_NhomTheLookupTableModal.js',
            modalClass: 'DM_NhomTheLookupTableModal'
        }); var _dM_DoiTuongLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/Common/DM_DoiTuongLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Common/_DM_DoiTuongLookupTableModal.js',
            modalClass: 'DM_DoiTuongLookupTableModal'
        }); var _dM_TienTeLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/TheKhachHangs/DM_TienTeLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/TheKhachHangs/_DM_TienTeLookupTableModal.js',
            modalClass: 'DM_TienTeLookupTableModal'
        });
        var _userLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/Common/SaleLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Common/_SaleLookupTableModal.js',
            modalClass: 'SaleLookupTableModal'
        });
        var _organizationUnitLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/TheKhachHangs/OrganizationUnitLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/TheKhachHangs/_OrganizationUnitLookupTableModal.js',
            modalClass: 'OrganizationUnitLookupTableModal'
        }); var _dM_DacDiemKhachHangLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/TheKhachHangs/DM_DacDiemKhachHangLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/TheKhachHangs/_DM_DacDiemKhachHangLookupTableModal.js',
            modalClass: 'DM_DacDiemKhachHangLookupTableModal'
        });
        var _dM_LienHeLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/TheKhachHangs/DM_LienHeLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/TheKhachHangs/_DM_LienHeLookupTableModal.js',
            modalClass: 'DM_LienHeLookupTableModal'
        });
        var _dM_KhuyenMaiLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/TheKhachHangs/DM_KhuyenMaiLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/TheKhachHangs/_DM_KhuyenMaiLookupTableModal.js',
            modalClass: 'DM_KhuyenMaiLookupTableModal'
        });
        var _voucherLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/Common/VoucherLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Common/_VoucherLookupTableModal.js',
            modalClass: 'VoucherLookupTableModal'
        });
        var _dM_DichVuLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/Common/DM_DichVuLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Common/_DM_DichVuLookupTableModal.js',
            modalClass: 'DM_DichVuLookupTableModal',
            width: "50%"
        });
        var _theHuyLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/TheKhachHangs/GetTheHuyLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/TheKhachHangs/_TheHuyLookupTableModal.js',
            modalClass: 'TheHuyLookupTableModal'
        });

        var _thanhToanTheModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/PhieuThus/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/PhieuThus/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditPhieuThuModal',
            width: '50%'
        });

        function calcThanhTien() {
            var soLuong = parseFloat(_$chiTietDichVuForm.find('input[name=soLuong]').val());
            var soLuongTang = parseFloat(_$chiTietDichVuForm.find('input[name=soLuongTang]').val());
            var soLuongDaSuDung = parseFloat(_$chiTietDichVuForm.find('input[name=soLuongDaSuDung]').val());
            var traLaiHHDV = _$chiTietDichVuForm.find('input[name=traLaiHHDV]').val();
            
            var traLai = parseFloat(_$chiTietDichVuForm.find('input[name=soLuongTraLai]').val() == "" ? 0 : _$chiTietDichVuForm.find('input[name=soLuongTraLai]').val());
            //if (traLai > soLuong) {
            //    abp.notify.info(app.localize('SoLuongTraLaiKhongTheLonHonSoLuong'));
            //    return;
            //}
            //if (traLaiHHDV == "true") {
            //    soLuong = soLuongDaSuDung;
            //}

            var donGia = parseFloat(_$chiTietDichVuForm.find('input[name=donGia]').val());
            var thanhTien = donGia * soLuong;
            _$chiTietDichVuForm.find('input[name=thanhTien]').val(thanhTien);
            return thanhTien;
        }

        function calcThanhToan() {

            var isPercentage = _$theKhachHangInformationForm.find('input[name=isPercentage]').val();

            var laHangTang = _$chiTietDichVuForm.find('input[name=laTangKem]').prop('checked');
            var discount = 0;
            if (_$theKhachHangInformationForm.find('input[name=voucherValue]').val() == undefined || _$theKhachHangInformationForm.find('input[name=voucherValue]').val() == "") {
                discount = 0;
            }
            else {
                discount = parseFloat(_$theKhachHangInformationForm.find('input[name=voucherValue]').val())
            }

            
            if (laHangTang == true) {
                _$chiTietDichVuForm.find('input[name=thanhToan]').val(0);
                return 0;
            }
            var thanhTien = calcThanhTien();
            var tienChietKhau = parseFloat(_$chiTietDichVuForm.find('input[name=tienChietKhau]').val());
            if (_$theKhachHangInformationForm.find('input[name=voucherValue]').val() != undefined && _$theKhachHangInformationForm.find('input[name=voucherValue]').val() != "") {
                if (isPercentage == "true") {
                    tienChietKhau += thanhTien * discount / 100;
                }
                else {
                    if (discount >= thanhTien) {
                        tienChietKhau = thanhTien;
                    }
                    else if (discount + tienChietKhau >= thanhTien) {
                        tienChietKhau = thanhTien;
                    }
                    else {
                        tienChietKhau = tienChietKhau + discount;
                    }
                }
            }

            var thanhToan = thanhTien - tienChietKhau
            _$chiTietDichVuForm.find('input[name=thanhToan]').val(thanhToan);
            return thanhToan;
        }
        this.init = function (modalManager) {
            _modalManager = modalManager;

            var modal = _modalManager.getModal();
            modal.find('.numeric').number(true, 0);
            modal.find('#TheKhachHangChiTiet_PTChietKhau').number(true, 2);
            //modal.find('.date-picker').datetimepicker({
            //    locale: abp.localization.currentLanguage.name,
            //    format: 'L'
            //});
            //modal.find('.date-picker').each(function () {
            //    if ($(this).val() == "01/01/0001") {
            //        $(this).data("DateTimePicker").date(new Date());
            //    }
            //})

            _$theKhachHangInformationForm = _modalManager.getModal().find('form[name=TheKhachHangInformationsForm]');
            _$nhanVienTuVanForm = _modalManager.getModal().find('form[name=NhanVienTuVanForm]');
            _$chiTietDichVuForm = _modalManager.getModal().find('form[name=ChiTietDichVuForm]');
            _$theKhachHangInformationForm.validate();
            _$nhanVienTuVanForm.validate();
            modal.find('.antikeydown').keydown(function (e) {
                if (e.which === 13) {
                    e.stopPropagation();
                }
            });
            _$chitietTab = _$chitietTab == null ? ChiTietHangHoaDichVu(_modalManager) : _$chitietTab;
            _$chietKhauTab = _$chietKhauTab == null ? ChietKhauNhanVien(_modalManager) : _$chietKhauTab;
            //modal.find('#hanghoa-list').height('500').enhsplitter({
            //    vertical: true,
            //    percent: true,
            //    position: '100%',
            //    limit: 300,
            //    onDrag: function (event, splitter_container) {
            //        modal.find('#TheKhachHangChiTietsTable').DataTable().columns.adjust()
            //            .responsive.recalc();
            //    }
            //});
        };

        this.shown = function (modal) {
            
            modal.find('#TheKhachHangChiTietsTable').DataTable().columns.adjust().responsive.recalc();
        };
        $('#TheKhachHang_NgayApDung').datetimepicker({
            format: 'L',
            locale: abp.localization.currentLanguage.name
        });
        $('#TheKhachHang_NgayHetHan').datetimepicker({
            format: 'L',
            locale: abp.localization.currentLanguage.name
        });
        $('#TheKhachHang_NgayMua').datetimepicker({
            format: 'L',
            locale: abp.localization.currentLanguage.name
        }).on('dp.change', function (e) {
            
            var ngayMua = $(this).data('DateTimePicker').date();
            $('#TheKhachHang_NgayApDung').data('DateTimePicker').date(ngayMua);
            ngayMua = new Date(ngayMua);
            ngayMua.setFullYear(ngayMua.getFullYear() + 1);
            $('#TheKhachHang_NgayHetHan').data('DateTimePicker').date(ngayMua);
        })

        $('#OpenDM_NhomTheLookupTableButton').click(function () {

            var theKhachHang = _$theKhachHangInformationForm.serializeFormToObject();

            _dM_NhomTheLookupTableModal.open({ id: theKhachHang.iD_NhomThe, displayName: theKhachHang.dM_NhomTheTenNhomThe }, function (data) {
                _$theKhachHangInformationForm.find('input[name=dM_NhomTheTenNhomThe]').val(data.displayName);
                _$theKhachHangInformationForm.find('input[name=iD_NhomThe]').val(data.id);
            });
        });

        $('#ClearDM_NhomTheTenNhomTheButton').click(function () {
            _$theKhachHangInformationForm.find('input[name=dM_NhomTheTenNhomThe]').val('');
            _$theKhachHangInformationForm.find('input[name=iD_NhomThe]').val('');
        });

        $('#OpenDM_DoiTuongLookupTableButton').click(function () {

            var theKhachHang = _$theKhachHangInformationForm.serializeFormToObject();

            _dM_DoiTuongLookupTableModal.open({ id: theKhachHang.iD_KhachHang, displayName: theKhachHang.dM_DoiTuongTenDoiTuong }, function (data) {
                _$theKhachHangInformationForm.find('input[name=dM_DoiTuongTenDoiTuong]').val(data.displayName);
                _$theKhachHangInformationForm.find('input[name=iD_KhachHang]').val(data.id);
                _$theKhachHangInformationForm.find('input[name=dienThoai]').val(data.phone);
                _$theKhachHangInformationForm.find('input[name=diaChi]').val(data.address)
            });
        });

        $('#ClearDM_DoiTuongTenDoiTuongButton').click(function () {
            _$theKhachHangInformationForm.find('input[name=dM_DoiTuongTenDoiTuong]').val('');
            _$theKhachHangInformationForm.find('input[name=iD_KhachHang]').val('');
            _$theKhachHangInformationForm.find('input[name=dienThoai]').val();
            _$theKhachHangInformationForm.find('input[name=diaChi]').val()
        });

        $('#OpenUserLookupTableButton').click(function () {

            var theKhachHang = _$theKhachHangInformationForm.serializeFormToObject();

            _userLookupTableModal.open({ id: theKhachHang.iD_NhanVienLap, displayName: theKhachHang.userName }, function (data) {
                _$theKhachHangInformationForm.find('input[name=userName]').val(data.tenNhanVien);
                _$theKhachHangInformationForm.find('input[name=iD_NhanVienLap]').val(data.id);
            });
        });

        $('#ClearUserNameButton').click(function () {
            _$theKhachHangInformationForm.find('input[name=userName]').val('');
            _$theKhachHangInformationForm.find('input[name=iD_NhanVienLap]').val('');
        });

        $('#OpenOrganizationUnitLookupTableButton').click(function () {

            var theKhachHang = _$theKhachHangInformationForm.serializeFormToObject();

            _organizationUnitLookupTableModal.open({ id: theKhachHang.iD_DonVi, displayName: theKhachHang.organizationUnitDisplayName }, function (data) {
                _$theKhachHangInformationForm.find('input[name=organizationUnitDisplayName]').val(data.displayName);
                _$theKhachHangInformationForm.find('input[name=iD_DonVi]').val(data.id);
            });
        });

        $('#ClearOrganizationUnitDisplayNameButton').click(function () {
            _$theKhachHangInformationForm.find('input[name=organizationUnitDisplayName]').val('');
            _$theKhachHangInformationForm.find('input[name=iD_DonVi]').val('');
        });

        $('#OpenDonViThuHuongLookupTableButton').click(function () {

            var theKhachHang = _$theKhachHangInformationForm.serializeFormToObject();

            _organizationUnitLookupTableModal.open({ id: theKhachHang.iD_DonViThuHuong, displayName: theKhachHang.donViThuHuongDisplayName }, function (data) {
                _$theKhachHangInformationForm.find('input[name=donViThuHuongDisplayName]').val(data.displayName);
                _$theKhachHangInformationForm.find('input[name=iD_DonViThuHuong]').val(data.id);
            });
        });

        $('#ClearDonViThuHuongDisplayNameButton').click(function () {
            _$theKhachHangInformationForm.find('input[name=donViThuHuongDisplayName]').val('');
            _$theKhachHangInformationForm.find('input[name=iD_DonViThuHuong]').val('');
        });

        $('#OpenDonViThucHienLookupTableButton').click(function () {

            var theKhachHang = _$theKhachHangInformationForm.serializeFormToObject();
            
            _organizationUnitLookupTableModal.open({ id: theKhachHang.iD_DonViThucHien, displayName: theKhachHang.donViThucHienDisplayName }, function (data) {
                _$theKhachHangInformationForm.find('input[name=donViThucHienDisplayName]').val(data.displayName);
                _$theKhachHangInformationForm.find('input[name=iD_DonViThucHien]').val(data.id);
            });
        });

        $('#ClearDonViThucHienDisplayNameButton').click(function () {
            _$theKhachHangInformationForm.find('input[name=donViThucHienDisplayName]').val('');
            _$theKhachHangInformationForm.find('input[name=iD_DonViThucHien]').val('');
        });
        $('#OpenDM_DacDiemKhachHangLookupTableButton').click(function () {

            var theKhachHang = _$theKhachHangInformationForm.serializeFormToObject();

            _dM_DacDiemKhachHangLookupTableModal.open({ id: theKhachHang.iD_DacDiemKhachHang, displayName: theKhachHang.dM_DacDiemKhachHangTenDacDiem }, function (data) {
                _$theKhachHangInformationForm.find('input[name=dM_DacDiemKhachHangTenDacDiem]').val(data.displayName);
                _$theKhachHangInformationForm.find('input[name=iD_DacDiemKhachHang]').val(data.id);
            });
        });

        $('#ClearDM_DacDiemKhachHangTenDacDiemButton').click(function () {
            _$theKhachHangInformationForm.find('input[name=dM_DacDiemKhachHangTenDacDiem]').val('');
            _$theKhachHangInformationForm.find('input[name=iD_DacDiemKhachHang]').val('');
        });
        $('#OpenTheHuyLookupTableButton').click(function () {

            var theKhachHang = _$theKhachHangInformationForm.serializeFormToObject();

            _theHuyLookupTableModal.open({ id: theKhachHang.iD_TheCu, displayName: theKhachHang.theCuMaThe }, function (data) {
                _$theKhachHangInformationForm.find('input[name=theHuyMaThe]').val(data.maThe);
                _$theKhachHangInformationForm.find('input[name=iD_TheCu]').val(data.id);
            });
        });

        $('#ClearTheHuyButton').click(function () {
            _$theKhachHangInformationForm.find('input[name=theHuyMaThe]').val('');
            _$theKhachHangInformationForm.find('input[name=iD_TheCu]').val('');
        });



        $('#OpenDM_KhuyenMaiLookupTableButton').click(function () {

            var theKhachHang = _$theKhachHangInformationForm.serializeFormToObject();

            _dM_KhuyenMaiLookupTableModal.open({}, function (data) {
                
                _$theKhachHangInformationForm.find('input[name=dM_KhuyenMaiTenKhuyenMai]').val(data.displayName);
                _$theKhachHangInformationForm.find('#DM_KhuyenMai_ID_KhuyenMai').val(data.id);
                //_$theKhachHangInformationForm.find('input[name=maVoucher]').val(data.voucher.voucherCode);
                //_$theKhachHangInformationForm.find('input[name=voucherId]').val(data.voucher.id);
                //_$theKhachHangInformationForm.find('input[name=voucherValue]').val(data.voucher.voucherValue);
                _$theKhachHangInformationForm.find('input[name=isPercentage]').val(data.isPercentage);
            });
        });

        $('#ClearDM_KhuyenMaiButton').click(function () {
            _$theKhachHangInformationForm.find('input[name=dM_KhuyenMaiTenKhuyenMai]').val('');
            _$theKhachHangInformationForm.find('#DM_KhuyenMai_ID_KhuyenMai').val('');
            //_$theKhachHangInformationForm.find('input[name=maVoucher]').val('');
            //_$theKhachHangInformationForm.find('input[name=voucherId]').val('');
            _$theKhachHangInformationForm.find('input[name=isPercentage]').val('');
        });
        $('#OpenVoucherLookupTableButton').click(function () {

            var theKhachHang = _$theKhachHangInformationForm.serializeFormToObject();

            _voucherLookupTableModal.open({ khuyenMaiId: _$theKhachHangInformationForm.find('#DM_KhuyenMai_ID_KhuyenMai').val() }, function (data) {
                _$theKhachHangInformationForm.find('input[name=maVoucher]').val(data.voucher.voucherCode);
                _$theKhachHangInformationForm.find('input[name=voucherId]').val(data.voucher.id);
                _$theKhachHangInformationForm.find('input[name=voucherValue]').val(data.voucher.voucherValue);
            });
        });

        $('#ClearVoucherButton').click(function () {
            _$theKhachHangInformationForm.find('input[name=maVoucher]').val('');
            _$theKhachHangInformationForm.find('input[name=voucherId]').val('');
            _$theKhachHangInformationForm.find('input[name=voucherValue]').val('');
        });


        $('#OpenDM_HangHoaLookupTableButton').click(function () {
            //var theKhachHang = _$theKhachHangInformationForm.serializeFormToObject();
            _dM_DichVuLookupTableModal.open({ id: null, displayName: null }, function (data) {
                $('input[name=dM_HangHoaTenHangHoa]').val(data.displayName);
                $('input[name=iD_HangHoa]').val(data.id);
                $('input[name=donGia]').val(data.donGia);
                $('input[name=soLuong]').val(1);
                $('input[name=soLuongTang]').val(0);
                $('input[name=soLuongDaSuDung]').val(0);
                $('input[name=tienDaSuDung]').val(0);
                $('input[name=pTChietKhau]').val(0);
                $('input[name=soLuongTraLai]').val(0);
                $('input[name=donGia]').trigger("change");
            });


        });

        $('#ClearDM_HangHoaTenHangHoaButton').click(function () {
            $('input[name=dM_HangHoaTenHangHoa]').val('');
            $('input[name=iD_HangHoa]').val('');
            $('input[name=donGia]').val('');
            $('input[name=soLuong]').val(0);
            $('input[name=donGia]').trigger("change");
        });

        //$('#TheKhachHang_DiscountFromVoucher').change(function () {
        //    var thanhTien = calcThanhTien();
        //    var discount = 0;
        //    if (_$theKhachHangInformationForm.find('input[name=discountFromVoucher]').val() == undefined || _$theKhachHangInformationForm.find('input[name=discountFromVoucher]').val() == "") {
        //        discount = 0;
        //    }
        //    else {
        //        discount = parseFloat(_$theKhachHangInformationForm.find('input[name=discountFromVoucher]').val())
        //    }
        //    if (discount > thanhTien) {
        //        abp.notify.warn(app.localize('TienChietKhauKhongTheLonHonThanhTien'));
        //    }
        //    var ptChietKhau = parseFloat(_$chiTietDichVuForm.find('input[name=pTChietKhau]').val());
        //    var tienChietKhau = (thanhTien - discount) * ptChietKhau / 100;
        //    _$chiTietDichVuForm.find('input[name=tienChietKhau]').val(tienChietKhau);
        //    calcThanhToan();
        //});

        $('#TheKhachHangChiTiet_DonGia').change(function () {
            var thanhTien = calcThanhTien();
            var discount = 0;
            if (_$theKhachHangInformationForm.find('input[name=voucherValue]').val() == undefined || _$theKhachHangInformationForm.find('input[name=voucherValue]').val() == "") {
                discount = 0;
            }
            else {
                discount = parseFloat(_$theKhachHangInformationForm.find('input[name=voucherValue]').val())
            }
            if (discount > thanhTien) {
                abp.notify.warn(app.localize('TienChietKhauKhongTheLonHonThanhTien'));
            }
            var ptChietKhau = parseFloat(_$chiTietDichVuForm.find('input[name=pTChietKhau]').val());
            var tienChietKhau = thanhTien * ptChietKhau / 100;
            _$chiTietDichVuForm.find('input[name=tienChietKhau]').val(tienChietKhau);
            calcThanhToan();
        });

        $('#TheKhachHangChiTiet_SoLuong').change(function () {

            var thanhTien = calcThanhTien();
            var discount = 0;
            if (_$theKhachHangInformationForm.find('input[name=voucherValue]').val() == undefined || _$theKhachHangInformationForm.find('input[name=voucherValue]').val() == "") {
                discount = 0;
            }
            else {
                discount = parseFloat(_$theKhachHangInformationForm.find('input[name=voucherValue]').val())
            }
            //if (discount > thanhTien) {
            //    abp.notify.warn(app.localize('TienChietKhauKhongTheLonHonThanhTien'));
            //}
            var ptChietKhau = parseFloat(_$chiTietDichVuForm.find('input[name=pTChietKhau]').val());
            var tienChietKhau = thanhTien * ptChietKhau / 100;
            _$chiTietDichVuForm.find('input[name=tienChietKhau]').val(tienChietKhau);
            calcThanhToan();
        });

        $('#TheKhachHangChiTiet_PTChietKhau').change(function () {
            var thanhTien = calcThanhTien();
            var isPercentage = _$theKhachHangInformationForm.find('input[name=isPercentage]').val();
            var discount = 0;
            if (_$theKhachHangInformationForm.find('input[name=voucherValue]').val() == undefined || _$theKhachHangInformationForm.find('input[name=voucherValue]').val() == "") {
                discount = 0;
            }
            else {
                discount = parseFloat(_$theKhachHangInformationForm.find('input[name=voucherValue]').val())
            }
            //if (discount > thanhTien) {
            //    abp.notify.warn(app.localize('TienChietKhauKhongTheLonHonThanhTien'));
            //}
            var ptChietKhau = parseFloat(_$chiTietDichVuForm.find('input[name=pTChietKhau]').val());
            var tienChietKhau = 0;
            if (isPercentage == "true") {
                tienChietKhau = thanhTien * (100 - discount) / 100 * ptChietKhau / 100;
            }
            else {
                tienChietKhau = (thanhTien - discount) * ptChietKhau / 100;
            }

            _$chiTietDichVuForm.find('input[name=tienChietKhau]').val(tienChietKhau);
            calcThanhToan();
        });
        $('#TheKhachHangChiTiet_TienChietKhau').change(function () {
            var thanhTien = calcThanhTien();
            var isPercentage = _$theKhachHangInformationForm.find('input[name=isPercentage]').val();
            var discount = 0;
            if (_$theKhachHangInformationForm.find('input[name=voucherValue]').val() == undefined || _$theKhachHangInformationForm.find('input[name=voucherValue]').val() == "") {
                discount = 0;
            }
            else {
                discount = parseFloat(_$theKhachHangInformationForm.find('input[name=voucherValue]').val())
            }
            if (discount > thanhTien) {
                abp.notify.warn(app.localize('TienChietKhauKhongTheLonHonThanhTien'));
            }
            var tienChietKhau = parseFloat(_$chiTietDichVuForm.find('input[name=tienChietKhau]').val());
            if (isPercentage == "true") {
                thanhTien = thanhTien * (100 - discount) / 100;
            }
            else {
                thanhTien = thanhTien - discount;
            }
            var ptChietKhau = tienChietKhau / thanhTien * 100;
            _$chiTietDichVuForm.find('input[name=pTChietKhau]').val(ptChietKhau);
            calcThanhToan();
        });
        $('#TheKhachHangChiTiet_SoLuong_TraLai').change(function () {
            var thanhTien = calcThanhTien();
            var discount = 0;
            if (_$theKhachHangInformationForm.find('input[name=voucherValue]').val() == undefined || _$theKhachHangInformationForm.find('input[name=voucherValue]').val() == "") {
                discount = 0;
            }
            else {
                discount = parseFloat(_$theKhachHangInformationForm.find('input[name=voucherValue]').val())
            }
            if (discount > thanhTien) {
                abp.notify.warn(app.localize('TienChietKhauKhongTheLonHonThanhTien'));
            }
            var ptChietKhau = parseFloat(_$chiTietDichVuForm.find('input[name=pTChietKhau]').val());
            var tienChietKhau = (thanhTien) * ptChietKhau / 100;
            _$chiTietDichVuForm.find('input[name=tienChietKhau]').val(tienChietKhau);
            calcThanhToan();
        })
        $('#TheKhachHangChiTiet_ThanhToan').change(function () {
            var thanhTien = calcThanhTien();

            var thanhToan = parseFloat(_$chiTietDichVuForm.find('input[name=thanhToan]').val());
            var discount = 0;
            if (_$theKhachHangInformationForm.find('input[name=voucherValue]').val() == undefined || _$theKhachHangInformationForm.find('input[name=voucherValue]').val() == "") {
                discount = 0;
            }
            else {
                discount = parseFloat(_$theKhachHangInformationForm.find('input[name=voucherValue]').val())
            }
            if (discount > thanhTien) {
                abp.notify.warn(app.localize('TienChietKhauKhongTheLonHonThanhTien'));
            }
            var ptChietKhau = (thanhTien - thanhToan) / thanhTien * 100;
            var tienChietKhau = thanhTien - thanhToan;
            _$chiTietDichVuForm.find('input[name=pTChietKhau]').val(ptChietKhau);
            _$chiTietDichVuForm.find('input[name=tienChietKhau]').val(tienChietKhau);
        })

        $('#HangHoaDichVuTabLink').click(function () {
            _$chitietTab = _$chitietTab == null ? ChiTietHangHoaDichVu(_modalManager) : _$chitietTab;
        });
        //$('#ChietKhauNhanVienTabLink').click(function () {
        //    _$chitietTab = _$chitietTab == null ? ChiTietHangHoaDichVu(_modalManager) : _$chitietTab;
        //});
        var saveData = function (callback) {
            
            var numberOfService = $('#ChiTietDichVuTable').DataTable().rows().count();
            var employees = $('#ChietKhauNhanViensTable').DataTable().rows().data();
            var numberOfEmployee = employees.count();
            if (numberOfService == 0) {
                abp.notify.info(app.localize('BanCanChonDichVu'));
                return;
            }
            if (numberOfEmployee == 0) {
                abp.notify.info(app.localize('BanCanThemNhanVien'));
                return;
            }
            
            var hasPrimarySale = false;
            var totalPercentage = 0;
            $.each(employees, function (key, value) {
                if (value.nhanVienThucHien.laNhanVienChinh == true) {
                    hasPrimarySale = true;
                }
                totalPercentage += value.nhanVienThucHien.tienChietKhau;
            });
            if (totalPercentage != 100) {
                abp.notify.info("Tổng phần trăm chiết khấu phải bằng 100");
                return;
            }
            if (!hasPrimarySale) {
                abp.notify.info(app.localize('BanCanThemNhanVienChinh'));
                return;
            }
            if (!_$theKhachHangInformationForm.valid()) {
                return;
            }

            var theKhachHang = _$theKhachHangInformationForm.serializeFormToObject();
            _modalManager.setBusy(true);
            _theKhachHangsService.createOrEdit(
                theKhachHang
            ).done(function (data) {
                
                abp.notify.info(app.localize('SavedSuccessfully'));
                //_modalManager.close();
                
                if (callback) {
                    callback(data);
                }
                abp.event.trigger('app.createOrEditTheKhachHangModalSaved');
            }).always(function () {
                _modalManager.setBusy(false);
            });
        };
        this.close = function () {
            _modalManager.close();
        }
        function openPhieuThuModal(idThe) {
            _thanhToanTheModal.open({ idThe: idThe });
            _modalManager.close();
        }
        this.saveWithOtherAction = function () {
            saveData(openPhieuThuModal);
        }
        this.save = function () {
            saveData();
        }
        this.saveAndClose = function () {
            saveData(function () {
                _modalManager.close();
            });
        }

    };
})(jQuery);
(function () {
    $(function () {

        var _$theKhachHangsTable = $('#TheKhachHangsTable');
        var _theKhachHangsService = abp.services.app.theKhachHangs;
        var _$theKhachHangChiTietsTable = $('#TheKhachHangChiTietsTable');
        var _theKhachHangChiTietsService = abp.services.app.theKhachHangChiTiets;
        var _$nhatKySuDungThesTable = $('#NhatKySuDungThesTable');
        var _nhatKySuDungThesService = abp.services.app.nhatKySuDungThes;
        var _$theKhachHangHistorysTable = $('#LichSuChinhSuas');
        var _$lichSuThanhToansTable = $('#LichSuThanhToansTable');
        var _phieuThusService = abp.services.app.phieuThus;
        var _suDungTheService = abp.services.app.suDungThe;
        Number.prototype.pad = function (size) {
            var s = String(this);
            while (s.length < (size || 2)) { s = "0" + s; }
            return s;
        }
        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.TheKhachHangs.Create'),
            edit: abp.auth.hasPermission('Pages.TheKhachHangs.Edit'),
            'delete': abp.auth.hasPermission('Pages.TheKhachHangs.Delete'),
            'suDungThe': abp.auth.hasPermission('Pages.TheKhachHang.SuDungThe'),
            editLaterNhatKy: abp.auth.hasPermission('Pages.NhatKySuDungThes.EditLater'),
            editPhieuThu: abp.auth.hasPermission('Pages.PhieuThus.Edit'),
            deletePhieuThu: abp.auth.hasPermission('Pages.PhieuThus.Delete'),
            editLaterPhieuThu: abp.auth.hasPermission('Pages.PhieuThu.EditLater')
        };

        var _createOrEditTheLanModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/TheKhachHangs/CreateOrEditTheLanModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/TheKhachHangs/_CreateOrEditTheLanModal.js',
            modalClass: 'CreateOrEditTheLanModal',
            width: '100%'
        });

        var _createOrEditTheGiaTriModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/TheKhachHangs/CreateOrEditTheGiaTriModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/TheKhachHangs/_CreateOrEditTheGiaTriModal.js',
            modalClass: 'CreateOrEditTheGiaTriModal',
            width: '60%'
        })

        var _viewTheKhachHangModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/TheKhachHangs/ViewtheKhachHangModal',
            modalClass: 'ViewTheKhachHangModal'
        });

        var _suDungTheModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/HoaDonBanLes/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/HoaDonBanLes/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditHoaDonBanLeModal',
            width: '80%'
        });
        var _deleteNhatKySuDung = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/HoaDonBanLes/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/HoaDonBanLes/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditHoaDonBanLeModal',
            width: '80%'
        });
        var _thanhToanTheModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/PhieuThus/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/PhieuThus/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditPhieuThuModal',
            width: '50%'
        });

        // datatable
        var lstTheKhachHangTable = _$theKhachHangsTable.DataTable({
            orderCellsTop: true,
            fixedHeader: true,
            "scrollY": "200px",
            "scrollCollapse": false,
            "initComplete": function (settings, json) {
                $('.lstTheKhachHang').find('.bottom').appendTo('.custom-pagination-position')
            },
            paging: true,
            serverSide: true,
            processing: true,
            drawCallback: function (settings) {
                
                lstTheKhachHangTable.row(':eq(0)', { page: 'current' }).select();
            },
            listAction: {
                ajaxFunction: _theKhachHangsService.getAll,
                inputFilter: function () {
                    return {
                        filter: $('#TheKhachHangsTableFilter').val(),
                        isTheLan: $('.loaithe.active').attr('isTheLan'),
                        maTheFilter: $('#MaTheFilterId').val(),
                        organizationUnitDisplayNameFilter: $('#OrganizationUnitDisplayNameFilterId').val(),
                        dM_DacDiemKhachHangTenDacDiemFilter: $('#DM_DacDiemKhachHangTenDacDiemFilterId').val(),
                        dM_DoiTuongMaFilter: $('#DM_DoiTuongMaFilter').val(),
                        dM_DoiTuongPhoneFilter: $('#DM_DoiTuongPhoneFilter').val(),
                        dM_DoiTuongDiaChiFilter: $('#DM_DoiTuongDiaChiFilter').val(),
                        dM_DoiTuongCMTFilter: $('#DM_DoiTuongCMTFilter').val(),
                        dM_DoiTuongTenDoiTuongFilter: $('#DM_DoiTuongTenDoiTuongFilter').val(),
                        maVoucherFilter: $('#MaVoucherFilter').val(),
                    };
                }
            },
            columnDefs: [


                {
                    targets: 0,
                    data: "dM_DoiTuongMaDoiTuong"
                },
                {
                    targets: 1,
                    data: "dM_DoiTuongTenDoiTuong"
                },

                {
                    targets: 2,
                    data: "dM_DoiTuongPhone"
                },
                {
                    targets: 3,
                    data: "dM_DoiTuongCMT"
                },
                {
                    targets: 4,
                    data: "theKhachHang.maThe"
                },
                {
                    targets: 5,
                    data: "theKhachHang.ngayMua",
                    render: function (ngayMua) {
                        if (ngayMua) {
                            return moment(ngayMua).format('L');
                        }
                        return "";
                    }

                },
                {
                    targets: 6,
                    data: "theKhachHang.ngayHuy",
                    render: function (ngayMua) {
                        if (ngayMua) {
                            return moment(ngayMua).format('L');
                        }
                        return "";
                    }

                },
                

                //{
                //    targets: 5,
                //    data: "theKhachHang.menhGiaThe"
                //},

                {
                    targets: 7,
                    data: "seller"
                },


                {
                    targets: 8,
                    data: "organizationUnitDisplayName"
                },
            ],
            createdRow: function (row, data, dataIndex) {
                
                if (new Date(data.theKhachHang.ngayHetHan) < new Date()) {
                    $(row).addClass('expired-service');
                }
                if (data.theKhachHang.status == false) {
                    $(row).addClass('stoped-service');
                    return;
                }
                if (data.theKhachHang.huyThe == true) {
                    $(row).addClass('canceled-service');
                    return;
                }

            },
            select: {
                style: 'single'
            }
        });
        //var lstChitietTheTable = _$theKhachHangChiTietsTable.DataTable({
        //    paging: true,
        //    serverSide: true,
        //    processing: true,
        //    listAction: {
        //        ajaxFunction: _theKhachHangChiTietsService.getAll,
        //        inputFilter: function () {

        //            return {
        //                iD_TheKhachHang: getCurrentTheKhachHangId()
        //            };
        //        }
        //    },
        //    columnDefs: [
        //        {
        //            width: 20,
        //            targets: 0,
        //            data: null,
        //            orderable: false,
        //            defaultContent: '',
        //            rowAction: [
        //                {
        //                    visible: function () {
        //                        return _permissions.suDungThe;
        //                    },
        //                    element: $('<button class="btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" title="' + app.localize('SuDung') + '"><i class="la la-play"></i></button>')
        //                        .click(function () {
        //                            var data = $(this).data();
                                    
        //                            var theKhachHang = getCurrentTheKhachHang();
        //                            var ngayMua = new Date(theKhachHang.theKhachHang.ngayMua);
        //                            var ngayMuaString = ngayMua.getFullYear().toString() + ngayMua.getMonth().pad() + ngayMua.getDate().pad();
        //                            var currentDate = new Date();
        //                            var currentDateString = currentDate.getFullYear().toString() + currentDate.getMonth().pad() + currentDate.getDate().pad();
        //                            if (new Date(theKhachHang.theKhachHang.ngayHetHan) < new Date()) {
        //                                abp.notify.info(app.localize('TheDaHetHanSuDung'));
        //                                return;
        //                            }
        //                            if (data.theKhachHangChiTiet.traLaiHHDV) {
        //                                abp.notify.info(app.localize('DichVuDaTraLai'));
        //                                return;
        //                            }
        //                            //if(theKhachHang.theKhachHang.createdDate ==)
        //                            //if (theKhachHang.theKhachHang.soDu) {

        //                            //}
        //                            // todo
        //                            if (!theKhachHang.laDonViThucHien) {
        //                                abp.notify.success(app.localize('KhongPhaiDonViThucHien'));
        //                                return;
        //                            }
                                    
        //                            if (data.theKhachHangChiTiet.soLuongDaSuDung === (data.theKhachHangChiTiet.soLuong + data.theKhachHangChiTiet.soLuongTang)) {
        //                                abp.notify.info(app.localize('HetSoLanSuDung'));
        //                                return;
        //                            }
        //                            if (new Date(theKhachHang.theKhachHang.ngayApDung) > new Date()) {
        //                                abp.notify.info(app.localize('TheChuaDenThoiGianApDung'));
        //                                return;
        //                            }
        //                            debugger;
        //                            if (ngayMuaString !== currentDateString) {
        //                                if (!(data.theKhachHangChiTiet.soLuongTang>0) && !data.theKhachHangChiTiet.laSoLuongDuocTang) {
        //                                    var minPrice = data.theKhachHangChiTiet.thanhToan / data.theKhachHangChiTiet.soLuong;
        //                                    if (theKhachHang.theKhachHang.soDu < minPrice && theKhachHang.theKhachHang.phaiThanhToan > theKhachHang.theKhachHang.daThanhToan) {
        //                                        abp.notify.success(app.localize('BanCanNapTienDeSuDung'));
        //                                        return;
        //                                    }
        //                                }
        //                            }
        //                            if (isActive()) {
        //                                _suDungTheModal.open({ theId: data.theKhachHangChiTiet.iD_TheKhachHang, chiTietTheId: data.theKhachHangChiTiet.id });
        //                            }
        //                            else {
        //                                abp.notify.info(app.localize('TheCanKichHoatDeSuDung'));
        //                                return;
        //                            }
        //                        })
        //                }
        //            ]

        //        },
        //        {
        //            targets: 1,
        //            data: "dM_HangHoaTenHangHoa"
        //        },
        //        {
        //            targets: 2,
        //            data: "theKhachHangChiTiet.donGia",
        //            render: function (donGia) {
        //                return $.number(donGia, 0);
        //            }
        //        },
        //        {
        //            targets: 3,
        //            data: "theKhachHangChiTiet.laTangKem",
        //            render: function (laTangKem) {
        //                if (laTangKem) {
        //                    return '<i class="la la-check-square m--font-success" title="True"></i>';
        //                }
        //                return '<i class="la la-times-circle" title="False"></i>';
        //            }

        //        },
        //        {
        //            targets: 4,
        //            data: "theKhachHangChiTiet.soLuong",
        //            render: function (data) {
        //                return '<span class="numeric-cell">' + $.number(data, 0) + '</span>';
        //            }
        //        },
        //        {
        //            targets: 5,
        //            data: "theKhachHangChiTiet.soLuongTang",
        //            render: function (data) {
        //                return '<span class="numeric-cell">' + $.number(data, 0) + '</span>';
        //            }
        //        },

                
        //        {
        //            targets: 6,
        //            data: "theKhachHangChiTiet.soLuongDaSuDung",
        //            render: function (data) {
        //                return '<span class="numeric-cell">' + $.number(data, 0) + '</span>';
        //            }
        //        },
        //        {
        //            targets: 7,
        //            data: "theKhachHangChiTiet.ptChietKhau",
        //            render: function (data) {
        //                return '<span class="numeric-cell">' + $.number(data, 0) + '</span>';
        //            }
        //        },
        //        {
        //            targets: 8,
        //            data: "theKhachHangChiTiet.tienChietKhau",
        //            render: function (data) {
        //                return '<span class="numeric-cell">' + $.number(data, 0) + '</span>';
        //            }
        //        },
        //        {
        //            targets: 9,
        //            data: "theKhachHangChiTiet.thanhToan",
        //            render: function (data) {
        //                return '<span class="numeric-cell">' + $.number(data, 0) + '</span>';
        //            }
        //        },
        //        {
        //            targets: 10,
        //            data: "theKhachHangChiTiet.tienDaSuDung",
        //            render: function (data) {
        //                return '<span class="numeric-cell">' + $.number(data, 0) + '</span>';
        //            }
        //        },
        //        {
        //            targets: 11,
        //            data: "theKhachHangChiTiet.soLuongTraLai",
        //            render: function (data) {
        //                return '<span class="numeric-cell">' + $.number(data, 0) + '</span>';
        //            }
        //        },
        //        {
        //            targets: 12,
        //            data: "theKhachHangChiTiet.ngayTraLai",
        //            render: function (ngayTraLai) {
        //                if (ngayTraLai) {
        //                    return moment(ngayTraLai).format('L');
        //                }
        //                return "";
        //            }

        //        },
        //        {
        //            targets: 13,
        //            data: "theKhachHangChiTiet.ghiChu"
        //        },

        //    ],
        //    createdRow: function (row, data, dataIndex) {

        //        if (data.theKhachHangChiTiet.traLaiHHDV) {
        //            $(row).addClass('returned-service');
        //            return;
        //        }
        //        if (data.theKhachHangChiTiet.soLuongDaSuDung == (data.theKhachHangChiTiet.soLuong + data.theKhachHangChiTiet.soLuongTang)) {
        //            $(row).addClass('limited-service');
        //            return;
        //        }
        //    },
        //    select: {
        //        style: 'single'
        //    }
        //});

        //function updateDataTableSelectAllCtrl(table) {
        //    var $table = table.table().node();
        //    var $chkbox_all = $('tbody input[type="checkbox"]', $table);
        //    var $chkbox_checked = $('tbody input[type="checkbox"]:checked', $table);
        //    var chkbox_select_all = $('thead input[name="select_all"]', $table).get(0);

        //    // If none of the checkboxes are checked
        //    if ($chkbox_checked.length === 0) {
        //        chkbox_select_all.checked = false;
        //        if ('indeterminate' in chkbox_select_all) {
        //            chkbox_select_all.indeterminate = false;
        //        }

        //        // If all of the checkboxes are checked
        //    } else if ($chkbox_checked.length === $chkbox_all.length) {
        //        chkbox_select_all.checked = true;
        //        if ('indeterminate' in chkbox_select_all) {
        //            chkbox_select_all.indeterminate = false;
        //        }

        //        // If some of the checkboxes are checked
        //    } else {
        //        chkbox_select_all.checked = true;
        //        if ('indeterminate' in chkbox_select_all) {
        //            chkbox_select_all.indeterminate = true;
        //        }
        //    }
        //}

        //var rows_selected = [];

        //var nhatKySuDungDT = _$nhatKySuDungThesTable.DataTable({
        //    paging: true,
        //    serverSide: true,
        //    processing: true,
        //    listAction: {
        //        ajaxFunction: _nhatKySuDungThesService.getAll,
        //        inputFilter: function () {
        //            return {
        //                iD_TheKhachHang: getCurrentTheKhachHangId(),
        //            };
        //        }
        //    },
        //    //'rowCallback': function (row, data, dataIndex) {
        //    //    // Get row ID
        //    //    var rowId = data[0];

        //    //    // If row ID is in the list of selected row IDs
        //    //    if ($.inArray(rowId, rows_selected) !== -1) {
        //    //        $(row).find('input[type="checkbox"]').prop('checked', true);
        //    //        $(row).addClass('selected');
        //    //    }
        //    //},
        //    columnDefs: [
                
        //        {
        //            width: 120,
        //            targets: 0,
        //            visible: true,
        //            data: null,
        //            orderable: false,
        //            autoWidth: false,
        //            defaultContent: '',
        //            rowAction: {
        //                cssClass: 'btn btn-brand dropdown-toggle',
        //                text: '<i class="fa fa-cog"></i> ' + app.localize('Actions') + ' <span class="caret"></span>',
        //                items: [
        //                    {
        //                        text: app.localize('Edit'),
        //                        visible: function (data) {
                                    
        //                            return (_permissions.edit && ((new moment(data.record.nhatKySuDungThe.ngay)).add(1, 'days').format("YYYYMMDD") > (new moment()).format("YYYYMMDD") || ((new moment(data.record.nhatKySuDungThe.ngay)).add(1, 'days').format("YYYYMMDD") == (new moment()).format("YYYYMMDD") && (new moment()).format("HHmm") <= "1100")))
        //                                || (_permissions.editLaterNhatKy);
        //                        },
        //                        action: function (data) {
        //                            _suDungTheModal.open({ id: data.record.nhatKySuDungThe.iD_ChungTu });
        //                        }
        //                    },
        //                    {
        //                        text: app.localize('Delete'),
        //                        visible: function (data) {
        //                            return (_permissions.delete && (new moment(data.record.nhatKySuDungThe.ngay)).format("YYYYMMDD") == (new moment()).format("YYYYMMDD"))
        //                                || (_permissions.delete && _permissions.editLaterNhatKy);
        //                        },
        //                        action: function (data) {
        //                            deleteNhatKySuDung(data.record.nhatKySuDungThe);
        //                        }
        //                    }]
        //            }
        //        },
                
        //        {
        //            targets: 1,
        //            data: "orderNumber"

        //        },
        //        {
        //            targets: 2,
        //            data: "ngayLapHoaDon",
        //            render: function (ngay) {
        //                if (ngay) {
        //                    return moment(ngay).format('L');
        //                }
        //                return "";
        //            }

        //        },
        //        {
        //            targets: 3,
        //            data: "nhatKySuDungThe.ngay",
        //            render: function (ngay) {
        //                if (ngay) {
        //                    return moment(ngay).format('L');
        //                }
        //                return "";
        //            }

        //        },
                
        //        {
        //            targets: 4,
        //            data: "dM_HangHoaTenHangHoa"
        //        },
        //        {
        //            targets: 5,
        //            data: "nhatKySuDungThe.soLuong"
        //        },
        //        {
        //            targets: 6,
        //            data: "nhatKySuDungThe.soTien",
        //            render: function (data) {
        //                return '<span class="numeric-cell">' + $.number(data, 0) + '</span>';
        //            }
        //        },
        //        {
        //            targets: 7,
        //            data: "nhatKySuDungThe.laSoLuongDuocTang",
        //            render: function (laSoLuongDuocTang) {
        //                if (laSoLuongDuocTang) {
        //                    return '<i class="la la-check-square m--font-success" title="True"></i>';
        //                }
        //                return '<i class="la la-times-circle" title="False"></i>';
        //            }

        //        },
        //        {
        //            targets: 8,
        //            data: "performedOrganizationName"
        //        },
        //        {
        //            targets: 9,
        //            data: "invoiceCode"
        //        },


        //    ]
        //});
        
        //var lichSuTheDT = _$theKhachHangHistorysTable.DataTable({
        //    paging: true,
        //    serverSide: true,
        //    processing: true,
        //    listAction: {
        //        ajaxFunction: _theKhachHangsService.getAllHistory,
        //        inputFilter: function () {
        //            return {
        //                iD_TheKhachHang: getCurrentTheKhachHangId()
        //            };
        //        }
        //    },
        //    columnDefs: [
        //        {
        //            targets: 0,
        //            data: "name"
        //        },
        //        {
        //            targets: 1,
        //            data: "content"
        //        },
        //        {
        //            targets: 2,
        //            data: "ngayDate"
        //        }
        //    ]
        //});
        //var lichSuThanhToanDT = _$lichSuThanhToansTable.DataTable({
        //    paging: true,
        //    serverSide: true,
        //    processing: true,
        //    listAction: {
        //        ajaxFunction: _phieuThusService.getAllByIDTheKhachHang,
        //        inputFilter: function () {
        //            return {
        //                iD_TheKhachHang: getCurrentTheKhachHangId()
        //            };
        //        }
        //    },
        //    columnDefs: [
        //        {
        //            width: 120,
        //            targets: 0,
        //            data: null,
        //            orderable: false,
        //            autoWidth: false,
        //            defaultContent: '',
        //            rowAction: {
        //                cssClass: 'btn btn-brand dropdown-toggle',
        //                text: '<i class="fa fa-cog"></i> ' + app.localize('Actions') + ' <span class="caret"></span>',
        //                items: [
        //                    {
        //                        text: app.localize('Edit'),
        //                        visible: function (data) {
        //                            return (_permissions.editPhieuThu && ((new moment(data.record.phieuThu.ngayLapPhieu)).add(1, 'days').format("YYYYMMDD") > (new moment()).format("YYYYMMDD") || ((new moment(data.record.phieuThu.ngayLapPhieu)).add(1, 'days').format("YYYYMMDD") == (new moment()).format("YYYYMMDD") && (new moment()).format("HHmm") <= "1100")))
        //                                || (_permissions.editLaterPhieuThu);
        //                        },
        //                        action: function (data) {
        //                            _thanhToanTheModal.open({ id: data.record.phieuThu.id });
        //                        }
        //                    },
        //                    {
        //                        text: app.localize('Delete'),
        //                        visible: function () {
        //                            return _permissions.deletePhieuThu;
        //                        },
        //                        action: function (data) {
        //                            deletePhieuThu(data.record.phieuThu);
        //                        }
        //                    }]
        //            }
        //        },
        //        {
        //            targets: 1,
        //            data: "phieuThu.maPhieuThu"
        //        },
        //        {
        //            targets: 2,
        //            data: "phieuThu.ngayLapPhieu",
        //            render: function (ngayLapPhieu) {
        //                if (ngayLapPhieu) {
        //                    return moment(ngayLapPhieu).format('L');
        //                }
        //                return "";
        //            }

        //        },
        //        {
        //            targets: 3,
        //            data: "phieuThu.tongTienThu",
        //            render: function (data) {
        //                return '<span class="numeric-cell">' + $.number(data, 0) + '</span>';
        //            }
        //        },
        //        {
        //            targets: 4,
        //            data: "phieuThu.noiDungThu"
        //        },

        //        {
        //            targets: 5,
        //            data: "userName"
        //        },
        //        {
        //            targets: 6,
        //            data: "organizationUnitDisplayName"
        //        }
        //    ]
        //});

        //// function

        function getCurrentTheKhachHangId() {
            var currentThe = getCurrentTheKhachHang();
            if (currentThe != null) {
                return currentThe.theKhachHang.id;
            }
            return null;
        }
        function getCurrentTheKhachHang() {
            var count = lstTheKhachHangTable.rows({ selected: true }).count();

            if (count > 0) {
                return lstTheKhachHangTable.rows({ selected: true }).data()[0];
            }
            return null;
        }

        function isActive() {
            
            var count = lstTheKhachHangTable.rows({ selected: true }).count();

            if (count > 0) {
                var isActive = lstTheKhachHangTable.rows({ selected: true }).data()[0].theKhachHang.status && !lstTheKhachHangTable.rows({ selected: true }).data()[0].theKhachHang.huyThe;
                return isActive;
            }
            return false
        }

        function xongCongNo() {
            
            var count = lstTheKhachHangTable.rows({ selected: true }).count();

            if (count > 0) {
                var xongCongNo = lstTheKhachHangTable.rows({ selected: true }).data()[0].hetCongNo;
                return xongCongNo;
            }
            return false
        }
        function getNhatKySuDungThes() {
            //nhatKySuDungDT.ajax.reload();
        }

        function getlichSuThes() {
            //lichSuTheDT.ajax.reload();
        }

        function getLichSuThanhToans() {
            //lichSuThanhToanDT.ajax.reload();
        }


        function getTheKhachHangs() {
            lstTheKhachHangTable.ajax.reload();
        }

        function getTheKhachHangChiTiets() {
            //lstChitietTheTable.ajax.reload();

        }
        function deleteTheKhachHang(theKhachHang) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _theKhachHangsService.delete({
                            id: theKhachHang.id
                        }).done(function () {
                            getTheKhachHangs(true);
                            abp.notify.success(app.localize('SuccessfullyDeleted'));
                        });
                    }
                }
            );
        }
        function deletePhieuThu(phieuThu) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _phieuThusService.delete({
                            id: phieuThu.id
                        }).done(function () {
                            getTheKhachHangs(true);
                            abp.notify.success(app.localize('SuccessfullyDeleted'));
                        });
                    }
                }
            );
        }
        function deleteNhatKySuDung(nhatKy) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _suDungTheService.delete({
                            id: nhatKy.iD_ChungTu
                        }).done(function () {
                            getTheKhachHangs(true);
                            abp.notify.success(app.localize('SuccessfullyDeleted'));
                        });
                    }
                }
            );
        }
        // event
        lstTheKhachHangTable
            .on('select', function (e, dt, type, indexes) {
                var data = lstTheKhachHangTable.row({ selected: true }).data();
                
                $('#daThanhToan').html($.number(data.theKhachHang.daThanhToan + (data.theKhachHang.tienNhanTuTheCu == undefined ? 0: data.theKhachHang.tienNhanTuTheCu), 0));
                $('#phaiThanhToan').html($.number(data.theKhachHang.phaiThanhToan, 0));
                
                $('#conLai').html($.number(data.theKhachHang.phaiThanhToan - (data.theKhachHang.daThanhToan == undefined ? 0 : data.theKhachHang.daThanhToan) - (data.theKhachHang.tienNhanTuTheCu == undefined ? 0 : data.theKhachHang.tienNhanTuTheCu), 0));
                if (data.theKhachHang.theGiaTri_SoLan_GiamGia == 1) {

                    $('input[name=id]').val(data.theKhachHang.id);
                    $('#dM_NhomTheTenNhomThe').html(data.dM_NhomTheTenNhomThe);
                    $('#maThe').html(data.theKhachHang.maThe);
                    $('#menhGiaThe').html($.number(data.theKhachHang.menhGiaThe, 0));
                    $('#tienTangThem').html($.number(data.theKhachHang.tienTangThem, 0));
                    $('#pTChietKhau').html($.number(data.theKhachHang.ptChietKhau, 0));
                    $('#tienChietKhau').html($.number(data.theKhachHang.tienChietKhau, 0));
                    $('#userName').html(data.userName);
                    //$('#organizationUnitDisplayName').html(data.organizationUnitDisplayName);
                    //$('#donViThuHuongDisplayName').html(data.donViThuHuongDisplayName);
                    $('#ngayMua').html(moment(data.theKhachHang.ngayMua).format('L'));
                    $('#ngayApDung').html(moment(data.theKhachHang.ngayApDung).format('L'));
                    $('#ngayHetHan').html(moment(data.theKhachHang.ngayHetHan).format('L'));
                    $('#ghiChu').html(data.theKhachHang.ghiChu);
                    $('#theGiaTriChiTiet').show();
                    $('#theLanChiTiet').hide();
                    $('.use-button').show();
                }
                else {
                    $('#theGiaTriChiTiet').hide();
                    $('#theLanChiTiet').show();
                    getTheKhachHangChiTiets();
                    $('.use-button').hide();
                }

                getNhatKySuDungThes();
                getlichSuThes();
                getLichSuThanhToans();
            });

        $('.use-button').click(function () {
            
            var theKhachHang = getCurrentTheKhachHang();
            var ngayMua = new Date(theKhachHang.theKhachHang.ngayMua);
            var ngayMuaString = ngayMua.getFullYear().toString() + ngayMua.getMonth().pad() + ngayMua.getDate().pad();
            var currentDate = new Date();
            var currentDateString = currentDate.getFullYear().toString() + currentDate.getMonth().pad() + currentDate.getDate().pad();
            if (new Date(theKhachHang.theKhachHang.ngayHetHan) < new Date()) {
                abp.notify.success(app.localize('TheDaHetHanSuDung'));
                return;
            }
            if (new Date(theKhachHang.theKhachHang.ngayApDung) > new Date()) {
                abp.notify.success(app.localize('TheChuaDenThoiGianApDung'));
                return;
            }
            if (theKhachHang.theKhachHang.huyThe || !theKhachHang.theKhachHang.status) {
                abp.notify.success(app.localize('TheCanKichHoatDeSuDung'));
                return;
            }
            // todo
            //if (!theKhachHang.laDonViThucHien) {
            //    abp.notify.success(app.localize('KhongPhaiDonViThucHien'));
            //    return;
            //}
            if (ngayMuaString != currentDateString) {
                if (theKhachHang.theKhachHang.soDu == 0 && theKhachHang.theKhachHang.phaiThanhToan > theKhachHang.theKhachHang.daThanhToan) {
                    abp.notify.success(app.localize('BanCanNapTienDeSuDung'));
                    return;
                }
            }
            var theKhachHangId = getCurrentTheKhachHangId();
            _suDungTheModal.open({ theId: theKhachHangId });
        });

        $('.edit-button').click(function () {
            var theKhachHang = getCurrentTheKhachHang();
            var theKhachHangId = getCurrentTheKhachHangId();
            if (theKhachHang.theKhachHang.theGiaTri_SoLan_GiamGia == 1) {
                _createOrEditTheGiaTriModal.open({ id: theKhachHangId });
            }
            else {
                _createOrEditTheLanModal.open({ id: theKhachHangId });
            }

        });
        $('.remove-button').click(function () {
            
            var theKhachHang = getCurrentTheKhachHang();
            deleteTheKhachHang(theKhachHang.theKhachHang);
        });

        $('.pay-button').click(function () {
            var data = lstTheKhachHangTable.row($(this).parent('tr')).data();
            var theKhachHang = getCurrentTheKhachHang();
            var theKhachHangId = theKhachHang.theKhachHang.id;
            if (xongCongNo()) {
                abp.notify.success(app.localize('TheDaThanhToanHetCongNo'));
                return;
            }

            _thanhToanTheModal.open({ idThe: theKhachHangId });
        });


        $('.loaithe').click(function () {
            $('.loaithe.active').removeClass("active");
            $(this).addClass("active");

            getTheKhachHangs();
        })

        $('#CreateNewTheLanButton').click(function () {
            _createOrEditTheLanModal.open();
        });
        $('#CreateNewTheGiaTriButton').click(function () {
            _createOrEditTheGiaTriModal.open();
        });

        abp.event.on('app.createOrEditTheKhachHangModalSaved', function () {
            getTheKhachHangs();
        });
        abp.event.on('app.createOrEditHoaDonBanLeModalSaved', function () {
            getTheKhachHangs();
        });
        abp.event.on('app.createOrEditPhieuThuModalSaved', function () {
            getTheKhachHangs();
        });

        $('#GetTheKhachHangsButton').click(function (e) {
            e.preventDefault();
            getTheKhachHangs();
        });
        $('.datatable-filter').keyup(function (e) {
            if (e.keyCode == 13) {
                e.preventDefault();
                getTheKhachHangs();
            }
        });

        $('#TheKhachHangFiltersArea input').keypress(function (e) {
            if (e.which === 13) {
                getTheKhachHangs();
            }
        });

        //$(window).scroll(function (e) {
        //    var $el = $('.card-dashboard');
        //    var isPositionFixed = ($el.css('position') == 'fixed');
        //    if ($(this).scrollTop() > 150 && !isPositionFixed) {
        //        $el.css({ 'position': 'fixed', 'top': '0px' });
        //    }
        //    if ($(this).scrollTop() < 150 && isPositionFixed) {
        //        $el.css({ 'position': 'static', 'top': '0px' });
        //    }
        //});

    });
})();

var QuickNav = function () {

    return {
        init: function () {
            
            if ($('.quick-nav').length > 0) {
                var stretchyNavs = $('.quick-nav');
                stretchyNavs.each(function () {
                    var stretchyNav = $(this),
                        stretchyNavTrigger = stretchyNav.find('.quick-nav-trigger');

                    stretchyNavTrigger.on('click', function (event) {
                        event.preventDefault();
                        stretchyNav.toggleClass('nav-is-visible');
                    });
                });

                $(document).on('click', function (event) {
                    (!$(event.target).is('.quick-nav-trigger') && !$(event.target).is('.quick-nav-trigger span')) && stretchyNavs.removeClass('nav-is-visible');
                });
            }
        }
    };
}();

QuickNav.init();