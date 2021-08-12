var ShipmentControler = function (_modalManager) {
    var _shipmentTab = _modalManager.getModal().find('#DM_HangHoaShipmentTab');
    var _idHangHoa = _modalManager.getModal().find('[name=id]').val();
    var _$dM_LoHangsTable = $('#DM_LoHangsTable');
    var _dM_LoHangsService = abp.services.app.dM_LoHangs;

    $('.date-picker').datetimepicker({
        locale: abp.localization.currentLanguage.name,
        format: 'L'
    });

    var _permissions = {
        create: abp.auth.hasPermission('Pages.DM_LoHangs.Create'),
        edit: abp.auth.hasPermission('Pages.DM_LoHangs.Edit'),
        'delete': abp.auth.hasPermission('Pages.DM_LoHangs.Delete')
    };

    var _createOrEditModal = new app.ModalManager({
        viewUrl: abp.appPath + 'crm/DM_LoHangs/CreateOrEditModal',
        scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_LoHangs/_CreateOrEditModal.js',
        modalClass: 'CreateOrEditDM_LoHangModal'
    });

    var _viewDM_LoHangModal = new app.ModalManager({
        viewUrl: abp.appPath + 'crm/DM_LoHangs/ViewdM_LoHangModal',
        modalClass: 'ViewDM_LoHangModal'
    });

    var dataTable = _$dM_LoHangsTable.DataTable({
        paging: true,
        serverSide: true,
        processing: true,
        listAction: {
            ajaxFunction: _dM_LoHangsService.getAll,
            inputFilter: function () {
                return {
                    filter: _shipmentTab.find('#DM_LoHangsTableFilter').val(),
                    dM_HangHoaId: _idHangHoa,
                    soLoFilter: _shipmentTab.find('#SoLoFilterId').val(),
                    minNgaySanXuatFilter: _shipmentTab.find('#MinNgaySanXuatFilterId').val(),
                    maxNgaySanXuatFilter: _shipmentTab.find('#MaxNgaySanXuatFilterId').val(),
                    minNgayHetHanFilter: _shipmentTab.find('#MinNgayHetHanFilterId').val(),
                    maxNgayHetHanFilter: _shipmentTab.find('#MaxNgayHetHanFilterId').val(),
                    tenLoFilter: _shipmentTab.find('#TenLoFilterId').val(),
                    dM_HangHoaTenHangHoaFilter: _shipmentTab.find('#DM_HangHoaTenHangHoaFilterId').val()
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
                                _viewDM_LoHangModal.open({ data: data.record });
                            }
                        },
                        {
                            text: app.localize('Edit'),
                            visible: function () {
                                return _permissions.edit;
                            },
                            action: function (data) {
                                _createOrEditModal.open({ id: data.record.dM_LoHang.id, isHangHoa: true, idHangHoa: _idHangHoa });
                            }
                        },
                        {
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deleteDM_LoHang(data.record.dM_LoHang);
                            }
                        }]
                }
            },
            {
                targets: 1,
                data: "dM_LoHang.soLo"
            },
            {
                targets: 2,
                data: "dM_LoHang.tenLo"
            },
            {
                targets: 3,
                data: "dM_LoHang.ngaySanXuat",
                render: function (ngaySanXuat) {
                    if (ngaySanXuat) {
                        return moment(ngaySanXuat).format('L');
                    }
                    return "";
                }

            },
            {
                targets: 4,
                data: "dM_LoHang.ngayHetHan",
                render: function (ngayHetHan) {
                    if (ngayHetHan) {
                        return moment(ngayHetHan).format('L');
                    }
                    return "";
                }

            }
        ]
    });


    function getDM_LoHangs() {
        dataTable.ajax.reload();
    }

    function deleteDM_LoHang(dM_LoHang) {
        abp.message.confirm(
            '',
            function (isConfirmed) {
                if (isConfirmed) {
                    _dM_LoHangsService.delete({
                        id: dM_LoHang.id
                    }).done(function () {
                        getDM_LoHangs(true);
                        abp.notify.success(app.localize('SuccessfullyDeleted'));
                    });
                }
            }
        );
    }

    _shipmentTab.find('#ShowAdvancedFiltersSpan').click(function () {
        _shipmentTab.find('#ShowAdvancedFiltersSpan').hide();
        _shipmentTab.find('#HideAdvancedFiltersSpan').show();
        _shipmentTab.find('#AdvacedAuditFiltersArea').slideDown();
    });

    _shipmentTab.find('#HideAdvancedFiltersSpan').click(function () {
        _shipmentTab.find('#HideAdvancedFiltersSpan').hide();
        _shipmentTab.find('#ShowAdvancedFiltersSpan').show();
        _shipmentTab.find('#AdvacedAuditFiltersArea').slideUp();
    });

    _shipmentTab.find('#CreateNewDM_LoHangButton').click(function () {
        _createOrEditModal.open({ isHangHoa: true, idHangHoa: _idHangHoa });
    });

    _shipmentTab.find('#ExportToExcelButton').click(function () {
        _dM_LoHangsService
            .getDM_LoHangsToExcel({
                filter: _shipmentTab.find('#DM_LoHangsTableFilter').val(),
                soLoFilter: _shipmentTab.find('#SoLoFilterId').val(),
                minNgaySanXuatFilter: _shipmentTab.find('#MinNgaySanXuatFilterId').val(),
                maxNgaySanXuatFilter: _shipmentTab.find('#MaxNgaySanXuatFilterId').val(),
                minNgayHetHanFilter: _shipmentTab.find('#MinNgayHetHanFilterId').val(),
                maxNgayHetHanFilter: _shipmentTab.find('#MaxNgayHetHanFilterId').val(),
                tenLoFilter: _shipmentTab.find('#TenLoFilterId').val(),
                dM_HangHoaTenHangHoaFilter: _shipmentTab.find('#DM_HangHoaTenHangHoaFilterId').val()
            })
            .done(function (result) {
                app.downloadTempFile(result);
            });
    });

    abp.event.on('app.createOrEditDM_LoHangModalSaved', function () {
        getDM_LoHangs();
    });

    _shipmentTab.find('#GetDM_LoHangsButton').click(function (e) {
        e.preventDefault();
        getDM_LoHangs();
    });

    $(document).keypress(function (e) {
        if (e.which === 13) {
            getDM_LoHangs();
        }
    });
    return true;
};
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
                    filter: _inventoryTab.find('#TonToiThieusTableFilter').val(),
                    dM_HangHoaId: _idHangHoa,
                    minSoLuongTonToiThieuFilter: _inventoryTab.find('#MinSoLuongTonToiThieuFilterId').val(),
                    maxSoLuongTonToiThieuFilter: _inventoryTab.find('#MaxSoLuongTonToiThieuFilterId').val(),
                    minTonToiDaFilter: _inventoryTab.find('#MinTonToiDaFilterId').val(),
                    maxTonToiDaFilter: _inventoryTab.find('#MaxTonToiDaFilterId').val(),
                    dM_HangHoaTenHangHoaFilter: _inventoryTab.find('#DM_HangHoaTenHangHoaFilterId').val(),
                    dM_KhoTenKhoFilter: _inventoryTab.find('#DM_KhoTenKhoFilterId').val()
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
        _inventoryTab.find('#ShowAdvancedFiltersSpan').hide();
        _inventoryTab.find('#HideAdvancedFiltersSpan').show();
        _inventoryTab.find('#AdvacedAuditFiltersArea').slideDown();
    });

    _inventoryTab.find('#HideAdvancedFiltersSpan').click(function () {
        _inventoryTab.find('#HideAdvancedFiltersSpan').hide();
        _inventoryTab.find('#ShowAdvancedFiltersSpan').show();
        _inventoryTab.find('#AdvacedAuditFiltersArea').slideUp();
    });

    _inventoryTab.find('#CreateNewTonToiThieuButton').click(function () {
        _createOrEditModal.open({ isHangHoa: true, idHangHoa: _idHangHoa});
    });

    _inventoryTab.find('#ExportToExcelButton').click(function () {
        _tonToiThieusService
            .getTonToiThieusToExcel({
                filter: _inventoryTab.find('#TonToiThieusTableFilter').val(),
                minSoLuongTonToiThieuFilter: _inventoryTab.find('#MinSoLuongTonToiThieuFilterId').val(),
                maxSoLuongTonToiThieuFilter: _inventoryTab.find('#MaxSoLuongTonToiThieuFilterId').val(),
                minTonToiDaFilter: _inventoryTab.find('#MinTonToiDaFilterId').val(),
                maxTonToiDaFilter: _inventoryTab.find('#MaxTonToiDaFilterId').val(),
                dM_HangHoaTenHangHoaFilter: _inventoryTab.find('#DM_HangHoaTenHangHoaFilterId').val(),
                dM_KhoTenKhoFilter: _inventoryTab.find('#DM_KhoTenKhoFilterId').val()
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
var WarehouseControler = function (_modalManager) {
    var _warehouseTab = _modalManager.getModal().find('#DM_HangHoaWarehouseTab');
    var _idHangHoa = _modalManager.getModal().find('[name=id]').val();
    var _$viTriHangTrongKhosTable = $('#ViTriHangTrongKhosTable');
    var _viTriHangTrongKhosService = abp.services.app.viTriHangTrongKhos;

    //$('.date-picker').datetimepicker({
    //    locale: abp.localization.currentLanguage.name,
    //    format: 'L'
    //});

    var _permissions = {
        create: abp.auth.hasPermission('Pages.ViTriHangTrongKhos.Create'),
        edit: abp.auth.hasPermission('Pages.ViTriHangTrongKhos.Edit'),
        'delete': abp.auth.hasPermission('Pages.ViTriHangTrongKhos.Delete')
    };

    var _createOrEditModal = new app.ModalManager({
        viewUrl: abp.appPath + 'crm/ViTriHangTrongKhos/CreateOrEditModal',
        scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/ViTriHangTrongKhos/_CreateOrEditModal.js',
        modalClass: 'CreateOrEditViTriHangTrongKhoModal'
    });

    var _viewViTriHangTrongKhoModal = new app.ModalManager({
        viewUrl: abp.appPath + 'crm/ViTriHangTrongKhos/ViewviTriHangTrongKhoModal',
        modalClass: 'ViewViTriHangTrongKhoModal'
    });

    var dataTable = _$viTriHangTrongKhosTable.DataTable({
        paging: true,
        serverSide: true,
        processing: true,
        listAction: {
            ajaxFunction: _viTriHangTrongKhosService.getAll,
            inputFilter: function () {
                return {
                    filter: _warehouseTab.find('#ViTriHangTrongKhosTableFilter').val(),
                    dM_HangHoaId: _idHangHoa,
                    iD_MaVachFilter: _warehouseTab.find('#ID_MaVachFilterId').val(),
                    viTriFilter: _warehouseTab.find('#ViTriFilterId').val(),
                    dM_KhoTenKhoFilter: _warehouseTab.find('#DM_KhoTenKhoFilterId').val(),
                    dM_HangHoaTenHangHoaFilter: _warehouseTab.find('#DM_HangHoaTenHangHoaFilterId').val()
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
                                _viewViTriHangTrongKhoModal.open({ data: data.record });
                            }
                        },
                        {
                            text: app.localize('Edit'),
                            visible: function () {
                                return _permissions.edit;
                            },
                            action: function (data) {
                                _createOrEditModal.open({ id: data.record.viTriHangTrongKho.id, isHangHoa: true, idHangHoa: _idHangHoa });
                            }
                        },
                        {
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deleteViTriHangTrongKho(data.record.viTriHangTrongKho);
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
                data: "viTriHangTrongKho.viTri"
            }
        ]
    });


    function getViTriHangTrongKhos() {
        dataTable.ajax.reload();
    }

    function deleteViTriHangTrongKho(viTriHangTrongKho) {
        abp.message.confirm(
            '',
            function (isConfirmed) {
                if (isConfirmed) {
                    _viTriHangTrongKhosService.delete({
                        id: viTriHangTrongKho.id
                    }).done(function () {
                        getViTriHangTrongKhos(true);
                        abp.notify.success(app.localize('SuccessfullyDeleted'));
                    });
                }
            }
        );
    }

    _warehouseTab.find('#ShowAdvancedFiltersSpan').click(function () {
        _warehouseTab.find('#ShowAdvancedFiltersSpan').hide();
        _warehouseTab.find('#HideAdvancedFiltersSpan').show();
        _warehouseTab.find('#AdvacedAuditFiltersArea').slideDown();
    });

    _warehouseTab.find('#HideAdvancedFiltersSpan').click(function () {
        _warehouseTab.find('#HideAdvancedFiltersSpan').hide();
        _warehouseTab.find('#ShowAdvancedFiltersSpan').show();
        _warehouseTab.find('#AdvacedAuditFiltersArea').slideUp();
    });

    _warehouseTab.find('#CreateNewViTriHangTrongKhoButton').click(function () {
        _createOrEditModal.open({ isHangHoa: true, idHangHoa: _idHangHoa});
    });

    _warehouseTab.find('#ExportToExcelButton').click(function () {
        _viTriHangTrongKhosService
            .getViTriHangTrongKhosToExcel({
                filter: _warehouseTab.find('#ViTriHangTrongKhosTableFilter').val(),
                iD_MaVachFilter: _warehouseTab.find('#ID_MaVachFilterId').val(),
                viTriFilter: _warehouseTab.find('#ViTriFilterId').val(),
                dM_KhoTenKhoFilter: _warehouseTab.find('#DM_KhoTenKhoFilterId').val(),
                dM_HangHoaTenHangHoaFilter: _warehouseTab.find('#DM_HangHoaTenHangHoaFilterId').val()
            })
            .done(function (result) {
                app.downloadTempFile(result);
            });
    });

    abp.event.on('app.createOrEditViTriHangTrongKhoModalSaved', function () {
        getViTriHangTrongKhos();
    });

    _warehouseTab.find('#GetViTriHangTrongKhosButton').click(function (e) {
        e.preventDefault();
        getViTriHangTrongKhos();
    });

    $(document).keypress(function (e) {
        if (e.which === 13) {
            getViTriHangTrongKhos();
        }
    });
    return true;
}
var DiscountControler = function (_modalManager) {
    var _discountTab = _modalManager.getModal().find('#DM_HangHoaDiscountTab');
    var _idHangHoa = _modalManager.getModal().find('[name=id]').val();
    var _$chietKhauMacDinh_NhanViensTable = $('#ChietKhauMacDinh_NhanViensTable');
    var _chietKhauMacDinh_NhanViensService = abp.services.app.chietKhauMacDinh_NhanViens;

    //$('.date-picker').datetimepicker({
    //    locale: abp.localization.currentLanguage.name,
    //    format: 'L'
    //});

    var _permissions = {
        create: abp.auth.hasPermission('Pages.ChietKhauMacDinh_NhanViens.Create'),
        edit: abp.auth.hasPermission('Pages.ChietKhauMacDinh_NhanViens.Edit'),
        'delete': abp.auth.hasPermission('Pages.ChietKhauMacDinh_NhanViens.Delete')
    };

    var _createOrEditModal = new app.ModalManager({
        viewUrl: abp.appPath + 'crm/ChietKhauMacDinh_NhanViens/CreateOrEditModal',
        scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/ChietKhauMacDinh_NhanViens/_CreateOrEditModal.js',
        modalClass: 'CreateOrEditChietKhauMacDinh_NhanVienModal'
    });

    var _viewChietKhauMacDinh_NhanVienModal = new app.ModalManager({
        viewUrl: abp.appPath + 'crm/ChietKhauMacDinh_NhanViens/ViewchietKhauMacDinh_NhanVienModal',
        modalClass: 'ViewChietKhauMacDinh_NhanVienModal'
    });

    var dataTable = _$chietKhauMacDinh_NhanViensTable.DataTable({
        paging: true,
        serverSide: true,
        processing: true,
        listAction: {
            ajaxFunction: _chietKhauMacDinh_NhanViensService.getAll,
            inputFilter: function () {
                return {
                    filter: $('#ChietKhauMacDinh_NhanViensTableFilter').val(),
                    dM_HangHoaId: _idHangHoa,
                    minChietKhauFilter: $('#MinChietKhauFilterId').val(),
                    maxChietKhauFilter: $('#MaxChietKhauFilterId').val(),
                    laPhanTramFilter: $('#LaPhanTramFilterId').val(),
                    theoNhomNhanVienFilter: $('#TheoNhomNhanVienFilterId').val(),
                    theoNhomHangHoaFilter: $('#TheoNhomHangHoaFilterId').val(),
                    minChietKhau_YeuCauFilter: $('#MinChietKhau_YeuCauFilterId').val(),
                    maxChietKhau_YeuCauFilter: $('#MaxChietKhau_YeuCauFilterId').val(),
                    laPhanTram_YeuCauFilter: $('#LaPhanTram_YeuCauFilterId').val(),
                    chietKhauTuVanFilter: $('#ChietKhauTuVanFilterId').val(),
                    dM_HangHoaTenHangHoaFilter: $('#DM_HangHoaTenHangHoaFilterId').val(),
                    userNameFilter: $('#UserNameFilterId').val(),
                    dM_DonViTenDonViFilter: $('#DM_DonViTenDonViFilterId').val(),
                    dM_NhomHangHoaTenNhomFilter: $('#DM_NhomHangHoaTenNhomFilterId').val()
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
                                _viewChietKhauMacDinh_NhanVienModal.open({ data: data.record });
                            }
                        },
                        {
                            text: app.localize('Edit'),
                            visible: function () {
                                return _permissions.edit;
                            },
                            action: function (data) {
                                _createOrEditModal.open({ id: data.record.chietKhauMacDinh_NhanVien.id, isHangHoa: true, idHangHoa: _idHangHoa });
                            }
                        },
                        {
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deleteChietKhauMacDinh_NhanVien(data.record.chietKhauMacDinh_NhanVien);
                            }
                        }]
                }
            },
            {
                targets: 1,
                data: "chietKhauMacDinh_NhanVien.chietKhau"
            },
            {
                targets: 2,
                data: "chietKhauMacDinh_NhanVien.laPhanTram",
                render: function (laPhanTram) {
                    if (laPhanTram) {
                        return '<i class="la la-check-square m--font-success" title="True"></i>';
                    }
                    return '<i class="la la-times-circle" title="False"></i>';
                }

            },
            
            {
                targets: 3,
                data: "userName"
            },
            {
                targets: 4,
                data: "dM_DonViTenDonVi"
            }
        ]
    });


    function getChietKhauMacDinh_NhanViens() {
        dataTable.ajax.reload();
    }

    function deleteChietKhauMacDinh_NhanVien(chietKhauMacDinh_NhanVien) {
        abp.message.confirm(
            '',
            function (isConfirmed) {
                if (isConfirmed) {
                    _chietKhauMacDinh_NhanViensService.delete({
                        id: chietKhauMacDinh_NhanVien.id
                    }).done(function () {
                        getChietKhauMacDinh_NhanViens(true);
                        abp.notify.success(app.localize('SuccessfullyDeleted'));
                    });
                }
            }
        );
    }

    _discountTab.find('#ShowAdvancedFiltersSpan').click(function () {
        _discountTab.find('#ShowAdvancedFiltersSpan').hide();
        _discountTab.find('#HideAdvancedFiltersSpan').show();
        _discountTab.find('#AdvacedAuditFiltersArea').slideDown();
    });

    _discountTab.find('#HideAdvancedFiltersSpan').click(function () {
        _discountTab.find('#HideAdvancedFiltersSpan').hide();
        _discountTab.find('#ShowAdvancedFiltersSpan').show();
        _discountTab.find('#AdvacedAuditFiltersArea').slideUp();
    });

    _discountTab.find('#CreateNewChietKhauMacDinh_NhanVienButton').click(function () {
        _createOrEditModal.open({ isHangHoa: true, idHangHoa: _idHangHoa });
    });

    _discountTab.find('#ExportToExcelButton').click(function () {
        _chietKhauMacDinh_NhanViensService
            .getChietKhauMacDinh_NhanViensToExcel({
                filter: $('#ChietKhauMacDinh_NhanViensTableFilter').val(),
                minChietKhauFilter: $('#MinChietKhauFilterId').val(),
                maxChietKhauFilter: $('#MaxChietKhauFilterId').val(),
                laPhanTramFilter: $('#LaPhanTramFilterId').val(),
                theoNhomNhanVienFilter: $('#TheoNhomNhanVienFilterId').val(),
                theoNhomHangHoaFilter: $('#TheoNhomHangHoaFilterId').val(),
                minChietKhau_YeuCauFilter: $('#MinChietKhau_YeuCauFilterId').val(),
                maxChietKhau_YeuCauFilter: $('#MaxChietKhau_YeuCauFilterId').val(),
                laPhanTram_YeuCauFilter: $('#LaPhanTram_YeuCauFilterId').val(),
                chietKhauTuVanFilter: $('#ChietKhauTuVanFilterId').val(),
                dM_HangHoaTenHangHoaFilter: $('#DM_HangHoaTenHangHoaFilterId').val(),
                userNameFilter: $('#UserNameFilterId').val(),
                dM_DonViTenDonViFilter: $('#DM_DonViTenDonViFilterId').val(),
                dM_NhomHangHoaTenNhomFilter: $('#DM_NhomHangHoaTenNhomFilterId').val()
            })
            .done(function (result) {
                app.downloadTempFile(result);
            });
    });

    abp.event.on('app.createOrEditChietKhauMacDinh_NhanVienModalSaved', function () {
        getChietKhauMacDinh_NhanViens();
    });

    _discountTab.find('#GetChietKhauMacDinh_NhanViensButton').click(function (e) {
        e.preventDefault();
        getChietKhauMacDinh_NhanViens();
    });

    $(document).keypress(function (e) {
        if (e.which === 13) {
            getChietKhauMacDinh_NhanViens();
        }
    });
    return true;
};
(function ($) {
    app.modals.ChangeHangHoaImageModal = function () {

        var _modalManager;
        var $jcropApi = null;
        var uploadedFileName = null;

        var getHangHoaImagePath = function (hangHoaId) {
            
            var date = new Date();
            return hangHoaId.length > 0 ?
                (abp.appPath + 'crm/DM_HangHoas/GetHangHoaImageByHangHoaId?hangHoaId=' + hangHoaId + '&v=' + date.getTime()) :
                (abp.appPath + 'Common/Images/default-profile-picture.png');
        }
        var _dM_HangHoasService = abp.services.app.dM_HangHoas;

        this.init = function (modalManager) {
            _modalManager = modalManager;

            $('#ChangeHangHoaImageModalForm input[name=HangHoaImage]').change(function () {
                $('#ChangeHangHoaImageModalForm').submit();
            });

            $('#ChangeHangHoaImageModalForm').ajaxForm({
                beforeSubmit: function (formData, jqForm, options) {

                    var $fileInput = $('#ChangeHangHoaImageModalForm input[name=HangHoaImage]');
                    var files = $fileInput.get()[0].files;

                    if (!files.length) {
                        return false;
                    }

                    var file = files[0];

                    //File type check
                    var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
                    if ('|jpg|jpeg|png|gif|'.indexOf(type) === -1) {
                        abp.message.warn(app.localize('HangHoaImage_Warn_FileType'));
                        return false;
                    }

                    //File size check
                    if (file.size > 5242880) //5MB
                    {
                        abp.message.warn(app.localize('HangHoaImage_Warn_SizeLimit', app.maxProfilPictureBytesUserFriendlyValue));
                        return false;
                    }

                    return true;
                },
                success: function (response) {
                    if (response.success) {
                        var $HangHoaImageResize = $('#HangHoaImageResize');

                        var profileFilePath = abp.appPath + 'Temp/Downloads/' + response.result.fileName + '?v=' + new Date().valueOf();
                        uploadedFileName = response.result.fileName;

                        if ($jcropApi) {
                            $jcropApi.destroy();
                        }

                        $HangHoaImageResize.show();
                        $HangHoaImageResize.attr('src', profileFilePath);
                        $HangHoaImageResize.attr('originalWidth', response.result.width);
                        $HangHoaImageResize.attr('originalHeight', response.result.height);

                        $HangHoaImageResize.Jcrop({
                            setSelect: [0, 0, 100, 100],
                            aspectRatio: 1,
                            boxWidth: 400,
                            boxHeight: 400
                        }, function () {
                            $jcropApi = this;
                        });

                    } else {
                        abp.message.error(response.error.message);
                    }
                }
            });

            $('#HangHoaImageResize').hide();
        };

        this.save = function () {
            if (!uploadedFileName) {
                return;
            }

            var resizeParams = {};
            if ($jcropApi) {
                resizeParams = $jcropApi.getSelection();
            }

            var containerWidth = $jcropApi.getContainerSize()[0];
            var containerHeight = $jcropApi.getContainerSize()[1];

            var originalWidth = containerWidth;
            var originalHeight = containerHeight;

            if ($('#HangHoaImageResize')) {
                originalWidth = parseInt($('#HangHoaImageResize').attr("originalWidth"));
                originalHeight = parseInt($('#HangHoaImageResize').attr("originalHeight"));
            }

            var widthRatio = originalWidth / containerWidth;
            var heightRatio = originalHeight / containerHeight;

            _dM_HangHoasService.updateHangHoaImage({
                dM_HangHoaId: $('#ChangeHangHoaImageModalForm input[name=dM_HangHoaId]').val(),
                fileName: uploadedFileName,
                x: parseInt(resizeParams.x * widthRatio),
                y: parseInt(resizeParams.y * heightRatio),
                width: parseInt(resizeParams.w * widthRatio),
                height: parseInt(resizeParams.h * heightRatio)
            }).done(function () {
                $jcropApi.destroy();
                $jcropApi = null;
                $('.hanghoa-image').attr('src', getHangHoaImagePath($('#ChangeHangHoaImageModalForm input[name=dM_HangHoaId]').val()));
                _modalManager.close();
            });
        };
    };
})(jQuery);
(function ($) {
    app.modals.CreateOrEditDM_HangHoaModal = function () {

        var _dM_HangHoasService = abp.services.app.dM_HangHoas;

        var _modalManager;
        var _dM_HangHoaId = null;
        var _$dM_HangHoaInformationForm = null;
        var _$dM_HangHoaDetailsForm = null;
        var lohangControl = null;
        var discountControl = null;
        var inventoryControl = null;
        var warehouseControl = null;
        var _dM_NhomHangHoaLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_HangHoas/DM_NhomHangHoaLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_HangHoas/_DM_NhomHangHoaLookupTableModal.js',
            modalClass: 'DM_NhomHangHoaLookupTableModal'
        });
        var _dM_QuocGiaLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_HangHoas/DM_QuocGiaLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_HangHoas/_DM_QuocGiaLookupTableModal.js',
            modalClass: 'DM_QuocGiaLookupTableModal'
        });
        var _dM_DoiTuongLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_HangHoas/DM_DoiTuongLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_HangHoas/_DM_DoiTuongLookupTableModal.js',
            modalClass: 'DM_DoiTuongLookupTableModal'
        });
        var _dM_ThueSuatLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_HangHoas/DM_ThueSuatLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_HangHoas/_DM_ThueSuatLookupTableModal.js',
            modalClass: 'DM_ThueSuatLookupTableModal'
        });
        var _dM_DonViTinhLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_HangHoas/DM_DonViTinhLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_HangHoas/_DM_DonViTinhLookupTableModal.js',
            modalClass: 'DM_DonViTinhLookupTableModal'
        });
        var _dM_NhomKhachHangLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_HangHoas/DM_NhomKhachHangLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_HangHoas/_DM_NhomKhachHangLookupTableModal.js',
            modalClass: 'DM_NhomKhachHangLookupTableModal'
        });

        var _changeImageModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_HangHoas/ChangeImageModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_HangHoas/_ChangeImageModal.js',
            modalClass: 'ChangeHangHoaImageModal'
        });

        this.init = function (modalManager) {
            _modalManager = modalManager;

            var modal = _modalManager.getModal();
            modal.find('.numeric').number( true, 0 );;
            modal.find('.select2').select2(
                {
                    placeholder: 'Select an option',
                    width: '100%'
                });
            modal.find('.date-picker').datetimepicker({
                locale: abp.localization.currentLanguage.name,
                format: 'L'
            });
            var _dM_HangHoaId=_modalManager.getModal().find('[name=id]');
            
            modal.find('.date-picker').each(function () {
                if ($(this).val() == "01/01/0001") {
                    $(this).data("DateTimePicker").date(new Date());
                }
            })

            _$dM_HangHoaInformationForm = _modalManager.getModal().find('form[name=DM_HangHoaCommonInforForm]');
            _$dM_HangHoaDetailsForm = _modalManager.getModal().find('form[name=DM_HangHoaDetailsForm]');
            _$dM_HangHoaInformationForm.validate();
            _$dM_HangHoaDetailsForm.validate();
            modal.find('.antikeydown').keydown(function (e) {
                if (e.which === 13) {
                        e.stopPropagation();
                }
            });
        };

        $('#OpenDM_NhomHangHoaLookupTableButton').click(function () {

            var dM_HangHoa = _$dM_HangHoaInformationForm.serializeFormToObject();

            _dM_NhomHangHoaLookupTableModal.open({ id: dM_HangHoa.dM_NhomHangHoaId, displayName: dM_HangHoa.dM_NhomHangHoaTenNhom }, function (data) {
                _$dM_HangHoaInformationForm.find('input[name=dM_NhomHangHoaTenNhom]').val(data.displayName);
                _$dM_HangHoaInformationForm.find('input[name=dM_NhomHangHoaId]').val(data.id);
            });
        });

        $('#ClearDM_NhomHangHoaTenNhomButton').click(function () {
            _$dM_HangHoaInformationForm.find('input[name=dM_NhomHangHoaTenNhom]').val('');
            _$dM_HangHoaInformationForm.find('input[name=dM_NhomHangHoaId]').val('');
        });

        $('#OpenDM_QuocGiaLookupTableButton').click(function () {

            var dM_HangHoa = _$dM_HangHoaInformationForm.serializeFormToObject();

            _dM_QuocGiaLookupTableModal.open({ id: dM_HangHoa.dM_QuocGiaId, displayName: dM_HangHoa.dM_QuocGiaTenNuoc }, function (data) {
                _$dM_HangHoaInformationForm.find('input[name=dM_QuocGiaTenNuoc]').val(data.displayName);
                _$dM_HangHoaInformationForm.find('input[name=dM_QuocGiaId]').val(data.id);
            });
        });

        $('#ClearDM_QuocGiaTenNuocButton').click(function () {
            _$dM_HangHoaInformationForm.find('input[name=dM_QuocGiaTenNuoc]').val('');
            _$dM_HangHoaInformationForm.find('input[name=dM_QuocGiaId]').val('');
        });

        $('#OpenDM_DoiTuongLookupTableButton').click(function () {

            var dM_HangHoa = _$dM_HangHoaInformationForm.serializeFormToObject();

            _dM_DoiTuongLookupTableModal.open({ id: dM_HangHoa.dM_DoiTuongId, displayName: dM_HangHoa.dM_DoiTuongTenDoiTuong }, function (data) {
                _$dM_HangHoaInformationForm.find('input[name=dM_DoiTuongTenDoiTuong]').val(data.displayName);
                _$dM_HangHoaInformationForm.find('input[name=dM_DoiTuongId]').val(data.id);
            });
        });

        $('#ClearDM_DoiTuongTenDoiTuongButton').click(function () {
            _$dM_HangHoaInformationForm.find('input[name=dM_DoiTuongTenDoiTuong]').val('');
            _$dM_HangHoaInformationForm.find('input[name=dM_DoiTuongId]').val('');
        });

        $('#OpenDM_ThueSuatLookupTableButton').click(function () {

            var dM_HangHoa = _$dM_HangHoaInformationForm.serializeFormToObject();

            _dM_ThueSuatLookupTableModal.open({ id: dM_HangHoa.dM_ThueSuatId, displayName: dM_HangHoa.dM_ThueSuatThueSuat }, function (data) {
                _$dM_HangHoaInformationForm.find('input[name=dM_ThueSuatThueSuat]').val(data.displayName);
                _$dM_HangHoaInformationForm.find('input[name=dM_ThueSuatId]').val(data.id);
            });
        });

        $('#ClearDM_ThueSuatThueSuatButton').click(function () {
            _$dM_HangHoaInformationForm.find('input[name=dM_ThueSuatThueSuat]').val('');
            _$dM_HangHoaInformationForm.find('input[name=dM_ThueSuatId]').val('');
        });

        $('#OpenDM_DonViTinhLookupTableButton').click(function () {

            var dM_HangHoa = _$dM_HangHoaInformationForm.serializeFormToObject();

            _dM_DonViTinhLookupTableModal.open({ id: dM_HangHoa.dM_DonViTinhId, displayName: dM_HangHoa.dM_DonViTinhTenDonViTinh }, function (data) {
                _$dM_HangHoaInformationForm.find('input[name=dM_DonViTinhTenDonViTinh]').val(data.displayName);
                _$dM_HangHoaInformationForm.find('input[name=dM_DonViTinhId]').val(data.id);
            });
        });

        $('#ClearDM_DonViTinhTenDonViTinhButton').click(function () {
            _$dM_HangHoaInformationForm.find('input[name=dM_DonViTinhTenDonViTinh]').val('');
            _$dM_HangHoaInformationForm.find('input[name=dM_DonViTinhId]').val('');
        });

        $('#OpenDM_DonViTinhQuyCachLookupTableButton').click(function () {

            var dM_HangHoa = _$dM_HangHoaInformationForm.serializeFormToObject();

            _dM_DonViTinhLookupTableModal.open({ id: dM_HangHoa.iD_DVTQuyCach, displayName: dM_HangHoa.dM_DonViTinhQuyCachTenDonViTinh }, function (data) {
                _$dM_HangHoaInformationForm.find('input[name=dM_DonViTinhQuyCachTenDonViTinh]').val(data.displayName);
                _$dM_HangHoaInformationForm.find('input[name=iD_DVTQuyCach]').val(data.id);
            });
        });

        $('#ClearDM_DonViTinhQuyCachTenDonViTinhButton').click(function () {
            _$dM_HangHoaInformationForm.find('input[name=dM_DonViTinhQuyCachTenDonViTinh]').val('');
            _$dM_HangHoaInformationForm.find('input[name=iD_DVTQuyCach]').val('');
        });

        $('#OpenNhomKH1TenNhomLookupTableButton').click(function () {

            var dM_HangHoa = _$dM_HangHoaDetailsForm.serializeFormToObject();

            _dM_NhomKhachHangLookupTableModal.open({ id: dM_HangHoa.iDs_NhomKH1, displayName: dM_HangHoa.nhomKH1TenNhom }, function (data) {
                _$dM_HangHoaDetailsForm.find('input[name=nhomKH1TenNhom]').val(data.displayName);
                _$dM_HangHoaDetailsForm.find('input[name=iDs_NhomKH1]').val(data.id);
            });
        });

        $('#ClearNhomKH1TenNhomButton').click(function () {
            _$dM_HangHoaDetailsForm.find('input[name=NhomKH1TenNhom]').val('');
            _$dM_HangHoaDetailsForm.find('input[name=iDs_NhomKH1]').val('');
        });

        $('#DM_HangHoaShipmentTabLink').click(function () {
            
            lohangControl = lohangControl == null ? ShipmentControler(_modalManager): lohangControl;
        });

        $('#DM_HangHoaDiscountTabLink').click(function () {
            
            discountControl = discountControl== null ? DiscountControler(_modalManager): discountControl;
        });
        $('#DM_HangHoaInventoryTabLink').click(function () {
            
            inventoryControl = inventoryControl == null ? InventoryControler(_modalManager) : inventoryControl;
        });
        $('#DM_HangHoaWarehouseTabLink').click(function () {
            
            warehouseControl = warehouseControl == null ? WarehouseControler(_modalManager) : WarehouseControl;
        });
        $('#DM_HangHoaChangeImageButton').click(function () {
            var dM_HangHoa = _$dM_HangHoaInformationForm.serializeFormToObject();
            _changeImageModal.open({ id: dM_HangHoa.id });
        });

        
        this.save = function () {
            if (!_$dM_HangHoaInformationForm.valid() || !_$dM_HangHoaDetailsForm.valid()) {
                return;
            }

            var dM_HangHoaCommonInfo = _$dM_HangHoaInformationForm.serializeFormToObject();
            var dM_HangHoaDetails = _$dM_HangHoaDetailsForm.serializeFormToObject();
            dM_HangHoaDetails.IDs_NhomKH1 = $('[name="NhomKH1IDs"]').val().join(",");
            //loan.IDs_NhomKH1 += "/";
            //loan.IDs_NhomKH1 = "/" + loan.IDs_NhomKH1;
            dM_HangHoaDetails.IDs_NhomKH2 = $('[name="NhomKH2IDs"]').val().join(",");
            //loan.IDs_NhomKH2 += "/";
            //loan.IDs_NhomKH2 = "/" + loan.IDs_NhomKH2;
            dM_HangHoaDetails.IDs_NhomKH3 = $('[name="NhomKH3IDs"]').val().join(",");
            //loan.IDs_NhomKH3 += "/";
            //loan.IDs_NhomKH3 = "/" + loan.IDs_NhomKH3;
            _modalManager.setBusy(true);
            
            _dM_HangHoasService.createOrEdit(
                $.extend({}, dM_HangHoaCommonInfo, dM_HangHoaDetails)
            ).done(function () {
                abp.notify.info(app.localize('SavedSuccessfully'));
                _modalManager.close();
                abp.event.trigger('app.createOrEditDM_HangHoaModalSaved');
            }).always(function () {
                _modalManager.setBusy(false);
            });
        };
    };
})(jQuery);
(function () {
    $(function () {

        var _$dM_HangHoasTable = $('#DM_HangHoasTable');
        var _dM_HangHoasService = abp.services.app.dM_HangHoas;

        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.DM_HangHoas.Create'),
            edit: abp.auth.hasPermission('Pages.DM_HangHoas.Edit'),
            'delete': abp.auth.hasPermission('Pages.DM_HangHoas.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_HangHoas/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_HangHoas/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditDM_HangHoaModal',
            width: "80%",
            save:true,
            saveAndClose: true,
            saveAndNew:true,
            buttons: [{
                    iconClass: "",
                    buttonClass: "",
                    eventClass:"",
                    function: "",
                    text: ""
                },
                {
                    iconClass: "",
                    buttonClass: "",
                    function: "",
                    text: ""
                }
            ]
                
        });

        var _viewDM_HangHoaModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_HangHoas/ViewdM_HangHoaModal',
            modalClass: 'ViewDM_HangHoaModal'
        });

        var dataTable = _$dM_HangHoasTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _dM_HangHoasService.getAll,
                inputFilter: function () {
                    return {
                        filter: $('#DM_HangHoasTableFilter').val(),
                        isHangHoa: true,
                        maHangHoaFilter: $('#MaHangHoaFilterId').val(),
                        tenHangHoaFilter: $('#TenHangHoaFilterId').val(),
                        minGiaBanLeFilter: $('#MinGiaBanLeFilterId').val(),
                        maxGiaBanLeFilter: $('#MaxGiaBanLeFilterId').val(),
                        minTiSuatBanLeFilter: $('#MinTiSuatBanLeFilterId').val(),
                        maxTiSuatBanLeFilter: $('#MaxTiSuatBanLeFilterId').val(),
                        minGiaNhapFilter: $('#MinGiaNhapFilterId').val(),
                        maxGiaNhapFilter: $('#MaxGiaNhapFilterId').val(),
                        maVachFilter: $('#MaVachFilterId').val(),
                        minQuyCachFilter: $('#MinQuyCachFilterId').val(),
                        maxQuyCachFilter: $('#MaxQuyCachFilterId').val(),
                        iD_DVTQuyCachFilter: $('#ID_DVTQuyCachFilterId').val(),
                        minLoaiBaoHanhFilter: $('#MinLoaiBaoHanhFilterId').val(),
                        maxLoaiBaoHanhFilter: $('#MaxLoaiBaoHanhFilterId').val(),
                        minThoiGianBaoHanhFilter: $('#MinThoiGianBaoHanhFilterId').val(),
                        maxThoiGianBaoHanhFilter: $('#MaxThoiGianBaoHanhFilterId').val(),
                        tenTGBaoHanhFilter: $('#TenTGBaoHanhFilterId').val(),
                        minChiPhiThucHienFilter: $('#MinChiPhiThucHienFilterId').val(),
                        maxChiPhiThucHienFilter: $('#MaxChiPhiThucHienFilterId').val(),
                        chiPhiTinhTheoPTFilter: $('#ChiPhiTinhTheoPTFilterId').val(),
                        tinhCPSauChietKhauFilter: $('#TinhCPSauChietKhauFilterId').val(),
                        ghiChuFilter: $('#GhiChuFilterId').val(),
                        minSoPhutThucHienFilter: $('#MinSoPhutThucHienFilterId').val(),
                        maxSoPhutThucHienFilter: $('#MaxSoPhutThucHienFilterId').val(),
                        minChietKhauMD_NVFilter: $('#MinChietKhauMD_NVFilterId').val(),
                        maxChietKhauMD_NVFilter: $('#MaxChietKhauMD_NVFilterId').val(),
                        chietKhauMD_NVTheoPTFilter: $('#ChietKhauMD_NVTheoPTFilterId').val(),
                        theoDoiFilter: $('#TheoDoiFilterId').val(),
                        tenKhacFilter: $('#TenKhacFilterId').val(),
                        chatLieuFilter: $('#ChatLieuFilterId').val(),
                        kichCoFilter: $('#KichCoFilterId').val(),
                        mauSacFilter: $('#MauSacFilterId').val(),
                        dM_NhomHangHoaTenNhomFilter: $('#DM_NhomHangHoaTenNhomFilterId').val(),
                        dM_QuocGiaTenNuocFilter: $('#DM_QuocGiaTenNuocFilterId').val(),
                        dM_DoiTuongTenDoiTuongFilter: $('#DM_DoiTuongTenDoiTuongFilterId').val(),
                        dM_ThueSuatThueSuatFilter: $('#DM_ThueSuatThueSuatFilterId').val(),
                        dM_DonViTinhTenDonViTinhFilter: $('#DM_DonViTinhTenDonViTinhFilterId').val()
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
                                    _viewDM_HangHoaModal.open({ data: data.record });
                                }
                            },
                            {
                                text: app.localize('Edit'),
                                visible: function () {
                                    return _permissions.edit;
                                },
                                action: function (data) {
                                    _createOrEditModal.open({ id: data.record.dM_HangHoa.id });
                                }
                            },
                            {
                                text: app.localize('Delete'),
                                visible: function () {
                                    return _permissions.delete;
                                },
                                action: function (data) {
                                    deleteDM_HangHoa(data.record.dM_HangHoa);
                                }
                            }]
                    }
                },
                {
                    targets: 1,
                    data: "dM_HangHoa.maHangHoa"
                },
                {
                    targets: 2,
                    data: "dM_HangHoa.tenHangHoa"
                },
                {
                    targets: 3,
                    data: "dM_HangHoa.giaBanLe"
                },
                {
                    targets: 4,
                    data: "dM_HangHoa.tiSuatBanLe"
                },
                {
                    targets: 5,
                    data: "dM_HangHoa.giaNhap"
                },
                {
                    targets: 6,
                    data: "dM_DonViTinhTenDonViTinh"
                },
                {
                    targets: 7,
                    data: "dM_HangHoa.quyCach"
                },
                {
                    targets: 8,
                    data: "dM_DonViTinhQuyCachTenDonViTinh"
                },
                {
                    targets: 9,
                    data: "dM_HangHoa.loaiBaoHanh"
                },
                {
                    targets: 10,
                    data: "dM_HangHoa.thoiGianBaoHanh"
                },
                {
                    targets: 11,
                    data: "dM_HangHoa.tenTGBaoHanh"
                },
                {
                    targets: 12,
                    data: "dM_HangHoa.chiPhiThucHien"
                },
                {
                    targets: 13,
                    data: "dM_HangHoa.chiPhiTinhTheoPT",
                    render: function (chiPhiTinhTheoPT) {
                        if (chiPhiTinhTheoPT) {
                            return '<i class="la la-check-square m--font-success" title="True"></i>';
                        }
                        return '<i class="la la-times-circle" title="False"></i>';
                    }

                },
                {
                    targets: 14,
                    data: "dM_HangHoa.tinhCPSauChietKhau",
                    render: function (tinhCPSauChietKhau) {
                        if (tinhCPSauChietKhau) {
                            return '<i class="la la-check-square m--font-success" title="True"></i>';
                        }
                        return '<i class="la la-times-circle" title="False"></i>';
                    }

                },
                {
                    targets: 15,
                    data: "dM_HangHoa.soPhutThucHien"
                },
                {
                    targets: 16,
                    data: "dM_HangHoa.chietKhauMD_NV"
                },
                {
                    targets: 17,
                    data: "dM_HangHoa.chietKhauMD_NVTheoPT",
                    render: function (chietKhauMD_NVTheoPT) {
                        if (chietKhauMD_NVTheoPT) {
                            return '<i class="la la-check-square m--font-success" title="True"></i>';
                        }
                        return '<i class="la la-times-circle" title="False"></i>';
                    }

                },
                {
                    targets: 18,
                    data: "dM_HangHoa.theoDoi",
                    render: function (theoDoi) {
                        if (theoDoi) {
                            return '<i class="la la-check-square m--font-success" title="True"></i>';
                        }
                        return '<i class="la la-times-circle" title="False"></i>';
                    }

                },
                {
                    targets: 19,
                    data: "dM_HangHoa.tenKhac"
                },
                {
                    targets: 20,
                    data: "dM_HangHoa.chatLieu"
                },
                {
                    targets: 21,
                    data: "dM_HangHoa.kichCo"
                },
                {
                    targets: 22,
                    data: "dM_HangHoa.mauSac"
                },
                {
                    targets: 23,
                    data: "dM_NhomHangHoaTenNhom"
                },
                {
                    targets: 24,
                    data: "dM_QuocGiaTenNuoc"
                },
                {
                    targets: 25,
                    data: "dM_DoiTuongTenDoiTuong"
                },
                {
                    targets: 26,
                    data: "dM_ThueSuatThueSuat"
                }
            ]
        });


        function getDM_HangHoas() {
            dataTable.ajax.reload();
        }

        function deleteDM_HangHoa(dM_HangHoa) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _dM_HangHoasService.delete({
                            id: dM_HangHoa.id
                        }).done(function () {
                            getDM_HangHoas(true);
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

        $('#CreateNewDM_HangHoaButton').click(function () {
            _createOrEditModal.open();
        });

        $('#ExportToExcelButton').click(function () {
            _dM_HangHoasService
                .getDM_HangHoasToExcel({
                    filter: $('#DM_HangHoasTableFilter').val(),
                    anhFilter: $('#AnhFilterId').val(),
                    maHangHoaFilter: $('#MaHangHoaFilterId').val(),
                    tenHangHoaFilter: $('#TenHangHoaFilterId').val(),
                    laHangHoaFilter: $('#LaHangHoaFilterId').val(),
                    iD_PhanLoaiFilter: $('#ID_PhanLoaiFilterId').val(),
                    minGiaBanLeFilter: $('#MinGiaBanLeFilterId').val(),
                    maxGiaBanLeFilter: $('#MaxGiaBanLeFilterId').val(),
                    minTiSuatBanLeFilter: $('#MinTiSuatBanLeFilterId').val(),
                    maxTiSuatBanLeFilter: $('#MaxTiSuatBanLeFilterId').val(),
                    minGiaNhapFilter: $('#MinGiaNhapFilterId').val(),
                    maxGiaNhapFilter: $('#MaxGiaNhapFilterId').val(),
                    minGiaBan1Filter: $('#MinGiaBan1FilterId').val(),
                    maxGiaBan1Filter: $('#MaxGiaBan1FilterId').val(),
                    minTiSuatTheoGiaBan1Filter: $('#MinTiSuatTheoGiaBan1FilterId').val(),
                    maxTiSuatTheoGiaBan1Filter: $('#MaxTiSuatTheoGiaBan1FilterId').val(),
                    minGiaBan2Filter: $('#MinGiaBan2FilterId').val(),
                    maxGiaBan2Filter: $('#MaxGiaBan2FilterId').val(),
                    minTiSuatTheoGiaBan2Filter: $('#MinTiSuatTheoGiaBan2FilterId').val(),
                    maxTiSuatTheoGiaBan2Filter: $('#MaxTiSuatTheoGiaBan2FilterId').val(),
                    minGiaBan3Filter: $('#MinGiaBan3FilterId').val(),
                    maxGiaBan3Filter: $('#MaxGiaBan3FilterId').val(),
                    minTiSuatTheoGiaBan3Filter: $('#MinTiSuatTheoGiaBan3FilterId').val(),
                    maxTiSuatTheoGiaBan3Filter: $('#MaxTiSuatTheoGiaBan3FilterId').val(),
                    iDs_NhomKH2Filter: $('#IDs_NhomKH2FilterId').val(),
                    iDs_NhomKH3Filter: $('#IDs_NhomKH3FilterId').val(),
                    maVachFilter: $('#MaVachFilterId').val(),
                    minQuyCachFilter: $('#MinQuyCachFilterId').val(),
                    maxQuyCachFilter: $('#MaxQuyCachFilterId').val(),
                    iD_DVTQuyCachFilter: $('#ID_DVTQuyCachFilterId').val(),
                    minLoaiBaoHanhFilter: $('#MinLoaiBaoHanhFilterId').val(),
                    maxLoaiBaoHanhFilter: $('#MaxLoaiBaoHanhFilterId').val(),
                    minThoiGianBaoHanhFilter: $('#MinThoiGianBaoHanhFilterId').val(),
                    maxThoiGianBaoHanhFilter: $('#MaxThoiGianBaoHanhFilterId').val(),
                    tenTGBaoHanhFilter: $('#TenTGBaoHanhFilterId').val(),
                    minChiPhiThucHienFilter: $('#MinChiPhiThucHienFilterId').val(),
                    maxChiPhiThucHienFilter: $('#MaxChiPhiThucHienFilterId').val(),
                    chiPhiTinhTheoPTFilter: $('#ChiPhiTinhTheoPTFilterId').val(),
                    tinhCPSauChietKhauFilter: $('#TinhCPSauChietKhauFilterId').val(),
                    ghiChuFilter: $('#GhiChuFilterId').val(),
                    minSoPhutThucHienFilter: $('#MinSoPhutThucHienFilterId').val(),
                    maxSoPhutThucHienFilter: $('#MaxSoPhutThucHienFilterId').val(),
                    minChietKhauMD_NVFilter: $('#MinChietKhauMD_NVFilterId').val(),
                    maxChietKhauMD_NVFilter: $('#MaxChietKhauMD_NVFilterId').val(),
                    chietKhauMD_NVTheoPTFilter: $('#ChietKhauMD_NVTheoPTFilterId').val(),
                    iD_DonViTinhPhu1Filter: $('#ID_DonViTinhPhu1FilterId').val(),
                    minTyLeChuyenDoi1Filter: $('#MinTyLeChuyenDoi1FilterId').val(),
                    maxTyLeChuyenDoi1Filter: $('#MaxTyLeChuyenDoi1FilterId').val(),
                    iD_DonViTinhPhu2Filter: $('#ID_DonViTinhPhu2FilterId').val(),
                    minTyLeChuyenDoi2Filter: $('#MinTyLeChuyenDoi2FilterId').val(),
                    maxTyLeChuyenDoi2Filter: $('#MaxTyLeChuyenDoi2FilterId').val(),
                    iD_DonViTinhPhu3Filter: $('#ID_DonViTinhPhu3FilterId').val(),
                    minTyLeChuyenDoi3Filter: $('#MinTyLeChuyenDoi3FilterId').val(),
                    maxTyLeChuyenDoi3Filter: $('#MaxTyLeChuyenDoi3FilterId').val(),
                    minTinhGiaVonFilter: $('#MinTinhGiaVonFilterId').val(),
                    maxTinhGiaVonFilter: $('#MaxTinhGiaVonFilterId').val(),
                    theoDoiFilter: $('#TheoDoiFilterId').val(),
                    tenKhacFilter: $('#TenKhacFilterId').val(),
                    chatLieuFilter: $('#ChatLieuFilterId').val(),
                    kichCoFilter: $('#KichCoFilterId').val(),
                    mauSacFilter: $('#MauSacFilterId').val(),
                    minTiSuat1Filter: $('#MinTiSuat1FilterId').val(),
                    maxTiSuat1Filter: $('#MaxTiSuat1FilterId').val(),
                    minTiSuat2Filter: $('#MinTiSuat2FilterId').val(),
                    maxTiSuat2Filter: $('#MaxTiSuat2FilterId').val(),
                    minTiSuat3Filter: $('#MinTiSuat3FilterId').val(),
                    maxTiSuat3Filter: $('#MaxTiSuat3FilterId').val(),
                    dM_NhomHangHoaTenNhomFilter: $('#DM_NhomHangHoaTenNhomFilterId').val(),
                    dM_QuocGiaTenNuocFilter: $('#DM_QuocGiaTenNuocFilterId').val(),
                    dM_DoiTuongTenDoiTuongFilter: $('#DM_DoiTuongTenDoiTuongFilterId').val(),
                    dM_ThueSuatThueSuatFilter: $('#DM_ThueSuatThueSuatFilterId').val(),
                    dM_DonViTinhTenDonViTinhFilter: $('#DM_DonViTinhTenDonViTinhFilterId').val()
                })
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditDM_HangHoaModalSaved', function () {
            getDM_HangHoas();
        });

        $('#GetDM_HangHoasButton').click(function (e) {
            e.preventDefault();
            getDM_HangHoas();
        });

        $(document).keypress(function (e) {
            if (e.which === 13) {
                getDM_HangHoas();
            }
        });

    });
})();