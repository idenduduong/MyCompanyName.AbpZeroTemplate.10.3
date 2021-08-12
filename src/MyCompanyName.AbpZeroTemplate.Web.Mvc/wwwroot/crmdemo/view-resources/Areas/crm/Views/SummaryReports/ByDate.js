(function () {
    $(function () {

        var _$phieuThusTable = $('#SummaryReportByDateTable');
        var _summarReportsService = abp.services.app.summaryReports;
        var _organizationTree;
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

        _organizationTree = new OrganizationTree();
        _organizationTree.init($('.organization-tree'));

        $('#ReportButton').click(function () {

        })

        $('#ReportByDateButton').click(function () {
            _summarReportsService
                .getSummaryReportByDate({
                    organizationUnits: _organizationTree.getSelectedOrganizations(),
                    fromDate: $('#FromDate').val(),
                    toDate: $('#ToDate').val()
                })
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });
        $('#ReportByMonthInYearButton').click(function () {
            _summarReportsService
                .getSummaryReportByMonth({
                    organizationUnits: _organizationTree.getSelectedOrganizations(),
                    year: $('#Year').val()
                })
                .done(function (result) {
                    app.downloadTempFile(result);
                });
        });
        $('#CompareTwoMonthButton').click(function () {
            _summarReportsService
                .getSummaryReportCompareTwoMonth({
                    organizationUnits: _organizationTree.getSelectedOrganizations(),
                    fromDate: $('#FromDateInMonth').val(),
                    toDate: $('#ToDateInMonth').val()
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

        $(document).keypress(function (e) {
            if (e.which === 13) {
                getPhieuThus();
            }
        });

    });
})();