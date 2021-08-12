(function () {
    $(function () {

        var _$discountsTable = $('#DiscountsTable');
        var _discountsService = abp.services.app.discounts;
		
        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.Discounts.Create'),
            edit: abp.auth.hasPermission('Pages.Discounts.Edit'),
            'delete': abp.auth.hasPermission('Pages.Discounts.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/Discounts/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/Discounts/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditDiscountModal'
        });

		 var _viewDiscountModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/Discounts/ViewdiscountModal',
            modalClass: 'ViewDiscountModal'
        });

		
		

        var getDateFilter = function (element) {
            if (element.data("DateTimePicker").date() == null) {
                return null;
            }
            return element.data("DateTimePicker").date().format("YYYY-MM-DDT00:00:00Z"); 
        }

        var dataTable = _$discountsTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _discountsService.getAll,
                inputFilter: function () {
                    return {
					filter: $('#DiscountsTableFilter').val(),
					minDiscountTypeFilter: $('#MinDiscountTypeFilterId').val(),
					maxDiscountTypeFilter: $('#MaxDiscountTypeFilterId').val(),
					minDiscountValueFilter: $('#MinDiscountValueFilterId').val(),
					maxDiscountValueFilter: $('#MaxDiscountValueFilterId').val(),
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
                                    _viewDiscountModal.open({ data: data.record });
                                }
                        },
						{
                            text: app.localize('Edit'),
                            visible: function () {
                                return _permissions.edit;
                            },
                            action: function (data) {
                                _createOrEditModal.open({ id: data.record.discount.id });
                            }
                        }, 
						{
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deleteDiscount(data.record.discount);
                            }
                        }]
                    }
                },
					{
						targets: 1,
						 data: "discount.discountType"   
					},
					{
						targets: 2,
						 data: "discount.discountValue"   
					},
					{
						targets: 3,
						 data: "dM_HangHoaTenHangHoa" 
					}
            ]
        });


        function getDiscounts() {
            dataTable.ajax.reload();
        }

        function deleteDiscount(discount) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _discountsService.delete({
                            id: discount.id
                        }).done(function () {
                            getDiscounts(true);
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

        $('#CreateNewDiscountButton').click(function () {
            _createOrEditModal.open();
        });

		$('#ExportToExcelButton').click(function () {
            _discountsService
                .getDiscountsToExcel({
				filter : $('#DiscountsTableFilter').val(),
					minDiscountTypeFilter: $('#MinDiscountTypeFilterId').val(),
					maxDiscountTypeFilter: $('#MaxDiscountTypeFilterId').val(),
					minDiscountValueFilter: $('#MinDiscountValueFilterId').val(),
					maxDiscountValueFilter: $('#MaxDiscountValueFilterId').val(),
					dM_HangHoaTenHangHoaFilter: $('#DM_HangHoaTenHangHoaFilterId').val()
				})
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditDiscountModalSaved', function () {
            getDiscounts();
        });

		$('#GetDiscountsButton').click(function (e) {
            e.preventDefault();
            getDiscounts();
        });

		$(document).keypress(function(e) {
		  if(e.which === 13) {
			getDiscounts();
		  }
		});

    });
})();