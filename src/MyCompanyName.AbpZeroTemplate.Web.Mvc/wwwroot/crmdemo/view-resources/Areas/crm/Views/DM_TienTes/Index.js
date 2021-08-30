(function () {
    $(function () {

        var _$dM_TienTesTable = $('#DM_TienTesTable');
        var _dM_TienTesService = abp.services.app.dM_TienTes;

        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.Categories.DM_TienTes.Create'),
            edit: abp.auth.hasPermission('Pages.Categories.DM_TienTes.Edit'),
            'delete': abp.auth.hasPermission('Pages.Categories.DM_TienTes.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_TienTes/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_TienTes/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditDM_TienTeModal'
        });

		 var _viewDM_TienTeModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_TienTes/ViewdM_TienTeModal',
            modalClass: 'ViewDM_TienTeModal'
        });

        var dataTable = _$dM_TienTesTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _dM_TienTesService.getAll,
                inputFilter: function () {
                    return {
					filter: $('#DM_TienTesTableFilter').val(),
					maNgoaiTeFilter: $('#MaNgoaiTeFilterId').val(),
					tenNgoaiTeFilter: $('#TenNgoaiTeFilterId').val(),
					ghiChuFilter: $('#GhiChuFilterId').val(),
					laNoiTeFilter: $('#LaNoiTeFilterId').val(),
					dM_QuocGiaTenNuocFilter: $('#DM_QuocGiaTenNuocFilterId').val()
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
                                    _viewDM_TienTeModal.open({ data: data.record });
                                }
                        },
						{
                            text: app.localize('Edit'),
                            visible: function () {
                                return _permissions.edit;
                            },
                            action: function (data) {
                                _createOrEditModal.open({ id: data.record.dM_TienTe.id });
                            }
                        }, 
						{
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deleteDM_TienTe(data.record.dM_TienTe);
                            }
                        }]
                    }
                },
					{
						targets: 1,
                        data: "dM_TienTe.maNgoaiTe" ,  
					},
					{
						targets: 2,
                        data: "dM_TienTe.tenNgoaiTe",
      

					},
					{
						targets: 3,
						 data: "dM_TienTe.ghiChu"   
					},
					{
						targets: 4,
						 data: "dM_TienTe.laNoiTe"  ,
						render: function (laNoiTe) {
							if (laNoiTe) {
								return '<i class="la la-check-square m--font-success" title="True"></i>';
							}
							return '<i class="la la-times-circle" title="False"></i>';
					}
			 
					},
					//{
					//	targets: 5,
					//	 data: "dM_TienTe.userTao"   
					//},
					//{
					//	targets: 6,
					//	 data: "dM_TienTe.ngayTao" ,
					//render: function (ngayTao) {
					//	if (ngayTao) {
					//		return moment(ngayTao).format('L');
					//	}
					//	return "";
					//}
			  
					//},
					//{
					//	targets: 7,
					//	 data: "dM_TienTe.userSuaCuoi"   
					//},
					//{
					//	targets: 8,
					//	 data: "dM_TienTe.ngaySuaCuoi" ,
					//render: function (ngaySuaCuoi) {
					//	if (ngaySuaCuoi) {
					//		return moment(ngaySuaCuoi).format('L');
					//	}
					//	return "";
					//}
			  
					//},
					{
						targets: 5,
						 data: "dM_QuocGiaTenNuoc" 
					}
            ]
        });


        function getDM_TienTes() {
            dataTable.ajax.reload();
        }

        function deleteDM_TienTe(dM_TienTe) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _dM_TienTesService.delete({
                            id: dM_TienTe.id
                        }).done(function () {
                            getDM_TienTes(true);
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

        $('#CreateNewDM_TienTeButton').click(function () {
            _createOrEditModal.open();
        });

		$('#ExportToExcelButton').click(function () {
            _dM_TienTesService
                .getDM_TienTesToExcel({
				filter : $('#DM_TienTesTableFilter').val(),
					maNgoaiTeFilter: $('#MaNgoaiTeFilterId').val(),
					tenNgoaiTeFilter: $('#TenNgoaiTeFilterId').val(),
					ghiChuFilter: $('#GhiChuFilterId').val(),
					laNoiTeFilter: $('#LaNoiTeFilterId').val(),
					dM_QuocGiaTenNuocFilter: $('#DM_QuocGiaTenNuocFilterId').val()
				})
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditDM_TienTeModalSaved', function () {
            getDM_TienTes();
        });

		$('#GetDM_TienTesButton').click(function (e) {
            e.preventDefault();
            getDM_TienTes();
        });

		$(document).keypress(function(e) {
		  if(e.which === 13) {
			getDM_TienTes();
		  }
		});

    });
})();