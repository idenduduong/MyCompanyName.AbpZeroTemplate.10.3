(function () {
    $(function () {

        var _$dataSourcesTable = $('#DataSourcesTable');
        var _dataSourcesService = abp.services.app.dataSources;
		
        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.DataSources.Create'),
            edit: abp.auth.hasPermission('Pages.DataSources.Edit'),
            'delete': abp.auth.hasPermission('Pages.DataSources.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DataSources/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DataSources/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditDataSourceModal'
        });

		 var _viewDataSourceModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DataSources/ViewdataSourceModal',
            modalClass: 'ViewDataSourceModal'
        });

		
		

        var getDateFilter = function (element) {
            if (element.data("DateTimePicker").date() == null) {
                return null;
            }
            return element.data("DateTimePicker").date().format("YYYY-MM-DDT00:00:00Z"); 
        }

        var dataTable = _$dataSourcesTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _dataSourcesService.getAll,
                inputFilter: function () {
                    return {
					filter: $('#DataSourcesTableFilter').val(),
					displayNameFilter: $('#DisplayNameFilterId').val(),
					codeFilter: $('#CodeFilterId').val(),
					minPriorityFilter: $('#MinPriorityFilterId').val(),
					maxPriorityFilter: $('#MaxPriorityFilterId').val(),
					isActiveFilter: $('#IsActiveFilterId').val()
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
                                    _viewDataSourceModal.open({ data: data.record });
                                }
                        },
						{
                            text: app.localize('Edit'),
                            visible: function () {
                                return _permissions.edit;
                            },
                            action: function (data) {
                                _createOrEditModal.open({ id: data.record.dataSource.id });
                            }
                        }, 
						{
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deleteDataSource(data.record.dataSource);
                            }
                        }]
                    }
                },
					{
						targets: 1,
						 data: "dataSource.displayName"   
					},
					{
						targets: 2,
						 data: "dataSource.code"   
					},
					{
						targets: 3,
						 data: "dataSource.priority"   
					},
					{
						targets: 4,
						 data: "dataSource.isActive"  ,
						render: function (isActive) {
							if (isActive) {
								return '<div class="text-center"><i class="fa fa-check-circle m--font-success" title="True"></i></div>';
							}
							return '<div class="text-center"><i class="fa fa-times-circle" title="False"></i></div>';
					}
			 
					}
            ]
        });


        function getDataSources() {
            dataTable.ajax.reload();
        }

        function deleteDataSource(dataSource) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _dataSourcesService.delete({
                            id: dataSource.id
                        }).done(function () {
                            getDataSources(true);
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

        $('#CreateNewDataSourceButton').click(function () {
            _createOrEditModal.open();
        });

		$('#ExportToExcelButton').click(function () {
            _dataSourcesService
                .getDataSourcesToExcel({
				filter : $('#DataSourcesTableFilter').val(),
					displayNameFilter: $('#DisplayNameFilterId').val(),
					codeFilter: $('#CodeFilterId').val(),
					minPriorityFilter: $('#MinPriorityFilterId').val(),
					maxPriorityFilter: $('#MaxPriorityFilterId').val(),
					isActiveFilter: $('#IsActiveFilterId').val()
				})
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditDataSourceModalSaved', function () {
            getDataSources();
        });

		$('#GetDataSourcesButton').click(function (e) {
            e.preventDefault();
            getDataSources();
        });

		$(document).keypress(function(e) {
		  if(e.which === 13) {
			getDataSources();
		  }
		});

    });
})();