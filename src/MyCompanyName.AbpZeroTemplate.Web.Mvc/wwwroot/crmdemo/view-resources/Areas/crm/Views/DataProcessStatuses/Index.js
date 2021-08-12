(function () {
    $(function () {

        var _$dataProcessStatusesTable = $('#DataProcessStatusesTable');
        var _dataProcessStatusesService = abp.services.app.dataProcessStatuses;

        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.DataProcessStatuses.Create'),
            edit: abp.auth.hasPermission('Pages.DataProcessStatuses.Edit'),
            'delete': abp.auth.hasPermission('Pages.DataProcessStatuses.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DataProcessStatuses/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DataProcessStatuses/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditDataProcessStatusModal'
        });
        var _editFlowModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/ChangeStatusFlows/Index',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/ChangeStatusFlows/Index.js',
            modalClass:"StatusFlowModal"
        });

        var _viewDataProcessStatusModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DataProcessStatuses/ViewdataProcessStatusModal',
            modalClass: 'ViewDataProcessStatusModal'
        });




        var getDateFilter = function (element) {
            if (element.data("DateTimePicker").date() == null) {
                return null;
            }
            return element.data("DateTimePicker").date().format("YYYY-MM-DDT00:00:00Z");
        }

        var dataTable = _$dataProcessStatusesTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _dataProcessStatusesService.getAll,
                inputFilter: function () {
                    return {
                        filter: $('#DataProcessStatusesTableFilter').val(),
                        displayNameFilter: $('#DisplayNameFilterId').val(),
                        isActiveFilter: $('#IsActiveFilterId').val(),
                        isEndProcessFilter: $('#IsEndProcessFilterId').val(),
                        isBeginProcessFilter: $('#IsBeginProcessFilterId').val(),
                        isCallRequiredFilter: $('#IsCallRequiredFilterId').val(),
                        isPhoneCommunicationRequiredFilter: $('#IsPhoneCommunicationRequiredFilterId').val(),
                        isReasonRequiredFilter: $('#IsReasonRequiredFilterId').val()
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
                                    _createOrEditModal.open({ id: data.record.dataProcessStatus.id });
                                }
                            },
                            {
                                text: app.localize('Flow'),
                                visible: function () {
                                    return _permissions.edit;
                                },
                                action: function (data) {
                                    _editFlowModal.open({ statusId: data.record.dataProcessStatus.id });
                                }
                            },
                            {
                                text: app.localize('Delete'),
                                visible: function () {
                                    return _permissions.delete;
                                },
                                action: function (data) {
                                    deleteDataProcessStatus(data.record.dataProcessStatus);
                                }
                            }]
                    }
                },
                {
                    targets: 1,
                    data: "dataProcessStatus.displayName"
                },
                {
                    targets: 2,
                    data: "dataProcessStatus.isActive",
                    render: function (isActive) {
                        if (isActive) {
                            return '<div class="text-center"><i class="fa fa-check-circle m--font-success" title="True"></i></div>';
                        }
                        return '<div class="text-center"><i class="fa fa-times-circle" title="False"></i></div>';
                    }

                },
                {
                    targets: 3,
                    data: "dataProcessStatus.isEndProcess",
                    render: function (isEndProcess) {
                        if (isEndProcess) {
                            return '<div class="text-center"><i class="fa fa-check-circle m--font-success" title="True"></i></div>';
                        }
                        return '<div class="text-center"><i class="fa fa-times-circle" title="False"></i></div>';
                    }

                },
                {
                    targets: 4,
                    data: "dataProcessStatus.isBeginProcess",
                    render: function (isBeginProcess) {
                        if (isBeginProcess) {
                            return '<div class="text-center"><i class="fa fa-check-circle m--font-success" title="True"></i></div>';
                        }
                        return '<div class="text-center"><i class="fa fa-times-circle" title="False"></i></div>';
                    }

                },
                {
                    targets: 5,
                    data: "dataProcessStatus.isCallRequired",
                    render: function (isCallRequired) {
                        if (isCallRequired) {
                            return '<div class="text-center"><i class="fa fa-check-circle m--font-success" title="True"></i></div>';
                        }
                        return '<div class="text-center"><i class="fa fa-times-circle" title="False"></i></div>';
                    }

                },
                {
                    targets: 6,
                    data: "dataProcessStatus.isPhoneCommunicationRequired",
                    render: function (isPhoneCommunicationRequired) {
                        if (isPhoneCommunicationRequired) {
                            return '<div class="text-center"><i class="fa fa-check-circle m--font-success" title="True"></i></div>';
                        }
                        return '<div class="text-center"><i class="fa fa-times-circle" title="False"></i></div>';
                    }

                },
                {
                    targets: 7,
                    data: "dataProcessStatus.isReasonRequired",
                    render: function (isReasonRequired) {
                        if (isReasonRequired) {
                            return '<div class="text-center"><i class="fa fa-check-circle m--font-success" title="True"></i></div>';
                        }
                        return '<div class="text-center"><i class="fa fa-times-circle" title="False"></i></div>';
                    }

                },
                {
                    targets: 8,
                    data: "dataProcessStatus.isFileRequired",
                    render: function (isFileRequired) {
                        if (isFileRequired) {
                            return '<div class="text-center"><i class="fa fa-check-circle m--font-success" title="True"></i></div>';
                        }
                        return '<div class="text-center"><i class="fa fa-times-circle" title="False"></i></div>';
                    }

                },
                {
                    targets: 9,
                    data: "dataProcessStatus.isScheduleRequired",
                    render: function (isScheduleRequired) {
                        if (isScheduleRequired) {
                            return '<div class="text-center"><i class="fa fa-check-circle m--font-success" title="True"></i></div>';
                        }
                        return '<div class="text-center"><i class="fa fa-times-circle" title="False"></i></div>';
                    }

                }
            ]
        });


        function getDataProcessStatuses() {
            dataTable.ajax.reload();
        }

        function deleteDataProcessStatus(dataProcessStatus) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _dataProcessStatusesService.delete({
                            id: dataProcessStatus.id
                        }).done(function () {
                            getDataProcessStatuses(true);
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

        $('#CreateNewDataProcessStatusButton').click(function () {
            _createOrEditModal.open();
        });

        $('#ExportToExcelButton').click(function () {
            _dataProcessStatusesService
                .getDataProcessStatusesToExcel({
                    filter: $('#DataProcessStatusesTableFilter').val(),
                    displayNameFilter: $('#DisplayNameFilterId').val(),
                    isActiveFilter: $('#IsActiveFilterId').val(),
                    isEndProcessFilter: $('#IsEndProcessFilterId').val(),
                    isBeginProcessFilter: $('#IsBeginProcessFilterId').val(),
                    isCallRequiredFilter: $('#IsCallRequiredFilterId').val(),
                    isPhoneCommunicationRequiredFilter: $('#IsPhoneCommunicationRequiredFilterId').val(),
                    isReasonRequiredFilter: $('#IsReasonRequiredFilterId').val()
                })
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditDataProcessStatusModalSaved', function () {
            getDataProcessStatuses();
        });

        $('#GetDataProcessStatusesButton').click(function (e) {
            e.preventDefault();
            getDataProcessStatuses();
        });

        $(document).keypress(function (e) {
            if (e.which === 13) {
                getDataProcessStatuses();
            }
        });

    });
})();