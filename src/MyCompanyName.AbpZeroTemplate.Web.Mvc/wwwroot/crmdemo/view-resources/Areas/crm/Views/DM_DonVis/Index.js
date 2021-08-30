(function () {
    $(function () {

        var _$dM_DonVisTable = $('#DM_DonVisTable');
        var _dM_DonVisService = abp.services.app.dM_DonVis;

        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.DM_DonVis.Create'),
            edit: abp.auth.hasPermission('Pages.DM_DonVis.Edit'),
            'delete': abp.auth.hasPermission('Pages.DM_DonVis.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_DonVis/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_DonVis/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditDM_DonViModal'
        });

		 var _viewDM_DonViModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_DonVis/ViewdM_DonViModal',
            modalClass: 'ViewDM_DonViModal'
        });

        var dataTable = _$dM_DonVisTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _dM_DonVisService.getAll,
                inputFilter: function () {
                    return {
					filter: $('#DM_DonVisTableFilter').val(),
					maDonViFilter: $('#MaDonViFilterId').val(),
					tenDonViFilter: $('#TenDonViFilterId').val(),
					iD_ParentFilter: $('#ID_ParentFilterId').val(),
					diaChiFilter: $('#DiaChiFilterId').val(),
					websiteFilter: $('#WebsiteFilterId').val(),
					maSoThueFilter: $('#MaSoThueFilterId').val(),
					soTaiKhoanFilter: $('#SoTaiKhoanFilterId').val(),
					soDienThoaiFilter: $('#SoDienThoaiFilterId').val(),
					soFaxFilter: $('#SoFaxFilterId').val(),
					kiTuDanhMaFilter: $('#KiTuDanhMaFilterId').val(),
					hienThi_ChinhFilter: $('#HienThi_ChinhFilterId').val(),
					hienThi_PhuFilter: $('#HienThi_PhuFilterId').val(),
					dM_NganHangTenNganHangFilter: $('#DM_NganHangTenNganHangFilterId').val()
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
                                    _viewDM_DonViModal.open({ data: data.record });
                                }
                        },
						{
                            text: app.localize('Edit'),
                            visible: function () {
                                return _permissions.edit;
                            },
                            action: function (data) {
                                _createOrEditModal.open({ id: data.record.dM_DonVi.id });
                            }
                        }, 
						{
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deleteDM_DonVi(data.record.dM_DonVi);
                            }
                        }]
                    }
                },
					{
						targets: 1,
						 data: "dM_DonVi.maDonVi"   
					},
					{
						targets: 2,
						 data: "dM_DonVi.tenDonVi"   
					},
					{
						targets: 3,
						 data: "dM_DonVi.iD_Parent"   
					},
					{
						targets: 4,
						 data: "dM_DonVi.diaChi"   
					},
					{
						targets: 5,
						 data: "dM_DonVi.website"   
					},
					{
						targets: 6,
						 data: "dM_DonVi.maSoThue"   
					},
					{
						targets: 7,
						 data: "dM_DonVi.soTaiKhoan"   
					},
					{
						targets: 8,
						 data: "dM_DonVi.soDienThoai"   
					},
					{
						targets: 9,
						 data: "dM_DonVi.soFax"   
					},
					{
						targets: 10,
						 data: "dM_DonVi.kiTuDanhMa"   
					},
					{
						targets: 11,
						 data: "dM_DonVi.hienThi_Chinh"  ,
						render: function (hienThi_Chinh) {
							if (hienThi_Chinh) {
								return '<i class="la la-check-square m--font-success" title="True"></i>';
							}
							return '<i class="la la-times-circle" title="False"></i>';
					}
			 
					},
					{
						targets: 12,
						 data: "dM_DonVi.hienThi_Phu"  ,
						render: function (hienThi_Phu) {
							if (hienThi_Phu) {
								return '<i class="la la-check-square m--font-success" title="True"></i>';
							}
							return '<i class="la la-times-circle" title="False"></i>';
					}
			 
					},
					{
						targets: 13,
						 data: "dM_NganHangTenNganHang" 
					}
            ]
        });


        function getDM_DonVis() {
            dataTable.ajax.reload();
        }

        function deleteDM_DonVi(dM_DonVi) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _dM_DonVisService.delete({
                            id: dM_DonVi.id
                        }).done(function () {
                            getDM_DonVis(true);
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

        $('#CreateNewDM_DonViButton').click(function () {
            _createOrEditModal.open();
        });

		$('#ExportToExcelButton').click(function () {
            _dM_DonVisService
                .getDM_DonVisToExcel({
				filter : $('#DM_DonVisTableFilter').val(),
					maDonViFilter: $('#MaDonViFilterId').val(),
					tenDonViFilter: $('#TenDonViFilterId').val(),
					iD_ParentFilter: $('#ID_ParentFilterId').val(),
					diaChiFilter: $('#DiaChiFilterId').val(),
					websiteFilter: $('#WebsiteFilterId').val(),
					maSoThueFilter: $('#MaSoThueFilterId').val(),
					soTaiKhoanFilter: $('#SoTaiKhoanFilterId').val(),
					soDienThoaiFilter: $('#SoDienThoaiFilterId').val(),
					soFaxFilter: $('#SoFaxFilterId').val(),
					kiTuDanhMaFilter: $('#KiTuDanhMaFilterId').val(),
					hienThi_ChinhFilter: $('#HienThi_ChinhFilterId').val(),
					hienThi_PhuFilter: $('#HienThi_PhuFilterId').val(),
					dM_NganHangTenNganHangFilter: $('#DM_NganHangTenNganHangFilterId').val()
				})
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditDM_DonViModalSaved', function () {
            getDM_DonVis();
        });

		$('#GetDM_DonVisButton').click(function (e) {
            e.preventDefault();
            getDM_DonVis();
        });

		$(document).keypress(function(e) {
		  if(e.which === 13) {
			getDM_DonVis();
		  }
		});

    });
})();