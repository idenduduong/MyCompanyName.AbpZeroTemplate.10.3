(function () {
    $(function () {

        var _$recallDataLogsTable = $('#RecallDataLogsTable');
        var _recallDataLogsService = abp.services.app.recallDataLogs;
		
        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.RecallDataLogs.Create'),
            edit: abp.auth.hasPermission('Pages.RecallDataLogs.Edit'),
            'delete': abp.auth.hasPermission('Pages.RecallDataLogs.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/RecallDataLogs/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/RecallDataLogs/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditRecallDataLogModal'
        });

		 var _viewRecallDataLogModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/RecallDataLogs/ViewrecallDataLogModal',
            modalClass: 'ViewRecallDataLogModal'
        });

		
		

        var getDateFilter = function (element) {
            if (element.data("DateTimePicker").date() == null) {
                return null;
            }
            return element.data("DateTimePicker").date().format("YYYY-MM-DDT00:00:00Z"); 
        }

        var dataTable = _$recallDataLogsTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _recallDataLogsService.getAll,
                inputFilter: function () {
                    return {
					filter: $('#RecallDataLogsTableFilter').val(),
					recallReasonFilter: $('#RecallReasonFilterId').val(),
					recalledByEmployeeNameFilter: $('#RecalledByEmployeeNameFilterId').val(),
					minRecalledTimeFilter:  getDateFilter($('#MinRecalledTimeFilterId')),
					maxRecalledTimeFilter:  getDateFilter($('#MaxRecalledTimeFilterId')),
					isManualRecalledFilter: $('#IsManualRecalledFilterId').val(),
					userNameFilter: $('#UserNameFilterId').val(),
					customerDataNameFilter: $('#CustomerDataNameFilterId').val(),
					reasonDisplayNameFilter: $('#ReasonDisplayNameFilterId').val(),
					dataProcessStatusDisplayNameFilter: $('#DataProcessStatusDisplayNameFilterId').val(),
					dataChangeStatusLogNewStatusNameFilter: $('#DataChangeStatusLogNewStatusNameFilterId').val()
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
                                    _viewRecallDataLogModal.open({ data: data.record });
                                }
                        },
						{
                            text: app.localize('Edit'),
                            visible: function () {
                                return _permissions.edit;
                            },
                            action: function (data) {
                                _createOrEditModal.open({ id: data.record.recallDataLog.id });
                            }
                        }, 
						{
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deleteRecallDataLog(data.record.recallDataLog);
                            }
                        }]
                    }
                },
					{
						targets: 1,
						 data: "recallDataLog.recallReason"   
					},
					{
						targets: 2,
						 data: "recallDataLog.recalledByEmployeeName"   
					},
					{
						targets: 3,
						 data: "recallDataLog.recalledTime" ,
					render: function (recalledTime) {
						if (recalledTime) {
							return moment(recalledTime).format('L');
						}
						return "";
					}
			  
					},
					{
						targets: 4,
						 data: "recallDataLog.isManualRecalled"  ,
						render: function (isManualRecalled) {
							if (isManualRecalled) {
								return '<div class="text-center"><i class="fa fa-check-circle m--font-success" title="True"></i></div>';
							}
							return '<div class="text-center"><i class="fa fa-times-circle" title="False"></i></div>';
					}
			 
					},
					{
						targets: 5,
						 data: "userName" 
					},
					{
						targets: 6,
						 data: "customerDataName" 
					},
					{
						targets: 7,
						 data: "reasonDisplayName" 
					},
					{
						targets: 8,
						 data: "dataProcessStatusDisplayName" 
					},
					{
						targets: 9,
						 data: "dataChangeStatusLogNewStatusName" 
					}
            ]
        });


        function getRecallDataLogs() {
            dataTable.ajax.reload();
        }

        function deleteRecallDataLog(recallDataLog) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _recallDataLogsService.delete({
                            id: recallDataLog.id
                        }).done(function () {
                            getRecallDataLogs(true);
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

        $('#CreateNewRecallDataLogButton').click(function () {
            _createOrEditModal.open();
        });

		$('#ExportToExcelButton').click(function () {
            _recallDataLogsService
                .getRecallDataLogsToExcel({
				filter : $('#RecallDataLogsTableFilter').val(),
					recallReasonFilter: $('#RecallReasonFilterId').val(),
					recalledByEmployeeNameFilter: $('#RecalledByEmployeeNameFilterId').val(),
					minRecalledTimeFilter:  getDateFilter($('#MinRecalledTimeFilterId')),
					maxRecalledTimeFilter:  getDateFilter($('#MaxRecalledTimeFilterId')),
					isManualRecalledFilter: $('#IsManualRecalledFilterId').val(),
					userNameFilter: $('#UserNameFilterId').val(),
					customerDataNameFilter: $('#CustomerDataNameFilterId').val(),
					reasonDisplayNameFilter: $('#ReasonDisplayNameFilterId').val(),
					dataProcessStatusDisplayNameFilter: $('#DataProcessStatusDisplayNameFilterId').val(),
					dataChangeStatusLogNewStatusNameFilter: $('#DataChangeStatusLogNewStatusNameFilterId').val()
				})
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditRecallDataLogModalSaved', function () {
            getRecallDataLogs();
        });

		$('#GetRecallDataLogsButton').click(function (e) {
            e.preventDefault();
            getRecallDataLogs();
        });

		$(document).keypress(function(e) {
		  if(e.which === 13) {
			getRecallDataLogs();
		  }
		});

    });
})();