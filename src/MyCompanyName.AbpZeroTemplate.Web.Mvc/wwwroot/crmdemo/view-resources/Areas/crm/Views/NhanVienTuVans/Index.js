(function () {
    $(function () {

        var _$nhanVienTuVansTable = $('#NhanVienTuVansTable');
        var _nhanVienTuVansService = abp.services.app.nhanVienTuVans;

        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.NhanVienTuVans.Create'),
            edit: abp.auth.hasPermission('Pages.NhanVienTuVans.Edit'),
            'delete': abp.auth.hasPermission('Pages.NhanVienTuVans.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/NhanVienTuVans/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/NhanVienTuVans/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditNhanVienTuVanModal'
        });

		 var _viewNhanVienTuVanModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/NhanVienTuVans/ViewnhanVienTuVanModal',
            modalClass: 'ViewNhanVienTuVanModal'
        });

        var dataTable = _$nhanVienTuVansTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _nhanVienTuVansService.getAll,
                inputFilter: function () {
                    return {
					filter: $('#NhanVienTuVansTableFilter').val(),
					iD_ChungTuFilter: $('#ID_ChungTuFilterId').val(),
					iD_ChungTuChiTietFilter: $('#ID_ChungTuChiTietFilterId').val(),
					minTienChietKhauFilter: $('#MinTienChietKhauFilterId').val(),
					maxTienChietKhauFilter: $('#MaxTienChietKhauFilterId').val(),
					laPhanTramFilter: $('#LaPhanTramFilterId').val(),
					chietKhauTheoThucThuFilter: $('#ChietKhauTheoThucThuFilterId').val(),
					minPTDoanhThuDuocHuongFilter: $('#MinPTDoanhThuDuocHuongFilterId').val(),
					maxPTDoanhThuDuocHuongFilter: $('#MaxPTDoanhThuDuocHuongFilterId').val(),
					dienGiaiFilter: $('#DienGiaiFilterId').val(),
					userNameFilter: $('#UserNameFilterId').val(),
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
                                    _viewNhanVienTuVanModal.open({ data: data.record });
                                }
                        },
						{
                            text: app.localize('Edit'),
                            visible: function () {
                                return _permissions.edit;
                            },
                            action: function (data) {
                                _createOrEditModal.open({ id: data.record.nhanVienTuVan.id });
                            }
                        }, 
						{
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deleteNhanVienTuVan(data.record.nhanVienTuVan);
                            }
                        }]
                    }
                },
					{
						targets: 1,
						 data: "nhanVienTuVan.iD_ChungTu"   
					},
					{
						targets: 2,
						 data: "nhanVienTuVan.iD_ChungTuChiTiet"   
					},
					{
						targets: 3,
						 data: "nhanVienTuVan.tienChietKhau"   
					},
					{
						targets: 4,
						 data: "nhanVienTuVan.laPhanTram"  ,
						render: function (laPhanTram) {
							if (laPhanTram) {
								return '<i class="la la-check-square m--font-success" title="True"></i>';
							}
							return '<i class="la la-times-circle" title="False"></i>';
					}
			 
					},
					{
						targets: 5,
						 data: "nhanVienTuVan.chietKhauTheoThucThu"  ,
						render: function (chietKhauTheoThucThu) {
							if (chietKhauTheoThucThu) {
								return '<i class="la la-check-square m--font-success" title="True"></i>';
							}
							return '<i class="la la-times-circle" title="False"></i>';
					}
			 
					},
					{
						targets: 6,
						 data: "nhanVienTuVan.pTDoanhThuDuocHuong"   
					},
					{
						targets: 7,
						 data: "nhanVienTuVan.dienGiai"   
					},
					{
						targets: 8,
						 data: "userName" 
					},
					{
						targets: 9,
						 data: "dM_LoaiChungTuLoaiChungTu" 
					}
            ]
        });


        function getNhanVienTuVans() {
            dataTable.ajax.reload();
        }

        function deleteNhanVienTuVan(nhanVienTuVan) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _nhanVienTuVansService.delete({
                            id: nhanVienTuVan.id
                        }).done(function () {
                            getNhanVienTuVans(true);
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

        $('#CreateNewNhanVienTuVanButton').click(function () {
            _createOrEditModal.open();
        });

		$('#ExportToExcelButton').click(function () {
            _nhanVienTuVansService
                .getNhanVienTuVansToExcel({
				filter : $('#NhanVienTuVansTableFilter').val(),
					iD_ChungTuFilter: $('#ID_ChungTuFilterId').val(),
					iD_ChungTuChiTietFilter: $('#ID_ChungTuChiTietFilterId').val(),
					minTienChietKhauFilter: $('#MinTienChietKhauFilterId').val(),
					maxTienChietKhauFilter: $('#MaxTienChietKhauFilterId').val(),
					laPhanTramFilter: $('#LaPhanTramFilterId').val(),
					chietKhauTheoThucThuFilter: $('#ChietKhauTheoThucThuFilterId').val(),
					minPTDoanhThuDuocHuongFilter: $('#MinPTDoanhThuDuocHuongFilterId').val(),
					maxPTDoanhThuDuocHuongFilter: $('#MaxPTDoanhThuDuocHuongFilterId').val(),
					dienGiaiFilter: $('#DienGiaiFilterId').val(),
					userNameFilter: $('#UserNameFilterId').val(),
					dM_LoaiChungTuLoaiChungTuFilter: $('#DM_LoaiChungTuLoaiChungTuFilterId').val()
				})
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditNhanVienTuVanModalSaved', function () {
            getNhanVienTuVans();
        });

		$('#GetNhanVienTuVansButton').click(function (e) {
            e.preventDefault();
            getNhanVienTuVans();
        });

		$(document).keypress(function(e) {
		  if(e.which === 13) {
			getNhanVienTuVans();
		  }
		});

    });
})();