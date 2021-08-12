var ChiTietHangHoaDichVu = function (_modalManager) {

    var _chitietHangHoaDichVuTab = _modalManager.getModal().find('#HangHoaDichVuTab');
    var _idThe = _modalManager.getModal().find('[name=id]').val() == "" ? _modalManager.getModal().find('[name=tempId]').val() : _modalManager.getModal().find('[name=id]').val();
    var _$chiTietDichVuTable = $('#ChiTietDichVuTable');

    var _theKhachHangChiTietsService = abp.services.app.theKhachHangChiTiets;
    var _$chiTietDichVuForm = _modalManager.getModal().find('form[name=ChiTietDichVuForm]');
    var _$thongTinTheLanForm = _modalManager.getModal().find('form[name=TheKhachHangInformationsForm]');

    $('.date-picker').datetimepicker({
        locale: abp.localization.currentLanguage.name,
        format: 'L'
    });

    var _permissions = {
        create: abp.auth.hasPermission('Pages.TheKhachHangs.Create'),
        edit: abp.auth.hasPermission('Pages.TheKhachHangs.Edit'),
        'delete': abp.auth.hasPermission('Pages.TheKhachHangs.Edit')
    };

    var _createOrEditModal = new app.ModalManager({
        viewUrl: abp.appPath + 'crm/TheKhachHangChiTiets/CreateOrEditModal',
        scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/TheKhachHangChiTiets/_CreateOrEditModal.js',
        modalClass: 'CreateOrEditTheKhachHangChiTietModal'
    });

    var _viewTheKhachHangChiTietModal = new app.ModalManager({
        viewUrl: abp.appPath + 'crm/TheKhachHangChiTiets/ViewtheKhachHangChiTietModal',
        modalClass: 'ViewTheKhachHangChiTietModal'
    });

    var chiTietDichVuTable = _$chiTietDichVuTable.DataTable({
        paging: true,
        serverSide: true,
        processing: true,
        responsive: true,
        //drawCallback: function (settings) {
        //    
        //    var api = this.api();

        //    var currentPageDataSet = api.rows({ page: 'current' }).data();
        //    var $tbody = $('#TheKhachHangChiTietsTable tbody');
        //    var isEven = (currentPageDataSet.length +1) % 2 === 0;
        //    var $tr = (isEven) ? $('<tr role="row" class="even"></tr>') : $('<tr role="row"  class="odd"></tr>');
        //    $tbody.append($tr);
        //},
        listAction: {
            ajaxFunction: _theKhachHangChiTietsService.getAll,
            inputFilter: function () {
                return {
                    filter: _chitietHangHoaDichVuTab.find('#TheKhachHangChiTietsTableFilter').val(),
                    iD_TheKhachHang: _idThe,
                    laHangTang: false,
                    minSoLuongFilter: _chitietHangHoaDichVuTab.find('#MinSoLuongFilterId').val(),
                    maxSoLuongFilter: _chitietHangHoaDichVuTab.find('#MaxSoLuongFilterId').val(),
                    minDonGiaFilter: _chitietHangHoaDichVuTab.find('#MinDonGiaFilterId').val(),
                    maxDonGiaFilter: _chitietHangHoaDichVuTab.find('#MaxDonGiaFilterId').val(),
                    minPTChietKhauFilter: _chitietHangHoaDichVuTab.find('#MinPTChietKhauFilterId').val(),
                    maxPTChietKhauFilter: _chitietHangHoaDichVuTab.find('#MaxPTChietKhauFilterId').val(),
                    minTienChietKhauFilter: _chitietHangHoaDichVuTab.find('#MinTienChietKhauFilterId').val(),
                    maxTienChietKhauFilter: _chitietHangHoaDichVuTab.find('#MaxTienChietKhauFilterId').val(),
                    minThanhToanFilter: _chitietHangHoaDichVuTab.find('#MinThanhToanFilterId').val(),
                    maxThanhToanFilter: _chitietHangHoaDichVuTab.find('#MaxThanhToanFilterId').val(),
                    ghiChuFilter: _chitietHangHoaDichVuTab.find('#GhiChuFilterId').val(),
                    minSoLuongTangFilter: _chitietHangHoaDichVuTab.find('#MinSoLuongTangFilterId').val(),
                    maxSoLuongTangFilter: _chitietHangHoaDichVuTab.find('#MaxSoLuongTangFilterId').val(),
                    minNgayTraLaiFilter: _chitietHangHoaDichVuTab.find('#MinNgayTraLaiFilterId').val(),
                    maxNgayTraLaiFilter: _chitietHangHoaDichVuTab.find('#MaxNgayTraLaiFilterId').val(),
                    minSoLuongTraLaiFilter: _chitietHangHoaDichVuTab.find('#MinSoLuongTraLaiFilterId').val(),
                    maxSoLuongTraLaiFilter: _chitietHangHoaDichVuTab.find('#MaxSoLuongTraLaiFilterId').val(),
                    minTienDaSuDungFilter: _chitietHangHoaDichVuTab.find('#MinTienDaSuDungFilterId').val(),
                    maxTienDaSuDungFilter: _chitietHangHoaDichVuTab.find('#MaxTienDaSuDungFilterId').val(),
                    traLaiHHDVFilter: _chitietHangHoaDichVuTab.find('#TraLaiHHDVFilterId').val(),
                    iD_SanPhamChinhFilter: _chitietHangHoaDichVuTab.find('#ID_SanPhamChinhFilterId').val(),
                    laTangKemFilter: _chitietHangHoaDichVuTab.find('#LaTangKemFilterId').val(),
                    minSoLuongDaSuDungFilter: _chitietHangHoaDichVuTab.find('#MinSoLuongDaSuDungFilterId').val(),
                    maxSoLuongDaSuDungFilter: _chitietHangHoaDichVuTab.find('#MaxSoLuongDaSuDungFilterId').val(),
                    dM_HangHoaTenHangHoaFilter: _chitietHangHoaDichVuTab.find('#DM_HangHoaTenHangHoaFilterId').val()
                };
            }
        },
        select: {
            style: 'single'
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
                            return _permissions.delete;
                        },
                        element: $('<button class="btn m-btn m-btn--hover-accent m-btn--icon m-btn--icon-only m-btn--remove" title="' + app.localize('Delete') + '"><i class="la la-remove"></i></button>')
                            .click(function () {
                                var data = $(this).data();

                                _theKhachHangChiTietsService.delete({ id: data.theKhachHangChiTiet.id });
                                chiTietDichVuTable.ajax.reload();
                                abp.notify.info(app.localize('DeleteSuccessfully'));
                            }
                            )
                    }
                ]
            },
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
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deleteTheKhachHangChiTiet(data.record.theKhachHangChiTiet);
                            }
                        }]
                }
            },
            {
                targets: 1,
                data: "dM_HangHoaTenHangHoa"
            },
            {
                targets: 2,
                data: "theKhachHangChiTiet.donGia",
                render: function (data) {
                    return '<span class="numeric-cell">' + $.number(data, 0) + '</span>';
                }
            },
            {
                targets: 3,
                data: "theKhachHangChiTiet.soLuong"
            },
            {
                targets: 4,
                data: "theKhachHangChiTiet.soLuongTang"
            },
            {
                targets: 5,
                data: null,
                render: function (data) {

                    return parseInt(data.theKhachHangChiTiet.soLuong != null ? data.theKhachHangChiTiet.soLuong : "0") + parseInt(data.theKhachHangChiTiet.soLuongTang != null ? data.theKhachHangChiTiet.soLuongTang : "0") - parseInt(data.theKhachHangChiTiet.soLuongDaSuDung != null ? data.theKhachHangChiTiet.soLuongDaSuDung : "0");
                }
            },
            {
                targets: 6,
                data: "theKhachHangChiTiet.tienDaSuDung",
                render: function (data) {
                    return '<span class="numeric-cell">' + $.number(data, 0) + '</span>';
                }
            },


            {
                targets: 7,
                data: "theKhachHangChiTiet.soLuongDaSuDung",
                render: function (data) {
                    return '<span class="numeric-cell">' + $.number(data, 0) + '</span>';
                }
            },

            {
                targets: 8,
                data: "theKhachHangChiTiet.ptChietKhau",
                render: function (data) {
                    return '<span class="numeric-cell">' + $.number(data, 0) + '</span>';
                }
            },
            {
                targets: 9,
                data: "theKhachHangChiTiet.tienChietKhau",
                render: function (data) {
                    return '<span class="numeric-cell">' + $.number(data, 0) + '</span>';
                }
            },
            {
                targets: 10,
                data: "theKhachHangChiTiet.ngayTraLai",
                render: function (ngayTraLai) {
                    if (ngayTraLai) {
                        return moment(ngayTraLai).format('L');
                    }
                    return "";
                }

            },
            {
                targets: 11,
                data: "theKhachHangChiTiet.soLuongTraLai"
            },
            {
                targets: 12,
                data: "theKhachHangChiTiet.thanhToan",
                render: function (data) {
                    return '<span class="numeric-cell">' + $.number(data, 0) + '</span>';
                }
            },
            {
                targets: 13,
                data: "theKhachHangChiTiet.ghiChu"
            }
        ]
    });
    //_$chiTietDichVuForm.find("input[name=laTangKem]").attr("disabled", "disabled");
    function ClearForm() {

    }
    chiTietDichVuTable
        .on('select', function (e, dt, type, indexes) {

            var count = chiTietDichVuTable.rows({ selected: true }).count();

            if (count > 0) {
                var data = chiTietDichVuTable.rows({ selected: true }).data()[0];
                renderDetailForm(data);


                if (data.theKhachHangChiTiet.laTangKem) {
                    $('input[name=soLuongTang]').attr("disabled", "disabled");
                    $('input[name=soLuongTang]').attr("disabled", "disabled");
                    $('input[name=thanhToan]').attr("disabled", "disabled");
                    $('input[name=tienChietKhau]').attr("disabled", "disabled");
                    $('input[name=pTChietKhau]').attr("disabled", "disabled");
                }
                else {
                    $('input[name=soLuongTang]').removeAttr("disabled");
                    $('input[name=soLuongTang]').removeAttr("disabled");
                    $('input[name=thanhToan]').removeAttr("disabled");
                    $('input[name=tienChietKhau]').removeAttr("disabled");
                    $('input[name=pTChietKhau]').removeAttr("disabled");
                }
                $('#AddNewDichVuButton').hide();
                $('.save-dichvu-button').show();
                //if (!data.theKhachHangChiTiet.traLaiHHDV && _modalManager.getModal().find('input[name=id]').val() != "" && data.theKhachHangChiTiet.laTangKem == false) {
                //    $('.traLai-dichvu-button').show();
                //}
                //else {
                //    $('.traLai-dichvu-button').hide();
                //}
                $('.save-dichvu-button').removeAttr("disabled");
            }


            return null;
        });
    function clearDetailForm() {
        _$chiTietDichVuForm[0].reset();
        _$chiTietDichVuForm.find('input[name=id]').val('');
        $('input[name=soLuongTang]').val(0).removeAttr("disabled");
        $('input[name=soLuongTang]').val(0).removeAttr("disabled");
        $('input[name=thanhToan]').val(0).removeAttr("disabled");
        $('input[name=tienChietKhau]').val(0).removeAttr("disabled");
        $('input[name=pTChietKhau]').val(0).removeAttr("disabled");
    }
    $('input[name=laTangKem]').change(function () {
        if ($(this).prop('checked') == true) {
            $('input[name=soLuongTang]').val(0);
            $('input[name=thanhToan]').val(0);
            $('input[name=tienChietKhau]').val(0);
            $('input[name=ptChietKhau]').val(0);
            $('input[name=soLuongTang]').val(0).attr("disabled", "disabled");
            $('input[name=thanhToan]').val(0).attr("disabled", "disabled");
            $('input[name=tienChietKhau]').val(0).attr("disabled", "disabled");
            $('input[name=ptChietKhau]').val(0).attr("disabled", "disabled");
        }

    });

    $('.save-dichvu-button').click(function () {
        var dichVuChiTiet = _$chiTietDichVuForm.serializeFormToObject();
        var theKhachHang = _$thongTinTheLanForm.serializeFormToObject();

        if (dichVuChiTiet.iD_HangHoa == "" || dichVuChiTiet.id == undefined) {
            return;
        }
        if (dichVuChiTiet.soLuong == "0" || dichVuChiTiet.soLuong == "" || dichVuChiTiet.soLuong == undefined) {
            return;
        }
        $.extend(true, dichVuChiTiet, { iD_TheKhachHang: theKhachHang.id == "" ? theKhachHang.tempId : theKhachHang.id });
        _theKhachHangChiTietsService.createOrEdit(
            dichVuChiTiet
        ).done(function () {
            abp.notify.info(app.localize('SavedSuccessfully'));
            //abp.event.trigger('app.createOrEditTheKhachHangChiTietModalSaved');

            var voucherId = _$thongTinTheLanForm.find("input[name=voucherId]").val();
            clearDetailForm();
            var voucherValue = theKhachHang.voucherValue;
            var thanhTien = dichVuChiTiet.donGia * dichVuChiTiet.soLuong;
            if (voucherValue > thanhTien) {
                voucherValue = voucherValue - thanhTien;
            }
            _$thongTinTheLanForm.find('input[name=voucherValue]').val(voucherValue);

            getChiTietDichVus();
        })
    });

    $('.traLai-dichvu-button').click(function () {

        //var thanhTien = calcThanhTien();
        var daSuDung = parseFloat(_$chiTietDichVuForm.find('input[name=soLuongDaSuDung]').val());
        var donGia = parseFloat(_$chiTietDichVuForm.find('input[name=donGia]').val());
        var soLuong = parseFloat(_$chiTietDichVuForm.find('input[name=soLuong]').val());
        var soLuongTang = parseFloat(_$chiTietDichVuForm.find('input[name=soLuongTang]').val());
        var traLai = soLuong + soLuongTang - daSuDung;

        //var ptChietKhau = parseFloat(_$chiTietDichVuForm.find('input[name=pTChietKhau]').val())
        //var thanhToan = donGia * daSuDung * (100 - ptChietKhau) / 100;
        //var thanhTien = donGia * daSuDung;
        //var tienChietKhau = thanhTien * ptChietKhau / 100;
        //_$chiTietDichVuForm.find('input[name=tienChietKhau]').val(tienChietKhau);
        _$chiTietDichVuForm.find('input[name=soLuongTraLai]').val(traLai);
        //_$chiTietDichVuForm.find('input[name=thanhTien]').val(thanhTien);
        //_$chiTietDichVuForm.find('input[name=thanhToan]').val(thanhToan);
        _$chiTietDichVuForm.find('input[name=traLaiHHDV]').val(true);
        //$('.traLai-dichvu-button').hide();
        //_$chiTietDichVuForm.find('input[name=pTChietKhau]').attr("disabled", true);
        //_$chiTietDichVuForm.find('input[name=tienChietKhau]').attr("disabled", true);
    });
    $('.reset-button').click(function () {
        var data = $('#ChiTietDichVuTable').DataTable().rows({ selected: true }).data()[0];
        renderDetailForm(data);
        //if (!data.theKhachHangChiTiet.traLaiHHDV) {
        //    $('.traLai-dichvu-button').show()
        //}
        //$('.cancel-button').hide();
    });
    $('.cancel-button').click(function () {
        clearDetailForm();
    });

    function renderDetailForm(data) {

        if (data == null) {
            return;
        }
        clearDetailForm();

        //if (!data.theKhachHangChiTiet.traLaiHHDV && _modalManager.getModal().find('input[name=id]').val() != "" && data.theKhachHangChiTiet.laTangKem == false) {
        //    $('.traLai-dichvu-button').show();
        //}
        //else {
        //    $('.traLai-dichvu-button').hide();
        //}
        _$chiTietDichVuForm.find('input[name=id]').val(data.theKhachHangChiTiet.id);
        _$chiTietDichVuForm.find('input[name=dM_HangHoaTenHangHoa]').val(data.dM_HangHoaTenHangHoa);
        _$chiTietDichVuForm.find('input[name=iD_HangHoa]').val(data.theKhachHangChiTiet.iD_HangHoa);
        _$chiTietDichVuForm.find('input[name=soLuong]').val(data.theKhachHangChiTiet.soLuong);
        _$chiTietDichVuForm.find('input[name=donGia]').val(data.theKhachHangChiTiet.donGia);
        _$chiTietDichVuForm.find('input[name=pTChietKhau]').val(data.theKhachHangChiTiet.ptChietKhau);
        _$chiTietDichVuForm.find('input[name=tienChietKhau]').val(data.theKhachHangChiTiet.tienChietKhau);
        _$chiTietDichVuForm.find('input[name=thanhToan]').val(data.theKhachHangChiTiet.thanhToan);
        _$chiTietDichVuForm.find('input[name=soLuongTang]').val(data.theKhachHangChiTiet.soLuongTang);
        _$chiTietDichVuForm.find('input[name=tienDaSuDung]').val(data.theKhachHangChiTiet.tienDaSuDung);
        _$chiTietDichVuForm.find('input[name=soLuongDaSuDung]').val(data.theKhachHangChiTiet.soLuongDaSuDung);
        _$chiTietDichVuForm.find('input[name=traLaiHHDV]').val(data.theKhachHangChiTiet.traLaiHHDV);
        _$chiTietDichVuForm.find('input[name=ngayTraLai]').val(data.theKhachHangChiTiet.ngayTraLai);
        _$chiTietDichVuForm.find('input[name=soLuongTraLai]').val(data.theKhachHangChiTiet.soLuongTraLai);
        _$chiTietDichVuForm.find('input[name=ghiChu]').val(data.theKhachHangChiTiet.ghiChu);
        _$chiTietDichVuForm.find('input[name=laTangKem]').prop("checked", data.theKhachHangChiTiet.laTangKem);
        $('.cancel-button').show();
        return true;

    }

    function getChiTietDichVus() {
        chiTietDichVuTable.ajax.reload();
    }

    function deleteTheKhachHangChiTiet(theKhachHangChiTiet) {
        abp.message.confirm(
            '',
            function (isConfirmed) {
                if (isConfirmed) {
                    _theKhachHangChiTietsService.delete({
                        id: theKhachHangChiTiet.id
                    }).done(function () {
                        getTheKhachHangChiTiets(true);
                        abp.notify.success(app.localize('SuccessfullyDeleted'));
                    });
                }
            }
        );
    }



    _chitietHangHoaDichVuTab.find('#CreateNewTheKhachHangChiTietButton').click(function () {
        _createOrEditModal.open();
    });

    $('#ExportToExcelButton').click(function () {
        _theKhachHangChiTietsService
            .getTheKhachHangChiTietsToExcel({
                filter: $('#TheKhachHangChiTietsTableFilter').val(),
                minSoLuongFilter: $('#MinSoLuongFilterId').val(),
                maxSoLuongFilter: $('#MaxSoLuongFilterId').val(),
                minDonGiaFilter: $('#MinDonGiaFilterId').val(),
                maxDonGiaFilter: $('#MaxDonGiaFilterId').val(),
                minPTChietKhauFilter: $('#MinPTChietKhauFilterId').val(),
                maxPTChietKhauFilter: $('#MaxPTChietKhauFilterId').val(),
                minTienChietKhauFilter: $('#MinTienChietKhauFilterId').val(),
                maxTienChietKhauFilter: $('#MaxTienChietKhauFilterId').val(),
                minThanhToanFilter: $('#MinThanhToanFilterId').val(),
                maxThanhToanFilter: $('#MaxThanhToanFilterId').val(),
                ghiChuFilter: $('#GhiChuFilterId').val(),
                minSoLuongTangFilter: $('#MinSoLuongTangFilterId').val(),
                maxSoLuongTangFilter: $('#MaxSoLuongTangFilterId').val(),
                minNgayTraLaiFilter: $('#MinNgayTraLaiFilterId').val(),
                maxNgayTraLaiFilter: $('#MaxNgayTraLaiFilterId').val(),
                minSoLuongTraLaiFilter: $('#MinSoLuongTraLaiFilterId').val(),
                maxSoLuongTraLaiFilter: $('#MaxSoLuongTraLaiFilterId').val(),
                minTienDaSuDungFilter: $('#MinTienDaSuDungFilterId').val(),
                maxTienDaSuDungFilter: $('#MaxTienDaSuDungFilterId').val(),
                traLaiHHDVFilter: $('#TraLaiHHDVFilterId').val(),
                iD_SanPhamChinhFilter: $('#ID_SanPhamChinhFilterId').val(),
                laTangKemFilter: $('#LaTangKemFilterId').val(),
                minSoLuongDaSuDungFilter: $('#MinSoLuongDaSuDungFilterId').val(),
                maxSoLuongDaSuDungFilter: $('#MaxSoLuongDaSuDungFilterId').val(),
                theKhachHangMaTheFilter: $('#TheKhachHangMaTheFilterId').val(),
                dM_HangHoaTenHangHoaFilter: $('#DM_HangHoaTenHangHoaFilterId').val()
            })
            .done(function (result) {
                app.downloadTempFile(result);
            });
    });

    abp.event.on('app.createOrEditTheKhachHangChiTietModalSaved', function () {
        getTheKhachHangChiTiets();
    });

    _chitietHangHoaDichVuTab.find('#GetTheKhachHangChiTietsButton').click(function (e) {
        e.preventDefault();
        getTheKhachHangChiTiets();
    });

    return true;
};