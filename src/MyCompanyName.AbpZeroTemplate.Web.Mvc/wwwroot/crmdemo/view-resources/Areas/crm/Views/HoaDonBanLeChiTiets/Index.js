(function () {
    $(function () {

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
            listAction: {
                ajaxFunction: _hoaDonBanLeChiTietsService.getAll,
                inputFilter: function () {
                    return {
					filter: $('#HoaDonBanLeChiTietsTableFilter').val(),
					minSoThuTuFilter: $('#MinSoThuTuFilterId').val(),
					maxSoThuTuFilter: $('#MaxSoThuTuFilterId').val(),
					minThoiGianFilter: $('#MinThoiGianFilterId').val(),
					maxThoiGianFilter: $('#MaxThoiGianFilterId').val(),
					minThoiGianBaoHanhFilter: $('#MinThoiGianBaoHanhFilterId').val(),
					maxThoiGianBaoHanhFilter: $('#MaxThoiGianBaoHanhFilterId').val(),
					minLoaiThoiGianBHFilter: $('#MinLoaiThoiGianBHFilterId').val(),
					maxLoaiThoiGianBHFilter: $('#MaxLoaiThoiGianBHFilterId').val(),
					iD_MaVachFilter: $('#ID_MaVachFilterId').val(),
					chatLieuFilter: $('#ChatLieuFilterId').val(),
					mauSacFilter: $('#MauSacFilterId').val(),
					kichCoFilter: $('#KichCoFilterId').val(),
					minSoLuongFilter: $('#MinSoLuongFilterId').val(),
					maxSoLuongFilter: $('#MaxSoLuongFilterId').val(),
					minDonGiaFilter: $('#MinDonGiaFilterId').val(),
					maxDonGiaFilter: $('#MaxDonGiaFilterId').val(),
					minThanhTienFilter: $('#MinThanhTienFilterId').val(),
					maxThanhTienFilter: $('#MaxThanhTienFilterId').val(),
					minPTChietKhauFilter: $('#MinPTChietKhauFilterId').val(),
					maxPTChietKhauFilter: $('#MaxPTChietKhauFilterId').val(),
					minTienChietKhauFilter: $('#MinTienChietKhauFilterId').val(),
					maxTienChietKhauFilter: $('#MaxTienChietKhauFilterId').val(),
					minTienThueFilter: $('#MinTienThueFilterId').val(),
					maxTienThueFilter: $('#MaxTienThueFilterId').val(),
					minPTChiPhiFilter: $('#MinPTChiPhiFilterId').val(),
					maxPTChiPhiFilter: $('#MaxPTChiPhiFilterId').val(),
					minTienChiPhiFilter: $('#MinTienChiPhiFilterId').val(),
					maxTienChiPhiFilter: $('#MaxTienChiPhiFilterId').val(),
					minThanhToanFilter: $('#MinThanhToanFilterId').val(),
					maxThanhToanFilter: $('#MaxThanhToanFilterId').val(),
					minGiaVonFilter: $('#MinGiaVonFilterId').val(),
					maxGiaVonFilter: $('#MaxGiaVonFilterId').val(),
					ghiChuFilter: $('#GhiChuFilterId').val(),
					userNhapFilter: $('#UserNhapFilterId').val(),
					minSoLanDaInFilter: $('#MinSoLanDaInFilterId').val(),
					maxSoLanDaInFilter: $('#MaxSoLanDaInFilterId').val(),
					iD_TangKemFilter: $('#ID_TangKemFilterId').val(),
					tangKemFilter: $('#TangKemFilterId').val(),
					minThoiGianThucHienFilter: $('#MinThoiGianThucHienFilterId').val(),
					maxThoiGianThucHienFilter: $('#MaxThoiGianThucHienFilterId').val(),
					minSoLuong_TLFilter: $('#MinSoLuong_TLFilterId').val(),
					maxSoLuong_TLFilter: $('#MaxSoLuong_TLFilterId').val(),
					minSoLuong_YCFilter: $('#MinSoLuong_YCFilterId').val(),
					maxSoLuong_YCFilter: $('#MaxSoLuong_YCFilterId').val(),
					chieuFilter: $('#ChieuFilterId').val(),
					sangFilter: $('#SangFilterId').val(),
					minPTThueFilter: $('#MinPTThueFilterId').val(),
					maxPTThueFilter: $('#MaxPTThueFilterId').val(),
					maNhanVienThucHienFilter: $('#MaNhanVienThucHienFilterId').val(),
					tenNhanVienThucHienFilter: $('#TenNhanVienThucHienFilterId').val(),
					maNhanVienTuVanFilter: $('#MaNhanVienTuVanFilterId').val(),
					tenNhanVienTuVanFilter: $('#TenNhanVienTuVanFilterId').val(),
					maTheLanFilter: $('#MaTheLanFilterId').val(),
					maTheGiaTriFilter: $('#MaTheGiaTriFilterId').val(),
					hoaDonBanLeMaHoaDonFilter: $('#HoaDonBanLeMaHoaDonFilterId').val(),
					dM_HangHoaTenHangHoaFilter: $('#DM_HangHoaTenHangHoaFilterId').val(),
					dM_KhoTenKhoFilter: $('#DM_KhoTenKhoFilterId').val(),
					dM_DonViTinhTenDonViTinhFilter: $('#DM_DonViTinhTenDonViTinhFilterId').val(),
					dM_LoHangSoLoFilter: $('#DM_LoHangSoLoFilterId').val(),
					dM_ThueSuatMaThueSuatFilter: $('#DM_ThueSuatMaThueSuatFilterId').val()
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
                                _createOrEditModal.open({ id: data.record.hoaDonBanLeChiTiet.id });
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
						 data: "hoaDonBanLeChiTiet.soThuTu"   
					},
					{
						targets: 2,
						 data: "hoaDonBanLeChiTiet.thoiGian" ,
					render: function (thoiGian) {
						if (thoiGian) {
							return moment(thoiGian).format('L');
						}
						return "";
					}
			  
					},
					{
						targets: 3,
						 data: "hoaDonBanLeChiTiet.thoiGianBaoHanh"   
					},
					{
						targets: 4,
						 data: "hoaDonBanLeChiTiet.loaiThoiGianBH"   
					},
					{
						targets: 5,
						 data: "hoaDonBanLeChiTiet.iD_MaVach"   
					},
					{
						targets: 6,
						 data: "hoaDonBanLeChiTiet.chatLieu"   
					},
					{
						targets: 7,
						 data: "hoaDonBanLeChiTiet.mauSac"   
					},
					{
						targets: 8,
						 data: "hoaDonBanLeChiTiet.kichCo"   
					},
					{
						targets: 9,
						 data: "hoaDonBanLeChiTiet.soLuong"   
					},
					{
						targets: 10,
                        data: "hoaDonBanLeChiTiet.donGia",
                        render: function (data) {
                            return '<span class="numeric-cell">' + $.number(data, 0) + '</span>'; 
                        }
					},
					{
						targets: 11,
                        data: "hoaDonBanLeChiTiet.thanhTien",
                        render: function (data) {
                            return '<span class="numeric-cell">' + $.number(data, 0) + '</span>'; 
                        }
					},
					{
						targets: 12,
                        data: "hoaDonBanLeChiTiet.pTChietKhau",
                        render: function (data) {
                            return '<span class="numeric-cell">' + $.number(data, 0) + '</span>'; 
                        }
					},
					{
						targets: 13,
                        data: "hoaDonBanLeChiTiet.tienChietKhau",
                        render: function (data) {
                            return '<span class="numeric-cell">' + $.number(data, 0) + '</span>'; 
                        }
					},
					{
						targets: 14,
                        data: "hoaDonBanLeChiTiet.tienThue",
                        render: function (data) {
                            return '<span class="numeric-cell">' + $.number(data, 0) + '</span>'; 
                        }
					},
					{
						targets: 15,
                        data: "hoaDonBanLeChiTiet.pTChiPhi",
                        render: function (data) {
                            return '<span class="numeric-cell">' + $.number(data, 0) + '</span>'; 
                        }
					},
					{
						targets: 16,
                        data: "hoaDonBanLeChiTiet.tienChiPhi",
                        render: function (data) {
                            return '<span class="numeric-cell">' + $.number(data, 0) + '</span>'; 
                        }
					},
					{
						targets: 17,
                        data: "hoaDonBanLeChiTiet.thanhToan",
                        render: function (data) {
                            return '<span class="numeric-cell">' + $.number(data, 0) + '</span>'; 
                        }
					},
					{
						targets: 18,
                        data: "hoaDonBanLeChiTiet.giaVon",
                        render: function (data) {
                            return '<span class="numeric-cell">' + $.number(data, 0) + '</span>'; 
                        }
					},
					{
						targets: 19,
						 data: "hoaDonBanLeChiTiet.ghiChu"   
					},
					{
						targets: 20,
						 data: "hoaDonBanLeChiTiet.userNhap"   
					},
					{
						targets: 21,
						 data: "hoaDonBanLeChiTiet.soLanDaIn"   
					},
					{
						targets: 22,
						 data: "hoaDonBanLeChiTiet.iD_TangKem"   
					},
					{
						targets: 23,
						 data: "hoaDonBanLeChiTiet.tangKem"  ,
						render: function (tangKem) {
							if (tangKem) {
								return '<i class="la la-check-square m--font-success" title="True"></i>';
							}
							return '<i class="la la-times-circle" title="False"></i>';
					}
			 
					},
					{
						targets: 24,
						 data: "hoaDonBanLeChiTiet.thoiGianThucHien"   
					},
					{
						targets: 25,
						 data: "hoaDonBanLeChiTiet.soLuong_TL"   
					},
					{
						targets: 26,
						 data: "hoaDonBanLeChiTiet.soLuong_YC"   
					},
					{
						targets: 27,
						 data: "hoaDonBanLeChiTiet.chieu"  ,
						render: function (chieu) {
							if (chieu) {
								return '<i class="la la-check-square m--font-success" title="True"></i>';
							}
							return '<i class="la la-times-circle" title="False"></i>';
					}
			 
					},
					{
						targets: 28,
						 data: "hoaDonBanLeChiTiet.sang"  ,
						render: function (sang) {
							if (sang) {
								return '<i class="la la-check-square m--font-success" title="True"></i>';
							}
							return '<i class="la la-times-circle" title="False"></i>';
					}
			 
					},
					{
						targets: 29,
                        data: "hoaDonBanLeChiTiet.pTThue",
                        render: function (data) {
                            return '<span class="numeric-cell">' + $.number(data, 0) + '</span>'; 
                        }
					},
					{
						targets: 30,
						 data: "hoaDonBanLeChiTiet.maNhanVienThucHien"   
					},
					{
						targets: 31,
						 data: "hoaDonBanLeChiTiet.tenNhanVienThucHien"   
					},
					{
						targets: 32,
						 data: "hoaDonBanLeChiTiet.maNhanVienTuVan"   
					},
					{
						targets: 33,
						 data: "hoaDonBanLeChiTiet.tenNhanVienTuVan"   
					},
					{
						targets: 34,
						 data: "hoaDonBanLeChiTiet.maTheLan"   
					},
					{
						targets: 35,
						 data: "hoaDonBanLeChiTiet.maTheGiaTri"   
					},
					{
						targets: 36,
						 data: "hoaDonBanLeMaHoaDon" 
					},
					{
						targets: 37,
						 data: "dM_HangHoaTenHangHoa" 
					},
					{
						targets: 38,
						 data: "dM_KhoTenKho" 
					},
					{
						targets: 39,
						 data: "dM_DonViTinhTenDonViTinh" 
					},
					{
						targets: 40,
						 data: "dM_LoHangSoLo" 
					},
					{
						targets: 41,
						 data: "dM_ThueSuatMaThueSuat" 
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

        $('#CreateNewHoaDonBanLeChiTietButton').click(function () {
            _createOrEditModal.open();
        });

		$('#ExportToExcelButton').click(function () {
            _hoaDonBanLeChiTietsService
                .getHoaDonBanLeChiTietsToExcel({
				filter : $('#HoaDonBanLeChiTietsTableFilter').val(),
					minSoThuTuFilter: $('#MinSoThuTuFilterId').val(),
					maxSoThuTuFilter: $('#MaxSoThuTuFilterId').val(),
					minThoiGianFilter: $('#MinThoiGianFilterId').val(),
					maxThoiGianFilter: $('#MaxThoiGianFilterId').val(),
					minThoiGianBaoHanhFilter: $('#MinThoiGianBaoHanhFilterId').val(),
					maxThoiGianBaoHanhFilter: $('#MaxThoiGianBaoHanhFilterId').val(),
					minLoaiThoiGianBHFilter: $('#MinLoaiThoiGianBHFilterId').val(),
					maxLoaiThoiGianBHFilter: $('#MaxLoaiThoiGianBHFilterId').val(),
					iD_MaVachFilter: $('#ID_MaVachFilterId').val(),
					chatLieuFilter: $('#ChatLieuFilterId').val(),
					mauSacFilter: $('#MauSacFilterId').val(),
					kichCoFilter: $('#KichCoFilterId').val(),
					minSoLuongFilter: $('#MinSoLuongFilterId').val(),
					maxSoLuongFilter: $('#MaxSoLuongFilterId').val(),
					minDonGiaFilter: $('#MinDonGiaFilterId').val(),
					maxDonGiaFilter: $('#MaxDonGiaFilterId').val(),
					minThanhTienFilter: $('#MinThanhTienFilterId').val(),
					maxThanhTienFilter: $('#MaxThanhTienFilterId').val(),
					minPTChietKhauFilter: $('#MinPTChietKhauFilterId').val(),
					maxPTChietKhauFilter: $('#MaxPTChietKhauFilterId').val(),
					minTienChietKhauFilter: $('#MinTienChietKhauFilterId').val(),
					maxTienChietKhauFilter: $('#MaxTienChietKhauFilterId').val(),
					minTienThueFilter: $('#MinTienThueFilterId').val(),
					maxTienThueFilter: $('#MaxTienThueFilterId').val(),
					minPTChiPhiFilter: $('#MinPTChiPhiFilterId').val(),
					maxPTChiPhiFilter: $('#MaxPTChiPhiFilterId').val(),
					minTienChiPhiFilter: $('#MinTienChiPhiFilterId').val(),
					maxTienChiPhiFilter: $('#MaxTienChiPhiFilterId').val(),
					minThanhToanFilter: $('#MinThanhToanFilterId').val(),
					maxThanhToanFilter: $('#MaxThanhToanFilterId').val(),
					minGiaVonFilter: $('#MinGiaVonFilterId').val(),
					maxGiaVonFilter: $('#MaxGiaVonFilterId').val(),
					ghiChuFilter: $('#GhiChuFilterId').val(),
					userNhapFilter: $('#UserNhapFilterId').val(),
					minSoLanDaInFilter: $('#MinSoLanDaInFilterId').val(),
					maxSoLanDaInFilter: $('#MaxSoLanDaInFilterId').val(),
					iD_TangKemFilter: $('#ID_TangKemFilterId').val(),
					tangKemFilter: $('#TangKemFilterId').val(),
					minThoiGianThucHienFilter: $('#MinThoiGianThucHienFilterId').val(),
					maxThoiGianThucHienFilter: $('#MaxThoiGianThucHienFilterId').val(),
					minSoLuong_TLFilter: $('#MinSoLuong_TLFilterId').val(),
					maxSoLuong_TLFilter: $('#MaxSoLuong_TLFilterId').val(),
					minSoLuong_YCFilter: $('#MinSoLuong_YCFilterId').val(),
					maxSoLuong_YCFilter: $('#MaxSoLuong_YCFilterId').val(),
					chieuFilter: $('#ChieuFilterId').val(),
					sangFilter: $('#SangFilterId').val(),
					minPTThueFilter: $('#MinPTThueFilterId').val(),
					maxPTThueFilter: $('#MaxPTThueFilterId').val(),
					maNhanVienThucHienFilter: $('#MaNhanVienThucHienFilterId').val(),
					tenNhanVienThucHienFilter: $('#TenNhanVienThucHienFilterId').val(),
					maNhanVienTuVanFilter: $('#MaNhanVienTuVanFilterId').val(),
					tenNhanVienTuVanFilter: $('#TenNhanVienTuVanFilterId').val(),
					maTheLanFilter: $('#MaTheLanFilterId').val(),
					maTheGiaTriFilter: $('#MaTheGiaTriFilterId').val(),
					hoaDonBanLeMaHoaDonFilter: $('#HoaDonBanLeMaHoaDonFilterId').val(),
					dM_HangHoaTenHangHoaFilter: $('#DM_HangHoaTenHangHoaFilterId').val(),
					dM_KhoTenKhoFilter: $('#DM_KhoTenKhoFilterId').val(),
					dM_DonViTinhTenDonViTinhFilter: $('#DM_DonViTinhTenDonViTinhFilterId').val(),
					dM_LoHangSoLoFilter: $('#DM_LoHangSoLoFilterId').val(),
					dM_ThueSuatMaThueSuatFilter: $('#DM_ThueSuatMaThueSuatFilterId').val()
				})
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditHoaDonBanLeChiTietModalSaved', function () {
            getHoaDonBanLeChiTiets();
        });

		$('#GetHoaDonBanLeChiTietsButton').click(function (e) {
            e.preventDefault();
            getHoaDonBanLeChiTiets();
        });

		$(document).keypress(function(e) {
		  if(e.which === 13) {
			getHoaDonBanLeChiTiets();
		  }
		});

    });
})();