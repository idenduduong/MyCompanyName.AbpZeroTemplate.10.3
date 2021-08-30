(function () {
    $(function () {

        var _$dM_HangHoasTable = $('#DM_HangHoasTable');
        var _dM_HangHoasService = abp.services.app.dM_HangHoas;

        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.DM_HangHoas.Create'),
            edit: abp.auth.hasPermission('Pages.DM_HangHoas.Edit'),
            'delete': abp.auth.hasPermission('Pages.DM_HangHoas.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_HangHoas/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_HangHoas/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditDM_HangHoaModal',
            width: "80%",
            save:true,
            saveAndClose: true,
            saveAndNew:true,
            buttons: [{
                    iconClass: "",
                    buttonClass: "",
                    eventClass:"",
                    function: "",
                    text: ""
                },
                {
                    iconClass: "",
                    buttonClass: "",
                    function: "",
                    text: ""
                }
            ]
                
        });

        var _viewDM_HangHoaModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_HangHoas/ViewdM_HangHoaModal',
            modalClass: 'ViewDM_HangHoaModal'
        });

        var dataTable = _$dM_HangHoasTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _dM_HangHoasService.getAll,
                inputFilter: function () {
                    return {
                        filter: $('#DM_HangHoasTableFilter').val(),
                        isHangHoa: true,
                        maHangHoaFilter: $('#MaHangHoaFilterId').val(),
                        tenHangHoaFilter: $('#TenHangHoaFilterId').val(),
                        minGiaBanLeFilter: $('#MinGiaBanLeFilterId').val(),
                        maxGiaBanLeFilter: $('#MaxGiaBanLeFilterId').val(),
                        minTiSuatBanLeFilter: $('#MinTiSuatBanLeFilterId').val(),
                        maxTiSuatBanLeFilter: $('#MaxTiSuatBanLeFilterId').val(),
                        minGiaNhapFilter: $('#MinGiaNhapFilterId').val(),
                        maxGiaNhapFilter: $('#MaxGiaNhapFilterId').val(),
                        maVachFilter: $('#MaVachFilterId').val(),
                        minQuyCachFilter: $('#MinQuyCachFilterId').val(),
                        maxQuyCachFilter: $('#MaxQuyCachFilterId').val(),
                        iD_DVTQuyCachFilter: $('#ID_DVTQuyCachFilterId').val(),
                        minLoaiBaoHanhFilter: $('#MinLoaiBaoHanhFilterId').val(),
                        maxLoaiBaoHanhFilter: $('#MaxLoaiBaoHanhFilterId').val(),
                        minThoiGianBaoHanhFilter: $('#MinThoiGianBaoHanhFilterId').val(),
                        maxThoiGianBaoHanhFilter: $('#MaxThoiGianBaoHanhFilterId').val(),
                        tenTGBaoHanhFilter: $('#TenTGBaoHanhFilterId').val(),
                        minChiPhiThucHienFilter: $('#MinChiPhiThucHienFilterId').val(),
                        maxChiPhiThucHienFilter: $('#MaxChiPhiThucHienFilterId').val(),
                        chiPhiTinhTheoPTFilter: $('#ChiPhiTinhTheoPTFilterId').val(),
                        tinhCPSauChietKhauFilter: $('#TinhCPSauChietKhauFilterId').val(),
                        ghiChuFilter: $('#GhiChuFilterId').val(),
                        minSoPhutThucHienFilter: $('#MinSoPhutThucHienFilterId').val(),
                        maxSoPhutThucHienFilter: $('#MaxSoPhutThucHienFilterId').val(),
                        minChietKhauMD_NVFilter: $('#MinChietKhauMD_NVFilterId').val(),
                        maxChietKhauMD_NVFilter: $('#MaxChietKhauMD_NVFilterId').val(),
                        chietKhauMD_NVTheoPTFilter: $('#ChietKhauMD_NVTheoPTFilterId').val(),
                        theoDoiFilter: $('#TheoDoiFilterId').val(),
                        tenKhacFilter: $('#TenKhacFilterId').val(),
                        chatLieuFilter: $('#ChatLieuFilterId').val(),
                        kichCoFilter: $('#KichCoFilterId').val(),
                        mauSacFilter: $('#MauSacFilterId').val(),
                        dM_NhomHangHoaTenNhomFilter: $('#DM_NhomHangHoaTenNhomFilterId').val(),
                        dM_QuocGiaTenNuocFilter: $('#DM_QuocGiaTenNuocFilterId').val(),
                        dM_DoiTuongTenDoiTuongFilter: $('#DM_DoiTuongTenDoiTuongFilterId').val(),
                        dM_ThueSuatThueSuatFilter: $('#DM_ThueSuatThueSuatFilterId').val(),
                        dM_DonViTinhTenDonViTinhFilter: $('#DM_DonViTinhTenDonViTinhFilterId').val()
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
                                    _viewDM_HangHoaModal.open({ data: data.record });
                                }
                            },
                            {
                                text: app.localize('Edit'),
                                visible: function () {
                                    return _permissions.edit;
                                },
                                action: function (data) {
                                    _createOrEditModal.open({ id: data.record.dM_HangHoa.id });
                                }
                            },
                            {
                                text: app.localize('Delete'),
                                visible: function () {
                                    return _permissions.delete;
                                },
                                action: function (data) {
                                    deleteDM_HangHoa(data.record.dM_HangHoa);
                                }
                            }]
                    }
                },
                {
                    targets: 1,
                    data: "dM_HangHoa.maHangHoa"
                },
                {
                    targets: 2,
                    data: "dM_HangHoa.tenHangHoa"
                },
                {
                    targets: 3,
                    data: "dM_HangHoa.giaBanLe"
                },
                {
                    targets: 4,
                    data: "dM_HangHoa.tiSuatBanLe"
                },
                {
                    targets: 5,
                    data: "dM_HangHoa.giaNhap"
                },
                {
                    targets: 6,
                    data: "dM_DonViTinhTenDonViTinh"
                },
                {
                    targets: 7,
                    data: "dM_HangHoa.quyCach"
                },
                {
                    targets: 8,
                    data: "dM_DonViTinhQuyCachTenDonViTinh"
                },
                {
                    targets: 9,
                    data: "dM_HangHoa.loaiBaoHanh"
                },
                {
                    targets: 10,
                    data: "dM_HangHoa.thoiGianBaoHanh"
                },
                {
                    targets: 11,
                    data: "dM_HangHoa.tenTGBaoHanh"
                },
                {
                    targets: 12,
                    data: "dM_HangHoa.chiPhiThucHien"
                },
                {
                    targets: 13,
                    data: "dM_HangHoa.chiPhiTinhTheoPT",
                    render: function (chiPhiTinhTheoPT) {
                        if (chiPhiTinhTheoPT) {
                            return '<i class="la la-check-square m--font-success" title="True"></i>';
                        }
                        return '<i class="la la-times-circle" title="False"></i>';
                    }

                },
                {
                    targets: 14,
                    data: "dM_HangHoa.tinhCPSauChietKhau",
                    render: function (tinhCPSauChietKhau) {
                        if (tinhCPSauChietKhau) {
                            return '<i class="la la-check-square m--font-success" title="True"></i>';
                        }
                        return '<i class="la la-times-circle" title="False"></i>';
                    }

                },
                {
                    targets: 15,
                    data: "dM_HangHoa.soPhutThucHien"
                },
                {
                    targets: 16,
                    data: "dM_HangHoa.chietKhauMD_NV"
                },
                {
                    targets: 17,
                    data: "dM_HangHoa.chietKhauMD_NVTheoPT",
                    render: function (chietKhauMD_NVTheoPT) {
                        if (chietKhauMD_NVTheoPT) {
                            return '<i class="la la-check-square m--font-success" title="True"></i>';
                        }
                        return '<i class="la la-times-circle" title="False"></i>';
                    }

                },
                {
                    targets: 18,
                    data: "dM_HangHoa.theoDoi",
                    render: function (theoDoi) {
                        if (theoDoi) {
                            return '<i class="la la-check-square m--font-success" title="True"></i>';
                        }
                        return '<i class="la la-times-circle" title="False"></i>';
                    }

                },
                {
                    targets: 19,
                    data: "dM_HangHoa.tenKhac"
                },
                {
                    targets: 20,
                    data: "dM_HangHoa.chatLieu"
                },
                {
                    targets: 21,
                    data: "dM_HangHoa.kichCo"
                },
                {
                    targets: 22,
                    data: "dM_HangHoa.mauSac"
                },
                {
                    targets: 23,
                    data: "dM_NhomHangHoaTenNhom"
                },
                {
                    targets: 24,
                    data: "dM_QuocGiaTenNuoc"
                },
                {
                    targets: 25,
                    data: "dM_DoiTuongTenDoiTuong"
                },
                {
                    targets: 26,
                    data: "dM_ThueSuatThueSuat"
                }
            ]
        });


        function getDM_HangHoas() {
            dataTable.ajax.reload();
        }

        function deleteDM_HangHoa(dM_HangHoa) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _dM_HangHoasService.delete({
                            id: dM_HangHoa.id
                        }).done(function () {
                            getDM_HangHoas(true);
                            abp.notify.success(app.localize('SuccessfullyDeleted'));
                        });
                    }
                }
            );
        }

        $('#ShowAdvancedFiltersSpan').click(function () {
            $('#ShowAdvancedFiltersSpan').hide();
            $('#HideAdvancedFiltersSpan').show();
            $('#AdvacedAuditFiltersArea').slideDown();
        });

        $('#HideAdvancedFiltersSpan').click(function () {
            $('#HideAdvancedFiltersSpan').hide();
            $('#ShowAdvancedFiltersSpan').show();
            $('#AdvacedAuditFiltersArea').slideUp();
        });

        $('#CreateNewDM_HangHoaButton').click(function () {
            _createOrEditModal.open();
        });

        $('#ExportToExcelButton').click(function () {
            _dM_HangHoasService
                .getDM_HangHoasToExcel({
                    filter: $('#DM_HangHoasTableFilter').val(),
                    anhFilter: $('#AnhFilterId').val(),
                    maHangHoaFilter: $('#MaHangHoaFilterId').val(),
                    tenHangHoaFilter: $('#TenHangHoaFilterId').val(),
                    laHangHoaFilter: $('#LaHangHoaFilterId').val(),
                    iD_PhanLoaiFilter: $('#ID_PhanLoaiFilterId').val(),
                    minGiaBanLeFilter: $('#MinGiaBanLeFilterId').val(),
                    maxGiaBanLeFilter: $('#MaxGiaBanLeFilterId').val(),
                    minTiSuatBanLeFilter: $('#MinTiSuatBanLeFilterId').val(),
                    maxTiSuatBanLeFilter: $('#MaxTiSuatBanLeFilterId').val(),
                    minGiaNhapFilter: $('#MinGiaNhapFilterId').val(),
                    maxGiaNhapFilter: $('#MaxGiaNhapFilterId').val(),
                    minGiaBan1Filter: $('#MinGiaBan1FilterId').val(),
                    maxGiaBan1Filter: $('#MaxGiaBan1FilterId').val(),
                    minTiSuatTheoGiaBan1Filter: $('#MinTiSuatTheoGiaBan1FilterId').val(),
                    maxTiSuatTheoGiaBan1Filter: $('#MaxTiSuatTheoGiaBan1FilterId').val(),
                    minGiaBan2Filter: $('#MinGiaBan2FilterId').val(),
                    maxGiaBan2Filter: $('#MaxGiaBan2FilterId').val(),
                    minTiSuatTheoGiaBan2Filter: $('#MinTiSuatTheoGiaBan2FilterId').val(),
                    maxTiSuatTheoGiaBan2Filter: $('#MaxTiSuatTheoGiaBan2FilterId').val(),
                    minGiaBan3Filter: $('#MinGiaBan3FilterId').val(),
                    maxGiaBan3Filter: $('#MaxGiaBan3FilterId').val(),
                    minTiSuatTheoGiaBan3Filter: $('#MinTiSuatTheoGiaBan3FilterId').val(),
                    maxTiSuatTheoGiaBan3Filter: $('#MaxTiSuatTheoGiaBan3FilterId').val(),
                    iDs_NhomKH2Filter: $('#IDs_NhomKH2FilterId').val(),
                    iDs_NhomKH3Filter: $('#IDs_NhomKH3FilterId').val(),
                    maVachFilter: $('#MaVachFilterId').val(),
                    minQuyCachFilter: $('#MinQuyCachFilterId').val(),
                    maxQuyCachFilter: $('#MaxQuyCachFilterId').val(),
                    iD_DVTQuyCachFilter: $('#ID_DVTQuyCachFilterId').val(),
                    minLoaiBaoHanhFilter: $('#MinLoaiBaoHanhFilterId').val(),
                    maxLoaiBaoHanhFilter: $('#MaxLoaiBaoHanhFilterId').val(),
                    minThoiGianBaoHanhFilter: $('#MinThoiGianBaoHanhFilterId').val(),
                    maxThoiGianBaoHanhFilter: $('#MaxThoiGianBaoHanhFilterId').val(),
                    tenTGBaoHanhFilter: $('#TenTGBaoHanhFilterId').val(),
                    minChiPhiThucHienFilter: $('#MinChiPhiThucHienFilterId').val(),
                    maxChiPhiThucHienFilter: $('#MaxChiPhiThucHienFilterId').val(),
                    chiPhiTinhTheoPTFilter: $('#ChiPhiTinhTheoPTFilterId').val(),
                    tinhCPSauChietKhauFilter: $('#TinhCPSauChietKhauFilterId').val(),
                    ghiChuFilter: $('#GhiChuFilterId').val(),
                    minSoPhutThucHienFilter: $('#MinSoPhutThucHienFilterId').val(),
                    maxSoPhutThucHienFilter: $('#MaxSoPhutThucHienFilterId').val(),
                    minChietKhauMD_NVFilter: $('#MinChietKhauMD_NVFilterId').val(),
                    maxChietKhauMD_NVFilter: $('#MaxChietKhauMD_NVFilterId').val(),
                    chietKhauMD_NVTheoPTFilter: $('#ChietKhauMD_NVTheoPTFilterId').val(),
                    iD_DonViTinhPhu1Filter: $('#ID_DonViTinhPhu1FilterId').val(),
                    minTyLeChuyenDoi1Filter: $('#MinTyLeChuyenDoi1FilterId').val(),
                    maxTyLeChuyenDoi1Filter: $('#MaxTyLeChuyenDoi1FilterId').val(),
                    iD_DonViTinhPhu2Filter: $('#ID_DonViTinhPhu2FilterId').val(),
                    minTyLeChuyenDoi2Filter: $('#MinTyLeChuyenDoi2FilterId').val(),
                    maxTyLeChuyenDoi2Filter: $('#MaxTyLeChuyenDoi2FilterId').val(),
                    iD_DonViTinhPhu3Filter: $('#ID_DonViTinhPhu3FilterId').val(),
                    minTyLeChuyenDoi3Filter: $('#MinTyLeChuyenDoi3FilterId').val(),
                    maxTyLeChuyenDoi3Filter: $('#MaxTyLeChuyenDoi3FilterId').val(),
                    minTinhGiaVonFilter: $('#MinTinhGiaVonFilterId').val(),
                    maxTinhGiaVonFilter: $('#MaxTinhGiaVonFilterId').val(),
                    theoDoiFilter: $('#TheoDoiFilterId').val(),
                    tenKhacFilter: $('#TenKhacFilterId').val(),
                    chatLieuFilter: $('#ChatLieuFilterId').val(),
                    kichCoFilter: $('#KichCoFilterId').val(),
                    mauSacFilter: $('#MauSacFilterId').val(),
                    minTiSuat1Filter: $('#MinTiSuat1FilterId').val(),
                    maxTiSuat1Filter: $('#MaxTiSuat1FilterId').val(),
                    minTiSuat2Filter: $('#MinTiSuat2FilterId').val(),
                    maxTiSuat2Filter: $('#MaxTiSuat2FilterId').val(),
                    minTiSuat3Filter: $('#MinTiSuat3FilterId').val(),
                    maxTiSuat3Filter: $('#MaxTiSuat3FilterId').val(),
                    dM_NhomHangHoaTenNhomFilter: $('#DM_NhomHangHoaTenNhomFilterId').val(),
                    dM_QuocGiaTenNuocFilter: $('#DM_QuocGiaTenNuocFilterId').val(),
                    dM_DoiTuongTenDoiTuongFilter: $('#DM_DoiTuongTenDoiTuongFilterId').val(),
                    dM_ThueSuatThueSuatFilter: $('#DM_ThueSuatThueSuatFilterId').val(),
                    dM_DonViTinhTenDonViTinhFilter: $('#DM_DonViTinhTenDonViTinhFilterId').val()
                })
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditDM_HangHoaModalSaved', function () {
            getDM_HangHoas();
        });

        $('#GetDM_HangHoasButton').click(function (e) {
            e.preventDefault();
            getDM_HangHoas();
        });

        $(document).keypress(function (e) {
            if (e.which === 13) {
                getDM_HangHoas();
            }
        });

    });
})();