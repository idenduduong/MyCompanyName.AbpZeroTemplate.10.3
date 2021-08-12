(function () {
    $(function () {

        var _$dM_HinhThucVanChuyensTable = $('#DM_HinhThucVanChuyensTable');
        var _dM_HinhThucVanChuyensService = abp.services.app.dM_HinhThucVanChuyens;

        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.Categories.DM_HinhThucVanChuyens.Create'),
            edit: abp.auth.hasPermission('Pages.Categories.DM_HinhThucVanChuyens.Edit'),
            'delete': abp.auth.hasPermission('Pages.Categories.DM_HinhThucVanChuyens.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_HinhThucVanChuyens/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_HinhThucVanChuyens/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditDM_HinhThucVanChuyenModal'
        });

		 var _viewDM_HinhThucVanChuyenModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_HinhThucVanChuyens/ViewdM_HinhThucVanChuyenModal',
            modalClass: 'ViewDM_HinhThucVanChuyenModal'
        });

        var dataTable = _$dM_HinhThucVanChuyensTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _dM_HinhThucVanChuyensService.getAll,
                inputFilter: function () {
                    return {
					filter: $('#DM_HinhThucVanChuyensTableFilter').val(),
					maHinhThucFilter: $('#MaHinhThucFilterId').val(),
					tenHinhThucFilter: $('#TenHinhThucFilterId').val(),
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
                                text: app.localize('View'),
                                action: function (data) {
                                    _viewDM_HinhThucVanChuyenModal.open({ data: data.record });
                                }
                        },
						{
                            text: app.localize('Edit'),
                            visible: function () {
                                return _permissions.edit;
                            },
                            action: function (data) {
                                _createOrEditModal.open({ id: data.record.dM_HinhThucVanChuyen.id });
                            }
                        }, 
						{
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deleteDM_HinhThucVanChuyen(data.record.dM_HinhThucVanChuyen);
                            }
                        }]
                    }
                },
					{
						targets: 1,
						 data: "dM_HinhThucVanChuyen.maHinhThuc"   
					},
					{
						targets: 2,
						 data: "dM_HinhThucVanChuyen.tenHinhThuc"   
					},
					{
						targets: 3,
						 data: "dM_HinhThucVanChuyen.ghiChu"   
					}//,
					//{
					//	targets: 4,
					//	 data: "dM_HinhThucVanChuyen.userTao"   
					//},
					//{
					//	targets: 5,
					//	 data: "dM_HinhThucVanChuyen.ngayTao" ,
					//render: function (ngayTao) {
					//	if (ngayTao) {
					//		return moment(ngayTao).format('L');
					//	}
					//	return "";
					//}
			  
					//},
					//{
					//	targets: 6,
					//	 data: "dM_HinhThucVanChuyen.userSuaCuoi"   
					//},
					//{
					//	targets: 7,
					//	 data: "dM_HinhThucVanChuyen.ngaySuaCuoi" ,
					//render: function (ngaySuaCuoi) {
					//	if (ngaySuaCuoi) {
					//		return moment(ngaySuaCuoi).format('L');
					//	}
					//	return "";
					//}
			  
					//}
            ]
        });


        function getDM_HinhThucVanChuyens() {
            dataTable.ajax.reload();
        }

        function deleteDM_HinhThucVanChuyen(dM_HinhThucVanChuyen) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _dM_HinhThucVanChuyensService.delete({
                            id: dM_HinhThucVanChuyen.id
                        }).done(function () {
                            getDM_HinhThucVanChuyens(true);
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

        $('#CreateNewDM_HinhThucVanChuyenButton').click(function () {
            _createOrEditModal.open();
        });

		$('#ExportToExcelButton').click(function () {
            _dM_HinhThucVanChuyensService
                .getDM_HinhThucVanChuyensToExcel({
				filter : $('#DM_HinhThucVanChuyensTableFilter').val(),
					maHinhThucFilter: $('#MaHinhThucFilterId').val(),
					tenHinhThucFilter: $('#TenHinhThucFilterId').val(),
					ghiChuFilter: $('#GhiChuFilterId').val()
				})
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditDM_HinhThucVanChuyenModalSaved', function () {
            getDM_HinhThucVanChuyens();
        });

		$('#GetDM_HinhThucVanChuyensButton').click(function (e) {
            e.preventDefault();
            getDM_HinhThucVanChuyens();
        });

		$(document).keypress(function(e) {
		  if(e.which === 13) {
			getDM_HinhThucVanChuyens();
		  }
		});

    });
})();