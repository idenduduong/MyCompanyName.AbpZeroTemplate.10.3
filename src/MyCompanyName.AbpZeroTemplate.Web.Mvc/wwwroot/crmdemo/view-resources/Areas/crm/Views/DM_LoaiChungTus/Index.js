(function () {
    $(function () {

        var _$dM_LoaiChungTusTable = $('#DM_LoaiChungTusTable');
        var _dM_LoaiChungTusService = abp.services.app.dM_LoaiChungTus;

        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.DM_LoaiChungTus.Create'),
            edit: abp.auth.hasPermission('Pages.DM_LoaiChungTus.Edit'),
            'delete': abp.auth.hasPermission('Pages.DM_LoaiChungTus.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_LoaiChungTus/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_LoaiChungTus/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditDM_LoaiChungTuModal'
        });

		 var _viewDM_LoaiChungTuModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_LoaiChungTus/ViewdM_LoaiChungTuModal',
            modalClass: 'ViewDM_LoaiChungTuModal'
        });

        var dataTable = _$dM_LoaiChungTusTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _dM_LoaiChungTusService.getAll,
                inputFilter: function () {
                    return {
					filter: $('#DM_LoaiChungTusTableFilter').val(),
					loaiChungTuFilter: $('#LoaiChungTuFilterId').val(),
					ghiChuFilter: $('#GhiChuFilterId').val()
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
                                    _viewDM_LoaiChungTuModal.open({ data: data.record });
                                }
                        },
						{
                            text: app.localize('Edit'),
                            visible: function () {
                                return _permissions.edit;
                            },
                            action: function (data) {
                                _createOrEditModal.open({ id: data.record.dM_LoaiChungTu.id });
                            }
                        }, 
						{
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deleteDM_LoaiChungTu(data.record.dM_LoaiChungTu);
                            }
                        }]
                    }
                },
					{
						targets: 1,
						 data: "dM_LoaiChungTu.loaiChungTu"   
					},
					{
						targets: 2,
						 data: "dM_LoaiChungTu.ghiChu"   
					}
            ]
        });


        function getDM_LoaiChungTus() {
            dataTable.ajax.reload();
        }

        function deleteDM_LoaiChungTu(dM_LoaiChungTu) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _dM_LoaiChungTusService.delete({
                            id: dM_LoaiChungTu.id
                        }).done(function () {
                            getDM_LoaiChungTus(true);
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

        $('#CreateNewDM_LoaiChungTuButton').click(function () {
            _createOrEditModal.open();
        });

		$('#ExportToExcelButton').click(function () {
            _dM_LoaiChungTusService
                .getDM_LoaiChungTusToExcel({
				filter : $('#DM_LoaiChungTusTableFilter').val(),
					loaiChungTuFilter: $('#LoaiChungTuFilterId').val(),
					ghiChuFilter: $('#GhiChuFilterId').val()
				})
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditDM_LoaiChungTuModalSaved', function () {
            getDM_LoaiChungTus();
        });

		$('#GetDM_LoaiChungTusButton').click(function (e) {
            e.preventDefault();
            getDM_LoaiChungTus();
        });

		$(document).keypress(function(e) {
		  if(e.which === 13) {
			getDM_LoaiChungTus();
		  }
		});

    });
})();