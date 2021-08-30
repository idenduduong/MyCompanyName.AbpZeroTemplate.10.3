(function () {
    $(function () {

        var _$khoanChiPhi_DoanhThusTable = $('#KhoanChiPhi_DoanhThusTable');
        var _khoanChiPhi_DoanhThusService = abp.services.app.khoanChiPhi_DoanhThus;

        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.KhoanChiPhi_DoanhThus.Create'),
            edit: abp.auth.hasPermission('Pages.KhoanChiPhi_DoanhThus.Edit'),
            'delete': abp.auth.hasPermission('Pages.KhoanChiPhi_DoanhThus.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/KhoanChiPhi_DoanhThus/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/KhoanChiPhi_DoanhThus/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditKhoanChiPhi_DoanhThuModal'
        });

		 var _viewKhoanChiPhi_DoanhThuModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/KhoanChiPhi_DoanhThus/ViewkhoanChiPhi_DoanhThuModal',
            modalClass: 'ViewKhoanChiPhi_DoanhThuModal'
        });

        var dataTable = _$khoanChiPhi_DoanhThusTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _khoanChiPhi_DoanhThusService.getAll,
                inputFilter: function () {
                    return {
					filter: $('#KhoanChiPhi_DoanhThusTableFilter').val(),
					maFilter: $('#MaFilterId').val(),
					tenFilter: $('#TenFilterId').val(),
					ghiChuFilter: $('#GhiChuFilterId').val(),
					laChiPhiFilter: $('#LaChiPhiFilterId').val(),
					suDungFilter: $('#SuDungFilterId').val()
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
                                    _viewKhoanChiPhi_DoanhThuModal.open({ data: data.record });
                                }
                        },
						{
                            text: app.localize('Edit'),
                            visible: function () {
                                return _permissions.edit;
                            },
                            action: function (data) {
                                _createOrEditModal.open({ id: data.record.khoanChiPhi_DoanhThu.id });
                            }
                        }, 
						{
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deleteKhoanChiPhi_DoanhThu(data.record.khoanChiPhi_DoanhThu);
                            }
                        }]
                    }
                },
					{
						targets: 1,
						 data: "khoanChiPhi_DoanhThu.ma"   
					},
					{
						targets: 2,
						 data: "khoanChiPhi_DoanhThu.ten"   
					},
					{
						targets: 3,
						 data: "khoanChiPhi_DoanhThu.ghiChu"   
					},
					{
						targets: 4,
						 data: "khoanChiPhi_DoanhThu.laChiPhi"  ,
						render: function (laChiPhi) {
							if (laChiPhi) {
								return '<i class="la la-check-square m--font-success" title="True"></i>';
							}
							return '<i class="la la-times-circle" title="False"></i>';
					}
			 
					},
					{
						targets: 5,
						 data: "khoanChiPhi_DoanhThu.suDung"  ,
						render: function (suDung) {
							if (suDung) {
								return '<i class="la la-check-square m--font-success" title="True"></i>';
							}
							return '<i class="la la-times-circle" title="False"></i>';
					}
			 
					}
            ]
        });


        function getKhoanChiPhi_DoanhThus() {
            dataTable.ajax.reload();
        }

        function deleteKhoanChiPhi_DoanhThu(khoanChiPhi_DoanhThu) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _khoanChiPhi_DoanhThusService.delete({
                            id: khoanChiPhi_DoanhThu.id
                        }).done(function () {
                            getKhoanChiPhi_DoanhThus(true);
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

        $('#CreateNewKhoanChiPhi_DoanhThuButton').click(function () {
            _createOrEditModal.open();
        });

		$('#ExportToExcelButton').click(function () {
            _khoanChiPhi_DoanhThusService
                .getKhoanChiPhi_DoanhThusToExcel({
				filter : $('#KhoanChiPhi_DoanhThusTableFilter').val(),
					maFilter: $('#MaFilterId').val(),
					tenFilter: $('#TenFilterId').val(),
					ghiChuFilter: $('#GhiChuFilterId').val(),
					laChiPhiFilter: $('#LaChiPhiFilterId').val(),
					suDungFilter: $('#SuDungFilterId').val()
				})
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditKhoanChiPhi_DoanhThuModalSaved', function () {
            getKhoanChiPhi_DoanhThus();
        });

		$('#GetKhoanChiPhi_DoanhThusButton').click(function (e) {
            e.preventDefault();
            getKhoanChiPhi_DoanhThus();
        });

		$(document).keypress(function(e) {
		  if(e.which === 13) {
			getKhoanChiPhi_DoanhThus();
		  }
		});

    });
})();