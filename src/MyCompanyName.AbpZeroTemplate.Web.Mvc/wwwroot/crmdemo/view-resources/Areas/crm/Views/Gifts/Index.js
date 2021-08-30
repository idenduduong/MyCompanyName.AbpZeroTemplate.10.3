(function () {
    $(function () {

        var _$giftsTable = $('#GiftsTable');
        var _giftsService = abp.services.app.gifts;
		
        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.Gifts.Create'),
            edit: abp.auth.hasPermission('Pages.Gifts.Edit'),
            'delete': abp.auth.hasPermission('Pages.Gifts.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/Gifts/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/Gifts/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditGiftModal'
        });

		 var _viewGiftModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/Gifts/ViewgiftModal',
            modalClass: 'ViewGiftModal'
        });

		
		

        var getDateFilter = function (element) {
            if (element.data("DateTimePicker").date() == null) {
                return null;
            }
            return element.data("DateTimePicker").date().format("YYYY-MM-DDT00:00:00Z"); 
        }

        var dataTable = _$giftsTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _giftsService.getAll,
                inputFilter: function () {
                    return {
					filter: $('#GiftsTableFilter').val(),
					minMinQuantityFilter: $('#MinMinQuantityFilterId').val(),
					maxMinQuantityFilter: $('#MaxMinQuantityFilterId').val(),
					minGiftQuantityFilter: $('#MinGiftQuantityFilterId').val(),
					maxGiftQuantityFilter: $('#MaxGiftQuantityFilterId').val(),
					dM_HangHoaTenHangHoaFilter: $('#DM_HangHoaTenHangHoaFilterId').val(),
					dM_HangHoaTenHangHoa2Filter: $('#DM_HangHoaTenHangHoa2FilterId').val(),
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
                                    _viewGiftModal.open({ data: data.record });
                                }
                        },
						{
                            text: app.localize('Edit'),
                            visible: function () {
                                return _permissions.edit;
                            },
                            action: function (data) {
                                _createOrEditModal.open({ id: data.record.gift.id });
                            }
                        }, 
						{
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deleteGift(data.record.gift);
                            }
                        }]
                    }
                },
					{
						targets: 1,
						 data: "gift.minQuantity"   
					},
					{
						targets: 2,
						 data: "gift.giftQuantity"   
					},
					{
						targets: 3,
						 data: "dM_HangHoaTenHangHoa" 
					},
					{
						targets: 4,
						 data: "dM_HangHoaTenHangHoa2" 
					},
					{
						targets: 5,
						 data: "dM_KhuyenMaiDisplayName" 
					}
            ]
        });


        function getGifts() {
            dataTable.ajax.reload();
        }

        function deleteGift(gift) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _giftsService.delete({
                            id: gift.id
                        }).done(function () {
                            getGifts(true);
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

        $('#CreateNewGiftButton').click(function () {
            _createOrEditModal.open();
        });

		$('#ExportToExcelButton').click(function () {
            _giftsService
                .getGiftsToExcel({
				filter : $('#GiftsTableFilter').val(),
					minMinQuantityFilter: $('#MinMinQuantityFilterId').val(),
					maxMinQuantityFilter: $('#MaxMinQuantityFilterId').val(),
					minGiftQuantityFilter: $('#MinGiftQuantityFilterId').val(),
					maxGiftQuantityFilter: $('#MaxGiftQuantityFilterId').val(),
					dM_HangHoaTenHangHoaFilter: $('#DM_HangHoaTenHangHoaFilterId').val(),
					dM_HangHoaTenHangHoa2Filter: $('#DM_HangHoaTenHangHoa2FilterId').val(),
					dM_KhuyenMaiDisplayNameFilter: $('#DM_KhuyenMaiDisplayNameFilterId').val()
				})
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditGiftModalSaved', function () {
            getGifts();
        });

		$('#GetGiftsButton').click(function (e) {
            e.preventDefault();
            getGifts();
        });

		$(document).keypress(function(e) {
		  if(e.which === 13) {
			getGifts();
		  }
		});

    });
})();