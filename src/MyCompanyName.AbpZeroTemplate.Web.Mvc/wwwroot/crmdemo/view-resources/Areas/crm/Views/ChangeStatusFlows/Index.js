(function () {
    app.modals.StatusFlowModal = function () {
        var _$changeStatusFlowsTable = $('#ChangeStatusFlowsTable');
        var _changeStatusFlowsService = abp.services.app.changeStatusFlows;

        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.ChangeStatusFlows.Create'),
            edit: abp.auth.hasPermission('Pages.ChangeStatusFlows.Edit'),
            'delete': abp.auth.hasPermission('Pages.ChangeStatusFlows.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/ChangeStatusFlows/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/ChangeStatusFlows/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditChangeStatusFlowModal'
        });

        var _viewChangeStatusFlowModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/ChangeStatusFlows/ViewchangeStatusFlowModal',
            modalClass: 'ViewChangeStatusFlowModal'
        });




        var getDateFilter = function (element) {
            if (element.data("DateTimePicker").date() == null) {
                return null;
            }
            return element.data("DateTimePicker").date().format("YYYY-MM-DDT00:00:00Z");
        }

        var dataTable = _$changeStatusFlowsTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _changeStatusFlowsService.getAll,
                inputFilter: function () {
                    
                    return {
                        filter: $('#ChangeStatusFlowsTableFilter').val(),
                        statusId: $('#StatusId').val(),
                        isEndFlowFilter: $('#IsEndFlowFilterId').val()
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
                                text: app.localize('Edit'),
                                visible: function () {
                                    return _permissions.edit;
                                },
                                action: function (data) {
                                    
                                    _createOrEditModal.open({ id: data.record.changeStatusFlow.id, statusId: $('#StatusId').val() });
                                }
                            },
                            {
                                text: app.localize('Delete'),
                                visible: function () {
                                    return _permissions.delete;
                                },
                                action: function (data) {
                                    deleteChangeStatusFlow(data.record.changeStatusFlow);
                                }
                            }]
                    }
                },
                {
                    targets: 1,
                    data: "dataProcessStatusDisplayName2"
                },
                {
                    targets: 2,
                    data: "changeStatusFlow.days"
                },
                {
                    targets: 3,
                    data: "changeStatusFlow.isEndFlow",
                    render: function (isEndFlow) {
                        if (isEndFlow) {
                            return '<div class="text-center"><i class="fa fa-check-circle m--font-success" title="True"></i></div>';
                        }
                        return '<div class="text-center"><i class="fa fa-times-circle" title="False"></i></div>';
                    }

                }
                
            ]
        });


        function getChangeStatusFlows() {
            dataTable.ajax.reload();
        }

        function deleteChangeStatusFlow(changeStatusFlow) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _changeStatusFlowsService.delete({
                            id: changeStatusFlow.id
                        }).done(function () {
                            getChangeStatusFlows(true);
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

        $('#CreateNewChangeStatusFlowButton').click(function () {
            _createOrEditModal.open({ statusId: $('#StatusId').val()});
        });

        $('#ExportToExcelButton').click(function () {
            _changeStatusFlowsService
                .getChangeStatusFlowsToExcel({
                    filter: $('#ChangeStatusFlowsTableFilter').val(),
                    minDaysFilter: $('#MinDaysFilterId').val(),
                    maxDaysFilter: $('#MaxDaysFilterId').val(),
                    isEndFlowFilter: $('#IsEndFlowFilterId').val(),
                    dataProcessStatusDisplayNameFilter: $('#DataProcessStatusDisplayNameFilterId').val(),
                    dataProcessStatusDisplayName2Filter: $('#DataProcessStatusDisplayName2FilterId').val()
                })
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditChangeStatusFlowModalSaved', function () {
            getChangeStatusFlows();
        });

        $('#GetChangeStatusFlowsButton').click(function (e) {
            e.preventDefault();
            getChangeStatusFlows();
        });

        $(document).keypress(function (e) {
            if (e.which === 13) {
                getChangeStatusFlows();
            }
        });
    }
})(jQuery);