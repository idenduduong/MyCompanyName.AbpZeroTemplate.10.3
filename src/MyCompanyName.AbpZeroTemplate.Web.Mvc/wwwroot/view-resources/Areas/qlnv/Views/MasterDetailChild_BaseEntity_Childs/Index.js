(function() {
    $(function() {
        var _$childsTable = $('#MasterDetailChild_BaseEntity_ChildsTable');
        var _childsService = abp.services.app.childs;
        var _entityTypeFullName = 'MyCompanyName.AbpZeroTemplate.ChildNamespace1.Child';
        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });
        var _permissions = {
            create: abp.auth.hasPermission('Pages.Childs.Create'),
            edit: abp.auth.hasPermission('Pages.Childs.Edit'),
            'delete': abp.auth.hasPermission('Pages.Childs.Delete')
        };
        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'qlnv/MasterDetailChild_BaseEntity_Childs/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/qlnv/Views/MasterDetailChild_BaseEntity_Childs/_CreateOrEditModal.js',
            modalClass: 'MasterDetailChild_BaseEntity_CreateOrEditChildModal'
        });
        var _viewChildModal = new app.ModalManager({
            viewUrl: abp.appPath + 'qlnv/MasterDetailChild_BaseEntity_Childs/ViewchildModal',
            modalClass: 'MasterDetailChild_BaseEntity_ViewChildModal'
        });
        var _entityTypeHistoryModal = app.modals.EntityTypeHistoryModal.create();

        function entityHistoryIsEnabled() {
            return abp.auth.hasPermission('Pages.Administration.AuditLogs') &&
                abp.custom.EntityHistory &&
                abp.custom.EntityHistory.IsEnabled &&
                _.filter(abp.custom.EntityHistory.EnabledEntities, entityType => entityType === _entityTypeFullName).length === 1;
        }
        var getDateFilter = function(element) {
            if (element.data("DateTimePicker").date() == null) {
                return null;
            }
            return element.data("DateTimePicker").date().format("YYYY-MM-DDT00:00:00Z");
        }
        var getMaxDateFilter = function(element) {
            if (element.data("DateTimePicker").date() == null) {
                return null;
            }
            return element.data("DateTimePicker").date().format("YYYY-MM-DDT23:59:59Z");
        }
        var dataTable = _$childsTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _childsService.getAll,
                inputFilter: function() {
                    return {
                        filter: $('#MasterDetailChild_BaseEntity_ChildsTableFilter').val(),
                        childProp1Filter: $('#MasterDetailChild_BaseEntity_ChildProp1FilterId').val(),
                        userNameFilter: $('#MasterDetailChild_BaseEntity_UserNameFilterId').val(),
                        baseEntityIdFilter: $('#MasterDetailChild_BaseEntity_ChildsId').val()
                    };
                }
            },
            columnDefs: [{
                    className: 'control responsive',
                    orderable: false,
                    render: function() {
                        return '';
                    },
                    targets: 0
                },
                {
                    width: 120,
                    targets: 1,
                    data: null,
                    orderable: false,
                    autoWidth: false,
                    defaultContent: '',
                    rowAction: {
                        cssClass: 'btn btn-brand dropdown-toggle',
                        text: '<i class="fa fa-cog"></i> ' + app.localize('Actions') + ' <span class="caret"></span>',
                        items: [{
                                text: app.localize('View'),
                                iconStyle: 'far fa-eye mr-2',
                                action: function(data) {
                                    _viewChildModal.open({
                                        id: data.record.child.id
                                    });
                                }
                            },
                            {
                                text: app.localize('Edit'),
                                iconStyle: 'far fa-edit mr-2',
                                visible: function() {
                                    return _permissions.edit;
                                },
                                action: function(data) {
                                    _createOrEditModal.open({
                                        id: data.record.child.id
                                    });
                                }
                            },
                            {
                                text: app.localize('History'),
                                iconStyle: 'fas fa-history mr-2',
                                visible: function() {
                                    return entityHistoryIsEnabled();
                                },
                                action: function(data) {
                                    _entityTypeHistoryModal.open({
                                        entityTypeFullName: _entityTypeFullName,
                                        entityId: data.record.child.id
                                    });
                                }
                            },
                            {
                                text: app.localize('Delete'),
                                iconStyle: 'far fa-trash-alt mr-2',
                                visible: function() {
                                    return _permissions.delete;
                                },
                                action: function(data) {
                                    deleteChild(data.record.child);
                                }
                            }
                        ]
                    }
                },
                {
                    targets: 2,
                    data: "child.childProp1",
                    name: "childProp1"
                },
                {
                    targets: 3,
                    data: "userName",
                    name: "userFk.name"
                }
            ]
        });

        function getChilds() {
            dataTable.ajax.reload();
        }

        function deleteChild(child) {
            abp.message.confirm(
                '',
                app.localize('AreYouSure'),
                function(isConfirmed) {
                    if (isConfirmed) {
                        _childsService.delete({
                            id: child.id
                        }).done(function() {
                            getChilds(true);
                            abp.notify.success(app.localize('SuccessfullyDeleted'));
                        });
                    }
                }
            );
        }
        $('#MasterDetailChild_BaseEntity_ShowAdvancedFiltersSpan').click(function() {
            $('#MasterDetailChild_BaseEntity_ShowAdvancedFiltersSpan').hide();
            $('#MasterDetailChild_BaseEntity_HideAdvancedFiltersSpan').show();
            $('#MasterDetailChild_BaseEntity_AdvacedAuditFiltersArea').slideDown();
        });
        $('#MasterDetailChild_BaseEntity_HideAdvancedFiltersSpan').click(function() {
            $('#MasterDetailChild_BaseEntity_HideAdvancedFiltersSpan').hide();
            $('#MasterDetailChild_BaseEntity_ShowAdvancedFiltersSpan').show();
            $('#MasterDetailChild_BaseEntity_AdvacedAuditFiltersArea').slideUp();
        });
        $('#CreateNewChildButton').click(function() {
            _createOrEditModal.open();
        });
        $('#ExportToExcelButton').click(function() {
            _childsService
                .getChildsToExcel({
                    filter: $('#ChildsTableFilter').val(),
                    childProp1Filter: $('#MasterDetailChild_BaseEntity_ChildProp1FilterId').val(),
                    userNameFilter: $('#MasterDetailChild_BaseEntity_UserNameFilterId').val()
                })
                .done(function(result) {
                    app.downloadTempFile(result);
                });
        });
        abp.event.on('app.createOrEditChildModalSaved', function() {
            getChilds();
        });
        $('#GetChildsButton').click(function(e) {
            e.preventDefault();
            getChilds();
        });
        $(document).keypress(function(e) {
            if (e.which === 13) {
                getChilds();
            }
        });
    });
})();