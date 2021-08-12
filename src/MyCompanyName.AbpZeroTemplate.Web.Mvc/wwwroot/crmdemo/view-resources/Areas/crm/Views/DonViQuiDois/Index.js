(function () {
    $(function () {

        var _$donViQuiDoisTable = $('#DonViQuiDoisTable');
        var _donViQuiDoisService = abp.services.app.donViQuiDois;

        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.DonViQuiDois.Create'),
            edit: abp.auth.hasPermission('Pages.DonViQuiDois.Edit'),
            'delete': abp.auth.hasPermission('Pages.DonViQuiDois.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DonViQuiDois/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DonViQuiDois/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditDonViQuiDoiModal'
        });

		 var _viewDonViQuiDoiModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DonViQuiDois/ViewdonViQuiDoiModal',
            modalClass: 'ViewDonViQuiDoiModal'
        });

        var dataTable = _$donViQuiDoisTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _donViQuiDoisService.getAll,
                inputFilter: function () {
                    return {
					filter: $('#DonViQuiDoisTableFilter').val(),
					minTyLeChuyenDoiFilter: $('#MinTyLeChuyenDoiFilterId').val(),
					maxTyLeChuyenDoiFilter: $('#MaxTyLeChuyenDoiFilterId').val(),
					laDonViChuanFilter: $('#LaDonViChuanFilterId').val(),
					minGiaNhapFilter: $('#MinGiaNhapFilterId').val(),
					maxGiaNhapFilter: $('#MaxGiaNhapFilterId').val(),
					minGiaBanFilter: $('#MinGiaBanFilterId').val(),
					maxGiaBanFilter: $('#MaxGiaBanFilterId').val(),
					ghiChuFilter: $('#GhiChuFilterId').val(),
					dM_HangHoaTenHangHoaFilter: $('#DM_HangHoaTenHangHoaFilterId').val(),
					dM_DonViTinhTenDonViTinhFilter: $('#DM_DonViTinhTenDonViTinhFilterId').val()
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
                                    _viewDonViQuiDoiModal.open({ data: data.record });
                                }
                        },
						{
                            text: app.localize('Edit'),
                            visible: function () {
                                return _permissions.edit;
                            },
                            action: function (data) {
                                _createOrEditModal.open({ id: data.record.donViQuiDoi.id });
                            }
                        }, 
						{
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deleteDonViQuiDoi(data.record.donViQuiDoi);
                            }
                        }]
                    }
                },
					{
						targets: 1,
						 data: "donViQuiDoi.tyLeChuyenDoi"   
					},
					{
						targets: 2,
						 data: "donViQuiDoi.laDonViChuan"  ,
						render: function (laDonViChuan) {
							if (laDonViChuan) {
								return '<i class="la la-check-square m--font-success" title="True"></i>';
							}
							return '<i class="la la-times-circle" title="False"></i>';
					}
			 
					},
					{
						targets: 3,
						 data: "donViQuiDoi.giaNhap"   
					},
					{
						targets: 4,
						 data: "donViQuiDoi.giaBan"   
					},
					{
						targets: 5,
						 data: "donViQuiDoi.ghiChu"   
					},
					{
						targets: 6,
						 data: "dM_HangHoaTenHangHoa" 
					},
					{
						targets: 7,
						 data: "dM_DonViTinhTenDonViTinh" 
					}
            ]
        });


        function getDonViQuiDois() {
            dataTable.ajax.reload();
        }

        function deleteDonViQuiDoi(donViQuiDoi) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _donViQuiDoisService.delete({
                            id: donViQuiDoi.id
                        }).done(function () {
                            getDonViQuiDois(true);
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

        $('#CreateNewDonViQuiDoiButton').click(function () {
            _createOrEditModal.open();
        });

		$('#ExportToExcelButton').click(function () {
            _donViQuiDoisService
                .getDonViQuiDoisToExcel({
				filter : $('#DonViQuiDoisTableFilter').val(),
					minTyLeChuyenDoiFilter: $('#MinTyLeChuyenDoiFilterId').val(),
					maxTyLeChuyenDoiFilter: $('#MaxTyLeChuyenDoiFilterId').val(),
					laDonViChuanFilter: $('#LaDonViChuanFilterId').val(),
					minGiaNhapFilter: $('#MinGiaNhapFilterId').val(),
					maxGiaNhapFilter: $('#MaxGiaNhapFilterId').val(),
					minGiaBanFilter: $('#MinGiaBanFilterId').val(),
					maxGiaBanFilter: $('#MaxGiaBanFilterId').val(),
					ghiChuFilter: $('#GhiChuFilterId').val(),
					dM_HangHoaTenHangHoaFilter: $('#DM_HangHoaTenHangHoaFilterId').val(),
					dM_DonViTinhTenDonViTinhFilter: $('#DM_DonViTinhTenDonViTinhFilterId').val()
				})
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditDonViQuiDoiModalSaved', function () {
            getDonViQuiDois();
        });

		$('#GetDonViQuiDoisButton').click(function (e) {
            e.preventDefault();
            getDonViQuiDois();
        });

		$(document).keypress(function(e) {
		  if(e.which === 13) {
			getDonViQuiDois();
		  }
		});

    });
})();