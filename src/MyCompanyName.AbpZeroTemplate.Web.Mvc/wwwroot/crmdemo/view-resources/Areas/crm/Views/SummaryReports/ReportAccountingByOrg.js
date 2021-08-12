(function () {
    $(function () {

        var _$accountingTable = $('#AccountingTable');
        var _summaryReports = abp.services.app.summaryReports;

        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.Schedules.Create'),
            edit: abp.auth.hasPermission('Pages.Schedules.Edit'),
            'delete': abp.auth.hasPermission('Pages.Schedules.Delete')
        };


        var dataTable = _$accountingTable.DataTable({
            "info": true,
            "lengthChange": true,
            paging: false,
            responsive: false,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _summaryReports.getDataForReportAccountingByOrg,
                inputFilter: function () {
                    return {
                        fromDate: $('#FromDateFilter').val(),
                        toDate: $('#ToDateFilter').val(),
                    };
                }
            },
            columnDefs: [
                {
                    targets: 0,
                    data: "organizationName"
                },
                {
                    targets: 1,
                    data: "revenue",
                    render: function (data) {
                        return $.number(data, 0);
                    }
                },
                {
                    targets: 2,
                    data: "received",
                    render: function (data) {
                        return $.number(data, 0);
                    }
                },
                {
                    targets: 3,
                    data: "receivedDebt",
                    render: function (data) {
                        return $.number(data, 0);
                    }
                },
                {
                    targets: 4,
                    data: "numberOfNewCustomer",
                    render: function (data) {
                        return $.number(data, 0);
                    }
                },
                {
                    targets: 5,
                    data: "receivedLastYear",
                    render: function (data) {
                        return $.number(data, 0);
                    }
                },
                {
                    targets: 6,
                    data: "receivedLastMonth",
                    render: function (data) {
                        return $.number(data, 0);
                    }
                },
            ],
            "footerCallback": function (row, data, start, end, display) {
                var api = this.api(), data;

                // Remove the formatting to get integer data for summation
                var intVal = function (i) {
                    return typeof i === 'string' ?
                        i.replace(/[\$,]/g, '') * 1 :
                        typeof i === 'number' ?
                            i : 0;
                };

                // Total over all pages
                revenue = api
                    .column(1)
                    .data()
                    .reduce(function (a, b) {
                        return intVal(a) + intVal(b);
                    }, 0);

                received = api
                    .column(2)
                    .data()
                    .reduce(function (a, b) {
                        return intVal(a) + intVal(b);
                    }, 0);
                receivedDebt = api
                    .column(3)
                    .data()
                    .reduce(function (a, b) {
                        return intVal(a) + intVal(b);
                    }, 0);
                numberOfNewCustomer = api
                    .column(4)
                    .data()
                    .reduce(function (a, b) {
                        return intVal(a) + intVal(b);
                    }, 0);

                lastYearReceived = api
                    .column(5)
                    .data()
                    .reduce(function (a, b) {
                        return intVal(a) + intVal(b);
                    }, 0);
                lastMonthReceived = api
                    .column(6)
                    .data()
                    .reduce(function (a, b) {
                        return intVal(a) + intVal(b);
                    }, 0);
                debugger;
                // Update footer
                $(api.column(1).footer()).html(
                    $.number(revenue, 0)
                );
                $(api.column(2).footer()).html(
                    $.number(received, 0)
                );
                $(api.column(3).footer()).html(
                    $.number(receivedDebt, 0)
                );
                $(api.column(4).footer()).html(
                    $.number(numberOfNewCustomer, 0)
                );
                $(api.column(5).footer()).html(
                    $.number(lastYearReceived, 0)
                );
                $(api.column(6).footer()).html(
                    $.number(lastMonthReceived, 0)
                );
            }
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

    });
})();