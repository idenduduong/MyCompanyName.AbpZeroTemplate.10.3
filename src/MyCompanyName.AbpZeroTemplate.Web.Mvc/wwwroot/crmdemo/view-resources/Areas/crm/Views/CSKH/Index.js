(function () {
    $(function () {

        var _$dM_DoiTuongsTable = $('#DM_DoiTuongsTable');
        var _dM_DoiTuongsService = abp.services.app.dM_DoiTuongs;
        var _HappyCallController = null;
        var _KhieuNaiController = null;
        var _PhieuKhaoSatController = null;
        var _cskhService = abp.services.app.cSKH;
        function getCurrentKhachHang() {
            var count = lstKhachHang.rows({ selected: true }).count();

            if (count > 0) {
                return lstKhachHang.rows({ selected: true }).data()[0].dM_DoiTuong.id;
            }
            return null;
        };

        var PhieuKhaoSatController = function () {
            var _$hoaDonBanLesTable = $('#PhieuKhaoSatTable');
            var _hoaDonBanLesService = abp.services.app.hoaDonBanLes;
            var _cskhService = abp.services.app.cSKH;
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
                    ajaxFunction: _cskhService.getAllPhieuKhaoSats,
                    inputFilter: function () {
                        return {
                            filter: $('#HoaDonBanLesTableFilter').val(),
                            khachHangId: getCurrentKhachHang(),
                            maHoaDonFilter: $('#MaHoaDonFilterId').val(),
                            minGioVaoFilter: $('#MinGioVaoFilterId').val(),
                            maxGioVaoFilter: $('#MaxGioVaoFilterId').val(),
                            minGioRaFilter: $('#MinGioRaFilterId').val(),
                            maxGioRaFilter: $('#MaxGioRaFilterId').val(),
                            dienThoai_KhachHangFilter: $('#DienThoai_KhachHangFilterId').val(),
                            userLapFilter: $('#UserLapFilterId').val(),
                            minNgayVaoSoFilter: $('#MinNgayVaoSoFilterId').val(),
                            maxNgayVaoSoFilter: $('#MaxNgayVaoSoFilterId').val(),
                            yeuCauFilter: $('#YeuCauFilterId').val(),
                            maNhanVienThucHienFilter: $('#MaNhanVienThucHienFilterId').val(),
                            tenNhanVienThucHienFilter: $('#TenNhanVienThucHienFilterId').val(),
                            maNhanVienTuVanFilter: $('#MaNhanVienTuVanFilterId').val(),
                            tenNhanVienTuVanFilter: $('#TenNhanVienTuVanFilterId').val(),
                            maTheLanFilter: $('#MaTheLanFilterId').val(),
                            maTheGiaTriFilter: $('#MaTheGiaTriFilterId').val(),
                            dM_DoiTuongTenDoiTuongFilter: $('#DM_DoiTuongTenDoiTuongFilterId').val()
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
                                        _viewHoaDonBanLeModal.open({ data: data.record });
                                    }
                                },
                                {
                                    text: app.localize('Edit'),
                                    visible: function () {
                                        return _permissions.edit;
                                    },
                                    action: function (data) {
                                        _createOrEditModal.open({ id: data.record.hoaDonBanLe.id });
                                    }
                                },
                                {
                                    text: app.localize('Delete'),
                                    visible: function () {
                                        return _permissions.delete;
                                    },
                                    action: function (data) {
                                        deleteHoaDonBanLe(data.record.hoaDonBanLe);
                                    }
                                },
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
                    {
                        targets: 1,
                        data: "hoaDonBanLe.maHoaDon"
                    },
                    {
                        targets: 2,
                        data: "hoaDonBanLe.ngayLapHoaDon",
                        render: function (ngayLapHoaDon) {
                            if (ngayLapHoaDon) {
                                return moment(ngayLapHoaDon).format('L');
                            }
                            return "";
                        }

                    },
                    {
                        targets: 3,
                        data: "hoaDonBanLe.gioVao",
                        render: function (gioVao) {
                            if (gioVao) {
                                return moment(gioVao).format('L');
                            }
                            return "";
                        }

                    },
                    {
                        targets: 4,
                        data: "hoaDonBanLe.gioRa",
                        render: function (gioRa) {
                            if (gioRa) {
                                return moment(gioRa).format('L');
                            }
                            return "";
                        }

                    },
                    {
                        targets: 5,
                        data: "hoaDonBanLe.tongTienHang"
                    },
                    {
                        targets: 6,
                        data: "hoaDonBanLe.tongChietKhau"
                    },
                    {
                        targets: 7,
                        data: "hoaDonBanLe.phaiThanhToan"
                    },
                    {
                        targets: 8,
                        data: "hoaDonBanLe.dienGiai"
                    },
                    
                    {
                        targets: 9,
                        data: "hoaDonBanLe.userLap"
                    },
                    
                    {
                        targets: 10,
                        data: "hoaDonBanLe.yeuCau"
                    },
                    {
                        targets: 11,
                        data: "dM_ViTriTenViTri"
                    },
                    {
                        targets: 12,
                        data: "organizationUnitDisplayName"
                    }
                ]
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
            return true;
        };
        var HappyCallController = function () {
            var _$happyCallsTable = $('#HappyCallsTable');
            var _happyCallsService = abp.services.app.happyCalls;
            var _cskhService = abp.services.app.cSKH;
            
            $('.date-picker').datetimepicker({
                locale: abp.localization.currentLanguage.name,
                format: 'L'
            });

            var _permissions = {
                create: abp.auth.hasPermission('Pages.HappyCalls.Create'),
                edit: abp.auth.hasPermission('Pages.HappyCalls.Edit'),
                'delete': abp.auth.hasPermission('Pages.HappyCalls.Delete')
            };

            var _createOrEditModal = new app.ModalManager({
                viewUrl: abp.appPath + 'crm/HappyCalls/CreateOrEditModal',
                scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/HappyCalls/_CreateOrEditModal.js',
                modalClass: 'CreateOrEditHappyCallModal',
                width: "60%"
            });

            var _viewHappyCallModal = new app.ModalManager({
                viewUrl: abp.appPath + 'crm/HappyCalls/ViewhappyCallModal',
                modalClass: 'ViewHappyCallModal'
            });

            var dataTable = _$happyCallsTable.DataTable({
                paging: true,
                serverSide: true,
                processing: true,
                listAction: {
                    ajaxFunction: _cskhService.getAllHappyCalls,
                    inputFilter: function () {
                        return {
                            filter: $('#HappyCallsTableFilter').val(),
                            khachHangId: getCurrentKhachHang(),
                            minCSKHFilter: $('#MinCSKHFilterId').val(),
                            maxCSKHFilter: $('#MaxCSKHFilterId').val(),
                            minKeToanFilter: $('#MinKeToanFilterId').val(),
                            maxKeToanFilter: $('#MaxKeToanFilterId').val(),
                            minKTVFilter: $('#MinKTVFilterId').val(),
                            maxKTVFilter: $('#MaxKTVFilterId').val(),
                            minVienTruongFilter: $('#MinVienTruongFilterId').val(),
                            maxVienTruongFilter: $('#MaxVienTruongFilterId').val(),
                            minSaleFilter: $('#MinSaleFilterId').val(),
                            maxSaleFilter: $('#MaxSaleFilterId').val(),
                            minTongQuanFilter: $('#MinTongQuanFilterId').val(),
                            maxTongQuanFilter: $('#MaxTongQuanFilterId').val(),
                            minLichHenFilter: $('#MinLichHenFilterId').val(),
                            maxLichHenFilter: $('#MaxLichHenFilterId').val(),
                            minStatusFilter: $('#MinStatusFilterId').val(),
                            maxStatusFilter: $('#MaxStatusFilterId').val(),
                            minGoiLan1Filter: $('#MinGoiLan1FilterId').val(),
                            maxGoiLan1Filter: $('#MaxGoiLan1FilterId').val(),
                            minGoiLan2Filter: $('#MinGoiLan2FilterId').val(),
                            maxGoiLan2Filter: $('#MaxGoiLan2FilterId').val(),
                            minGoiLan3Filter: $('#MinGoiLan3FilterId').val(),
                            maxGoiLan3Filter: $('#MaxGoiLan3FilterId').val(),
                            minGoiLan4Filter: $('#MinGoiLan4FilterId').val(),
                            maxGoiLan4Filter: $('#MaxGoiLan4FilterId').val(),
                            theKhachHangMaTheFilter: $('#TheKhachHangMaTheFilterId').val(),
                            dM_HangHoaTenHangHoaFilter: $('#DM_HangHoaTenHangHoaFilterId').val(),
                            userNameFilter: $('#UserNameFilterId').val(),
                            dM_DoiTuongMaDoiTuongFilter: $('#DM_DoiTuongMaDoiTuongFilterId').val()
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
                                //{
                                //    text: app.localize('View'),
                                //    action: function (data) {
                                //        _viewHappyCallModal.open({ data: data.record });
                                //    }
                                //},
                                {
                                    text: app.localize('Edit'),
                                    visible: function () {
                                        return _permissions.edit;
                                    },
                                    action: function (data) {
                                        _createOrEditModal.open({ id: data.record.happyCall.id });
                                    }
                                },
                                {
                                    text: app.localize('Delete'),
                                    visible: function () {
                                        return _permissions.delete;
                                    },
                                    action: function (data) {
                                        deleteHappyCall(data.record.happyCall);
                                    }
                                }]
                        }
                    },
                    {
                        targets: 1,
                        data: "theKhachHangMaThe"
                    },
                    {
                        targets: 2,
                        data: "dM_HangHoaTenHangHoa"
                    },
                    {
                        targets: 3,
                        data: "status",
                        render: function (data) {
                            return app.localize(data);
                        }
                    },
                    {
                        targets: 4,
                        data: "firstCall",
                        render: function (data) {
                            return app.localize(data);
                        }
                    },
                    {
                        targets: 5,
                        data: "secondCall",
                        render: function (data) {
                            return app.localize(data);
                        }
                    },
                    {
                        targets: 6,
                        data: "thirdCall",
                        render: function (data) {
                            return app.localize(data);
                        }
                    },
                    {
                        targets: 7,
                        data: "fourthCall",
                        render: function (data) {
                            return app.localize(data);
                        }
                    },
                    {
                        targets: 8,
                        data: "cskh",
                        render: function (data) {
                            return app.localize(data);
                        }
                    },
                    {
                        targets: 9,
                        data: "keToan",
                        render: function (data) {
                            return app.localize(data);
                        }
                    },
                    {
                        targets: 10,
                        data: "ktv",
                        render: function (data) {
                            return app.localize(data);
                        }
                    },
                    {
                        targets: 11,
                        data: "vienTruong",
                        render: function (data) {
                            return app.localize(data);
                        }
                    },
                    {
                        targets: 12,
                        data: "sale",
                        render: function (data) {
                            return app.localize(data);
                        }
                    },
                    {
                        targets: 13,
                        data: "total",
                        render: function (data) {
                            return app.localize(data);
                        }
                    },
                    {
                        targets: 14,
                        data: "happyCall.lichHen",
                        render: function (lichHen) {
                            if (lichHen) {
                                return moment(lichHen).format('L');
                            }
                            return "";
                        }

                    },
                    {
                        targets: 15,
                        data: "userName"
                    },
                    
                ]
            });


            function getHappyCalls() {
                dataTable.ajax.reload();
            }

            function deleteHappyCall(happyCall) {
                abp.message.confirm(
                    '',
                    function (isConfirmed) {
                        if (isConfirmed) {
                            _happyCallsService.delete({
                                id: happyCall.id
                            }).done(function () {
                                getHappyCalls(true);
                                abp.notify.success(app.localize('SuccessfullyDeleted'));
                            });
                        }
                    }
                );
            }
            $('#CreateNewHappyCallButton').click(function () {
                if (getCurrentKhachHang() == null) {
                    return;
                }
                _createOrEditModal.open({khachHangId:getCurrentKhachHang()});
            });
            

            abp.event.on('app.createOrEditHappyCallModalSaved', function () {
                getHappyCalls();
            });

            $('#GetHappyCallsButton').click(function (e) {
                e.preventDefault();
                getHappyCalls();
            });

            $(document).keypress(function (e) {
                if (e.which === 13) {
                    getHappyCalls();
                }
            });
            return true;
        };
        var KhieuNaiController = function () {
            var _$quanLyKhieuNaisTable = $('#QuanLyKhieuNaisTable');
            var _quanLyKhieuNaisService = abp.services.app.quanLyKhieuNais;
            var _cskhService = abp.services.app.cSKH;
            $('.date-picker').datetimepicker({
                locale: abp.localization.currentLanguage.name,
                format: 'L'
            });

            var _permissions = {
                create: abp.auth.hasPermission('Pages.QuanLyKhieuNais.Create'),
                edit: abp.auth.hasPermission('Pages.QuanLyKhieuNais.Edit'),
                'delete': abp.auth.hasPermission('Pages.QuanLyKhieuNais.Delete')
            };

            var _createOrEditModal = new app.ModalManager({
                viewUrl: abp.appPath + 'crm/QuanLyKhieuNais/CreateOrEditModal',
                scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/QuanLyKhieuNais/_CreateOrEditModal.js',
                modalClass: 'CreateOrEditQuanLyKhieuNaiModal'
            });

            var _viewQuanLyKhieuNaiModal = new app.ModalManager({
                viewUrl: abp.appPath + 'crm/QuanLyKhieuNais/ViewquanLyKhieuNaiModal',
                modalClass: 'ViewQuanLyKhieuNaiModal'
            });

            var dataTable = _$quanLyKhieuNaisTable.DataTable({
                paging: true,
                serverSide: true,
                processing: true,
                listAction: {
                    ajaxFunction: _cskhService.getAllKhieuNais,
                    inputFilter: function () {
                        return {
                            filter: $('#QuanLyKhieuNaisTableFilter').val(),
                            khachHangId: getCurrentKhachHang(),
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
                                        _viewQuanLyKhieuNaiModal.open({ data: data.record });
                                    }
                                },
                                {
                                    text: app.localize('Edit'),
                                    visible: function () {
                                        return _permissions.edit;
                                    },
                                    action: function (data) {
                                        _createOrEditModal.open({ id: data.record.quanLyKhieuNai.id });
                                    }
                                },
                                {
                                    text: app.localize('Delete'),
                                    visible: function () {
                                        return _permissions.delete;
                                    },
                                    action: function (data) {
                                        deleteQuanLyKhieuNai(data.record.quanLyKhieuNai);
                                    }
                                }]
                        }
                    },
                    {
                        targets: 1,
                        data: "quanLyKhieuNai.status"
                    },
                    {
                        targets: 2,
                        data: "quanLyKhieuNai.goiLan1"
                    },
                    {
                        targets: 3,
                        data: "quanLyKhieuNai.goiLan2"
                    },
                    {
                        targets: 4,
                        data: "quanLyKhieuNai.goiLan3"
                    },
                    {
                        targets: 5,
                        data: "quanLyKhieuNai.vanDe"
                    },
                    {
                        targets: 6,
                        data: "quanLyKhieuNai.noiDungChiTiet"
                    },
                    
                    {
                        targets: 7,
                        data: "quanLyKhieuNai.huongGiaiQuyet"
                    },
                    {
                        targets: 8,
                        data: "dM_DoiTuongMaDoiTuong"
                    },
                    {
                        targets: 9,
                        data: "userName"
                    }
                ]
            });


            function getQuanLyKhieuNais() {
                dataTable.ajax.reload();
            }

            function deleteQuanLyKhieuNai(quanLyKhieuNai) {
                abp.message.confirm(
                    '',
                    function (isConfirmed) {
                        if (isConfirmed) {
                            _quanLyKhieuNaisService.delete({
                                id: quanLyKhieuNai.id
                            }).done(function () {
                                getQuanLyKhieuNais(true);
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

            $('#CreateNewQuanLyKhieuNaiButton').click(function () {
                if(getCurrentKhachHang() == null){
                    return
                }
            
                _createOrEditModal.open({khachHangId: getCurrentKhachHang()});
            });

            $('#ExportToExcelButton').click(function () {
                _quanLyKhieuNaisService
                    .getQuanLyKhieuNaisToExcel({
                        filter: $('#QuanLyKhieuNaisTableFilter').val(),
                        minGoiLan1Filter: $('#MinGoiLan1FilterId').val(),
                        maxGoiLan1Filter: $('#MaxGoiLan1FilterId').val(),
                        minGoiLan2Filter: $('#MinGoiLan2FilterId').val(),
                        maxGoiLan2Filter: $('#MaxGoiLan2FilterId').val(),
                        minGoiLan3Filter: $('#MinGoiLan3FilterId').val(),
                        maxGoiLan3Filter: $('#MaxGoiLan3FilterId').val(),
                        vanDeFilter: $('#VanDeFilterId').val(),
                        noiDungChiTietFilter: $('#NoiDungChiTietFilterId').val(),
                        minStatusFilter: $('#MinStatusFilterId').val(),
                        maxStatusFilter: $('#MaxStatusFilterId').val(),
                        huongGiaiQuyetFilter: $('#HuongGiaiQuyetFilterId').val(),
                        dM_DoiTuongMaDoiTuongFilter: $('#DM_DoiTuongMaDoiTuongFilterId').val(),
                        userNameFilter: $('#UserNameFilterId').val()
                    })
                    .done(function (result) {
                        app.downloadTempFile(result);
                    });
            });

            abp.event.on('app.createOrEditQuanLyKhieuNaiModalSaved', function () {
                getQuanLyKhieuNais();
            });

            $('#GetQuanLyKhieuNaisButton').click(function (e) {
                e.preventDefault();
                getQuanLyKhieuNais();
            });

            $(document).keypress(function (e) {
                if (e.which === 13) {
                    getQuanLyKhieuNais();
                }
            });

            return true;
        }
        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.DM_DoiTuongs.Create'),
            edit: abp.auth.hasPermission('Pages.DM_DoiTuongs.Edit'),
            'delete': abp.auth.hasPermission('Pages.DM_DoiTuongs.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_DoiTuongs/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_DoiTuongs/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditDM_DoiTuongModal'
        });

        var _viewDM_DoiTuongModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_DoiTuongs/ViewdM_DoiTuongModal',
            modalClass: 'ViewDM_DoiTuongModal'
        });

        var lstKhachHang = _$dM_DoiTuongsTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            select: {
                style: 'single'
            },
            listAction: {
                ajaxFunction: _cskhService.getAll,
                inputFilter: function () {
                    return {
                        filter: $('#DM_DoiTuongsTableFilter').val(),
                        maDoiTuongFilter: $('#MaDoiTuongFilterId').val(),
                        tenDoiTuongFilter: $('#TenDoiTuongFilterId').val(),
                        dienThoaiFilter: $('#DienThoaiFilterId').val(),
                        iD_NguoiGioiThieuFilter: $('#ID_NguoiGioiThieuFilterId').val(),
                        soCMTND_DKKDFilter: $('#SoCMTND_DKKDFilterId').val(),
                    };
                }
            },
            columnDefs: [
                {
                    targets: 0,
                    data: "dM_DoiTuong.anh"
                },
                {
                    targets: 1,
                    data: "dM_DoiTuong.maDoiTuong"
                },
                {
                    targets: 2,
                    data: "dM_DoiTuong.tenDoiTuong"
                },
                {
                    targets: 3,
                    data: "dM_DoiTuong.gioiTinhNam",
                    render: function (gioiTinhNam) {
                        if (gioiTinhNam) {
                            return app.localize("Nam");
                        }
                        return app.localize("Nu");
                    }

                },
                {
                    targets: 4,
                    data: "dM_DoiTuong.soCMTND_DKKD"
                },
                {
                    targets: 5,
                    data: "dM_DoiTuong.dienThoai"
                },
                {
                    targets: 6,
                    data: "dM_DoiTuong.email"
                },
                
                
                {
                    targets: 7,
                    data: "dM_DoiTuong.ngaySinh_NgayTLap",
                    render: function (ngaySinh_NgayTLap) {
                        if (ngaySinh_NgayTLap) {
                            return moment(ngaySinh_NgayTLap).format('L');
                        }
                        return "";
                    }

                },
                {
                    targets: 8,
                    data: "dM_NhomDoiTuongTenNhom"
                },
                {
                    targets: 9,
                    data: "dM_DoiTuong.ngayDoiNhom",
                    render: function (ngayDoiNhom) {
                        if (ngayDoiNhom) {
                            return moment(ngayDoiNhom).format('L');
                        }
                        return "";
                    }

                },
                {
                    targets: 10,
                    data: "nguoiGioiThieu"
                },
                {
                    targets: 11,
                    data: "dM_DoiTuong.diaChi"
                },
                {
                    targets: 12,
                    data: "dM_DoiTuong.ngayGiaoDichGanNhat",
                    render: function (ngayGiaoDichGanNhat) {
                        if (ngayGiaoDichGanNhat) {
                            return moment(ngayGiaoDichGanNhat).format('L');
                        }
                        return "";
                    }

                },

                {
                    targets: 13,
                    data: "nguonKhachHangTenNguonKhach"
                },
                
                
                {
                    targets: 14,
                    data: "dM_TinhThanhTenTinhThanh"
                },
                {
                    targets: 15,
                    data: "dM_QuanHuyenTenQuanHuyen"
                },
                {
                    targets: 16,
                    data: "dM_QuocGiaTenNuoc"
                },
                {
                    targets: 17,
                    data: "userName"
                },
                
                {
                    targets: 18,
                    data: "dM_DoiTuong.ghiChu"
                }
            ]
        });



        function getDM_DoiTuongs() {
            lstKhachHang.ajax.reload();
        }

        function deleteDM_DoiTuong(dM_DoiTuong) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _dM_DoiTuongsService.delete({
                            id: dM_DoiTuong.id
                        }).done(function () {
                            getDM_DoiTuongs(true);
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

        $('#CreateNewDM_DoiTuongButton').click(function () {
            _createOrEditModal.open();
        });

        $('#ExportToExcelButton').click(function () {
            _dM_DoiTuongsService
                .getDM_DoiTuongsToExcel({
                    filter: $('#DM_DoiTuongsTableFilter').val(),
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
                    minNgaySinh_NgayTLapFilter: $('#MinNgaySinh_NgayTLapFilterId').val(),
                    maxNgaySinh_NgayTLapFilter: $('#MaxNgaySinh_NgayTLapFilterId').val(),
                    chiaSeFilter: $('#ChiaSeFilterId').val(),
                    theoDoiFilter: $('#TheoDoiFilterId').val(),
                    minID_IndexFilter: $('#MinID_IndexFilterId').val(),
                    maxID_IndexFilter: $('#MaxID_IndexFilterId').val(),
                    theoDoiVanTayFilter: $('#TheoDoiVanTayFilterId').val(),
                    minNgayDoiNhomFilter: $('#MinNgayDoiNhomFilterId').val(),
                    maxNgayDoiNhomFilter: $('#MaxNgayDoiNhomFilterId').val(),
                    minDiemKhoiTaoFilter: $('#MinDiemKhoiTaoFilterId').val(),
                    maxDiemKhoiTaoFilter: $('#MaxDiemKhoiTaoFilterId').val(),
                    minDoanhSoKhoiTaoFilter: $('#MinDoanhSoKhoiTaoFilterId').val(),
                    maxDoanhSoKhoiTaoFilter: $('#MaxDoanhSoKhoiTaoFilterId').val(),
                    iD_NguoiGioiThieuFilter: $('#ID_NguoiGioiThieuFilterId').val(),
                    capTai_DKKDFilter: $('#CapTai_DKKDFilterId').val(),
                    diaChiFilter: $('#DiaChiFilterId').val(),
                    gioiTinhNamFilter: $('#GioiTinhNamFilterId').val(),
                    nganHangFilter: $('#NganHangFilterId').val(),
                    minNgayCapCMTND_DKKDFilter: $('#MinNgayCapCMTND_DKKDFilterId').val(),
                    maxNgayCapCMTND_DKKDFilter: $('#MaxNgayCapCMTND_DKKDFilterId').val(),
                    noiCapCMTND_DKKDFilter: $('#NoiCapCMTND_DKKDFilterId').val(),
                    sDT_CoQuanFilter: $('#SDT_CoQuanFilterId').val(),
                    sDT_NhaRiengFilter: $('#SDT_NhaRiengFilterId').val(),
                    soCMTND_DKKDFilter: $('#SoCMTND_DKKDFilterId').val(),
                    thuongTruFilter: $('#ThuongTruFilterId').val(),
                    xungHoFilter: $('#XungHoFilterId').val(),
                    minNgayGiaoDichGanNhatFilter: $('#MinNgayGiaoDichGanNhatFilterId').val(),
                    maxNgayGiaoDichGanNhatFilter: $('#MaxNgayGiaoDichGanNhatFilterId').val(),
                    tenNguonKhachFilter: $('#TenNguonKhachFilterId').val(),
                    tenNhomFilter: $('#TenNhomFilterId').val(),
                    chucVuFilter: $('#ChucVuFilterId').val(),
                    linhVucFilter: $('#LinhVucFilterId').val(),
                    ngheNghiepFilter: $('#NgheNghiepFilterId').val(),
                    tenKhacFilter: $('#TenKhacFilterId').val(),
                    diaChiKhacFilter: $('#DiaChiKhacFilterId').val(),
                    minNgaySuaTrangThaiFilter: $('#MinNgaySuaTrangThaiFilterId').val(),
                    maxNgaySuaTrangThaiFilter: $('#MaxNgaySuaTrangThaiFilterId').val(),
                    dM_NhomDoiTuongTenNhomFilter: $('#DM_NhomDoiTuongTenNhomFilterId').val(),
                    dM_TinhThanhTenTinhThanhFilter: $('#DM_TinhThanhTenTinhThanhFilterId').val(),
                    dM_QuanHuyenTenQuanHuyenFilter: $('#DM_QuanHuyenTenQuanHuyenFilterId').val(),
                    userNameFilter: $('#UserNameFilterId').val(),
                    nguonKhachHangTenNguonKhachFilter: $('#NguonKhachHangTenNguonKhachFilterId').val(),
                    dM_QuocGiaTenNuocFilter: $('#DM_QuocGiaTenNuocFilterId').val(),
                    dM_TrangThaiTenTrangThaiFilter: $('#DM_TrangThaiTenTrangThaiFilterId').val()
                })
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditDM_DoiTuongModalSaved', function () {
            getDM_DoiTuongs();
        });

        $('#GetDM_DoiTuongsButton').click(function (e) {
            e.preventDefault();
            getDM_DoiTuongs();
        });

        $('#HappyCallsTabLink').click(function (e) {
            
            e.preventDefault();
            _HappyCallController = _HappyCallController == null ? HappyCallController() : _HappyCallController;
        });
        $('#KhieuNaiTabLink').click(function (e) {
            
            e.preventDefault();
            _KhieuNaiController = _KhieuNaiController == null ? KhieuNaiController() : _KhieuNaiController;
        });
        $('#PhieuKhaoSatTabLink').click(function (e) {
            
            e.preventDefault();
            _PhieuKhaoSatController = _PhieuKhaoSatController == null ? PhieuKhaoSatController() : _PhieuKhaoSatController;
        });

        $('#HappyCallsTabLink').trigger("click");
        lstKhachHang
            .on('select', function (e, dt, type, indexes) {
                var data = lstKhachHang.row({ selected: true }).data();
                var tableName = $('.tab-pane.active').attr("table-name");
                $('#' + tableName).DataTable().ajax.reload();
            });

        $(document).keypress(function (e) {
            if (e.which === 13) {
                getDM_DoiTuongs();
            }
        });
    });
})();