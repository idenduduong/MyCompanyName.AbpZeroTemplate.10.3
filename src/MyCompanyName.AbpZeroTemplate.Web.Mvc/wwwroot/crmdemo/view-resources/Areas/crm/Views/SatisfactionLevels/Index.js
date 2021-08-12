(function () {
    $(function () {

        var _$satisfactionLevelsTable = $('#SatisfactionLevelsTable');
        var _satisfactionLevelsService = abp.services.app.satisfactionLevels;
		
        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.SatisfactionLevels.Create'),
            edit: abp.auth.hasPermission('Pages.SatisfactionLevels.Edit'),
            'delete': abp.auth.hasPermission('Pages.SatisfactionLevels.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/SatisfactionLevels/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/SatisfactionLevels/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditSatisfactionLevelModal'
        });

		 var _viewSatisfactionLevelModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/SatisfactionLevels/ViewsatisfactionLevelModal',
            modalClass: 'ViewSatisfactionLevelModal'
        });

		
		

        var getDateFilter = function (element) {
            if (element.data("DateTimePicker").date() == null) {
                return null;
            }
            return element.data("DateTimePicker").date().format("YYYY-MM-DDT00:00:00Z"); 
        }

        var dataTable = _$satisfactionLevelsTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _satisfactionLevelsService.getAll,
                inputFilter: function () {
                    return {
					filter: $('#SatisfactionLevelsTableFilter').val(),
					displayNameFilter: $('#DisplayNameFilterId').val(),
					minPercentageFilter: $('#MinPercentageFilterId').val(),
					maxPercentageFilter: $('#MaxPercentageFilterId').val(),
					isActiveFilter: $('#IsActiveFilterId').val(),
					minOrderNumberFilter: $('#MinOrderNumberFilterId').val(),
					maxOrderNumberFilter: $('#MaxOrderNumberFilterId').val()
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
                                    _viewSatisfactionLevelModal.open({ data: data.record });
                                }
                        },
						{
                            text: app.localize('Edit'),
                            visible: function () {
                                return _permissions.edit;
                            },
                            action: function (data) {
                                _createOrEditModal.open({ id: data.record.satisfactionLevel.id });
                            }
                        }, 
						{
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deleteSatisfactionLevel(data.record.satisfactionLevel);
                            }
                        }]
                    }
                },
					{
						targets: 1,
						 data: "satisfactionLevel.displayName"   
					},
					{
						targets: 2,
						 data: "satisfactionLevel.percentage"   
					},
					{
						targets: 3,
						 data: "satisfactionLevel.isActive"  ,
						render: function (isActive) {
							if (isActive) {
								return '<div class="text-center"><i class="fa fa-check-circle m--font-success" title="True"></i></div>';
							}
							return '<div class="text-center"><i class="fa fa-times-circle" title="False"></i></div>';
					}
			 
					},
					{
						targets: 4,
						 data: "satisfactionLevel.orderNumber"   
					}
            ]
        });


        function getSatisfactionLevels() {
            dataTable.ajax.reload();
        }

        function deleteSatisfactionLevel(satisfactionLevel) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _satisfactionLevelsService.delete({
                            id: satisfactionLevel.id
                        }).done(function () {
                            getSatisfactionLevels(true);
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

        $('#CreateNewSatisfactionLevelButton').click(function () {
            _createOrEditModal.open();
        });

		$('#ExportToExcelButton').click(function () {
            _satisfactionLevelsService
                .getSatisfactionLevelsToExcel({
				filter : $('#SatisfactionLevelsTableFilter').val(),
					displayNameFilter: $('#DisplayNameFilterId').val(),
					minPercentageFilter: $('#MinPercentageFilterId').val(),
					maxPercentageFilter: $('#MaxPercentageFilterId').val(),
					isActiveFilter: $('#IsActiveFilterId').val(),
					minOrderNumberFilter: $('#MinOrderNumberFilterId').val(),
					maxOrderNumberFilter: $('#MaxOrderNumberFilterId').val()
				})
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditSatisfactionLevelModalSaved', function () {
            getSatisfactionLevels();
        });

		$('#GetSatisfactionLevelsButton').click(function (e) {
            e.preventDefault();
            getSatisfactionLevels();
        });

		$(document).keypress(function(e) {
		  if(e.which === 13) {
			getSatisfactionLevels();
		  }
		});

    });
})();