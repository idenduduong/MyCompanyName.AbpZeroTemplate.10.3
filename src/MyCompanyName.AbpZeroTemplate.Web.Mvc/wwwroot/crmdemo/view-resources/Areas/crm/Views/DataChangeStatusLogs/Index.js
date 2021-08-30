(function () {
    $(function () {

        var _$dataChangeStatusLogsTable = $('#DataChangeStatusLogsTable');
        var _dataChangeStatusLogsService = abp.services.app.dataChangeStatusLogs;
		
        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.DataChangeStatusLogs.Create'),
            edit: abp.auth.hasPermission('Pages.DataChangeStatusLogs.Edit'),
            'delete': abp.auth.hasPermission('Pages.DataChangeStatusLogs.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DataChangeStatusLogs/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DataChangeStatusLogs/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditDataChangeStatusLogModal'
        });

		 var _viewDataChangeStatusLogModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DataChangeStatusLogs/ViewdataChangeStatusLogModal',
            modalClass: 'ViewDataChangeStatusLogModal'
        });

		
		

        var getDateFilter = function (element) {
            if (element.data("DateTimePicker").date() == null) {
                return null;
            }
            return element.data("DateTimePicker").date().format("YYYY-MM-DDT00:00:00Z"); 
        }

        var dataTable = _$dataChangeStatusLogsTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _dataChangeStatusLogsService.getAll,
                inputFilter: function () {
                    return {
					filter: $('#DataChangeStatusLogsTableFilter').val(),
					minLastChangeTimeFilter:  getDateFilter($('#MinLastChangeTimeFilterId')),
					maxLastChangeTimeFilter:  getDateFilter($('#MaxLastChangeTimeFilterId')),
					minChangeTimeFilter:  getDateFilter($('#MinChangeTimeFilterId')),
					maxChangeTimeFilter:  getDateFilter($('#MaxChangeTimeFilterId')),
					reasonStringFilter: $('#ReasonStringFilterId').val(),
					phoneConfirmedFilter: $('#PhoneConfirmedFilterId').val(),
					lastStatusNameFilter: $('#LastStatusNameFilterId').val(),
					newStatusNameFilter: $('#NewStatusNameFilterId').val(),
					isEndProcessFilter: $('#IsEndProcessFilterId').val(),
					communicationConfirmedFilter: $('#CommunicationConfirmedFilterId').val(),
					phoneLogDurationBySecondFilter: $('#PhoneLogDurationBySecondFilterId').val(),
					phoneLogDurationBySecond2Filter: $('#PhoneLogDurationBySecond2FilterId').val(),
					dataProcessStatusDisplayNameFilter: $('#DataProcessStatusDisplayNameFilterId').val(),
					dataProcessStatusDisplayName2Filter: $('#DataProcessStatusDisplayName2FilterId').val(),
					reasonDisplayNameFilter: $('#ReasonDisplayNameFilterId').val()
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
                                    _viewDataChangeStatusLogModal.open({ data: data.record });
                                }
                        },
						{
                            text: app.localize('Edit'),
                            visible: function () {
                                return _permissions.edit;
                            },
                            action: function (data) {
                                _createOrEditModal.open({ id: data.record.dataChangeStatusLog.id });
                            }
                        }, 
						{
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deleteDataChangeStatusLog(data.record.dataChangeStatusLog);
                            }
                        }]
                    }
                },
					{
						targets: 1,
						 data: "dataChangeStatusLog.lastChangeTime" ,
					render: function (lastChangeTime) {
						if (lastChangeTime) {
							return moment(lastChangeTime).format('L');
						}
						return "";
					}
			  
					},
					{
						targets: 2,
						 data: "dataChangeStatusLog.changeTime" ,
					render: function (changeTime) {
						if (changeTime) {
							return moment(changeTime).format('L');
						}
						return "";
					}
			  
					},
					{
						targets: 3,
						 data: "dataChangeStatusLog.reasonString"   
					},
					{
						targets: 4,
						 data: "dataChangeStatusLog.phoneConfirmed"  ,
						render: function (phoneConfirmed) {
							if (phoneConfirmed) {
								return '<div class="text-center"><i class="fa fa-check-circle m--font-success" title="True"></i></div>';
							}
							return '<div class="text-center"><i class="fa fa-times-circle" title="False"></i></div>';
					}
			 
					},
					{
						targets: 5,
						 data: "dataChangeStatusLog.lastStatusName"   
					},
					{
						targets: 6,
						 data: "dataChangeStatusLog.newStatusName"   
					},
					{
						targets: 7,
						 data: "dataChangeStatusLog.isEndProcess"  ,
						render: function (isEndProcess) {
							if (isEndProcess) {
								return '<div class="text-center"><i class="fa fa-check-circle m--font-success" title="True"></i></div>';
							}
							return '<div class="text-center"><i class="fa fa-times-circle" title="False"></i></div>';
					}
			 
					},
					{
						targets: 8,
						 data: "dataChangeStatusLog.communicationConfirmed"  ,
						render: function (communicationConfirmed) {
							if (communicationConfirmed) {
								return '<div class="text-center"><i class="fa fa-check-circle m--font-success" title="True"></i></div>';
							}
							return '<div class="text-center"><i class="fa fa-times-circle" title="False"></i></div>';
					}
			 
					},
					{
						targets: 9,
						 data: "phoneLogDurationBySecond" 
					},
					{
						targets: 10,
						 data: "phoneLogDurationBySecond2" 
					},
					{
						targets: 11,
						 data: "dataProcessStatusDisplayName" 
					},
					{
						targets: 12,
						 data: "dataProcessStatusDisplayName2" 
					},
					{
						targets: 13,
						 data: "reasonDisplayName" 
					}
            ]
        });


        function getDataChangeStatusLogs() {
            dataTable.ajax.reload();
        }

        function deleteDataChangeStatusLog(dataChangeStatusLog) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _dataChangeStatusLogsService.delete({
                            id: dataChangeStatusLog.id
                        }).done(function () {
                            getDataChangeStatusLogs(true);
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

        $('#CreateNewDataChangeStatusLogButton').click(function () {
            _createOrEditModal.open();
        });

		$('#ExportToExcelButton').click(function () {
            _dataChangeStatusLogsService
                .getDataChangeStatusLogsToExcel({
				filter : $('#DataChangeStatusLogsTableFilter').val(),
					minLastChangeTimeFilter:  getDateFilter($('#MinLastChangeTimeFilterId')),
					maxLastChangeTimeFilter:  getDateFilter($('#MaxLastChangeTimeFilterId')),
					minChangeTimeFilter:  getDateFilter($('#MinChangeTimeFilterId')),
					maxChangeTimeFilter:  getDateFilter($('#MaxChangeTimeFilterId')),
					reasonStringFilter: $('#ReasonStringFilterId').val(),
					phoneConfirmedFilter: $('#PhoneConfirmedFilterId').val(),
					lastStatusNameFilter: $('#LastStatusNameFilterId').val(),
					newStatusNameFilter: $('#NewStatusNameFilterId').val(),
					isEndProcessFilter: $('#IsEndProcessFilterId').val(),
					communicationConfirmedFilter: $('#CommunicationConfirmedFilterId').val(),
					phoneLogDurationBySecondFilter: $('#PhoneLogDurationBySecondFilterId').val(),
					phoneLogDurationBySecond2Filter: $('#PhoneLogDurationBySecond2FilterId').val(),
					dataProcessStatusDisplayNameFilter: $('#DataProcessStatusDisplayNameFilterId').val(),
					dataProcessStatusDisplayName2Filter: $('#DataProcessStatusDisplayName2FilterId').val(),
					reasonDisplayNameFilter: $('#ReasonDisplayNameFilterId').val()
				})
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditDataChangeStatusLogModalSaved', function () {
            getDataChangeStatusLogs();
        });

		$('#GetDataChangeStatusLogsButton').click(function (e) {
            e.preventDefault();
            getDataChangeStatusLogs();
        });

		$(document).keypress(function(e) {
		  if(e.which === 13) {
			getDataChangeStatusLogs();
		  }
		});

    });
})();