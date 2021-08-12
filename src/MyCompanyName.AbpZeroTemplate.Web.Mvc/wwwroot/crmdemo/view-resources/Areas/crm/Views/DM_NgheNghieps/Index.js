(function () {
    $(function () {

        var _$dM_NgheNghiepsTable = $('#DM_NgheNghiepsTable');
        var _dM_NgheNghiepsService = abp.services.app.dM_NgheNghieps;

        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.DM_NgheNghieps.Create'),
            edit: abp.auth.hasPermission('Pages.DM_NgheNghieps.Edit'),
            'delete': abp.auth.hasPermission('Pages.DM_NgheNghieps.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_NgheNghieps/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DM_NgheNghieps/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditDM_NgheNghiepModal'
        });

		 var _viewDM_NgheNghiepModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DM_NgheNghieps/ViewdM_NgheNghiepModal',
            modalClass: 'ViewDM_NgheNghiepModal'
        });

        var getDateFilter = function (element) {
            if (element.data("DateTimePicker").date() == null) {
                return null;
            }
            return element.data("DateTimePicker").date().format("YYYY-MM-DDT00:00:00Z"); 
        }

        var dataTable = _$dM_NgheNghiepsTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _dM_NgheNghiepsService.getAll,
                inputFilter: function () {
                    return {
					filter: $('#DM_NgheNghiepsTableFilter').val(),
					displayNameFilter: $('#DisplayNameFilterId').val(),
					codeFilter: $('#CodeFilterId').val(),
					minDisplayOrderFilter: $('#MinDisplayOrderFilterId').val(),
					maxDisplayOrderFilter: $('#MaxDisplayOrderFilterId').val(),
					descriptionFilter: $('#DescriptionFilterId').val()
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
                                    _viewDM_NgheNghiepModal.open({ data: data.record });
                                }
                        },
						{
                            text: app.localize('Edit'),
                            visible: function () {
                                return _permissions.edit;
                            },
                            action: function (data) {
                                _createOrEditModal.open({ id: data.record.dM_NgheNghiep.id });
                            }
                        }, 
						{
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deleteDM_NgheNghiep(data.record.dM_NgheNghiep);
                            }
                        }]
                    }
                },
					{
						targets: 1,
						 data: "dM_NgheNghiep.displayName"   
					},
					{
						targets: 2,
						 data: "dM_NgheNghiep.code"   
					},
					{
						targets: 3,
						 data: "dM_NgheNghiep.displayOrder"   
					},
					{
						targets: 4,
						 data: "dM_NgheNghiep.description"   
					}
            ]
        });


        function getDM_NgheNghieps() {
            dataTable.ajax.reload();
        }

        function deleteDM_NgheNghiep(dM_NgheNghiep) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _dM_NgheNghiepsService.delete({
                            id: dM_NgheNghiep.id
                        }).done(function () {
                            getDM_NgheNghieps(true);
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

        $('#CreateNewDM_NgheNghiepButton').click(function () {
            _createOrEditModal.open();
        });

		$('#ExportToExcelButton').click(function () {
            _dM_NgheNghiepsService
                .getDM_NgheNghiepsToExcel({
				filter : $('#DM_NgheNghiepsTableFilter').val(),
					displayNameFilter: $('#DisplayNameFilterId').val(),
					codeFilter: $('#CodeFilterId').val(),
					minDisplayOrderFilter: $('#MinDisplayOrderFilterId').val(),
					maxDisplayOrderFilter: $('#MaxDisplayOrderFilterId').val(),
					descriptionFilter: $('#DescriptionFilterId').val()
				})
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditDM_NgheNghiepModalSaved', function () {
            getDM_NgheNghieps();
        });

		$('#GetDM_NgheNghiepsButton').click(function (e) {
            e.preventDefault();
            getDM_NgheNghieps();
        });

		$(document).keypress(function(e) {
		  if(e.which === 13) {
			getDM_NgheNghieps();
		  }
		});

    });
})();