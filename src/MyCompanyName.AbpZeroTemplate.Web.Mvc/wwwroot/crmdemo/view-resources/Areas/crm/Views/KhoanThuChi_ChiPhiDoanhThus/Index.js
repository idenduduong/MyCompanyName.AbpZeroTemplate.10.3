(function () {
    $(function () {

        var _$khoanThuChi_ChiPhiDoanhThusTable = $('#KhoanThuChi_ChiPhiDoanhThusTable');
        var _khoanThuChi_ChiPhiDoanhThusService = abp.services.app.khoanThuChi_ChiPhiDoanhThus;

        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.KhoanThuChi_ChiPhiDoanhThus.Create'),
            edit: abp.auth.hasPermission('Pages.KhoanThuChi_ChiPhiDoanhThus.Edit'),
            'delete': abp.auth.hasPermission('Pages.KhoanThuChi_ChiPhiDoanhThus.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/KhoanThuChi_ChiPhiDoanhThus/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/KhoanThuChi_ChiPhiDoanhThus/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditKhoanThuChi_ChiPhiDoanhThuModal'
        });

		 var _viewKhoanThuChi_ChiPhiDoanhThuModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/KhoanThuChi_ChiPhiDoanhThus/ViewkhoanThuChi_ChiPhiDoanhThuModal',
            modalClass: 'ViewKhoanThuChi_ChiPhiDoanhThuModal'
        });

        var dataTable = _$khoanThuChi_ChiPhiDoanhThusTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _khoanThuChi_ChiPhiDoanhThusService.getAll,
                inputFilter: function () {
                    return {
					filter: $('#KhoanThuChi_ChiPhiDoanhThusTableFilter').val(),
					khoanChiPhi_DoanhThuTenFilter: $('#KhoanChiPhi_DoanhThuTenFilterId').val(),
					khoanThuChiMaKhoanThuChiFilter: $('#KhoanThuChiMaKhoanThuChiFilterId').val()
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
                                    _viewKhoanThuChi_ChiPhiDoanhThuModal.open({ data: data.record });
                                }
                        },
						{
                            text: app.localize('Edit'),
                            visible: function () {
                                return _permissions.edit;
                            },
                            action: function (data) {
                                _createOrEditModal.open({ id: data.record.khoanThuChi_ChiPhiDoanhThu.id });
                            }
                        }, 
						{
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deleteKhoanThuChi_ChiPhiDoanhThu(data.record.khoanThuChi_ChiPhiDoanhThu);
                            }
                        }]
                    }
                },
					{
						targets: 1,
						 data: "khoanChiPhi_DoanhThuTen" 
					},
					{
						targets: 2,
						 data: "khoanThuChiMaKhoanThuChi" 
					}
            ]
        });


        function getKhoanThuChi_ChiPhiDoanhThus() {
            dataTable.ajax.reload();
        }

        function deleteKhoanThuChi_ChiPhiDoanhThu(khoanThuChi_ChiPhiDoanhThu) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _khoanThuChi_ChiPhiDoanhThusService.delete({
                            id: khoanThuChi_ChiPhiDoanhThu.id
                        }).done(function () {
                            getKhoanThuChi_ChiPhiDoanhThus(true);
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

        $('#CreateNewKhoanThuChi_ChiPhiDoanhThuButton').click(function () {
            _createOrEditModal.open();
        });

		$('#ExportToExcelButton').click(function () {
            _khoanThuChi_ChiPhiDoanhThusService
                .getKhoanThuChi_ChiPhiDoanhThusToExcel({
				filter : $('#KhoanThuChi_ChiPhiDoanhThusTableFilter').val(),
					khoanChiPhi_DoanhThuTenFilter: $('#KhoanChiPhi_DoanhThuTenFilterId').val(),
					khoanThuChiMaKhoanThuChiFilter: $('#KhoanThuChiMaKhoanThuChiFilterId').val()
				})
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditKhoanThuChi_ChiPhiDoanhThuModalSaved', function () {
            getKhoanThuChi_ChiPhiDoanhThus();
        });

		$('#GetKhoanThuChi_ChiPhiDoanhThusButton').click(function (e) {
            e.preventDefault();
            getKhoanThuChi_ChiPhiDoanhThus();
        });

		$(document).keypress(function(e) {
		  if(e.which === 13) {
			getKhoanThuChi_ChiPhiDoanhThus();
		  }
		});

    });
})();