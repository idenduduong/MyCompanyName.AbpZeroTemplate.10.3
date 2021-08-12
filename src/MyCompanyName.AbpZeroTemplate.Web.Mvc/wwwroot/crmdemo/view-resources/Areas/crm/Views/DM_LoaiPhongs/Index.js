(function () {
    $(function () {

        var _$dM_LoaiPhongsTable = $('#DM_LoaiPhongsTable');
        var _dM_LoaiPhongsService = abp.services.app.dM_LoaiPhongs;

        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.Categories.DM_LoaiPhongs.Create'),
            edit: abp.auth.hasPermission('Pages.Categories.DM_LoaiPhongs.Edit'),
            'delete': abp.auth.hasPermission('Pages.Categories.DM_LoaiPhongs.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_LoaiPhongs/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_LoaiPhongs/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditDM_LoaiPhongModal'
        });

		 var _viewDM_LoaiPhongModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_LoaiPhongs/ViewdM_LoaiPhongModal',
            modalClass: 'ViewDM_LoaiPhongModal'
        });

        var dataTable = _$dM_LoaiPhongsTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _dM_LoaiPhongsService.getAll,
                inputFilter: function () {
                    return {
					filter: $('#DM_LoaiPhongsTableFilter').val(),
					maLoaiFilter: $('#MaLoaiFilterId').val(),
					tenLoaiFilter: $('#TenLoaiFilterId').val(),
					minSoNguoi_MinFilter: $('#MinSoNguoi_MinFilterId').val(),
					maxSoNguoi_MinFilter: $('#MaxSoNguoi_MinFilterId').val(),
					minSoNguoi_MaxFilter: $('#MinSoNguoi_MaxFilterId').val(),
					maxSoNguoi_MaxFilter: $('#MaxSoNguoi_MaxFilterId').val(),
					suDungFilter: $('#SuDungFilterId').val(),
					minMauSacFilter: $('#MinMauSacFilterId').val(),
					maxMauSacFilter: $('#MaxMauSacFilterId').val()
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
                                    _viewDM_LoaiPhongModal.open({ data: data.record });
                                }
                        },
						{
                            text: app.localize('Edit'),
                            visible: function () {
                                return _permissions.edit;
                            },
                            action: function (data) {
                                _createOrEditModal.open({ id: data.record.dM_LoaiPhong.id });
                            }
                        }, 
						{
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deleteDM_LoaiPhong(data.record.dM_LoaiPhong);
                            }
                        }]
                    }
                },
					{
						targets: 1,
						 data: "dM_LoaiPhong.maLoai"   
					},
					{
						targets: 2,
						 data: "dM_LoaiPhong.tenLoai"   
					},
					{
						targets: 3,
						 data: "dM_LoaiPhong.soNguoi_Min"   
					},
					{
						targets: 4,
						 data: "dM_LoaiPhong.soNguoi_Max"   
					},
					{
						targets: 5,
						 data: "dM_LoaiPhong.suDung"  ,
						render: function (suDung) {
							if (suDung) {
								return '<i class="la la-check-square m--font-success" title="True"></i>';
							}
							return '<i class="la la-times-circle" title="False"></i>';
					}
			 
					},
					{
						targets: 6,
						 data: "dM_LoaiPhong.mauSac"   
					}//,
					//{
					//	targets: 7,
					//	 data: "dM_LoaiPhong.userNhap"   
					//},
					//{
					//	targets: 8,
					//	 data: "dM_LoaiPhong.ngayNhap" ,
					//render: function (ngayNhap) {
					//	if (ngayNhap) {
					//		return moment(ngayNhap).format('L');
					//	}
					//	return "";
					//}
			  
					//},
					//{
					//	targets: 9,
					//	 data: "dM_LoaiPhong.userSua"   
					//},
					//{
					//	targets: 10,
					//	 data: "dM_LoaiPhong.ngaySuaCuoi" ,
					//render: function (ngaySuaCuoi) {
					//	if (ngaySuaCuoi) {
					//		return moment(ngaySuaCuoi).format('L');
					//	}
					//	return "";
					//}
			  
					//}
            ]
        });


        function getDM_LoaiPhongs() {
            dataTable.ajax.reload();
        }

        function deleteDM_LoaiPhong(dM_LoaiPhong) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _dM_LoaiPhongsService.delete({
                            id: dM_LoaiPhong.id
                        }).done(function () {
                            getDM_LoaiPhongs(true);
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

        $('#CreateNewDM_LoaiPhongButton').click(function () {
            _createOrEditModal.open();
        });

		$('#ExportToExcelButton').click(function () {
            _dM_LoaiPhongsService
                .getDM_LoaiPhongsToExcel({
				filter : $('#DM_LoaiPhongsTableFilter').val(),
					maLoaiFilter: $('#MaLoaiFilterId').val(),
					tenLoaiFilter: $('#TenLoaiFilterId').val(),
					minSoNguoi_MinFilter: $('#MinSoNguoi_MinFilterId').val(),
					maxSoNguoi_MinFilter: $('#MaxSoNguoi_MinFilterId').val(),
					minSoNguoi_MaxFilter: $('#MinSoNguoi_MaxFilterId').val(),
					maxSoNguoi_MaxFilter: $('#MaxSoNguoi_MaxFilterId').val(),
					suDungFilter: $('#SuDungFilterId').val(),
					minMauSacFilter: $('#MinMauSacFilterId').val(),
					maxMauSacFilter: $('#MaxMauSacFilterId').val()
				})
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditDM_LoaiPhongModalSaved', function () {
            getDM_LoaiPhongs();
        });

		$('#GetDM_LoaiPhongsButton').click(function (e) {
            e.preventDefault();
            getDM_LoaiPhongs();
        });

		$(document).keypress(function(e) {
		  if(e.which === 13) {
			getDM_LoaiPhongs();
		  }
		});

    });
})();