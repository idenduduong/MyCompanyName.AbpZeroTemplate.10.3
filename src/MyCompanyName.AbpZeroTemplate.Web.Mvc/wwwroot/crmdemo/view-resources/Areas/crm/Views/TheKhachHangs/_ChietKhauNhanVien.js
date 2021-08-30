var ChietKhauNhanVien = function (_modalManager) {
    var modal = _modalManager.getModal();
    var _$nhanVienForm = modal.find('form[name=NhanVienTuVanForm]');
    var _$theKhachHangInformationForm = modal.find('form[name=TheKhachHangInformationsForm]');
    var _$nhanVienThucHiensTable = $('#ChietKhauNhanViensTable');
    var _chietKhauNhanViensService = abp.services.app.nhanVienThucHiens;
    
    var idTheKhachHang = modal.find('input[name=id]').val();
    idTheKhachHang = (idTheKhachHang == "" || idTheKhachHang == undefined) ? modal.find('input[name=tempId]').val() : idTheKhachHang;

    $('.date-picker').datetimepicker({
        locale: abp.localization.currentLanguage.name,
        format: 'L'
    });

    var _permissions = {
        create: true, //abp.auth.hasPermission('Pages.NhanVienThucHiens.Create'),
        edit: true, //abp.auth.hasPermission('Pages.NhanVienThucHiens.Edit'),
        'delete': true //abp.auth.hasPermission('Pages.NhanVienThucHiens.Delete')
    };

    var _userLookupTableModal = new app.ModalManager({
        viewUrl: abp.appPath + 'crm/Common/SaleLookupTableModal',
        scriptUrl: abp.appPath + 'view-resources/Areas/crm/Common/_SaleLookupTableModal.js',
        modalClass: 'SaleLookupTableModal'
    });

    var chietKhauNhanVien = _$nhanVienThucHiensTable.DataTable({
        paging: true,
        serverSide: true,
        processing: true,
        listAction: {
            ajaxFunction: _chietKhauNhanViensService.getAll,
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
                data: "nhanVienThucHien.laNhanVienChinh",
                render: function (laNhanVienChinh) {
                    if (laNhanVienChinh) {
                        return '<i class="la la-check-square m--font-success" title="True"></i>';
                    }
                    return '<i class="la la-times-circle" title="False"></i>';
                }
            }

        ],
        select: {
            style: 'single'
        }
    });

    chietKhauNhanVien
        .on('select', function (e, dt, type, indexes) {

            var count = chietKhauNhanVien.rows({ selected: true }).count();

            if (count > 0) {
                RenderNhanVienForm(chietKhauNhanVien.rows({ selected: true }).data()[0]);
                $('.save-nhanvien-button').show();
                $(".cancel-nhanvien-button").show();
                $(".add-nhanvien-button").hide();
            }
        });
    function getChietKhauNhanViens() {
        chietKhauNhanVien.ajax.reload();
    }

    function deleteChietKhauNhanVien(nhanVienThucHien) {
        abp.message.confirm(
            '',
            function (isConfirmed) {
                if (isConfirmed) {
                    _chietKhauNhanViensService.delete({
                        id: nhanVienThucHien.id
                    }).done(function () {
                        getChietKhauNhanViens(true);
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
        _$nhanVienForm.find('input[name=laNhanVienChinh]').prop("checked", data.nhanVienThucHien.laNhanVienChinh);
    }
    
    $('#OpenNhanVienLookupTableButton').click(function () {

        var nhanVienThucHien = _$nhanVienForm.serializeFormToObject();
        
        _userLookupTableModal.open({ id: nhanVienThucHien.nhanVien, displayName: nhanVienThucHien.userName }, function (data) {
            _$nhanVienForm.find('input[name=userName]').val(data.tenNhanVien);
            _$nhanVienForm.find('input[name=nhanVien]').val(data.id);
            _$nhanVienForm.find('input[name=tienChietKhau]').val(data.ptChietKhau);
        });
    });

    $('#ClearNhanVienButton').click(function () {
        _$nhanVienForm.find('input[name=userName]').val('');
        _$nhanVienForm.find('input[name=nhanVien]').val('');
        _$nhanVienForm.find('input[name=tienChietKhau]').val('');
    });
    function ClearForm() {
        _$nhanVienForm.find('input[name=id]').val('');
        _$nhanVienForm.find('input[name=userName]').val('');
        _$nhanVienForm.find('input[name=nhanVien]').val('');
        _$nhanVienForm.find('input[name=tienChietKhau]').val('');
    }

    var saveNhanVienTuVan = function () {
        if (!_$nhanVienForm.valid()) {
            return;
        }
        var theKhachHang = _$theKhachHangInformationForm.serializeFormToObject();

        var theKhachHangId = theKhachHang.tempId == "" ? theKhachHang.id : theKhachHang.tempId;
        var nhanVienThucHien = _$nhanVienForm.serializeFormToObject();
        nhanVienThucHien.maChungTu = theKhachHangId;
        nhanVienThucHien.loaiChungTu = 11;
        _modalManager.setBusy(true);
        _chietKhauNhanViensService.createOrEdit(
            nhanVienThucHien
        ).done(function () {
            abp.notify.info(app.localize('SavedSuccessfully'));
            
            getChietKhauNhanViens();
            ClearForm();
        }).always(function () {
            _modalManager.setBusy(false);
        });
    };

    $('.save-nhanvien-button').click(function () {
        saveNhanVienTuVan();
    })
    $(".reset-nhanvien-button").click(function () {
        ClearForm();
        var data = chietKhauNhanVien.rows({ selected: true }).data()[0];
        RenderNhanVienForm(data);
    })
    $(".cancel-nhanvien-button").click(function () {
        ClearForm();
    })
    
    modal.find('#CreateNewChietKhauNhanVienButton').click(function () {
        _$nhanVienForm[0].reset();
    });
    

    modal.find('#GetChietKhauNhanViensButton').click(function (e) {
        e.preventDefault();
        getChietKhauNhanViens();
    });

    $(document).keypress(function (e) {
        if (e.which === 13) {
            getChietKhauNhanViens();
        }
    });
    return true;
};