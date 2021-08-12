var InventoryControler = function (_modalManager) {
    var _inventoryTab = _modalManager.getModal().find('#DM_HangHoaInventoryTab');
    var _idHangHoa = _modalManager.getModal().find('[name=id]').val();
    var _$tonToiThieusTable = $('#TonToiThieusTable');
    var _tonToiThieusService = abp.services.app.tonToiThieus;

    //$('.date-picker').datetimepicker({
    //    locale: abp.localization.currentLanguage.name,
    //    format: 'L'
    //});

    var _permissions = {
        create: abp.auth.hasPermission('Pages.TonToiThieus.Create'),
        edit: abp.auth.hasPermission('Pages.TonToiThieus.Edit'),
        'delete': abp.auth.hasPermission('Pages.TonToiThieus.Delete')
    };

    var _createOrEditModal = new app.ModalManager({
        viewUrl: abp.appPath + 'crm/TonToiThieus/CreateOrEditModal',
        scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/TonToiThieus/_CreateOrEditModal.js',
        modalClass: 'CreateOrEditTonToiThieuModal'
    });

    var _viewTonToiThieuModal = new app.ModalManager({
        viewUrl: abp.appPath + 'crm/TonToiThieus/ViewtonToiThieuModal',
        modalClass: 'ViewTonToiThieuModal'
    });

    var dataTable = _$tonToiThieusTable.DataTable({
        paging: true,
        serverSide: true,
        processing: true,
        listAction: {
            ajaxFunction: _tonToiThieusService.getAll,
            inputFilter: function () {
                return {
                    filter: $('#TonToiThieusTableFilter').val(),
                    dM_HangHoaId: _idHangHoa,
                    minSoLuongTonToiThieuFilter: $('#MinSoLuongTonToiThieuFilterId').val(),
                    maxSoLuongTonToiThieuFilter: $('#MaxSoLuongTonToiThieuFilterId').val(),
                    minTonToiDaFilter: $('#MinTonToiDaFilterId').val(),
                    maxTonToiDaFilter: $('#MaxTonToiDaFilterId').val(),
                    dM_HangHoaTenHangHoaFilter: $('#DM_HangHoaTenHangHoaFilterId').val(),
                    dM_KhoTenKhoFilter: $('#DM_KhoTenKhoFilterId').val()
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
                                _viewTonToiThieuModal.open({ data: data.record });
                            }
                        },
                        {
                            text: app.localize('Edit'),
                            visible: function () {
                                return _permissions.edit;
                            },
                            action: function (data) {
                                _createOrEditModal.open({ id: data.record.tonToiThieu.id, isHangHoa: true, idHangHoa: _idHangHoa });
                            }
                        },
                        {
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deleteTonToiThieu(data.record.tonToiThieu);
                            }
                        }]
                }
            },

            {
                targets: 1,
                data: "dM_KhoTenKho"
            },
            {
                targets: 2,
                data: "tonToiThieu.soLuongTonToiThieu"
            },
            {
                targets: 3,
                data: "tonToiThieu.tonToiDa"
            },
            
        ]
    });


    function getTonToiThieus() {
        dataTable.ajax.reload();
    }

    function deleteTonToiThieu(tonToiThieu) {
        abp.message.confirm(
            '',
            function (isConfirmed) {
                if (isConfirmed) {
                    _tonToiThieusService.delete({
                        id: tonToiThieu.id
                    }).done(function () {
                        getTonToiThieus(true);
                        abp.notify.success(app.localize('SuccessfullyDeleted'));
                    });
                }
            }
        );
    }

    _inventoryTab.find('#ShowAdvancedFiltersSpan').click(function () {
        $('#ShowAdvancedFiltersSpan').hide();
        $('#HideAdvancedFiltersSpan').show();
        $('#AdvacedAuditFiltersArea').slideDown();
    });

    _inventoryTab.find('#HideAdvancedFiltersSpan').click(function () {
        $('#HideAdvancedFiltersSpan').hide();
        $('#ShowAdvancedFiltersSpan').show();
        $('#AdvacedAuditFiltersArea').slideUp();
    });

    _inventoryTab.find('#CreateNewTonToiThieuButton').click(function () {
        _createOrEditModal.open({ isHangHoa: true, idHangHoa: _idHangHoa});
    });

    _inventoryTab.find('#ExportToExcelButton').click(function () {
        _tonToiThieusService
            .getTonToiThieusToExcel({
                filter: $('#TonToiThieusTableFilter').val(),
                minSoLuongTonToiThieuFilter: $('#MinSoLuongTonToiThieuFilterId').val(),
                maxSoLuongTonToiThieuFilter: $('#MaxSoLuongTonToiThieuFilterId').val(),
                minTonToiDaFilter: $('#MinTonToiDaFilterId').val(),
                maxTonToiDaFilter: $('#MaxTonToiDaFilterId').val(),
                dM_HangHoaTenHangHoaFilter: $('#DM_HangHoaTenHangHoaFilterId').val(),
                dM_KhoTenKhoFilter: $('#DM_KhoTenKhoFilterId').val()
            })
            .done(function (result) {
                app.downloadTempFile(result);
            });
    });

    abp.event.on('app.createOrEditTonToiThieuModalSaved', function () {
        getTonToiThieus();
    });

    _inventoryTab.find('#GetTonToiThieusButton').click(function (e) {
        e.preventDefault();
        getTonToiThieus();
    });

    $(document).keypress(function (e) {
        if (e.which === 13) {
            getTonToiThieus();
        }
    });
    return true;
};