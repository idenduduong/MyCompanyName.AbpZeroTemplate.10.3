(function () {
    $(function () {

        var _$assignDataLogsTable = $('#AssignDataLogsTable');
        var _assignDataLogsService = abp.services.app.assignDataLogs;
		
        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.AssignDataLogs.Create'),
            edit: abp.auth.hasPermission('Pages.AssignDataLogs.Edit'),
            'delete': abp.auth.hasPermission('Pages.AssignDataLogs.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/AssignDataLogs/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/AssignDataLogs/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditAssignDataLogModal'
        });

		 var _viewAssignDataLogModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/AssignDataLogs/ViewassignDataLogModal',
            modalClass: 'ViewAssignDataLogModal'
        });

		
		

        var getDateFilter = function (element) {
            if (element.data("DateTimePicker").date() == null) {
                return null;
            }
            return element.data("DateTimePicker").date().format("YYYY-MM-DDT00:00:00Z"); 
        }

        var dataTable = _$assignDataLogsTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _assignDataLogsService.getAll,
                inputFilter: function () {
                    return {
					filter: $('#AssignDataLogsTableFilter').val(),
					minLastStatusChangeFilter:  getDateFilter($('#MinLastStatusChangeFilterId')),
					maxLastStatusChangeFilter:  getDateFilter($('#MaxLastStatusChangeFilterId')),
					minDateFilter:  getDateFilter($('#MinDateFilterId')),
					maxDateFilter:  getDateFilter($('#MaxDateFilterId')),
					isRecalledFilter: $('#IsRecalledFilterId').val(),
					noteFilter: $('#NoteFilterId').val(),
					minRecallReasonIdFilter: $('#MinRecallReasonIdFilterId').val(),
					maxRecallReasonIdFilter: $('#MaxRecallReasonIdFilterId').val(),
					recalledByFilter: $('#RecalledByFilterId').val(),
					recalledByEmployeeNameFilter: $('#RecalledByEmployeeNameFilterId').val(),
					recallReasonDescriptionFilter: $('#RecallReasonDescriptionFilterId').val(),
					customerDataNameFilter: $('#CustomerDataNameFilterId').val(),
					organizationUnitDisplayNameFilter: $('#OrganizationUnitDisplayNameFilterId').val(),
					userNameFilter: $('#UserNameFilterId').val(),
					dataProcessStatusDisplayNameFilter: $('#DataProcessStatusDisplayNameFilterId').val(),
					userName2Filter: $('#UserName2FilterId').val(),
					assigneBulkleDataLogTenantIdFilter: $('#AssigneBulkleDataLogTenantIdFilterId').val()
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
                                    _viewAssignDataLogModal.open({ data: data.record });
                                }
                        },
						{
                            text: app.localize('Edit'),
                            visible: function () {
                                return _permissions.edit;
                            },
                            action: function (data) {
                                _createOrEditModal.open({ id: data.record.assignDataLog.id });
                            }
                        }, 
						{
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deleteAssignDataLog(data.record.assignDataLog);
                            }
                        }]
                    }
                },
					{
						targets: 1,
						 data: "assignDataLog.lastStatusChange" ,
					render: function (lastStatusChange) {
						if (lastStatusChange) {
							return moment(lastStatusChange).format('L');
						}
						return "";
					}
			  
					},
					{
						targets: 2,
						 data: "assignDataLog.date" ,
					render: function (date) {
						if (date) {
							return moment(date).format('L');
						}
						return "";
					}
			  
					},
					{
						targets: 3,
						 data: "assignDataLog.isRecalled"  ,
						render: function (isRecalled) {
							if (isRecalled) {
								return '<div class="text-center"><i class="fa fa-check-circle m--font-success" title="True"></i></div>';
							}
							return '<div class="text-center"><i class="fa fa-times-circle" title="False"></i></div>';
					}
			 
					},
					{
						targets: 4,
						 data: "assignDataLog.note"   
					},
					{
						targets: 5,
						 data: "assignDataLog.recallReasonId"   
					},
					{
						targets: 6,
						 data: "assignDataLog.recalledBy"   
					},
					{
						targets: 7,
						 data: "assignDataLog.recalledByEmployeeName"   
					},
					{
						targets: 8,
						 data: "assignDataLog.recallReasonDescription"   
					},
					{
						targets: 9,
						 data: "customerDataName" 
					},
					{
						targets: 10,
						 data: "organizationUnitDisplayName" 
					},
					{
						targets: 11,
						 data: "userName" 
					},
					{
						targets: 12,
						 data: "dataProcessStatusDisplayName" 
					},
					{
						targets: 13,
						 data: "userName2" 
					},
					{
						targets: 14,
						 data: "assigneBulkleDataLogTenantId" 
					}
            ]
        });


        function getAssignDataLogs() {
            dataTable.ajax.reload();
        }

        function deleteAssignDataLog(assignDataLog) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _assignDataLogsService.delete({
                            id: assignDataLog.id
                        }).done(function () {
                            getAssignDataLogs(true);
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

        $('#CreateNewAssignDataLogButton').click(function () {
            _createOrEditModal.open();
        });

		$('#ExportToExcelButton').click(function () {
            _assignDataLogsService
                .getAssignDataLogsToExcel({
				filter : $('#AssignDataLogsTableFilter').val(),
					minLastStatusChangeFilter:  getDateFilter($('#MinLastStatusChangeFilterId')),
					maxLastStatusChangeFilter:  getDateFilter($('#MaxLastStatusChangeFilterId')),
					minDateFilter:  getDateFilter($('#MinDateFilterId')),
					maxDateFilter:  getDateFilter($('#MaxDateFilterId')),
					isRecalledFilter: $('#IsRecalledFilterId').val(),
					noteFilter: $('#NoteFilterId').val(),
					minRecallReasonIdFilter: $('#MinRecallReasonIdFilterId').val(),
					maxRecallReasonIdFilter: $('#MaxRecallReasonIdFilterId').val(),
					recalledByFilter: $('#RecalledByFilterId').val(),
					recalledByEmployeeNameFilter: $('#RecalledByEmployeeNameFilterId').val(),
					recallReasonDescriptionFilter: $('#RecallReasonDescriptionFilterId').val(),
					customerDataNameFilter: $('#CustomerDataNameFilterId').val(),
					organizationUnitDisplayNameFilter: $('#OrganizationUnitDisplayNameFilterId').val(),
					userNameFilter: $('#UserNameFilterId').val(),
					dataProcessStatusDisplayNameFilter: $('#DataProcessStatusDisplayNameFilterId').val(),
					userName2Filter: $('#UserName2FilterId').val(),
					assigneBulkleDataLogTenantIdFilter: $('#AssigneBulkleDataLogTenantIdFilterId').val()
				})
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditAssignDataLogModalSaved', function () {
            getAssignDataLogs();
        });

		$('#GetAssignDataLogsButton').click(function (e) {
            e.preventDefault();
            getAssignDataLogs();
        });

		$(document).keypress(function(e) {
		  if(e.which === 13) {
			getAssignDataLogs();
		  }
		});

    });
})();