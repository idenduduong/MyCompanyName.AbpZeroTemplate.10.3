(function () {
    $(function () {

        var _$dM_VungMiensTable = $('#DM_VungMiensTable');
        var _dM_VungMiensService = abp.services.app.dM_VungMiens;

        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.Categories.Locations.DM_VungMiens.Create'),
            edit: abp.auth.hasPermission('Pages.Categories.Locations.DM_VungMiens.Edit'),
            'delete': abp.auth.hasPermission('Pages.Categories.Locations.DM_VungMiens.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_VungMiens/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_VungMiens/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditDM_VungMienModal'
        });

		 var _viewDM_VungMienModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_VungMiens/ViewdM_VungMienModal',
            modalClass: 'ViewDM_VungMienModal'
        });

        var dataTable = _$dM_VungMiensTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _dM_VungMiensService.getAll,
                inputFilter: function () {
                    return {
					filter: $('#DM_VungMiensTableFilter').val(),
					maVungFilter: $('#MaVungFilterId').val(),
					tenVungFilter: $('#TenVungFilterId').val()
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
                                    _viewDM_VungMienModal.open({ data: data.record });
                                }
                        },
						{
                            text: app.localize('Edit'),
                            visible: function () {
                                return _permissions.edit;
                            },
                            action: function (data) {
                                _createOrEditModal.open({ id: data.record.dM_VungMien.id });
                            }
                        }, 
						{
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deleteDM_VungMien(data.record.dM_VungMien);
                            }
                        }]
                    }
                },
					{
						targets: 1,
						 data: "dM_VungMien.maVung"   
					},
					{
						targets: 2,
						 data: "dM_VungMien.tenVung"   
					},
					{
						targets: 3,
						 data: "dM_VungMien.ghiChu"   
					}
            ]
        });


        function getDM_VungMiens() {
            dataTable.ajax.reload();
        }

        function deleteDM_VungMien(dM_VungMien) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _dM_VungMiensService.delete({
                            id: dM_VungMien.id
                        }).done(function () {
                            getDM_VungMiens(true);
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

        $('#CreateNewDM_VungMienButton').click(function () {
            _createOrEditModal.open();
        });

		$('#ExportToExcelButton').click(function () {
            _dM_VungMiensService
                .getDM_VungMiensToExcel({
				filter : $('#DM_VungMiensTableFilter').val(),
					maVungFilter: $('#MaVungFilterId').val(),
					tenVungFilter: $('#TenVungFilterId').val()
				})
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditDM_VungMienModalSaved', function () {
            getDM_VungMiens();
        });

		$('#GetDM_VungMiensButton').click(function (e) {
            e.preventDefault();
            getDM_VungMiens();
        });

		$(document).keypress(function(e) {
		  if(e.which === 13) {
			getDM_VungMiens();
		  }
		});

    });
})();