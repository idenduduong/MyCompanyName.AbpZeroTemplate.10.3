(function () {
    $(function () {

        var _$dueDateRenewsTable = $('#DueDateRenewsTable');
        var _dueDateRenewsService = abp.services.app.dueDateRenews;
		
        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.DueDateRenews.Create'),
            edit: abp.auth.hasPermission('Pages.DueDateRenews.Edit'),
            'delete': abp.auth.hasPermission('Pages.DueDateRenews.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DueDateRenews/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DueDateRenews/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditDueDateRenewModal'
        });

		 var _viewDueDateRenewModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DueDateRenews/ViewdueDateRenewModal',
            modalClass: 'ViewDueDateRenewModal'
        });

		
		

        var getDateFilter = function (element) {
            if (element.data("DateTimePicker").date() == null) {
                return null;
            }
            return element.data("DateTimePicker").date().format("YYYY-MM-DDT00:00:00Z"); 
        }

        var dataTable = _$dueDateRenewsTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _dueDateRenewsService.getAll,
                inputFilter: function () {
                    return {
					filter: $('#DueDateRenewsTableFilter').val(),
					minRequestedDaysFilter: $('#MinRequestedDaysFilterId').val(),
					maxRequestedDaysFilter: $('#MaxRequestedDaysFilterId').val(),
					reasonDetailFilter: $('#ReasonDetailFilterId').val(),
					reasonDescriptionFilter: $('#ReasonDescriptionFilterId').val(),
					isAcceptedFilter: $('#IsAcceptedFilterId').val(),
					minApprovedDateFilter:  getDateFilter($('#MinApprovedDateFilterId')),
					maxApprovedDateFilter:  getDateFilter($('#MaxApprovedDateFilterId')),
					isDeniedFilter: $('#IsDeniedFilterId').val(),
					deniedReasonFilter: $('#DeniedReasonFilterId').val(),
					minAcceptedDaysFilter: $('#MinAcceptedDaysFilterId').val(),
					maxAcceptedDaysFilter: $('#MaxAcceptedDaysFilterId').val(),
					requestedByEmployeeNameFilter: $('#RequestedByEmployeeNameFilterId').val(),
					processedByEmployeeNameFilter: $('#ProcessedByEmployeeNameFilterId').val(),
					customerDataNameFilter: $('#CustomerDataNameFilterId').val(),
					userNameFilter: $('#UserNameFilterId').val(),
					reasonDescriptionFilter: $('#ReasonDescriptionFilterId').val(),
					userName2Filter: $('#UserName2FilterId').val()
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
                                    _viewDueDateRenewModal.open({ data: data.record });
                                }
                        },
						{
                            text: app.localize('Edit'),
                            visible: function () {
                                return _permissions.edit;
                            },
                            action: function (data) {
                                _createOrEditModal.open({ id: data.record.dueDateRenew.id });
                            }
                        }, 
						{
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deleteDueDateRenew(data.record.dueDateRenew);
                            }
                        }]
                    }
                },
					{
						targets: 1,
						 data: "dueDateRenew.requestedDays"   
					},
					{
						targets: 2,
						 data: "dueDateRenew.reasonDetail"   
					},
					{
						targets: 3,
						 data: "dueDateRenew.reasonDescription"   
					},
					{
						targets: 4,
						 data: "dueDateRenew.isAccepted"  ,
						render: function (isAccepted) {
							if (isAccepted) {
								return '<div class="text-center"><i class="fa fa-check-circle m--font-success" title="True"></i></div>';
							}
							return '<div class="text-center"><i class="fa fa-times-circle" title="False"></i></div>';
					}
			 
					},
					{
						targets: 5,
						 data: "dueDateRenew.approvedDate" ,
					render: function (approvedDate) {
						if (approvedDate) {
							return moment(approvedDate).format('L');
						}
						return "";
					}
			  
					},
					{
						targets: 6,
						 data: "dueDateRenew.isDenied"  ,
						render: function (isDenied) {
							if (isDenied) {
								return '<div class="text-center"><i class="fa fa-check-circle m--font-success" title="True"></i></div>';
							}
							return '<div class="text-center"><i class="fa fa-times-circle" title="False"></i></div>';
					}
			 
					},
					{
						targets: 7,
						 data: "dueDateRenew.deniedReason"   
					},
					{
						targets: 8,
						 data: "dueDateRenew.acceptedDays"   
					},
					{
						targets: 9,
						 data: "dueDateRenew.requestedByEmployeeName"   
					},
					{
						targets: 10,
						 data: "dueDateRenew.processedByEmployeeName"   
					},
					{
						targets: 11,
						 data: "customerDataName" 
					},
					{
						targets: 12,
						 data: "userName" 
					},
					{
						targets: 13,
						 data: "reasonDescription" 
					},
					{
						targets: 14,
						 data: "userName2" 
					}
            ]
        });


        function getDueDateRenews() {
            dataTable.ajax.reload();
        }

        function deleteDueDateRenew(dueDateRenew) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _dueDateRenewsService.delete({
                            id: dueDateRenew.id
                        }).done(function () {
                            getDueDateRenews(true);
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

        $('#CreateNewDueDateRenewButton').click(function () {
            _createOrEditModal.open();
        });

		$('#ExportToExcelButton').click(function () {
            _dueDateRenewsService
                .getDueDateRenewsToExcel({
				filter : $('#DueDateRenewsTableFilter').val(),
					minRequestedDaysFilter: $('#MinRequestedDaysFilterId').val(),
					maxRequestedDaysFilter: $('#MaxRequestedDaysFilterId').val(),
					reasonDetailFilter: $('#ReasonDetailFilterId').val(),
					reasonDescriptionFilter: $('#ReasonDescriptionFilterId').val(),
					isAcceptedFilter: $('#IsAcceptedFilterId').val(),
					minApprovedDateFilter:  getDateFilter($('#MinApprovedDateFilterId')),
					maxApprovedDateFilter:  getDateFilter($('#MaxApprovedDateFilterId')),
					isDeniedFilter: $('#IsDeniedFilterId').val(),
					deniedReasonFilter: $('#DeniedReasonFilterId').val(),
					minAcceptedDaysFilter: $('#MinAcceptedDaysFilterId').val(),
					maxAcceptedDaysFilter: $('#MaxAcceptedDaysFilterId').val(),
					requestedByEmployeeNameFilter: $('#RequestedByEmployeeNameFilterId').val(),
					processedByEmployeeNameFilter: $('#ProcessedByEmployeeNameFilterId').val(),
					customerDataNameFilter: $('#CustomerDataNameFilterId').val(),
					userNameFilter: $('#UserNameFilterId').val(),
					reasonDescriptionFilter: $('#ReasonDescriptionFilterId').val(),
					userName2Filter: $('#UserName2FilterId').val()
				})
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditDueDateRenewModalSaved', function () {
            getDueDateRenews();
        });

		$('#GetDueDateRenewsButton').click(function (e) {
            e.preventDefault();
            getDueDateRenews();
        });

		$(document).keypress(function(e) {
		  if(e.which === 13) {
			getDueDateRenews();
		  }
		});

    });
})();