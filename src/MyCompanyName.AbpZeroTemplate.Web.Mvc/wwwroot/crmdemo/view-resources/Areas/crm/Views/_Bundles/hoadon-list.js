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

(function ($) {
    app.modals.CreateOrEditHoaDonBanLeModal = function () {

        var _hoaDonBanLesService = abp.services.app.hoaDonBanLes;
        var _suDungTheService = abp.services.app.suDungThe;
        var _$hoaDonBanLeChiTietInformationForm = null;
        var _$phieuKhaoSatForm = null;
        var _$chitietTab = null;
        var _$nhanVienThucHienTab = null;
        var _$nhanVienThucHienForm = null;
        var selectedNhanViens = [];

        var _modalManager;
        var _$hoaDonBanLeInformationForm = null;

        var _dM_ViTriLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/HoaDonBanLes/DM_ViTriLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/HoaDonBanLes/_DM_ViTriLookupTableModal.js',
            modalClass: 'DM_ViTriLookupTableModal'
        });
        var _dM_DoiTuongLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/HoaDonBanLes/DM_DoiTuongLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/HoaDonBanLes/_DM_DoiTuongLookupTableModal.js',
            modalClass: 'DM_DoiTuongLookupTableModal'
        });
        var _dM_TienTeLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/HoaDonBanLes/DM_TienTeLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/HoaDonBanLes/_DM_TienTeLookupTableModal.js',
            modalClass: 'DM_TienTeLookupTableModal'
        });
        var _organizationUnitLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/HoaDonBanLes/OrganizationUnitLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/HoaDonBanLes/_OrganizationUnitLookupTableModal.js',
            modalClass: 'OrganizationUnitLookupTableModal'
        });

        var _userLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/HoaDonBanLes/UserLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/HoaDonBanLes/_UserLookupTableModal.js',
            modalClass: 'UserLookupTableModal'
        });
        var _dM_DacDiemKhachHangLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/HoaDonBanLes/DM_DacDiemKhachHangLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/HoaDonBanLes/_DM_DacDiemKhachHangLookupTableModal.js',
            modalClass: 'DM_DacDiemKhachHangLookupTableModal'
        });
        var _dM_LoaiChungTuLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/HoaDonBanLes/DM_LoaiChungTuLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/HoaDonBanLes/_DM_LoaiChungTuLookupTableModal.js',
            modalClass: 'DM_LoaiChungTuLookupTableModal'
        });
        var _theGiaTriLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/HoaDonBanLes/TheGiaTriLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/HoaDonBanLes/_TheGiaTriLookupTableModal.js',
            modalClass: 'TheGiaTriLookupTableModal'
        });
        var _dM_HangHoaLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/Common/DM_DichVuLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Common/_DM_DichVuLookupTableModal.js',
            modalClass: 'DM_DichVuLookupTableModal',
            width: "50%"
        });

        function calcThanhTien() {
            
            var dungHangTang = $('input[name=tangKem]').prop("checked");
            var laHangTang = $('input[name=laTangKem]').val();
            var donGia = parseFloat(_$hoaDonBanLeChiTietInformationForm.find('input[name=donGia]').val());
            var soLuong = parseFloat(_$hoaDonBanLeChiTietInformationForm.find('input[name=soLuong]').val());
            var soLuongHangTangConLai = parseFloat(_$hoaDonBanLeInformationForm.find('input[name=soLuongHangTangConLai]').val());
            var soLuongHangChinhConLai = parseFloat(_$hoaDonBanLeInformationForm.find('input[name=soLuongHangChinhConLai]').val());
            var soDu = parseFloat($('input[name=soDu]').val() == "" ? "0" : $('input[name=soDu]').val());
            var soLuongDaSuDungCuaHoaDonHienTai = parseFloat($('input[name=soLanDaSuDungCuaHoaDonHienTai').val() == "" ? "0" : $('input[name=soLanDaSuDungCuaHoaDonHienTai').val());
            soLuong = soLuong - soLuongDaSuDungCuaHoaDonHienTai;
            var soLuongHangChinh = soLuong;
            if (laHangTang == "True") {
                if (soLuong > soLuongHangChinhConLai) {
                    abp.notify.info(app.localize('KhongTheSuDungQuaSoLuong'));
                    return false;
                }
                else {
                    _$hoaDonBanLeChiTietInformationForm.find('input[name=thanhTien]').val(0);
                    return 0;
                }
            }
            if (dungHangTang) {
                if (soLuong > soLuongHangTangConLai) {
                    soLuongHangChinh = soLuong - soLuongHangTangConLai;
                    var thanhTien = donGia * soLuongHangChinh;
                    _$hoaDonBanLeChiTietInformationForm.find('input[name=thanhTien]').val(thanhTien);
                    if (soLuongHangChinh > soLuong) {
                        abp.notify.info(app.localize('KhongTheSuDungQuaSoLuong'));
                        return false;
                    }
                    return thanhTien;
                }
                else {
                    _$hoaDonBanLeChiTietInformationForm.find('input[name=thanhTien]').val(0);
                    return 0;
                }
            }
            else {
                if (soLuongHangChinh > soLuongHangChinhConLai) {
                    abp.notify.info(app.localize('KhongTheSuDungQuaSoLuong'));
                    return false;
                }
                var thanhTien = donGia * soLuongHangChinh;
                _$hoaDonBanLeChiTietInformationForm.find('input[name=thanhTien]').val(thanhTien);
                
                return thanhTien;
            }
        }

        function calcThanhToan(thanhTien) {
            var thanhTien = thanhTien;
            if (thanhTien == "undefined") {
                return false;
            }
            
            var ptChietKhau = parseFloat(_$hoaDonBanLeChiTietInformationForm.find('input[name=pTChietKhau]').val());
            var thanhToan = thanhTien * (100 - ptChietKhau) / 100;
            var soDu = parseFloat($('input[name=soDuTaiKhoan]').val() == "" ? "0" : $('input[name=soDuTaiKhoan]').val());
            //_$hoaDonBanLeChiTietInformationForm.find('input[name=thanhToan]').val(thanhToan);
            //var ngayMua = new Date(theKhachHang.theKhachHang.ngayMua);
            //var ngayMuaString = ngayMua.getFullYear().toString() + ngayMua.getMonth().pad() + ngayMua.getDate().pad();
            //var currentDate = new Date();
            //var currentDateString = currentDate.getFullYear().toString() + currentDate.getMonth().pad() + currentDate.getDate().pad();
            var isCreatedOnDay = _$hoaDonBanLeChiTietInformationForm.serializeFormToObject().isCreatedOnDay;
            if (!isCreatedOnDay) {
                if (soDu < thanhToan) {
                    abp.notify.info(app.localize('TaiKhoanKhongDuDeSuDungDichVu'));
                    return false;
                }
            }
            
            return thanhToan;
        }

        function calcGioRa() {
            debugger;
            var gioVao = new moment($('#HoaDonBanLe_GioVao').data('DateTimePicker').date());
            var soPhut = parseInt($('input[name=thoiGianThucHien]').val() == "" ? '0' : $('input[name=thoiGianThucHien]').val());
            gioVao.add(soPhut, 'minutes');
            $('#HoaDonBanLe_GioRa').data('DateTimePicker').date(gioVao);
        }
        this.init = function (modalManager) {
            _modalManager = modalManager;

            var modal = _modalManager.getModal();
            modal.find('.numeric').number(true, 0);
            modal.find('.date-picker').datetimepicker({
                locale: abp.localization.currentLanguage.name,
                format: 'L'
            });
            var dateNow = new Date();
            modal.find('.datetime-picker').datetimepicker({
                locale: abp.localization.currentLanguage.name,
                defaultDate: dateNow,
            });

            debugger;
            if (modal.find('#HoaDonBanLe_GioRa').val() == '' || modal.find('#HoaDonBanLe_GioRa').val() == modal.find('#HoaDonBanLe_GioVao').val()) {
                var soPhutThucHien = parseInt(modal.find('#HoaDonBanLeChiTiet_ThoiGianThucHien').val());

                if (soPhutThucHien > 0) {
                    calcGioRa();
                }
                else {
                    modal.find('#HoaDonBanLe_GioRa').val('');
                }
            }
            $('#HoaDonBanLe_GioVao').on('dp.change', function () {
                calcGioRa();
            });


            modal.find('.date-picker').each(function () {
                if ($(this).val() == "01/01/0001") {
                    $(this).data("DateTimePicker").date(new Date());
                }
            });

            _$hoaDonBanLeInformationForm = _modalManager.getModal().find('form[name=HoaDonBanLeInformationsForm]');
            _$hoaDonBanLeChiTietInformationForm = _modalManager.getModal().find('form[name=HoaDonBanLeChiTietInformationsForm]');
            _$nhanVienThucHienForm = _modalManager.getModal().find('form[name=NhanVienThucHienForm]');
            _$phieuKhaoSatForm = _modalManager.getModal().find('form[name=PhieuKhaoSatForm]');
            _$hoaDonBanLeInformationForm.validate();
            _$hoaDonBanLeChiTietInformationForm.validate();
            _$chitietTab = _$chitietTab == null ? DichVuController(_modalManager) : _$chitietTab;
            _$nhanVienThucHienTab = _$nhanVienThucHienTab == null ? NhanVienThucHien(_modalManager) : _$nhanVienThucHienTab;
            var isMenu = false;
            $form = modal.find('#fileupload').fileupload({
                dataType: 'json'
            });
            // khởi tạo danh sách file đã upload
            var id = modal.find('input[name=id]').val();

            if (typeof id != 'undefined' && id) {
                $.ajax({
                    type: 'GET',
                    contentType: "application/json; charset=utf-8",
                    url: '/crm/HoaDonBanLes/GetFileList/' + id,
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

        $('#OpenDM_HangHoaLookupTableButton').click(function () {
            var hoaDonBanLeChiTiet = _$hoaDonBanLeChiTietInformationForm.serializeFormToObject();

            _dM_HangHoaLookupTableModal.open({ id: hoaDonBanLeChiTiet.iD_HangHoa, displayName: hoaDonBanLeChiTiet.dM_HangHoaTenHangHoa }, function (data) {
                
                _$hoaDonBanLeChiTietInformationForm.find('input[name=dM_HangHoaTenHangHoa]').val(data.code + " - " + data.displayName);
                _$hoaDonBanLeChiTietInformationForm.find('input[name=iD_HangHoa]').val(data.id);
                _$hoaDonBanLeChiTietInformationForm.find('input[name=donGia]').val(data.donGia);
                _$hoaDonBanLeChiTietInformationForm.find('input[name=thoiGianThucHien]').val(data.thoiGianThucHien);
                _$nhanVienThucHienForm.find('input[name=tienChietKhau]').val(data.thoiGianThucHien);
                _$hoaDonBanLeChiTietInformationForm.find('input[name=soLuong]').val(1);
                _$hoaDonBanLeChiTietInformationForm.find('input[name=soLuong]').trigger('change');
                calcGioRa();
            });
        });

        $('#ClearDM_HangHoaTenHangHoaButton').click(function () {
            _$hoaDonBanLeChiTietInformationForm.find('input[name=dM_HangHoaTenHangHoa]').val('');
            _$hoaDonBanLeChiTietInformationForm.find('input[name=iD_HangHoa]').val('');
            _$hoaDonBanLeChiTietInformationForm.find('input[name=donGia]').val('');
            _$hoaDonBanLeChiTietInformationForm.find('input[name=thoiGianThucHien]').val('');
            _$nhanVienThucHienForm.find('input[name=tienChietKhau]').val('');
            calcGioRa();
        });

        $('#OpenDM_ViTriLookupTableButton').click(function () {

            var hoaDonBanLe = _$hoaDonBanLeInformationForm.serializeFormToObject();

            _dM_ViTriLookupTableModal.open({ id: hoaDonBanLe.iD_ViTri, displayName: hoaDonBanLe.dM_ViTriTenViTri }, function (data) {
                _$hoaDonBanLeInformationForm.find('input[name=dM_ViTriTenViTri]').val(data.displayName);
                _$hoaDonBanLeInformationForm.find('input[name=iD_ViTri]').val(data.id);
            });
        });

        $('#ClearDM_ViTriTenViTriButton').click(function () {
            _$hoaDonBanLeInformationForm.find('input[name=dM_ViTriTenViTri]').val('');
            _$hoaDonBanLeInformationForm.find('input[name=iD_ViTri]').val('');
        });

        $('#OpenDM_DoiTuongLookupTableButton').click(function () {

            var hoaDonBanLe = _$hoaDonBanLeInformationForm.serializeFormToObject();

            _dM_DoiTuongLookupTableModal.open({ id: hoaDonBanLe.iD_DoiTuong, displayName: hoaDonBanLe.dM_DoiTuongTenDoiTuong }, function (data) {
                _$hoaDonBanLeInformationForm.find('input[name=dM_DoiTuongTenDoiTuong]').val(data.code + " - " + data.displayName);
                _$hoaDonBanLeInformationForm.find('input[name=iD_DoiTuong]').val(data.id);
                _$hoaDonBanLeInformationForm.find('input[name=diaChi_KhachHang]').val(data.address);
                _$hoaDonBanLeInformationForm.find('input[name=dienThoai_KhachHang]').val(data.phone);
                _$hoaDonBanLeInformationForm.find('input[name=nhomDoiTuong]').val(data.group);
                _$hoaDonBanLeInformationForm.find('input[name=soLanIn]').val(data.exchangeNumber);
                _$hoaDonBanLeInformationForm.find('input[name=ngaySinh_KhachHang]').val(moment(data.dateOfBirth).format('L'));
            });
        });

        $('#ClearDM_DoiTuongTenDoiTuongButton').click(function () {
            _$hoaDonBanLeInformationForm.find('input[name=dM_DoiTuongTenDoiTuong]').val('');
            _$hoaDonBanLeInformationForm.find('input[name=iD_DoiTuong]').val('');
        });

        $('#OpenDM_TienTeLookupTableButton').click(function () {

            var hoaDonBanLe = _$hoaDonBanLeInformationForm.serializeFormToObject();

            _dM_TienTeLookupTableModal.open({ id: hoaDonBanLe.iD_NgoaiTe, displayName: hoaDonBanLe.dM_TienTeTenNgoaiTe }, function (data) {
                _$hoaDonBanLeInformationForm.find('input[name=dM_TienTeTenNgoaiTe]').val(data.displayName);
                _$hoaDonBanLeInformationForm.find('input[name=iD_NgoaiTe]').val(data.id);
            });
        });

        $('#ClearDM_TienTeTenNgoaiTeButton').click(function () {
            _$hoaDonBanLeInformationForm.find('input[name=dM_TienTeTenNgoaiTe]').val('');
            _$hoaDonBanLeInformationForm.find('input[name=iD_NgoaiTe]').val('');
        });
        

        $('#OpenUserLookupTableButton').click(function () {

            var hoaDonBanLe = _$hoaDonBanLeInformationForm.serializeFormToObject();

            _userLookupTableModal.open({ id: hoaDonBanLe.iD_NhanVien, displayName: hoaDonBanLe.userName }, function (data) {
                _$hoaDonBanLeInformationForm.find('input[name=userName]').val(data.displayName);
                _$hoaDonBanLeInformationForm.find('input[name=iD_NhanVien]').val(data.id);
            });
        });

        $('#ClearUserNameButton').click(function () {
            _$hoaDonBanLeInformationForm.find('input[name=userName]').val('');
            _$hoaDonBanLeInformationForm.find('input[name=iD_NhanVien]').val('');
        });

        $('#OpenDM_DacDiemKhachHangLookupTableButton').click(function () {

            var hoaDonBanLe = _$hoaDonBanLeInformationForm.serializeFormToObject();

            _dM_DacDiemKhachHangLookupTableModal.open({ id: hoaDonBanLe.iD_DacDiemKhachHang, displayName: hoaDonBanLe.dM_DacDiemKhachHangTenDacDiem }, function (data) {
                _$hoaDonBanLeInformationForm.find('input[name=dM_DacDiemKhachHangTenDacDiem]').val(data.displayName);
                _$hoaDonBanLeInformationForm.find('input[name=iD_DacDiemKhachHang]').val(data.id);
            });
        });

        $('#ClearDM_DacDiemKhachHangTenDacDiemButton').click(function () {
            _$hoaDonBanLeInformationForm.find('input[name=dM_DacDiemKhachHangTenDacDiem]').val('');
            _$hoaDonBanLeInformationForm.find('input[name=iD_DacDiemKhachHang]').val('');
        });

        $('#OpenDonViThucHienLookupTableButton').click(function () {

            var hoaDonBanLe = _$hoaDonBanLeInformationForm.serializeFormToObject();

            _organizationUnitLookupTableModal.open({ id: hoaDonBanLe.iD_DonViThucHien, displayName: hoaDonBanLe.donViThucHienTenDonVi }, function (data) {
                _$hoaDonBanLeInformationForm.find('input[name=donViThucHienTenDonVi]').val(data.displayName);
                _$hoaDonBanLeInformationForm.find('input[name=iD_DonViThucHien]').val(data.id);
            });
        });

        $('#ClearDonViThucHienTenDonViButton').click(function () {
            _$hoaDonBanLeInformationForm.find('input[name=donViThucHienTenDonVi]').val('');
            _$hoaDonBanLeInformationForm.find('input[name=iD_DonViThucHien]').val('');
        });

        $('#OpenTheGiaTriLookupTableButton').click(function () {

            var hoaDonBanLe = _$hoaDonBanLeInformationForm.serializeFormToObject();

            _theGiaTriLookupTableModal.open({ displayName: hoaDonBanLe.maTheGiaTri, khachHangId: hoaDonBanLe.iD_DoiTuong }, function (data) {
                _$hoaDonBanLeInformationForm.find('input[name=maTheGiaTri]').val(data.displayName).attr("max-value", data.soDu);
                _$hoaDonBanLeInformationForm.find('input[name=truTuThe]').removeAttr("readonly");
                _$hoaDonBanLeInformationForm.find('input[name=tongTienHang]').trigger("change");
            });
        });

        $('#ClearMaTheGiaTriButton').click(function () {
            _$hoaDonBanLeInformationForm.find('input[name=maTheGiaTri]').val('');
            _$hoaDonBanLeInformationForm.find('input[name=maTheGiaTri]').attr("max-value", "");
            _$hoaDonBanLeInformationForm.find('input[name=truTuThe]').val("");
            _$hoaDonBanLeInformationForm.find('input[name=truTuThe]').attr("readonly", "readonly");
            _$hoaDonBanLeInformationForm.find('input[name=truTuThe]').trigger("change");
        });

        $('#HangHoaDichVuTabLink').click(function () {
            _$chitietTab = _$chitietTab == null ? DichVuController(_modalManager) : _$chitietTab;
        });

        
        $('#HoaDonBanLeChiTiet_SoLuong').change(function () {
            
            var laTangKem = $('input[name=laTangKem]').val();
            var soLuongHangTangConLai = $('input[name=soLuongHangTangConLai]').val();
            var soLuong = parseFloat($(this).val() == "" ? "0" : $(this).val());
            var id = $('input[name=id]').val();
            var soLuongDaSuDungCuaHoaDonHienTai = parseFloat($('input[name=soLanDaSuDungCuaHoaDonHienTai').val() == "" ? "0" : $('input[name=soLanDaSuDungCuaHoaDonHienTai').val());
            soLuong = soLuong - soLuongDaSuDungCuaHoaDonHienTai;
            var isTheLan = $('input[name=isTheLan]').val();
            if (isTheLan == 'True') {
                if (laTangKem == "False" || laTangKem == "") {
                    var thanhTien = calcThanhTien();
                    //var soDu = parseFloat($('input[name=soDu]').val() == "" ? "0" : $('input[name=soDu]').val());
                    //if (soDu < thanhTien) {
                    //    abp.notify.info(app.localize('TaiKhoanKhongDuDeSuDungDichVu'));
                    //    return false;
                    //}
                    calcThanhToan(thanhTien);
                    return true;
                }
                else {
                    if (soLuong > soLuongHangTangConLai) {
                        abp.notify.info(app.localize('KhongTheSuDungQuaSoLuongDuocTang'));
                        return false;
                    }
                    return true;
                }
            }
            else {
                var donGia = parseFloat($('input[name=donGia]').val());
                var soLuong = parseFloat($(this).val() == "" ? "0" : $(this).val());
                var soDuTK = parseFloat($('input[name=soDuTaiKhoan]').val());
                var thanhTien = donGia * soLuong;
                $('input[name=thanhTien]').val(thanhTien);
                if (thanhTien > soDuTK) {
                    abp.notify.info(app.localize('TaiKhoanKhongDuDeSuDungDichVu'));
                    return;
                }
            }
        });
        // NhanVienThucHien Control
        $('#NhanVienThucHienTable td .m-checkable').on("change", function () {
            
            var id = $(this).parents("tr").attr("rowId");
            if ($(this).prop("checked")) {
                selectedNhanViens.push(id);
            }
            else {
                selectedNhanViens = $.grep(selectedNhanViens, function (value) {
                    return value != id;
                });
            }
            if (selectedNhanViens.length > 0) {
                $('.create-nhanvienthuchien-button').attr("disabled", false);

            }
            else {
                $('.create-nhanvienthuchien-button').attr("disabled", true);
            }
        });
        $('#NhanVienThucHienTable td .satisfaction-select').on("change", function () {
            
            var row = $(this).parents("tr");
            var soPhutThucHien = parseFloat($(row).find('.sophutthuchien').html());
            var percentage = $(this).find(":selected").attr("percentage");
            var soPhutDuocHuong = soPhutThucHien * percentage / 100;
            $(row).find("input[name=pTDoanhThuDuocHuong]").val(soPhutDuocHuong);
        });
        $('#NhanVienThucHienTable .m-group-checkable').on("change", function () {
            
            selectedNhanViens = [];
            if ($(this).prop("checked")) {
                $(".m-checkable").each(function () {
                    $(this).prop("checked", true);
                    var id = $(this).parent("tr").attr("rowId");
                    selectedNhanViens.push(id);
                });
                $('.create-nhanvienthuchien-button').attr("disabled", false);
            }
            else {
                $(".m-checkable").each(function () {
                    $(this).prop("checked", false);
                });
                $('.create-nhanvienthuchien-button').attr("disabled", true);
            }
        });
        this.save = function () {
            
            
            if (!_$hoaDonBanLeInformationForm.valid() || !_$hoaDonBanLeChiTietInformationForm.valid() || !_$phieuKhaoSatForm.valid()) {
                return;
            }
            
            var isTheLan = $('input[name=isTheLan]').val();
            if (isTheLan == 'True') {
                var thanhTien = calcThanhTien();
                if (calcThanhToan(thanhTien) === false) {
                    return;
                }
            }
            else {
                var donGia = parseFloat($('input[name=donGia]').val());
                var soLuong = parseFloat($('input[name=soLuong]').val() == "" ? "0" : $('input[name=soLuong]').val());
                var soDuTK = parseFloat($('input[name=soDuTaiKhoan]').val());
                var thanhTien = donGia * soLuong;
                $('input[name=thanhTien]').val(thanhTien);
                if (thanhTien > soDuTK) {
                    abp.notify.info(app.localize('TaiKhoanKhongDuDeSuDungDichVu'));
                    return;
                }
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

            var hoaDonBanLe = _$hoaDonBanLeInformationForm.serializeFormToObject();
            var phieuKhaoSat = _$phieuKhaoSatForm.serializeFormToObject();
            var nhanVienThucHiens = $.map($('#NhanVienThucHienTable tbody tr'), function (val, i) {
                return {
                    iD_CongViec: $(val).attr("rowId"),
                    id: $(val).attr("dataId"),
                    nhanVien: $(val).find('input[name=nhanVien]').val(),
                    ngayThucHien: $(val).find('input[name=ngayThucHien]').val(),
                    danhGia: $(val).find('select[name=danhGia]').val(),
                    dienGiai: $(val).find('input[name=dienGiai]').val(),
                }
            });
            hoaDonBanLe = $.extend({}, hoaDonBanLe, phieuKhaoSat);
            hoaDonBanLe.nhanVienThucHiens = nhanVienThucHiens;
            var chiTietHoaDon = _$hoaDonBanLeChiTietInformationForm.serializeFormToObject();
            _modalManager.setBusy(true);
            _suDungTheService.createOrEdit({ thongTinChung: hoaDonBanLe, thongTinChiTiet: chiTietHoaDon }).done(function () {
                abp.notify.info(app.localize('SavedSuccessfully'));
                _modalManager.close();
                abp.event.trigger('app.createOrEditHoaDonBanLeModalSaved');
            }).always(function () {
                _modalManager.setBusy(false);
            });
        };
    };
})(jQuery);
(function () {
    $(function () {

        var _$hoaDonBanLesTable = $('#HoaDonBanLesTable');
        var _hoaDonBanLesService = abp.services.app.hoaDonBanLes;

        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.HoaDonBanLes.Create'),
            edit: abp.auth.hasPermission('Pages.HoaDonBanLes.Edit'),
            'delete': abp.auth.hasPermission('Pages.HoaDonBanLes.Delete'),
            'exportsurvey': abp.auth.hasPermission('Pages.HoaDonBanLes.ExportSurvey')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/HoaDonBanLes/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/HoaDonBanLes/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditHoaDonBanLeModal',
            width: '100%'
        });

        var _viewHoaDonBanLeModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/HoaDonBanLes/ViewhoaDonBanLeModal',
            modalClass: 'ViewHoaDonBanLeModal'
        });

        var dataTable = _$hoaDonBanLesTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _hoaDonBanLesService.getAll,
                inputFilter: function () {
                    return {
                        filter: $('#HoaDonBanLesTableFilter').val(),
                        maHoaDonFilter: $('#MaHoaDonFilterId').val(),
                        minNgayLapHoaDonFilter: $('#MinNgayLapHoaDonFilterId').val(),
                        maxNgayLapHoaDonFilter: $('#MaxNgayLapHoaDonFilterId').val(),
                        dM_DoiTuongPhoneFilter: $('#DM_DoiTuongPhoneFilter').val(),
                        dM_DoiTuongTenDoiTuongFilter: $('#DM_DoiTuongTenDoiTuongFilter').val(),

                        maNhanVienThucHienFilter: $('#MaNhanVienThucHienFilterId').val(),
                        tenNhanVienThucHienFilter: $('#TenNhanVienThucHienFilterId').val(),
                        maNhanVienTuVanFilter: $('#MaNhanVienTuVanFilterId').val(),
                        tenNhanVienTuVanFilter: $('#TenNhanVienTuVanFilterId').val(),

                        dM_ViTriTenViTriFilter: $('#DM_ViTriTenViTriFilterId').val(),
                        dM_DoiTuongTenDoiTuongFilter: $('#DM_DoiTuongTenDoiTuongFilterId').val(),

                        orgId: $('#OrganizationUnitId').val(),

                        dM_DacDiemKhachHangTenDacDiemFilter: $('#DM_DacDiemKhachHangTenDacDiemFilterId').val(),
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
                                text: app.localize('SurveyExport'),
                                visible: function () {
                                    return _permissions.exportsurvey;
                                },
                                action: function (data) {
                                    exportSurvey(data.record.hoaDonBanLe.id);
                                }
                            }
                        ]
                    }
                },
                //{
                //    targets: 1,
                //    data: null
                //},
                //{
                //    targets: 2,
                //    data: "hoaDonBanLe.maHoaDon"
                //},

                //{
                //    targets: 3,
                //    data: "dM_DoiTuongTenDoiTuong"
                //},
                //{
                //    targets: 4,
                //    data: "hoaDonBanLe.ngayLapHoaDon",
                //    render: function (ngayLapHoaDon) {
                //        if (ngayLapHoaDon) {
                //            return moment(ngayLapHoaDon).format('L');
                //        }
                //        return "";
                //    }

                //},
                //{
                //    targets: 5,
                //    data: "hoaDonBanLe.gioVao",
                //    render: function (gioVao) {
                //        if (gioVao) {
                //            return moment(gioVao).format('L');
                //        }
                //        return "";
                //    }

                //},
                //{
                //    targets: 6,
                //    data: "hoaDonBanLe.gioRa",
                //    render: function (gioRa) {
                //        if (gioRa) {
                //            return moment(gioRa).format('L');
                //        }
                //        return "";
                //    }

                //},
                //{
                //    targets: 7,
                //    data: "hoaDonBanLe.tongTienHang"
                //},
                //{
                //    targets: 8,
                //    data: "hoaDonBanLe.tongChietKhau"
                //},
                //{
                //    targets: 9,
                //    data: "hoaDonBanLe.phaiThanhToan"
                //},
                //{
                //    targets: 10,
                //    data: "hoaDonBanLe.dienGiai"
                //},

                //{
                //    targets: 11,
                //    data: "hoaDonBanLe.userLap"
                //},
                //{
                //    targets: 12,
                //    data: "hoaDonBanLe.yeuCau"
                //},

                //{
                //    targets: 13,
                //    data: "dM_ViTriTenViTri"
                //},
                //{
                //    targets: 14,
                //    data: "donViThucHienTenDonVi"
                //}
            // todo
                {
                    targets: 1,
                    data: null
                },
                {
                    targets: 2,
                    data: "dM_DoiTuongMaDoiTuong"
                },

                {
                    targets: 3,
                    data: "dM_DoiTuongTenDoiTuong"
                },
                {
                    targets: 4,
                    data: "phone"
                },
                {
                    targets: 5,
                    data: "ngay",
                    render: function (data) {
                        if (data) {
                            return moment(data).format('L');
                        }
                        return "";
                    }

                },
                {
                    targets: 6,
                    data: "donViThucHienTenDonVi",
                    //render: function (gioVao) {
                    //    if (gioVao) {
                    //        return moment(gioVao).format('L');
                    //    }
                    //    return "";
                    //}

                },
                {
                    targets: 7,
                    data: "tenHangHoaDichVu",
                    //render: function (gioRa) {
                    //    if (gioRa) {
                    //        return moment(gioRa).format('L');
                    //    }
                    //    return "";
                    //}

                },
                {
                    targets: 8,
                    data: "nhatKySuDung_SoLuong"
                },
                {
                    targets: 9,
                    data: "nhatKySuDung_SoTien"
                },
                {
                    targets: 10,
                    data: "nhatKySuDung_LaSoLuongDuocTang",
                    render: function (nhatKySuDung_LaSoLuongDuocTang) {
                        if (nhatKySuDung_LaSoLuongDuocTang) {
                            return "x";
                        }
                        return "";
                    }
                },
                {
                    targets: 11,
                    data: "dM_DacDiemKhachHangTenDacDiem"
                },

                {
                    targets: 12,
                    data: "dM_ViTriTenViTri"
                },

            ]
        });

        dataTable.on('draw.dt', function () {
            var PageInfo = dataTable.page.info();
            dataTable.column(1, { page: 'current' }).nodes().each(function (cell, i) {
                cell.innerHTML = i + 1 + PageInfo.start;
            });
        });

        function getHoaDonBanLes() {
            dataTable.ajax.reload();
        }

        function deleteHoaDonBanLe(hoaDonBanLe) {

            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _hoaDonBanLesService.delete({
                            id: hoaDonBanLe.id
                        }).done(function () {
                            getHoaDonBanLes(true);
                            abp.notify.success(app.localize('SuccessfullyDeleted'));
                        });
                    }
                }
            );
        }
        //$('#ExportUsersToExcelButton').click(function () {
        //    _userService
        //        .getUsersToExcel({})
        //        .done(function (result) {
        //            app.downloadTempFile(result);
        //        });
        //});
        function exportSurvey(id) {

            _hoaDonBanLesService.getCongDoanToWord(id).done(function (result) { app.downloadTempFile(result) });
        }


        abp.event.on('app.createOrEditHoaDonBanLeModalSaved', function () {
            getHoaDonBanLes();
        });

        $('#GetHoaDonBanLesButton').click(function (e) {
            e.preventDefault();
            getHoaDonBanLes();
        });

        $(document).keypress(function (e) {
            if (e.which === 13) {
                getHoaDonBanLes();
            }
        });

        $('#RefreshSelectedDateRangeButton').click(function () {

            $('#MinNgayLapHoaDonFilterId').val("");
            $('#MaxNgayLapHoaDonFilterId').val("");
        });

        $('#GetReportHDBLButton').click(function (e) {

            getHoaDonBanLes();
        });

        $('#ExportButton').click(function () {

            //var filter = $('#HoaDonBanLesTableFilter').val();
            //var maHoaDonFilter = $('#MaHoaDonFilterId').val();
            //var minNgayLapHoaDonFilter = $('#MinNgayLapHoaDonFilterId').val();
            //var maxNgayLapHoaDonFilter = $('#MaxNgayLapHoaDonFilterId').val();
            //var minGioVaoFilter = $('#MinGioVaoFilterId').val();
            //var maxGioVaoFilter = $('#MaxGioVaoFilterId').val();
            //var minGioRaFilter = $('#MinGioRaFilterId').val();
            //var maxGioRaFilter = $('#MaxGioRaFilterId').val();
            //var dienThoai_KhachHangFilter = $('#DienThoai_KhachHangFilterId').val();

            //var minLoaiHoaDonFilter = $('#MinLoaiHoaDonFilterId').val();
            //var maxLoaiHoaDonFilter = $('#MaxLoaiHoaDonFilterId').val();

            //var userLapFilter = $('#UserLapFilterId').val();
            //var minNgayVaoSoFilter = $('#MinNgayVaoSoFilterId').val();
            //var maxNgayVaoSoFilter = $('#MaxNgayVaoSoFilterId').val();

            //var maNhanVienThucHienFilter = $('#MaNhanVienThucHienFilterId').val();
            //var tenNhanVienThucHienFilter = $('#TenNhanVienThucHienFilterId').val();
            //var maNhanVienTuVanFilter = $('#MaNhanVienTuVanFilterId').val();
            //var tenNhanVienTuVanFilter = $('#TenNhanVienTuVanFilterId').val();

            //var dM_ViTriTenViTriFilter = $('#DM_ViTriTenViTriFilterId').val();
            //var dM_DoiTuongTenDoiTuongFilter = $('#DM_DoiTuongTenDoiTuongFilterId').val();

            //var organizationUnitDisplayNameFilter = $('#OrganizationUnitDisplayNameFilterId').val();

            //var dM_DacDiemKhachHangTenDacDiemFilter = $('#DM_DacDiemKhachHangTenDacDiemFilterId').val();
            
            var obj = {
                filter: $('#HoaDonBanLesTableFilter').val(),
                maHoaDonFilter: $('#MaHoaDonFilterId').val(),
                minNgayLapHoaDonFilter: $('#MinNgayLapHoaDonFilterId').val(),
                maxNgayLapHoaDonFilter: $('#MaxNgayLapHoaDonFilterId').val(),
                minGioVaoFilter: $('#MinGioVaoFilterId').val(),
                maxGioVaoFilter: $('#MaxGioVaoFilterId').val(),
                minGioRaFilter: $('#MinGioRaFilterId').val(),
                maxGioRaFilter: $('#MaxGioRaFilterId').val(),
                dienThoai_KhachHangFilter: $('#DienThoai_KhachHangFilterId').val(),

                minLoaiHoaDonFilter: $('#MinLoaiHoaDonFilterId').val(),
                maxLoaiHoaDonFilter: $('#MaxLoaiHoaDonFilterId').val(),

                userLapFilter: $('#UserLapFilterId').val(),
                minNgayVaoSoFilter: $('#MinNgayVaoSoFilterId').val(),
                maxNgayVaoSoFilter: $('#MaxNgayVaoSoFilterId').val(),

                maNhanVienThucHienFilter: $('#MaNhanVienThucHienFilterId').val(),
                tenNhanVienThucHienFilter: $('#TenNhanVienThucHienFilterId').val(),
                maNhanVienTuVanFilter: $('#MaNhanVienTuVanFilterId').val(),
                tenNhanVienTuVanFilter: $('#TenNhanVienTuVanFilterId').val(),

                dM_ViTriTenViTriFilter: $('#DM_ViTriTenViTriFilterId').val(),
                dM_DoiTuongTenDoiTuongFilter: $('#DM_DoiTuongTenDoiTuongFilterId').val(),

                orgId: $('#OrganizationUnitId').val(),

                dM_DacDiemKhachHangTenDacDiemFilter: $('#DM_DacDiemKhachHangTenDacDiemFilterId').val(),
            };
            //abp.ui.setBusy($container);
            _hoaDonBanLesService.getHoaDonBanLesToExcel(obj).done(function (result) {

                app.downloadTempFile(result);
            });
        });
    });
})();