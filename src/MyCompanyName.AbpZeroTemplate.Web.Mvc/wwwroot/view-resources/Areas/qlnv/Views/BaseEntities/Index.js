(function() {
    $(function() {
        var _$baseEntitiesTable = $('#BaseEntitiesTable');
        var _baseEntitiesService = abp.services.app.baseEntities;
        var _entityTypeFullName = 'MyCompanyName.AbpZeroTemplate.BaseNamespace.BaseEntity';
        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });
        var _permissions = {
            create: abp.auth.hasPermission('Pages.BaseEntities.Create'),
            edit: abp.auth.hasPermission('Pages.BaseEntities.Edit'),
            'delete': abp.auth.hasPermission('Pages.BaseEntities.Delete')
        };
        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'qlnv/BaseEntities/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/qlnv/Views/BaseEntities/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditBaseEntityModal'
        });
        var _viewBaseEntityModal = new app.ModalManager({
            viewUrl: abp.appPath + 'qlnv/BaseEntities/ViewbaseEntityModal',
            modalClass: 'ViewBaseEntityModal'
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
        var dataTable = _$baseEntitiesTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _baseEntitiesService.getAll,
                inputFilter: function() {
                    return {
                        filter: $('#BaseEntitiesTableFilter').val(),
                        baseProp1Filter: $('#BaseProp1FilterId').val(),
                        organizationUnitDisplayNameFilter: $('#OrganizationUnitDisplayNameFilterId').val()
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
                                    _viewBaseEntityModal.open({
                                        id: data.record.baseEntity.id
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
                                        id: data.record.baseEntity.id
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
                                        entityId: data.record.baseEntity.id
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
                                    deleteBaseEntity(data.record.baseEntity);
                                }
                            }
                        ]
                    }
                }, {
                    className: 'details-control',
                    targets: 2,
                    orderable: false,
                    autoWidth: false,
                    visible: true,
                    render: function() {
                        return `<button class="btn btn-primary btn-xs Edit_Child_BaseEntityId">${app.localize("EditChild")}</button>`;
                    }
                },
                {
                    targets: 3,
                    data: "baseEntity.baseProp1",
                    name: "baseProp1"
                },
                {
                    targets: 4,
                    data: "organizationUnitDisplayName",
                    name: "organizationUnitFk.displayName"
                }
            ]
        });

        function getBaseEntities() {
            dataTable.ajax.reload();
        }

        function deleteBaseEntity(baseEntity) {
            abp.message.confirm(
                '',
                app.localize('AreYouSure'),
                function(isConfirmed) {
                    if (isConfirmed) {
                        _baseEntitiesService.delete({
                            id: baseEntity.id
                        }).done(function() {
                            getBaseEntities(true);
                            abp.notify.success(app.localize('SuccessfullyDeleted'));
                        });
                    }
                }
            );
        }
        $('#ShowAdvancedFiltersSpan').click(function() {
            $('#ShowAdvancedFiltersSpan').hide();
            $('#HideAdvancedFiltersSpan').show();
            $('#AdvacedAuditFiltersArea').slideDown();
        });
        $('#HideAdvancedFiltersSpan').click(function() {
            $('#HideAdvancedFiltersSpan').hide();
            $('#ShowAdvancedFiltersSpan').show();
            $('#AdvacedAuditFiltersArea').slideUp();
        });
        $('#CreateNewBaseEntityButton').click(function() {
            _createOrEditModal.open();
        });
        $('#ExportToExcelButton').click(function() {
            _baseEntitiesService
                .getBaseEntitiesToExcel({
                    filter: $('#BaseEntitiesTableFilter').val(),
                    baseProp1Filter: $('#BaseProp1FilterId').val(),
                    organizationUnitDisplayNameFilter: $('#OrganizationUnitDisplayNameFilterId').val()
                })
                .done(function(result) {
                    app.downloadTempFile(result);
                });
        });
        abp.event.on('app.createOrEditBaseEntityModalSaved', function() {
            getBaseEntities();
        });
        $('#GetBaseEntitiesButton').click(function(e) {
            e.preventDefault();
            getBaseEntities();
        });
        $(document).keypress(function(e) {
            if (e.which === 13) {
                getBaseEntities();
            }
        });
        var currentOpenedDetailRow;

        function openDetailRow(e, url) {
            var tr = $(e).closest('tr');
            var row = dataTable.row(tr);
            if (row.child.isShown()) {
                row.child.hide();
                tr.removeClass('shown');
                currentOpenedDetailRow = null;
            } else {
                if (currentOpenedDetailRow)
                    currentOpenedDetailRow.child.hide();
                $.get(url).then((data) => {
                    row.child(data).show();
                    tr.addClass('shown');
                    currentOpenedDetailRow = row;
                });
            }
        }
        _$baseEntitiesTable.on('click', '.Edit_Child_BaseEntityId', function() {
            var tr = $(this).closest('tr');
            var row = dataTable.row(tr);
            openDetailRow(this, "/qlnv/MasterDetailChild_BaseEntity_Childs?BaseEntityId=" + row.data().baseEntity.id);
        });
    });
})();