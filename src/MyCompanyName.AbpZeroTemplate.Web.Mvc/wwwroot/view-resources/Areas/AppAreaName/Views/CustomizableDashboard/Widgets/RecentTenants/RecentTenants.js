$(function () {
    var _hostDashboardService = abp.services.app.hostDashboard;
    var _$container = $(".RecentTenantsContainer");
    var _$recentTenantsTable = _$container.find(".recent-tenants-table");
    var _$seeAllRecentTenantsButton = _$container.find(".see-all-recent-tenants");
    var _$recentTenantsCaptionHelper = _$container.find(".sub-title");

    var initRecentTenantsTableInfo = function (recentTenantsDayCount, maxRecentTenantsShownCount, creationDateStart) {
        _$recentTenantsCaptionHelper.text(app.localize("RecentTenantsHelpText", recentTenantsDayCount, maxRecentTenantsShownCount));

        _$seeAllRecentTenantsButton
            .data("creationDateStart", creationDateStart)
            .click(function () {
                window.open(abp.appPath + "AppAreaName/Tenants?" +
                    "creationDateStart=" + encodeURIComponent($(this).data("creationDateStart")));
            });
    };

    function initialize() {
        abp.ui.setBusy(_$container);
        _hostDashboardService
            .getRecentTenantsData()
            .done(function (result) {
                initRecentTenantsTableInfo(
                    result.recentTenantsDayCount,
                    result.maxRecentTenantsShownCount,
                    result.tenantCreationStartDate
                );
                initRecentTenantsTable(result.recentTenants);
            }).always(function () {
            abp.ui.clearBusy(_$container);
        });
    }

    function initRecentTenantsTable(recentTenants) {
        _$recentTenantsTable.DataTable({
            paging: false,
            serverSide: false,
            processing: false,
            info: false,
            ajax: function (data, callback, settings) {
                callback(
                    { data: recentTenants }
                );
            },
            columnDefs: [
                {
                    targets: 0,
                    data: "name"
                },
                {
                    targets: 1,
                    data: "creationTime",
                    render: function (creationTime) {
                        return moment(creationTime).format("L LT");
                    }
                }
            ]
        });
    };

    initialize();
});
