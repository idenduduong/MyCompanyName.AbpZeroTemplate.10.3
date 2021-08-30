(function () {
    $(function () {

        var _$dM_KhosTable = $('#DM_KhosTable');
        var _dM_KhosService = abp.services.app.dM_Khos;

        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.Categories.DM_Khos.Create'),
            edit: abp.auth.hasPermission('Pages.Categories.DM_Khos.Edit'),
            'delete': abp.auth.hasPermission('Pages.Categories.DM_Khos.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_Khos/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_Khos/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditDM_KhoModal'
        });

		 var _viewDM_KhoModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_Khos/ViewdM_KhoModal',
            modalClass: 'ViewDM_KhoModal'
        });

        var dataTable = _$dM_KhosTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _dM_KhosService.getAll,
                inputFilter: function () {
                    return {
					filter: $('#DM_KhosTableFilter').val(),
					maKhoFilter: $('#MaKhoFilterId').val(),
					tenKhoFilter: $('#TenKhoFilterId').val(),
					diaDiemFilter: $('#DiaDiemFilterId').val(),
					ghiChuFilter: $('#GhiChuFilterId').val(),
					iD_DonVisFilter: $('#ID_DonVisFilterId').val()
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
                                    _viewDM_KhoModal.open({ data: data.record });
                                }
                        },
						{
                            text: app.localize('Edit'),
                            visible: function () {
                                return _permissions.edit;
                            },
                            action: function (data) {
                                _createOrEditModal.open({ id: data.record.dM_Kho.id });
                            }
                        }, 
						{
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deleteDM_Kho(data.record.dM_Kho);
                            }
                        }]
                    }
                },
					{
						targets: 1,
						 data: "dM_Kho.maKho"   
					},
					{
						targets: 2,
						 data: "dM_Kho.tenKho"   
					},
					{
						targets: 3,
						 data: "dM_Kho.diaDiem"   
					},
					{
						targets: 4,
						 data: "dM_Kho.ghiChu"   
					},
					//{
					//	targets: 5,
					//	 data: "dM_Kho.userTao"   
					//},
					//{
					//	targets: 6,
					//	 data: "dM_Kho.ngayTao" ,
					//render: function (ngayTao) {
					//	if (ngayTao) {
					//		return moment(ngayTao).format('L');
					//	}
					//	return "";
					//}
			  
					//},
					//{
					//	targets: 7,
					//	 data: "dM_Kho.userSuaCuoi"   
					//},
					//{
					//	targets: 8,
					//	 data: "dM_Kho.ngaySuaCuoi" ,
					//render: function (ngaySuaCuoi) {
					//	if (ngaySuaCuoi) {
					//		return moment(ngaySuaCuoi).format('L');
					//	}
					//	return "";
					//}
			  
					//},
					{
						targets: 5,
						 data: "dM_Kho.tenDonVis"   
					}
            ]
        });


        function getDM_Khos() {
            dataTable.ajax.reload();
        }

        function deleteDM_Kho(dM_Kho) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _dM_KhosService.delete({
                            id: dM_Kho.id
                        }).done(function () {
                            getDM_Khos(true);
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

        $('#CreateNewDM_KhoButton').click(function () {
            _createOrEditModal.open();
        });

		$('#ExportToExcelButton').click(function () {
            _dM_KhosService
                .getDM_KhosToExcel({
				filter : $('#DM_KhosTableFilter').val(),
					maKhoFilter: $('#MaKhoFilterId').val(),
					tenKhoFilter: $('#TenKhoFilterId').val(),
					diaDiemFilter: $('#DiaDiemFilterId').val(),
					ghiChuFilter: $('#GhiChuFilterId').val(),
					iD_DonVisFilter: $('#ID_DonVisFilterId').val()
				})
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditDM_KhoModalSaved', function () {
            getDM_Khos();
        });

		$('#GetDM_KhosButton').click(function (e) {
            e.preventDefault();
            getDM_Khos();
        });

		$(document).keypress(function(e) {
		  if(e.which === 13) {
			getDM_Khos();
		  }
		});

    });
})();