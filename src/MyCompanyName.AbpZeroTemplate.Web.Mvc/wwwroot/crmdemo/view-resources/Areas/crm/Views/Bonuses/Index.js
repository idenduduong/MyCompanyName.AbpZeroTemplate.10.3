(function () {
    $(function () {

        var _$bonusesTable = $('#BonusesTable');
        var _bonusesService = abp.services.app.bonuses;
		
        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.Bonuses.Create'),
            edit: abp.auth.hasPermission('Pages.Bonuses.Edit'),
            'delete': abp.auth.hasPermission('Pages.Bonuses.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/Bonuses/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/Bonuses/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditBonusModal'
        });

		 var _viewBonusModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/Bonuses/ViewbonusModal',
            modalClass: 'ViewBonusModal'
        });

		
		

        var getDateFilter = function (element) {
            if (element.data("DateTimePicker").date() == null) {
                return null;
            }
            return element.data("DateTimePicker").date().format("YYYY-MM-DDT00:00:00Z"); 
        }

        var dataTable = _$bonusesTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _bonusesService.getAll,
                inputFilter: function () {
                    return {
					filter: $('#BonusesTableFilter').val(),
					minPaymentValueFilter: $('#MinPaymentValueFilterId').val(),
					maxPaymentValueFilter: $('#MaxPaymentValueFilterId').val(),
					bonusValueFilter: $('#BonusValueFilterId').val(),
					isPercentageFilter: $('#IsPercentageFilterId').val(),
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
                                    _viewBonusModal.open({ data: data.record });
                                }
                        },
						{
                            text: app.localize('Edit'),
                            visible: function () {
                                return _permissions.edit;
                            },
                            action: function (data) {
                                _createOrEditModal.open({ id: data.record.bonus.id });
                            }
                        }, 
						{
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deleteBonus(data.record.bonus);
                            }
                        }]
                    }
                },
					{
						targets: 1,
						 data: "bonus.paymentValue"   
					},
					{
						targets: 2,
						 data: "bonus.bonusValue"   
					},
					{
						targets: 3,
						 data: "bonus.isPercentage"  ,
						render: function (isPercentage) {
							if (isPercentage) {
								return '<div class="text-center"><i class="fa fa-check-circle m--font-success" title="True"></i></div>';
							}
							return '<div class="text-center"><i class="fa fa-times-circle" title="False"></i></div>';
					}
			 
					},
					{
						targets: 4,
						 data: "dM_KhuyenMaiDisplayName" 
					}
            ]
        });


        function getBonuses() {
            dataTable.ajax.reload();
        }

        function deleteBonus(bonus) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _bonusesService.delete({
                            id: bonus.id
                        }).done(function () {
                            getBonuses(true);
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

        $('#CreateNewBonusButton').click(function () {
            _createOrEditModal.open();
        });

		$('#ExportToExcelButton').click(function () {
            _bonusesService
                .getBonusesToExcel({
				filter : $('#BonusesTableFilter').val(),
					minPaymentValueFilter: $('#MinPaymentValueFilterId').val(),
					maxPaymentValueFilter: $('#MaxPaymentValueFilterId').val(),
					bonusValueFilter: $('#BonusValueFilterId').val(),
					isPercentageFilter: $('#IsPercentageFilterId').val(),
					dM_KhuyenMaiDisplayNameFilter: $('#DM_KhuyenMaiDisplayNameFilterId').val()
				})
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditBonusModalSaved', function () {
            getBonuses();
        });

		$('#GetBonusesButton').click(function (e) {
            e.preventDefault();
            getBonuses();
        });

		$(document).keypress(function(e) {
		  if(e.which === 13) {
			getBonuses();
		  }
		});

    });
})();