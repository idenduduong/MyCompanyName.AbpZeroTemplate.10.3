﻿(function() {
    $(function() {
        var _$dM_NhomDoiTuongsTable = $('#DM_NhomDoiTuongsTable');
        var _dM_NhomDoiTuongsService = abp.services.app.dM_NhomDoiTuongs;
        var _entityTypeFullName = 'MyCompanyName.AbpZeroTemplate.MyCompanyName.AbpZeroTemplate.DM_NhomDoiTuongs.DM_NhomDoiTuongs';
        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });
        var _permissions = {
            create: abp.auth.hasPermission('Pages.DM_NhomDoiTuongs.Create'),
            edit: abp.auth.hasPermission('Pages.DM_NhomDoiTuongs.Edit'),
            'delete': abp.auth.hasPermission('Pages.DM_NhomDoiTuongs.Delete')
        };
        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'qlnv/DM_NhomDoiTuongs/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/qlnv/Views/DM_NhomDoiTuongs/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditDM_NhomDoiTuongsModal'
        });
        var _viewDM_NhomDoiTuongsModal = new app.ModalManager({
            viewUrl: abp.appPath + 'qlnv/DM_NhomDoiTuongs/ViewdM_NhomDoiTuongsModal',
            modalClass: 'ViewDM_NhomDoiTuongsModal'
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
        var dataTable = _$dM_NhomDoiTuongsTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _dM_NhomDoiTuongsService.getAll,
                inputFilter: function() {
                    return {
                        filter: $('#DM_NhomDoiTuongsTableFilter').val(),
                        minLoaiDoiTuongFilter: $('#MinLoaiDoiTuongFilterId').val(),
                        maxLoaiDoiTuongFilter: $('#MaxLoaiDoiTuongFilterId').val(),
                        maNhomFilter: $('#MaNhomFilterId').val(),
                        tenNhomFilter: $('#TenNhomFilterId').val(),
                        minMucDiemFilter: $('#MinMucDiemFilterId').val(),
                        maxMucDiemFilter: $('#MaxMucDiemFilterId').val(),
                        ghiChuFilter: $('#GhiChuFilterId').val(),
                        userTaoFilter: $('#UserTaoFilterId').val(),
                        minNgayTaoFilter: getDateFilter($('#MinNgayTaoFilterId')),
                        maxNgayTaoFilter: getMaxDateFilter($('#MaxNgayTaoFilterId')),
                        userSuaCuoiFilter: $('#UserSuaCuoiFilterId').val(),
                        minNgaySuaCuoiFilter: getDateFilter($('#MinNgaySuaCuoiFilterId')),
                        maxNgaySuaCuoiFilter: getMaxDateFilter($('#MaxNgaySuaCuoiFilterId')),
                        minCreationTimeFilter: getDateFilter($('#MinCreationTimeFilterId')),
                        maxCreationTimeFilter: getMaxDateFilter($('#MaxCreationTimeFilterId')),
                        minLastModificationTimeFilter: getDateFilter($('#MinLastModificationTimeFilterId')),
                        maxLastModificationTimeFilter: getMaxDateFilter($('#MaxLastModificationTimeFilterId')),
                        isDeletedFilter: $('#IsDeletedFilterId').val(),
                        minDeletionTimeFilter: getDateFilter($('#MinDeletionTimeFilterId')),
                        maxDeletionTimeFilter: getMaxDateFilter($('#MaxDeletionTimeFilterId'))
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
                                    _viewDM_NhomDoiTuongsModal.open({
                                        id: data.record.dM_NhomDoiTuongs.id
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
                                        id: data.record.dM_NhomDoiTuongs.id
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
                                        entityId: data.record.dM_NhomDoiTuongs.id
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
                                    deleteDM_NhomDoiTuongs(data.record.dM_NhomDoiTuongs);
                                }
                            }
                        ]
                    }
                },
                {
                    targets: 2,
                    data: "dM_NhomDoiTuongs.loaiDoiTuong",
                    name: "loaiDoiTuong"
                },
                {
                    targets: 3,
                    data: "dM_NhomDoiTuongs.maNhom",
                    name: "maNhom"
                },
                {
                    targets: 4,
                    data: "dM_NhomDoiTuongs.tenNhom",
                    name: "tenNhom"
                },
                {
                    targets: 5,
                    data: "dM_NhomDoiTuongs.mucDiem",
                    name: "mucDiem"
                },
                {
                    targets: 6,
                    data: "dM_NhomDoiTuongs.ghiChu",
                    name: "ghiChu"
                },
                {
                    targets: 7,
                    data: "dM_NhomDoiTuongs.userTao",
                    name: "userTao"
                },
                {
                    targets: 8,
                    data: "dM_NhomDoiTuongs.ngayTao",
                    name: "ngayTao",
                    render: function(ngayTao) {
                        if (ngayTao) {
                            return moment(ngayTao).format('L');
                        }
                        return "";
                    }
                },
                {
                    targets: 9,
                    data: "dM_NhomDoiTuongs.userSuaCuoi",
                    name: "userSuaCuoi"
                },
                {
                    targets: 10,
                    data: "dM_NhomDoiTuongs.ngaySuaCuoi",
                    name: "ngaySuaCuoi",
                    render: function(ngaySuaCuoi) {
                        if (ngaySuaCuoi) {
                            return moment(ngaySuaCuoi).format('L');
                        }
                        return "";
                    }
                },
                {
                    targets: 11,
                    data: "dM_NhomDoiTuongs.creationTime",
                    name: "creationTime",
                    render: function(creationTime) {
                        if (creationTime) {
                            return moment(creationTime).format('L');
                        }
                        return "";
                    }
                },
                {
                    targets: 12,
                    data: "dM_NhomDoiTuongs.lastModificationTime",
                    name: "lastModificationTime",
                    render: function(lastModificationTime) {
                        if (lastModificationTime) {
                            return moment(lastModificationTime).format('L');
                        }
                        return "";
                    }
                },
                {
                    targets: 13,
                    data: "dM_NhomDoiTuongs.isDeleted",
                    name: "isDeleted",
                    render: function(isDeleted) {
                        if (isDeleted) {
                            return '<div class="text-center"><i class="fa fa-check text-success" title="True"></i></div>';
                        }
                        return '<div class="text-center"><i class="fa fa-times-circle" title="False"></i></div>';
                    }
                },
                {
                    targets: 14,
                    data: "dM_NhomDoiTuongs.deletionTime",
                    name: "deletionTime",
                    render: function(deletionTime) {
                        if (deletionTime) {
                            return moment(deletionTime).format('L');
                        }
                        return "";
                    }
                }
            ]
        });

        function getDM_NhomDoiTuongs() {
            dataTable.ajax.reload();
        }

        function deleteDM_NhomDoiTuongs(dM_NhomDoiTuongs) {
            abp.message.confirm(
                '',
                app.localize('AreYouSure'),
                function(isConfirmed) {
                    if (isConfirmed) {
                        _dM_NhomDoiTuongsService.delete({
                            id: dM_NhomDoiTuongs.id
                        }).done(function() {
                            getDM_NhomDoiTuongs(true);
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
        $('#CreateNewDM_NhomDoiTuongsButton').click(function() {
            _createOrEditModal.open();
        });
        $('#ExportToExcelButton').click(function() {
            _dM_NhomDoiTuongsService
                .getDM_NhomDoiTuongsToExcel({
                    filter: $('#DM_NhomDoiTuongsTableFilter').val(),
                    minLoaiDoiTuongFilter: $('#MinLoaiDoiTuongFilterId').val(),
                    maxLoaiDoiTuongFilter: $('#MaxLoaiDoiTuongFilterId').val(),
                    maNhomFilter: $('#MaNhomFilterId').val(),
                    tenNhomFilter: $('#TenNhomFilterId').val(),
                    minMucDiemFilter: $('#MinMucDiemFilterId').val(),
                    maxMucDiemFilter: $('#MaxMucDiemFilterId').val(),
                    ghiChuFilter: $('#GhiChuFilterId').val(),
                    userTaoFilter: $('#UserTaoFilterId').val(),
                    minNgayTaoFilter: getDateFilter($('#MinNgayTaoFilterId')),
                    maxNgayTaoFilter: getMaxDateFilter($('#MaxNgayTaoFilterId')),
                    userSuaCuoiFilter: $('#UserSuaCuoiFilterId').val(),
                    minNgaySuaCuoiFilter: getDateFilter($('#MinNgaySuaCuoiFilterId')),
                    maxNgaySuaCuoiFilter: getMaxDateFilter($('#MaxNgaySuaCuoiFilterId')),
                    minCreationTimeFilter: getDateFilter($('#MinCreationTimeFilterId')),
                    maxCreationTimeFilter: getMaxDateFilter($('#MaxCreationTimeFilterId')),
                    minLastModificationTimeFilter: getDateFilter($('#MinLastModificationTimeFilterId')),
                    maxLastModificationTimeFilter: getMaxDateFilter($('#MaxLastModificationTimeFilterId')),
                    isDeletedFilter: $('#IsDeletedFilterId').val(),
                    minDeletionTimeFilter: getDateFilter($('#MinDeletionTimeFilterId')),
                    maxDeletionTimeFilter: getMaxDateFilter($('#MaxDeletionTimeFilterId'))
                })
                .done(function(result) {
                    app.downloadTempFile(result);
                });
        });
        abp.event.on('app.createOrEditDM_NhomDoiTuongsModalSaved', function() {
            getDM_NhomDoiTuongs();
        });
        $('#GetDM_NhomDoiTuongsButton').click(function(e) {
            e.preventDefault();
            getDM_NhomDoiTuongs();
        });
        $(document).keypress(function(e) {
            if (e.which === 13) {
                getDM_NhomDoiTuongs();
            }
        });
    });
})();