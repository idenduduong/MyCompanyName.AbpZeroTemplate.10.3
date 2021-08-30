(function () {
    $(function () {

        var _$assigneBulkleDataLogsTable = $('#AssigneBulkleDataLogsTable');
        var _assigneBulkleDataLogsService = abp.services.app.assigneBulkleDataLogs;
		
        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.AssigneBulkleDataLogs.Create'),
            edit: abp.auth.hasPermission('Pages.AssigneBulkleDataLogs.Edit'),
            'delete': abp.auth.hasPermission('Pages.AssigneBulkleDataLogs.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/AssigneBulkleDataLogs/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/AssigneBulkleDataLogs/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditAssigneBulkleDataLogModal'
        });

		 var _viewAssigneBulkleDataLogModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/AssigneBulkleDataLogs/ViewassigneBulkleDataLogModal',
            modalClass: 'ViewAssigneBulkleDataLogModal'
        });

		
		

        var getDateFilter = function (element) {
            if (element.data("DateTimePicker").date() == null) {
                return null;
            }
            return element.data("DateTimePicker").date().format("YYYY-MM-DDT00:00:00Z"); 
        }

        var dataTable = _$assigneBulkleDataLogsTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _assigneBulkleDataLogsService.getAll,
                inputFilter: function () {
                    return {
					filter: $('#AssigneBulkleDataLogsTableFilter').val(),
					minAssignTypeFilter: $('#MinAssignTypeFilterId').val(),
					maxAssignTypeFilter: $('#MaxAssignTypeFilterId').val(),
					areasFilter: $('#AreasFilterId').val(),
					organizationsFilter: $('#OrganizationsFilterId').val(),
					resultFileFilter: $('#ResultFileFilterId').val(),
					minNumberToAssignFilter: $('#MinNumberToAssignFilterId').val(),
					maxNumberToAssignFilter: $('#MaxNumberToAssignFilterId').val(),
					userNameFilter: $('#UserNameFilterId').val()
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
                                    _viewAssigneBulkleDataLogModal.open({ data: data.record });
                                }
                        },
						{
                            text: app.localize('Edit'),
                            visible: function () {
                                return _permissions.edit;
                            },
                            action: function (data) {
                                _createOrEditModal.open({ id: data.record.assigneBulkleDataLog.id });
                            }
                        }, 
						{
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deleteAssigneBulkleDataLog(data.record.assigneBulkleDataLog);
                            }
                        }]
                    }
                },
					{
						targets: 1,
						 data: "assigneBulkleDataLog.assignType"   
					},
					{
						targets: 2,
						 data: "assigneBulkleDataLog.areas"   
					},
					{
						targets: 3,
						 data: "assigneBulkleDataLog.organizations"   
					},
					{
						targets: 4,
						 data: "assigneBulkleDataLog.resultFile"   
					},
					{
						targets: 5,
						 data: "assigneBulkleDataLog.numberToAssign"   
					},
					{
						targets: 6,
						 data: "userName" 
					}
            ]
        });


        function getAssigneBulkleDataLogs() {
            dataTable.ajax.reload();
        }

        function deleteAssigneBulkleDataLog(assigneBulkleDataLog) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _assigneBulkleDataLogsService.delete({
                            id: assigneBulkleDataLog.id
                        }).done(function () {
                            getAssigneBulkleDataLogs(true);
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

        $('#CreateNewAssigneBulkleDataLogButton').click(function () {
            _createOrEditModal.open();
        });

		$('#ExportToExcelButton').click(function () {
            _assigneBulkleDataLogsService
                .getAssigneBulkleDataLogsToExcel({
				filter : $('#AssigneBulkleDataLogsTableFilter').val(),
					minAssignTypeFilter: $('#MinAssignTypeFilterId').val(),
					maxAssignTypeFilter: $('#MaxAssignTypeFilterId').val(),
					areasFilter: $('#AreasFilterId').val(),
					organizationsFilter: $('#OrganizationsFilterId').val(),
					resultFileFilter: $('#ResultFileFilterId').val(),
					minNumberToAssignFilter: $('#MinNumberToAssignFilterId').val(),
					maxNumberToAssignFilter: $('#MaxNumberToAssignFilterId').val(),
					userNameFilter: $('#UserNameFilterId').val()
				})
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditAssigneBulkleDataLogModalSaved', function () {
            getAssigneBulkleDataLogs();
        });

		$('#GetAssigneBulkleDataLogsButton').click(function (e) {
            e.preventDefault();
            getAssigneBulkleDataLogs();
        });

		$(document).keypress(function(e) {
		  if(e.which === 13) {
			getAssigneBulkleDataLogs();
		  }
		});

    });
})();