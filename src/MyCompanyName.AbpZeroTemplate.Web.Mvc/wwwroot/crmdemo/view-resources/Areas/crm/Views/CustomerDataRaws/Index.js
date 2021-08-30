(function () {
    $(function () {

        var _$customerDataRawsTable = $('#CustomerDataRawsTable');
        var _customerDataRawsService = abp.services.app.customerDataRaws;
		
        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.CustomerDataRaws.Create'),
            edit: abp.auth.hasPermission('Pages.CustomerDataRaws.Edit'),
            'delete': abp.auth.hasPermission('Pages.CustomerDataRaws.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/CustomerDataRaws/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/CustomerDataRaws/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditCustomerDataRawModal'
        });

		 var _viewCustomerDataRawModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/CustomerDataRaws/ViewcustomerDataRawModal',
            modalClass: 'ViewCustomerDataRawModal'
        });

		
		

        var getDateFilter = function (element) {
            if (element.data("DateTimePicker").date() == null) {
                return null;
            }
            return element.data("DateTimePicker").date().format("YYYY-MM-DDT00:00:00Z"); 
        }

        var dataTable = _$customerDataRawsTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _customerDataRawsService.getAll,
                inputFilter: function () {
                    return {
					filter: $('#CustomerDataRawsTableFilter').val(),
					nameFilter: $('#NameFilterId').val(),
					primaryPhoneFilter: $('#PrimaryPhoneFilterId').val(),
					secondaryPhoneFilter: $('#SecondaryPhoneFilterId').val(),
					identifyNumberFilter: $('#IdentifyNumberFilterId').val(),
					dateOfBirthFilter: $('#DateOfBirthFilterId').val(),
					genderFilter: $('#GenderFilterId').val(),
					addressFilter: $('#AddressFilterId').val(),
					emailFilter: $('#EmailFilterId').val(),
					noteFilter: $('#NoteFilterId').val(),
					nationFilter: $('#NationFilterId').val(),
					provinceFilter: $('#ProvinceFilterId').val(),
					districtFilter: $('#DistrictFilterId').val(),
					jobFilter: $('#JobFilterId').val(),
					organizationUnitFilter: $('#OrganizationUnitFilterId').val(),
					serviceNameFilter: $('#ServiceNameFilterId').val(),
					importDataImportCodeFilter: $('#ImportDataImportCodeFilterId').val()
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
                                    _viewCustomerDataRawModal.open({ data: data.record });
                                }
                        },
						{
                            text: app.localize('Edit'),
                            visible: function () {
                                return _permissions.edit;
                            },
                            action: function (data) {
                                _createOrEditModal.open({ id: data.record.customerDataRaw.id });
                            }
                        }, 
						{
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deleteCustomerDataRaw(data.record.customerDataRaw);
                            }
                        }]
                    }
                },
					{
						targets: 1,
						 data: "customerDataRaw.name"   
					},
					{
						targets: 2,
						 data: "customerDataRaw.primaryPhone"   
					},
					{
						targets: 3,
						 data: "customerDataRaw.secondaryPhone"   
					},
					{
						targets: 4,
						 data: "customerDataRaw.identifyNumber"   
					},
					{
						targets: 5,
						 data: "customerDataRaw.dateOfBirth"   
					},
					{
						targets: 6,
						 data: "customerDataRaw.gender"   
					},
					{
						targets: 7,
						 data: "customerDataRaw.address"   
					},
					{
						targets: 8,
						 data: "customerDataRaw.email"   
					},
					{
						targets: 9,
						 data: "customerDataRaw.note"   
					},
					{
						targets: 10,
						 data: "customerDataRaw.nation"   
					},
					{
						targets: 11,
						 data: "customerDataRaw.province"   
					},
					{
						targets: 12,
						 data: "customerDataRaw.district"   
					},
					{
						targets: 13,
						 data: "customerDataRaw.job"   
					},
					{
						targets: 14,
						 data: "customerDataRaw.organizationUnit"   
					},
					{
						targets: 15,
						 data: "customerDataRaw.serviceName"   
					},
					{
						targets: 16,
						 data: "importDataImportCode" 
					}
            ]
        });


        function getCustomerDataRaws() {
            dataTable.ajax.reload();
        }

        function deleteCustomerDataRaw(customerDataRaw) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _customerDataRawsService.delete({
                            id: customerDataRaw.id
                        }).done(function () {
                            getCustomerDataRaws(true);
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

        $('#CreateNewCustomerDataRawButton').click(function () {
            _createOrEditModal.open();
        });

		$('#ExportToExcelButton').click(function () {
            _customerDataRawsService
                .getCustomerDataRawsToExcel({
				filter : $('#CustomerDataRawsTableFilter').val(),
					nameFilter: $('#NameFilterId').val(),
					primaryPhoneFilter: $('#PrimaryPhoneFilterId').val(),
					secondaryPhoneFilter: $('#SecondaryPhoneFilterId').val(),
					identifyNumberFilter: $('#IdentifyNumberFilterId').val(),
					dateOfBirthFilter: $('#DateOfBirthFilterId').val(),
					genderFilter: $('#GenderFilterId').val(),
					addressFilter: $('#AddressFilterId').val(),
					emailFilter: $('#EmailFilterId').val(),
					noteFilter: $('#NoteFilterId').val(),
					nationFilter: $('#NationFilterId').val(),
					provinceFilter: $('#ProvinceFilterId').val(),
					districtFilter: $('#DistrictFilterId').val(),
					jobFilter: $('#JobFilterId').val(),
					organizationUnitFilter: $('#OrganizationUnitFilterId').val(),
					serviceNameFilter: $('#ServiceNameFilterId').val(),
					importDataImportCodeFilter: $('#ImportDataImportCodeFilterId').val()
				})
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditCustomerDataRawModalSaved', function () {
            getCustomerDataRaws();
        });

		$('#GetCustomerDataRawsButton').click(function (e) {
            e.preventDefault();
            getCustomerDataRaws();
        });

		$(document).keypress(function(e) {
		  if(e.which === 13) {
			getCustomerDataRaws();
		  }
		});

    });
})();