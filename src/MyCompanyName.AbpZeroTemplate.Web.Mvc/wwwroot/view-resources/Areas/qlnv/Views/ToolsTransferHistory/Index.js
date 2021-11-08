(function () {
    $(function () {

        var _$entitiesTable = $('#EntitiesTable');
        var _$entitiesTableFilter = $('#EntitiesTableFilter');
        var _$maFilterId = $('#MaFilterId');
        var _$tenFilterId = $('#TenFilterId');
        var _$address = $('#address');
        var _$tel = $('#tel');
        var _$unit = $('#unitName');
        var _$province = $('#provinceName');
        var _$commune = $('#communeName');
        

        var _$service = abp.services.app.tools;
        
        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.Tools.Create'),
            edit: abp.auth.hasPermission('Pages.Tools.Edit'),
            'delete': abp.auth.hasPermission('Pages.Tools.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'qlnv/Tools/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/qlnv/Views/ToolsTransferHistory/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditModal'
            //viewUrl: abp.appPath + 'qlnv/DM_QuanHuyens/CreateOrEditModal',
            //scriptUrl: abp.appPath + 'crmdemo/view-resources/Areas/crm/Views/DM_QuanHuyens/_CreateOrEditModal.js',
            //modalClass: 'CreateOrEditDM_QuanHuyenModal'
        });
		var _viewModal = new app.ModalManager({
            viewUrl: abp.appPath + 'qlnv/Tools/ViewModal',
            modalClass: 'ViewModal'
            //viewUrl: abp.appPath + 'qlnv/DM_QuanHuyens/ViewdM_QuanHuyenModal',
            //modalClass: 'ViewDM_QuanHuyenModal'
        });

        var dataTable = _$entitiesTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _$service.getAll,
                inputFilter: function () {
                    return {
                        filter: _$entitiesTableFilter.val(),
                        pOSCode: _$maFilterId.val(),
                        pOSName: _$tenFilterId.val(),
                        address: _$address.val(),
                        communeName: _$commune.val(),
                        provinceName: _$province.val(),
                        unitName: _$unit.val(),
                        tel: _$tel.val()
                    };
                }
            },
            columnDefs: [
                {
                    width: "10",
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

                                    _viewModal.open({ data: data.record});
                            }
                        },
						{
                            text: app.localize('Edit'),
                            visible: function () {
                                return _permissions.edit;
                            },
                            action: function (data) {
                                _createOrEditModal.open({ id: data.record.tool.id });
                            }
                        }, 
						{
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deleteEntity(data.record.tool);
                            }
                        }]
                    }
                },
                {
					targets: 1,
                    data: "tool.posCode"
                },
                {
                    targets: 2,
                    data: "posName"
                },
				{
					targets: 3,
                    data: "tool.toolName"
                },
                {
					targets: 4,
                    data: "tool.tool_Type",
                    name: "type",
                    render: function (tool_Type) {
                        return abp.localization.localize('ToolType_' + tool_Type, 'AbpZeroTemplate');
                    }
                },
                {
                    targets: 5,
                    data: "tool.serial"
                },
                {
                    targets: 6,
                    data: "tool.usedFrom"
                },
                {
                    targets: 7,
                    data: "tool.configuration"
                },
                {
                    targets: 8,
                    data: "tool.condition",
                    name: "condition",
                    render: function (condition) {
                        return abp.localization.localize('ToolCondition_' + condition, 'AbpZeroTemplate');
                    }
                },
                {
                    targets: 9,
                    data: "tool.toolStatus",
                    name: "status",
                    render: function (status) {
                        return abp.localization.localize('ToolStatus_' + status, 'AbpZeroTemplate');
                    }
                },
                {
                    targets: 10,
                    data: "tool.note"
                }
            ]
        });

        function getEntities() {
            dataTable.ajax.reload();
        }

        function deleteEntity(dM_QuanHuyen) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _$service.delete({
                            id: dM_QuanHuyen.id
                        }).done(function () {
                            getEntities(true);
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

        $('#CreateNew').click(function () {
            _createOrEditModal.open();
        });

		$('#ExportToExcelButton').click(function () {
            _$service
                .getEntitiesToExcel({
                    filter: _$entitiesTableFilter.val(),
                    maQuanHuyenFilter: _$maFilterId.val(),
                    tenQuanHuyenFilter: _$tenFilterId.val(),
                    ghiChuFilter: _$ghiChuFilterId.val(),
                    dM_TinhThanhTenTinhThanhFilter: _$dM_TinhThanhTenTinhThanhFilterId.val()
				})
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditModalSaved', function () {
            getEntities();
        });

        $('#GetEntitiesButton').click(function (e) {
            e.preventDefault();
            getEntities();
        });

		$(document).keypress(function(e) {
		  if(e.which === 13) {
              getEntities();
		  }
		});

    });
})();

(function () {
    $(function () {

        var _$theKhachHangsTable = $('#TheKhachHangsTable');
        var _$theKhachHangChiTietsTable = $('#TheKhachHangChiTietsTable');
        var _$nhatKySuDungThesTable = $('#NhatKySuDungThesTable');
        var _$theKhachHangHistorysTable = $('#LichSuChinhSuas');
        var _$lichSuThanhToansTable = $('#LichSuThanhToansTable');

        var _theKhachHangsService = abp.services.app.theKhachHangs;
        var _theKhachHangChiTietsService = abp.services.app.theKhachHangChiTiets;
        var _nhatKySuDungThesService = abp.services.app.nhatKySuDungThes;
        var _phieuThusService = abp.services.app.phieuThus;
        var _suDungTheService = abp.services.app.suDungThe;

        Number.prototype.pad = function (size) {
            var s = String(this);
            while (s.length < (size || 2)) { s = "0" + s; }
            return s;
        }
        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.TheKhachHangs.Create'),
            edit: abp.auth.hasPermission('Pages.TheKhachHangs.Edit'),
            'delete': abp.auth.hasPermission('Pages.TheKhachHangs.Delete'),
            'suDungThe': abp.auth.hasPermission('Pages.TheKhachHang.SuDungThe'),
            editLaterNhatKy: abp.auth.hasPermission('Pages.NhatKySuDungThes.EditLater'),
            editPhieuThu: abp.auth.hasPermission('Pages.PhieuThus.Edit'),
            deletePhieuThu: abp.auth.hasPermission('Pages.PhieuThus.Delete'),
            editLaterPhieuThu: abp.auth.hasPermission('Pages.PhieuThu.EditLater')
        };

        var _createOrEditTheLanModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/TheKhachHangs/CreateOrEditTheLanModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/TheKhachHangs/_CreateOrEditTheLanModal.js',
            modalClass: 'CreateOrEditTheLanModal',
            width: '100%'
        });

        var _createOrEditTheGiaTriModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/TheKhachHangs/CreateOrEditTheGiaTriModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/TheKhachHangs/_CreateOrEditTheGiaTriModal.js',
            modalClass: 'CreateOrEditTheGiaTriModal',
            width: '60%'
        })

        var _viewTheKhachHangModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/TheKhachHangs/ViewtheKhachHangModal',
            modalClass: 'ViewTheKhachHangModal'
        });

        var _suDungTheModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/HoaDonBanLes/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/HoaDonBanLes/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditHoaDonBanLeModal',
            width: '80%'
        });

        var _deleteNhatKySuDung = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/HoaDonBanLes/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/HoaDonBanLes/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditHoaDonBanLeModal',
            width: '80%'
        });

        var _thanhToanTheModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/PhieuThus/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/PhieuThus/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditPhieuThuModal',
            width: '50%'
        });

        // datatable
        var lstTheKhachHangTable = _$theKhachHangsTable.DataTable({
            orderCellsTop: true,
            fixedHeader: true,
            "scrollY": "200px",
            "scrollCollapse": false,
            "initComplete": function (settings, json) {
                $('.lstTheKhachHang').find('.bottom').appendTo('.custom-pagination-position')
            },
            paging: true,
            serverSide: true,
            processing: true,
            drawCallback: function (settings) {

                lstTheKhachHangTable.row(':eq(0)', { page: 'current' }).select();
            },
            listAction: {
                ajaxFunction: _theKhachHangsService.getAll,
                inputFilter: function () {
                    return {
                        filter: $('#TheKhachHangsTableFilter').val(),
                        isTheLan: $('.loaithe.active').attr('isTheLan'),
                        maTheFilter: $('#MaTheFilterId').val(),
                        organizationUnitDisplayNameFilter: $('#OrganizationUnitDisplayNameFilterId').val(),
                        dM_DacDiemKhachHangTenDacDiemFilter: $('#DM_DacDiemKhachHangTenDacDiemFilterId').val(),
                        dM_DoiTuongMaFilter: $('#DM_DoiTuongMaFilter').val(),
                        dM_DoiTuongPhoneFilter: $('#DM_DoiTuongPhoneFilter').val(),
                        dM_DoiTuongDiaChiFilter: $('#DM_DoiTuongDiaChiFilter').val(),
                        dM_DoiTuongCMTFilter: $('#DM_DoiTuongCMTFilter').val(),
                        dM_DoiTuongTenDoiTuongFilter: $('#DM_DoiTuongTenDoiTuongFilter').val(),
                        maVoucherFilter: $('#MaVoucherFilter').val(),
                    };
                }
            },
            columnDefs: [


                {
                    targets: 0,
                    data: "dM_DoiTuongMaDoiTuong"
                },
                {
                    targets: 1,
                    data: "dM_DoiTuongTenDoiTuong"
                },

                {
                    targets: 2,
                    data: "dM_DoiTuongPhone"
                },
                {
                    targets: 3,
                    data: "dM_DoiTuongCMT"
                },
                {
                    targets: 4,
                    data: "theKhachHang.maThe"
                },
                {
                    targets: 5,
                    data: "theKhachHang.ngayMua",
                    render: function (ngayMua) {
                        if (ngayMua) {
                            return moment(ngayMua).format('L');
                        }
                        return "";
                    }

                },
                {
                    targets: 6,
                    data: "theKhachHang.ngayHuy",
                    render: function (ngayMua) {
                        if (ngayMua) {
                            return moment(ngayMua).format('L');
                        }
                        return "";
                    }

                },


                //{
                //    targets: 5,
                //    data: "theKhachHang.menhGiaThe"
                //},

                {
                    targets: 7,
                    data: "seller"
                },


                {
                    targets: 8,
                    data: "organizationUnitDisplayName"
                },
            ],
            createdRow: function (row, data, dataIndex) {

                if (new Date(data.theKhachHang.ngayHetHan) < new Date()) {
                    $(row).addClass('expired-service');
                }
                if (data.theKhachHang.status == false) {
                    $(row).addClass('stoped-service');
                    return;
                }
                if (data.theKhachHang.huyThe == true) {
                    $(row).addClass('canceled-service');
                    return;
                }

            },
            select: {
                style: 'single'
            }
        });

        var lstChitietTheTable = _$theKhachHangChiTietsTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _theKhachHangChiTietsService.getAll,
                inputFilter: function () {

                    return {
                        iD_TheKhachHang: getCurrentTheKhachHangId()
                    };
                }
            },
            columnDefs: [
                {
                    width: 20,
                    targets: 0,
                    data: null,
                    orderable: false,
                    defaultContent: '',
                    rowAction: [
                        {
                            visible: function () {
                                return _permissions.suDungThe;
                            },
                            element: $('<button class="btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--pill" title="' + app.localize('SuDung') + '"><i class="la la-play"></i></button>')
                                .click(function () {
                                    var data = $(this).data();

                                    var theKhachHang = getCurrentTheKhachHang();
                                    var ngayMua = new Date(theKhachHang.theKhachHang.ngayMua);
                                    var ngayMuaString = ngayMua.getFullYear().toString() + ngayMua.getMonth().pad() + ngayMua.getDate().pad();
                                    var currentDate = new Date();
                                    var currentDateString = currentDate.getFullYear().toString() + currentDate.getMonth().pad() + currentDate.getDate().pad();
                                    if (new Date(theKhachHang.theKhachHang.ngayHetHan) < new Date()) {
                                        abp.notify.info(app.localize('TheDaHetHanSuDung'));
                                        return;
                                    }
                                    if (data.theKhachHangChiTiet.traLaiHHDV) {
                                        abp.notify.info(app.localize('DichVuDaTraLai'));
                                        return;
                                    }
                                    //if(theKhachHang.theKhachHang.createdDate ==)
                                    //if (theKhachHang.theKhachHang.soDu) {

                                    //}
                                    // todo
                                    if (!theKhachHang.laDonViThucHien) {
                                        abp.notify.success(app.localize('KhongPhaiDonViThucHien'));
                                        return;
                                    }

                                    if (data.theKhachHangChiTiet.soLuongDaSuDung === (data.theKhachHangChiTiet.soLuong + data.theKhachHangChiTiet.soLuongTang)) {
                                        abp.notify.info(app.localize('HetSoLanSuDung'));
                                        return;
                                    }
                                    if (new Date(theKhachHang.theKhachHang.ngayApDung) > new Date()) {
                                        abp.notify.info(app.localize('TheChuaDenThoiGianApDung'));
                                        return;
                                    }
                                    debugger;
                                    if (ngayMuaString !== currentDateString) {
                                        if (!(data.theKhachHangChiTiet.soLuongTang > 0) && !data.theKhachHangChiTiet.laSoLuongDuocTang) {
                                            var minPrice = data.theKhachHangChiTiet.thanhToan / data.theKhachHangChiTiet.soLuong;
                                            if (theKhachHang.theKhachHang.soDu < minPrice && theKhachHang.theKhachHang.phaiThanhToan > theKhachHang.theKhachHang.daThanhToan) {
                                                abp.notify.success(app.localize('BanCanNapTienDeSuDung'));
                                                return;
                                            }
                                        }
                                    }
                                    if (isActive()) {
                                        _suDungTheModal.open({ theId: data.theKhachHangChiTiet.iD_TheKhachHang, chiTietTheId: data.theKhachHangChiTiet.id });
                                    }
                                    else {
                                        abp.notify.info(app.localize('TheCanKichHoatDeSuDung'));
                                        return;
                                    }
                                })
                        }
                    ]

                },
                {
                    targets: 1,
                    data: "dM_HangHoaTenHangHoa"
                },
                {
                    targets: 2,
                    data: "theKhachHangChiTiet.donGia",
                    render: function (donGia) {
                        return $.number(donGia, 0);
                    }
                },
                {
                    targets: 3,
                    data: "theKhachHangChiTiet.laTangKem",
                    render: function (laTangKem) {
                        if (laTangKem) {
                            return '<i class="la la-check-square m--font-success" title="True"></i>';
                        }
                        return '<i class="la la-times-circle" title="False"></i>';
                    }

                },
                {
                    targets: 4,
                    data: "theKhachHangChiTiet.soLuong",
                    render: function (data) {
                        return '<span class="numeric-cell">' + $.number(data, 0) + '</span>';
                    }
                },
                {
                    targets: 5,
                    data: "theKhachHangChiTiet.soLuongTang",
                    render: function (data) {
                        return '<span class="numeric-cell">' + $.number(data, 0) + '</span>';
                    }
                },


                {
                    targets: 6,
                    data: "theKhachHangChiTiet.soLuongDaSuDung",
                    render: function (data) {
                        return '<span class="numeric-cell">' + $.number(data, 0) + '</span>';
                    }
                },
                {
                    targets: 7,
                    data: "theKhachHangChiTiet.ptChietKhau",
                    render: function (data) {
                        return '<span class="numeric-cell">' + $.number(data, 0) + '</span>';
                    }
                },
                {
                    targets: 8,
                    data: "theKhachHangChiTiet.tienChietKhau",
                    render: function (data) {
                        return '<span class="numeric-cell">' + $.number(data, 0) + '</span>';
                    }
                },
                {
                    targets: 9,
                    data: "theKhachHangChiTiet.thanhToan",
                    render: function (data) {
                        return '<span class="numeric-cell">' + $.number(data, 0) + '</span>';
                    }
                },
                {
                    targets: 10,
                    data: "theKhachHangChiTiet.tienDaSuDung",
                    render: function (data) {
                        return '<span class="numeric-cell">' + $.number(data, 0) + '</span>';
                    }
                },
                {
                    targets: 11,
                    data: "theKhachHangChiTiet.soLuongTraLai",
                    render: function (data) {
                        return '<span class="numeric-cell">' + $.number(data, 0) + '</span>';
                    }
                },
                {
                    targets: 12,
                    data: "theKhachHangChiTiet.ngayTraLai",
                    render: function (ngayTraLai) {
                        if (ngayTraLai) {
                            return moment(ngayTraLai).format('L');
                        }
                        return "";
                    }

                },
                {
                    targets: 13,
                    data: "theKhachHangChiTiet.ghiChu"
                },

            ],
            createdRow: function (row, data, dataIndex) {

                if (data.theKhachHangChiTiet.traLaiHHDV) {
                    $(row).addClass('returned-service');
                    return;
                }
                if (data.theKhachHangChiTiet.soLuongDaSuDung == (data.theKhachHangChiTiet.soLuong + data.theKhachHangChiTiet.soLuongTang)) {
                    $(row).addClass('limited-service');
                    return;
                }



            },
            select: {
                style: 'single'
            }
        });

        //function updateDataTableSelectAllCtrl(table) {
        //    var $table = table.table().node();
        //    var $chkbox_all = $('tbody input[type="checkbox"]', $table);
        //    var $chkbox_checked = $('tbody input[type="checkbox"]:checked', $table);
        //    var chkbox_select_all = $('thead input[name="select_all"]', $table).get(0);

        //    // If none of the checkboxes are checked
        //    if ($chkbox_checked.length === 0) {
        //        chkbox_select_all.checked = false;
        //        if ('indeterminate' in chkbox_select_all) {
        //            chkbox_select_all.indeterminate = false;
        //        }

        //        // If all of the checkboxes are checked
        //    } else if ($chkbox_checked.length === $chkbox_all.length) {
        //        chkbox_select_all.checked = true;
        //        if ('indeterminate' in chkbox_select_all) {
        //            chkbox_select_all.indeterminate = false;
        //        }

        //        // If some of the checkboxes are checked
        //    } else {
        //        chkbox_select_all.checked = true;
        //        if ('indeterminate' in chkbox_select_all) {
        //            chkbox_select_all.indeterminate = true;
        //        }
        //    }
        //}

        //var rows_selected = [];

        var nhatKySuDungDT = _$nhatKySuDungThesTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _nhatKySuDungThesService.getAll,
                inputFilter: function () {
                    return {
                        iD_TheKhachHang: getCurrentTheKhachHangId(),
                    };
                }
            },
            //'rowCallback': function (row, data, dataIndex) {
            //    // Get row ID
            //    var rowId = data[0];

            //    // If row ID is in the list of selected row IDs
            //    if ($.inArray(rowId, rows_selected) !== -1) {
            //        $(row).find('input[type="checkbox"]').prop('checked', true);
            //        $(row).addClass('selected');
            //    }
            //},
            columnDefs: [

                {
                    width: 120,
                    targets: 0,
                    visible: true,
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

                                    return (_permissions.edit && ((new moment(data.record.nhatKySuDungThe.ngay)).add(1, 'days').format("YYYYMMDD") > (new moment()).format("YYYYMMDD") || ((new moment(data.record.nhatKySuDungThe.ngay)).add(1, 'days').format("YYYYMMDD") == (new moment()).format("YYYYMMDD") && (new moment()).format("HHmm") <= "1100")))
                                        || (_permissions.editLaterNhatKy);
                                },
                                action: function (data) {
                                    _suDungTheModal.open({ id: data.record.nhatKySuDungThe.iD_ChungTu });
                                }
                            },
                            {
                                text: app.localize('Delete'),
                                visible: function (data) {
                                    return (_permissions.delete && (new moment(data.record.nhatKySuDungThe.ngay)).format("YYYYMMDD") == (new moment()).format("YYYYMMDD"))
                                        || (_permissions.delete && _permissions.editLaterNhatKy);
                                },
                                action: function (data) {
                                    deleteNhatKySuDung(data.record.nhatKySuDungThe);
                                }
                            }]
                    }
                },

                {
                    targets: 1,
                    data: "orderNumber"

                },
                {
                    targets: 2,
                    data: "ngayLapHoaDon",
                    render: function (ngay) {
                        if (ngay) {
                            return moment(ngay).format('L');
                        }
                        return "";
                    }

                },
                {
                    targets: 3,
                    data: "nhatKySuDungThe.ngay",
                    render: function (ngay) {
                        if (ngay) {
                            return moment(ngay).format('L');
                        }
                        return "";
                    }

                },

                {
                    targets: 4,
                    data: "dM_HangHoaTenHangHoa"
                },
                {
                    targets: 5,
                    data: "nhatKySuDungThe.soLuong"
                },
                {
                    targets: 6,
                    data: "nhatKySuDungThe.soTien",
                    render: function (data) {
                        return '<span class="numeric-cell">' + $.number(data, 0) + '</span>';
                    }
                },
                {
                    targets: 7,
                    data: "nhatKySuDungThe.laSoLuongDuocTang",
                    render: function (laSoLuongDuocTang) {
                        if (laSoLuongDuocTang) {
                            return '<i class="la la-check-square m--font-success" title="True"></i>';
                        }
                        return '<i class="la la-times-circle" title="False"></i>';
                    }

                },
                {
                    targets: 8,
                    data: "performedOrganizationName"
                },
                {
                    targets: 9,
                    data: "invoiceCode"
                },


            ]
        });

        var lichSuTheDT = _$theKhachHangHistorysTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _theKhachHangsService.getAllHistory,
                inputFilter: function () {
                    return {
                        iD_TheKhachHang: getCurrentTheKhachHangId()
                    };
                }
            },
            columnDefs: [
                {
                    targets: 0,
                    data: "name"
                },
                {
                    targets: 1,
                    data: "content"
                },
                {
                    targets: 2,
                    data: "ngayDate"
                }
            ]
        });

        var lichSuThanhToanDT = _$lichSuThanhToansTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _phieuThusService.getAllByIDTheKhachHang,
                inputFilter: function () {
                    return {
                        iD_TheKhachHang: getCurrentTheKhachHangId()
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
                                    return (_permissions.editPhieuThu && ((new moment(data.record.phieuThu.ngayLapPhieu)).add(1, 'days').format("YYYYMMDD") > (new moment()).format("YYYYMMDD") || ((new moment(data.record.phieuThu.ngayLapPhieu)).add(1, 'days').format("YYYYMMDD") == (new moment()).format("YYYYMMDD") && (new moment()).format("HHmm") <= "1100")))
                                        || (_permissions.editLaterPhieuThu);
                                },
                                action: function (data) {
                                    _thanhToanTheModal.open({ id: data.record.phieuThu.id });
                                }
                            },
                            {
                                text: app.localize('Delete'),
                                visible: function () {
                                    return _permissions.deletePhieuThu;
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
                    data: "phieuThu.tongTienThu",
                    render: function (data) {
                        return '<span class="numeric-cell">' + $.number(data, 0) + '</span>';
                    }
                },
                {
                    targets: 4,
                    data: "phieuThu.noiDungThu"
                },

                {
                    targets: 5,
                    data: "userName"
                },
                {
                    targets: 6,
                    data: "organizationUnitDisplayName"
                }
            ]
        });

        // function

        function getCurrentTheKhachHangId() {
            var currentThe = getCurrentTheKhachHang();
            if (currentThe != null) {
                return currentThe.theKhachHang.id;
            }
            return null;
        }

        function getCurrentTheKhachHang() {
            var count = lstTheKhachHangTable.rows({ selected: true }).count();

            if (count > 0) {
                return lstTheKhachHangTable.rows({ selected: true }).data()[0];
            }
            return null;
        }

        function isActive() {

            var count = lstTheKhachHangTable.rows({ selected: true }).count();

            if (count > 0) {
                var isActive = lstTheKhachHangTable.rows({ selected: true }).data()[0].theKhachHang.status && !lstTheKhachHangTable.rows({ selected: true }).data()[0].theKhachHang.huyThe;
                return isActive;
            }
            return false
        }

        function xongCongNo() {

            var count = lstTheKhachHangTable.rows({ selected: true }).count();

            if (count > 0) {
                var xongCongNo = lstTheKhachHangTable.rows({ selected: true }).data()[0].hetCongNo;
                return xongCongNo;
            }
            return false
        }

        function getNhatKySuDungThes() {
            nhatKySuDungDT.ajax.reload();
        }

        function getlichSuThes() {
            lichSuTheDT.ajax.reload();
        }

        function getLichSuThanhToans() {
            lichSuThanhToanDT.ajax.reload();
        }

        function getTheKhachHangs() {
            lstTheKhachHangTable.ajax.reload();
        }

        function getTheKhachHangChiTiets() {
            lstChitietTheTable.ajax.reload();
        }

        function deleteTheKhachHang(theKhachHang) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _theKhachHangsService.delete({
                            id: theKhachHang.id
                        }).done(function () {
                            getTheKhachHangs(true);
                            abp.notify.success(app.localize('SuccessfullyDeleted'));
                        });
                    }
                }
            );
        }

        function deletePhieuThu(phieuThu) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _phieuThusService.delete({
                            id: phieuThu.id
                        }).done(function () {
                            getTheKhachHangs(true);
                            abp.notify.success(app.localize('SuccessfullyDeleted'));
                        });
                    }
                }
            );
        }

        function deleteNhatKySuDung(nhatKy) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _suDungTheService.delete({
                            id: nhatKy.iD_ChungTu
                        }).done(function () {
                            getTheKhachHangs(true);
                            abp.notify.success(app.localize('SuccessfullyDeleted'));
                        });
                    }
                }
            );
        }
        // event
        lstTheKhachHangTable
            .on('select', function (e, dt, type, indexes) {
                var data = lstTheKhachHangTable.row({ selected: true }).data();

                $('#daThanhToan').html($.number(data.theKhachHang.daThanhToan + (data.theKhachHang.tienNhanTuTheCu == undefined ? 0 : data.theKhachHang.tienNhanTuTheCu), 0));
                $('#phaiThanhToan').html($.number(data.theKhachHang.phaiThanhToan, 0));

                $('#conLai').html($.number(data.theKhachHang.phaiThanhToan - (data.theKhachHang.daThanhToan == undefined ? 0 : data.theKhachHang.daThanhToan) - (data.theKhachHang.tienNhanTuTheCu == undefined ? 0 : data.theKhachHang.tienNhanTuTheCu), 0));
                if (data.theKhachHang.theGiaTri_SoLan_GiamGia == 1) {

                    $('input[name=id]').val(data.theKhachHang.id);
                    $('#dM_NhomTheTenNhomThe').html(data.dM_NhomTheTenNhomThe);
                    $('#maThe').html(data.theKhachHang.maThe);
                    $('#menhGiaThe').html($.number(data.theKhachHang.menhGiaThe, 0));
                    $('#tienTangThem').html($.number(data.theKhachHang.tienTangThem, 0));
                    $('#pTChietKhau').html($.number(data.theKhachHang.ptChietKhau, 0));
                    $('#tienChietKhau').html($.number(data.theKhachHang.tienChietKhau, 0));
                    $('#userName').html(data.userName);
                    //$('#organizationUnitDisplayName').html(data.organizationUnitDisplayName);
                    //$('#donViThuHuongDisplayName').html(data.donViThuHuongDisplayName);
                    $('#ngayMua').html(moment(data.theKhachHang.ngayMua).format('L'));
                    $('#ngayApDung').html(moment(data.theKhachHang.ngayApDung).format('L'));
                    $('#ngayHetHan').html(moment(data.theKhachHang.ngayHetHan).format('L'));
                    $('#ghiChu').html(data.theKhachHang.ghiChu);
                    $('#theGiaTriChiTiet').show();
                    $('#theLanChiTiet').hide();
                    $('.use-button').show();
                }
                else {
                    $('#theGiaTriChiTiet').hide();
                    $('#theLanChiTiet').show();
                    getTheKhachHangChiTiets();
                    $('.use-button').hide();
                }

                getNhatKySuDungThes();
                getlichSuThes();
                getLichSuThanhToans();
            });

        $('.use-button').click(function () {

            var theKhachHang = getCurrentTheKhachHang();
            var ngayMua = new Date(theKhachHang.theKhachHang.ngayMua);
            var ngayMuaString = ngayMua.getFullYear().toString() + ngayMua.getMonth().pad() + ngayMua.getDate().pad();
            var currentDate = new Date();
            var currentDateString = currentDate.getFullYear().toString() + currentDate.getMonth().pad() + currentDate.getDate().pad();
            if (new Date(theKhachHang.theKhachHang.ngayHetHan) < new Date()) {
                abp.notify.success(app.localize('TheDaHetHanSuDung'));
                return;
            }
            if (new Date(theKhachHang.theKhachHang.ngayApDung) > new Date()) {
                abp.notify.success(app.localize('TheChuaDenThoiGianApDung'));
                return;
            }
            if (theKhachHang.theKhachHang.huyThe || !theKhachHang.theKhachHang.status) {
                abp.notify.success(app.localize('TheCanKichHoatDeSuDung'));
                return;
            }
            // todo
            //if (!theKhachHang.laDonViThucHien) {
            //    abp.notify.success(app.localize('KhongPhaiDonViThucHien'));
            //    return;
            //}
            if (ngayMuaString != currentDateString) {
                if (theKhachHang.theKhachHang.soDu == 0 && theKhachHang.theKhachHang.phaiThanhToan > theKhachHang.theKhachHang.daThanhToan) {
                    abp.notify.success(app.localize('BanCanNapTienDeSuDung'));
                    return;
                }
            }
            var theKhachHangId = getCurrentTheKhachHangId();
            _suDungTheModal.open({ theId: theKhachHangId });
        });

        $('.edit-button').click(function () {
            var theKhachHang = getCurrentTheKhachHang();
            var theKhachHangId = getCurrentTheKhachHangId();
            if (theKhachHang.theKhachHang.theGiaTri_SoLan_GiamGia == 1) {
                _createOrEditTheGiaTriModal.open({ id: theKhachHangId });
            }
            else {
                _createOrEditTheLanModal.open({ id: theKhachHangId });
            }

        });

        $('.remove-button').click(function () {

            var theKhachHang = getCurrentTheKhachHang();
            deleteTheKhachHang(theKhachHang.theKhachHang);
        });

        $('.pay-button').click(function () {
            var data = lstTheKhachHangTable.row($(this).parent('tr')).data();
            var theKhachHang = getCurrentTheKhachHang();
            var theKhachHangId = theKhachHang.theKhachHang.id;
            if (xongCongNo()) {
                abp.notify.success(app.localize('TheDaThanhToanHetCongNo'));
                return;
            }
            _thanhToanTheModal.open({ idThe: theKhachHangId });
        });

        $('.loaithe').click(function () {
            $('.loaithe.active').removeClass("active");
            $(this).addClass("active");

            getTheKhachHangs();
        })

        $('#CreateNewTheLanButton').click(function () {
            _createOrEditTheLanModal.open();
        });
        $('#CreateNewTheGiaTriButton').click(function () {
            _createOrEditTheGiaTriModal.open();
        });

        abp.event.on('app.createOrEditTheKhachHangModalSaved', function () {
            getTheKhachHangs();
        });
        abp.event.on('app.createOrEditHoaDonBanLeModalSaved', function () {
            getTheKhachHangs();
        });
        abp.event.on('app.createOrEditPhieuThuModalSaved', function () {
            getTheKhachHangs();
        });

        $('#GetTheKhachHangsButton').click(function (e) {
            e.preventDefault();
            getTheKhachHangs();
        });
        $('.datatable-filter').keyup(function (e) {
            if (e.keyCode == 13) {
                e.preventDefault();
                getTheKhachHangs();
            }
        });

        $('#TheKhachHangFiltersArea input').keypress(function (e) {
            if (e.which === 13) {
                getTheKhachHangs();
            }
        });

        //$(window).scroll(function (e) {
        //    var $el = $('.card-dashboard');
        //    var isPositionFixed = ($el.css('position') == 'fixed');
        //    if ($(this).scrollTop() > 150 && !isPositionFixed) {
        //        $el.css({ 'position': 'fixed', 'top': '0px' });
        //    }
        //    if ($(this).scrollTop() < 150 && isPositionFixed) {
        //        $el.css({ 'position': 'static', 'top': '0px' });
        //    }
        //});

    });
})();