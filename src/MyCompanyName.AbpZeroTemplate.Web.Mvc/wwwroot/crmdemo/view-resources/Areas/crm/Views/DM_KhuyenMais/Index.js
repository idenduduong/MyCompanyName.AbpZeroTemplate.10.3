(function () {
    $(function () {

        var _$dM_KhuyenMaisTable = $('#DM_KhuyenMaisTable');
        var _dM_KhuyenMaisService = abp.services.app.dM_KhuyenMais;

        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.DM_KhuyenMais.Create'),
            edit: abp.auth.hasPermission('Pages.DM_KhuyenMais.Edit'),
            'delete': abp.auth.hasPermission('Pages.DM_KhuyenMais.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_KhuyenMais/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_KhuyenMais/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditDM_KhuyenMaiModal'
        });

		 var _viewDM_KhuyenMaiModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_KhuyenMais/ViewdM_KhuyenMaiModal',
            modalClass: 'ViewDM_KhuyenMaiModal'
        });

        var dataTable = _$dM_KhuyenMaisTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _dM_KhuyenMaisService.getAll,
                inputFilter: function () {
                    return {
					filter: $('#DM_KhuyenMaisTableFilter').val(),
					displayNameFilter: $('#DisplayNameFilterId').val(),
					codeFilter: $('#CodeFilterId').val(),
					soQuyetDinhFilter: $('#SoQuyetDinhFilterId').val()
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
                                    _viewDM_KhuyenMaiModal.open({ data: data.record });
                                }
                        },
						{
                            text: app.localize('Edit'),
                            visible: function () {
                                return _permissions.edit;
                            },
                            action: function (data) {
                                _createOrEditModal.open({ id: data.record.dM_KhuyenMai.id });
                            }
                        }, 
						{
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deleteDM_KhuyenMai(data.record.dM_KhuyenMai);
                            }
                        }]
                    }
                },
					{
						targets: 1,
						 data: "dM_KhuyenMai.displayName"   
					},
					{
						targets: 2,
						 data: "dM_KhuyenMai.code"   
					},
					{
						targets: 3,
						 data: "dM_KhuyenMai.soQuyetDinh"   
					}
            ]
        });


        function getDM_KhuyenMais() {
            dataTable.ajax.reload();
        }

        function deleteDM_KhuyenMai(dM_KhuyenMai) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _dM_KhuyenMaisService.delete({
                            id: dM_KhuyenMai.id
                        }).done(function () {
                            getDM_KhuyenMais(true);
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

        $('#CreateNewDM_KhuyenMaiButton').click(function () {
            _createOrEditModal.open();
        });

		$('#ExportToExcelButton').click(function () {
            _dM_KhuyenMaisService
                .getDM_KhuyenMaisToExcel({
				filter : $('#DM_KhuyenMaisTableFilter').val(),
					displayNameFilter: $('#DisplayNameFilterId').val(),
					codeFilter: $('#CodeFilterId').val(),
					soQuyetDinhFilter: $('#SoQuyetDinhFilterId').val()
				})
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditDM_KhuyenMaiModalSaved', function () {
            getDM_KhuyenMais();
        });

		$('#GetDM_KhuyenMaisButton').click(function (e) {
            e.preventDefault();
            getDM_KhuyenMais();
        });

		$(document).keypress(function(e) {
		  if(e.which === 13) {
			getDM_KhuyenMais();
		  }
		});

    });
})();