(function () {
    $(function () {

        var _$reasonsTable = $('#ReasonsTable');
        var _reasonsService = abp.services.app.reasons;
		
        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.Reasons.Create'),
            edit: abp.auth.hasPermission('Pages.Reasons.Edit'),
            'delete': abp.auth.hasPermission('Pages.Reasons.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/Reasons/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/Reasons/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditReasonModal'
        });

		 var _viewReasonModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/Reasons/ViewreasonModal',
            modalClass: 'ViewReasonModal'
        });

		
		

        var getDateFilter = function (element) {
            if (element.data("DateTimePicker").date() == null) {
                return null;
            }
            return element.data("DateTimePicker").date().format("YYYY-MM-DDT00:00:00Z"); 
        }

        var dataTable = _$reasonsTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _reasonsService.getAll,
                inputFilter: function () {
                    return {
					filter: $('#ReasonsTableFilter').val(),
					displayNameFilter: $('#DisplayNameFilterId').val(),
					codeFilter: $('#CodeFilterId').val(),
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
                                    _viewReasonModal.open({ data: data.record });
                                }
                        },
						{
                            text: app.localize('Edit'),
                            visible: function () {
                                return _permissions.edit;
                            },
                            action: function (data) {
                                _createOrEditModal.open({ id: data.record.reason.id });
                            }
                        }, 
						{
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deleteReason(data.record.reason);
                            }
                        }]
                    }
                },
					{
						targets: 1,
						 data: "reason.displayName"   
					},
					{
						targets: 2,
						 data: "reason.code"   
					},
					{
						targets: 3,
						 data: "reason.description"   
					}
            ]
        });


        function getReasons() {
            dataTable.ajax.reload();
        }

        function deleteReason(reason) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _reasonsService.delete({
                            id: reason.id
                        }).done(function () {
                            getReasons(true);
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

        $('#CreateNewReasonButton').click(function () {
            _createOrEditModal.open();
        });

		$('#ExportToExcelButton').click(function () {
            _reasonsService
                .getReasonsToExcel({
				filter : $('#ReasonsTableFilter').val(),
					displayNameFilter: $('#DisplayNameFilterId').val(),
					codeFilter: $('#CodeFilterId').val(),
					descriptionFilter: $('#DescriptionFilterId').val()
				})
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditReasonModalSaved', function () {
            getReasons();
        });

		$('#GetReasonsButton').click(function (e) {
            e.preventDefault();
            getReasons();
        });

		$(document).keypress(function(e) {
		  if(e.which === 13) {
			getReasons();
		  }
		});

    });
})();