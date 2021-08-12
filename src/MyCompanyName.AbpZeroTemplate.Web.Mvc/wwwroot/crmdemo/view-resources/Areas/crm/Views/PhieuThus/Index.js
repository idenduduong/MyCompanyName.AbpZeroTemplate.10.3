(function () {
    $(function () {

        var _$phieuThusTable = $('#PhieuThusTable');
        var _phieuThusService = abp.services.app.phieuThus;

        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.PhieuThus.Create'),
            edit: abp.auth.hasPermission('Pages.PhieuThus.Edit'),
            editLater: abp.auth.hasPermission('Pages.PhieuThu.EditLater'),
            'delete': abp.auth.hasPermission('Pages.PhieuThus.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/PhieuThus/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/PhieuThus/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditPhieuThuModal'
        });

        var _viewPhieuThuModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/PhieuThus/ViewphieuThuModal',
            modalClass: 'ViewPhieuThuModal'
        });

        var dataTable = _$phieuThusTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _phieuThusService.getAllPhieuThu,
                inputFilter: function () {
                    return {
                        filter: $('#PhieuThusTableFilter').val(),
                        maPhieuThuFilter: $('#MaPhieuThuFilterId').val(),
                        minNgayLapPhieuFilter: $('#MinNgayLapPhieuFilterId').val(),
                        maxNgayLapPhieuFilter: $('#MaxNgayLapPhieuFilterId').val(),
                        minNgayVaoSoFilter: $('#MinNgayVaoSoFilterId').val(),
                        maxNgayVaoSoFilter: $('#MaxNgayVaoSoFilterId').val(),
                        minTyGiaFilter: $('#MinTyGiaFilterId').val(),
                        maxTyGiaFilter: $('#MaxTyGiaFilterId').val(),
                        nguoiNopTienFilter: $('#NguoiNopTienFilterId').val(),
                        noiDungThuFilter: $('#NoiDungThuFilterId').val(),
                        minTongTienThuFilter: $('#MinTongTienThuFilterId').val(),
                        maxTongTienThuFilter: $('#MaxTongTienThuFilterId').val(),
                        thuCuaNhieuDoiTuongFilter: $('#ThuCuaNhieuDoiTuongFilterId').val(),
                        userLapFilter: $('#UserLapFilterId').val(),
                        userNameFilter: $('#UserNameFilterId').val(),
                        dM_TienTeMaNgoaiTeFilter: $('#DM_TienTeMaNgoaiTeFilterId').val(),
                        dM_DoiTuongTenDoiTuongFilter: $('#DM_DoiTuongTenDoiTuongFilterId').val(),
                        organizationUnitDisplayNameFilter: $('#OrganizationUnitDisplayNameFilterId').val()
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
                                visible: function (data) {
                                    return (_permissions.edit && ((new moment(data.record.phieuThu.ngayLapPhieu)).add(1, 'days').format("YYYYMMDD") > (new moment()).format("YYYYMMDD") || ((new moment(data.record.phieuThu.ngayLapPhieu)).add(1, 'days').format("YYYYMMDD") == (new moment()).format("YYYYMMDD") && (new moment()).format("HHmm") <= "1100")))
                                        || (_permissions.editLater && (new moment(data.record.phieuThu.ngayLapPhieu)).add(1, 'days').format("YYYYMMDD") != (new moment()).format("YYYYMMDD"));
                                },
                                action: function (data) {
                                    _createOrEditModal.open({ id: data.record.phieuThu.id });
                                }
                            },
                            {
                                text: app.localize('Delete'),
                                visible: function () {
                                    return _permissions.delete;
                                },
                                action: function (data) {
                                    deletePhieuThu(data.record.phieuThu);
                                }
                            }]
                    }
                },
                {
                    targets: 1,
                    data: "phieuThu.maPhieuThu"
                },
                {
                    targets: 2,
                    data: "phieuThu.ngayLapPhieu",
                    render: function (ngayLapPhieu) {
                        if (ngayLapPhieu) {
                            return moment(ngayLapPhieu).format('L');
                        }
                        return "";
                    }

                },
                {
                    targets: 3,
                    data: "phieuThu.ngayVaoSo",
                    render: function (ngayVaoSo) {
                        if (ngayVaoSo) {
                            return moment(ngayVaoSo).format('L');
                        }
                        return "";
                    }

                },
                {
                    targets: 4,
                    data: "phaiThanhToan"
                    
                },
                {
                    targets: 5,
                    data: "phieuThu.tongTienThu"
                },
                {
                    targets: 6,
                    data: "conNo",
                },
                {
                    targets: 7,
                    data: "phieuThu.noiDungThu"
                },
                
                {
                    targets: 8,
                    data: "userName"
                },
                {
                    targets: 9,
                    data: "organizationUnitDisplayName"
                },
                {
                    targets: 10,
                    data: "phieuThu.nguoiNopTien"
                }
            ]
        });


        function getPhieuThus() {
            dataTable.ajax.reload();
        }

        function deletePhieuThu(phieuThu) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _phieuThusService.delete({
                            id: phieuThu.id
                        }).done(function () {
                            getPhieuThus(true);
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

        $('#CreateNewPhieuThuButton').click(function () {
            _createOrEditModal.open();
        });

        $('#ExportToExcelButton').click(function () {
            _phieuThusService
                .getPhieuThusToExcel({
                    filter: $('#PhieuThusTableFilter').val(),
                    maPhieuThuFilter: $('#MaPhieuThuFilterId').val(),
                    minNgayLapPhieuFilter: $('#MinNgayLapPhieuFilterId').val(),
                    maxNgayLapPhieuFilter: $('#MaxNgayLapPhieuFilterId').val(),
                    minNgayVaoSoFilter: $('#MinNgayVaoSoFilterId').val(),
                    maxNgayVaoSoFilter: $('#MaxNgayVaoSoFilterId').val(),
                    minTyGiaFilter: $('#MinTyGiaFilterId').val(),
                    maxTyGiaFilter: $('#MaxTyGiaFilterId').val(),
                    nguoiNopTienFilter: $('#NguoiNopTienFilterId').val(),
                    noiDungThuFilter: $('#NoiDungThuFilterId').val(),
                    minTongTienThuFilter: $('#MinTongTienThuFilterId').val(),
                    maxTongTienThuFilter: $('#MaxTongTienThuFilterId').val(),
                    thuCuaNhieuDoiTuongFilter: $('#ThuCuaNhieuDoiTuongFilterId').val(),
                    userLapFilter: $('#UserLapFilterId').val(),
                    userNameFilter: $('#UserNameFilterId').val(),
                    dM_TienTeMaNgoaiTeFilter: $('#DM_TienTeMaNgoaiTeFilterId').val(),
                    dM_DoiTuongTenDoiTuongFilter: $('#DM_DoiTuongTenDoiTuongFilterId').val(),
                    organizationUnitDisplayNameFilter: $('#OrganizationUnitDisplayNameFilterId').val()
                })
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditPhieuThuModalSaved', function () {
            getPhieuThus();
        });

        $('#GetPhieuThusButton').click(function (e) {
            e.preventDefault();
            getPhieuThus();
        });

        $(document).keypress(function (e) {
            if (e.which === 13) {
                getPhieuThus();
            }
        });

    });
})();