(function () {
    $(function () {

        var _$dM_ThueSuatsTable = $('#DM_ThueSuatsTable');
        var _dM_ThueSuatsService = abp.services.app.dM_ThueSuats;

        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.Categories.DM_ThueSuats.Create'),
            edit: abp.auth.hasPermission('Pages.Categories.DM_ThueSuats.Edit'),
            'delete': abp.auth.hasPermission('Pages.Categories.DM_ThueSuats.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_ThueSuats/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_ThueSuats/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditDM_ThueSuatModal'
        });

		 var _viewDM_ThueSuatModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_ThueSuats/ViewdM_ThueSuatModal',
            modalClass: 'ViewDM_ThueSuatModal'
        });

        var dataTable = _$dM_ThueSuatsTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _dM_ThueSuatsService.getAll,
                inputFilter: function () {
                    return {
					filter: $('#DM_ThueSuatsTableFilter').val(),
					maThueSuatFilter: $('#MaThueSuatFilterId').val(),
					minThueSuatFilter: $('#MinThueSuatFilterId').val(),
					maxThueSuatFilter: $('#MaxThueSuatFilterId').val(),
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
                                    _viewDM_ThueSuatModal.open({ data: data.record });
                                }
                        },
						{
                            text: app.localize('Edit'),
                            visible: function () {
                                return _permissions.edit;
                            },
                            action: function (data) {
                                _createOrEditModal.open({ id: data.record.dM_ThueSuat.id });
                            }
                        }, 
						{
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deleteDM_ThueSuat(data.record.dM_ThueSuat);
                            }
                        }]
                    }
                },
					{
						targets: 1,
						 data: "dM_ThueSuat.maThueSuat"   
					},
					{
						targets: 2,
						 data: "dM_ThueSuat.thueSuat"   
					},
					{
						targets: 3,
						 data: "dM_ThueSuat.ghiChu"   
					}//,
					//{
					//	targets: 4,
					//	 data: "dM_ThueSuat.userTao"   
					//},
					//{
					//	targets: 5,
					//	 data: "dM_ThueSuat.ngayTao" ,
					//render: function (ngayTao) {
					//	if (ngayTao) {
					//		return moment(ngayTao).format('L');
					//	}
					//	return "";
					//}
			  
					//},
					//{
					//	targets: 6,
					//	 data: "dM_ThueSuat.userSuaCuoi"   
					//},
					//{
					//	targets: 7,
					//	 data: "dM_ThueSuat.ngaySuaCuoi" ,
					//render: function (ngaySuaCuoi) {
					//	if (ngaySuaCuoi) {
					//		return moment(ngaySuaCuoi).format('L');
					//	}
					//	return "";
					//}
			  
					//}
            ]
        });


        function getDM_ThueSuats() {
            dataTable.ajax.reload();
        }

        function deleteDM_ThueSuat(dM_ThueSuat) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _dM_ThueSuatsService.delete({
                            id: dM_ThueSuat.id
                        }).done(function () {
                            getDM_ThueSuats(true);
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

        $('#CreateNewDM_ThueSuatButton').click(function () {
            _createOrEditModal.open();
        });

		$('#ExportToExcelButton').click(function () {
            _dM_ThueSuatsService
                .getDM_ThueSuatsToExcel({
				filter : $('#DM_ThueSuatsTableFilter').val(),
					maThueSuatFilter: $('#MaThueSuatFilterId').val(),
					minThueSuatFilter: $('#MinThueSuatFilterId').val(),
					maxThueSuatFilter: $('#MaxThueSuatFilterId').val(),
					ghiChuFilter: $('#GhiChuFilterId').val()
				})
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditDM_ThueSuatModalSaved', function () {
            getDM_ThueSuats();
        });

		$('#GetDM_ThueSuatsButton').click(function (e) {
            e.preventDefault();
            getDM_ThueSuats();
        });

		$(document).keypress(function(e) {
		  if(e.which === 13) {
			getDM_ThueSuats();
		  }
		});

    });
})();