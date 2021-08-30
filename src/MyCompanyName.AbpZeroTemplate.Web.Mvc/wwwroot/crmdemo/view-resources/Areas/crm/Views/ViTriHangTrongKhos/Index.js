(function () {
    $(function () {

        var _$viTriHangTrongKhosTable = $('#ViTriHangTrongKhosTable');
        var _viTriHangTrongKhosService = abp.services.app.viTriHangTrongKhos;

        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.ViTriHangTrongKhos.Create'),
            edit: abp.auth.hasPermission('Pages.ViTriHangTrongKhos.Edit'),
            'delete': abp.auth.hasPermission('Pages.ViTriHangTrongKhos.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/ViTriHangTrongKhos/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/ViTriHangTrongKhos/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditViTriHangTrongKhoModal'
        });

		 var _viewViTriHangTrongKhoModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/ViTriHangTrongKhos/ViewviTriHangTrongKhoModal',
            modalClass: 'ViewViTriHangTrongKhoModal'
        });

        var dataTable = _$viTriHangTrongKhosTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _viTriHangTrongKhosService.getAll,
                inputFilter: function () {
                    return {
					filter: $('#ViTriHangTrongKhosTableFilter').val(),
					iD_MaVachFilter: $('#ID_MaVachFilterId').val(),
					viTriFilter: $('#ViTriFilterId').val(),
					dM_KhoTenKhoFilter: $('#DM_KhoTenKhoFilterId').val(),
					dM_HangHoaTenHangHoaFilter: $('#DM_HangHoaTenHangHoaFilterId').val()
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
                                    _viewViTriHangTrongKhoModal.open({ data: data.record });
                                }
                        },
						{
                            text: app.localize('Edit'),
                            visible: function () {
                                return _permissions.edit;
                            },
                            action: function (data) {
                                _createOrEditModal.open({ id: data.record.viTriHangTrongKho.id });
                            }
                        }, 
						{
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deleteViTriHangTrongKho(data.record.viTriHangTrongKho);
                            }
                        }]
                    }
                },
					{
						targets: 1,
						 data: "viTriHangTrongKho.iD_MaVach"   
					},
					{
						targets: 2,
						 data: "viTriHangTrongKho.viTri"   
					},
					{
						targets: 3,
						 data: "dM_KhoTenKho" 
					},
					{
						targets: 4,
						 data: "dM_HangHoaTenHangHoa" 
					}
            ]
        });


        function getViTriHangTrongKhos() {
            dataTable.ajax.reload();
        }

        function deleteViTriHangTrongKho(viTriHangTrongKho) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _viTriHangTrongKhosService.delete({
                            id: viTriHangTrongKho.id
                        }).done(function () {
                            getViTriHangTrongKhos(true);
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

        $('#CreateNewViTriHangTrongKhoButton').click(function () {
            _createOrEditModal.open();
        });

		$('#ExportToExcelButton').click(function () {
            _viTriHangTrongKhosService
                .getViTriHangTrongKhosToExcel({
				filter : $('#ViTriHangTrongKhosTableFilter').val(),
					iD_MaVachFilter: $('#ID_MaVachFilterId').val(),
					viTriFilter: $('#ViTriFilterId').val(),
					dM_KhoTenKhoFilter: $('#DM_KhoTenKhoFilterId').val(),
					dM_HangHoaTenHangHoaFilter: $('#DM_HangHoaTenHangHoaFilterId').val()
				})
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditViTriHangTrongKhoModalSaved', function () {
            getViTriHangTrongKhos();
        });

		$('#GetViTriHangTrongKhosButton').click(function (e) {
            e.preventDefault();
            getViTriHangTrongKhos();
        });

		$(document).keypress(function(e) {
		  if(e.which === 13) {
			getViTriHangTrongKhos();
		  }
		});

    });
})();