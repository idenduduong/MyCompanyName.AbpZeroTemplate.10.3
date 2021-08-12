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