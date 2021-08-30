(function () {
    $(function () {

        var _$balanceReleasesTable = $('#BalanceReleasesTable');
        var _balanceReleasesService = abp.services.app.balanceReleases;
		
        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.BalanceReleases.Create'),
            edit: abp.auth.hasPermission('Pages.BalanceReleases.Edit'),
            'delete': abp.auth.hasPermission('Pages.BalanceReleases.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/BalanceReleases/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/BalanceReleases/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditBalanceReleaseModal'
        });

		 var _viewBalanceReleaseModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/BalanceReleases/ViewbalanceReleaseModal',
            modalClass: 'ViewBalanceReleaseModal'
        });

		
		

        var getDateFilter = function (element) {
            if (element.data("DateTimePicker").date() == null) {
                return null;
            }
            return element.data("DateTimePicker").date().format("YYYY-MM-DDT00:00:00Z"); 
        }

        var dataTable = _$balanceReleasesTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _balanceReleasesService.getAll,
                inputFilter: function () {
                    return {
					filter: $('#BalanceReleasesTableFilter').val(),
					minAmountFilter: $('#MinAmountFilterId').val(),
					maxAmountFilter: $('#MaxAmountFilterId').val(),
					minApprovedTimeFilter:  getDateFilter($('#MinApprovedTimeFilterId')),
					maxApprovedTimeFilter:  getDateFilter($('#MaxApprovedTimeFilterId')),
					isRemindedFilter: $('#IsRemindedFilterId').val(),
					descriptionFilter: $('#DescriptionFilterId').val(),
					hasFeeFilter: $('#HasFeeFilterId').val(),
					isPayByReceiverFilter: $('#IsPayByReceiverFilterId').val(),
					minFeeFilter: $('#MinFeeFilterId').val(),
					maxFeeFilter: $('#MaxFeeFilterId').val(),
					dM_DoiTuongMaDoiTuongFilter: $('#DM_DoiTuongMaDoiTuongFilterId').val(),
					dM_DoiTuongMaDoiTuong2Filter: $('#DM_DoiTuongMaDoiTuong2FilterId').val(),
					theKhachHangMaTheFilter: $('#TheKhachHangMaTheFilterId').val(),
					theKhachHangMaThe2Filter: $('#TheKhachHangMaThe2FilterId').val(),
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
                                    _viewBalanceReleaseModal.open({ id: data.record.balanceRelease.id });
                                }
                        },
						{
                            text: app.localize('Edit'),
                            visible: function () {
                                return _permissions.edit;
                            },
                            action: function (data) {
                                _createOrEditModal.open({ id: data.record.balanceRelease.id });
                            }
                        }, 
						{
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deleteBalanceRelease(data.record.balanceRelease);
                            }
                        }]
                    }
                },
					{
						targets: 1,
						 data: "balanceRelease.amount"   
					},
					{
						targets: 2,
						 data: "balanceRelease.approvedTime" ,
					render: function (approvedTime) {
						if (approvedTime) {
							return moment(approvedTime).format('L');
						}
						return "";
					}
			  
					},
					{
						targets: 3,
						 data: "balanceRelease.isReminded"  ,
						render: function (isReminded) {
							if (isReminded) {
								return '<div class="text-center"><i class="fa fa-check-circle m--font-success" title="True"></i></div>';
							}
							return '<div class="text-center"><i class="fa fa-times-circle" title="False"></i></div>';
					}
			 
					},
					{
						targets: 4,
						 data: "balanceRelease.description"   
					},
					{
						targets: 5,
						 data: "balanceRelease.hasFee"  ,
						render: function (hasFee) {
							if (hasFee) {
								return '<div class="text-center"><i class="fa fa-check-circle m--font-success" title="True"></i></div>';
							}
							return '<div class="text-center"><i class="fa fa-times-circle" title="False"></i></div>';
					}
			 
					},
					{
						targets: 6,
						 data: "balanceRelease.isPayByReceiver"  ,
						render: function (isPayByReceiver) {
							if (isPayByReceiver) {
								return '<div class="text-center"><i class="fa fa-check-circle m--font-success" title="True"></i></div>';
							}
							return '<div class="text-center"><i class="fa fa-times-circle" title="False"></i></div>';
					}
			 
					},
					{
						targets: 7,
						 data: "balanceRelease.fee"   
					},
					{
						targets: 8,
						 data: "dM_DoiTuongMaDoiTuong" 
					},
					{
						targets: 9,
						 data: "dM_DoiTuongMaDoiTuong2" 
					},
					{
						targets: 10,
						 data: "theKhachHangMaThe" 
					},
					{
						targets: 11,
						 data: "theKhachHangMaThe2" 
					},
					{
						targets: 12,
						 data: "userName" 
					}
            ]
        });


        function getBalanceReleases() {
            dataTable.ajax.reload();
        }

        function deleteBalanceRelease(balanceRelease) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _balanceReleasesService.delete({
                            id: balanceRelease.id
                        }).done(function () {
                            getBalanceReleases(true);
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

        $('#CreateNewBalanceReleaseButton').click(function () {
            _createOrEditModal.open();
        });

		$('#ExportToExcelButton').click(function () {
            _balanceReleasesService
                .getBalanceReleasesToExcel({
				filter : $('#BalanceReleasesTableFilter').val(),
					minAmountFilter: $('#MinAmountFilterId').val(),
					maxAmountFilter: $('#MaxAmountFilterId').val(),
					minApprovedTimeFilter:  getDateFilter($('#MinApprovedTimeFilterId')),
					maxApprovedTimeFilter:  getDateFilter($('#MaxApprovedTimeFilterId')),
					isRemindedFilter: $('#IsRemindedFilterId').val(),
					descriptionFilter: $('#DescriptionFilterId').val(),
					hasFeeFilter: $('#HasFeeFilterId').val(),
					isPayByReceiverFilter: $('#IsPayByReceiverFilterId').val(),
					minFeeFilter: $('#MinFeeFilterId').val(),
					maxFeeFilter: $('#MaxFeeFilterId').val(),
					dM_DoiTuongMaDoiTuongFilter: $('#DM_DoiTuongMaDoiTuongFilterId').val(),
					dM_DoiTuongMaDoiTuong2Filter: $('#DM_DoiTuongMaDoiTuong2FilterId').val(),
					theKhachHangMaTheFilter: $('#TheKhachHangMaTheFilterId').val(),
					theKhachHangMaThe2Filter: $('#TheKhachHangMaThe2FilterId').val(),
					userNameFilter: $('#UserNameFilterId').val()
				})
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditBalanceReleaseModalSaved', function () {
            getBalanceReleases();
        });

		$('#GetBalanceReleasesButton').click(function (e) {
            e.preventDefault();
            getBalanceReleases();
        });

		$(document).keypress(function(e) {
		  if(e.which === 13) {
			getBalanceReleases();
		  }
		});

    });
})();