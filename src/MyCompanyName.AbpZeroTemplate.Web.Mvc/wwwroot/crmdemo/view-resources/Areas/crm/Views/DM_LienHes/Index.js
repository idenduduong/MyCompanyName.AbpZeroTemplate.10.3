(function () {
    $(function () {

        var _$dM_LienHesTable = $('#DM_LienHesTable');
        var _dM_LienHesService = abp.services.app.dM_LienHes;

        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.DM_LienHes.Create'),
            edit: abp.auth.hasPermission('Pages.DM_LienHes.Edit'),
            'delete': abp.auth.hasPermission('Pages.DM_LienHes.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_LienHes/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_LienHes/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditDM_LienHeModal'
        });

		 var _viewDM_LienHeModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_LienHes/ViewdM_LienHeModal',
            modalClass: 'ViewDM_LienHeModal'
        });

        var dataTable = _$dM_LienHesTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _dM_LienHesService.getAll,
                inputFilter: function () {
                    return {
					filter: $('#DM_LienHesTableFilter').val(),
					maLienHeFilter: $('#MaLienHeFilterId').val(),
					tenLienHeFilter: $('#TenLienHeFilterId').val(),
					chucVuFilter: $('#ChucVuFilterId').val(),
					soDienThoaiFilter: $('#SoDienThoaiFilterId').val(),
					emailFilter: $('#EmailFilterId').val(),
					ghiChuFilter: $('#GhiChuFilterId').val(),
					diaChiFilter: $('#DiaChiFilterId').val(),
					minNgaySinhFilter: $('#MinNgaySinhFilterId').val(),
					maxNgaySinhFilter: $('#MaxNgaySinhFilterId').val(),
					canNangFilter: $('#CanNangFilterId').val(),
					chieuCaoFilter: $('#ChieuCaoFilterId').val(),
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
                                    _viewDM_LienHeModal.open({ data: data.record });
                                }
                        },
						{
                            text: app.localize('Edit'),
                            visible: function () {
                                return _permissions.edit;
                            },
                            action: function (data) {
                                _createOrEditModal.open({ id: data.record.dM_LienHe.id });
                            }
                        }, 
						{
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deleteDM_LienHe(data.record.dM_LienHe);
                            }
                        }]
                    }
                },
					{
						targets: 1,
						 data: "dM_LienHe.maLienHe"   
					},
					{
						targets: 2,
						 data: "dM_LienHe.tenLienHe"   
					},
					{
						targets: 3,
						 data: "dM_LienHe.chucVu"   
					},
					{
						targets: 4,
						 data: "dM_LienHe.soDienThoai"   
					},
					{
						targets: 5,
						 data: "dM_LienHe.email"   
					},
					{
						targets: 6,
						 data: "dM_LienHe.ghiChu"   
					},
					{
						targets: 7,
						 data: "dM_LienHe.diaChi"   
					},
					{
						targets: 8,
						 data: "dM_LienHe.ngaySinh" ,
					render: function (ngaySinh) {
						if (ngaySinh) {
							return moment(ngaySinh).format('L');
						}
						return "";
					}
			  
					},
					{
						targets: 9,
						 data: "dM_LienHe.canNang"   
					},
					{
						targets: 10,
						 data: "dM_LienHe.chieuCao"   
					},
					{
						targets: 11,
						 data: "dM_DoiTuongTenDoiTuong" 
					}
            ]
        });


        function getDM_LienHes() {
            dataTable.ajax.reload();
        }

        function deleteDM_LienHe(dM_LienHe) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _dM_LienHesService.delete({
                            id: dM_LienHe.id
                        }).done(function () {
                            getDM_LienHes(true);
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

        $('#CreateNewDM_LienHeButton').click(function () {
            _createOrEditModal.open();
        });

		$('#ExportToExcelButton').click(function () {
            _dM_LienHesService
                .getDM_LienHesToExcel({
				filter : $('#DM_LienHesTableFilter').val(),
					maLienHeFilter: $('#MaLienHeFilterId').val(),
					tenLienHeFilter: $('#TenLienHeFilterId').val(),
					chucVuFilter: $('#ChucVuFilterId').val(),
					soDienThoaiFilter: $('#SoDienThoaiFilterId').val(),
					emailFilter: $('#EmailFilterId').val(),
					ghiChuFilter: $('#GhiChuFilterId').val(),
					diaChiFilter: $('#DiaChiFilterId').val(),
					minNgaySinhFilter: $('#MinNgaySinhFilterId').val(),
					maxNgaySinhFilter: $('#MaxNgaySinhFilterId').val(),
					canNangFilter: $('#CanNangFilterId').val(),
					chieuCaoFilter: $('#ChieuCaoFilterId').val(),
					dM_DoiTuongTenDoiTuongFilter: $('#DM_DoiTuongTenDoiTuongFilterId').val()
				})
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditDM_LienHeModalSaved', function () {
            getDM_LienHes();
        });

		$('#GetDM_LienHesButton').click(function (e) {
            e.preventDefault();
            getDM_LienHes();
        });

		$(document).keypress(function(e) {
		  if(e.which === 13) {
			getDM_LienHes();
		  }
		});

    });
})();