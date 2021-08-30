(function () {
    $(function () {

        var _$quanLyKhieuNaisTable = $('#QuanLyKhieuNaisTable');
        var _quanLyKhieuNaisService = abp.services.app.quanLyKhieuNais;

        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.QuanLyKhieuNais.Create'),
            edit: abp.auth.hasPermission('Pages.QuanLyKhieuNais.Edit'),
            'delete': abp.auth.hasPermission('Pages.QuanLyKhieuNais.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/QuanLyKhieuNais/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/QuanLyKhieuNais/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditQuanLyKhieuNaiModal'
        });

		 var _viewQuanLyKhieuNaiModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/QuanLyKhieuNais/ViewquanLyKhieuNaiModal',
            modalClass: 'ViewQuanLyKhieuNaiModal'
        });

        var dataTable = _$quanLyKhieuNaisTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _quanLyKhieuNaisService.getAll,
                inputFilter: function () {
                    return {
					filter: $('#QuanLyKhieuNaisTableFilter').val(),
					minGoiLan1Filter: $('#MinGoiLan1FilterId').val(),
					maxGoiLan1Filter: $('#MaxGoiLan1FilterId').val(),
					minGoiLan2Filter: $('#MinGoiLan2FilterId').val(),
					maxGoiLan2Filter: $('#MaxGoiLan2FilterId').val(),
					minGoiLan3Filter: $('#MinGoiLan3FilterId').val(),
					maxGoiLan3Filter: $('#MaxGoiLan3FilterId').val(),
					vanDeFilter: $('#VanDeFilterId').val(),
					noiDungChiTietFilter: $('#NoiDungChiTietFilterId').val(),
					minStatusFilter: $('#MinStatusFilterId').val(),
					maxStatusFilter: $('#MaxStatusFilterId').val(),
					huongGiaiQuyetFilter: $('#HuongGiaiQuyetFilterId').val(),
					dM_DoiTuongMaDoiTuongFilter: $('#DM_DoiTuongMaDoiTuongFilterId').val(),
					userNameFilter: $('#UserNameFilterId').val()
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
                                    _viewQuanLyKhieuNaiModal.open({ data: data.record });
                                }
                        },
						{
                            text: app.localize('Edit'),
                            visible: function () {
                                return _permissions.edit;
                            },
                            action: function (data) {
                                _createOrEditModal.open({ id: data.record.quanLyKhieuNai.id });
                            }
                        }, 
						{
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deleteQuanLyKhieuNai(data.record.quanLyKhieuNai);
                            }
                        }]
                    }
                },
					{
						targets: 1,
						 data: "quanLyKhieuNai.goiLan1"   
					},
					{
						targets: 2,
						 data: "quanLyKhieuNai.goiLan2"   
					},
					{
						targets: 3,
						 data: "quanLyKhieuNai.goiLan3"   
					},
					{
						targets: 4,
						 data: "quanLyKhieuNai.vanDe"   
					},
					{
						targets: 5,
						 data: "quanLyKhieuNai.noiDungChiTiet"   
					},
					{
						targets: 6,
						 data: "quanLyKhieuNai.status"   
					},
					{
						targets: 7,
						 data: "quanLyKhieuNai.huongGiaiQuyet"   
					},
					{
						targets: 8,
						 data: "dM_DoiTuongMaDoiTuong" 
					},
					{
						targets: 9,
						 data: "userName" 
					}
            ]
        });


        function getQuanLyKhieuNais() {
            dataTable.ajax.reload();
        }

        function deleteQuanLyKhieuNai(quanLyKhieuNai) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _quanLyKhieuNaisService.delete({
                            id: quanLyKhieuNai.id
                        }).done(function () {
                            getQuanLyKhieuNais(true);
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

        $('#CreateNewQuanLyKhieuNaiButton').click(function () {
            _createOrEditModal.open();
        });

		$('#ExportToExcelButton').click(function () {
            _quanLyKhieuNaisService
                .getQuanLyKhieuNaisToExcel({
				filter : $('#QuanLyKhieuNaisTableFilter').val(),
					minGoiLan1Filter: $('#MinGoiLan1FilterId').val(),
					maxGoiLan1Filter: $('#MaxGoiLan1FilterId').val(),
					minGoiLan2Filter: $('#MinGoiLan2FilterId').val(),
					maxGoiLan2Filter: $('#MaxGoiLan2FilterId').val(),
					minGoiLan3Filter: $('#MinGoiLan3FilterId').val(),
					maxGoiLan3Filter: $('#MaxGoiLan3FilterId').val(),
					vanDeFilter: $('#VanDeFilterId').val(),
					noiDungChiTietFilter: $('#NoiDungChiTietFilterId').val(),
					minStatusFilter: $('#MinStatusFilterId').val(),
					maxStatusFilter: $('#MaxStatusFilterId').val(),
					huongGiaiQuyetFilter: $('#HuongGiaiQuyetFilterId').val(),
					dM_DoiTuongMaDoiTuongFilter: $('#DM_DoiTuongMaDoiTuongFilterId').val(),
					userNameFilter: $('#UserNameFilterId').val()
				})
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditQuanLyKhieuNaiModalSaved', function () {
            getQuanLyKhieuNais();
        });

		$('#GetQuanLyKhieuNaisButton').click(function (e) {
            e.preventDefault();
            getQuanLyKhieuNais();
        });

		$(document).keypress(function(e) {
		  if(e.which === 13) {
			getQuanLyKhieuNais();
		  }
		});

    });
})();