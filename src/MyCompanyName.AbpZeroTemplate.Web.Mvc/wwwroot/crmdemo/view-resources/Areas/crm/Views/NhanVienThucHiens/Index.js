(function () {
    $(function () {

        var _$nhanVienThucHiensTable = $('#NhanVienThucHiensTable');
        var _nhanVienThucHiensService = abp.services.app.nhanVienThucHiens;

        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.TheKhachHang.Create'),
            edit: abp.auth.hasPermission('Pages.TheKhachHang.Edit'),
            'delete': abp.auth.hasPermission('Pages.TheKhachHang.Edit')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/NhanVienThucHiens/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/NhanVienThucHiens/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditNhanVienThucHienModal'
        });

		 var _viewNhanVienThucHienModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/NhanVienThucHiens/ViewnhanVienThucHienModal',
            modalClass: 'ViewNhanVienThucHienModal'
        });

        var dataTable = _$nhanVienThucHiensTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _nhanVienThucHiensService.getAll,
                inputFilter: function () {
                    return {
					filter: $('#NhanVienThucHiensTableFilter').val(),
					maChungTuFilter: $('#MaChungTuFilterId').val(),
					iD_ChiTietChungTuFilter: $('#ID_ChiTietChungTuFilterId').val(),
					minTienChietKhauFilter: $('#MinTienChietKhauFilterId').val(),
					maxTienChietKhauFilter: $('#MaxTienChietKhauFilterId').val(),
					laPhanTramFilter: $('#LaPhanTramFilterId').val(),
					laNhanVienChinhFilter: $('#LaNhanVienChinhFilterId').val(),
					dienGiaiFilter: $('#DienGiaiFilterId').val(),
					chietKhauTheoThucThuFilter: $('#ChietKhauTheoThucThuFilterId').val(),
					minPTDoanhThuDuocHuongFilter: $('#MinPTDoanhThuDuocHuongFilterId').val(),
					maxPTDoanhThuDuocHuongFilter: $('#MaxPTDoanhThuDuocHuongFilterId').val(),
					duocYeuCauFilter: $('#DuocYeuCauFilterId').val(),
					minChiPhiThucHienFilter: $('#MinChiPhiThucHienFilterId').val(),
					maxChiPhiThucHienFilter: $('#MaxChiPhiThucHienFilterId').val(),
					laPTChiPhiThucHienFilter: $('#LaPTChiPhiThucHienFilterId').val(),
					dM_LoaiChungTuLoaiChungTuFilter: $('#DM_LoaiChungTuLoaiChungTuFilterId').val(),
					userNameFilter: $('#UserNameFilterId').val(),
					dM_HangHoaTenHangHoaFilter: $('#DM_HangHoaTenHangHoaFilterId').val(),
					userName2Filter: $('#UserName2FilterId').val()
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
                                    _viewNhanVienThucHienModal.open({ data: data.record });
                                }
                        },
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
                                deleteNhanVienThucHien(data.record.nhanVienThucHien);
                            }
                        }]
                    }
                },
					{
						targets: 1,
						 data: "nhanVienThucHien.maChungTu"   
					},
					{
						targets: 2,
						 data: "nhanVienThucHien.iD_ChiTietChungTu"   
					},
					{
						targets: 3,
						 data: "nhanVienThucHien.tienChietKhau"   
					},
					{
						targets: 4,
						 data: "nhanVienThucHien.laPhanTram"  ,
						render: function (laPhanTram) {
							if (laPhanTram) {
								return '<i class="la la-check-square m--font-success" title="True"></i>';
							}
							return '<i class="la la-times-circle" title="False"></i>';
					}
			 
					},
					{
						targets: 5,
						 data: "nhanVienThucHien.laNhanVienChinh"  ,
						render: function (laNhanVienChinh) {
							if (laNhanVienChinh) {
								return '<i class="la la-check-square m--font-success" title="True"></i>';
							}
							return '<i class="la la-times-circle" title="False"></i>';
					}
			 
					},
					{
						targets: 6,
						 data: "nhanVienThucHien.dienGiai"   
					},
					{
						targets: 7,
						 data: "nhanVienThucHien.chietKhauTheoThucThu"  ,
						render: function (chietKhauTheoThucThu) {
							if (chietKhauTheoThucThu) {
								return '<i class="la la-check-square m--font-success" title="True"></i>';
							}
							return '<i class="la la-times-circle" title="False"></i>';
					}
			 
					},
					{
						targets: 8,
						 data: "nhanVienThucHien.pTDoanhThuDuocHuong"   
					},
					{
						targets: 9,
						 data: "nhanVienThucHien.duocYeuCau"  ,
						render: function (duocYeuCau) {
							if (duocYeuCau) {
								return '<i class="la la-check-square m--font-success" title="True"></i>';
							}
							return '<i class="la la-times-circle" title="False"></i>';
					}
			 
					},
					{
						targets: 10,
						 data: "nhanVienThucHien.chiPhiThucHien"   
					},
					{
						targets: 11,
						 data: "nhanVienThucHien.laPTChiPhiThucHien"  ,
						render: function (laPTChiPhiThucHien) {
							if (laPTChiPhiThucHien) {
								return '<i class="la la-check-square m--font-success" title="True"></i>';
							}
							return '<i class="la la-times-circle" title="False"></i>';
					}
			 
					},
					{
						targets: 12,
						 data: "dM_LoaiChungTuLoaiChungTu" 
					},
					{
						targets: 13,
						 data: "userName" 
					},
					{
						targets: 14,
						 data: "dM_HangHoaTenHangHoa" 
					},
					{
						targets: 15,
						 data: "userName2" 
					}
            ]
        });


        function getNhanVienThucHiens() {
            dataTable.ajax.reload();
        }

        function deleteNhanVienThucHien(nhanVienThucHien) {
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

        $('#CreateNewNhanVienThucHienButton').click(function () {
            _createOrEditModal.open();
        });

		$('#ExportToExcelButton').click(function () {
            _nhanVienThucHiensService
                .getNhanVienThucHiensToExcel({
				filter : $('#NhanVienThucHiensTableFilter').val(),
					maChungTuFilter: $('#MaChungTuFilterId').val(),
					iD_ChiTietChungTuFilter: $('#ID_ChiTietChungTuFilterId').val(),
					minTienChietKhauFilter: $('#MinTienChietKhauFilterId').val(),
					maxTienChietKhauFilter: $('#MaxTienChietKhauFilterId').val(),
					laPhanTramFilter: $('#LaPhanTramFilterId').val(),
					laNhanVienChinhFilter: $('#LaNhanVienChinhFilterId').val(),
					dienGiaiFilter: $('#DienGiaiFilterId').val(),
					chietKhauTheoThucThuFilter: $('#ChietKhauTheoThucThuFilterId').val(),
					minPTDoanhThuDuocHuongFilter: $('#MinPTDoanhThuDuocHuongFilterId').val(),
					maxPTDoanhThuDuocHuongFilter: $('#MaxPTDoanhThuDuocHuongFilterId').val(),
					duocYeuCauFilter: $('#DuocYeuCauFilterId').val(),
					minChiPhiThucHienFilter: $('#MinChiPhiThucHienFilterId').val(),
					maxChiPhiThucHienFilter: $('#MaxChiPhiThucHienFilterId').val(),
					laPTChiPhiThucHienFilter: $('#LaPTChiPhiThucHienFilterId').val(),
					dM_LoaiChungTuLoaiChungTuFilter: $('#DM_LoaiChungTuLoaiChungTuFilterId').val(),
					userNameFilter: $('#UserNameFilterId').val(),
					dM_HangHoaTenHangHoaFilter: $('#DM_HangHoaTenHangHoaFilterId').val(),
					userName2Filter: $('#UserName2FilterId').val()
				})
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditNhanVienThucHienModalSaved', function () {
            getNhanVienThucHiens();
        });

		$('#GetNhanVienThucHiensButton').click(function (e) {
            e.preventDefault();
            getNhanVienThucHiens();
        });

		$(document).keypress(function(e) {
		  if(e.which === 13) {
			getNhanVienThucHiens();
		  }
		});

    });
})();