(function () {
    $(function () {

        var _$dM_LoHangsTable = $('#DM_LoHangsTable');
        var _dM_LoHangsService = abp.services.app.dM_LoHangs;

        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.DM_LoHangs.Create'),
            edit: abp.auth.hasPermission('Pages.DM_LoHangs.Edit'),
            'delete': abp.auth.hasPermission('Pages.DM_LoHangs.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_LoHangs/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_LoHangs/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditDM_LoHangModal'
        });

		 var _viewDM_LoHangModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_LoHangs/ViewdM_LoHangModal',
            modalClass: 'ViewDM_LoHangModal'
        });

        var dataTable = _$dM_LoHangsTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _dM_LoHangsService.getAll,
                inputFilter: function () {
                    return {
					filter: $('#DM_LoHangsTableFilter').val(),
					soLoFilter: $('#SoLoFilterId').val(),
					minNgaySanXuatFilter: $('#MinNgaySanXuatFilterId').val(),
					maxNgaySanXuatFilter: $('#MaxNgaySanXuatFilterId').val(),
					minNgayHetHanFilter: $('#MinNgayHetHanFilterId').val(),
					maxNgayHetHanFilter: $('#MaxNgayHetHanFilterId').val(),
					tenLoFilter: $('#TenLoFilterId').val(),
					dM_HangHoaTenHangHoaFilter: $('#DM_HangHoaTenHangHoaFilterId').val()
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
                                    _viewDM_LoHangModal.open({ data: data.record });
                                }
                        },
						{
                            text: app.localize('Edit'),
                            visible: function () {
                                return _permissions.edit;
                            },
                            action: function (data) {
                                _createOrEditModal.open({ id: data.record.dM_LoHang.id });
                            }
                        }, 
						{
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deleteDM_LoHang(data.record.dM_LoHang);
                            }
                        }]
                    }
                },
					{
						targets: 1,
						 data: "dM_LoHang.soLo"   
					},
					{
						targets: 2,
						 data: "dM_LoHang.ngaySanXuat" ,
					render: function (ngaySanXuat) {
						if (ngaySanXuat) {
							return moment(ngaySanXuat).format('L');
						}
						return "";
					}
			  
					},
					{
						targets: 3,
						 data: "dM_LoHang.ngayHetHan" ,
					render: function (ngayHetHan) {
						if (ngayHetHan) {
							return moment(ngayHetHan).format('L');
						}
						return "";
					}
			  
					},
					{
						targets: 4,
						 data: "dM_LoHang.tenLo"   
					},
					{
						targets: 5,
						 data: "dM_HangHoaTenHangHoa" 
					}
            ]
        });


        function getDM_LoHangs() {
            dataTable.ajax.reload();
        }

        function deleteDM_LoHang(dM_LoHang) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _dM_LoHangsService.delete({
                            id: dM_LoHang.id
                        }).done(function () {
                            getDM_LoHangs(true);
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

        $('#CreateNewDM_LoHangButton').click(function () {
            _createOrEditModal.open();
        });

		$('#ExportToExcelButton').click(function () {
            _dM_LoHangsService
                .getDM_LoHangsToExcel({
				filter : $('#DM_LoHangsTableFilter').val(),
					soLoFilter: $('#SoLoFilterId').val(),
					minNgaySanXuatFilter: $('#MinNgaySanXuatFilterId').val(),
					maxNgaySanXuatFilter: $('#MaxNgaySanXuatFilterId').val(),
					minNgayHetHanFilter: $('#MinNgayHetHanFilterId').val(),
					maxNgayHetHanFilter: $('#MaxNgayHetHanFilterId').val(),
					tenLoFilter: $('#TenLoFilterId').val(),
					dM_HangHoaTenHangHoaFilter: $('#DM_HangHoaTenHangHoaFilterId').val()
				})
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditDM_LoHangModalSaved', function () {
            getDM_LoHangs();
        });

		$('#GetDM_LoHangsButton').click(function (e) {
            e.preventDefault();
            getDM_LoHangs();
        });

		$(document).keypress(function(e) {
		  if(e.which === 13) {
			getDM_LoHangs();
		  }
		});

    });
})();