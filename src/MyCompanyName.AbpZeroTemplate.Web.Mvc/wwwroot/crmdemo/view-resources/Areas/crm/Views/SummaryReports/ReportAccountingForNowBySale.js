(function ($) {
    
    app.modals.ReportAccountingForNowBySale = function () {
        var _$accountingTable = $('#AccountingBySaleTable');
        var _summaryReports = abp.services.app.summaryReports;

        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });


        var dataTable = _$accountingTable.DataTable({
            "info": true,
            "lengthChange": true,
            paging: false,
            responsive: false,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _summaryReports.getDataForReportAccountingForNowBySale,
                inputFilter: function () {
                    return {
                        orgId: $('#OrgIdFilter').val()
                    };
                }
            },
            columnDefs: [
                {
                    targets: 0,
                    data: "employeeName",
                },
                {
                    targets: 1,
                    data: "toDayRevenue",
                    render: function (data) {
                        return $.number(data, 0);
                    }
                },
                {
                    targets: 2,
                    data: "toDayReceived",
                    render: function (data) {
                        return $.number(data, 0);
                    }
                },
                {
                    targets: 3,
                    data: "toDayReceivedDebt",
                    render: function (data) {
                        return $.number(data, 0);
                    }
                },
                {
                    targets: 4,
                    data: "toDayPerformanceRevenue",
                    render: function (data) {
                        return $.number(data, 0);
                    }
                },
                {
                    targets: 5,
                    data: "thisMonthRevenue",
                    render: function (data) {
                        return $.number(data, 0);
                    }
                },
                {
                    targets: 6,
                    data: "thisMonthReceived",
                    render: function (data) {
                        return $.number(data, 0);
                    }
                },
                {
                    targets: 7,
                    data: "thisMonthReceivedDebt",
                    render: function (data) {
                        return $.number(data, 0);
                    }
                },
                {
                    targets: 8,
                    data: "thisMonthPerformanceRevenue",
                    render: function (data) {
                        return $.number(data, 0);
                    }
                },
                {
                    targets: 9,
                    data: "lastMonthRevenue",
                    render: function (data) {
                        return $.number(data, 0);
                    }
                },
                {
                    targets: 10,
                    data: "lastMonthReceived",
                    render: function (data) {
                        return $.number(data, 0);
                    }
                },
                {
                    targets: 11,
                    data: "lastMonthReceivedDebt",
                    render: function (data) {
                        return $.number(data, 0);
                    }
                },
                {
                    targets: 12,
                    data: "lastMonthPerformanceRevenue",
                    render: function (data) {
                        return $.number(data, 0);
                    }
                },
                {
                    targets: 13,
                    data: "lastYearRevenue",
                    render: function (data) {
                        return $.number(data, 0);
                    }
                },
                {
                    targets: 14,
                    data: "lastYearReceived",
                    render: function (data) {
                        return $.number(data, 0);
                    }
                },
                {
                    targets: 15,
                    data: "lastYearReceivedDebt",
                    render: function (data) {
                        return $.number(data, 0);
                    }
                },
                {
                    targets: 16,
                    data: "lastYearPerformanceRevenue",
                    render: function (data) {
                        return $.number(data, 0);
                    }
                },
                
            ],
            createdRow: function (row, data, dataIndex) {

                if (data.employeeStatus == 0) {
                    $(row).addClass('employee-status-quit');
                    return;
                }
                if (data.employeeStatus == 2) {
                    $(row).addClass('employee-status-maternity');
                    return;
                }

            },
        });

        function getAccountingReports() {
            dataTable.ajax.reload();
        }

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

        $('#GetReport').click(function (e) {
            e.preventDefault();
            getAccountingReports();
        });

        $(document).keypress(function (e) {
            if (e.which === 13) {
                getSchedules();
            }
        });

    };
})(jQuery);