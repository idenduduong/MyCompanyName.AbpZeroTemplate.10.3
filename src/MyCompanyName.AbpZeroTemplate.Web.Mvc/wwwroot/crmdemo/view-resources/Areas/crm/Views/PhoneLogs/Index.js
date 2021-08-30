(function () {
    $(function () {

        var _$phoneLogsTable = $('#PhoneLogsTable');
        var _phoneLogsService = abp.services.app.phoneLogs;
		
        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.PhoneLogs.Create'),
            edit: abp.auth.hasPermission('Pages.PhoneLogs.Edit'),
            'delete': abp.auth.hasPermission('Pages.PhoneLogs.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/PhoneLogs/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/PhoneLogs/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditPhoneLogModal'
        });

		 var _viewPhoneLogModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/PhoneLogs/ViewphoneLogModal',
            modalClass: 'ViewPhoneLogModal'
        });

		
		

        var getDateFilter = function (element) {
            if (element.data("DateTimePicker").date() == null) {
                return null;
            }
            return element.data("DateTimePicker").date().format("YYYY-MM-DDT00:00:00Z"); 
        }

        var dataTable = _$phoneLogsTable.DataTable({
            paging: true,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _phoneLogsService.getAll,
                inputFilter: function () {
                    return {
					filter: $('#PhoneLogsTableFilter').val(),
					fromPhoneNumberFilter: $('#FromPhoneNumberFilterId').val(),
					toPhoneNumberFilter: $('#ToPhoneNumberFilterId').val(),
					minCallTimeFilter:  getDateFilter($('#MinCallTimeFilterId')),
					maxCallTimeFilter:  getDateFilter($('#MaxCallTimeFilterId')),
					originalDurationValueFilter: $('#OriginalDurationValueFilterId').val(),
					minDurationBySecondFilter: $('#MinDurationBySecondFilterId').val(),
					maxDurationBySecondFilter: $('#MaxDurationBySecondFilterId').val(),
					userNameFilter: $('#UserNameFilterId').val(),
					customerDataNameFilter: $('#CustomerDataNameFilterId').val()
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
                                    _viewPhoneLogModal.open({ data: data.record });
                                }
                        },
						{
                            text: app.localize('Edit'),
                            visible: function () {
                                return _permissions.edit;
                            },
                            action: function (data) {
                                _createOrEditModal.open({ id: data.record.phoneLog.id });
                            }
                        }, 
						{
                            text: app.localize('Delete'),
                            visible: function () {
                                return _permissions.delete;
                            },
                            action: function (data) {
                                deletePhoneLog(data.record.phoneLog);
                            }
                        }]
                    }
                },
					{
						targets: 1,
						 data: "phoneLog.fromPhoneNumber"   
					},
					{
						targets: 2,
						 data: "phoneLog.toPhoneNumber"   
					},
					{
						targets: 3,
						 data: "phoneLog.callTime" ,
					render: function (callTime) {
						if (callTime) {
							return moment(callTime).format('L');
						}
						return "";
					}
			  
					},
					{
						targets: 4,
						 data: "phoneLog.originalDurationValue"   
					},
					{
						targets: 5,
						 data: "phoneLog.durationBySecond"   
					},
					{
						targets: 6,
						 data: "userName" 
					},
					{
						targets: 7,
						 data: "customerDataName" 
					}
            ]
        });


        function getPhoneLogs() {
            dataTable.ajax.reload();
        }

        function deletePhoneLog(phoneLog) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _phoneLogsService.delete({
                            id: phoneLog.id
                        }).done(function () {
                            getPhoneLogs(true);
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

        $('#CreateNewPhoneLogButton').click(function () {
            _createOrEditModal.open();
        });

		$('#ExportToExcelButton').click(function () {
            _phoneLogsService
                .getPhoneLogsToExcel({
				filter : $('#PhoneLogsTableFilter').val(),
					fromPhoneNumberFilter: $('#FromPhoneNumberFilterId').val(),
					toPhoneNumberFilter: $('#ToPhoneNumberFilterId').val(),
					minCallTimeFilter:  getDateFilter($('#MinCallTimeFilterId')),
					maxCallTimeFilter:  getDateFilter($('#MaxCallTimeFilterId')),
					originalDurationValueFilter: $('#OriginalDurationValueFilterId').val(),
					minDurationBySecondFilter: $('#MinDurationBySecondFilterId').val(),
					maxDurationBySecondFilter: $('#MaxDurationBySecondFilterId').val(),
					userNameFilter: $('#UserNameFilterId').val(),
					customerDataNameFilter: $('#CustomerDataNameFilterId').val()
				})
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditPhoneLogModalSaved', function () {
            getPhoneLogs();
        });

		$('#GetPhoneLogsButton').click(function (e) {
            e.preventDefault();
            getPhoneLogs();
        });

		$(document).keypress(function(e) {
		  if(e.which === 13) {
			getPhoneLogs();
		  }
		});

    });
})();