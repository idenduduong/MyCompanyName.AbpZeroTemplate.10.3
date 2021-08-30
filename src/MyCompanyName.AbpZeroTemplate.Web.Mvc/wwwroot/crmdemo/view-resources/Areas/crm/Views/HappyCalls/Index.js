(function () {
    $(function () {

        var _$happyCallsTable = $('#HappyCallsTable');
        var _happyCallsService = abp.services.app.happyCalls;

        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.HappyCalls.Create'),
            edit: abp.auth.hasPermission('Pages.HappyCalls.Edit'),
            'delete': abp.auth.hasPermission('Pages.HappyCalls.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/HappyCalls/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/HappyCalls/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditHappyCallModal'
        });

		 var _viewHappyCallModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/HappyCalls/ViewhappyCallModal',
            modalClass: 'ViewHappyCallModal'
        });

        var dataTable = _$happyCallsTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _happyCallsService.getAll,
                inputFilter: function () {
                    return {
					filter: $('#HappyCallsTableFilter').val(),
					minCSKHFilter: $('#MinCSKHFilterId').val(),
					maxCSKHFilter: $('#MaxCSKHFilterId').val(),
					minKeToanFilter: $('#MinKeToanFilterId').val(),
					maxKeToanFilter: $('#MaxKeToanFilterId').val(),
					minKTVFilter: $('#MinKTVFilterId').val(),
					maxKTVFilter: $('#MaxKTVFilterId').val(),
					minVienTruongFilter: $('#MinVienTruongFilterId').val(),
					maxVienTruongFilter: $('#MaxVienTruongFilterId').val(),
					minSaleFilter: $('#MinSaleFilterId').val(),
					maxSaleFilter: $('#MaxSaleFilterId').val(),
					minTongQuanFilter: $('#MinTongQuanFilterId').val(),
					maxTongQuanFilter: $('#MaxTongQuanFilterId').val(),
					minLichHenFilter: $('#MinLichHenFilterId').val(),
					maxLichHenFilter: $('#MaxLichHenFilterId').val(),
					minStatusFilter: $('#MinStatusFilterId').val(),
					maxStatusFilter: $('#MaxStatusFilterId').val(),
					minGoiLan1Filter: $('#MinGoiLan1FilterId').val(),
					maxGoiLan1Filter: $('#MaxGoiLan1FilterId').val(),
					minGoiLan2Filter: $('#MinGoiLan2FilterId').val(),
					maxGoiLan2Filter: $('#MaxGoiLan2FilterId').val(),
					minGoiLan3Filter: $('#MinGoiLan3FilterId').val(),
					maxGoiLan3Filter: $('#MaxGoiLan3FilterId').val(),
					minGoiLan4Filter: $('#MinGoiLan4FilterId').val(),
					maxGoiLan4Filter: $('#MaxGoiLan4FilterId').val(),
					theKhachHangMaTheFilter: $('#TheKhachHangMaTheFilterId').val(),
					dM_HangHoaTenHangHoaFilter: $('#DM_HangHoaTenHangHoaFilterId').val(),
					userNameFilter: $('#UserNameFilterId').val(),
					dM_DoiTuongMaDoiTuongFilter: $('#DM_DoiTuongMaDoiTuongFilterId').val()
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
                                    _viewHappyCallModal.open({ data: data.record });
                                }
                        },
						{
                            text: app.localize('Edit'),
                            visible: function () {
                                return _permissions.edit;
                            },
                            action: function (data) {
                                _createOrEditModal.open({ id: data.record.happyCall.id });
                            }
                        }, 
						{
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deleteHappyCall(data.record.happyCall);
                            }
                        }]
                    }
                },
					{
						targets: 1,
						 data: "happyCall.cSKH"   
					},
					{
						targets: 2,
						 data: "happyCall.keToan"   
					},
					{
						targets: 3,
						 data: "happyCall.kTV"   
					},
					{
						targets: 4,
						 data: "happyCall.vienTruong"   
					},
					{
						targets: 5,
						 data: "happyCall.sale"   
					},
					{
						targets: 6,
						 data: "happyCall.tongQuan"   
					},
					{
						targets: 7,
						 data: "happyCall.lichHen" ,
					render: function (lichHen) {
						if (lichHen) {
							return moment(lichHen).format('L');
						}
						return "";
					}
			  
					},
					{
						targets: 8,
						 data: "happyCall.status"   
					},
					{
						targets: 9,
						 data: "happyCall.goiLan1"   
					},
					{
						targets: 10,
						 data: "happyCall.goiLan2"   
					},
					{
						targets: 11,
						 data: "happyCall.goiLan3"   
					},
					{
						targets: 12,
						 data: "happyCall.goiLan4"   
					},
					{
						targets: 13,
						 data: "theKhachHangMaThe" 
					},
					{
						targets: 14,
						 data: "dM_HangHoaTenHangHoa" 
					},
					{
						targets: 15,
						 data: "userName" 
					},
					{
						targets: 16,
						 data: "dM_DoiTuongMaDoiTuong" 
					}
            ]
        });


        function getHappyCalls() {
            dataTable.ajax.reload();
        }

        function deleteHappyCall(happyCall) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _happyCallsService.delete({
                            id: happyCall.id
                        }).done(function () {
                            getHappyCalls(true);
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

        $('#CreateNewHappyCallButton').click(function () {
            _createOrEditModal.open();
        });

		$('#ExportToExcelButton').click(function () {
            _happyCallsService
                .getHappyCallsToExcel({
				filter : $('#HappyCallsTableFilter').val(),
					minCSKHFilter: $('#MinCSKHFilterId').val(),
					maxCSKHFilter: $('#MaxCSKHFilterId').val(),
					minKeToanFilter: $('#MinKeToanFilterId').val(),
					maxKeToanFilter: $('#MaxKeToanFilterId').val(),
					minKTVFilter: $('#MinKTVFilterId').val(),
					maxKTVFilter: $('#MaxKTVFilterId').val(),
					minVienTruongFilter: $('#MinVienTruongFilterId').val(),
					maxVienTruongFilter: $('#MaxVienTruongFilterId').val(),
					minSaleFilter: $('#MinSaleFilterId').val(),
					maxSaleFilter: $('#MaxSaleFilterId').val(),
					minTongQuanFilter: $('#MinTongQuanFilterId').val(),
					maxTongQuanFilter: $('#MaxTongQuanFilterId').val(),
					minLichHenFilter: $('#MinLichHenFilterId').val(),
					maxLichHenFilter: $('#MaxLichHenFilterId').val(),
					minStatusFilter: $('#MinStatusFilterId').val(),
					maxStatusFilter: $('#MaxStatusFilterId').val(),
					minGoiLan1Filter: $('#MinGoiLan1FilterId').val(),
					maxGoiLan1Filter: $('#MaxGoiLan1FilterId').val(),
					minGoiLan2Filter: $('#MinGoiLan2FilterId').val(),
					maxGoiLan2Filter: $('#MaxGoiLan2FilterId').val(),
					minGoiLan3Filter: $('#MinGoiLan3FilterId').val(),
					maxGoiLan3Filter: $('#MaxGoiLan3FilterId').val(),
					minGoiLan4Filter: $('#MinGoiLan4FilterId').val(),
					maxGoiLan4Filter: $('#MaxGoiLan4FilterId').val(),
					theKhachHangMaTheFilter: $('#TheKhachHangMaTheFilterId').val(),
					dM_HangHoaTenHangHoaFilter: $('#DM_HangHoaTenHangHoaFilterId').val(),
					userNameFilter: $('#UserNameFilterId').val(),
					dM_DoiTuongMaDoiTuongFilter: $('#DM_DoiTuongMaDoiTuongFilterId').val()
				})
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditHappyCallModalSaved', function () {
            getHappyCalls();
        });

		$('#GetHappyCallsButton').click(function (e) {
            e.preventDefault();
            getHappyCalls();
        });

		$(document).keypress(function(e) {
		  if(e.which === 13) {
			getHappyCalls();
		  }
		});

    });
})();