(function () {
    $(function () {

        var _$packageReleasesTable = $('#PackageReleasesTable');
        var _packageReleasesService = abp.services.app.packageReleases;
		
        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.PackageReleases.Create'),
            edit: abp.auth.hasPermission('Pages.PackageReleases.Edit'),
            'delete': abp.auth.hasPermission('Pages.PackageReleases.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/PackageReleases/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/PackageReleases/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditPackageReleaseModal'
        });

		 var _viewPackageReleaseModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/PackageReleases/ViewpackageReleaseModal',
            modalClass: 'ViewPackageReleaseModal'
        });

		
		

        var getDateFilter = function (element) {
            if (element.data("DateTimePicker").date() == null) {
                return null;
            }
            return element.data("DateTimePicker").date().format("YYYY-MM-DDT00:00:00Z"); 
        }

        var dataTable = _$packageReleasesTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _packageReleasesService.getAll,
                inputFilter: function () {
                    return {
					filter: $('#PackageReleasesTableFilter').val(),
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
					theKhachHangTenantIdFilter: $('#TheKhachHangTenantIdFilterId').val(),
					theKhachHangMaThe2Filter: $('#TheKhachHangMaThe2FilterId').val(),
					dM_DoiTuongMaDoiTuongFilter: $('#DM_DoiTuongMaDoiTuongFilterId').val(),
					dM_DoiTuongMaDoiTuong2Filter: $('#DM_DoiTuongMaDoiTuong2FilterId').val(),
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
                                    _viewPackageReleaseModal.open({ id: data.record.packageRelease.id });
                                }
                        },
						{
                            text: app.localize('Edit'),
                            visible: function () {
                                return _permissions.edit;
                            },
                            action: function (data) {
                                _createOrEditModal.open({ id: data.record.packageRelease.id });
                            }
                        }, 
						{
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deletePackageRelease(data.record.packageRelease);
                            }
                        }]
                    }
                },
					{
						targets: 1,
						 data: "packageRelease.amount"   
					},
					{
						targets: 2,
						 data: "packageRelease.approvedTime" ,
					render: function (approvedTime) {
						if (approvedTime) {
							return moment(approvedTime).format('L');
						}
						return "";
					}
			  
					},
					{
						targets: 3,
						 data: "packageRelease.isReminded"  ,
						render: function (isReminded) {
							if (isReminded) {
								return '<div class="text-center"><i class="fa fa-check-circle m--font-success" title="True"></i></div>';
							}
							return '<div class="text-center"><i class="fa fa-times-circle" title="False"></i></div>';
					}
			 
					},
					{
						targets: 4,
						 data: "packageRelease.description"   
					},
					{
						targets: 5,
						 data: "packageRelease.hasFee"  ,
						render: function (hasFee) {
							if (hasFee) {
								return '<div class="text-center"><i class="fa fa-check-circle m--font-success" title="True"></i></div>';
							}
							return '<div class="text-center"><i class="fa fa-times-circle" title="False"></i></div>';
					}
			 
					},
					{
						targets: 6,
						 data: "packageRelease.isPayByReceiver"  ,
						render: function (isPayByReceiver) {
							if (isPayByReceiver) {
								return '<div class="text-center"><i class="fa fa-check-circle m--font-success" title="True"></i></div>';
							}
							return '<div class="text-center"><i class="fa fa-times-circle" title="False"></i></div>';
					}
			 
					},
					{
						targets: 7,
						 data: "packageRelease.fee"   
					},
					{
						targets: 8,
						 data: "theKhachHangTenantId" 
					},
					{
						targets: 9,
						 data: "theKhachHangMaThe2" 
					},
					{
						targets: 10,
						 data: "dM_DoiTuongMaDoiTuong" 
					},
					{
						targets: 11,
						 data: "dM_DoiTuongMaDoiTuong2" 
					},
					{
						targets: 12,
						 data: "userName" 
					}
            ]
        });


        function getPackageReleases() {
            dataTable.ajax.reload();
        }

        function deletePackageRelease(packageRelease) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _packageReleasesService.delete({
                            id: packageRelease.id
                        }).done(function () {
                            getPackageReleases(true);
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

        $('#CreateNewPackageReleaseButton').click(function () {
            _createOrEditModal.open();
        });

		$('#ExportToExcelButton').click(function () {
            _packageReleasesService
                .getPackageReleasesToExcel({
				filter : $('#PackageReleasesTableFilter').val(),
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
					theKhachHangTenantIdFilter: $('#TheKhachHangTenantIdFilterId').val(),
					theKhachHangMaThe2Filter: $('#TheKhachHangMaThe2FilterId').val(),
					dM_DoiTuongMaDoiTuongFilter: $('#DM_DoiTuongMaDoiTuongFilterId').val(),
					dM_DoiTuongMaDoiTuong2Filter: $('#DM_DoiTuongMaDoiTuong2FilterId').val(),
					userNameFilter: $('#UserNameFilterId').val()
				})
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditPackageReleaseModalSaved', function () {
            getPackageReleases();
        });

		$('#GetPackageReleasesButton').click(function (e) {
            e.preventDefault();
            getPackageReleases();
        });

		$(document).keypress(function(e) {
		  if(e.which === 13) {
			getPackageReleases();
		  }
		});

    });
})();