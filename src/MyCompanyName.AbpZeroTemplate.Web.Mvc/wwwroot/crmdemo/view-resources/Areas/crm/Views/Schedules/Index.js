(function () {
    $(function () {

        var _$schedulesTable = $('#SchedulesTable');
        var _schedulesService = abp.services.app.schedules;

        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.Schedules.Create'),
            edit: abp.auth.hasPermission('Pages.Schedules.Edit'),
            'delete': abp.auth.hasPermission('Pages.Schedules.Delete')
        };

        var _createOrEditModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/Schedules/CreateOrEditModal',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/Schedules/_CreateOrEditModal.js',
            modalClass: 'CreateOrEditScheduleModal'
        });

        var _viewScheduleModal = new app.ModalManager({
            viewUrl: abp.appPath + 'crm/Schedules/ViewscheduleModal',
            modalClass: 'ViewScheduleModal'
        });

        var dataTable = _$schedulesTable.DataTable({
            "info": true,
            "lengthChange": true,
            paging: true,
            responsive: false,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _schedulesService.getAll,
                inputFilter: function () {
                    return {
                        dM_DoiTuongMaDoiTuongFilter: $('#MaDoiTuongFilterId').val(),
                        dM_DoiTuongTenDoiTuongFilter: $('#TenDoiTuongFilterId').val(),
                        dM_DoiTuongPhoneFilter: $('#DienThoaiFilterId').val(),
                        scheduleType: $('.scheduletype.active').attr('scheduleType'),
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
                                text: app.localize('Edit'),
                                visible: function (data) {
                                    
                                    return data.record.schedule.id != null && data.record.schedule.id !="00000000-0000-0000-0000-000000000000";
                                },
                                action: function (data) {
                                    _createOrEditModal.open({ actionType:1,  id: data.record.schedule.id });
                                }
                            },
                            {
                                text: app.localize('ChangeSchedule'),
                                visible: function (data) {
                                    return data.record.schedule.id != null && data.record.schedule.id != "00000000-0000-0000-0000-000000000000";
                                },
                                action: function (data) {
                                    _createOrEditModal.open({ actionType: 2, id: data.record.schedule.id, lastActivityId: data.record.schedule.lastActivityId });
                                }
                            },
                            {
                                text: app.localize('CreateNewSchedule'),
                                visible: function (data) {
                                    return data.record.schedule.id != null || data.record.schedule.id != "00000000-0000-0000-0000-000000000000";;
                                },
                                action: function (data) {
                                    _createOrEditModal.open({ actionType: 3, id: data.record.schedule.id, lastActivityId: data.record.schedule.lastActivityId });
                                }
                            },
                            {
                                text: app.localize('Showup'),
                                visible: function (data) {
                                    return data.record.schedule.id != null && data.record.schedule.id != "00000000-0000-0000-0000-000000000000";
                                },
                                action: function (data) {
                                    completeSchedule({ id: data.record.schedule.id });
                                }
                            },
                            {
                                text: app.localize('CancelSchedule'),
                                visible: function (data) {
                                    return data.record.schedule.id != null && data.record.schedule.id != "00000000-0000-0000-0000-000000000000";
                                },
                                action: function (data) {
                                    cancelSchedule({ id: data.record.schedule.id });
                                }
                            }
                        ]
                    }
                },
                {
                    targets: 1,
                    data: "dM_DoiTuongTenDoiTuong"
                },
                {
                    targets: 2,
                    data: "dM_DoiTuongMaDoiTuong"
                },
                {
                    targets: 3,
                    data: "dM_DoiTuongPhoneDoiTuong"
                },
                {
                    targets: 4,
                    data: "tenDichVu"

                },
                {
                    targets: 5,
                    data: "schedule.lastActivityDate",
                    render: function (bookedDate) {
                        if (bookedDate) {
                            return moment(bookedDate).format('L');
                        }
                        return "";
                    }

                },
                {
                    targets: 6,
                    data: "schedule.bookedDate",
                    render: function (bookedDate) {
                        if (bookedDate) {
                            return moment(bookedDate).format('L');
                        }
                        return "";
                    }

                },
                {
                    targets: 7,
                    data: "missDays"
                },
                {
                    targets: 8,
                    data: "daysFromLastService"
                },
                {
                    targets: 9,
                    data: "schedule.remindStatus",
                    render: function (data) {
                        switch (data) {
                            case 0:  return app.localize("NotReminded");
                            case 1: return app.localize("Reminded");
                                
                            case 2: return app.localize("Changed");
                                
                            case 3: return app.localize("Canceled");
                                
                            case 4: return app.localize("Showup");
                                
                        }
                    }
                },
                {
                    targets: 10,
                    data: "schedule.note"
                },
                {
                    targets: 11,
                    data: "userName"
                },
                {
                    targets: 12,
                    data: "remainQuantity"
                },
                {
                    targets: 13,
                    data: "organizationUnitDisplayName"
                },
            ]
        });

        $('.scheduletype').click(function () {
            $('.scheduletype.active').removeClass("active");
            $(this).addClass("active");

            getSchedules();
        })
        function getSchedules() {
            dataTable.ajax.reload();
        }

        function cancelSchedule(schedule) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _schedulesService.cancel(schedule.id).done(function () {
                            getSchedules(true);
                            abp.notify.success(app.localize('SuccessfullyDeleted'));
                        });
                    }
                }
            );
        }

        function completeSchedule(schedule) {
            abp.message.confirm(
                '',
                function (isConfirmed) {
                    if (isConfirmed) {
                        _schedulesService.complete(schedule.id).done(function () {
                            getSchedules(true);
                            abp.notify.success(app.localize('SuccessfullyCompleted'));
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

        $('#CreateNewScheduleButton').click(function () {
            _createOrEditModal.open();
        });

        $('#ExportToExcelButton').click(function () {
            _schedulesService
                .getSchedulesToExcel({
                    //filter: $('#SchedulesTableFilter').val(),
                    //minBookedDateFilter: getDateFilter($('#MinBookedDateFilterId')),
                    //maxBookedDateFilter: getDateFilter($('#MaxBookedDateFilterId')),
                    //minRemindStatusFilter: $('#MinRemindStatusFilterId').val(),
                    //maxRemindStatusFilter: $('#MaxRemindStatusFilterId').val(),
                    //lastRemindIdFilter: $('#LastRemindIdFilterId').val(),
                    //noteFilter: $('#NoteFilterId').val(),
                    //nhatKySuDungTheUserNameFilter: $('#NhatKySuDungTheUserNameFilterId').val(),
                    //userNameFilter: $('#UserNameFilterId').val(),
                    //userName2Filter: $('#UserName2FilterId').val(),
                    //organizationUnitDisplayNameFilter: $('#OrganizationUnitDisplayNameFilterId').val(),
                    //dM_DoiTuongTenDoiTuongFilter: $('#DM_DoiTuongTenDoiTuongFilterId').val()
                    dM_DoiTuongMaDoiTuongFilter: $('#MaDoiTuongFilterId').val(),
                    dM_DoiTuongTenDoiTuongFilter: $('#TenDoiTuongFilterId').val(),
                    dM_DoiTuongPhoneFilter: $('#DienThoaiFilterId').val(),
                    scheduleType: $('.scheduletype.active').attr('scheduleType'),
                })
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        abp.event.on('app.createOrEditScheduleModalSaved', function () {
            getSchedules();
        });

        $('#GetSchedulesButton').click(function (e) {
            e.preventDefault();
            getSchedules();
        });

        $(document).keypress(function (e) {
            if (e.which === 13) {
                getSchedules();
            }
        });

    });
})();