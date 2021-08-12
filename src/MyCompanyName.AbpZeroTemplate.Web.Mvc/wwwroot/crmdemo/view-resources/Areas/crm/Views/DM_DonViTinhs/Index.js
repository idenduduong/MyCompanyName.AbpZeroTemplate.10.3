(function () {
    $(function () {

        var _$dM_DonViTinhsTable = $('#DM_DonViTinhsTable');
        var _dM_DonViTinhsService = abp.services.app.dM_DonViTinhs;

        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.Categories.DM_DonViTinhs.Create'),
            edit: abp.auth.hasPermission('Pages.Categories.DM_DonViTinhs.Edit'),
            'delete': abp.auth.hasPermission('Pages.Categories.DM_DonViTinhs.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_DonViTinhs/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_DonViTinhs/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditDM_DonViTinhModal'
        });

		 var _viewDM_DonViTinhModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_DonViTinhs/ViewdM_DonViTinhModal',
            modalClass: 'ViewDM_DonViTinhModal'
        });

        var dataTable = _$dM_DonViTinhsTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _dM_DonViTinhsService.getAll,
                enablelocalStorage:true,
                inputFilter: function () {
                    return {
					filter: $('#DM_DonViTinhsTableFilter').val(),
					maDonViTinhFilter: $('#MaDonViTinhFilterId').val(),
					tenDonViTinhFilter: $('#TenDonViTinhFilterId').val(),
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
                                    _viewDM_DonViTinhModal.open({ data: data.record });
                                }
                        },
						{
                            text: app.localize('Edit'),
                            visible: function () {
                                return _permissions.edit;
                            },
                            action: function (data) {
                                _createOrEditModal.open({ id: data.record.dM_DonViTinh.id });
                            }
                        }, 
						{
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deleteDM_DonViTinh(data.record.dM_DonViTinh);
                            }
                        }]
                    },
                },
					{
						targets: 1,
                        data: "dM_DonViTinh.maDonViTinh",
					},
					{
						targets: 2,
                        data: "dM_DonViTinh.tenDonViTinh",
					},
					{
						targets: 3,
                        data: "dM_DonViTinh.ghiChu",
					}
                    //,
					//{
					//	targets: 4,
					//	 data: "dM_DonViTinh.userTao"   
					//},
					//{
					//	targets: 5,
					//	 data: "dM_DonViTinh.ngayTao" ,
					//render: function (ngayTao) {
					//	if (ngayTao) {
					//		return moment(ngayTao).format('L');
					//	}
					//	return "";
					//}
			  
					//},
					//{
					//	targets: 6,
					//	 data: "dM_DonViTinh.userSuaCuoi"   
					//},
					//{
					//	targets: 7,
					//	 data: "dM_DonViTinh.ngaySuaCuoi" ,
					//render: function (ngaySuaCuoi) {
					//	if (ngaySuaCuoi) {
					//		return moment(ngaySuaCuoi).format('L');
					//	}
					//	return "";
					//}
			  
					//}
            ]
        });


        function getDM_DonViTinhs() {
            dataTable.ajax.reload();
        }

        function deleteDM_DonViTinh(dM_DonViTinh) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _dM_DonViTinhsService.delete({
                            id: dM_DonViTinh.id
                        }).done(function () {
                            getDM_DonViTinhs(true);
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

        $('#CreateNewDM_DonViTinhButton').click(function () {
            _createOrEditModal.open();
        });

		$('#ExportToExcelButton').click(function () {
            _dM_DonViTinhsService
                .getDM_DonViTinhsToExcel({
				filter : $('#DM_DonViTinhsTableFilter').val(),
					maDonViTinhFilter: $('#MaDonViTinhFilterId').val(),
					tenDonViTinhFilter: $('#TenDonViTinhFilterId').val(),
					ghiChuFilter: $('#GhiChuFilterId').val()
				})
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditDM_DonViTinhModalSaved', function () {
            getDM_DonViTinhs();
        });

		$('#GetDM_DonViTinhsButton').click(function (e) {
            e.preventDefault();
            getDM_DonViTinhs();
        });

		$(document).keypress(function(e) {
		  if(e.which === 13) {
			getDM_DonViTinhs();
		  }
		});

    });
})();