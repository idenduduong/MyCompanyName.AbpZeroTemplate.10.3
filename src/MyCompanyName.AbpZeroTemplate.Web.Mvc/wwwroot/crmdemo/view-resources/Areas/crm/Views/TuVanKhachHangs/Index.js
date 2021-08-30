(function () {
    $(function () {

        var _$tuVanKhachHangsTable = $('#TuVanKhachHangsTable');
        var _tuVanKhachHangsService = abp.services.app.tuVanKhachHangs;

        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.TuVanKhachHangs.Create'),
            edit: abp.auth.hasPermission('Pages.TuVanKhachHangs.Edit'),
            'delete': abp.auth.hasPermission('Pages.TuVanKhachHangs.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/TuVanKhachHangs/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/TuVanKhachHangs/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditTuVanKhachHangModal'
        });

		 var _viewTuVanKhachHangModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/TuVanKhachHangs/ViewtuVanKhachHangModal',
            modalClass: 'ViewTuVanKhachHangModal'
        });

        var dataTable = _$tuVanKhachHangsTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _tuVanKhachHangsService.getAll,
                inputFilter: function () {
                    return {
					filter: $('#TuVanKhachHangsTableFilter').val(),
					soPhieuFilter: $('#SoPhieuFilterId').val(),
					minNgayTuVanFilter: $('#MinNgayTuVanFilterId').val(),
					maxNgayTuVanFilter: $('#MaxNgayTuVanFilterId').val(),
					yKienKhachHangFilter: $('#YKienKhachHangFilterId').val(),
					noiDungTuVanFilter: $('#NoiDungTuVanFilterId').val(),
					minTrangThaiSauTuVanFilter: $('#MinTrangThaiSauTuVanFilterId').val(),
					maxTrangThaiSauTuVanFilter: $('#MaxTrangThaiSauTuVanFilterId').val(),
					userLapFilter: $('#UserLapFilterId').val(),
					minNgayTaoFilter: $('#MinNgayTaoFilterId').val(),
					maxNgayTaoFilter: $('#MaxNgayTaoFilterId').val(),
					iD_NoiDungQuanTamFilter: $('#ID_NoiDungQuanTamFilterId').val(),
					organizationUnitDisplayNameFilter: $('#OrganizationUnitDisplayNameFilterId').val(),
					userNameFilter: $('#UserNameFilterId').val(),
					dM_DoiTuongTenDoiTuongFilter: $('#DM_DoiTuongTenDoiTuongFilterId').val(),
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
                                    _viewTuVanKhachHangModal.open({ data: data.record });
                                }
                        },
						{
                            text: app.localize('Edit'),
                            visible: function () {
                                return _permissions.edit;
                            },
                            action: function (data) {
                                _createOrEditModal.open({ id: data.record.tuVanKhachHang.id });
                            }
                        }, 
						{
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deleteTuVanKhachHang(data.record.tuVanKhachHang);
                            }
                        }]
                    }
                },
					{
						targets: 1,
						 data: "tuVanKhachHang.soPhieu"   
					},
					{
						targets: 2,
						 data: "tuVanKhachHang.ngayTuVan" ,
					render: function (ngayTuVan) {
						if (ngayTuVan) {
							return moment(ngayTuVan).format('L');
						}
						return "";
					}
			  
					},
					{
						targets: 3,
						 data: "tuVanKhachHang.yKienKhachHang"   
					},
					{
						targets: 4,
						 data: "tuVanKhachHang.noiDungTuVan"   
					},
					{
						targets: 5,
						 data: "tuVanKhachHang.trangThaiSauTuVan"   
					},
					{
						targets: 6,
						 data: "tuVanKhachHang.userLap"   
					},
					{
						targets: 7,
						 data: "tuVanKhachHang.ngayTao" ,
					render: function (ngayTao) {
						if (ngayTao) {
							return moment(ngayTao).format('L');
						}
						return "";
					}
			  
					},
					{
						targets: 8,
						 data: "tuVanKhachHang.iD_NoiDungQuanTam"   
					},
					{
						targets: 9,
						 data: "organizationUnitDisplayName" 
					},
					{
						targets: 10,
						 data: "userName" 
					},
					{
						targets: 11,
						 data: "dM_DoiTuongTenDoiTuong" 
					},
					{
						targets: 12,
						 data: "dM_HangHoaTenHangHoa" 
					}
            ]
        });


        function getTuVanKhachHangs() {
            dataTable.ajax.reload();
        }

        function deleteTuVanKhachHang(tuVanKhachHang) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _tuVanKhachHangsService.delete({
                            id: tuVanKhachHang.id
                        }).done(function () {
                            getTuVanKhachHangs(true);
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

        $('#CreateNewTuVanKhachHangButton').click(function () {
            _createOrEditModal.open();
        });

		$('#ExportToExcelButton').click(function () {
            _tuVanKhachHangsService
                .getTuVanKhachHangsToExcel({
				filter : $('#TuVanKhachHangsTableFilter').val(),
					soPhieuFilter: $('#SoPhieuFilterId').val(),
					minNgayTuVanFilter: $('#MinNgayTuVanFilterId').val(),
					maxNgayTuVanFilter: $('#MaxNgayTuVanFilterId').val(),
					yKienKhachHangFilter: $('#YKienKhachHangFilterId').val(),
					noiDungTuVanFilter: $('#NoiDungTuVanFilterId').val(),
					minTrangThaiSauTuVanFilter: $('#MinTrangThaiSauTuVanFilterId').val(),
					maxTrangThaiSauTuVanFilter: $('#MaxTrangThaiSauTuVanFilterId').val(),
					userLapFilter: $('#UserLapFilterId').val(),
					minNgayTaoFilter: $('#MinNgayTaoFilterId').val(),
					maxNgayTaoFilter: $('#MaxNgayTaoFilterId').val(),
					iD_NoiDungQuanTamFilter: $('#ID_NoiDungQuanTamFilterId').val(),
					organizationUnitDisplayNameFilter: $('#OrganizationUnitDisplayNameFilterId').val(),
					userNameFilter: $('#UserNameFilterId').val(),
					dM_DoiTuongTenDoiTuongFilter: $('#DM_DoiTuongTenDoiTuongFilterId').val(),
					dM_HangHoaTenHangHoaFilter: $('#DM_HangHoaTenHangHoaFilterId').val()
				})
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditTuVanKhachHangModalSaved', function () {
            getTuVanKhachHangs();
        });

		$('#GetTuVanKhachHangsButton').click(function (e) {
            e.preventDefault();
            getTuVanKhachHangs();
        });

		$(document).keypress(function(e) {
		  if(e.which === 13) {
			getTuVanKhachHangs();
		  }
		});

    });
})();