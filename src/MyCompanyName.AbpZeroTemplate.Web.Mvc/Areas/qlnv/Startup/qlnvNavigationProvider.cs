using Abp.Application.Navigation;
using Abp.Authorization;
using Abp.Localization;
using MyCompanyName.AbpZeroTemplate.Authorization;

namespace MyCompanyName.AbpZeroTemplate.Web.Areas.qlnv.Startup
{
    public class qlnvNavigationProvider : NavigationProvider
    {
        public const string MenuName = "App";

        public override void SetNavigation(INavigationProviderContext context)
        {
            var menu = context.Manager.Menus[MenuName] = new MenuDefinition(MenuName, new FixedLocalizableString("Main Menu"));

            MenuItemDefinition mn_person = new MenuItemDefinition(
                        qlnvPageNames.Common.BaseEntities,
                        L("Persons"),
                        url: "qlnv/Persons",
                        icon: "flaticon-user-ok",
                        permissionDependency: new SimplePermissionDependency(AppPermissions.Pages_BaseEntities)
                    )
                    .AddItem(new MenuItemDefinition(
                            qlnvPageNames.Common.Persons,
                            L("Persons"),
                            url: "qlnv/Persons",
                            icon: "flaticon-map",
                            permissionDependency: new SimplePermissionDependency(AppPermissions.Pages_BaseEntities)
                        )
                    )
                    .AddItem(new MenuItemDefinition(
                            qlnvPageNames.Common.Persons,
                            L("RowEditingAndEditingEvents"),
                            url: "qlnv/RowEditingAndEditingEvents",
                            icon: "flaticon-map",
                            permissionDependency: new SimplePermissionDependency(AppPermissions.Pages_BaseEntities)
                        )
                    );
            menu
                .AddItem(new MenuItemDefinition(
                        qlnvPageNames.Host.Dashboard,
                        L("Dashboard"),
                        url: "qlnv/HostDashboard",
                        icon: "flaticon-line-graph",
                        permissionDependency: new SimplePermissionDependency(AppPermissions.Pages_Administration_Host_Dashboard)
                    )
                )
                .AddItem(new MenuItemDefinition(
                        qlnvPageNames.Host.Dashboard,
                        L("TheKhachHangs"),
                        url: "qlnv/TheKhachHangs",
                        icon: "flaticon-line-graph",
                        permissionDependency: new SimplePermissionDependency(AppPermissions.Pages_Administration_Host_Dashboard)
                    )
                )
                .AddItem(new MenuItemDefinition(
                        qlnvPageNames.Host.Dashboard,
                        L("DM_DoiTuongs"),
                        url: "qlnv/DM_DoiTuongs",
                        icon: "flaticon-line-graph",
                        permissionDependency: new SimplePermissionDependency(AppPermissions.Pages_Administration_Host_Dashboard)
                    )
                )
                //.AddItem(new MenuItemDefinition(
                //        qlnvPageNames.Host.Dashboard,
                //        L("AppTasks"),
                //        url: "qlnv/AppTasks",
                //        icon: "flaticon-line-graph",
                //        permissionDependency: new SimplePermissionDependency(AppPermissions.Pages_Administration_Host_Dashboard)
                //    )
                //)
                //.AddItem(mn_person)
                .AddItem(new MenuItemDefinition(
                        qlnvPageNames.Common.BaseEntities,
                        L("BaseEntities"),
                        url: "qlnv/BaseEntities",
                        icon: "flaticon-more",
                        permissionDependency: new SimplePermissionDependency(AppPermissions.Pages_BaseEntities)
                    )
                )
                .AddItem(new MenuItemDefinition(
                        qlnvPageNames.Common.Childs,
                        L("Childs"),
                        url: "qlnv/Childs",
                        icon: "flaticon-more",
                        permissionDependency: new SimplePermissionDependency(AppPermissions.Pages_Childs)
                    )
                )
                //.AddItem(new MenuItemDefinition(
                //        qlnvPageNames.Common.Products,
                //        L("Products"),
                //        url: "qlnv/Products",
                //        icon: "flaticon-more",
                //        permissionDependency: new SimplePermissionDependency(AppPermissions.Pages_Products)
                //    )
                //)
                //.AddItem(new MenuItemDefinition(
                //        qlnvPageNames.Common.Phones,
                //        L("Phones"),
                //        url: "qlnv/Phones",
                //        icon: "flaticon-more",
                //        permissionDependency: new SimplePermissionDependency(AppPermissions.Pages_Phones)
                //    )
                //)
                .AddItem(new MenuItemDefinition(
                    qlnvPageNames.Host.Tenants,
                    L("Tenants"),
                    url: "qlnv/Tenants",
                    icon: "flaticon-list-3",
                    permissionDependency: new SimplePermissionDependency(AppPermissions.Pages_Tenants)
                    )
                )
                .AddItem(new MenuItemDefinition(
                        qlnvPageNames.Host.Editions,
                        L("Editions"),
                        url: "qlnv/Editions",
                        icon: "flaticon-app",
                        permissionDependency: new SimplePermissionDependency(AppPermissions.Pages_Editions)
                    )
                )
                .AddItem(new MenuItemDefinition(
                        qlnvPageNames.Tenant.Dashboard,
                        L("Dashboard"),
                        url: "qlnv/TenantDashboard",
                        icon: "flaticon-line-graph",
                        permissionDependency: new SimplePermissionDependency(AppPermissions.Pages_Tenant_Dashboard)
                    )
                )
                .AddItem(new MenuItemDefinition(
                        qlnvPageNames.Common.Administration,
                        L("Administration"),
                        icon: "flaticon-interface-8"
                    )
                    //.AddItem(new MenuItemDefinition(
                    //    qlnvPageNames.Common.DM_TinhThanhs,
                    //    L("DM_TinhThanhs"),
                    //    url: "qlnv/DM_TinhThanhs",
                    //    icon: "flaticon-map",
                    //    permissionDependency: new SimplePermissionDependency(AppPermissions.Pages_Administration_DM_TinhThanhs)
                    //))
                    //.AddItem(new MenuItemDefinition(
                    //    qlnvPageNames.Common.DM_QuanHuyens,
                    //    L("DM_QuanHuyens"),
                    //    url: "qlnv/DM_QuanHuyens",
                    //    icon: "flaticon-map",
                    //    permissionDependency: new SimplePermissionDependency(AppPermissions.Pages_Administration_DM_QuanHuyens)
                    //))
                    .AddItem(new MenuItemDefinition(
                            qlnvPageNames.Common.OrganizationUnits,
                            L("OrganizationUnits"),
                            url: "qlnv/OrganizationUnits",
                            icon: "flaticon-map",
                            permissionDependency: new SimplePermissionDependency(AppPermissions.Pages_Administration_OrganizationUnits)
                    ))
                    .AddItem(new MenuItemDefinition(
                            qlnvPageNames.Common.Roles,
                            L("Roles"),
                            url: "qlnv/Roles",
                            icon: "flaticon-suitcase",
                            permissionDependency: new SimplePermissionDependency(AppPermissions.Pages_Administration_Roles)
                    ))
                    .AddItem(new MenuItemDefinition(
                            qlnvPageNames.Common.Users,
                            L("Users"),
                            url: "qlnv/Users",
                            icon: "flaticon-users",
                            permissionDependency: new SimplePermissionDependency(AppPermissions.Pages_Administration_Users)
                        )
                    )
                    .AddItem(new MenuItemDefinition(
                            qlnvPageNames.Common.Languages,
                            L("Languages"),
                            url: "qlnv/Languages",
                            icon: "flaticon-tabs",
                            permissionDependency: new SimplePermissionDependency(AppPermissions.Pages_Administration_Languages)
                    ))
                    .AddItem(new MenuItemDefinition(
                            qlnvPageNames.Common.AuditLogs,
                            L("AuditLogs"),
                            url: "qlnv/AuditLogs",
                            icon: "flaticon-folder-1",
                            permissionDependency: new SimplePermissionDependency(AppPermissions.Pages_Administration_AuditLogs)
                    ))
                    .AddItem(new MenuItemDefinition(
                            qlnvPageNames.Host.Maintenance,
                            L("Maintenance"),
                            url: "qlnv/Maintenance",
                            icon: "flaticon-lock",
                            permissionDependency: new SimplePermissionDependency(AppPermissions.Pages_Administration_Host_Maintenance)
                    ))
                    .AddItem(new MenuItemDefinition(
                            qlnvPageNames.Tenant.SubscriptionManagement,
                            L("Subscription"),
                            url: "qlnv/SubscriptionManagement",
                            icon: "flaticon-refresh",
                            permissionDependency: new SimplePermissionDependency(AppPermissions.Pages_Administration_Tenant_SubscriptionManagement)
                    ))
                    .AddItem(new MenuItemDefinition(
                            qlnvPageNames.Common.UiCustomization,
                            L("VisualSettings"),
                            url: "qlnv/UiCustomization",
                            icon: "flaticon-medical",
                            permissionDependency: new SimplePermissionDependency(AppPermissions.Pages_Administration_UiCustomization)
                    ))
                    .AddItem(new MenuItemDefinition(
                            qlnvPageNames.Common.WebhookSubscriptions,
                            L("WebhookSubscriptions"),
                            url: "qlnv/WebhookSubscription",
                            icon: "flaticon2-world",
                            permissionDependency: new SimplePermissionDependency(AppPermissions.Pages_Administration_WebhookSubscription)
                     ))
                    .AddItem(new MenuItemDefinition(
                            qlnvPageNames.Common.DynamicProperties,
                            L("DynamicProperties"),
                            url: "qlnv/DynamicProperty",
                            icon: "flaticon-interface-8",
                            permissionDependency: new SimplePermissionDependency(AppPermissions.Pages_Administration_DynamicProperties)
                     ))
                    .AddItem(new MenuItemDefinition(
                            qlnvPageNames.Host.Settings,
                            L("Settings"),
                            url: "qlnv/HostSettings",
                            icon: "flaticon-settings",
                            permissionDependency: new SimplePermissionDependency(AppPermissions.Pages_Administration_Host_Settings)
                    ))
                    .AddItem(new MenuItemDefinition(
                            qlnvPageNames.Tenant.Settings,
                            L("Settings"),
                            url: "qlnv/Settings",
                            icon: "flaticon-settings",
                            permissionDependency: new SimplePermissionDependency(AppPermissions.Pages_Administration_Tenant_Settings)
                    ))
                )
                //.AddItem(new MenuItemDefinition(
                //        qlnvPageNames.Common.DemoUiComponents,
                //        L("DemoUiComponents"),
                //        url: "qlnv/DemoUiComponents",
                //        icon: "flaticon-shapes",
                //        permissionDependency: new SimplePermissionDependency(AppPermissions.Pages_DemoUiComponents)
                //    )
                //)

                //.AddItem(new MenuItemDefinition(
                //        qlnvPageNames.Common.DemoUiComponents,
                //        L("DevExpress"),
                //        url: "devexpress/DataGrid/",
                //        icon: "flaticon-shapes",
                //        permissionDependency: new SimplePermissionDependency(AppPermissions.Pages_DemoUiComponents)
                //    )
                //)
                ;
        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, AbpZeroTemplateConsts.LocalizationSourceName);
        }
    }
}