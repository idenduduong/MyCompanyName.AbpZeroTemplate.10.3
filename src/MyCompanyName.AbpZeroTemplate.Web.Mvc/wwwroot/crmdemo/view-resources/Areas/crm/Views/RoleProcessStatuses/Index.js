(function () {
    $(function () {

        var _$roleProcessStatusesTable = $('#RoleProcessStatusesTable');
        var _roleProcessStatusesService = abp.services.app.roleProcessStatuses;
		
        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.RoleProcessStatuses.Create'),
            edit: abp.auth.hasPermission('Pages.RoleProcessStatuses.Edit'),
            'delete': abp.auth.hasPermission('Pages.RoleProcessStatuses.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/RoleProcessStatuses/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/RoleProcessStatuses/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditRoleProcessStatusModal'
        });

		 var _viewRoleProcessStatusModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/RoleProcessStatuses/ViewroleProcessStatusModal',
            modalClass: 'ViewRoleProcessStatusModal'
        });

		
		

        var getDateFilter = function (element) {
            if (element.data("DateTimePicker").date() == null) {
                return null;
            }
            return element.data("DateTimePicker").date().format("YYYY-MM-DDT00:00:00Z"); 
        }

        var dataTable = _$roleProcessStatusesTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _roleProcessStatusesService.getAll,
                inputFilter: function () {
                    return {
					filter: $('#RoleProcessStatusesTableFilter').val(),
					minRoleIdFilter: $('#MinRoleIdFilterId').val(),
					maxRoleIdFilter: $('#MaxRoleIdFilterId').val(),
					canChangeStatusToThisFilter: $('#CanChangeStatusToThisFilterId').val(),
					canViewThisFilter: $('#CanViewThisFilterId').val(),
					dataProcessStatusDisplayNameFilter: $('#DataProcessStatusDisplayNameFilterId').val()
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
                                    _viewRoleProcessStatusModal.open({ data: data.record });
                                }
                        },
						{
                            text: app.localize('Edit'),
                            visible: function () {
                                return _permissions.edit;
                            },
                            action: function (data) {
                                _createOrEditModal.open({ id: data.record.roleProcessStatus.id });
                            }
                        }, 
						{
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deleteRoleProcessStatus(data.record.roleProcessStatus);
                            }
                        }]
                    }
                },
					{
						targets: 1,
						 data: "roleProcessStatus.roleId"   
					},
					{
						targets: 2,
						 data: "roleProcessStatus.canChangeStatusToThis"  ,
						render: function (canChangeStatusToThis) {
							if (canChangeStatusToThis) {
								return '<div class="text-center"><i class="fa fa-check-circle m--font-success" title="True"></i></div>';
							}
							return '<div class="text-center"><i class="fa fa-times-circle" title="False"></i></div>';
					}
			 
					},
					{
						targets: 3,
						 data: "roleProcessStatus.canViewThis"  ,
						render: function (canViewThis) {
							if (canViewThis) {
								return '<div class="text-center"><i class="fa fa-check-circle m--font-success" title="True"></i></div>';
							}
							return '<div class="text-center"><i class="fa fa-times-circle" title="False"></i></div>';
					}
			 
					},
					{
						targets: 4,
						 data: "dataProcessStatusDisplayName" 
					}
            ]
        });


        function getRoleProcessStatuses() {
            dataTable.ajax.reload();
        }

        function deleteRoleProcessStatus(roleProcessStatus) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _roleProcessStatusesService.delete({
                            id: roleProcessStatus.id
                        }).done(function () {
                            getRoleProcessStatuses(true);
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

        $('#CreateNewRoleProcessStatusButton').click(function () {
            _createOrEditModal.open();
        });

		$('#ExportToExcelButton').click(function () {
            _roleProcessStatusesService
                .getRoleProcessStatusesToExcel({
				filter : $('#RoleProcessStatusesTableFilter').val(),
					minRoleIdFilter: $('#MinRoleIdFilterId').val(),
					maxRoleIdFilter: $('#MaxRoleIdFilterId').val(),
					canChangeStatusToThisFilter: $('#CanChangeStatusToThisFilterId').val(),
					canViewThisFilter: $('#CanViewThisFilterId').val(),
					dataProcessStatusDisplayNameFilter: $('#DataProcessStatusDisplayNameFilterId').val()
				})
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditRoleProcessStatusModalSaved', function () {
            getRoleProcessStatuses();
        });

		$('#GetRoleProcessStatusesButton').click(function (e) {
            e.preventDefault();
            getRoleProcessStatuses();
        });

		$(document).keypress(function(e) {
		  if(e.which === 13) {
			getRoleProcessStatuses();
		  }
		});

    });
})();