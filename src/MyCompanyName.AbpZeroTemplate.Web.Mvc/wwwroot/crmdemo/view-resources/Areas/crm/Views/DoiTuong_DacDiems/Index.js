(function () {
    $(function () {

        var _$doiTuong_DacDiemsTable = $('#DoiTuong_DacDiemsTable');
        var _doiTuong_DacDiemsService = abp.services.app.doiTuong_DacDiems;

        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.DoiTuong_DacDiems.Create'),
            edit: abp.auth.hasPermission('Pages.DoiTuong_DacDiems.Edit'),
            'delete': abp.auth.hasPermission('Pages.DoiTuong_DacDiems.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DoiTuong_DacDiems/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DoiTuong_DacDiems/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditDoiTuong_DacDiemModal'
        });

		 var _viewDoiTuong_DacDiemModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DoiTuong_DacDiems/ViewdoiTuong_DacDiemModal',
            modalClass: 'ViewDoiTuong_DacDiemModal'
        });

        var dataTable = _$doiTuong_DacDiemsTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _doiTuong_DacDiemsService.getAll,
                inputFilter: function () {
                    return {
					filter: $('#DoiTuong_DacDiemsTableFilter').val(),
					laDoiTuongFilter: $('#LaDoiTuongFilterId').val(),
					dM_DoiTuongTenDoiTuongFilter: $('#DM_DoiTuongTenDoiTuongFilterId').val(),
					dM_DacDiemKhachHangTenDacDiemFilter: $('#DM_DacDiemKhachHangTenDacDiemFilterId').val()
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
                                    _viewDoiTuong_DacDiemModal.open({ data: data.record });
                                }
                        },
						{
                            text: app.localize('Edit'),
                            visible: function () {
                                return _permissions.edit;
                            },
                            action: function (data) {
                                _createOrEditModal.open({ id: data.record.doiTuong_DacDiem.id });
                            }
                        }, 
						{
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deleteDoiTuong_DacDiem(data.record.doiTuong_DacDiem);
                            }
                        }]
                    }
                },
					{
						targets: 1,
						 data: "doiTuong_DacDiem.laDoiTuong"  ,
						render: function (laDoiTuong) {
							if (laDoiTuong) {
								return '<i class="la la-check-square m--font-success" title="True"></i>';
							}
							return '<i class="la la-times-circle" title="False"></i>';
					}
			 
					},
					{
						targets: 2,
						 data: "dM_DoiTuongTenDoiTuong" 
					},
					{
						targets: 3,
						 data: "dM_DacDiemKhachHangTenDacDiem" 
					}
            ]
        });


        function getDoiTuong_DacDiems() {
            dataTable.ajax.reload();
        }

        function deleteDoiTuong_DacDiem(doiTuong_DacDiem) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _doiTuong_DacDiemsService.delete({
                            id: doiTuong_DacDiem.id
                        }).done(function () {
                            getDoiTuong_DacDiems(true);
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

        $('#CreateNewDoiTuong_DacDiemButton').click(function () {
            _createOrEditModal.open();
        });

		$('#ExportToExcelButton').click(function () {
            _doiTuong_DacDiemsService
                .getDoiTuong_DacDiemsToExcel({
				filter : $('#DoiTuong_DacDiemsTableFilter').val(),
					laDoiTuongFilter: $('#LaDoiTuongFilterId').val(),
					dM_DoiTuongTenDoiTuongFilter: $('#DM_DoiTuongTenDoiTuongFilterId').val(),
					dM_DacDiemKhachHangTenDacDiemFilter: $('#DM_DacDiemKhachHangTenDacDiemFilterId').val()
				})
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditDoiTuong_DacDiemModalSaved', function () {
            getDoiTuong_DacDiems();
        });

		$('#GetDoiTuong_DacDiemsButton').click(function (e) {
            e.preventDefault();
            getDoiTuong_DacDiems();
        });

		$(document).keypress(function(e) {
		  if(e.which === 13) {
			getDoiTuong_DacDiems();
		  }
		});

    });
})();