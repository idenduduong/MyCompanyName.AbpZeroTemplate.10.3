(function () {
    $(function () {

        var _$dM_ViTrisTable = $('#DM_ViTrisTable');
        var _dM_ViTrisService = abp.services.app.dM_ViTris;

        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.Categories.DM_ViTris.Create'),
            edit: abp.auth.hasPermission('Pages.Categories.DM_ViTris.Edit'),
            'delete': abp.auth.hasPermission('Pages.Categories.DM_ViTris.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_ViTris/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_ViTris/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditDM_ViTriModal'
        });

        var _viewDM_ViTriModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_ViTris/ViewdM_ViTriModal',
            modalClass: 'ViewDM_ViTriModal'
        });

        var dataTable = _$dM_ViTrisTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _dM_ViTrisService.getAll,
                inputFilter: function () {
                    return {
                        filter: $('#DM_ViTrisTableFilter').val(),
                        maViTriFilter: $('#MaViTriFilterId').val(),
                        tinhTrangFilter: $('#TinhTrangFilterId').val(),
                        ghiChuFilter: $('#GhiChuFilterId').val(),
                        minDonGiaGioFilter: $('#MinDonGiaGioFilterId').val(),
                        maxDonGiaGioFilter: $('#MaxDonGiaGioFilterId').val(),
                        anhFilter: $('#AnhFilterId').val(),
                        minDonGiaNgayFilter: $('#MinDonGiaNgayFilterId').val(),
                        maxDonGiaNgayFilter: $('#MaxDonGiaNgayFilterId').val(),
                        minTangFilter: $('#MinTangFilterId').val(),
                        maxTangFilter: $('#MaxTangFilterId').val(),
                        tenViTriFilter: $('#TenViTriFilterId').val(),
                        dM_LoaiPhongTenLoaiFilter: $('#DM_LoaiPhongTenLoaiFilterId').val(),
                        dM_KhuVucTenKhuVucFilter: $('#DM_KhuVucTenKhuVucFilterId').val()
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
                                    _viewDM_ViTriModal.open({ data: data.record });
                                }
                            },
                            {
                                text: app.localize('Edit'),
                                visible: function () {
                                    return _permissions.edit;
                                },
                                action: function (data) {
                                    _createOrEditModal.open({ id: data.record.dM_ViTri.id });
                                }
                            },
                            {
                                text: app.localize('Delete'),
                                visible: function () {
                                    return _permissions.delete;
                                },
                                action: function (data) {
                                    deleteDM_ViTri(data.record.dM_ViTri);
                                }
                            }]
                    }
                },
                {
                    targets: 1,
                    data: "dM_ViTri.maViTri"
                },
                {
                    targets: 2,
                    data: "dM_ViTri.tinhTrang",
                    render: function (tinhTrang) {
                        if (tinhTrang) {
                            return '<i class="la la-check-square m--font-success" title="True"></i>';
                        }
                        return '<i class="la la-times-circle" title="False"></i>';
                    }

                },
                {
                    targets: 3,
                    data: "dM_ViTri.ghiChu"
                },
                //{
                //	targets: 4,
                //	 data: "dM_ViTri.userTao"   
                //},
                //{
                //	targets: 5,
                //	 data: "dM_ViTri.ngayTao" ,
                //render: function (ngayTao) {
                //	if (ngayTao) {
                //		return moment(ngayTao).format('L');
                //	}
                //	return "";
                //}

                //},
                //{
                //	targets: 6,
                //	 data: "dM_ViTri.userSuaCuoi"   
                //},
                //{
                //	targets: 4,
                //	 data: "dM_ViTri.ngaySuaCuoi" ,
                //render: function (ngaySuaCuoi) {
                //	if (ngaySuaCuoi) {
                //		return moment(ngaySuaCuoi).format('L');
                //	}
                //	return "";
                //}

                //},
                {
                    targets: 4,
                    data: "dM_ViTri.donGiaGio"
                },
                {
                    targets: 5,
                    data: "dM_ViTri.donGiaNgay"
                },
                {
                    targets: 6,
                    data: "dM_ViTri.anh"
                },

                {
                    targets: 7,
                    data: "dM_ViTri.tang"
                },
                {
                    targets: 8,
                    data: "dM_ViTri.tenViTri"
                },
                {
                    targets: 9,
                    data: "dM_LoaiPhongTenLoai"
                },
                {
                    targets: 10,
                    data: "dM_KhuVucTenKhuVuc"
                }
            ]
        });


        function getDM_ViTris() {
            dataTable.ajax.reload();
        }

        function deleteDM_ViTri(dM_ViTri) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _dM_ViTrisService.delete({
                            id: dM_ViTri.id
                        }).done(function () {
                            getDM_ViTris(true);
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

        $('#CreateNewDM_ViTriButton').click(function () {
            _createOrEditModal.open();
        });

        $('#ExportToExcelButton').click(function () {
            _dM_ViTrisService
                .getDM_ViTrisToExcel({
                    filter: $('#DM_ViTrisTableFilter').val(),
                    maViTriFilter: $('#MaViTriFilterId').val(),
                    tinhTrangFilter: $('#TinhTrangFilterId').val(),
                    ghiChuFilter: $('#GhiChuFilterId').val(),
                    minDonGiaGioFilter: $('#MinDonGiaGioFilterId').val(),
                    maxDonGiaGioFilter: $('#MaxDonGiaGioFilterId').val(),
                    anhFilter: $('#AnhFilterId').val(),
                    minDonGiaNgayFilter: $('#MinDonGiaNgayFilterId').val(),
                    maxDonGiaNgayFilter: $('#MaxDonGiaNgayFilterId').val(),
                    minTangFilter: $('#MinTangFilterId').val(),
                    maxTangFilter: $('#MaxTangFilterId').val(),
                    tenViTriFilter: $('#TenViTriFilterId').val(),
                    dM_LoaiPhongTenLoaiFilter: $('#DM_LoaiPhongTenLoaiFilterId').val(),
                    dM_KhuVucTenKhuVucFilter: $('#DM_KhuVucTenKhuVucFilterId').val()
                })
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditDM_ViTriModalSaved', function () {
            getDM_ViTris();
        });

        $('#GetDM_ViTrisButton').click(function (e) {
            e.preventDefault();
            getDM_ViTris();
        });

        $(document).keypress(function (e) {
            if (e.which === 13) {
                getDM_ViTris();
            }
        });

    });
})();