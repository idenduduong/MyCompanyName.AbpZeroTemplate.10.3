(function () {
    $(function () {

        var _$phonesTable = $('#PhonesTable');
        var _phonesService = abp.services.app.phones;
		var _entityTypeFullName = 'MyCompanyName.AbpZeroTemplate.Phones.Phone';
        
        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.Phones.Create'),
            edit: abp.auth.hasPermission('Pages.Phones.Edit'),
            'delete': abp.auth.hasPermission('Pages.Phones.Delete')
        };

         var _createOrEditModal = new app.ModalManager({
                    viewUrl: abp.appPath + 'qlnv/Phones/CreateOrEditModal',
                    scriptUrl: abp.appPath + 'view-resources/Areas/qlnv/Views/Phones/_CreateOrEditModal.js',
                    modalClass: 'CreateOrEditPhoneModal'
                });
                   

		 var _viewPhoneModal = new app.ModalManager({
            viewUrl: abp.appPath + 'qlnv/Phones/ViewphoneModal',
            modalClass: 'ViewPhoneModal'
        });

		        var _entityTypeHistoryModal = app.modals.EntityTypeHistoryModal.create();
		        function entityHistoryIsEnabled() {
            return abp.auth.hasPermission('Pages.Administration.AuditLogs') &&
                abp.custom.EntityHistory &&
                abp.custom.EntityHistory.IsEnabled &&
                _.filter(abp.custom.EntityHistory.EnabledEntities, entityType => entityType === _entityTypeFullName).length === 1;
        }

        var getDateFilter = function (element) {
            if (element.data("DateTimePicker").date() == null) {
                return null;
            }
            return element.data("DateTimePicker").date().format("YYYY-MM-DDT00:00:00Z"); 
        }
        
        var getMaxDateFilter = function (element) {
            if (element.data("DateTimePicker").date() == null) {
                return null;
            }
            return element.data("DateTimePicker").date().format("YYYY-MM-DDT23:59:59Z"); 
        }

        var dataTable = _$phonesTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _phonesService.getAll,
                inputFilter: function () {
                    return {
					filter: $('#PhonesTableFilter').val(),
					minPhoneIdFilter: $('#MinPhoneIdFilterId').val(),
					maxPhoneIdFilter: $('#MaxPhoneIdFilterId').val(),
					isDeleteFilter: $('#isDeleteFilterId').val(),
					nameFilter: $('#NameFilterId').val(),
					mobileFilter: $('#MobileFilterId').val()
                    };
                }
            },
            columnDefs: [
                {
                    className: 'control responsive',
                    orderable: false,
                    render: function () {
                        return '';
                    },
                    targets: 0
                },
                {
                    width: 120,
                    targets: 1,
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
                                iconStyle: 'far fa-eye mr-2',
                                action: function (data) {
                                    _viewPhoneModal.open({ id: data.record.phone.id });
                                }
                        },
						{
                            text: app.localize('Edit'),
                            iconStyle: 'far fa-edit mr-2',
                            visible: function () {
                                return _permissions.edit;
                            },
                            action: function (data) {
                            _createOrEditModal.open({ id: data.record.phone.id });                                
                            }
                        },
                        {
                            text: app.localize('History'),
                            iconStyle: 'fas fa-history mr-2',
                            visible: function () {
                                return entityHistoryIsEnabled();
                            },
                            action: function (data) {
                                _entityTypeHistoryModal.open({
                                    entityTypeFullName: _entityTypeFullName,
                                    entityId: data.record.phone.id
                                });
                            }
						}, 
						{
                            text: app.localize('Delete'),
                            iconStyle: 'far fa-trash-alt mr-2',
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deletePhone(data.record.phone);
                            }
                        }]
                    }
                },
					{
						targets: 2,
						 data: "phone.phoneId",
						 name: "phoneId"   
					},
					{
						targets: 3,
						 data: "phone.isDelete",
						 name: "isDelete"  ,
						render: function (isDelete) {
							if (isDelete) {
								return '<div class="text-center"><i class="fa fa-check text-success" title="True"></i></div>';
							}
							return '<div class="text-center"><i class="fa fa-times-circle" title="False"></i></div>';
					}
			 
					},
					{
						targets: 4,
						 data: "phone.name",
						 name: "name"   
					},
					{
						targets: 5,
						 data: "phone.mobile",
						 name: "mobile"   
					}
            ]
        });

        function getPhones() {
            dataTable.ajax.reload();
        }

        function deletePhone(phone) {
            abp.message.confirm(
                '',
                app.localize('AreYouSure'),
                function (isConfirmed) {
                    if (isConfirmed) {
                        _phonesService.delete({
                            id: phone.id
                        }).done(function () {
                            getPhones(true);
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

        $('#CreateNewPhoneButton').click(function () {
            _createOrEditModal.open();
        });        

		$('#ExportToExcelButton').click(function () {
            _phonesService
                .getPhonesToExcel({
				filter : $('#PhonesTableFilter').val(),
					minPhoneIdFilter: $('#MinPhoneIdFilterId').val(),
					maxPhoneIdFilter: $('#MaxPhoneIdFilterId').val(),
					isDeleteFilter: $('#isDeleteFilterId').val(),
					nameFilter: $('#NameFilterId').val(),
					mobileFilter: $('#MobileFilterId').val()
				})
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditPhoneModalSaved', function () {
            getPhones();
        });

		$('#GetPhonesButton').click(function (e) {
            e.preventDefault();
            getPhones();
        });

		$(document).keypress(function(e) {
		  if(e.which === 13) {
			getPhones();
		  }
		});
		
		
		
    });
})();
