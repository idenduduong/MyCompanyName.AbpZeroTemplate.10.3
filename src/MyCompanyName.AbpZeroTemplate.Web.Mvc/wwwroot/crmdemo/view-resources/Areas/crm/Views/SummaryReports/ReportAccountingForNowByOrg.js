(function () {
    $(function () {

        var _$accountingTable = $('#AccountingTable');
        var _summaryReports = abp.services.app.summaryReports;

        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        }); 

        var _reportAccountingForNowBySale = app.ModalManager({
            viewUrl: abp.appPath + 'crm/SummaryReports/reportAccountingForNowBySale',
            scriptUrl: abp.appPath + 'view-resources/Areas/crm/Views/SummaryReports/ReportAccountingForNowBySale.js',
            modalClass: 'ReportAccountingForNowBySale',
            width: '95%'
        });


        var dataTable = _$accountingTable.DataTable({
            "info": true,
            "lengthChange": true,
            paging: false,
            responsive: false,
            serverSide: true,
            processing: true,
            listAction: {
                ajaxFunction: _summaryReports.getDataForReportAccountingForNowByOrg,
                inputFilter: function () {
                    return {

                    };
                }
            },
            columnDefs: [
                {
                    targets: 0,
                    data: "organizationName",
                    render: function (data) {
                        return '<a class="reportBySale" href="#">' + data + '</a>';
                    }
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
                toDayRevenue = api
                    .column(1)
                    .data()
                    .reduce(function (a, b) {
                        return intVal(a) + intVal(b);
                    }, 0);

                toDayReceived = api
                    .column(2)
                    .data()
                    .reduce(function (a, b) {
                        return intVal(a) + intVal(b);
                    }, 0);
                toDayReceivedDebt = api
                    .column(3)
                    .data()
                    .reduce(function (a, b) {
                        return intVal(a) + intVal(b);
                    }, 0);
                toDayPerformanceRevenue = api
                    .column(4)
                    .data()
                    .reduce(function (a, b) {
                        return intVal(a) + intVal(b);
                    }, 0);
                thisMonthRevenue = api
                    .column(5)
                    .data()
                    .reduce(function (a, b) {
                        return intVal(a) + intVal(b);
                    }, 0);

                thisMonthReceived = api
                    .column(6)
                    .data()
                    .reduce(function (a, b) {
                        return intVal(a) + intVal(b);
                    }, 0);
                thisMonthReceivedDebt = api
                    .column(7)
                    .data()
                    .reduce(function (a, b) {
                        return intVal(a) + intVal(b);
                    }, 0);
                thisMonthPerformanceRevenue = api
                    .column(8)
                    .data()
                    .reduce(function (a, b) {
                        return intVal(a) + intVal(b);
                    }, 0);

                lastMonthRevenue = api
                    .column(9)
                    .data()
                    .reduce(function (a, b) {
                        return intVal(a) + intVal(b);
                    }, 0);

                lastMonthReceived = api
                    .column(10)
                    .data()
                    .reduce(function (a, b) {
                        return intVal(a) + intVal(b);
                    }, 0);
                lastMonthReceivedDebt = api
                    .column(11)
                    .data()
                    .reduce(function (a, b) {
                        return intVal(a) + intVal(b);
                    }, 0);
                lastMonthPerformanceRevenue = api
                    .column(12)
                    .data()
                    .reduce(function (a, b) {
                        return intVal(a) + intVal(b);
                    }, 0);


                lastYearRevenue = api
                    .column(13)
                    .data()
                    .reduce(function (a, b) {
                        return intVal(a) + intVal(b);
                    }, 0);

                lastYearReceived = api
                    .column(14)
                    .data()
                    .reduce(function (a, b) {
                        return intVal(a) + intVal(b);
                    }, 0);
                lastYearReceivedDebt = api
                    .column(15)
                    .data()
                    .reduce(function (a, b) {
                        return intVal(a) + intVal(b);
                    }, 0);
                lastYearPerformanceRevenue = api
                    .column(16)
                    .data()
                    .reduce(function (a, b) {
                        return intVal(a) + intVal(b);
                    }, 0);
                
                debugger;
                // Update footer
                $(api.column(1).footer()).html(
                    $.number(toDayRevenue, 0)
                );
                $(api.column(2).footer()).html(
                    $.number(toDayReceived, 0)
                );
                $(api.column(3).footer()).html(
                    $.number(toDayReceivedDebt, 0)
                );
                $(api.column(4).footer()).html(
                    $.number(toDayPerformanceRevenue, 0)
                );
                $(api.column(5).footer()).html(
                    $.number(thisMonthRevenue, 0)
                );
                $(api.column(6).footer()).html(
                    $.number(thisMonthReceived, 0)
                );
                $(api.column(7).footer()).html(
                    $.number(thisMonthReceivedDebt, 0)
                );
                $(api.column(8).footer()).html(
                    $.number(thisMonthPerformanceRevenue, 0)
                );

                $(api.column(9).footer()).html(
                    $.number(lastMonthRevenue, 0)
                );
                $(api.column(10).footer()).html(
                    $.number(lastMonthReceived, 0)
                );
                $(api.column(11).footer()).html(
                    $.number(lastMonthReceivedDebt, 0)
                );
                $(api.column(12).footer()).html(
                    $.number(lastMonthPerformanceRevenue, 0)
                );

                $(api.column(13).footer()).html(
                    $.number(lastYearRevenue, 0)
                );
                $(api.column(14).footer()).html(
                    $.number(lastYearReceived, 0)
                );
                $(api.column(15).footer()).html(
                    $.number(lastYearReceivedDebt, 0)
                );
                $(api.column(16).footer()).html(
                    $.number(lastYearPerformanceRevenue, 0)
                );
            }
        });

        function getAccountingReports() {
            dataTable.ajax.reload();
        }

        $('#AccountingTable tbody').on('click', '.reportBySale', function () {
            debugger;
            var data = dataTable.row($(this).closest('tr')).data();
            _reportAccountingForNowBySale.open({ orgId: data.organizationId, orgName: data.organizationName });
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