(function () {
    $(function () {

        var _$dM_TrangThaisTable = $('#DM_TrangThaisTable');
        var _dM_TrangThaisService = abp.services.app.dM_TrangThais;

        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.Categories.DM_TrangThais.Create'),
            edit: abp.auth.hasPermission('Pages.Categories.DM_TrangThais.Edit'),
            'delete': abp.auth.hasPermission('Pages.Categories.DM_TrangThais.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_TrangThais/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_TrangThais/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditDM_TrangThaiModal'
        });

		 var _viewDM_TrangThaiModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_TrangThais/ViewdM_TrangThaiModal',
            modalClass: 'ViewDM_TrangThaiModal'
        });

        var dataTable = _$dM_TrangThaisTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _dM_TrangThaisService.getAll,
                inputFilter: function () {
                    return {
					filter: $('#DM_TrangThaisTableFilter').val(),
					tenTrangThaiFilter: $('#TenTrangThaiFilterId').val()
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
                                    _viewDM_TrangThaiModal.open({ data: data.record });
                                }
                        },
						{
                            text: app.localize('Edit'),
                            visible: function () {
                                return _permissions.edit;
                            },
                            action: function (data) {
                                _createOrEditModal.open({ id: data.record.dM_TrangThai.id });
                            }
                        }, 
						{
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deleteDM_TrangThai(data.record.dM_TrangThai);
                            }
                        }]
                    }
                },
					{
						targets: 1,
						 data: "dM_TrangThai.tenTrangThai"   
					},
					//{
					//	targets: 2,
					//	 data: "dM_TrangThai.userTao"   
					//},
					//{
					//	targets: 3,
					//	 data: "dM_TrangThai.ngayTao" ,
					//render: function (ngayTao) {
					//	if (ngayTao) {
					//		return moment(ngayTao).format('L');
					//	}
					//	return "";
					//}
			  
					//},
					//{
					//	targets: 4,
					//	 data: "dM_TrangThai.userSuaCuoi"   
					//},
					//{
					//	targets: 5,
					//	 data: "dM_TrangThai.ngaySuaCuoi" ,
					//render: function (ngaySuaCuoi) {
					//	if (ngaySuaCuoi) {
					//		return moment(ngaySuaCuoi).format('L');
					//	}
					//	return "";
					//}
			  
					//}
            ]
        });


        function getDM_TrangThais() {
            dataTable.ajax.reload();
        }

        function deleteDM_TrangThai(dM_TrangThai) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _dM_TrangThaisService.delete({
                            id: dM_TrangThai.id
                        }).done(function () {
                            getDM_TrangThais(true);
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

        $('#CreateNewDM_TrangThaiButton').click(function () {
            _createOrEditModal.open();
        });

		$('#ExportToExcelButton').click(function () {
            _dM_TrangThaisService
                .getDM_TrangThaisToExcel({
				filter : $('#DM_TrangThaisTableFilter').val(),
					tenTrangThaiFilter: $('#TenTrangThaiFilterId').val()
				})
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditDM_TrangThaiModalSaved', function () {
            getDM_TrangThais();
        });

		$('#GetDM_TrangThaisButton').click(function (e) {
            e.preventDefault();
            getDM_TrangThais();
        });

		$(document).keypress(function(e) {
		  if(e.which === 13) {
			getDM_TrangThais();
		  }
		});

    });
})();