(function () {
    $(function () {

        var _$dM_TyGiasTable = $('#DM_TyGiasTable');
        var _dM_TyGiasService = abp.services.app.dM_TyGias;

        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.Categories.DM_TyGias.Create'),
            edit: abp.auth.hasPermission('Pages.Categories.DM_TyGias.Edit'),
            'delete': abp.auth.hasPermission('Pages.Categories.DM_TyGias.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_TyGias/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_TyGias/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditDM_TyGiaModal'
        });

		 var _viewDM_TyGiaModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_TyGias/ViewdM_TyGiaModal',
            modalClass: 'ViewDM_TyGiaModal'
        });

        var dataTable = _$dM_TyGiasTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _dM_TyGiasService.getAll,
                inputFilter: function () {
                    return {
					filter: $('#DM_TyGiasTableFilter').val(),
					minTyGiaFilter: $('#MinTyGiaFilterId').val(),
					maxTyGiaFilter: $('#MaxTyGiaFilterId').val(),
					minNgayTyGiaFilter: $('#MinNgayTyGiaFilterId').val(),
					maxNgayTyGiaFilter: $('#MaxNgayTyGiaFilterId').val(),
					ghiChuFilter: $('#GhiChuFilterId').val(),
					dM_TienTeTenNgoaiTeFilter: $('#DM_TienTeTenNgoaiTeFilterId').val()
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
                                    _viewDM_TyGiaModal.open({ data: data.record });
                                }
                        },
						{
                            text: app.localize('Edit'),
                            visible: function () {
                                return _permissions.edit;
                            },
                            action: function (data) {
                                _createOrEditModal.open({ id: data.record.dM_TyGia.id });
                            }
                        }, 
						{
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deleteDM_TyGia(data.record.dM_TyGia);
                            }
                        }]
                    },
                    controlType: "Control"
                },
					{
						targets: 1,
                        data: "dM_TyGia.tyGia",   
                         controlType: "Number"
					},
					{
						targets: 2,
						 data: "dM_TyGia.ngayTyGia" ,
					render: function (ngayTyGia) {
						if (ngayTyGia) {
							return moment(ngayTyGia).format('L');
						}
                        return "";
                        
                        },
                        controlType:"DateTimeField"
			  
					},
					{
						targets: 3,
                        data: "dM_TyGia.ghiChu",   
                        controlType: "TextField"
					},
					//{
					//	targets: 4,
					//	 data: "dM_TyGia.userTao"   
					//},
					//{
					//	targets: 5,
					//	 data: "dM_TyGia.ngayTao" ,
					//render: function (ngayTao) {
					//	if (ngayTao) {
					//		return moment(ngayTao).format('L');
					//	}
					//	return "";
					//}
			  
					//},
					//{
					//	targets: 6,
					//	 data: "dM_TyGia.userSuaCuoi"   
					//},
					//{
					//	targets: 7,
					//	 data: "dM_TyGia.ngaySuaCuoi" ,
					//render: function (ngaySuaCuoi) {
					//	if (ngaySuaCuoi) {
					//		return moment(ngaySuaCuoi).format('L');
					//	}
					//	return "";
					//}
			  
					//},
					{
						targets: 4,
                        data: "dM_TienTeTenNgoaiTe",
                        controlType: "PickupField",
                        backendFieldName: "dM_TyGia.ID_NgoaiTe"
					}
            ]
        });


        function getDM_TyGias() {
            dataTable.ajax.reload();
        }

        function deleteDM_TyGia(dM_TyGia) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _dM_TyGiasService.delete({
                            id: dM_TyGia.id
                        }).done(function () {
                            getDM_TyGias(true);
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

        $('#CreateNewDM_TyGiaButton').click(function () {
            _createOrEditModal.open();
        });

		$('#ExportToExcelButton').click(function () {
            _dM_TyGiasService
                .getDM_TyGiasToExcel({
				filter : $('#DM_TyGiasTableFilter').val(),
					minTyGiaFilter: $('#MinTyGiaFilterId').val(),
					maxTyGiaFilter: $('#MaxTyGiaFilterId').val(),
					minNgayTyGiaFilter: $('#MinNgayTyGiaFilterId').val(),
					maxNgayTyGiaFilter: $('#MaxNgayTyGiaFilterId').val(),
					ghiChuFilter: $('#GhiChuFilterId').val(),
					dM_TienTeTenNgoaiTeFilter: $('#DM_TienTeTenNgoaiTeFilterId').val()
				})
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditDM_TyGiaModalSaved', function () {
            getDM_TyGias();
        });

		$('#GetDM_TyGiasButton').click(function (e) {
            e.preventDefault();
            getDM_TyGias();
        });

		$(document).keypress(function(e) {
		  if(e.which === 13) {
			getDM_TyGias();
		  }
		});

    });
})();