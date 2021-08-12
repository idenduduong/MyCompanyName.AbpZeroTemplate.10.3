(function () {
    $(function () {

        var _$dM_QuanHuyensTable = $('#DM_QuanHuyensTable');
        var _dM_QuanHuyensService = abp.services.app.dM_QuanHuyens;

        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.Categories.Locations.DM_QuanHuyens.Create'),
            edit: abp.auth.hasPermission('Pages.Categories.Locations.DM_QuanHuyens.Edit'),
            'delete': abp.auth.hasPermission('Pages.Categories.Locations.DM_QuanHuyens.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_QuanHuyens/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_QuanHuyens/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditDM_QuanHuyenModal'
        });

		 var _viewDM_QuanHuyenModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_QuanHuyens/ViewdM_QuanHuyenModal',
            modalClass: 'ViewDM_QuanHuyenModal'
        });

        var dataTable = _$dM_QuanHuyensTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _dM_QuanHuyensService.getAll,
                inputFilter: function () {
                    return {
					filter: $('#DM_QuanHuyensTableFilter').val(),
					maQuanHuyenFilter: $('#MaQuanHuyenFilterId').val(),
					tenQuanHuyenFilter: $('#TenQuanHuyenFilterId').val(),
					ghiChuFilter: $('#GhiChuFilterId').val(),
					dM_TinhThanhTenTinhThanhFilter: $('#DM_TinhThanhTenTinhThanhFilterId').val()
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
                                    _viewDM_QuanHuyenModal.open({ data: data.record });
                                }
                        },
						{
                            text: app.localize('Edit'),
                            visible: function () {
                                return _permissions.edit;
                            },
                            action: function (data) {
                                _createOrEditModal.open({ id: data.record.dM_QuanHuyen.id });
                            }
                        }, 
						{
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deleteDM_QuanHuyen(data.record.dM_QuanHuyen);
                            }
                        }]
                    }
                },
					{
						targets: 1,
						 data: "dM_QuanHuyen.maQuanHuyen"   
					},
					{
						targets: 2,
						 data: "dM_QuanHuyen.tenQuanHuyen"   
					},
					{
						targets: 3,
						 data: "dM_QuanHuyen.ghiChu"   
                }
                ,
					//{
					//	targets: 4,
					//	 data: "dM_QuanHuyen.userTao"   
					//},
					//{
					//	targets: 5,
					//	 data: "dM_QuanHuyen.ngayTao" ,
					//render: function (ngayTao) {
					//	if (ngayTao) {
					//		return moment(ngayTao).format('L');
					//	}
					//	return "";
					//}
			  
					//},
					//{
					//	targets: 6,
					//	 data: "dM_QuanHuyen.userSuaCuoi"   
					//},
					//{
					//	targets: 7,
					//	 data: "dM_QuanHuyen.ngaySuaCuoi" ,
					//render: function (ngaySuaCuoi) {
					//	if (ngaySuaCuoi) {
					//		return moment(ngaySuaCuoi).format('L');
					//	}
					//	return "";
					//}
			  
					//},
					{
						targets: 4,
						 data: "dM_TinhThanhTenTinhThanh" 
					}
            ]
        });


        function getDM_QuanHuyens() {
            dataTable.ajax.reload();
        }

        function deleteDM_QuanHuyen(dM_QuanHuyen) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _dM_QuanHuyensService.delete({
                            id: dM_QuanHuyen.id
                        }).done(function () {
                            getDM_QuanHuyens(true);
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

        $('#CreateNewDM_QuanHuyenButton').click(function () {
            _createOrEditModal.open();
        });

		$('#ExportToExcelButton').click(function () {
            _dM_QuanHuyensService
                .getDM_QuanHuyensToExcel({
				filter : $('#DM_QuanHuyensTableFilter').val(),
					maQuanHuyenFilter: $('#MaQuanHuyenFilterId').val(),
					tenQuanHuyenFilter: $('#TenQuanHuyenFilterId').val(),
					ghiChuFilter: $('#GhiChuFilterId').val(),
					dM_TinhThanhTenTinhThanhFilter: $('#DM_TinhThanhTenTinhThanhFilterId').val()
				})
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditDM_QuanHuyenModalSaved', function () {
            getDM_QuanHuyens();
        });

		$('#GetDM_QuanHuyensButton').click(function (e) {
            e.preventDefault();
            getDM_QuanHuyens();
        });

		$(document).keypress(function(e) {
		  if(e.which === 13) {
			getDM_QuanHuyens();
		  }
		});

    });
})();