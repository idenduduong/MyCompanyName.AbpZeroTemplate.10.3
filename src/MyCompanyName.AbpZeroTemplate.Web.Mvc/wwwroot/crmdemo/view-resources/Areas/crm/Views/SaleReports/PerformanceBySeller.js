(function () {
    $(function () {

        var _$phieuThusTable = $('#SummaryReportByDateTable');
        var _saleReportsService = abp.services.app.saleReports;
        var _$reportByDataSourceTable = $('#ReportByDataSourceTable');
        var _$reportByStatusTable = $('#ReportByStatusTable');
        var _statuses = [];
        var dataTable = null;
        var columns2 = [

            {
                targets: 0,
                data: "sellerCode"
            },
            {
                targets: 1,
                data: "sellerName"
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
            }
        ];
        var columns = [

            {
                targets: 0,
                data: "sellerCode"
            },
            {
                targets: 1,
                data: "sellerName"
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
            format: 'L',
        });
        $('#FromDateInMonth')
            .datetimepicker({
                locale: abp.localization.currentLanguage.name,
                format: 'L',
            }).
            on('dp.change', function (ev) {

                $('#ToDateInMonth').data("DateTimePicker").minDate(ev.date);
                var endDate = moment(ev.date).endOf('month');
                $('#ToDateInMonth').data("DateTimePicker").maxDate(endDate);;
            });

        $('#FromDateInMonth').val(new Date());
        $('#ToDateInMonth').val(new Date());
        var _permissions = {
            create: abp.auth.hasPermission('Pages.PhieuThus.Create'),
            edit: abp.auth.hasPermission('Pages.PhieuThus.Edit'),
            'delete': abp.auth.hasPermission('Pages.PhieuThus.Delete')
        };

        $('.select2me').select2({
            width: "100%"
        });

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
                _$reportByStatusTable.find('thead tr').append(column);
            }

            reportByDataSourceDataTable = _$reportByDataSourceTable.DataTable({
                paging: true,
                serverSide: true,
                processing: true,
                listAction: {
                    ajaxFunction: _saleReportsService.getAllPerformanceBySellerAndDataSourceReport,
                    inputFilter: function () {
                        return {
                            organizationUnitId: $('.select2me').val(),
                            fromDate: $('#FromDate').val() == "" ? new Date() : $('#FromDate').val(),
                            toDate: $('#ToDate').val() == "" ? new Date() : $('#ToDate').val()
                        };
                    }
                },
                columnDefs: columns2

            });

            reportByStatusDataTable = _$reportByStatusTable.DataTable({
                paging: true,
                serverSide: true,
                processing: true,
                listAction: {
                    ajaxFunction: _saleReportsService.getAllPerformanceBySellerAndStatusReport,
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
                reportByStatusDataTable.ajax.reload();
                reportByDataSourceDataTable.ajax.reload();
            }

            $('#GetResultButton').click(function () {
                getResults();
            });
            $(document).keypress(function (e) {
                if (e.which === 13) {
                    getPhieuThus();
                }
            });
        });
        $('#ExportResultButton').click(function () {
            _saleReportsService
                .performanceBySellerReportToExcel({
                    organizationUnitId: $('.select2me').val(),
                    fromDate: $('#FromDate').val(),
                    toDate: $('#ToDate').val()
                })
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });

        //abp.event.on('app.createOrEditPhieuThuModalSaved', function () {
        //    getPhieuThus();
        //});

        //$('#GetPhieuThusButton').click(function (e) {
        //          e.preventDefault();
        //          getPhieuThus();
        //      });

        

    });
})();