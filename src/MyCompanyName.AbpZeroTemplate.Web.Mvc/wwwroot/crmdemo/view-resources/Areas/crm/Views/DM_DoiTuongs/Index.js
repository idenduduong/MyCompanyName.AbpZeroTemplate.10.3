(function () {
    $(function () {

        var _$dM_DoiTuongsTable = $('#DM_DoiTuongsTable');
        var _dM_DoiTuongsService = abp.services.app.dM_DoiTuongs;

        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });


        var _permissions = {
            create: abp.auth.hasPermission('Pages.DM_DoiTuongs.Create'),
            edit: abp.auth.hasPermission('Pages.DM_DoiTuongs.Edit'),
            'delete': abp.auth.hasPermission('Pages.DM_DoiTuongs.Delete'),
            editLater: abp.auth.hasPermission('Pages.DM_DoiTuongs.EditLater')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_DoiTuongs/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_DoiTuongs/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditDM_DoiTuongModal',
            width: "60%"
        });

		 var _viewDM_DoiTuongModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_DoiTuongs/ViewdM_DoiTuongModal',
            modalClass: 'ViewDM_DoiTuongModal'
        });
        var dataTable = _$dM_DoiTuongsTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
				//ajaxFunction: _dM_DoiTuongsService.GetAll,
                ajaxFunction: _dM_DoiTuongsService.getAllByDapper2,
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
            //columnDefs: [
            //    {
            //        width: 120,
            //        targets: 0,
            //        data: null,
            //        orderable: false,
            //        autoWidth: false,
            //        defaultContent: '',
            //        rowAction: {
            //            cssClass: 'btn btn-brand dropdown-toggle',
            //            text: '<i class="fa fa-cog"></i> ' + app.localize('Actions') + ' <span class="caret"></span>',
            //            items: [
            //                {
            //                    text: app.localize('Edit'),
            //                    visible: function (data) {
            //                        return (_permissions.edit && (new moment(data.record.dM_DoiTuong.creationTime)).format("DDMMYYYY") == (new moment()).format("DDMMYYYY"))
            //                            || (_permissions.editLater && (new moment(data.record.dM_DoiTuong.creationTime)).format("DDMMYYYY") != (new moment()).format("DDMMYYYY"));
            //                    },
            //                    action: function (data) {
            //                        _createOrEditModal.open({ id: data.record.dM_DoiTuong.id });
            //                    }
            //                },
            //                {
            //                    text: app.localize('Delete'),
            //                    visible: function (data) {
            //                        return (_permissions.delete && (new moment(data.record.dM_DoiTuong.creationTime)).format("DDMMYYYY") == (new moment()).format("DDMMYYYY"))
            //                            || (_permissions.delete && _permissions.editLater && (new moment(data.record.dM_DoiTuong.creationTime)).format("DDMMYYYY") != (new moment()).format("DDMMYYYY"));
            //                    },
            //                    action: function (data) {
            //                        deleteDM_DoiTuong(data.record.dM_DoiTuong);
            //                    }
            //                }]
            //        }
            //    },
            //    {
            //        targets: 1,
            //        data: "dM_NhomDoiTuongTenNhom"
            //    },
            //    {
            //        targets: 2,
            //        data: "donViQuanLy"
            //    },
            //    {
            //        targets: 3,
            //        data: "dM_DoiTuong.maDoiTuong"
            //    },
            //    {
            //        targets: 4,
            //        data: "dM_DoiTuong.tenDoiTuong"
            //    },
            //    {
            //        targets: 5,
            //        data: "dM_DoiTuong.dienThoai"
            //    },
            //    {
            //        targets: 6,
            //        data: "dM_DoiTuong.soCMTND_DKKD"
            //    },
            //    {
            //        targets: 7,
            //        data: "dM_DoiTuong.ngaySinh_NgayTLap",
            //        render: function (ngaySinh_NgayTLap) {
            //            if (ngaySinh_NgayTLap) {
            //                return moment(ngaySinh_NgayTLap).format('L');
            //            }
            //            return "";
            //        }

            //    },
            //    {
            //        targets: 8,
            //        data: "dM_DoiTuong.gioiTinhNam",
            //        render: function (gioiTinhNam) {
            //            if (gioiTinhNam) {
            //                return app.localize("Nam");
            //            }
            //            return app.localize("Nu");
            //        }

            //    },
            //    {
            //        targets: 9,
            //        data: "dM_DoiTuong.diaChi"
            //    },
            //    {
            //        targets: 10,
            //        data: "dM_DoiTuong.ngheNghiep"
            //    },
            //    {
            //        targets: 11,
            //        data: "dM_QuanHuyenTenQuanHuyen",

            //    },
            //    {
            //        targets: 12,
            //        data: "dM_TinhThanhTenTinhThanh"
            //    },
            //    {
            //        targets: 13,
            //        data: "dM_QuocGiaTenNuoc",

            //    },
            //    {
            //        targets: 14,
            //        data: "dM_DoiTuong.email"
            //    },
            //    {
            //        targets: 15,
            //        data: "nguonKhachHangTenNguonKhach"
            //    },
            //    //{
            //    //    targets: 13,
            //    //    data: "dM_DoiTuong.ngayGiaoDichGanNhat",
            //    //    render: function (ngayGiaoDichGanNhat) {
            //    //        if (ngayGiaoDichGanNhat) {
            //    //            return moment(ngayGiaoDichGanNhat).format('L');
            //    //        }
            //    //        return "";
            //    //    }

            //    //},

            //    //{
            //    //    targets: 14,
            //    //    data: "nguonKhachHangTenNguonKhach"
            //    //},


            //    //{
            //    //    targets: 15,
            //    //    data: "dM_TinhThanhTenTinhThanh"
            //    //},
            //    //{
            //    //    targets: 16,
            //    //    data: "dM_QuanHuyenTenQuanHuyen"
            //    //},
            //    //{
            //    //    targets: 17,
            //    //    data: "dM_QuocGiaTenNuoc"
            //    //},
            //    //{
            //    //    targets: 18,
            //    //    data: "userName"
            //    //},

            //    //{
            //    //    targets: 19,
            //    //    data: "dM_DoiTuong.ghiChu"
            //    //}
            //]
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
                            visible: function (data) {
                                return (_permissions.edit && (new moment(data.record.dM_DoiTuong.creationTime)).format("DDMMYYYY") == (new moment()).format("DDMMYYYY"))
                                    || (_permissions.editLater && (new moment(data.record.dM_DoiTuong.creationTime)).format("DDMMYYYY") != (new moment()).format("DDMMYYYY"));
                            },
                            action: function (data) {
                                _createOrEditModal.open({ id: data.record.dM_DoiTuong.id });
                            }
                        }, 
						{
                            text: app.localize('Delete'),
                            visible: function (data) {
                                return (_permissions.delete && (new moment(data.record.dM_DoiTuong.creationTime)).format("DDMMYYYY") == (new moment()).format("DDMMYYYY"))
                                    || (_permissions.delete && _permissions.editLater && (new moment(data.record.dM_DoiTuong.creationTime)).format("DDMMYYYY") != (new moment()).format("DDMMYYYY"));
                            },
                            action: function (data) {
                                deleteDM_DoiTuong(data.record.dM_DoiTuong);
                            }
                        }]
                    }
                },
                {
                    targets: 1,
                    data: "tenNhom"
                },
                {
                    targets: 2,
                    data: "donViQuanLy"
                },
                {
                    targets: 3,
                    data: "maDoiTuong"
                },
                {
                    targets: 4,
                    data: "tenDoiTuong"
                },
                {
                    targets: 5,
                    data: "dienThoai"
                },
                {
                    targets: 6,
                    data: "soCMTND_DKKD"
                },
                {
                    targets: 7,
                    data: "ngaySinh_NgayTLap",
                    render: function (ngaySinh_NgayTLap) {
                        if (ngaySinh_NgayTLap) {
                            return moment(ngaySinh_NgayTLap).format('L');
                        }
                        return "";
                    }

                },
                {
                    targets: 8,
                    data: "gioiTinhNam",
                    render: function (gioiTinhNam) {
                        if (gioiTinhNam) {
                            return app.localize("Nam");
                        }
                        return app.localize("Nu");
                    }

                },
                {
                    targets: 9,
                    data: "diaChi"
                },
                {
                    targets: 10,
                    data: "ngheNghiep"
                },
                {
                    targets: 11,
                    data: "dM_QuanHuyenTenQuanHuyen",
                    
                },
                {
                    targets: 12,
                    data: "dM_TinhThanhTenTinhThanh"
                },
                {
                    targets: 13,
                    data: "dM_QuocGiaTenNuoc",
                   
                },
                {
                    targets: 14,
                    data: "email"
                },
                {
                    targets: 15,
                    data: "nguonKhachHangTenNguonKhach"
                },
                //{
                //    targets: 13,
                //    data: "dM_DoiTuong.ngayGiaoDichGanNhat",
                //    render: function (ngayGiaoDichGanNhat) {
                //        if (ngayGiaoDichGanNhat) {
                //            return moment(ngayGiaoDichGanNhat).format('L');
                //        }
                //        return "";
                //    }

                //},

                //{
                //    targets: 14,
                //    data: "nguonKhachHangTenNguonKhach"
                //},


                //{
                //    targets: 15,
                //    data: "dM_TinhThanhTenTinhThanh"
                //},
                //{
                //    targets: 16,
                //    data: "dM_QuanHuyenTenQuanHuyen"
                //},
                //{
                //    targets: 17,
                //    data: "dM_QuocGiaTenNuoc"
                //},
                //{
                //    targets: 18,
                //    data: "userName"
                //},

                //{
                //    targets: 19,
                //    data: "dM_DoiTuong.ghiChu"
                //}
            ]
        });


        function getDM_DoiTuongs() {
            dataTable.ajax.reload();
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
				filter : $('#DM_DoiTuongsTableFilter').val(),
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

		$(document).keypress(function(e) {
		  if(e.which === 13) {
			getDM_DoiTuongs();
		  }
        });

        $('.preview').click(function () {
            alert('hahahaha');
        });

    });
})();