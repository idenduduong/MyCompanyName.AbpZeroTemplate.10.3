(function ($) {
    app.modals.CreateOrEditCustomerDataModal = function () {

        var _customerDatasService = abp.services.app.customerDatas;
        var _commonService = abp.services.app.commonLookup;

        var _$dataChangeStatusLogsTable = $('#DataChangeStatusLogsTable');
        var _dataChangeStatusLogsService = abp.services.app.dataChangeStatusLogs;

        var _$assignDataLogsTable = $('#AssignDataLogsTable');
        var _assignDataLogsService = abp.services.app.assignDataLogs;

        var _$phoneLogsTable = $('#PhoneLogsTable');
        var _phoneLogsService = abp.services.app.phoneLogs;

        var _modalManager;
        var _$customerDataInformationForm = null;
        var _changeStatusLogPermissions = {
            create: abp.auth.hasPermission('Pages.DataChangeStatusLogs.Create'),
            edit: abp.auth.hasPermission('Pages.DataChangeStatusLogs.Edit'),
            'delete': abp.auth.hasPermission('Pages.DataChangeStatusLogs.Delete')
        };

        var _assignDataPermissions = {
            create: abp.auth.hasPermission('Pages.AssignDataLogs.Create'),
            edit: abp.auth.hasPermission('Pages.AssignDataLogs.Edit'),
            'delete': abp.auth.hasPermission('Pages.AssignDataLogs.Delete')
        };

        var _phoneLogPermissions = {
            create: abp.auth.hasPermission('Pages.PhoneLogs.Create'),
            edit: abp.auth.hasPermission('Pages.PhoneLogs.Edit'),
            'delete': abp.auth.hasPermission('Pages.PhoneLogs.Delete')
        };
        var _dM_QuocGiaLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/CustomerDatas/DM_QuocGiaLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/CustomerDatas/_DM_QuocGiaLookupTableModal.js',
            modalClass: 'DM_QuocGiaLookupTableModal'
        }); var _dM_TinhThanhLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/CustomerDatas/DM_TinhThanhLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/CustomerDatas/_DM_TinhThanhLookupTableModal.js',
            modalClass: 'DM_TinhThanhLookupTableModal'
        }); var _dM_QuanHuyenLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/CustomerDatas/DM_QuanHuyenLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/CustomerDatas/_DM_QuanHuyenLookupTableModal.js',
            modalClass: 'DM_QuanHuyenLookupTableModal'
        }); var _dM_NgheNghiepLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/CustomerDatas/DM_NgheNghiepLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/CustomerDatas/_DM_NgheNghiepLookupTableModal.js',
            modalClass: 'DM_NgheNghiepLookupTableModal'
        }); var _organizationUnitLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/CustomerDatas/OrganizationUnitLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/CustomerDatas/_OrganizationUnitLookupTableModal.js',
            modalClass: 'OrganizationUnitLookupTableModal'
        }); var _dM_HangHoaLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/CustomerDatas/DM_HangHoaLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/CustomerDatas/_DM_HangHoaLookupTableModal.js',
            modalClass: 'DM_HangHoaLookupTableModal'
        }); var _importDataLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/CustomerDatas/ImportDataLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/CustomerDatas/_ImportDataLookupTableModal.js',
            modalClass: 'ImportDataLookupTableModal'
        }); var _dM_DoiTuongLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/CustomerDatas/DM_DoiTuongLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/CustomerDatas/_DM_DoiTuongLookupTableModal.js',
            modalClass: 'DM_DoiTuongLookupTableModal'
        });
        var _changeStatusWithAdditionalDataModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/CustomerDatas/ChangeStatusWithAdditionalDataModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/CustomerDatas/_ChangeStatusWithAdditionalDataModal.js',
            modalClass: 'ChangeStatusWithAdditionalDataModal'
        });
        var _dataSourceLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/ImportDatas/DataSourceLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/ImportDatas/_DataSourceLookupTableModal.js',
            modalClass: 'DataSourceLookupTableModal'
        });

        var getDateFilter = function (element) {
            if (element.data("DateTimePicker").date() == null) {
                return null;
            }
            return element.data("DateTimePicker").date().format("YYYY-MM-DDT00:00:00Z");
        }

        this.init = function (modalManager) {
            _modalManager = modalManager;

            var modal = _modalManager.getModal();
            //modal.find('.numberic').number(true, 0);
            modal.find('.date-picker').datetimepicker({
                locale: abp.localization.currentLanguage.name,
                format: 'L'
            });
            modal.find('.date-picker').each(function () {
                if ($(this).val() == "01/01/0001") {
                    $(this).val('');
                    //$(this).data("DateTimePicker").date(new Date());
                }
            })

            _$customerDataInformationForm = _modalManager.getModal().find('form[name=CustomerDataInformationsForm]');
            _$customerDataInformationForm.validate();
        };
        bindStatus();
        // change status log
        var changeStatusLogDataTable = _$dataChangeStatusLogsTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _dataChangeStatusLogsService.getAll,
                inputFilter: function () {
                    return {
                        filter: $('#DataChangeStatusLogsTableFilter').val(),
                        customerDataId: $('input[name=id]').val(),
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
                //{
                //    width: 120,
                //    targets: 0,
                //    data: null,
                //    orderable: false,
                //    autoWidth: false,
                //    defaultContent: '',
                //    rowAction: {
                //        cssClass: 'btn btn-brand dropdown-toggle',
                //        text: '<i class="fa fa-cog"></i> ' + app.localize('Actions') + ' <span class="caret"></span>',
                //        items: [
                //            {
                //                text: app.localize('View'),
                //                action: function (data) {
                //                    _viewDataChangeStatusLogModal.open({ data: data.record });
                //                }
                //            },
                //            {
                //                text: app.localize('Edit'),
                //                visible: function () {
                //                    return _permissions.edit;
                //                },
                //                action: function (data) {
                //                    _createOrEditModal.open({ id: data.record.dataChangeStatusLog.id });
                //                }
                //            },
                //            {
                //                text: app.localize('Delete'),
                //                visible: function () {
                //                    return _permissions.delete;
                //                },
                //                action: function (data) {
                //                    deleteDataChangeStatusLog(data.record.dataChangeStatusLog);
                //                }
                //            }
                //        ]
                //    }
                //},
                {
                    targets: 0,
                    data: "dataChangeStatusLog.changeTime",
                    render: function (changeTime) {
                        if (changeTime) {
                            return moment(changeTime).format('L');
                        }
                        return "";
                    }
                    

                },
                {
                    targets: 1,
                    data: "dataChangeStatusLog.lastStatusName"

                },
                {
                    targets: 2,
                    data: "dataChangeStatusLog.newStatusName"
                    
                },
                //{
                //    targets: 3,
                //    data: "dataChangeStatusLog.phoneConfirmed",
                //    render: function (phoneConfirmed) {
                //        if (phoneConfirmed) {
                //            return '<div class="text-center"><i class="fa fa-check-circle m--font-success" title="True"></i></div>';
                //        }
                //        return '<div class="text-center"><i class="fa fa-times-circle" title="False"></i></div>';
                //    }

                //},
                //{
                //    targets: 4,
                //    data: "dataChangeStatusLog.communicationConfirmed",
                //    render: function (communicationConfirmed) {
                //        if (communicationConfirmed) {
                //            return '<div class="text-center"><i class="fa fa-check-circle m--font-success" title="True"></i></div>';
                //        }
                //        return '<div class="text-center"><i class="fa fa-times-circle" title="False"></i></div>';
                //    }
                //},
                {
                    targets: 3,
                    data: "dataChangeStatusLog.isEndProcess",
                    render: function (isEndProcess) {
                        if (isEndProcess) {
                            return '<div class="text-center"><i class="fa fa-check-circle m--font-success" title="True"></i></div>';
                        }
                        return '<div class="text-center"><i class="fa fa-times-circle" title="False"></i></div>';
                    }
                    
                },
                {
                    targets: 4,
                    data: "dataChangeStatusLog.schedule",
                    render: function (schedule) {
                        
                        if (schedule) {
                            return moment(schedule).format('L');
                        }
                        return "";
                    }
                    

                },
                {
                    targets: 5,
                    data: "dataChangeStatusLog.reasonString"
                    

                },
                {
                    targets: 6,
                    data: "dataChangeStatusLog.note"


                }
                
            ]
        });


        function bindStatus() {
            
            if ($('input[name=id]').val() == "" || $('input[name=id]').val()==undefined) {
                return;
            }
            _commonService.getStatusesInFlow(parseInt($('input[name=statusId]').val())).done(function (data) {
                var html = "";
                $.each(data, function (index, value) {
                    
                    html += "<button type='button' class='btn btn-success change-status-btn' needAdditionalData='" + value.needAdditionalData + "' value='" + value.statusId + "'>" + value.status + "</button>"
                })
                $('.status-bar').html(html);
                $('.change-status-btn').click(function () {
                    
                    var statusId = $(this).attr("value");
                    var needAdditionalData = $(this).attr("needAdditionalData");
                    if (needAdditionalData == "true") {
                        _changeStatusWithAdditionalDataModal.open({ id: $('input[name=id]').val(), toStatusId: statusId });
                    }
                    else {
                        _customerDatasService.changeDataStatus({
                            dataId: $('input[name=id]').val(),
                            statusId: statusId,
                        }).done(function () {
                            abp.notify.success(app.localize('ChangeStatusSuccessfully'));
                        })
                    }
                })
            })
        }

        function getDataChangeStatusLogs() {
            changeStatusLogDataTable.ajax.reload();
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

        //$('#ShowAdvancedFiltersForChangeStatusLogSpan').click(function () {
        //    $('#ShowAdvancedFiltersForChangeStatusLogSpan').hide();
        //    $('#HideAdvancedFiltersForChangeStatusLogSpan').show();
        //    $('#AdvacedAuditFiltersForChangeStatusLogArea').slideDown();
        //});

        //$('#HideAdvancedFiltersForChangeStatusLogSpan').click(function () {
        //    $('#HideAdvancedFiltersForChangeStatusLogSpan').hide();
        //    $('#ShowAdvancedFiltersForChangeStatusLogSpan').show();
        //    $('#AdvacedAuditFiltersForChangeStatusLogArea').slideUp();
        //});

        // assign Data log
        var assignDataTable = _$assignDataLogsTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _assignDataLogsService.getAll,
                inputFilter: function () {
                    return {
                        //isRecalledFilter: $('#IsRecalledFilterId').val(),
                        customerDataId: $('input[name=id]').val()
                        //noteFilter: $('#NoteFilterId').val(),
                        //minRecallReasonIdFilter: $('#MinRecallReasonIdFilterId').val(),
                        //maxRecallReasonIdFilter: $('#MaxRecallReasonIdFilterId').val(),
                        //recalledByFilter: $('#RecalledByFilterId').val(),
                        //recalledByEmployeeNameFilter: $('#RecalledByEmployeeNameFilterId').val(),
                        //recallReasonDescriptionFilter: $('#RecallReasonDescriptionFilterId').val(),
                        //customerDataNameFilter: $('#CustomerDataNameFilterId').val(),
                        //organizationUnitDisplayNameFilter: $('#OrganizationUnitDisplayNameFilterId').val(),
                        //userNameFilter: $('#UserNameFilterId').val(),
                        //dataProcessStatusDisplayNameFilter: $('#DataProcessStatusDisplayNameFilterId').val(),
                        //userName2Filter: $('#UserName2FilterId').val(),
                        //assigneBulkleDataLogTenantIdFilter: $('#AssigneBulkleDataLogTenantIdFilterId').val()
                    };
                }
            },
            columnDefs: [
                //{
                //    width: 120,
                //    targets: 0,
                //    data: null,
                //    orderable: false,
                //    autoWidth: false,
                //    defaultContent: '',
                //    rowAction: {
                //        cssClass: 'btn btn-brand dropdown-toggle',
                //        text: '<i class="fa fa-cog"></i> ' + app.localize('Actions') + ' <span class="caret"></span>',
                //        items: [
                //            {
                //                text: app.localize('Edit'),
                //                visible: function () {
                //                    return _assignDataPermissions.edit;
                //                },
                //                action: function (data) {
                //                    _createOrEditModal.open({ id: data.record.assignDataLog.id });
                //                }
                //            },
                //            {
                //                text: app.localize('Delete'),
                //                visible: function () {
                //                    return _assignDataPermissions.delete;
                //                },
                //                action: function (data) {
                //                    deleteAssignDataLog(data.record.assignDataLog);
                //                }
                //            }]
                //    }
                //},
                {
                    targets: 0,
                    data: "assignDataLog.date",
                    render: function (date) {
                        if (date) {
                            return moment(date).format('L');
                        }
                        return "";
                    }

                },
                {
                    targets: 1,
                    data: "organizationUnitDisplayName"

                },
                
                {
                    targets: 2,
                    data: "userName"
                },
                {
                    targets: 3,
                    data: "dataProcessStatusDisplayName"
                    
                },
                {
                    targets: 4,
                    data: "assignDataLog.note"
                    
                },
                {
                    targets: 5,
                    data: "assignDataLog.isRecalled",
                    render: function (isRecalled) {
                        if (isRecalled) {
                            return '<div class="text-center"><i class="fa fa-check-circle m--font-success" title="True"></i></div>';
                        }
                        return '<div class="text-center"><i class="fa fa-times-circle" title="False"></i></div>';
                    }
                    
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
                }
            ]
        });


        function getAssignDataLogs() {
            assignDataTable.ajax.reload();
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

        //// phone log
        //var phoneLogDataTable = _$phoneLogsTable.DataTable({
        //    paging: true,
        //    serverSide: true,
        //    processing: true,
        //    listAction: {
        //        ajaxFunction: _phoneLogsService.getAll,
        //        inputFilter: function () {
        //            return {
        //                fromPhoneNumberFilter: $('#FromPhoneNumberFilterId').val(),
        //                minCallTimeFilter: getDateFilter($('#MinCallTimeFilterId')),
        //                maxCallTimeFilter: getDateFilter($('#MaxCallTimeFilterId'))
        //            };
        //        }
        //    },
        //    columnDefs: [
        //        {
        //            width: 120,
        //            targets: 0,
        //            data: null,
        //            orderable: false,
        //            autoWidth: false,
        //            defaultContent: '',
        //            rowAction: {
        //                cssClass: 'btn btn-brand dropdown-toggle',
        //                text: '<i class="fa fa-cog"></i> ' + app.localize('Actions') + ' <span class="caret"></span>',
        //                items: [
        //                    {
        //                        text: app.localize('View'),
        //                        action: function (data) {
        //                            _viewPhoneLogModal.open({ data: data.record });
        //                        }
        //                    },
        //                    {
        //                        text: app.localize('Edit'),
        //                        visible: function () {
        //                            return _permissions.edit;
        //                        },
        //                        action: function (data) {
        //                            _createOrEditModal.open({ id: data.record.phoneLog.id });
        //                        }
        //                    },
        //                    {
        //                        text: app.localize('Delete'),
        //                        visible: function () {
        //                            return _permissions.delete;
        //                        },
        //                        action: function (data) {
        //                            deletePhoneLog(data.record.phoneLog);
        //                        }
        //                    }]
        //            }
        //        },
        //        {
        //            targets: 1,
        //            data: "phoneLog.fromPhoneNumber"
        //        },
        //        {
        //            targets: 2,
        //            data: "phoneLog.toPhoneNumber"
        //        },
        //        {
        //            targets: 3,
        //            data: "phoneLog.callTime",
        //            render: function (callTime) {
        //                if (callTime) {
        //                    return moment(callTime).format('L');
        //                }
        //                return "";
        //            }

        //        },
        //        {
        //            targets: 4,
        //            data: "phoneLog.originalDurationValue"
        //        },
        //        {
        //            targets: 5,
        //            data: "phoneLog.durationBySecond"
        //        },
        //        {
        //            targets: 6,
        //            data: "userName"
        //        }
        //    ]
        //});


        function getPhoneLogs() {
            phoneLogDataTable.ajax.reload();
        }

        function deletePhoneLog(phoneLog) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _phoneLogsService.delete({
                            id: phoneLog.id
                        }).done(function () {
                            getPhoneLogs(true);
                            abp.notify.success(app.localize('SuccessfullyDeleted'));
                        });
                    }
                }
            );
        }

        $('#OpenDM_QuocGiaLookupTableButton').click(function () {

            var customerData = _$customerDataInformationForm.serializeFormToObject();

            _dM_QuocGiaLookupTableModal.open({ id: customerData.nationId, displayName: customerData.dM_QuocGiaTenNuoc }, function (data) {
                _$customerDataInformationForm.find('input[name=dM_QuocGiaTenNuoc]').val(data.displayName);
                _$customerDataInformationForm.find('input[name=nationId]').val(data.id);
            });
        });

        $('#ClearDM_QuocGiaTenNuocButton').click(function () {
            _$customerDataInformationForm.find('input[name=dM_QuocGiaTenNuoc]').val('');
            _$customerDataInformationForm.find('input[name=nationId]').val('');
        });

        $('#OpenDM_TinhThanhLookupTableButton').click(function () {

            var customerData = _$customerDataInformationForm.serializeFormToObject();

            _dM_TinhThanhLookupTableModal.open({ id: customerData.provinceId, displayName: customerData.dM_TinhThanhTenTinhThanh }, function (data) {
                _$customerDataInformationForm.find('input[name=dM_TinhThanhTenTinhThanh]').val(data.displayName);
                _$customerDataInformationForm.find('input[name=provinceId]').val(data.id);
            });
        });

        $('#ClearDM_TinhThanhTenTinhThanhButton').click(function () {
            _$customerDataInformationForm.find('input[name=dM_TinhThanhTenTinhThanh]').val('');
            _$customerDataInformationForm.find('input[name=provinceId]').val('');
        });

        $('#OpenDataSourceLookupTableButton').click(function () {

            var importData = _$customerDataInformationForm.serializeFormToObject();

            _dataSourceLookupTableModal.open({ id: importData.dataSourceId, displayName: importData.dataSourceDisplayName }, function (data) {
                _$customerDataInformationForm.find('input[name=dataSourceDisplayName]').val(data.displayName);
                _$customerDataInformationForm.find('input[name=dataSourceId]').val(data.id);
            });
        });

        $('#ClearDataSourceDisplayNameButton').click(function () {
            _$customerDataInformationForm.find('input[name=dataSourceDisplayName]').val('');
            _$customerDataInformationForm.find('input[name=dataSourceId]').val('');
        });

        $('#OpenDM_QuanHuyenLookupTableButton').click(function () {

            var customerData = _$customerDataInformationForm.serializeFormToObject();

            _dM_QuanHuyenLookupTableModal.open({ id: customerData.districtId, displayName: customerData.dM_QuanHuyenTenQuanHuyen }, function (data) {
                _$customerDataInformationForm.find('input[name=dM_QuanHuyenTenQuanHuyen]').val(data.displayName);
                _$customerDataInformationForm.find('input[name=districtId]').val(data.id);
            });
        });

        $('#ClearDM_QuanHuyenTenQuanHuyenButton').click(function () {
            _$customerDataInformationForm.find('input[name=dM_QuanHuyenTenQuanHuyen]').val('');
            _$customerDataInformationForm.find('input[name=districtId]').val('');
        });

        $('#OpenDM_NgheNghiepLookupTableButton').click(function () {

            var customerData = _$customerDataInformationForm.serializeFormToObject();

            _dM_NgheNghiepLookupTableModal.open({ id: customerData.careerId, displayName: customerData.dM_NgheNghiepDisplayName }, function (data) {
                _$customerDataInformationForm.find('input[name=dM_NgheNghiepDisplayName]').val(data.displayName);
                _$customerDataInformationForm.find('input[name=careerId]').val(data.id);
            });
        });

        $('#ClearDM_NgheNghiepDisplayNameButton').click(function () {
            _$customerDataInformationForm.find('input[name=dM_NgheNghiepDisplayName]').val('');
            _$customerDataInformationForm.find('input[name=careerId]').val('');
        });

        $('#OpenOrganizationUnitLookupTableButton').click(function () {

            var customerData = _$customerDataInformationForm.serializeFormToObject();

            _organizationUnitLookupTableModal.open({ id: customerData.targetOrganizationUnitId, displayName: customerData.organizationUnitDisplayName }, function (data) {
                _$customerDataInformationForm.find('input[name=organizationUnitDisplayName]').val(data.displayName);
                _$customerDataInformationForm.find('input[name=targetOrganizationUnitId]').val(data.id);
            });
        });

        $('#ClearOrganizationUnitDisplayNameButton').click(function () {
            _$customerDataInformationForm.find('input[name=organizationUnitDisplayName]').val('');
            _$customerDataInformationForm.find('input[name=targetOrganizationUnitId]').val('');
        });

        $('#OpenDM_HangHoaLookupTableButton').click(function () {

            var customerData = _$customerDataInformationForm.serializeFormToObject();

            _dM_HangHoaLookupTableModal.open({ id: customerData.targetServiceId, displayName: customerData.dM_HangHoaTenHangHoa }, function (data) {
                _$customerDataInformationForm.find('input[name=dM_HangHoaTenHangHoa]').val(data.displayName);
                _$customerDataInformationForm.find('input[name=targetServiceId]').val(data.id);
            });
        });

        $('#ClearDM_HangHoaTenHangHoaButton').click(function () {
            _$customerDataInformationForm.find('input[name=dM_HangHoaTenHangHoa]').val('');
            _$customerDataInformationForm.find('input[name=targetServiceId]').val('');
        });

        $('#OpenImportDataLookupTableButton').click(function () {

            var customerData = _$customerDataInformationForm.serializeFormToObject();

            _importDataLookupTableModal.open({ id: customerData.importDataId, displayName: customerData.importDataInputFile }, function (data) {
                _$customerDataInformationForm.find('input[name=importDataInputFile]').val(data.displayName);
                _$customerDataInformationForm.find('input[name=importDataId]').val(data.id);
            });
        });

        $('#ClearImportDataInputFileButton').click(function () {
            _$customerDataInformationForm.find('input[name=importDataInputFile]').val('');
            _$customerDataInformationForm.find('input[name=importDataId]').val('');
        });

        $('#OpenDM_DoiTuongLookupTableButton').click(function () {

            var customerData = _$customerDataInformationForm.serializeFormToObject();

            _dM_DoiTuongLookupTableModal.open({ id: customerData.customerId, displayName: customerData.dM_DoiTuongTenDoiTuong }, function (data) {
                _$customerDataInformationForm.find('input[name=dM_DoiTuongTenDoiTuong]').val(data.displayName);
                _$customerDataInformationForm.find('input[name=customerId]').val(data.id);
            });
        });

        $('#ClearDM_DoiTuongTenDoiTuongButton').click(function () {
            _$customerDataInformationForm.find('input[name=dM_DoiTuongTenDoiTuong]').val('');
            _$customerDataInformationForm.find('input[name=customerId]').val('');
        });



        this.save = function () {
            if (!_$customerDataInformationForm.valid()) {
                return;
            }

            var customerData = _$customerDataInformationForm.serializeFormToObject();
            _modalManager.setBusy(true);
            _customerDatasService.createOrEdit(
                customerData
            ).done(function () {
                abp.notify.info(app.localize('SavedSuccessfully'));
                _modalManager.close();
                abp.event.trigger('app.createOrEditCustomerDataModalSaved');
            }).always(function () {
                _modalManager.setBusy(false);
            });
        };
    };
})(jQuery);