(function () {
    $(function () {

        var _$khoanThuChisTable = $('#KhoanThuChisTable');
        var _khoanThuChisService = abp.services.app.khoanThuChis;

        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.KhoanThuChis.Create'),
            edit: abp.auth.hasPermission('Pages.KhoanThuChis.Edit'),
            'delete': abp.auth.hasPermission('Pages.KhoanThuChis.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/KhoanThuChis/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/KhoanThuChis/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditKhoanThuChiModal'
        });

		 var _viewKhoanThuChiModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/KhoanThuChis/ViewkhoanThuChiModal',
            modalClass: 'ViewKhoanThuChiModal'
        });

        var dataTable = _$khoanThuChisTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _khoanThuChisService.getAll,
                inputFilter: function () {
                    return {
					filter: $('#KhoanThuChisTableFilter').val(),
					maKhoanThuChiFilter: $('#MaKhoanThuChiFilterId').val(),
					noiDungThuChiFilter: $('#NoiDungThuChiFilterId').val(),
					ghiChuFilter: $('#GhiChuFilterId').val(),
					laKhoanThuFilter: $('#LaKhoanThuFilterId').val(),
					buTruCongNoFilter: $('#BuTruCongNoFilterId').val(),
					tinhLuongFilter: $('#TinhLuongFilterId').val()
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
                                    _viewKhoanThuChiModal.open({ data: data.record });
                                }
                        },
						{
                            text: app.localize('Edit'),
                            visible: function () {
                                return _permissions.edit;
                            },
                            action: function (data) {
                                _createOrEditModal.open({ id: data.record.khoanThuChi.id });
                            }
                        }, 
						{
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deleteKhoanThuChi(data.record.khoanThuChi);
                            }
                        }]
                    }
                },
					{
						targets: 1,
						 data: "khoanThuChi.maKhoanThuChi"   
					},
					{
						targets: 2,
						 data: "khoanThuChi.noiDungThuChi"   
					},
					{
						targets: 3,
						 data: "khoanThuChi.ghiChu"   
					},
					{
						targets: 4,
						 data: "khoanThuChi.laKhoanThu"  ,
						render: function (laKhoanThu) {
							if (laKhoanThu) {
								return '<i class="la la-check-square m--font-success" title="True"></i>';
							}
							return '<i class="la la-times-circle" title="False"></i>';
					}
			 
					},
					{
						targets: 5,
						 data: "khoanThuChi.buTruCongNo"  ,
						render: function (buTruCongNo) {
							if (buTruCongNo) {
								return '<i class="la la-check-square m--font-success" title="True"></i>';
							}
							return '<i class="la la-times-circle" title="False"></i>';
					}
			 
					},
					{
						targets: 6,
						 data: "khoanThuChi.tinhLuong"  ,
						render: function (tinhLuong) {
							if (tinhLuong) {
								return '<i class="la la-check-square m--font-success" title="True"></i>';
							}
							return '<i class="la la-times-circle" title="False"></i>';
					}
			 
					}
            ]
        });


        function getKhoanThuChis() {
            dataTable.ajax.reload();
        }

        function deleteKhoanThuChi(khoanThuChi) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _khoanThuChisService.delete({
                            id: khoanThuChi.id
                        }).done(function () {
                            getKhoanThuChis(true);
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

        $('#CreateNewKhoanThuChiButton').click(function () {
            _createOrEditModal.open();
        });

		$('#ExportToExcelButton').click(function () {
            _khoanThuChisService
                .getKhoanThuChisToExcel({
				filter : $('#KhoanThuChisTableFilter').val(),
					maKhoanThuChiFilter: $('#MaKhoanThuChiFilterId').val(),
					noiDungThuChiFilter: $('#NoiDungThuChiFilterId').val(),
					ghiChuFilter: $('#GhiChuFilterId').val(),
					laKhoanThuFilter: $('#LaKhoanThuFilterId').val(),
					buTruCongNoFilter: $('#BuTruCongNoFilterId').val(),
					tinhLuongFilter: $('#TinhLuongFilterId').val()
				})
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditKhoanThuChiModalSaved', function () {
            getKhoanThuChis();
        });

		$('#GetKhoanThuChisButton').click(function (e) {
            e.preventDefault();
            getKhoanThuChis();
        });

		$(document).keypress(function(e) {
		  if(e.which === 13) {
			getKhoanThuChis();
		  }
		});

    });
})();