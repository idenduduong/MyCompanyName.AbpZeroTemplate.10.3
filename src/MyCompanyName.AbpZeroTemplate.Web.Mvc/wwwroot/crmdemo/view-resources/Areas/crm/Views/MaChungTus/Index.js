(function () {
    $(function () {

        var _$maChungTusTable = $('#MaChungTusTable');
        var _maChungTusService = abp.services.app.maChungTus;

        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.MaChungTus.Create'),
            edit: abp.auth.hasPermission('Pages.MaChungTus.Edit'),
            'delete': abp.auth.hasPermission('Pages.MaChungTus.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/MaChungTus/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/MaChungTus/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditMaChungTuModal'
        });

		 var _viewMaChungTuModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/MaChungTus/ViewmaChungTuModal',
            modalClass: 'ViewMaChungTuModal'
        });

        var dataTable = _$maChungTusTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _maChungTusService.getAll,
                inputFilter: function () {
                    return {
					filter: $('#MaChungTusTableFilter').val(),
					loaiChungTuFilter: $('#LoaiChungTuFilterId').val(),
					tienToFilter: $('#TienToFilterId').val(),
					nganCach1Filter: $('#NganCach1FilterId').val(),
					ngayThangNamFilter: $('#NgayThangNamFilterId').val(),
					nganCach2Filter: $('#NganCach2FilterId').val(),
					minDoDaiSTTFilter: $('#MinDoDaiSTTFilterId').val(),
					maxDoDaiSTTFilter: $('#MaxDoDaiSTTFilterId').val(),
					suDungUserNameFilter: $('#SuDungUserNameFilterId').val(),
					suDungMaDonViFilter: $('#SuDungMaDonViFilterId').val(),
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
                                    _viewMaChungTuModal.open({ data: data.record });
                                }
                        },
						{
                            text: app.localize('Edit'),
                            visible: function () {
                                return _permissions.edit;
                            },
                            action: function (data) {
                                _createOrEditModal.open({ id: data.record.maChungTu.id });
                            }
                        }, 
						{
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deleteMaChungTu(data.record.maChungTu);
                            }
                        }]
                    }
                },
					{
						targets: 1,
						 data: "maChungTu.loaiChungTu"   
					},
					{
						targets: 2,
						 data: "maChungTu.tienTo"   
					},
					{
						targets: 3,
						 data: "maChungTu.nganCach1"   
					},
					{
						targets: 4,
						 data: "maChungTu.ngayThangNam"   
					},
					{
						targets: 5,
						 data: "maChungTu.nganCach2"   
					},
					{
						targets: 6,
						 data: "maChungTu.doDaiSTT"   
					},
					{
						targets: 7,
						 data: "maChungTu.suDungUserName"  ,
						render: function (suDungUserName) {
							if (suDungUserName) {
								return '<i class="la la-check-square m--font-success" title="True"></i>';
							}
							return '<i class="la la-times-circle" title="False"></i>';
					}
			 
					},
					{
						targets: 8,
						 data: "maChungTu.suDungMaDonVi"  ,
						render: function (suDungMaDonVi) {
							if (suDungMaDonVi) {
								return '<i class="la la-check-square m--font-success" title="True"></i>';
							}
							return '<i class="la la-times-circle" title="False"></i>';
					}
			 
					},
					{
						targets: 9,
						 data: "organizationUnitDisplayName" 
					}
            ]
        });


        function getMaChungTus() {
            dataTable.ajax.reload();
        }

        function deleteMaChungTu(maChungTu) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _maChungTusService.delete({
                            id: maChungTu.id
                        }).done(function () {
                            getMaChungTus(true);
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

        $('#CreateNewMaChungTuButton').click(function () {
            _createOrEditModal.open();
        });

		$('#ExportToExcelButton').click(function () {
            _maChungTusService
                .getMaChungTusToExcel({
				filter : $('#MaChungTusTableFilter').val(),
					loaiChungTuFilter: $('#LoaiChungTuFilterId').val(),
					tienToFilter: $('#TienToFilterId').val(),
					nganCach1Filter: $('#NganCach1FilterId').val(),
					ngayThangNamFilter: $('#NgayThangNamFilterId').val(),
					nganCach2Filter: $('#NganCach2FilterId').val(),
					minDoDaiSTTFilter: $('#MinDoDaiSTTFilterId').val(),
					maxDoDaiSTTFilter: $('#MaxDoDaiSTTFilterId').val(),
					suDungUserNameFilter: $('#SuDungUserNameFilterId').val(),
					suDungMaDonViFilter: $('#SuDungMaDonViFilterId').val(),
					organizationUnitDisplayNameFilter: $('#OrganizationUnitDisplayNameFilterId').val()
				})
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditMaChungTuModalSaved', function () {
            getMaChungTus();
        });

		$('#GetMaChungTusButton').click(function (e) {
            e.preventDefault();
            getMaChungTus();
        });

		$(document).keypress(function(e) {
		  if(e.which === 13) {
			getMaChungTus();
		  }
		});

    });
})();