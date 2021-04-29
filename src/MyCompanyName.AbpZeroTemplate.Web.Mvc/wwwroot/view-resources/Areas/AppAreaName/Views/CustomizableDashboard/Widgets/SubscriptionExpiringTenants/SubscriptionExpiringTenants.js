$(function () {
    var _hostDashboardService = abp.services.app.hostDashboard;
    var _$container = $(".SubscriptionExpiringTenantsContainer");
    var _$expiringTenantsTable = _$container.find(".expiring-tenants-table");
    var _$seeAllExpiringTenantsButton = _$container.find(".see-all-expiring-tenants");
    var _$expiringTenantsCaptionHelper = _$container.find(".sub-title");

    var populateExpiringTenantsTable = function (subscriptionEndAlertDayCount, maxExpiringTenantsShownCount, subscriptionEndDateStart, subscriptionEndDateEnd) {
        _$expiringTenantsCaptionHelper.text(app.localize("ExpiringTenantsHelpText", subscriptionEndAlertDayCount, maxExpiringTenantsShownCount));

        _$seeAllExpiringTenantsButton
            .data("subscriptionEndDateStart", subscriptionEndDateStart)
            .data("subscriptionEndDateEnd", subscriptionEndDateEnd)
            .click(function () {
                window.open(abp.appPath + "AppAreaName/Tenants?" +
                    "subscriptionEndDateStart=" + encodeURIComponent($(this).data("subscriptionEndDateStart")) + "&" +
                    "subscriptionEndDateEnd=" + encodeURIComponent($(this).data("subscriptionEndDateEnd")));
            });
    };

    function initialize() {
        abp.ui.setBusy(_$container);
        _hostDashboardService
            .getSubscriptionExpiringTenantsData()
            .done(function (result) {
                populateExpiringTenantsTable(
                    result.subscriptionEndAlertDayCount,
                    result.maxExpiringTenantsShownCount,
                    result.subscriptionEndDateStart,
                    result.subscriptionEndDateEnd
                );
                initializeSubscriptionExpiringTenantsTable(result.expiringTenants);

            }).always(function () {
            abp.ui.clearBusy(_$container);
        });
    }

    function initializeSubscriptionExpiringTenantsTable(subscriptionExpiredTenants) {
        _$expiringTenantsTable.DataTable({
            paging: false,
            serverSide: false,
            processing: false,
            info: false,
            ajax: function (data, callback, settings) {
                callback(
                    { data: subscriptionExpiredTenants }
                );
            },
            columnDefs: [
                {
                    targets: 0,
                    data: "tenantName"
                },
                {
                    targets: 1,
                    data: "remainingDayCount"
                }
            ]
        });
    }

    initialize();
});
