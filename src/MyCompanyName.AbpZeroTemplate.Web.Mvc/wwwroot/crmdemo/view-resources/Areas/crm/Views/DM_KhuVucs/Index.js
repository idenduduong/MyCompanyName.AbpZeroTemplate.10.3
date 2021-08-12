(function () {
    $(function () {

        var _$dM_KhuVucsTable = $('#DM_KhuVucsTable');
        var _dM_KhuVucsService = abp.services.app.dM_KhuVucs;

        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.Categories.Locations.DM_KhuVucs.Create'),
            edit: abp.auth.hasPermission('Pages.Categories.Locations.DM_KhuVucs.Edit'),
            'delete': abp.auth.hasPermission('Pages.Categories.Locations.DM_KhuVucs.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_KhuVucs/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_KhuVucs/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditDM_KhuVucModal'
        });

		 var _viewDM_KhuVucModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_KhuVucs/ViewdM_KhuVucModal',
            modalClass: 'ViewDM_KhuVucModal'
        });

        var dataTable = _$dM_KhuVucsTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _dM_KhuVucsService.getAll,
                inputFilter: function () {
                    return {
					filter: $('#DM_KhuVucsTableFilter').val(),
					maKhuVucFilter: $('#MaKhuVucFilterId').val(),
					tenKhuVucFilter: $('#TenKhuVucFilterId').val(),
					ghiChuFilter: $('#GhiChuFilterId').val(),
					minTangFilter: $('#MinTangFilterId').val(),
					maxTangFilter: $('#MaxTangFilterId').val(),
					soDoKhuVucFilter: $('#SoDoKhuVucFilterId').val()
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
                                    _viewDM_KhuVucModal.open({ data: data.record });
                                }
                        },
						{
                            text: app.localize('Edit'),
                            visible: function () {
                                return _permissions.edit;
                            },
                            action: function (data) {
                                _createOrEditModal.open({ id: data.record.dM_KhuVuc.id });
                            }
                        }, 
						{
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deleteDM_KhuVuc(data.record.dM_KhuVuc);
                            }
                        }]
                    }
                },
					{
						targets: 1,
						 data: "dM_KhuVuc.maKhuVuc"   
					},
					{
						targets: 2,
						 data: "dM_KhuVuc.tenKhuVuc"   
					},
					{
						targets: 3,
						 data: "dM_KhuVuc.ghiChu"   
					},
					{
						targets: 4,
						 data: "dM_KhuVuc.tang"   
					},
					//{
					//	targets: 5,
					//	 data: "dM_KhuVuc.userTao"   
					//},
					//{
					//	targets: 6,
					//	 data: "dM_KhuVuc.ngayTao" ,
					//render: function (ngayTao) {
					//	if (ngayTao) {
					//		return moment(ngayTao).format('L');
					//	}
					//	return "";
					//}
			  
					//},
					//{
					//	targets: 7,
					//	 data: "dM_KhuVuc.userSuaCuoi"   
					//},
					//{
					//	targets: 8,
					//	 data: "dM_KhuVuc.ngaySuaCuoi" ,
					//render: function (ngaySuaCuoi) {
					//	if (ngaySuaCuoi) {
					//		return moment(ngaySuaCuoi).format('L');
					//	}
					//	return "";
					//}
			  
					//},
					{
						targets: 5,
						 data: "dM_KhuVuc.soDoKhuVuc"   
					}
            ]
        });


        function getDM_KhuVucs() {
            dataTable.ajax.reload();
        }

        function deleteDM_KhuVuc(dM_KhuVuc) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _dM_KhuVucsService.delete({
                            id: dM_KhuVuc.id
                        }).done(function () {
                            getDM_KhuVucs(true);
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

        $('#CreateNewDM_KhuVucButton').click(function () {
            _createOrEditModal.open();
        });

		$('#ExportToExcelButton').click(function () {
            _dM_KhuVucsService
                .getDM_KhuVucsToExcel({
				filter : $('#DM_KhuVucsTableFilter').val(),
					maKhuVucFilter: $('#MaKhuVucFilterId').val(),
					tenKhuVucFilter: $('#TenKhuVucFilterId').val(),
					ghiChuFilter: $('#GhiChuFilterId').val(),
					minTangFilter: $('#MinTangFilterId').val(),
					maxTangFilter: $('#MaxTangFilterId').val(),
					soDoKhuVucFilter: $('#SoDoKhuVucFilterId').val()
				})
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditDM_KhuVucModalSaved', function () {
            getDM_KhuVucs();
        });

		$('#GetDM_KhuVucsButton').click(function (e) {
            e.preventDefault();
            getDM_KhuVucs();
        });

		$(document).keypress(function(e) {
		  if(e.which === 13) {
			getDM_KhuVucs();
		  }
		});

    });
})();