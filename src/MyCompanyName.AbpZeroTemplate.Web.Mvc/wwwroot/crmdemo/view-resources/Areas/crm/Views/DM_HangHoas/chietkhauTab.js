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