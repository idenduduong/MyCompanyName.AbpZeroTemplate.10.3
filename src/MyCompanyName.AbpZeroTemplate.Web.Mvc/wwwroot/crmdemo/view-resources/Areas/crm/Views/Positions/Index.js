(function () {
    $(function () {

        var _$positionsTable = $('#PositionsTable');
        var _positionsService = abp.services.app.positions;

        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.Positions.Create'),
            edit: abp.auth.hasPermission('Pages.Positions.Edit'),
            'delete': abp.auth.hasPermission('Pages.Positions.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/Positions/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/Positions/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditPositionModal'
        });

		 var _viewPositionModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/Positions/ViewpositionModal',
            modalClass: 'ViewPositionModal'
        });

        var dataTable = _$positionsTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _positionsService.getAll,
                inputFilter: function () {
                    return {
					filter: $('#PositionsTableFilter').val(),
					codeFilter: $('#CodeFilterId').val(),
					displayNameFilter: $('#DisplayNameFilterId').val()
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
                                    _viewPositionModal.open({ data: data.record });
                                }
                        },
						{
                            text: app.localize('Edit'),
                            visible: function () {
                                return _permissions.edit;
                            },
                            action: function (data) {
                                _createOrEditModal.open({ id: data.record.position.id });
                            }
                        }, 
						{
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deletePosition(data.record.position);
                            }
                        }]
                    }
                },
					{
						targets: 1,
						 data: "position.code"   
					},
					{
						targets: 2,
						 data: "position.displayName"   
					},
					{
						targets: 3,
						 data: "position.orderNumber"   
					}
            ]
        });


        function getPositions() {
            dataTable.ajax.reload();
        }

        function deletePosition(position) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _positionsService.delete({
                            id: position.id
                        }).done(function () {
                            getPositions(true);
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

        $('#CreateNewPositionButton').click(function () {
            _createOrEditModal.open();
        });

		$('#ExportToExcelButton').click(function () {
            _positionsService
                .getPositionsToExcel({
				filter : $('#PositionsTableFilter').val(),
					codeFilter: $('#CodeFilterId').val(),
					displayNameFilter: $('#DisplayNameFilterId').val()
				})
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditPositionModalSaved', function () {
            getPositions();
        });

		$('#GetPositionsButton').click(function (e) {
            e.preventDefault();
            getPositions();
        });

		$(document).keypress(function(e) {
		  if(e.which === 13) {
			getPositions();
		  }
		});

    });
})();