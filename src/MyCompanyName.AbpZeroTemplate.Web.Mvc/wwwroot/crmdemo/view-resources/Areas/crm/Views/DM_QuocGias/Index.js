(function () {
    $(function () {
        
        var _$dM_QuocGiasTable = $('#DM_QuocGiasTable');
        var _dM_QuocGiasService = abp.services.app.dM_QuocGias;

        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.Categories.Locations.DM_QuocGias.Create'),
            edit: abp.auth.hasPermission('Pages.Categories.Locations.DM_QuocGias.Edit'),
            'delete': abp.auth.hasPermission('Pages.Categories.Locations.DM_QuocGias.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_QuocGias/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_QuocGias/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditDM_QuocGiaModal'
        });


        var dataTable = _$dM_QuocGiasTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _dM_QuocGiasService.getAll,
                inputFilter: function () {
                    return {
					filter: $('#DM_QuocGiasTableFilter').val(),
					maNuocFilter: $('#MaNuocFilterId').val(),
					tenNuocFilter: $('#TenNuocFilterId').val(),
					ghiChuFilter: $('#GhiChuFilterId').val()
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
                            text: app.localize('Edit'),
                            visible: function () {
                                return _permissions.edit;
                            },
                            action: function (data) {
                                _createOrEditModal.open({ id: data.record.dM_QuocGia.id });
                            }
                        }, 
						{
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deleteDM_QuocGia(data.record.dM_QuocGia);
                            }
                        }]
                    }
                },
					{
						targets: 1,
						 data: "dM_QuocGia.maNuoc"   
					},
					{
						targets: 2,
						 data: "dM_QuocGia.tenNuoc"   
					},
					{
						targets: 3,
						 data: "dM_QuocGia.ghiChu"   
					}//,
					//{
					//	targets: 4,
					//	 data: "dM_QuocGia.userTao"   
					//},
					//{
					//	targets: 5,
					//	 data: "dM_QuocGia.ngayTao" ,
					//render: function (ngayTao) {
					//	if (ngayTao) {
					//		return moment(ngayTao).format('L');
					//	}
					//	return "";
					//}
			  
					//},
					//{
					//	targets: 6,
					//	 data: "dM_QuocGia.userSuaCuoi"   
					//},
					//{
					//	targets: 7,
					//	 data: "dM_QuocGia.ngaySuaCuoi" ,
					//render: function (ngaySuaCuoi) {
					//	if (ngaySuaCuoi) {
					//		return moment(ngaySuaCuoi).format('L');
					//	}
					//	return "";
					//}
			  
					//}
            ]
        });


        function getDM_QuocGias() {
            dataTable.ajax.reload();
        }

        function deleteDM_QuocGia(dM_QuocGia) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _dM_QuocGiasService.delete({
                            id: dM_QuocGia.id
                        }).done(function () {
                            getDM_QuocGias(true);
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

        $('#CreateNewDM_QuocGiaButton').click(function () {
            _createOrEditModal.open();
        });

		$('#ExportToExcelButton').click(function () {
            _dM_QuocGiasService
                .getDM_QuocGiasToExcel({
				filter : $('#DM_QuocGiasTableFilter').val(),
					maNuocFilter: $('#MaNuocFilterId').val(),
					tenNuocFilter: $('#TenNuocFilterId').val(),
					ghiChuFilter: $('#GhiChuFilterId').val()
				})
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditDM_QuocGiaModalSaved', function () {
            getDM_QuocGias();
        });

		$('#GetDM_QuocGiasButton').click(function (e) {
            e.preventDefault();
            getDM_QuocGias();
        });

		$(document).keypress(function(e) {
		  if(e.which === 13) {
			getDM_QuocGias();
		  }
		});

    });
})();