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