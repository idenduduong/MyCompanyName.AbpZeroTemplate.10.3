(function () {
    $(function () {

        var _$reportDatasTable = $('#ReportDatasTable');
        var _reportDatasService = abp.services.app.reportDatas;
		
        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.ReportDatas.Create'),
            edit: abp.auth.hasPermission('Pages.ReportDatas.Edit'),
            'delete': abp.auth.hasPermission('Pages.ReportDatas.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/ReportDatas/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/ReportDatas/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditReportDataModal'
        });

		 var _viewReportDataModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/ReportDatas/ViewreportDataModal',
            modalClass: 'ViewReportDataModal'
        });

		
		

        var getDateFilter = function (element) {
            if (element.data("DateTimePicker").date() == null) {
                return null;
            }
            return element.data("DateTimePicker").date().format("YYYY-MM-DDT00:00:00Z"); 
        }

        var dataTable = _$reportDatasTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _reportDatasService.getAll,
                inputFilter: function () {
                    return {
					filter: $('#ReportDatasTableFilter').val()
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
                                    _viewReportDataModal.open({ data: data.record });
                                }
                        },
						{
                            text: app.localize('Edit'),
                            visible: function () {
                                return _permissions.edit;
                            },
                            action: function (data) {
                                _createOrEditModal.open({ id: data.record.reportData.id });
                            }
                        }, 
						{
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deleteReportData(data.record.reportData);
                            }
                        }]
                    }
                },
					{
						targets: 1,
						 data: "reportData.data"   
					},
					{
						targets: 2,
						 data: "reportData.fileUrl"   
					}
            ]
        });


        function getReportDatas() {
            dataTable.ajax.reload();
        }

        function deleteReportData(reportData) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _reportDatasService.delete({
                            id: reportData.id
                        }).done(function () {
                            getReportDatas(true);
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

        $('#CreateNewReportDataButton').click(function () {
            _createOrEditModal.open();
        });

		$('#ExportToExcelButton').click(function () {
            _reportDatasService
                .getReportDatasToExcel({
				filter : $('#ReportDatasTableFilter').val()
				})
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditReportDataModalSaved', function () {
            getReportDatas();
        });

		$('#GetReportDatasButton').click(function (e) {
            e.preventDefault();
            getReportDatas();
        });

		$(document).keypress(function(e) {
		  if(e.which === 13) {
			getReportDatas();
		  }
		});

    });
})();