(function () {
    $(function () {

        var _$dM_NhomDoiTuongsTable = $('#DM_NhomDoiTuongsTable');
        var _dM_NhomDoiTuongsService = abp.services.app.dM_NhomDoiTuongs;

        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.Categories.DM_NhomDoiTuongs.Create'),
            edit: abp.auth.hasPermission('Pages.Categories.DM_NhomDoiTuongs.Edit'),
            'delete': abp.auth.hasPermission('Pages.Categories.DM_NhomDoiTuongs.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_NhomDoiTuongs/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_NhomDoiTuongs/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditDM_NhomDoiTuongModal'
        });

		 var _viewDM_NhomDoiTuongModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_NhomDoiTuongs/ViewdM_NhomDoiTuongModal',
            modalClass: 'ViewDM_NhomDoiTuongModal'
        });

        var dataTable = _$dM_NhomDoiTuongsTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _dM_NhomDoiTuongsService.getAll,
                inputFilter: function () {
                    return {
					filter: $('#DM_NhomDoiTuongsTableFilter').val(),
					minLoaiDoiTuongFilter: $('#MinLoaiDoiTuongFilterId').val(),
					maxLoaiDoiTuongFilter: $('#MaxLoaiDoiTuongFilterId').val(),
					maNhomFilter: $('#MaNhomFilterId').val(),
					tenNhomFilter: $('#TenNhomFilterId').val(),
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
                                    _viewDM_NhomDoiTuongModal.open({ data: data.record });
                                }
                        },
						{
                            text: app.localize('Edit'),
                            visible: function () {
                                return _permissions.edit;
                            },
                            action: function (data) {
                                _createOrEditModal.open({ id: data.record.dM_NhomDoiTuong.id });
                            }
                        }, 
						{
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deleteDM_NhomDoiTuong(data.record.dM_NhomDoiTuong);
                            }
                        }]
                    }
                },
					{
						targets: 1,
						 data: "dM_NhomDoiTuong.loaiDoiTuong"   
					},
					{
						targets: 2,
						 data: "dM_NhomDoiTuong.maNhom"   
					},
					{
						targets: 3,
						 data: "dM_NhomDoiTuong.tenNhom"   
					},
					{
						targets: 4,
						 data: "dM_NhomDoiTuong.ghiChu"   
					}//,
					//{
					//	targets: 5,
					//	 data: "dM_NhomDoiTuong.userTao"   
					//},
					//{
					//	targets: 6,
					//	 data: "dM_NhomDoiTuong.ngayTao" ,
					//render: function (ngayTao) {
					//	if (ngayTao) {
					//		return moment(ngayTao).format('L');
					//	}
					//	return "";
					//}
			  
					//},
					//{
					//	targets: 7,
					//	 data: "dM_NhomDoiTuong.userSuaCuoi"   
					//},
					//{
					//	targets: 8,
					//	 data: "dM_NhomDoiTuong.ngaySuaCuoi" ,
					//render: function (ngaySuaCuoi) {
					//	if (ngaySuaCuoi) {
					//		return moment(ngaySuaCuoi).format('L');
					//	}
					//	return "";
					//}
			  
					//}
            ]
        });


        function getDM_NhomDoiTuongs() {
            dataTable.ajax.reload();
        }

        function deleteDM_NhomDoiTuong(dM_NhomDoiTuong) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _dM_NhomDoiTuongsService.delete({
                            id: dM_NhomDoiTuong.id
                        }).done(function () {
                            getDM_NhomDoiTuongs(true);
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

        $('#CreateNewDM_NhomDoiTuongButton').click(function () {
            _createOrEditModal.open();
        });

		$('#ExportToExcelButton').click(function () {
            _dM_NhomDoiTuongsService
                .getDM_NhomDoiTuongsToExcel({
				filter : $('#DM_NhomDoiTuongsTableFilter').val(),
					minLoaiDoiTuongFilter: $('#MinLoaiDoiTuongFilterId').val(),
					maxLoaiDoiTuongFilter: $('#MaxLoaiDoiTuongFilterId').val(),
					maNhomFilter: $('#MaNhomFilterId').val(),
					tenNhomFilter: $('#TenNhomFilterId').val(),
					ghiChuFilter: $('#GhiChuFilterId').val()
				})
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditDM_NhomDoiTuongModalSaved', function () {
            getDM_NhomDoiTuongs();
        });

		$('#GetDM_NhomDoiTuongsButton').click(function (e) {
            e.preventDefault();
            getDM_NhomDoiTuongs();
        });

		$(document).keypress(function(e) {
		  if(e.which === 13) {
			getDM_NhomDoiTuongs();
		  }
		});

    });
})();