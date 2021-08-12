var CongDoanController = function (_modalManager) {
    var _congDoanTab = _modalManager.getModal().find('#DM_DichVuProcessTab');
    var _$dichVuCongDoansTable = $('#DichVuCongDoansTable');
    var _dichVuCongDoansService = abp.services.app.dichVuCongDoans;

    $('.date-picker').datetimepicker({
        locale: abp.localization.currentLanguage.name,
        format: 'L'
    });

    var _permissions = {
        create: abp.auth.hasPermission('Pages.DichVuCongDoans.Create'),
        edit: abp.auth.hasPermission('Pages.DichVuCongDoans.Edit'),
        'delete': abp.auth.hasPermission('Pages.DichVuCongDoans.Delete')
    };

    var _createOrEditModal = new app.ModalManager({
        viewUrl: abp.appPath + 'crm/DichVuCongDoans/CreateOrEditModal',
        scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DichVuCongDoans/_CreateOrEditModal.js',
        modalClass: 'CreateOrEditDichVuCongDoanModal'
    });
    

    var congDoanTable = _$dichVuCongDoansTable.DataTable({
        paging: true,
        serverSide: true,
        processing: true,
        listAction: {
            ajaxFunction: _dichVuCongDoansService.getAll,
            inputFilter: function () {
                return {
                    iD_DichVu: $('input[name=id]').val(),
                    filter: $('#DichVuCongDoansTableFilter').val(),
                    minTimeFilter: $('#MinTimeFilterId').val(),
                    maxTimeFilter: $('#MaxTimeFilterId').val(),
                    dM_HangHoaTenHangHoaFilter: $('#DM_HangHoaTenHangHoaFilterId').val(),
                    congDoanDisplayNameFilter: $('#CongDoanDisplayNameFilterId').val()
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
                                _createOrEditModal.open({ id: data.record.dichVuCongDoan.id });
                            }
                        },
                        {
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deleteDichVuCongDoan(data.record.dichVuCongDoan);
                            }
                        }]
                }
            },
            {
                targets: 1,
                data: "dichVuCongDoan.tenCongDoan"
            },
            {
                targets: 2,
                data: "dichVuCongDoan.orderNumber"
            },
            {
                targets: 3,
                data: "dichVuCongDoan.description"
            },
            {
                targets: 4,
                data: "dichVuCongDoan.time"
            }
            
        ]
    });

    function getDichVuCongDoans() {
        congDoanTable.ajax.reload();
    }

    function deleteDichVuCongDoan(dichVuCongDoan) {
        abp.message.confirm(
            '',
            function (isConfirmed) {
                if (isConfirmed) {
                    _dichVuCongDoansService.delete({
                        id: dichVuCongDoan.id
                    }).done(function () {
                        getDichVuCongDoans(true);
                        abp.notify.success(app.localize('SuccessfullyDeleted'));
                    });
                }
            }
        );
    }

    _congDoanTab.find('#ShowAdvancedFiltersSpan').click(function () {
        _congDoanTab.find('#ShowAdvancedFiltersSpan').hide();
        _congDoanTab.find('#HideAdvancedFiltersSpan').show();
        _congDoanTab.find('#AdvacedAuditFiltersArea').slideDown();
    });

    _congDoanTab.find('#HideAdvancedFiltersSpan').click(function () {
        _congDoanTab.find('#HideAdvancedFiltersSpan').hide();
        _congDoanTab.find('#ShowAdvancedFiltersSpan').show();
        _congDoanTab.find('#AdvacedAuditFiltersArea').slideUp();
    });

    _congDoanTab.find('#CreateNewDichVuCongDoanButton').click(function () {
        _createOrEditModal.open({ dichVuId: $('input[name=id]').val()});
    });

    _congDoanTab.find('#ExportToExcelButton').click(function () {
        _congDoan_DichVusService
            .getCongDoan_DichVusToExcel({
                filter: $('#DichVuCongDoansTableFilter').val(),
                minSTTFilter: $('#MinSTTFilterId').val(),
                maxSTTFilter: $('#MaxSTTFilterId').val(),
                thoiGianFilter: $('#ThoiGianFilterId').val(),
                minSoPhutThucHienFilter: $('#MinSoPhutThucHienFilterId').val(),
                maxSoPhutThucHienFilter: $('#MaxSoPhutThucHienFilterId').val(),
                dM_HangHoaTenHangHoaFilter: $('#DM_HangHoaTenHangHoaFilterId').val(),
                dM_HangHoaTenHangHoa2Filter: $('#DM_HangHoaTenHangHoa2FilterId').val()
            })
            .done(function (result) {
                app.downloadTempFile(result);
            });
    });
    abp.event.on('app.createOrEditDichVuCongDoanModalSaved', function () {
        getDichVuCongDoans();
    });

    _congDoanTab.find('#GetDichVuCongDoansButton').click(function (e) {
        e.preventDefault();
        getDichVuCongDoans();
    });

    $(document).keypress(function (e) {
        if (e.which === 13) {
            getDichVuCongDoans();
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
                                _createOrEditModal.open({ id: data.record.chietKhauMacDinh_NhanVien.id, isHangHoa: false, idHangHoa: _idHangHoa });
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
        _createOrEditModal.open({ isHangHoa: false, idHangHoa: _idHangHoa });
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
    app.modals.CreateOrEditDM_HangHoaModal = function () {

        var _dM_HangHoasService = abp.services.app.dM_HangHoas;

        var _modalManager;
        var _$dM_DichVuInformationForm = null;
        var congDoanControl = null;
        var _dM_NhomHangHoaLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_DichVus/DM_NhomHangHoaLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_DichVus/_DM_NhomHangHoaLookupTableModal.js',
            modalClass: 'DM_NhomHangHoaLookupTableModal'
        });
        var _dM_QuocGiaLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_DichVus/DM_QuocGiaLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_DichVus/_DM_QuocGiaLookupTableModal.js',
            modalClass: 'DM_QuocGiaLookupTableModal'
        });
        var _dM_DoiTuongLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_DichVus/DM_DoiTuongLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_DichVus/_DM_DoiTuongLookupTableModal.js',
            modalClass: 'DM_DoiTuongLookupTableModal'
        });
        var _dM_ThueSuatLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_DichVus/DM_ThueSuatLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_DichVus/_DM_ThueSuatLookupTableModal.js',
            modalClass: 'DM_ThueSuatLookupTableModal'
        });
        var _dM_DonViTinhLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_DichVus/DM_DonViTinhLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_DichVus/_DM_DonViTinhLookupTableModal.js',
            modalClass: 'DM_DonViTinhLookupTableModal'
        });
        var _dM_NhomKhachHangLookupTableModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_DichVus/DM_NhomKhachHangLookupTableModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_DichVus/_DM_NhomKhachHangLookupTableModal.js',
            modalClass: 'DM_NhomKhachHangLookupTableModal'
        });

        this.init = function (modalManager) {
            _modalManager = modalManager;

            var modal = _modalManager.getModal();
            modal.find('.numeric').number( true, 0 );
            modal.find('.select2').select2(
                {
                    placeholder: 'Select an option',
                    width: '100%'
                });
            modal.find('.date-picker').datetimepicker({
                locale: abp.localization.currentLanguage.name,
                format: 'L'
            });
            
            modal.find('.date-picker').each(function () {
                if ($(this).val() == "01/01/0001") {
                    $(this).data("DateTimePicker").date(new Date());
                }
            })

            _$dM_DichVuInformationForm = _modalManager.getModal().find('form[name=DM_DichVuCommonInforForm]');
            _$dM_DichVuInformationForm.validate();
        };

        $('#OpenDM_NhomHangHoaLookupTableButton').click(function () {

            var dM_HangHoa = _$dM_DichVuInformationForm.serializeFormToObject();

            _dM_NhomHangHoaLookupTableModal.open({ id: dM_HangHoa.dM_NhomHangHoaId, displayName: dM_HangHoa.dM_NhomHangHoaTenNhom }, function (data) {
                _$dM_DichVuInformationForm.find('input[name=dM_NhomHangHoaTenNhom]').val(data.displayName);
                _$dM_DichVuInformationForm.find('input[name=dM_NhomHangHoaId]').val(data.id);
            });
        });

        $('#ClearDM_NhomHangHoaTenNhomButton').click(function () {
            _$dM_DichVuInformationForm.find('input[name=dM_NhomHangHoaTenNhom]').val('');
            _$dM_DichVuInformationForm.find('input[name=dM_NhomHangHoaId]').val('');
        });

        $('#OpenDM_QuocGiaLookupTableButton').click(function () {

            var dM_HangHoa = _$dM_DichVuInformationForm.serializeFormToObject();

            _dM_QuocGiaLookupTableModal.open({ id: dM_HangHoa.dM_QuocGiaId, displayName: dM_HangHoa.dM_QuocGiaTenNuoc }, function (data) {
                _$dM_DichVuInformationForm.find('input[name=dM_QuocGiaTenNuoc]').val(data.displayName);
                _$dM_DichVuInformationForm.find('input[name=dM_QuocGiaId]').val(data.id);
            });
        });

        $('#ClearDM_QuocGiaTenNuocButton').click(function () {
            _$dM_DichVuInformationForm.find('input[name=dM_QuocGiaTenNuoc]').val('');
            _$dM_DichVuInformationForm.find('input[name=dM_QuocGiaId]').val('');
        });

        $('#OpenDM_DoiTuongLookupTableButton').click(function () {

            var dM_HangHoa = _$dM_DichVuInformationForm.serializeFormToObject();

            _dM_DoiTuongLookupTableModal.open({ id: dM_HangHoa.dM_DoiTuongId, displayName: dM_HangHoa.dM_DoiTuongTenDoiTuong }, function (data) {
                _$dM_DichVuInformationForm.find('input[name=dM_DoiTuongTenDoiTuong]').val(data.displayName);
                _$dM_DichVuInformationForm.find('input[name=dM_DoiTuongId]').val(data.id);
            });
        });

        $('#ClearDM_DoiTuongTenDoiTuongButton').click(function () {
            _$dM_DichVuInformationForm.find('input[name=dM_DoiTuongTenDoiTuong]').val('');
            _$dM_DichVuInformationForm.find('input[name=dM_DoiTuongId]').val('');
        });

        $('#OpenDM_ThueSuatLookupTableButton').click(function () {

            var dM_HangHoa = _$dM_DichVuInformationForm.serializeFormToObject();

            _dM_ThueSuatLookupTableModal.open({ id: dM_HangHoa.dM_ThueSuatId, displayName: dM_HangHoa.dM_ThueSuatThueSuat }, function (data) {
                _$dM_DichVuInformationForm.find('input[name=dM_ThueSuatThueSuat]').val(data.displayName);
                _$dM_DichVuInformationForm.find('input[name=dM_ThueSuatId]').val(data.id);
            });
        });

        $('#ClearDM_ThueSuatThueSuatButton').click(function () {
            _$dM_DichVuInformationForm.find('input[name=dM_ThueSuatThueSuat]').val('');
            _$dM_DichVuInformationForm.find('input[name=dM_ThueSuatId]').val('');
        });

        $('#OpenDM_DonViTinhLookupTableButton').click(function () {

            var dM_HangHoa = _$dM_DichVuInformationForm.serializeFormToObject();

            _dM_DonViTinhLookupTableModal.open({ id: dM_HangHoa.dM_DonViTinhId, displayName: dM_HangHoa.dM_DonViTinhTenDonViTinh }, function (data) {
                _$dM_DichVuInformationForm.find('input[name=dM_DonViTinhTenDonViTinh]').val(data.displayName);
                _$dM_DichVuInformationForm.find('input[name=dM_DonViTinhId]').val(data.id);
            });
        });

        $('#ClearDM_DonViTinhTenDonViTinhButton').click(function () {
            _$dM_DichVuInformationForm.find('input[name=dM_DonViTinhTenDonViTinh]').val('');
            _$dM_DichVuInformationForm.find('input[name=dM_DonViTinhId]').val('');
        });

        $('#OpenDM_DonViTinhQuyCachLookupTableButton').click(function () {

            var dM_HangHoa = _$dM_DichVuInformationForm.serializeFormToObject();

            _dM_DonViTinhLookupTableModal.open({ id: dM_HangHoa.iD_DVTQuyCach, displayName: dM_HangHoa.dM_DonViTinhQuyCachTenDonViTinh }, function (data) {
                _$dM_DichVuInformationForm.find('input[name=dM_DonViTinhQuyCachTenDonViTinh]').val(data.displayName);
                _$dM_DichVuInformationForm.find('input[name=iD_DVTQuyCach]').val(data.id);
            });
        });

        $('#ClearDM_DonViTinhQuyCachTenDonViTinhButton').click(function () {
            _$dM_DichVuInformationForm.find('input[name=dM_DonViTinhQuyCachTenDonViTinh]').val('');
            _$dM_DichVuInformationForm.find('input[name=iD_DVTQuyCach]').val('');
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

        $('#DM_DichVuProcessTabLink').click(function () {
            
            congDoanControl = congDoanControl == null ? CongDoanController(_modalManager) : congDoanControl;
        });
        
        this.save = function () {
            if (!_$dM_DichVuInformationForm.valid()) {
                return;
            }

            var dM_DichVuInfo = _$dM_DichVuInformationForm.serializeFormToObject();
            _modalManager.setBusy(true);
            
            _dM_HangHoasService.createOrEdit(
                dM_DichVuInfo
            ).done(function () {
                abp.notify.info(app.localize('SavedSuccessfully'));
                _modalManager.close();
                abp.event.trigger('app.createOrEditDM_DichVuModalSaved');
            }).always(function () {
                _modalManager.setBusy(false);
            });
        };
    };
})(jQuery);
(function () {
    $(function () {

        var _$DM_DichVusTable = $('#DM_DichVusTable');
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
            viewUrl: abp.appPath + 'crm/DM_DichVus/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_DichVus/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditDM_HangHoaModal'
        });

        var _viewDM_HangHoaModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_DichVus/ViewdM_HangHoaModal',
            modalClass: 'ViewDM_HangHoaModal'
        });

        var dataTable = _$DM_DichVusTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _dM_HangHoasService.getAll,
                inputFilter: function () {
                    return {
                        filter: $('#DM_DichVusTableFilter').val(),
                        isHangHoa: false,
                        maHangHoaFilter: $('#MaHangHoaFilterId').val(),
                        tenHangHoaFilter: $('#TenHangHoaFilterId').val(),
                        tenKhacFilter: $('#TenKhacFilterId').val(),
                        dM_NhomHangHoaTenNhomFilter: $('#DM_NhomHangHoaTenNhomFilterId').val(),
                        minGiaBanLeFilter: $('#MinGiaBanLeFilterId').val(),
                        maxGiaBanLeFilter: $('#MaxGiaBanLeFilterId').val(),
                        ghiChuFilter: $('#GhiChuFilterId').val(),
                        minSoPhutThucHienFilter: $('#MinSoPhutThucHienFilterId').val(),
                        maxSoPhutThucHienFilter: $('#MaxSoPhutThucHienFilterId').val(),
                        theoDoiFilter: $('#TheoDoiFilterId').val()


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
                    data: "dM_HangHoa.tenKhac"
                },

                {
                    targets: 4,
                    data: "dM_NhomHangHoaTenNhom"
                },
                {
                    targets: 5,
                    data: "dM_HangHoa.giaBanLe",
                    render: function (giaBanLe) {
                        return '<span class="numeric-cell">' + $.number(giaBanLe, 0) + '</span>'; 
                    }
                },
                {
                    targets: 6,
                    data: "dM_HangHoa.ghiChu"
                },
                {
                    targets: 7,
                    data: "dM_HangHoa.soPhutThucHien"
                },
                {
                    targets: 8,
                    data: "dM_HangHoa.theoDoi",
                    render: function (theoDoi) {
                        if (theoDoi) {
                            return '<i class="la la-check-square m--font-success" title="True"></i>';
                        }
                        return '<i class="la la-times-circle" title="False"></i>';
                    }

                }
                
                
            ]
        });


        function getDM_DichVus() {
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
                            getDM_DichVus(true);
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

        $('#CreateNewDM_DichVuButton').click(function () {
            _createOrEditModal.open();
        });

        $('#ExportToExcelButton').click(function () {
            _dM_HangHoasService
                .getDM_DichVusToExcel({
                    filter: $('#DM_DichVusTableFilter').val(),
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
            getDM_DichVus();
        });

        $('#GetDM_DichVusButton').click(function (e) {
            e.preventDefault();
            getDM_DichVus();
        });

        $(document).keypress(function (e) {
            if (e.which === 13) {
                getDM_DichVus();
            }
        });

    });
})();