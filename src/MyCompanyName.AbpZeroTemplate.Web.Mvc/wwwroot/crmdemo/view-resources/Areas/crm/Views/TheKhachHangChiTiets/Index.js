(function () {
    $(function () {

        var _$theKhachHangChiTietsTable = $('#TheKhachHangChiTietsTable');
        var _theKhachHangChiTietsService = abp.services.app.theKhachHangChiTiets;

        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.TheKhachHangChiTiets.Create'),
            edit: abp.auth.hasPermission('Pages.TheKhachHangChiTiets.Edit'),
            'delete': abp.auth.hasPermission('Pages.TheKhachHangChiTiets.Delete')
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

        var dataTable = _$theKhachHangChiTietsTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _theKhachHangChiTietsService.getAll,
                inputFilter: function () {
                    return {
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
                                    _viewTheKhachHangChiTietModal.open({ data: data.record });
                                }
                        },
						{
                            text: app.localize('Edit'),
                            visible: function () {
                                return _permissions.edit;
                            },
                            action: function (data) {
                                _createOrEditModal.open({ id: data.record.theKhachHangChiTiet.id });
                            }
                        }, 
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
						 data: "theKhachHangChiTiet.soLuong"   
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
                        data: "theKhachHangChiTiet.pTChietKhau",
                        render: function (data) {
                            return '<span class="numeric-cell">' + $.number(data, 0) + '</span>'; 
                        }
					},
					{
						targets: 4,
                        data: "theKhachHangChiTiet.tienChietKhau",
                        render: function (data) {
                            return '<span class="numeric-cell">' + $.number(data, 0) + '</span>'; 
                        }
					},
					{
						targets: 5,
                        data: "theKhachHangChiTiet.thanhToan",
                        render: function (data) {
                            return '<span class="numeric-cell">' + $.number(data, 0) + '</span>'; 
                        }
					},
					{
						targets: 6,
						 data: "theKhachHangChiTiet.ghiChu"   
					},
					{
						targets: 7,
						 data: "theKhachHangChiTiet.soLuongTang"   
					},
					{
						targets: 8,
						 data: "theKhachHangChiTiet.ngayTraLai" ,
					render: function (ngayTraLai) {
						if (ngayTraLai) {
							return moment(ngayTraLai).format('L');
						}
						return "";
					}
			  
					},
					{
						targets: 9,
						 data: "theKhachHangChiTiet.soLuongTraLai"   
					},
					{
						targets: 10,
                        data: "theKhachHangChiTiet.tienDaSuDung",
                        render: function (data) {
                            return '<span class="numeric-cell">' + $.number(data, 0) + '</span>'; 
                        }
					},
					{
						targets: 11,
						 data: "theKhachHangChiTiet.traLaiHHDV"  ,
						render: function (traLaiHHDV) {
							if (traLaiHHDV) {
								return '<i class="la la-check-square m--font-success" title="True"></i>';
							}
							return '<i class="la la-times-circle" title="False"></i>';
					}
			 
					},
					{
						targets: 12,
						 data: "theKhachHangChiTiet.iD_SanPhamChinh"   
					},
					{
						targets: 13,
						 data: "theKhachHangChiTiet.laTangKem"  ,
						render: function (laTangKem) {
							if (laTangKem) {
								return '<i class="la la-check-square m--font-success" title="True"></i>';
							}
							return '<i class="la la-times-circle" title="False"></i>';
					}
			 
					},
					{
						targets: 14,
						 data: "theKhachHangChiTiet.soLuongDaSuDung"   
					},
					{
						targets: 15,
						 data: "theKhachHangMaThe" 
					},
					{
						targets: 16,
						 data: "dM_HangHoaTenHangHoa" 
					}
            ]
        });


        function getTheKhachHangChiTiets() {
            dataTable.ajax.reload();
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

        $('#CreateNewTheKhachHangChiTietButton').click(function () {
            _createOrEditModal.open();
        });

		$('#ExportToExcelButton').click(function () {
            _theKhachHangChiTietsService
                .getTheKhachHangChiTietsToExcel({
				filter : $('#TheKhachHangChiTietsTableFilter').val(),
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

		$('#GetTheKhachHangChiTietsButton').click(function (e) {
            e.preventDefault();
            getTheKhachHangChiTiets();
        });

		$(document).keypress(function(e) {
		  if(e.which === 13) {
			getTheKhachHangChiTiets();
		  }
		});

    });
})();