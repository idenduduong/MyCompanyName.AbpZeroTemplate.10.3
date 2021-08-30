(function () {
    $(function () {

        var _$dM_PhanLoaiHangHoaDichVusTable = $('#DM_PhanLoaiHangHoaDichVusTable');
        var _dM_PhanLoaiHangHoaDichVusService = abp.services.app.dM_PhanLoaiHangHoaDichVus;

        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.Categories.DM_PhanLoaiHangHoaDichVus.Create'),
            edit: abp.auth.hasPermission('Pages.Categories.DM_PhanLoaiHangHoaDichVus.Edit'),
            'delete': abp.auth.hasPermission('Pages.Categories.DM_PhanLoaiHangHoaDichVus.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_PhanLoaiHangHoaDichVus/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_PhanLoaiHangHoaDichVus/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditDM_PhanLoaiHangHoaDichVuModal'
        });

		 var _viewDM_PhanLoaiHangHoaDichVuModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_PhanLoaiHangHoaDichVus/ViewdM_PhanLoaiHangHoaDichVuModal',
            modalClass: 'ViewDM_PhanLoaiHangHoaDichVuModal'
        });

        var dataTable = _$dM_PhanLoaiHangHoaDichVusTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _dM_PhanLoaiHangHoaDichVusService.getAll,
                inputFilter: function () {
                    return {
					filter: $('#DM_PhanLoaiHangHoaDichVusTableFilter').val(),
					maPhanLoaiFilter: $('#MaPhanLoaiFilterId').val(),
					tenPhanLoaiFilter: $('#TenPhanLoaiFilterId').val(),
					minThoiGianBaoHanhFilter: $('#MinThoiGianBaoHanhFilterId').val(),
					maxThoiGianBaoHanhFilter: $('#MaxThoiGianBaoHanhFilterId').val()
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
                                    _viewDM_PhanLoaiHangHoaDichVuModal.open({ data: data.record });
                                }
                        },
						{
                            text: app.localize('Edit'),
                            visible: function () {
                                return _permissions.edit;
                            },
                            action: function (data) {
                                _createOrEditModal.open({ id: data.record.dM_PhanLoaiHangHoaDichVu.id });
                            }
                        }, 
						{
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deleteDM_PhanLoaiHangHoaDichVu(data.record.dM_PhanLoaiHangHoaDichVu);
                            }
                        }]
                    }
                },
					{
						targets: 1,
						 data: "dM_PhanLoaiHangHoaDichVu.maPhanLoai"   
					},
					{
						targets: 2,
						 data: "dM_PhanLoaiHangHoaDichVu.tenPhanLoai"   
					},
					{
						targets: 3,
						 data: "dM_PhanLoaiHangHoaDichVu.ghiChu"   
					},
					{
						targets: 4,
						 data: "dM_PhanLoaiHangHoaDichVu.thoiGianBaoHanh"   
					}
            ]
        });


        function getDM_PhanLoaiHangHoaDichVus() {
            dataTable.ajax.reload();
        }

        function deleteDM_PhanLoaiHangHoaDichVu(dM_PhanLoaiHangHoaDichVu) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _dM_PhanLoaiHangHoaDichVusService.delete({
                            id: dM_PhanLoaiHangHoaDichVu.id
                        }).done(function () {
                            getDM_PhanLoaiHangHoaDichVus(true);
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

        $('#CreateNewDM_PhanLoaiHangHoaDichVuButton').click(function () {
            _createOrEditModal.open();
        });

		$('#ExportToExcelButton').click(function () {
            _dM_PhanLoaiHangHoaDichVusService
                .getDM_PhanLoaiHangHoaDichVusToExcel({
				filter : $('#DM_PhanLoaiHangHoaDichVusTableFilter').val(),
					maPhanLoaiFilter: $('#MaPhanLoaiFilterId').val(),
					tenPhanLoaiFilter: $('#TenPhanLoaiFilterId').val(),
					minThoiGianBaoHanhFilter: $('#MinThoiGianBaoHanhFilterId').val(),
					maxThoiGianBaoHanhFilter: $('#MaxThoiGianBaoHanhFilterId').val()
				})
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditDM_PhanLoaiHangHoaDichVuModalSaved', function () {
            getDM_PhanLoaiHangHoaDichVus();
        });

		$('#GetDM_PhanLoaiHangHoaDichVusButton').click(function (e) {
            e.preventDefault();
            getDM_PhanLoaiHangHoaDichVus();
        });

		$(document).keypress(function(e) {
		  if(e.which === 13) {
			getDM_PhanLoaiHangHoaDichVus();
		  }
		});

    });
})();