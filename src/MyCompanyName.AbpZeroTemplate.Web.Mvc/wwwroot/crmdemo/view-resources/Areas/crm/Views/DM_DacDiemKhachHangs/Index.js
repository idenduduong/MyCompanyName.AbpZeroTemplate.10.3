(function () {
    $(function () {

        var _$dM_DacDiemKhachHangsTable = $('#DM_DacDiemKhachHangsTable');
        var _dM_DacDiemKhachHangsService = abp.services.app.dM_DacDiemKhachHangs;

        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.DM_DacDiemKhachHangs.Create'),
            edit: abp.auth.hasPermission('Pages.DM_DacDiemKhachHangs.Edit'),
            'delete': abp.auth.hasPermission('Pages.DM_DacDiemKhachHangs.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_DacDiemKhachHangs/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_DacDiemKhachHangs/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditDM_DacDiemKhachHangModal'
        });

		 var _viewDM_DacDiemKhachHangModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_DacDiemKhachHangs/ViewdM_DacDiemKhachHangModal',
            modalClass: 'ViewDM_DacDiemKhachHangModal'
        });

        var dataTable = _$dM_DacDiemKhachHangsTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _dM_DacDiemKhachHangsService.getAll,
                inputFilter: function () {
                    return {
					filter: $('#DM_DacDiemKhachHangsTableFilter').val(),
					maDacDiemFilter: $('#MaDacDiemFilterId').val(),
					tenDacDiemFilter: $('#TenDacDiemFilterId').val()
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
                                    _viewDM_DacDiemKhachHangModal.open({ data: data.record });
                                }
                        },
						{
                            text: app.localize('Edit'),
                            visible: function () {
                                return _permissions.edit;
                            },
                            action: function (data) {
                                _createOrEditModal.open({ id: data.record.dM_DacDiemKhachHang.id });
                            }
                        }, 
						{
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deleteDM_DacDiemKhachHang(data.record.dM_DacDiemKhachHang);
                            }
                        }]
                    }
                },
					{
						targets: 1,
						 data: "dM_DacDiemKhachHang.maDacDiem"   
					},
					{
						targets: 2,
						 data: "dM_DacDiemKhachHang.tenDacDiem"   
					}
            ]
        });


        function getDM_DacDiemKhachHangs() {
            dataTable.ajax.reload();
        }

        function deleteDM_DacDiemKhachHang(dM_DacDiemKhachHang) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _dM_DacDiemKhachHangsService.delete({
                            id: dM_DacDiemKhachHang.id
                        }).done(function () {
                            getDM_DacDiemKhachHangs(true);
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

        $('#CreateNewDM_DacDiemKhachHangButton').click(function () {
            _createOrEditModal.open();
        });

		$('#ExportToExcelButton').click(function () {
            _dM_DacDiemKhachHangsService
                .getDM_DacDiemKhachHangsToExcel({
				filter : $('#DM_DacDiemKhachHangsTableFilter').val(),
					maDacDiemFilter: $('#MaDacDiemFilterId').val(),
					tenDacDiemFilter: $('#TenDacDiemFilterId').val()
				})
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditDM_DacDiemKhachHangModalSaved', function () {
            getDM_DacDiemKhachHangs();
        });

		$('#GetDM_DacDiemKhachHangsButton').click(function (e) {
            e.preventDefault();
            getDM_DacDiemKhachHangs();
        });

		$(document).keypress(function(e) {
		  if(e.which === 13) {
			getDM_DacDiemKhachHangs();
		  }
		});

    });
})();