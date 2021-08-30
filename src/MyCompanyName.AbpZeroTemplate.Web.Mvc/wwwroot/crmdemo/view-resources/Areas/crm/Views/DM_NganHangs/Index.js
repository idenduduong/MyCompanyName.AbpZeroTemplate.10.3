(function () {
    $(function () {

        var _$dM_NganHangsTable = $('#DM_NganHangsTable');
        var _dM_NganHangsService = abp.services.app.dM_NganHangs;

        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.Categories.DM_NganHangs.Create'),
            edit: abp.auth.hasPermission('Pages.Categories.DM_NganHangs.Edit'),
            'delete': abp.auth.hasPermission('Pages.Categories.DM_NganHangs.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_NganHangs/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_NganHangs/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditDM_NganHangModal'
        });

		 var _viewDM_NganHangModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_NganHangs/ViewdM_NganHangModal',
            modalClass: 'ViewDM_NganHangModal'
        });

        var dataTable = _$dM_NganHangsTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _dM_NganHangsService.getAll,
                inputFilter: function () {
                    return {
					filter: $('#DM_NganHangsTableFilter').val(),
					maNganHangFilter: $('#MaNganHangFilterId').val(),
					tenNganHangFilter: $('#TenNganHangFilterId').val(),
					chiNhanhFilter: $('#ChiNhanhFilterId').val(),
					ghiChuFilter: $('#GhiChuFilterId').val(),
					minChiPhiThanhToanFilter: $('#MinChiPhiThanhToanFilterId').val(),
					maxChiPhiThanhToanFilter: $('#MaxChiPhiThanhToanFilterId').val(),
					theoPhanTramFilter: $('#TheoPhanTramFilterId').val(),
					macDinhFilter: $('#MacDinhFilterId').val(),
					thuPhiThanhToanFilter: $('#ThuPhiThanhToanFilterId').val()
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
                                    _viewDM_NganHangModal.open({ data: data.record });
                                }
                        },
						{
                            text: app.localize('Edit'),
                            visible: function () {
                                return _permissions.edit;
                            },
                            action: function (data) {
                                _createOrEditModal.open({ id: data.record.dM_NganHang.id });
                            }
                        }, 
						{
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deleteDM_NganHang(data.record.dM_NganHang);
                            }
                        }]
                    }
                },
					{
						targets: 1,
						 data: "dM_NganHang.maNganHang"   
					},
					{
						targets: 2,
						 data: "dM_NganHang.tenNganHang"   
					},
					{
						targets: 3,
						 data: "dM_NganHang.chiNhanh"   
					},
					{
						targets: 4,
						 data: "dM_NganHang.ghiChu"   
					},
					//{
					//	targets: 5,
					//	 data: "dM_NganHang.userTao"   
					//},
					//{
					//	targets: 6,
					//	 data: "dM_NganHang.ngayTao" ,
					//render: function (ngayTao) {
					//	if (ngayTao) {
					//		return moment(ngayTao).format('L');
					//	}
					//	return "";
					//}
			  
					//},
					//{
					//	targets: 7,
					//	 data: "dM_NganHang.userSuaCuoi"   
					//},
					//{
					//	targets: 8,
					//	 data: "dM_NganHang.ngaySuaCuoi" ,
					//render: function (ngaySuaCuoi) {
					//	if (ngaySuaCuoi) {
					//		return moment(ngaySuaCuoi).format('L');
					//	}
					//	return "";
					//}
			  
					//},
					{
						targets: 5,
						 data: "dM_NganHang.chiPhiThanhToan"   
					},
					{
						targets: 6,
						 data: "dM_NganHang.theoPhanTram"  ,
						render: function (theoPhanTram) {
							if (theoPhanTram) {
								return '<i class="la la-check-square m--font-success" title="True"></i>';
							}
							return '<i class="la la-times-circle" title="False"></i>';
					}
			 
					},
					{
						targets: 7,
						 data: "dM_NganHang.macDinh"  ,
						render: function (macDinh) {
							if (macDinh) {
								return '<i class="la la-check-square m--font-success" title="True"></i>';
							}
							return '<i class="la la-times-circle" title="False"></i>';
					}
			 
					},
					{
						targets: 8,
						 data: "dM_NganHang.thuPhiThanhToan"  ,
						render: function (thuPhiThanhToan) {
							if (thuPhiThanhToan) {
								return '<i class="la la-check-square m--font-success" title="True"></i>';
							}
							return '<i class="la la-times-circle" title="False"></i>';
					}
			 
					}
            ]
        });


        function getDM_NganHangs() {
            dataTable.ajax.reload();
        }

        function deleteDM_NganHang(dM_NganHang) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _dM_NganHangsService.delete({
                            id: dM_NganHang.id
                        }).done(function () {
                            getDM_NganHangs(true);
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

        $('#CreateNewDM_NganHangButton').click(function () {
            _createOrEditModal.open();
        });

		$('#ExportToExcelButton').click(function () {
            _dM_NganHangsService
                .getDM_NganHangsToExcel({
				filter : $('#DM_NganHangsTableFilter').val(),
					maNganHangFilter: $('#MaNganHangFilterId').val(),
					tenNganHangFilter: $('#TenNganHangFilterId').val(),
					chiNhanhFilter: $('#ChiNhanhFilterId').val(),
					ghiChuFilter: $('#GhiChuFilterId').val(),
					minChiPhiThanhToanFilter: $('#MinChiPhiThanhToanFilterId').val(),
					maxChiPhiThanhToanFilter: $('#MaxChiPhiThanhToanFilterId').val(),
					theoPhanTramFilter: $('#TheoPhanTramFilterId').val(),
					macDinhFilter: $('#MacDinhFilterId').val(),
					thuPhiThanhToanFilter: $('#ThuPhiThanhToanFilterId').val()
				})
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditDM_NganHangModalSaved', function () {
            getDM_NganHangs();
        });

		$('#GetDM_NganHangsButton').click(function (e) {
            e.preventDefault();
            getDM_NganHangs();
        });

		$(document).keypress(function(e) {
		  if(e.which === 13) {
			getDM_NganHangs();
		  }
		});

    });
})();