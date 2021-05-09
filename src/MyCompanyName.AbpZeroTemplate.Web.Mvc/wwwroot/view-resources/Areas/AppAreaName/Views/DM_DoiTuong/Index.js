(function() {
    $(function() {
        var _$dM_DoiTuongTable = $('#DM_DoiTuongTable');
        var _dM_DoiTuongService = abp.services.app.dM_DoiTuong;
        var _entityTypeFullName = 'MyCompanyName.AbpZeroTemplate.DM_DoiTuongs.DM_DoiTuong';
        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });
        var _permissions = {
            create: abp.auth.hasPermission('Pages.DM_DoiTuong.Create'),
            edit: abp.auth.hasPermission('Pages.DM_DoiTuong.Edit'),
            'delete': abp.auth.hasPermission('Pages.DM_DoiTuong.Delete')
        };
        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'AppAreaName/DM_DoiTuong/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/AppAreaName/Views/DM_DoiTuong/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditDM_DoiTuongModal'
        });
        var _viewDM_DoiTuongModal = new app.ModalManager({
            viewUrl: abp.appPath + 'AppAreaName/DM_DoiTuong/ViewdM_DoiTuongModal',
            modalClass: 'ViewDM_DoiTuongModal'
        });
        var _entityTypeHistoryModal = app.modals.EntityTypeHistoryModal.create();

        function entityHistoryIsEnabled() {
            return abp.auth.hasPermission('Pages.Administration.AuditLogs') &&
                abp.custom.EntityHistory &&
                abp.custom.EntityHistory.IsEnabled &&
                _.filter(abp.custom.EntityHistory.EnabledEntities, entityType => entityType === _entityTypeFullName).length === 1;
        }
        var getDateFilter = function(element) {
            if (element.data("DateTimePicker").date() == null) {
                return null;
            }
            return element.data("DateTimePicker").date().format("YYYY-MM-DDT00:00:00Z");
        }
        var getMaxDateFilter = function(element) {
            if (element.data("DateTimePicker").date() == null) {
                return null;
            }
            return element.data("DateTimePicker").date().format("YYYY-MM-DDT23:59:59Z");
        }
        var dataTable = _$dM_DoiTuongTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _dM_DoiTuongService.getAll,
                inputFilter: function() {
                    return {
                        filter: $('#DM_DoiTuongTableFilter').val(),
                        minLoaiDoiTuongFilter: $('#MinLoaiDoiTuongFilterId').val(),
                        maxLoaiDoiTuongFilter: $('#MaxLoaiDoiTuongFilterId').val(),
                        laCaNhanFilter: $('#LaCaNhanFilterId').val(),
                        maDoiTuongFilter: $('#MaDoiTuongFilterId').val(),
                        tenDoiTuongFilter: $('#TenDoiTuongFilterId').val(),
                        dienThoaiFilter: $('#DienThoaiFilterId').val(),
                        faxFilter: $('#FaxFilterId').val(),
                        emailFilter: $('#EmailFilterId').val(),
                        websiteFilter: $('#WebsiteFilterId').val(),
                        anhFilter: $('#AnhFilterId').val(),
                        maSoThueFilter: $('#MaSoThueFilterId').val(),
                        taiKhoanNganHangFilter: $('#TaiKhoanNganHangFilterId').val(),
                        minGioiHanCongNoFilter: $('#MinGioiHanCongNoFilterId').val(),
                        maxGioiHanCongNoFilter: $('#MaxGioiHanCongNoFilterId').val(),
                        ghiChuFilter: $('#GhiChuFilterId').val(),
                        minNgaySinh_NgayTLapFilter: getDateFilter($('#MinNgaySinh_NgayTLapFilterId')),
                        maxNgaySinh_NgayTLapFilter: getMaxDateFilter($('#MaxNgaySinh_NgayTLapFilterId')),
                        chiaSeFilter: $('#ChiaSeFilterId').val(),
                        theoDoiFilter: $('#TheoDoiFilterId').val(),
                        minID_IndexFilter: $('#MinID_IndexFilterId').val(),
                        maxID_IndexFilter: $('#MaxID_IndexFilterId').val(),
                        theoDoiVanTayFilter: $('#TheoDoiVanTayFilterId').val(),
                        minNgayDoiNhomFilter: getDateFilter($('#MinNgayDoiNhomFilterId')),
                        maxNgayDoiNhomFilter: getMaxDateFilter($('#MaxNgayDoiNhomFilterId')),
                        minDiemKhoiTaoFilter: $('#MinDiemKhoiTaoFilterId').val(),
                        maxDiemKhoiTaoFilter: $('#MaxDiemKhoiTaoFilterId').val(),
                        minDoanhSoKhoiTaoFilter: $('#MinDoanhSoKhoiTaoFilterId').val(),
                        maxDoanhSoKhoiTaoFilter: $('#MaxDoanhSoKhoiTaoFilterId').val(),
                        iD_NguoiGioiThieuFilter: $('#ID_NguoiGioiThieuFilterId').val(),
                        capTai_DKKDFilter: $('#CapTai_DKKDFilterId').val(),
                        diaChiFilter: $('#DiaChiFilterId').val(),
                        gioiTinhNamFilter: $('#GioiTinhNamFilterId').val(),
                        nganHangFilter: $('#NganHangFilterId').val(),
                        minNgayCapCMTND_DKKDFilter: getDateFilter($('#MinNgayCapCMTND_DKKDFilterId')),
                        maxNgayCapCMTND_DKKDFilter: getMaxDateFilter($('#MaxNgayCapCMTND_DKKDFilterId')),
                        noiCapCMTND_DKKDFilter: $('#NoiCapCMTND_DKKDFilterId').val(),
                        sDT_CoQuanFilter: $('#SDT_CoQuanFilterId').val(),
                        sDT_NhaRiengFilter: $('#SDT_NhaRiengFilterId').val(),
                        soCMTND_DKKDFilter: $('#SoCMTND_DKKDFilterId').val(),
                        thuongTruFilter: $('#ThuongTruFilterId').val(),
                        xungHoFilter: $('#XungHoFilterId').val(),
                        minNgayGiaoDichGanNhatFilter: getDateFilter($('#MinNgayGiaoDichGanNhatFilterId')),
                        maxNgayGiaoDichGanNhatFilter: getMaxDateFilter($('#MaxNgayGiaoDichGanNhatFilterId')),
                        tenNguonKhachFilter: $('#TenNguonKhachFilterId').val(),
                        tenNhomFilter: $('#TenNhomFilterId').val(),
                        chucVuFilter: $('#ChucVuFilterId').val(),
                        linhVucFilter: $('#LinhVucFilterId').val(),
                        tenKhacFilter: $('#TenKhacFilterId').val(),
                        diaChiKhacFilter: $('#DiaChiKhacFilterId').val(),
                        minNgaySuaTrangThaiFilter: getDateFilter($('#MinNgaySuaTrangThaiFilterId')),
                        maxNgaySuaTrangThaiFilter: getMaxDateFilter($('#MaxNgaySuaTrangThaiFilterId')),
                        minID_DonViQuanLyFilter: $('#MinID_DonViQuanLyFilterId').val(),
                        maxID_DonViQuanLyFilter: $('#MaxID_DonViQuanLyFilterId').val(),
                        customerManagementOrganizationCodeFilter: $('#CustomerManagementOrganizationCodeFilterId').val(),
                        customerManagementOrganizationNameFilter: $('#CustomerManagementOrganizationNameFilterId').val(),
                        iD_NhomCuFilter: $('#ID_NhomCuFilterId').val(),
                        minID_NhanVienPhuTrachFilter: $('#MinID_NhanVienPhuTrachFilterId').val(),
                        maxID_NhanVienPhuTrachFilter: $('#MaxID_NhanVienPhuTrachFilterId').val(),
                        minTongDiemFilter: $('#MinTongDiemFilterId').val(),
                        maxTongDiemFilter: $('#MaxTongDiemFilterId').val(),
                        fileDinhKemsFilter: $('#FileDinhKemsFilterId').val(),
                        maFilter: $('#MaFilterId').val(),
                        profileFilter: $('#ProfileFilterId').val(),
                        isNewCustomerFilter: $('#IsNewCustomerFilterId').val(),
                        minOrderFilter: $('#MinOrderFilterId').val(),
                        maxOrderFilter: $('#MaxOrderFilterId').val(),
                        minCreationTimeFilter: getDateFilter($('#MinCreationTimeFilterId')),
                        maxCreationTimeFilter: getMaxDateFilter($('#MaxCreationTimeFilterId')),
                        minLastModificationTimeFilter: getDateFilter($('#MinLastModificationTimeFilterId')),
                        maxLastModificationTimeFilter: getMaxDateFilter($('#MaxLastModificationTimeFilterId')),
                        isDeletedFilter: $('#IsDeletedFilterId').val(),
                        minDeletionTimeFilter: getDateFilter($('#MinDeletionTimeFilterId')),
                        maxDeletionTimeFilter: getMaxDateFilter($('#MaxDeletionTimeFilterId'))
                    };
                }
            },
            columnDefs: [{
                    className: 'control responsive',
                    orderable: false,
                    render: function() {
                        return '';
                    },
                    targets: 0
                },
                {
                    width: 120,
                    targets: 1,
                    data: null,
                    orderable: false,
                    autoWidth: false,
                    defaultContent: '',
                    rowAction: {
                        cssClass: 'btn btn-brand dropdown-toggle',
                        text: '<i class="fa fa-cog"></i> ' + app.localize('Actions') + ' <span class="caret"></span>',
                        items: [{
                                text: app.localize('View'),
                                iconStyle: 'far fa-eye mr-2',
                                action: function(data) {
                                    _viewDM_DoiTuongModal.open({
                                        id: data.record.dM_DoiTuong.id
                                    });
                                }
                            },
                            {
                                text: app.localize('Edit'),
                                iconStyle: 'far fa-edit mr-2',
                                visible: function() {
                                    return _permissions.edit;
                                },
                                action: function(data) {
                                    _createOrEditModal.open({
                                        id: data.record.dM_DoiTuong.id
                                    });
                                }
                            },
                            {
                                text: app.localize('History'),
                                iconStyle: 'fas fa-history mr-2',
                                visible: function() {
                                    return entityHistoryIsEnabled();
                                },
                                action: function(data) {
                                    _entityTypeHistoryModal.open({
                                        entityTypeFullName: _entityTypeFullName,
                                        entityId: data.record.dM_DoiTuong.id
                                    });
                                }
                            },
                            {
                                text: app.localize('Delete'),
                                iconStyle: 'far fa-trash-alt mr-2',
                                visible: function() {
                                    return _permissions.delete;
                                },
                                action: function(data) {
                                    deleteDM_DoiTuong(data.record.dM_DoiTuong);
                                }
                            }
                        ]
                    }
                },
                {
                    targets: 2,
                    data: "dM_DoiTuong.loaiDoiTuong",
                    name: "loaiDoiTuong"
                },
                {
                    targets: 3,
                    data: "dM_DoiTuong.laCaNhan",
                    name: "laCaNhan",
                    render: function(laCaNhan) {
                        if (laCaNhan) {
                            return '<div class="text-center"><i class="fa fa-check text-success" title="True"></i></div>';
                        }
                        return '<div class="text-center"><i class="fa fa-times-circle" title="False"></i></div>';
                    }
                },
                {
                    targets: 4,
                    data: "dM_DoiTuong.maDoiTuong",
                    name: "maDoiTuong"
                },
                {
                    targets: 5,
                    data: "dM_DoiTuong.tenDoiTuong",
                    name: "tenDoiTuong"
                },
                {
                    targets: 6,
                    data: "dM_DoiTuong.dienThoai",
                    name: "dienThoai"
                },
                {
                    targets: 7,
                    data: "dM_DoiTuong.fax",
                    name: "fax"
                },
                {
                    targets: 8,
                    data: "dM_DoiTuong.email",
                    name: "email"
                },
                {
                    targets: 9,
                    data: "dM_DoiTuong.website",
                    name: "website"
                },
                {
                    targets: 10,
                    data: "dM_DoiTuong.anh",
                    name: "anh"
                },
                {
                    targets: 11,
                    data: "dM_DoiTuong.maSoThue",
                    name: "maSoThue"
                },
                {
                    targets: 12,
                    data: "dM_DoiTuong.taiKhoanNganHang",
                    name: "taiKhoanNganHang"
                },
                {
                    targets: 13,
                    data: "dM_DoiTuong.gioiHanCongNo",
                    name: "gioiHanCongNo"
                },
                {
                    targets: 14,
                    data: "dM_DoiTuong.ghiChu",
                    name: "ghiChu"
                },
                {
                    targets: 15,
                    data: "dM_DoiTuong.ngaySinh_NgayTLap",
                    name: "ngaySinh_NgayTLap",
                    render: function(ngaySinh_NgayTLap) {
                        if (ngaySinh_NgayTLap) {
                            return moment(ngaySinh_NgayTLap).format('L');
                        }
                        return "";
                    }
                },
                {
                    targets: 16,
                    data: "dM_DoiTuong.chiaSe",
                    name: "chiaSe",
                    render: function(chiaSe) {
                        if (chiaSe) {
                            return '<div class="text-center"><i class="fa fa-check text-success" title="True"></i></div>';
                        }
                        return '<div class="text-center"><i class="fa fa-times-circle" title="False"></i></div>';
                    }
                },
                {
                    targets: 17,
                    data: "dM_DoiTuong.theoDoi",
                    name: "theoDoi",
                    render: function(theoDoi) {
                        if (theoDoi) {
                            return '<div class="text-center"><i class="fa fa-check text-success" title="True"></i></div>';
                        }
                        return '<div class="text-center"><i class="fa fa-times-circle" title="False"></i></div>';
                    }
                },
                {
                    targets: 18,
                    data: "dM_DoiTuong.iD_Index",
                    name: "iD_Index"
                },
                {
                    targets: 19,
                    data: "dM_DoiTuong.theoDoiVanTay",
                    name: "theoDoiVanTay",
                    render: function(theoDoiVanTay) {
                        if (theoDoiVanTay) {
                            return '<div class="text-center"><i class="fa fa-check text-success" title="True"></i></div>';
                        }
                        return '<div class="text-center"><i class="fa fa-times-circle" title="False"></i></div>';
                    }
                },
                {
                    targets: 20,
                    data: "dM_DoiTuong.ngayDoiNhom",
                    name: "ngayDoiNhom",
                    render: function(ngayDoiNhom) {
                        if (ngayDoiNhom) {
                            return moment(ngayDoiNhom).format('L');
                        }
                        return "";
                    }
                },
                {
                    targets: 21,
                    data: "dM_DoiTuong.diemKhoiTao",
                    name: "diemKhoiTao"
                },
                {
                    targets: 22,
                    data: "dM_DoiTuong.doanhSoKhoiTao",
                    name: "doanhSoKhoiTao"
                },
                {
                    targets: 23,
                    data: "dM_DoiTuong.iD_NguoiGioiThieu",
                    name: "iD_NguoiGioiThieu"
                },
                {
                    targets: 24,
                    data: "dM_DoiTuong.capTai_DKKD",
                    name: "capTai_DKKD"
                },
                {
                    targets: 25,
                    data: "dM_DoiTuong.diaChi",
                    name: "diaChi"
                },
                {
                    targets: 26,
                    data: "dM_DoiTuong.gioiTinhNam",
                    name: "gioiTinhNam",
                    render: function(gioiTinhNam) {
                        if (gioiTinhNam) {
                            return '<div class="text-center"><i class="fa fa-check text-success" title="True"></i></div>';
                        }
                        return '<div class="text-center"><i class="fa fa-times-circle" title="False"></i></div>';
                    }
                },
                {
                    targets: 27,
                    data: "dM_DoiTuong.nganHang",
                    name: "nganHang"
                },
                {
                    targets: 28,
                    data: "dM_DoiTuong.ngayCapCMTND_DKKD",
                    name: "ngayCapCMTND_DKKD",
                    render: function(ngayCapCMTND_DKKD) {
                        if (ngayCapCMTND_DKKD) {
                            return moment(ngayCapCMTND_DKKD).format('L');
                        }
                        return "";
                    }
                },
                {
                    targets: 29,
                    data: "dM_DoiTuong.noiCapCMTND_DKKD",
                    name: "noiCapCMTND_DKKD"
                },
                {
                    targets: 30,
                    data: "dM_DoiTuong.sdT_CoQuan",
                    name: "sdT_CoQuan"
                },
                {
                    targets: 31,
                    data: "dM_DoiTuong.sdT_NhaRieng",
                    name: "sdT_NhaRieng"
                },
                {
                    targets: 32,
                    data: "dM_DoiTuong.soCMTND_DKKD",
                    name: "soCMTND_DKKD"
                },
                {
                    targets: 33,
                    data: "dM_DoiTuong.thuongTru",
                    name: "thuongTru"
                },
                {
                    targets: 34,
                    data: "dM_DoiTuong.xungHo",
                    name: "xungHo"
                },
                {
                    targets: 35,
                    data: "dM_DoiTuong.ngayGiaoDichGanNhat",
                    name: "ngayGiaoDichGanNhat",
                    render: function(ngayGiaoDichGanNhat) {
                        if (ngayGiaoDichGanNhat) {
                            return moment(ngayGiaoDichGanNhat).format('L');
                        }
                        return "";
                    }
                },
                {
                    targets: 36,
                    data: "dM_DoiTuong.tenNguonKhach",
                    name: "tenNguonKhach"
                },
                {
                    targets: 37,
                    data: "dM_DoiTuong.tenNhom",
                    name: "tenNhom"
                },
                {
                    targets: 38,
                    data: "dM_DoiTuong.chucVu",
                    name: "chucVu"
                },
                {
                    targets: 39,
                    data: "dM_DoiTuong.linhVuc",
                    name: "linhVuc"
                },
                {
                    targets: 40,
                    data: "dM_DoiTuong.tenKhac",
                    name: "tenKhac"
                },
                {
                    targets: 41,
                    data: "dM_DoiTuong.diaChiKhac",
                    name: "diaChiKhac"
                },
                {
                    targets: 42,
                    data: "dM_DoiTuong.ngaySuaTrangThai",
                    name: "ngaySuaTrangThai",
                    render: function(ngaySuaTrangThai) {
                        if (ngaySuaTrangThai) {
                            return moment(ngaySuaTrangThai).format('L');
                        }
                        return "";
                    }
                },
                {
                    targets: 43,
                    data: "dM_DoiTuong.iD_DonViQuanLy",
                    name: "iD_DonViQuanLy"
                },
                {
                    targets: 44,
                    data: "dM_DoiTuong.customerManagementOrganizationCode",
                    name: "customerManagementOrganizationCode"
                },
                {
                    targets: 45,
                    data: "dM_DoiTuong.customerManagementOrganizationName",
                    name: "customerManagementOrganizationName"
                },
                {
                    targets: 46,
                    data: "dM_DoiTuong.iD_NhomCu",
                    name: "iD_NhomCu"
                },
                {
                    targets: 47,
                    data: "dM_DoiTuong.iD_NhanVienPhuTrach",
                    name: "iD_NhanVienPhuTrach"
                },
                {
                    targets: 48,
                    data: "dM_DoiTuong.tongDiem",
                    name: "tongDiem"
                },
                {
                    targets: 49,
                    data: "dM_DoiTuong.fileDinhKems",
                    name: "fileDinhKems"
                },
                {
                    targets: 50,
                    data: "dM_DoiTuong.ma",
                    name: "ma"
                },
                {
                    targets: 51,
                    data: "dM_DoiTuong.profile",
                    name: "profile"
                },
                {
                    targets: 52,
                    data: "dM_DoiTuong.isNewCustomer",
                    name: "isNewCustomer",
                    render: function(isNewCustomer) {
                        if (isNewCustomer) {
                            return '<div class="text-center"><i class="fa fa-check text-success" title="True"></i></div>';
                        }
                        return '<div class="text-center"><i class="fa fa-times-circle" title="False"></i></div>';
                    }
                },
                {
                    targets: 53,
                    data: "dM_DoiTuong.order",
                    name: "order"
                },
                {
                    targets: 54,
                    data: "dM_DoiTuong.creationTime",
                    name: "creationTime",
                    render: function(creationTime) {
                        if (creationTime) {
                            return moment(creationTime).format('L');
                        }
                        return "";
                    }
                },
                {
                    targets: 55,
                    data: "dM_DoiTuong.lastModificationTime",
                    name: "lastModificationTime",
                    render: function(lastModificationTime) {
                        if (lastModificationTime) {
                            return moment(lastModificationTime).format('L');
                        }
                        return "";
                    }
                },
                {
                    targets: 56,
                    data: "dM_DoiTuong.isDeleted",
                    name: "isDeleted",
                    render: function(isDeleted) {
                        if (isDeleted) {
                            return '<div class="text-center"><i class="fa fa-check text-success" title="True"></i></div>';
                        }
                        return '<div class="text-center"><i class="fa fa-times-circle" title="False"></i></div>';
                    }
                },
                {
                    targets: 57,
                    data: "dM_DoiTuong.deletionTime",
                    name: "deletionTime",
                    render: function(deletionTime) {
                        if (deletionTime) {
                            return moment(deletionTime).format('L');
                        }
                        return "";
                    }
                }
            ]
        });

        function getDM_DoiTuong() {
            dataTable.ajax.reload();
        }

        function deleteDM_DoiTuong(dM_DoiTuong) {
            abp.message.confirm(
                '',
                app.localize('AreYouSure'),
                function(isConfirmed) {
                    if (isConfirmed) {
                        _dM_DoiTuongService.delete({
                            id: dM_DoiTuong.id
                        }).done(function() {
                            getDM_DoiTuong(true);
                            abp.notify.success(app.localize('SuccessfullyDeleted'));
                        });
                    }
                }
            );
        }
        $('#ShowAdvancedFiltersSpan').click(function() {
            $('#ShowAdvancedFiltersSpan').hide();
            $('#HideAdvancedFiltersSpan').show();
            $('#AdvacedAuditFiltersArea').slideDown();
        });
        $('#HideAdvancedFiltersSpan').click(function() {
            $('#HideAdvancedFiltersSpan').hide();
            $('#ShowAdvancedFiltersSpan').show();
            $('#AdvacedAuditFiltersArea').slideUp();
        });
        $('#CreateNewDM_DoiTuongButton').click(function() {
            _createOrEditModal.open();
        });
        $('#ExportToExcelButton').click(function() {
            _dM_DoiTuongService
                .getDM_DoiTuongToExcel({
                    filter: $('#DM_DoiTuongTableFilter').val(),
                    minLoaiDoiTuongFilter: $('#MinLoaiDoiTuongFilterId').val(),
                    maxLoaiDoiTuongFilter: $('#MaxLoaiDoiTuongFilterId').val(),
                    laCaNhanFilter: $('#LaCaNhanFilterId').val(),
                    maDoiTuongFilter: $('#MaDoiTuongFilterId').val(),
                    tenDoiTuongFilter: $('#TenDoiTuongFilterId').val(),
                    dienThoaiFilter: $('#DienThoaiFilterId').val(),
                    faxFilter: $('#FaxFilterId').val(),
                    emailFilter: $('#EmailFilterId').val(),
                    websiteFilter: $('#WebsiteFilterId').val(),
                    anhFilter: $('#AnhFilterId').val(),
                    maSoThueFilter: $('#MaSoThueFilterId').val(),
                    taiKhoanNganHangFilter: $('#TaiKhoanNganHangFilterId').val(),
                    minGioiHanCongNoFilter: $('#MinGioiHanCongNoFilterId').val(),
                    maxGioiHanCongNoFilter: $('#MaxGioiHanCongNoFilterId').val(),
                    ghiChuFilter: $('#GhiChuFilterId').val(),
                    minNgaySinh_NgayTLapFilter: getDateFilter($('#MinNgaySinh_NgayTLapFilterId')),
                    maxNgaySinh_NgayTLapFilter: getMaxDateFilter($('#MaxNgaySinh_NgayTLapFilterId')),
                    chiaSeFilter: $('#ChiaSeFilterId').val(),
                    theoDoiFilter: $('#TheoDoiFilterId').val(),
                    minID_IndexFilter: $('#MinID_IndexFilterId').val(),
                    maxID_IndexFilter: $('#MaxID_IndexFilterId').val(),
                    theoDoiVanTayFilter: $('#TheoDoiVanTayFilterId').val(),
                    minNgayDoiNhomFilter: getDateFilter($('#MinNgayDoiNhomFilterId')),
                    maxNgayDoiNhomFilter: getMaxDateFilter($('#MaxNgayDoiNhomFilterId')),
                    minDiemKhoiTaoFilter: $('#MinDiemKhoiTaoFilterId').val(),
                    maxDiemKhoiTaoFilter: $('#MaxDiemKhoiTaoFilterId').val(),
                    minDoanhSoKhoiTaoFilter: $('#MinDoanhSoKhoiTaoFilterId').val(),
                    maxDoanhSoKhoiTaoFilter: $('#MaxDoanhSoKhoiTaoFilterId').val(),
                    iD_NguoiGioiThieuFilter: $('#ID_NguoiGioiThieuFilterId').val(),
                    capTai_DKKDFilter: $('#CapTai_DKKDFilterId').val(),
                    diaChiFilter: $('#DiaChiFilterId').val(),
                    gioiTinhNamFilter: $('#GioiTinhNamFilterId').val(),
                    nganHangFilter: $('#NganHangFilterId').val(),
                    minNgayCapCMTND_DKKDFilter: getDateFilter($('#MinNgayCapCMTND_DKKDFilterId')),
                    maxNgayCapCMTND_DKKDFilter: getMaxDateFilter($('#MaxNgayCapCMTND_DKKDFilterId')),
                    noiCapCMTND_DKKDFilter: $('#NoiCapCMTND_DKKDFilterId').val(),
                    sDT_CoQuanFilter: $('#SDT_CoQuanFilterId').val(),
                    sDT_NhaRiengFilter: $('#SDT_NhaRiengFilterId').val(),
                    soCMTND_DKKDFilter: $('#SoCMTND_DKKDFilterId').val(),
                    thuongTruFilter: $('#ThuongTruFilterId').val(),
                    xungHoFilter: $('#XungHoFilterId').val(),
                    minNgayGiaoDichGanNhatFilter: getDateFilter($('#MinNgayGiaoDichGanNhatFilterId')),
                    maxNgayGiaoDichGanNhatFilter: getMaxDateFilter($('#MaxNgayGiaoDichGanNhatFilterId')),
                    tenNguonKhachFilter: $('#TenNguonKhachFilterId').val(),
                    tenNhomFilter: $('#TenNhomFilterId').val(),
                    chucVuFilter: $('#ChucVuFilterId').val(),
                    linhVucFilter: $('#LinhVucFilterId').val(),
                    tenKhacFilter: $('#TenKhacFilterId').val(),
                    diaChiKhacFilter: $('#DiaChiKhacFilterId').val(),
                    minNgaySuaTrangThaiFilter: getDateFilter($('#MinNgaySuaTrangThaiFilterId')),
                    maxNgaySuaTrangThaiFilter: getMaxDateFilter($('#MaxNgaySuaTrangThaiFilterId')),
                    minID_DonViQuanLyFilter: $('#MinID_DonViQuanLyFilterId').val(),
                    maxID_DonViQuanLyFilter: $('#MaxID_DonViQuanLyFilterId').val(),
                    customerManagementOrganizationCodeFilter: $('#CustomerManagementOrganizationCodeFilterId').val(),
                    customerManagementOrganizationNameFilter: $('#CustomerManagementOrganizationNameFilterId').val(),
                    iD_NhomCuFilter: $('#ID_NhomCuFilterId').val(),
                    minID_NhanVienPhuTrachFilter: $('#MinID_NhanVienPhuTrachFilterId').val(),
                    maxID_NhanVienPhuTrachFilter: $('#MaxID_NhanVienPhuTrachFilterId').val(),
                    minTongDiemFilter: $('#MinTongDiemFilterId').val(),
                    maxTongDiemFilter: $('#MaxTongDiemFilterId').val(),
                    fileDinhKemsFilter: $('#FileDinhKemsFilterId').val(),
                    maFilter: $('#MaFilterId').val(),
                    profileFilter: $('#ProfileFilterId').val(),
                    isNewCustomerFilter: $('#IsNewCustomerFilterId').val(),
                    minOrderFilter: $('#MinOrderFilterId').val(),
                    maxOrderFilter: $('#MaxOrderFilterId').val(),
                    minCreationTimeFilter: getDateFilter($('#MinCreationTimeFilterId')),
                    maxCreationTimeFilter: getMaxDateFilter($('#MaxCreationTimeFilterId')),
                    minLastModificationTimeFilter: getDateFilter($('#MinLastModificationTimeFilterId')),
                    maxLastModificationTimeFilter: getMaxDateFilter($('#MaxLastModificationTimeFilterId')),
                    isDeletedFilter: $('#IsDeletedFilterId').val(),
                    minDeletionTimeFilter: getDateFilter($('#MinDeletionTimeFilterId')),
                    maxDeletionTimeFilter: getMaxDateFilter($('#MaxDeletionTimeFilterId'))
                })
                .done(function(result) {
                    app.downloadTempFile(result);
                });
        });
        abp.event.on('app.createOrEditDM_DoiTuongModalSaved', function() {
            getDM_DoiTuong();
        });
        $('#GetDM_DoiTuongButton').click(function(e) {
            e.preventDefault();
            getDM_DoiTuong();
        });
        $(document).keypress(function(e) {
            if (e.which === 13) {
                getDM_DoiTuong();
            }
        });
    });
})();