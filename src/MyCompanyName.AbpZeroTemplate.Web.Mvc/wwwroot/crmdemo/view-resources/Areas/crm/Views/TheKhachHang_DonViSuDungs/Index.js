(function () {
    $(function () {

        var _$theKhachHang_DonViSuDungsTable = $('#TheKhachHang_DonViSuDungsTable');
        var _theKhachHang_DonViSuDungsService = abp.services.app.theKhachHang_DonViSuDungs;

        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.TheKhachHang_DonViSuDungs.Create'),
            edit: abp.auth.hasPermission('Pages.TheKhachHang_DonViSuDungs.Edit'),
            'delete': abp.auth.hasPermission('Pages.TheKhachHang_DonViSuDungs.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/TheKhachHang_DonViSuDungs/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/TheKhachHang_DonViSuDungs/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditTheKhachHang_DonViSuDungModal'
        });

		 var _viewTheKhachHang_DonViSuDungModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/TheKhachHang_DonViSuDungs/ViewtheKhachHang_DonViSuDungModal',
            modalClass: 'ViewTheKhachHang_DonViSuDungModal'
        });

        var dataTable = _$theKhachHang_DonViSuDungsTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _theKhachHang_DonViSuDungsService.getAll,
                inputFilter: function () {
                    return {
					filter: $('#TheKhachHang_DonViSuDungsTableFilter').val(),
					theKhachHangMaTheFilter: $('#TheKhachHangMaTheFilterId').val(),
					organizationUnitDisplayNameFilter: $('#OrganizationUnitDisplayNameFilterId').val()
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
                                    _viewTheKhachHang_DonViSuDungModal.open({ data: data.record });
                                }
                        },
						{
                            text: app.localize('Edit'),
                            visible: function () {
                                return _permissions.edit;
                            },
                            action: function (data) {
                                _createOrEditModal.open({ id: data.record.theKhachHang_DonViSuDung.id });
                            }
                        }, 
						{
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deleteTheKhachHang_DonViSuDung(data.record.theKhachHang_DonViSuDung);
                            }
                        }]
                    }
                },
					{
						targets: 1,
						 data: "theKhachHangMaThe" 
					},
					{
						targets: 2,
						 data: "organizationUnitDisplayName" 
					}
            ]
        });


        function getTheKhachHang_DonViSuDungs() {
            dataTable.ajax.reload();
        }

        function deleteTheKhachHang_DonViSuDung(theKhachHang_DonViSuDung) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _theKhachHang_DonViSuDungsService.delete({
                            id: theKhachHang_DonViSuDung.id
                        }).done(function () {
                            getTheKhachHang_DonViSuDungs(true);
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

        $('#CreateNewTheKhachHang_DonViSuDungButton').click(function () {
            _createOrEditModal.open();
        });

		$('#ExportToExcelButton').click(function () {
            _theKhachHang_DonViSuDungsService
                .getTheKhachHang_DonViSuDungsToExcel({
				filter : $('#TheKhachHang_DonViSuDungsTableFilter').val(),
					theKhachHangMaTheFilter: $('#TheKhachHangMaTheFilterId').val(),
					organizationUnitDisplayNameFilter: $('#OrganizationUnitDisplayNameFilterId').val()
				})
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditTheKhachHang_DonViSuDungModalSaved', function () {
            getTheKhachHang_DonViSuDungs();
        });

		$('#GetTheKhachHang_DonViSuDungsButton').click(function (e) {
            e.preventDefault();
            getTheKhachHang_DonViSuDungs();
        });

		$(document).keypress(function(e) {
		  if(e.which === 13) {
			getTheKhachHang_DonViSuDungs();
		  }
		});

    });
})();