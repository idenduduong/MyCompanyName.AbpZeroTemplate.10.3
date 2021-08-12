(function () {
    $(function () {

        var _$hoaDonBanLe_DacDiemKhachHangsTable = $('#HoaDonBanLe_DacDiemKhachHangsTable');
        var _hoaDonBanLe_DacDiemKhachHangsService = abp.services.app.hoaDonBanLe_DacDiemKhachHangs;

        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.HoaDonBanLe_DacDiemKhachHangs.Create'),
            edit: abp.auth.hasPermission('Pages.HoaDonBanLe_DacDiemKhachHangs.Edit'),
            'delete': abp.auth.hasPermission('Pages.HoaDonBanLe_DacDiemKhachHangs.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/HoaDonBanLe_DacDiemKhachHangs/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/HoaDonBanLe_DacDiemKhachHangs/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditHoaDonBanLe_DacDiemKhachHangModal'
        });

		 var _viewHoaDonBanLe_DacDiemKhachHangModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/HoaDonBanLe_DacDiemKhachHangs/ViewhoaDonBanLe_DacDiemKhachHangModal',
            modalClass: 'ViewHoaDonBanLe_DacDiemKhachHangModal'
        });

        var dataTable = _$hoaDonBanLe_DacDiemKhachHangsTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _hoaDonBanLe_DacDiemKhachHangsService.getAll,
                inputFilter: function () {
                    return {
					filter: $('#HoaDonBanLe_DacDiemKhachHangsTableFilter').val(),
					hoaDonBanLeMaHoaDonFilter: $('#HoaDonBanLeMaHoaDonFilterId').val(),
					dM_DacDiemKhachHangTenDacDiemFilter: $('#DM_DacDiemKhachHangTenDacDiemFilterId').val()
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
                                    _viewHoaDonBanLe_DacDiemKhachHangModal.open({ data: data.record });
                                }
                        },
						{
                            text: app.localize('Edit'),
                            visible: function () {
                                return _permissions.edit;
                            },
                            action: function (data) {
                                _createOrEditModal.open({ id: data.record.hoaDonBanLe_DacDiemKhachHang.id });
                            }
                        }, 
						{
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deleteHoaDonBanLe_DacDiemKhachHang(data.record.hoaDonBanLe_DacDiemKhachHang);
                            }
                        }]
                    }
                },
					{
						targets: 1,
						 data: "hoaDonBanLeMaHoaDon" 
					},
					{
						targets: 2,
						 data: "dM_DacDiemKhachHangTenDacDiem" 
					}
            ]
        });


        function getHoaDonBanLe_DacDiemKhachHangs() {
            dataTable.ajax.reload();
        }

        function deleteHoaDonBanLe_DacDiemKhachHang(hoaDonBanLe_DacDiemKhachHang) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _hoaDonBanLe_DacDiemKhachHangsService.delete({
                            id: hoaDonBanLe_DacDiemKhachHang.id
                        }).done(function () {
                            getHoaDonBanLe_DacDiemKhachHangs(true);
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

        $('#CreateNewHoaDonBanLe_DacDiemKhachHangButton').click(function () {
            _createOrEditModal.open();
        });

		$('#ExportToExcelButton').click(function () {
            _hoaDonBanLe_DacDiemKhachHangsService
                .getHoaDonBanLe_DacDiemKhachHangsToExcel({
				filter : $('#HoaDonBanLe_DacDiemKhachHangsTableFilter').val(),
					hoaDonBanLeMaHoaDonFilter: $('#HoaDonBanLeMaHoaDonFilterId').val(),
					dM_DacDiemKhachHangTenDacDiemFilter: $('#DM_DacDiemKhachHangTenDacDiemFilterId').val()
				})
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditHoaDonBanLe_DacDiemKhachHangModalSaved', function () {
            getHoaDonBanLe_DacDiemKhachHangs();
        });

		$('#GetHoaDonBanLe_DacDiemKhachHangsButton').click(function (e) {
            e.preventDefault();
            getHoaDonBanLe_DacDiemKhachHangs();
        });

		$(document).keypress(function(e) {
		  if(e.which === 13) {
			getHoaDonBanLe_DacDiemKhachHangs();
		  }
		});

    });
})();