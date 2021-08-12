(function () {
    $(function () {

        var _$nguonKhachHangsTable = $('#NguonKhachHangsTable');
        var _nguonKhachHangsService = abp.services.app.nguonKhachHangs;

        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.Categories.NguonKhachHangs.Create'),
            edit: abp.auth.hasPermission('Pages.Categories.NguonKhachHangs.Edit'),
            'delete': abp.auth.hasPermission('Pages.Categories.NguonKhachHangs.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/NguonKhachHangs/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/NguonKhachHangs/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditNguonKhachHangModal'
        });

		 var _viewNguonKhachHangModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/NguonKhachHangs/ViewnguonKhachHangModal',
            modalClass: 'ViewNguonKhachHangModal'
        });

        var dataTable = _$nguonKhachHangsTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _nguonKhachHangsService.getAll,
                inputFilter: function () {
                    return {
					filter: $('#NguonKhachHangsTableFilter').val(),
					tenNguonKhachFilter: $('#TenNguonKhachFilterId').val()
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
                                    _viewNguonKhachHangModal.open({ data: data.record });
                                }
                        },
						{
                            text: app.localize('Edit'),
                            visible: function () {
                                return _permissions.edit;
                            },
                            action: function (data) {
                                _createOrEditModal.open({ id: data.record.nguonKhachHang.id });
                            }
                        }, 
						{
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deleteNguonKhachHang(data.record.nguonKhachHang);
                            }
                        }]
                    }
                },
					{
						targets: 1,
						 data: "nguonKhachHang.tenNguonKhach"   
					}
            ]
        });


        function getNguonKhachHangs() {
            dataTable.ajax.reload();
        }

        function deleteNguonKhachHang(nguonKhachHang) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _nguonKhachHangsService.delete({
                            id: nguonKhachHang.id
                        }).done(function () {
                            getNguonKhachHangs(true);
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

        $('#CreateNewNguonKhachHangButton').click(function () {
            _createOrEditModal.open();
        });

		$('#ExportToExcelButton').click(function () {
            _nguonKhachHangsService
                .getNguonKhachHangsToExcel({
				filter : $('#NguonKhachHangsTableFilter').val(),
					tenNguonKhachFilter: $('#TenNguonKhachFilterId').val()
				})
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditNguonKhachHangModalSaved', function () {
            getNguonKhachHangs();
        });

		$('#GetNguonKhachHangsButton').click(function (e) {
            e.preventDefault();
            getNguonKhachHangs();
        });

		$(document).keypress(function(e) {
		  if(e.which === 13) {
			getNguonKhachHangs();
		  }
		});

    });
})();