(function () {
    $(function () {

        var _$reportTable = $('#ReportTable');
        var _saleReportsService = abp.services.app.saleReports;
        var _statuses = [];
        var dataTable = null;
        var columns = [

            {
                targets: 0,
                data: "dataSource"
            },
            {
                targets: 1,
                data: "total"
            },
            {
                targets: 2,
                data: "numberOfInactive"
            },
            {
                targets: 3,
                data: "numberOfActive"
            },
            {
                targets: 4,
                data: "numberOfActiveFromInactive"
            },

            {
                targets: 5,
                data: "numberOfActiveBelongsToSeller"
            },
            {
                targets: 6,
                data: "numberOfActiveBelongsToCompany"
            },
        ];
        $('.date-picker').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });
        $('#Year').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: "YYYY",
            viewMode: "years"
        });
        $('#ToDateInMonth').datetimepicker({
            locale: abp.localization.currentLanguage.name,
            format: 'L'
        });
        $('#FromDateInMonth')
            .datetimepicker({
                locale: abp.localization.currentLanguage.name,
                format: 'L'
            }).
        on('dp.change', function (ev) {
            
            $('#ToDateInMonth').data("DateTimePicker").minDate(ev.date);
            var endDate = moment(ev.date).endOf('month');
            $('#ToDateInMonth').data("DateTimePicker").maxDate(endDate);;
        });

        var _permissions = {
            create: abp.auth.hasPermission('Pages.PhieuThus.Create'),
            edit: abp.auth.hasPermission('Pages.PhieuThus.Edit'),
            'delete': abp.auth.hasPermission('Pages.PhieuThus.Delete')
        };
        _saleReportsService.getAllAvailableStatus().done(function (data) {
            _statuses = data;
            for (var i = 0; i < _statuses.length; i++) {
                var column = '<th>' + _statuses[i].displayName + '</th>';
                debugger;
                var functionString = ' debugger;\
                var value = data.statisticByDataStatuses.find(x => x.statusId == ' + _statuses[i].id + ');\
                if(value==null){\
                return 0;\
            }\
            return value.quantity;\
            ';

                columns.push(
                    {
                        targets: columns.length,
                        data: null,
                        render: new Function('data', functionString)
                    });
                $('#ReportTable').find('thead tr').append(column);
            }

            dataTable = _$reportTable.DataTable({
                paging: true,
                serverSide: true,
                processing: true,
                listAction: {
                    ajaxFunction: _saleReportsService.getAllPerformanceByDataSourceReport,
                    inputFilter: function () {
                        return {
                            organizationUnitId: $('.select2me').val(),
                            fromDate: $('#FromDate').val() == "" ? new Date() : $('#FromDate').val(),
                            toDate: $('#ToDate').val() == "" ? new Date() : $('#ToDate').val()
                        };
                    }
                },
                columnDefs: columns
            });
            function getResults() {
                dataTable.ajax.reload();
            }

            $('#GetResultButton').click(function () {
                getResults();
            });
            $(document).keypress(function (e) {
                if (e.which === 13) {
                    getResults();
                }
            });
        });
        

        $('#ExportResultButton').click(function () {
            _saleReportsService
                .performanceByDataSourceReportToExcel({
                    fromDate: $('#FromDate').val(),
                    toDate: $('#ToDate').val()
                })
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });
        

    });
})();