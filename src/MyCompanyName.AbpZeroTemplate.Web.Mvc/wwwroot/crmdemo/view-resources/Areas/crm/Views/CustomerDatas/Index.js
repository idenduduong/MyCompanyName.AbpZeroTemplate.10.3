(function () {
    $(function () {
        var _$customerDatasTable = $('#CustomerDatasTable');
        var _customerDatasService = abp.services.app.customerDatas;

        var selectedRows = [],
            unselectedRows = [];

        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.CustomerDatas.Create'),
            edit: abp.auth.hasPermission('Pages.CustomerDatas.Edit'),
            'delete': abp.auth.hasPermission('Pages.CustomerDatas.Delete'),
            addToCustomer: abp.auth.hasPermission('Pages.CustomerDatas.AddDataToCustomer'),
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/CustomerDatas/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/CustomerDatas/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditCustomerDataModal',
            width: "80%"
        });

        var _assignDataByAreaModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/CustomerDatas/AssignDataByAreaModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/CustomerDatas/_AssignDataByAreaModal.js',
            modalClass: 'AssignDataByAreaModal',
            width: "60%"
        });
        var _assignDataByOrganizationModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/CustomerDatas/AssignDataByOrganizationModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/_Bundles/_AssignDataByOrganization.js',
            modalClass: 'AssignDataByOrganizationModal',
            width: "60%"
        });
        var _assignDataToEmployeeModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/CustomerDatas/AssignDataToEmployeeModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/CustomerDatas/_AssignDataToEmployeeModal.js',
            modalClass: 'AssignDataToEmployeeModal',
            width: "60%"
        });

        var _importCustomerDataModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/CustomerDatas/ImportCustomerDataModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/CustomerDatas/_ImportCustomerDataModal.js',
            modalClass: 'ImportCustomerDataModal',
            width: "60%"
        });
        var _importDataLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/CustomerDatas/ImportDataLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/CustomerDatas/_ImportDataLookupTableModal.js',
            modalClass: 'ImportDataLookupTableModal'
        });

        var _importPhoneLogModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/PhoneLogs/ImportPhoneLogModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/PhoneLogs/_ImportPhoneLogModal.js',
            modalClass: 'ImportPhoneLogModal',
            width: "60%"
        });

        var _viewCustomerDataModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/CustomerDatas/ViewcustomerDataModal',
            modalClass: 'ViewCustomerDataModal'
        });

        var getDateFilter = function (element) {
            if (element.data("DateTimePicker").date() === null) {
                return null;
            }
            return element.data("DateTimePicker").date().format("YYYY-MM-DDT00:00:00Z");
        };

        var dataTable = _$customerDatasTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            responsive: true,
            'select': {
                'style': 'multi'
            },
            listAction: {
                ajaxFunction: _customerDatasService.getAll,
                inputFilter: function () {
                    debugger;
                    return {
                        filter: $('#CustomerDatasTableFilter').val(),
                        dataType: $('#DataType').val(),
                        authorizedOrganizationFilter: $('#AuthorizedOrganizationFilter').val(),
                        authorizedEmployeeFilter: $('#AuthorizedEmployeeFilter').val(),
                        dataCreatedMethod: $('#DataCreatedMethod').val(),
                        primaryPhoneFilter: $('#PrimaryPhoneFilter').val(),
                        nameFilter: $('#NameFilter').val(),
                        createdToDayFilter: $('#CreatedToDayFilter').val(),
                        createdFromDayFilter: $('#CreatedFromDayFilter').val(),
                        scheduleToDateFilter: $('#ScheduleToDateFilter').val(),
                        scheduleFromDateFilter: $('#ScheduleFromDateFilter').val(),
                        statusFilter: $('[name=DataStatusFilter]').val(),
                        dataSourceFilter: $('[name=DataSourceFilter]').val(),
                        inRepository: $('[name=InRepository]').val() ? $('[name=InRepository]').val() === 1 ? true : false : null,
                        belongsToSeller: $('[name=BelongsToSeller]').val() ? $('[name=BelongsToSeller]').val() === 1 ? true : false : null,
                        isRecalled: $('[name=IsRecalled]').prop('checked'),
                        recallType: $('[name=RecallType]').val()
                    };
                }
            },
            columnDefs: [
                {
                    targets: 0,
                    data: 'customerData.id',
                    checkboxes : { selectRow: true }
                },
                {
                    targets: 1,
                    data: "order",
                },
                {
                    //width: ,
                    targets: 2,
                    data: null,
                    orderable: false,
                    defaultContent: '',
                    rowAction: [
                        {
                            visible: function () {
                                return _permissions.edit;
                            },
                            element: $('<button class="btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" title="' + app.localize('Update') + '"><i class="la la-edit"></i></button>')
                                .click(function () {
                                    var data = $(this).data();

                                    _createOrEditModal.open({ id: data.customerData.id });
                                })
                        },
                        {
                            visible: function () {
                                return _permissions.addToCustomer;
                            },
                            element: $('<button class="btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill m-checkbox--single" title="' + app.localize('AddToCustomer') + '"><i class="la la-play"></i></button>')
                                .click(function () {
                                    var data = $(this).data();
                                    _customerDatasService.addToCustomer({
                                        id: data.customerData.id
                                    }).done(function (data) {
                                        abp.notify.success(app.localize('AddCustomerSuccessfully'));
                                    })
                                })
                        }
                    ]
                },
                {
                    targets: 3,
                    data: "customerData.creationTime",
                    render: function (creationTime) {

                        if (creationTime) {
                            return moment(creationTime).format('L');
                        }
                        return "";
                    }
                },
                {
                    targets: 4,
                    data: "customerData.dataProcessStatus"
                },
                {
                    targets: 5,
                    data: "customerData.name"
                },
                {
                    targets: 6,
                    data: "customerData.primaryPhone"
                },

                {
                    targets: 7,
                    data: "customerData.currentSchedule",
                    render: function (currentSchedule) {
                        if (currentSchedule) {
                            return moment(currentSchedule).format('DD/MM/YYYY hh:mm');
                        }
                        return "";
                    }
                },
                {
                    targets: 8,
                    data: "customerData.note"

                },
                {
                    targets: 9,
                    data: "customerData.authorizedOrganization"

                },
                {
                    targets: 10,
                    data: "customerData.authorizedEmployee"

                },
                {
                    targets: 11,
                    data: "customerData.targetOrganizationName"


                },
                {
                    targets: 12,
                    data: "dM_HangHoaTenHangHoa"


                },
                {
                    targets: 13,
                    data: "customerData.address"
                },

                {
                    targets: 14,
                    data: "dM_TinhThanhTenTinhThanh"
                },
                {
                    targets: 15,
                    data: "dM_QuanHuyenTenQuanHuyen"
                },

            ],
            rowId: 'customerData.id',
        });

        $("[name=AuthorizedOrganizationFilter]").select2({
            width: "100%",
            allowClear: true,
            placeholder: "Chọn đơn vị",
        });
        $("[name=DataSourceFilter]").select2({
            width: "100%",
            allowClear: true,
            placeholder: "Chọn nguồn dữ liệu"
        });
        $("[name=DataCreatedMethod]").select2({
            width: "100%",
            placeholder: ""
        });
        $("[name=DataStatusFilter]").select2({
            width: "100%",
            allowClear: true,
            placeholder: "Chọn trạng thái",
        });
        $("#AuthorizedEmployeeFilter").select2({
            width: "100%",
            height: '34px',
            //tags: true,
            allowClear: true,
            placeholder: "Tìm kiếm đối tượng",
            ajax: {
                url: '/api/services/app/commonLookup/getAllSalesForLookupTableByOrganization',
                dataType: 'json',
                //delay: 1000,
                data: function (params) {

                    var organizationId = $("[name=AuthorizedOrganizationFilter]").select2("val");
                    var query = {
                        organizationId: organizationId,
                        filter: params.term,
                        skipCount: (params.page - 1 || 0) * 15,
                        maxResultCount: 15
                    }

                    // Query parameters will be ?search=[term]&type=public
                    return query;
                },
                processResults: function (data, params) {
                    params.page = params.page || 1;
                    var select2Data = $.map(data.result.items, function (val, i) {
                        return {
                            id: val.id,
                            text: val.maNhanVien + " - " + val.tenNhanVien
                        }
                    });

                    return {
                        results: select2Data,
                        pagination: {
                            more: (params.page * 15) < data.result.totalCount
                        }
                    };
                }
            },
            //createTag: function (params) {
            //    return {
            //        id: params.term,
            //        text: params.term,
            //        newOption: true
            //    }
            //},
            //templateResult: function (data) {
            //    var $result = $("<span></span>");

            //    $result.text(data.text);

            //    if (data.newOption) {
            //        $result.append(" <em>(new)</em>");
            //    }

            //    return $result;
            //}
        });


        function getCustomerDatas() {
            dataTable.ajax.reload();
        }

        function deleteCustomerData(customerData) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _customerDatasService.delete({
                            id: customerData.id
                        }).done(function () {
                            getCustomerDatas(true);
                            abp.notify.success(app.localize('SuccessfullyDeleted'));
                        });
                    }
                }
            );
        }

        $('#OpenImportDataLookupTableButton').click(function () {
            _importDataLookupTableModal.open({}, function (data) {

                $('input[name=ImportFilterName]').val(data.importCode);
                $('input[name=ImportDataId]').val(data.id);
            });
        })

        $('#CreateNewCustomerDataButton').click(function () {
            _createOrEditModal.open();
        });

        $('#ExportTemplateFileButton').click(function () {
            _customerDatasService
                .getImportDataTemplate()
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });
        $('#ImportDataButton').click(function () {
            _importCustomerDataModal.open();
        });

        $('#ImportPhoneLogButton').click(function () {
            _importPhoneLogModal.open();
        });

        $('#AssignDataByAreaButton').click(function () {
            _assignDataByAreaModal.open();
        });
        $('#AssignCustomerDatasToEmployeeButton').click(function () {
            _assignDataToEmployeeModal.open();
        });

        $('#AssignDataByOrganizationButton').click(function () {
            _assignDataByOrganizationModal.open();
        });

        // filter
        $('#IsManualData').on("change", function () {

            var isChecked = $(this).prop("checked");
            if (isChecked) {
                $('#OpenImportDataLookupTableButton').attr("disabled", "disabled");
            }
            else {
                $('#OpenImportDataLookupTableButton').removeAttr("disabled");
            }
            getCustomerDatas();

        });

        $('#ImportFilter').on("change", function () {
            getCustomerDatas();
        });

        $('#AuthorizedOrganizationFilter').on("change", function () {
            getCustomerDatas();
        });

        $('#DataTypeFilter').on("change", function () {
            // todo
            // on change this -> change list ImportFilter
            getCustomerDatas();
        });

        $('#ExportToExcelButton').click(function () {
            _customerDatasService
                .getCustomerDatasToExcel({
                    filter: $('#CustomerDatasTableFilter').val(),
                    dataType: $('#DataTypeFilter').val(),
                    authorizedOrganizationFilter: $('#AuthorizedOrganizationFilter').val(),
                    authorizedEmployeeFilter: $('#AuthorizedEmployeeFilter').val(),
                    dataCreatedMethod: $('#DataCreatedMethod').val(),
                    primaryPhoneFilter: $('#PrimaryPhoneFilter').val(),
                    nameFilter: $('#NameFilter').val(),
                    createdToDayFilter: $('#CreatedToDayFilter').val(),
                    createdFromDayFilter: $('#CreatedFromDayFilter').val(),
                    statusFilter: $('[name=DataStatusFilter]').val(),
                    dataSourceFilter: $('[name=DataSourceFilter]').val(),
                })
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditCustomerDataModalSaved', function () {
            getCustomerDatas();
        });
        abp.event.on('app.customerDataImported', function () {
            getCustomerDatas();
        });

        $('#GetCustomerDatasButton').click(function (e) {
            e.preventDefault();
            getCustomerDatas();
        });

        $(document).keypress(function (e) {
            if (e.which === 13) {
                getCustomerDatas();
            }
        });

    });
})();