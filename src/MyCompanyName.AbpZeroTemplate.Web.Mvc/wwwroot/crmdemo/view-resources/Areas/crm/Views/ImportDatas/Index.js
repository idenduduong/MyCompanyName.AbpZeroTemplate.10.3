(function () {
    $(function () {

        var _$importDatasTable = $('#ImportDatasTable');
        var _importDatasService = abp.services.app.importDatas;
		
        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.ImportDatas.Create'),
            edit: abp.auth.hasPermission('Pages.ImportDatas.Edit'),
            'delete': abp.auth.hasPermission('Pages.ImportDatas.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/ImportDatas/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/ImportDatas/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditImportDataModal'
        });

		 var _viewImportDataModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/ImportDatas/ViewimportDataModal',
            modalClass: 'ViewImportDataModal'
        });

		
		

        var getDateFilter = function (element) {
            if (element.data("DateTimePicker").date() == null) {
                return null;
            }
            return element.data("DateTimePicker").date().format("YYYY-MM-DDT00:00:00Z"); 
        }

        var dataTable = _$importDatasTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _importDatasService.getAll,
                inputFilter: function () {
                    return {
					filter: $('#ImportDatasTableFilter').val(),
					minImportTimeFilter:  getDateFilter($('#MinImportTimeFilterId')),
					maxImportTimeFilter:  getDateFilter($('#MaxImportTimeFilterId')),
					inputFileFilter: $('#InputFileFilterId').val(),
					outputFileFilter: $('#OutputFileFilterId').val(),
					minDataTypeFilter: $('#MinDataTypeFilterId').val(),
					maxDataTypeFilter: $('#MaxDataTypeFilterId').val(),
					minTotalSuccessFilter: $('#MinTotalSuccessFilterId').val(),
					maxTotalSuccessFilter: $('#MaxTotalSuccessFilterId').val(),
					minTotalWarningFilter: $('#MinTotalWarningFilterId').val(),
					maxTotalWarningFilter: $('#MaxTotalWarningFilterId').val(),
					minTotalFailureFilter: $('#MinTotalFailureFilterId').val(),
					maxTotalFailureFilter: $('#MaxTotalFailureFilterId').val(),
					importCodeFilter: $('#ImportCodeFilterId').val(),
					userNameFilter: $('#UserNameFilterId').val(),
					dataSourceDisplayNameFilter: $('#DataSourceDisplayNameFilterId').val()
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
                                    _viewImportDataModal.open({ data: data.record });
                                }
                        },
						{
                            text: app.localize('Edit'),
                            visible: function () {
                                return _permissions.edit;
                            },
                            action: function (data) {
                                _createOrEditModal.open({ id: data.record.importData.id });
                            }
                        }, 
						{
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deleteImportData(data.record.importData);
                            }
                        }]
                    }
                },
					{
						targets: 1,
						 data: "importData.importTime" ,
					render: function (importTime) {
						if (importTime) {
							return moment(importTime).format('L');
						}
						return "";
					}
			  
					},
					{
						targets: 2,
						 data: "importData.inputFile"   
					},
					{
						targets: 3,
						 data: "importData.outputFile"   
					},
					{
						targets: 4,
						 data: "importData.dataType"   
					},
					{
						targets: 5,
						 data: "importData.totalSuccess"   
					},
					{
						targets: 6,
						 data: "importData.totalWarning"   
					},
					{
						targets: 7,
						 data: "importData.totalFailure"   
					},
					{
						targets: 8,
						 data: "importData.importCode"   
					},
					{
						targets: 9,
						 data: "userName" 
					},
					{
						targets: 10,
						 data: "dataSourceDisplayName" 
					}
            ]
        });


        function getImportDatas() {
            dataTable.ajax.reload();
        }

        function deleteImportData(importData) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _importDatasService.delete({
                            id: importData.id
                        }).done(function () {
                            getImportDatas(true);
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

        $('#CreateNewImportDataButton').click(function () {
            _createOrEditModal.open();
        });

		$('#ExportToExcelButton').click(function () {
            _importDatasService
                .getImportDatasToExcel({
				filter : $('#ImportDatasTableFilter').val(),
					minImportTimeFilter:  getDateFilter($('#MinImportTimeFilterId')),
					maxImportTimeFilter:  getDateFilter($('#MaxImportTimeFilterId')),
					inputFileFilter: $('#InputFileFilterId').val(),
					outputFileFilter: $('#OutputFileFilterId').val(),
					minDataTypeFilter: $('#MinDataTypeFilterId').val(),
					maxDataTypeFilter: $('#MaxDataTypeFilterId').val(),
					minTotalSuccessFilter: $('#MinTotalSuccessFilterId').val(),
					maxTotalSuccessFilter: $('#MaxTotalSuccessFilterId').val(),
					minTotalWarningFilter: $('#MinTotalWarningFilterId').val(),
					maxTotalWarningFilter: $('#MaxTotalWarningFilterId').val(),
					minTotalFailureFilter: $('#MinTotalFailureFilterId').val(),
					maxTotalFailureFilter: $('#MaxTotalFailureFilterId').val(),
					importCodeFilter: $('#ImportCodeFilterId').val(),
					userNameFilter: $('#UserNameFilterId').val(),
					dataSourceDisplayNameFilter: $('#DataSourceDisplayNameFilterId').val()
				})
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditImportDataModalSaved', function () {
            getImportDatas();
        });

		$('#GetImportDatasButton').click(function (e) {
            e.preventDefault();
            getImportDatas();
        });

		$(document).keypress(function(e) {
		  if(e.which === 13) {
			getImportDatas();
		  }
		});

    });
})();