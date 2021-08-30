(function () {
    $(function () {

        var _$chietKhauMacDinh_NhanViensTable = $('#ChietKhauMacDinh_NhanViensTable');
        var _chietKhauMacDinh_NhanViensService = abp.services.app.chietKhauMacDinh_NhanViens;

        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

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
                                _createOrEditModal.open({ id: data.record.chietKhauMacDinh_NhanVien.id });
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
						 data: "chietKhauMacDinh_NhanVien.laPhanTram"  ,
						render: function (laPhanTram) {
							if (laPhanTram) {
								return '<i class="la la-check-square m--font-success" title="True"></i>';
							}
							return '<i class="la la-times-circle" title="False"></i>';
					}
			 
					},
					{
						targets: 3,
						 data: "chietKhauMacDinh_NhanVien.theoNhomNhanVien"  ,
						render: function (theoNhomNhanVien) {
							if (theoNhomNhanVien) {
								return '<i class="la la-check-square m--font-success" title="True"></i>';
							}
							return '<i class="la la-times-circle" title="False"></i>';
					}
			 
					},
					{
						targets: 4,
						 data: "chietKhauMacDinh_NhanVien.theoNhomHangHoa"  ,
						render: function (theoNhomHangHoa) {
							if (theoNhomHangHoa) {
								return '<i class="la la-check-square m--font-success" title="True"></i>';
							}
							return '<i class="la la-times-circle" title="False"></i>';
					}
			 
					},
					{
						targets: 5,
						 data: "chietKhauMacDinh_NhanVien.chietKhau_YeuCau"   
					},
					{
						targets: 6,
						 data: "chietKhauMacDinh_NhanVien.laPhanTram_YeuCau"  ,
						render: function (laPhanTram_YeuCau) {
							if (laPhanTram_YeuCau) {
								return '<i class="la la-check-square m--font-success" title="True"></i>';
							}
							return '<i class="la la-times-circle" title="False"></i>';
					}
			 
					},
					{
						targets: 7,
						 data: "chietKhauMacDinh_NhanVien.chietKhauTuVan"  ,
						render: function (chietKhauTuVan) {
							if (chietKhauTuVan) {
								return '<i class="la la-check-square m--font-success" title="True"></i>';
							}
							return '<i class="la la-times-circle" title="False"></i>';
					}
			 
					},
					{
						targets: 8,
						 data: "dM_HangHoaTenHangHoa" 
					},
					{
						targets: 9,
						 data: "userName" 
					},
					{
						targets: 10,
						 data: "dM_DonViTenDonVi" 
					},
					{
						targets: 11,
						 data: "dM_NhomHangHoaTenNhom" 
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

        $('#CreateNewChietKhauMacDinh_NhanVienButton').click(function () {
            _createOrEditModal.open();
        });

		$('#ExportToExcelButton').click(function () {
            _chietKhauMacDinh_NhanViensService
                .getChietKhauMacDinh_NhanViensToExcel({
				filter : $('#ChietKhauMacDinh_NhanViensTableFilter').val(),
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

		$('#GetChietKhauMacDinh_NhanViensButton').click(function (e) {
            e.preventDefault();
            getChietKhauMacDinh_NhanViens();
        });

		$(document).keypress(function(e) {
		  if(e.which === 13) {
			getChietKhauMacDinh_NhanViens();
		  }
		});

    });
})();