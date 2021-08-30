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