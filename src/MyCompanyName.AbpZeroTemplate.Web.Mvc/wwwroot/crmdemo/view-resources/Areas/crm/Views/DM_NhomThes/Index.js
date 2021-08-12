(function () {
    $(function () {

        var _$dM_NhomThesTable = $('#DM_NhomThesTable');
        var _dM_NhomThesService = abp.services.app.dM_NhomThes;

        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.Categories.DM_NhomThes.Create'),
            edit: abp.auth.hasPermission('Pages.Categories.DM_NhomThes.Edit'),
            'delete': abp.auth.hasPermission('Pages.Categories.DM_NhomThes.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_NhomThes/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_NhomThes/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditDM_NhomTheModal'
        });

		 var _viewDM_NhomTheModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_NhomThes/ViewdM_NhomTheModal',
            modalClass: 'ViewDM_NhomTheModal'
        });

        var dataTable = _$dM_NhomThesTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _dM_NhomThesService.getAll,
                inputFilter: function () {
                    return {
					filter: $('#DM_NhomThesTableFilter').val(),
					maNhomTheFilter: $('#MaNhomTheFilterId').val(),
					tenNhomTheFilter: $('#TenNhomTheFilterId').val(),
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
                                    _viewDM_NhomTheModal.open({ data: data.record });
                                }
                        },
						{
                            text: app.localize('Edit'),
                            visible: function () {
                                return _permissions.edit;
                            },
                            action: function (data) {
                                _createOrEditModal.open({ id: data.record.dM_NhomThe.id });
                            }
                        }, 
						{
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deleteDM_NhomThe(data.record.dM_NhomThe);
                            }
                        }]
                    }
                },
					{
						targets: 1,
						 data: "dM_NhomThe.maNhomThe"   
					},
					{
						targets: 2,
						 data: "dM_NhomThe.tenNhomThe"   
					},
					{
						targets: 3,
						 data: "dM_NhomThe.ghiChu"   
					}//,
					//{
					//	targets: 4,
					//	 data: "dM_NhomThe.userTao"   
					//},
					//{
					//	targets: 5,
					//	 data: "dM_NhomThe.ngayTao" ,
					//render: function (ngayTao) {
					//	if (ngayTao) {
					//		return moment(ngayTao).format('L');
					//	}
					//	return "";
					//}
			  
					//},
					//{
					//	targets: 6,
					//	 data: "dM_NhomThe.userSuaCuoi"   
					//},
					//{
					//	targets: 7,
					//	 data: "dM_NhomThe.ngaySuaCuoi" ,
					//render: function (ngaySuaCuoi) {
					//	if (ngaySuaCuoi) {
					//		return moment(ngaySuaCuoi).format('L');
					//	}
					//	return "";
					//}
			  
					//}
            ]
        });


        function getDM_NhomThes() {
            dataTable.ajax.reload();
        }

        function deleteDM_NhomThe(dM_NhomThe) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _dM_NhomThesService.delete({
                            id: dM_NhomThe.id
                        }).done(function () {
                            getDM_NhomThes(true);
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

        $('#CreateNewDM_NhomTheButton').click(function () {
            _createOrEditModal.open();
        });

		$('#ExportToExcelButton').click(function () {
            _dM_NhomThesService
                .getDM_NhomThesToExcel({
				filter : $('#DM_NhomThesTableFilter').val(),
					maNhomTheFilter: $('#MaNhomTheFilterId').val(),
					tenNhomTheFilter: $('#TenNhomTheFilterId').val(),
					ghiChuFilter: $('#GhiChuFilterId').val()
				})
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditDM_NhomTheModalSaved', function () {
            getDM_NhomThes();
        });

		$('#GetDM_NhomThesButton').click(function (e) {
            e.preventDefault();
            getDM_NhomThes();
        });

		$(document).keypress(function(e) {
		  if(e.which === 13) {
			getDM_NhomThes();
		  }
		});

    });
})();