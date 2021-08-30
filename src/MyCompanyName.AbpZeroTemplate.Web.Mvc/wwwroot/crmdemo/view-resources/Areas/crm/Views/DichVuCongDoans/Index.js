(function () {
    $(function () {

        var _$dichVuCongDoansTable = $('#DichVuCongDoansTable');
        var _dichVuCongDoansService = abp.services.app.dichVuCongDoans;

        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.DichVuCongDoans.Create'),
            edit: abp.auth.hasPermission('Pages.DichVuCongDoans.Edit'),
            'delete': abp.auth.hasPermission('Pages.DichVuCongDoans.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DichVuCongDoans/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/DichVuCongDoans/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditDichVuCongDoanModal'
        });

		 var _viewDichVuCongDoanModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/DichVuCongDoans/ViewdichVuCongDoanModal',
            modalClass: 'ViewDichVuCongDoanModal'
        });

        var dataTable = _$dichVuCongDoansTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _dichVuCongDoansService.getAll,
                inputFilter: function () {
                    return {
					filter: $('#DichVuCongDoansTableFilter').val(),
					minTimeFilter: $('#MinTimeFilterId').val(),
					maxTimeFilter: $('#MaxTimeFilterId').val(),
					dM_HangHoaTenHangHoaFilter: $('#DM_HangHoaTenHangHoaFilterId').val(),
					congDoanDisplayNameFilter: $('#CongDoanDisplayNameFilterId').val()
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
                                    _viewDichVuCongDoanModal.open({ data: data.record });
                                }
                        },
						{
                            text: app.localize('Edit'),
                            visible: function () {
                                return _permissions.edit;
                            },
                            action: function (data) {
                                _createOrEditModal.open({ id: data.record.dichVuCongDoan.id });
                            }
                        }, 
						{
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deleteDichVuCongDoan(data.record.dichVuCongDoan);
                            }
                        }]
                    }
                },
					{
						targets: 1,
						 data: "dichVuCongDoan.orderNumber"   
					},
					{
						targets: 2,
						 data: "dichVuCongDoan.description"   
					},
					{
						targets: 3,
						 data: "dichVuCongDoan.time"   
					},
					{
						targets: 4,
						 data: "dM_HangHoaTenHangHoa" 
					},
					{
						targets: 5,
						 data: "congDoanDisplayName" 
					}
            ]
        });


        function getDichVuCongDoans() {
            dataTable.ajax.reload();
        }

        function deleteDichVuCongDoan(dichVuCongDoan) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _dichVuCongDoansService.delete({
                            id: dichVuCongDoan.id
                        }).done(function () {
                            getDichVuCongDoans(true);
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

        $('#CreateNewDichVuCongDoanButton').click(function () {
            _createOrEditModal.open();
        });

		$('#ExportToExcelButton').click(function () {
            _dichVuCongDoansService
                .getDichVuCongDoansToExcel({
				filter : $('#DichVuCongDoansTableFilter').val(),
					minTimeFilter: $('#MinTimeFilterId').val(),
					maxTimeFilter: $('#MaxTimeFilterId').val(),
					dM_HangHoaTenHangHoaFilter: $('#DM_HangHoaTenHangHoaFilterId').val(),
					congDoanDisplayNameFilter: $('#CongDoanDisplayNameFilterId').val()
				})
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditDichVuCongDoanModalSaved', function () {
            getDichVuCongDoans();
        });

		$('#GetDichVuCongDoansButton').click(function (e) {
            e.preventDefault();
            getDichVuCongDoans();
        });

		$(document).keypress(function(e) {
		  if(e.which === 13) {
			getDichVuCongDoans();
		  }
		});

    });
})();