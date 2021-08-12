var NhanVienThucHien = function (_modalManager) {
    var modal = _modalManager.getModal();
    var _$nhanVienForm = modal.find('form[name=AddNhanVienThucHienForm]');
    var _$hoaDonBanLeInformationForm = _modalManager.getModal().find('form[name=HoaDonBanLeInformationsForm]');
    var _$theKhachHangInformationForm = modal.find('form[name=TheKhachHangInformationsForm]');
    var _$nhanVienThucHiensTable = $('#NhanVienThucHiensTable');
    var _nhanVienThucHiensService = abp.services.app.nhanVienThucHiens;
    
    var idTheKhachHang = modal.find('input[name=id]').val();
    idTheKhachHang = (idTheKhachHang == "" || idTheKhachHang == undefined) ? modal.find('input[name=tempId]').val() : idTheKhachHang;

    $('.date-picker').datetimepicker({
        locale: abp.localization.currentLanguage.name,
        format: 'L'
    });

    var _permissions = {
        create: true, //abp.auth.hasPermission('Pages.NhanVienThucHiens.Create'),
        edit: true, // abp.auth.hasPermission('Pages.NhanVienThucHiens.Edit'),
        'delete': true //abp.auth.hasPermission('Pages.NhanVienThucHiens.Delete')
    };

    var _userLookupTableModal = new app.ModalManager({
        viewUrl: abp.appPath + 'crm/Common/KTVLookupTableModal',
        scriptUrl: abp.appPath + 'view-resources/Areas/crm/Common/_KTVLookupTableModal.js',
        modalClass: 'KTVLookupTableModal'
    });

    var nhanVienThucHien = _$nhanVienThucHiensTable.DataTable({
        paging: true,
        serverSide: true,
        processing: true,
        listAction: {
            ajaxFunction: _nhanVienThucHiensService.getAll,
            inputFilter: function () {
                return {
                    maChungTu: idTheKhachHang,
                    filter: $('#ChietKhauNhanViensTableFilter').val(),
                    userNameFilter: $('#UserNameFilterId').val(),
                    minTienChietKhauFilter: $('#MinTienChietKhauFilterId').val(),
                    maxTienChietKhauFilter: $('#MaxTienChietKhauFilterId').val(),
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
                                _createOrEditModal.open({ id: data.record.nhanVienThucHien.id });
                            }
                        },
                        {
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deleteChietKhauNhanVien(data.record.nhanVienThucHien);
                            }
                        }]
                }
            },

            {
                targets: 1,
                data: "userName"
            },
            {
                targets: 2,
                data: "nhanVienThucHien.tienChietKhau"
            },
            {
                targets: 3,
                data: "nhanVienThucHien.ptDoanhThuDuocHuong"
            },
            {
                targets: 4,
                data: "nhanVienThucHien.dienGiai"
            }

        ],
        select: {
            style: 'single'
        }
    });

    nhanVienThucHien
        .on('select', function (e, dt, type, indexes) {

            var count = nhanVienThucHien.rows({ selected: true }).count();

            if (count > 0) {
                RenderNhanVienForm(nhanVienThucHien.rows({ selected: true }).data()[0]);
            }
        });
    function getNhanVienThucHiens() {
        nhanVienThucHien.ajax.reload();
    }

    function deleteChietKhauNhanVien(nhanVienThucHien) {
        abp.message.confirm(
            '',
            function (isConfirmed) {
                if (isConfirmed) {
                    _nhanVienThucHiensService.delete({
                        id: nhanVienThucHien.id
                    }).done(function () {
                        getNhanVienThucHiens(true);
                        abp.notify.success(app.localize('SuccessfullyDeleted'));
                    });
                }
            }
        );
    }
    

    function RenderNhanVienForm(data) {
        
        _$nhanVienForm.find('input[name=id]').val(data.nhanVienThucHien.id);
        _$nhanVienForm.find('input[name=userName]').val(data.userName);
        _$nhanVienForm.find('input[name=nhanVien]').val(data.nhanVienThucHien.nhanVien);
        _$nhanVienForm.find('input[name=tienChietKhau]').val(data.nhanVienThucHien.tienChietKhau);
        _$nhanVienForm.find('input[name=pTDoanhThuDuocHuong]').val(data.nhanVienThucHien.ptDoanhThuDuocHuong);
        _$nhanVienForm.find('input[name=dienGiai]').val(data.nhanVienThucHien.dienGiai);
        _$nhanVienForm.find('input[name=laNhanVienChinh]').prop("checked", data.nhanVienThucHien.laNhanVienChinh);
    }
    
    $('.OpenNhanVienThucHienLookupTableButton').click(function () {

        
        var nhanVienThucHien = $(this).parents('tr');

        _userLookupTableModal.open({ id: nhanVienThucHien.find('input[name=nhanVien]').val(), displayName: nhanVienThucHien.find('input[name=userName]').val() }, function (data) {
            
            nhanVienThucHien.find('input[name=tenNhanVienThucHien]').val(data.tenNhanVien);
            nhanVienThucHien.find('input[name=ngayThucHien]').data("DateTimePicker").date(new Date());
            nhanVienThucHien.find('input[name=nhanVien]').val(data.id);
        });
    });

    $('.ClearNhanVienThucHienButton').click(function () {
        var nhanVienThucHien = $(this).parents('tr');
        nhanVienThucHien.find('input[name=tenNhanVienThucHien]').val('');
        nhanVienThucHien.find('input[name=nhanVien]').val('');
    });
    $('#OpenNhanVienThucHienLookupTableButton').click(function () {
        var nhanVienThucHien = _$nhanVienForm.serializeFormToObject();
        _userLookupTableModal.open({ id: nhanVienThucHien.id, displayName: nhanVienThucHien.userName}, function (data) {
            
            _$nhanVienForm.find('input[name=tenNhanVienThucHien]').val(data.tenNhanVien);
            _$nhanVienForm.find('input[name=nhanVien]').val(data.id);
            _$nhanVienForm.find('input[name=ngayThucHien]').data("DateTimePicker").date(new Date());
        });
    });

    $('#ClearNhanVienThucHienButton').click(function () {
        _$nhanVienForm.find('input[name=tenNhanVienThucHien]').val('');
        _$nhanVienForm.find('input[name=nhanVien]').val('');
    });

    var saveNhanVienThucHien = function () {
        if (!_$nhanVienForm.valid()) {
            return;
        }
        var nhanVienThucHien = _$nhanVienForm.serializeFormToObject();
        $('#NhanVienThucHienTable td .m-checkable').each(function () {
            if ($(this).prop("checked")) {
                var currentRow = $(this).parents("tr");
                currentRow.find('input[name=tenNhanVienThucHien]').val(nhanVienThucHien.tenNhanVienThucHien);
                currentRow.find('input[name=ngayThucHien]').data("DateTimePicker").date(nhanVienThucHien.ngayThucHien);
                currentRow.find('input[name=nhanVien]').val(nhanVienThucHien.nhanVien);
                currentRow.find('select[name=danhGia]').val(nhanVienThucHien.danhGia);
                currentRow.find('select[name=danhGia]').trigger("change");
            }
        })
    };
    function clearNhanVienThucHienForm() {
        _$nhanVienForm.find('input[name=tenNhanVienThucHien]').val('');
        _$nhanVienForm.find('input[name=nhanVien]').val('');
        _$nhanVienForm.find('input[name=tienChietKhau]').val('');
        _$nhanVienForm.find('input[name=pTDoanhThuDuocHuong]').val('');
        _$nhanVienForm.find('input[name=dienGiai]').val('');
    };
    $('.save-nhanvienthuchien-button').click(function () {
        saveNhanVienThucHien();
        //clearNhanVienThucHienForm();
        $('.create-nhanvienthuchien-button').show();
        $('form[name=AddNhanVienThucHienForm]').hide();
    })
    $('.create-nhanvienthuchien-button').click(function () {
        
        $('form[name=AddNhanVienThucHienForm]').show();
        $(this).hide();
    })

    
    modal.find('#CreateNewChietKhauNhanVienButton').click(function () {
        _$nhanVienForm[0].reset();
    });
    

    modal.find('#GetChietKhauNhanViensButton').click(function (e) {
        e.preventDefault();
        getNhanVienThucHiens();
    });

    $(document).keypress(function (e) {
        if (e.which === 13) {
            getNhanVienThucHiens();
        }
    });
    return true;
};