(function () {
    $(function () {

        var _$vouchersTable = $('#VouchersTable');
        var _vouchersService = abp.services.app.vouchers;

        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.Vouchers.Create'),
            edit: abp.auth.hasPermission('Pages.Vouchers.Edit'),
            'delete': abp.auth.hasPermission('Pages.Vouchers.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/Vouchers/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/Vouchers/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditVoucherModal'
        });

		 var _viewVoucherModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/Vouchers/ViewvoucherModal',
            modalClass: 'ViewVoucherModal'
        });

        var getDateFilter = function (element) {
            if (element.data("DateTimePicker").date() == null) {
                return null;
            }
            return element.data("DateTimePicker").date().format("YYYY-MM-DDT00:00:00Z"); 
        }

        var dataTable = _$vouchersTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _vouchersService.getAll,
                inputFilter: function () {
                    return {
					filter: $('#VouchersTableFilter').val(),
					voucherCodeFilter: $('#VoucherCodeFilterId').val(),
					isPercentageFilter: $('#IsPercentageFilterId').val(),
					minVoucherValueFilter: $('#MinVoucherValueFilterId').val(),
					maxVoucherValueFilter: $('#MaxVoucherValueFilterId').val(),
					dM_KhuyenMaiDisplayNameFilter: $('#DM_KhuyenMaiDisplayNameFilterId').val()
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
                                    _viewVoucherModal.open({ data: data.record });
                                }
                        },
						{
                            text: app.localize('Edit'),
                            visible: function () {
                                return _permissions.edit;
                            },
                            action: function (data) {
                                _createOrEditModal.open({ id: data.record.voucher.id });
                            }
                        }, 
						{
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deleteVoucher(data.record.voucher);
                            }
                        }]
                    }
                },
					{
						targets: 1,
						 data: "voucher.voucherCode"   
					},
					{
						targets: 2,
						 data: "voucher.isPercentage"  ,
						render: function (isPercentage) {
							if (isPercentage) {
								return '<div class="text-center"><i class="fa fa-check-circle m--font-success" title="True"></i></div>';
							}
							return '<div class="text-center"><i class="fa fa-times-circle" title="False"></i></div>';
					}
			 
					},
					{
						targets: 3,
						 data: "voucher.voucherValue"   
					},
					{
						targets: 4,
						 data: "dM_KhuyenMaiDisplayName" 
					}
            ]
        });


        function getVouchers() {
            dataTable.ajax.reload();
        }

        function deleteVoucher(voucher) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _vouchersService.delete({
                            id: voucher.id
                        }).done(function () {
                            getVouchers(true);
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

        $('#CreateNewVoucherButton').click(function () {
            _createOrEditModal.open();
        });

		$('#ExportToExcelButton').click(function () {
            _vouchersService
                .getVouchersToExcel({
				filter : $('#VouchersTableFilter').val(),
					voucherCodeFilter: $('#VoucherCodeFilterId').val(),
					isPercentageFilter: $('#IsPercentageFilterId').val(),
					minVoucherValueFilter: $('#MinVoucherValueFilterId').val(),
					maxVoucherValueFilter: $('#MaxVoucherValueFilterId').val(),
					dM_KhuyenMaiDisplayNameFilter: $('#DM_KhuyenMaiDisplayNameFilterId').val()
				})
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditVoucherModalSaved', function () {
            getVouchers();
        });

		$('#GetVouchersButton').click(function (e) {
            e.preventDefault();
            getVouchers();
        });

		$(document).keypress(function(e) {
		  if(e.which === 13) {
			getVouchers();
		  }
		});

    });
})();