(function () {
    $(function () {

        var _$phieuThuChiTietsTable = $('#PhieuThuChiTietsTable');
        var _phieuThuChiTietsService = abp.services.app.phieuThuChiTiets;

        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.PhieuThuChiTiets.Create'),
            edit: abp.auth.hasPermission('Pages.PhieuThuChiTiets.Edit'),
            'delete': abp.auth.hasPermission('Pages.PhieuThuChiTiets.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/PhieuThuChiTiets/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/PhieuThuChiTiets/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditPhieuThuChiTietModal'
        });

		 var _viewPhieuThuChiTietModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/PhieuThuChiTiets/ViewphieuThuChiTietModal',
            modalClass: 'ViewPhieuThuChiTietModal'
        });

        var dataTable = _$phieuThuChiTietsTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _phieuThuChiTietsService.getAll,
                inputFilter: function () {
                    return {
					filter: $('#PhieuThuChiTietsTableFilter').val(),
					minThuTuTheFilter: $('#MinThuTuTheFilterId').val(),
					maxThuTuTheFilter: $('#MaxThuTuTheFilterId').val(),
					minTienMatFilter: $('#MinTienMatFilterId').val(),
					maxTienMatFilter: $('#MaxTienMatFilterId').val(),
					minTienGuiFilter: $('#MinTienGuiFilterId').val(),
					maxTienGuiFilter: $('#MaxTienGuiFilterId').val(),
					minTienThuFilter: $('#MinTienThuFilterId').val(),
					maxTienThuFilter: $('#MaxTienThuFilterId').val(),
					ghiChuFilter: $('#GhiChuFilterId').val(),
					iD_ChungTuFilter: $('#ID_ChungTuFilterId').val(),
					minChiPhiNganHangFilter: $('#MinChiPhiNganHangFilterId').val(),
					maxChiPhiNganHangFilter: $('#MaxChiPhiNganHangFilterId').val(),
					laPTChiPhiNganHangFilter: $('#LaPTChiPhiNganHangFilterId').val(),
					diaChi_KhachHangFilter: $('#DiaChi_KhachHangFilterId').val(),
					thuPhiTienGuiFilter: $('#ThuPhiTienGuiFilterId').val(),
					phieuThuMaPhieuThuFilter: $('#PhieuThuMaPhieuThuFilterId').val(),
					dM_DoiTuongTenDoiTuongFilter: $('#DM_DoiTuongTenDoiTuongFilterId').val(),
					dM_NganHangTenNganHangFilter: $('#DM_NganHangTenNganHangFilterId').val(),
					userNameFilter: $('#UserNameFilterId').val(),
					khoanChiPhi_DoanhThuMaFilter: $('#KhoanChiPhi_DoanhThuMaFilterId').val(),
					theKhachHangMaTheFilter: $('#TheKhachHangMaTheFilterId').val(),
					dM_LoaiChungTuLoaiChungTuFilter: $('#DM_LoaiChungTuLoaiChungTuFilterId').val()
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
                                    _viewPhieuThuChiTietModal.open({ data: data.record });
                                }
                        },
						{
                            text: app.localize('Edit'),
                            visible: function () {
                                return _permissions.edit;
                            },
                            action: function (data) {
                                _createOrEditModal.open({ id: data.record.phieuThuChiTiet.id });
                            }
                        }, 
						{
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deletePhieuThuChiTiet(data.record.phieuThuChiTiet);
                            }
                        }]
                    }
                },
					{
						targets: 1,
                        data: "phieuThuChiTiet.thuTuThe",
                        render: function (data) {
                            return '<span class="numeric-cell">' + $.number(data, 0) + '</span>'; 
                        }
					},
					{
						targets: 2,
                        data: "phieuThuChiTiet.tienMat",
                        render: function (data) {
                            return '<span class="numeric-cell">' + $.number(data, 0) + '</span>'; 
                        }
					},
					{
						targets: 3,
                        data: "phieuThuChiTiet.tienGui",
                        render: function (data) {
                            return '<span class="numeric-cell">' + $.number(data, 0) + '</span>'; 
                        }
					},
					{
						targets: 4,
						 data: "phieuThuChiTiet.tienThu",
                        render: function (data) {
                            return '<span class="numeric-cell">' + $.number(data, 0) + '</span>'; 
                        }
					},
					{
						targets: 5,
						 data: "phieuThuChiTiet.ghiChu"   
					},
					{
						targets: 6,
						 data: "phieuThuChiTiet.iD_ChungTu"   
					},
					{
						targets: 7,
						 data: "phieuThuChiTiet.chiPhiNganHang"   
					},
					{
						targets: 8,
						 data: "phieuThuChiTiet.laPTChiPhiNganHang"  ,
						render: function (laPTChiPhiNganHang) {
							if (laPTChiPhiNganHang) {
								return '<i class="la la-check-square m--font-success" title="True"></i>';
							}
							return '<i class="la la-times-circle" title="False"></i>';
					}
			 
					},
					{
						targets: 9,
						 data: "phieuThuChiTiet.diaChi_KhachHang"   
					},
					{
						targets: 10,
						 data: "phieuThuChiTiet.thuPhiTienGui"  ,
						render: function (thuPhiTienGui) {
							if (thuPhiTienGui) {
								return '<i class="la la-check-square m--font-success" title="True"></i>';
							}
							return '<i class="la la-times-circle" title="False"></i>';
					}
			 
					},
					{
						targets: 11,
						 data: "phieuThuMaPhieuThu" 
					},
					{
						targets: 12,
						 data: "dM_DoiTuongTenDoiTuong" 
					},
					{
						targets: 13,
						 data: "dM_NganHangTenNganHang" 
					},
					{
						targets: 14,
						 data: "userName" 
					},
					{
						targets: 15,
						 data: "khoanChiPhi_DoanhThuMa" 
					},
					{
						targets: 16,
						 data: "theKhachHangMaThe" 
					},
					{
						targets: 17,
						 data: "dM_LoaiChungTuLoaiChungTu" 
					}
            ]
        });


        function getPhieuThuChiTiets() {
            dataTable.ajax.reload();
        }

        function deletePhieuThuChiTiet(phieuThuChiTiet) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _phieuThuChiTietsService.delete({
                            id: phieuThuChiTiet.id
                        }).done(function () {
                            getPhieuThuChiTiets(true);
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

        $('#CreateNewPhieuThuChiTietButton').click(function () {
            _createOrEditModal.open();
        });

		$('#ExportToExcelButton').click(function () {
            _phieuThuChiTietsService
                .getPhieuThuChiTietsToExcel({
				filter : $('#PhieuThuChiTietsTableFilter').val(),
					minThuTuTheFilter: $('#MinThuTuTheFilterId').val(),
					maxThuTuTheFilter: $('#MaxThuTuTheFilterId').val(),
					minTienMatFilter: $('#MinTienMatFilterId').val(),
					maxTienMatFilter: $('#MaxTienMatFilterId').val(),
					minTienGuiFilter: $('#MinTienGuiFilterId').val(),
					maxTienGuiFilter: $('#MaxTienGuiFilterId').val(),
					minTienThuFilter: $('#MinTienThuFilterId').val(),
					maxTienThuFilter: $('#MaxTienThuFilterId').val(),
					ghiChuFilter: $('#GhiChuFilterId').val(),
					iD_ChungTuFilter: $('#ID_ChungTuFilterId').val(),
					minChiPhiNganHangFilter: $('#MinChiPhiNganHangFilterId').val(),
					maxChiPhiNganHangFilter: $('#MaxChiPhiNganHangFilterId').val(),
					laPTChiPhiNganHangFilter: $('#LaPTChiPhiNganHangFilterId').val(),
					diaChi_KhachHangFilter: $('#DiaChi_KhachHangFilterId').val(),
					thuPhiTienGuiFilter: $('#ThuPhiTienGuiFilterId').val(),
					phieuThuMaPhieuThuFilter: $('#PhieuThuMaPhieuThuFilterId').val(),
					dM_DoiTuongTenDoiTuongFilter: $('#DM_DoiTuongTenDoiTuongFilterId').val(),
					dM_NganHangTenNganHangFilter: $('#DM_NganHangTenNganHangFilterId').val(),
					userNameFilter: $('#UserNameFilterId').val(),
					khoanChiPhi_DoanhThuMaFilter: $('#KhoanChiPhi_DoanhThuMaFilterId').val(),
					theKhachHangMaTheFilter: $('#TheKhachHangMaTheFilterId').val(),
					dM_LoaiChungTuLoaiChungTuFilter: $('#DM_LoaiChungTuLoaiChungTuFilterId').val()
				})
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditPhieuThuChiTietModalSaved', function () {
            getPhieuThuChiTiets();
        });

		$('#GetPhieuThuChiTietsButton').click(function (e) {
            e.preventDefault();
            getPhieuThuChiTiets();
        });

		$(document).keypress(function(e) {
		  if(e.which === 13) {
			getPhieuThuChiTiets();
		  }
		});

    });
})();