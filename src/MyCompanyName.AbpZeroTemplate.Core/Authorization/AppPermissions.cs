﻿namespace MyCompanyName.AbpZeroTemplate.Authorization
{
    /// <summary>
    /// Defines string constants for application's permission names.
    /// <see cref="AppAuthorizationProvider"/> for permission definitions.
    /// </summary>
    public static class AppPermissions
    {
        //  datdd PERMISSIONS

        public const string Disable_Filters = "Disable.Filter";
        public const string Disable_Filters_Tenant = "Disable.Filter.Tenant";
        public const string Disable_Filters_OrganizationUnit = "Disable.Filter.OrganizationUnit";

        public const string Pages_Dm_DoiTuongs = "Pages.Dm_DoiTuongs";
        public const string Pages_Dm_DoiTuongs_Create = "Pages.Dm_DoiTuongs.Create";
        public const string Pages_Dm_DoiTuongs_Edit = "Pages.Dm_DoiTuongs.Edit";
        public const string Pages_Dm_DoiTuongs_Delete = "Pages.Dm_DoiTuongs.Delete";
        public const string Pages_Dm_DoiTuongs_SearchFull = "Pages.Dm_DoiTuongs.SearchFull";
        public const string Pages_Dm_DoiTuongs_LoadFull = "Pages.Dm_DoiTuongs.LoadFull";

        public const string Pages_TheKhachHangs = "Pages.TheKhachHangs";
        public const string Pages_TheKhachHangs_Create = "Pages.TheKhachHangs.Create";
        public const string Pages_TheKhachHangs_Edit = "Pages.TheKhachHangs.Edit";
        public const string Pages_TheKhachHangs_Delete = "Pages.TheKhachHangs.Delete";
        public const string Pages_TheKhachHangs_SearchFull = "Pages.TheKhachHang.SearchFull";
        public const string Pages_TheKhachHangs_LoadFull = "Pages.TheKhachHang.LoadFull";

        public const string Pages_BaseEntities = "Pages.BaseEntities";
        public const string Pages_BaseEntities_Create = "Pages.BaseEntities.Create";
        public const string Pages_BaseEntities_Edit = "Pages.BaseEntities.Edit";
        public const string Pages_BaseEntities_Delete = "Pages.BaseEntities.Delete";

        public const string Pages_Childs = "Pages.Childs";
        public const string Pages_Childs_Create = "Pages.Childs.Create";
        public const string Pages_Childs_Edit = "Pages.Childs.Edit";
        public const string Pages_Childs_Delete = "Pages.Childs.Delete";

        public const string Pages_Products = "Pages.Products";
        public const string Pages_Products_Create = "Pages.Products.Create";
        public const string Pages_Products_Edit = "Pages.Products.Edit";
        public const string Pages_Products_Delete = "Pages.Products.Delete";

        public const string Pages_DM_DoiTuong = "Pages.DM_DoiTuong";
        public const string Pages_DM_DoiTuong_Create = "Pages.DM_DoiTuong.Create";
        public const string Pages_DM_DoiTuong_Edit = "Pages.DM_DoiTuong.Edit";
        public const string Pages_DM_DoiTuong_Delete = "Pages.DM_DoiTuong.Delete";

        public const string Pages_DM_NhomDoiTuongs = "Pages.DM_NhomDoiTuongs";
        public const string Pages_DM_NhomDoiTuongs_Create = "Pages.DM_NhomDoiTuongs.Create";
        public const string Pages_DM_NhomDoiTuongs_Edit = "Pages.DM_NhomDoiTuongs.Edit";
        public const string Pages_DM_NhomDoiTuongs_Delete = "Pages.DM_NhomDoiTuongs.Delete";

        public const string Pages_Phones = "Pages.Phones";
        public const string Pages_Phones_Create = "Pages.Phones.Create";
        public const string Pages_Phones_Edit = "Pages.Phones.Edit";
        public const string Pages_Phones_Delete = "Pages.Phones.Delete";

        //COMMON PERMISSIONS (FOR BOTH OF TENANTS AND HOST)

        public const string Pages = "Pages";

        public const string Pages_DemoUiComponents = "Pages.DemoUiComponents";
        public const string Pages_Administration = "Pages.Administration";

        public const string Pages_Administration_Roles = "Pages.Administration.Roles";
        public const string Pages_Administration_Roles_Create = "Pages.Administration.Roles.Create";
        public const string Pages_Administration_Roles_Edit = "Pages.Administration.Roles.Edit";
        public const string Pages_Administration_Roles_Delete = "Pages.Administration.Roles.Delete";

        public const string Pages_Administration_DM_TinhThanhs = "Pages.Administration.DM_TinhThanhs";
        public const string Pages_Administration_DM_TinhThanhs_Create = "Pages.Administration.DM_TinhThanhs.Create";
        public const string Pages_Administration_DM_TinhThanhs_Edit = "Pages.Administration.DM_TinhThanhs.Edit";
        public const string Pages_Administration_DM_TinhThanhs_Delete = "Pages.Administration.DM_TinhThanhs.Delete";

        public const string Pages_Administration_DM_QuanHuyens = "Pages.Administration.DM_QuanHuyens";
        public const string Pages_Administration_DM_QuanHuyens_Create = "Pages.Administration.DM_QuanHuyens.Create";
        public const string Pages_Administration_DM_QuanHuyens_Edit = "Pages.Administration.DM_QuanHuyens.Edit";
        public const string Pages_Administration_DM_QuanHuyens_Delete = "Pages.Administration.DM_QuanHuyens.Delete";

        public const string Pages_Administration_Users = "Pages.Administration.Users";
        public const string Pages_Administration_Users_Create = "Pages.Administration.Users.Create";
        public const string Pages_Administration_Users_Edit = "Pages.Administration.Users.Edit";
        public const string Pages_Administration_Users_Delete = "Pages.Administration.Users.Delete";
        public const string Pages_Administration_Users_ChangePermissions = "Pages.Administration.Users.ChangePermissions";
        public const string Pages_Administration_Users_Impersonation = "Pages.Administration.Users.Impersonation";
        public const string Pages_Administration_Users_Unlock = "Pages.Administration.Users.Unlock";

        public const string Pages_Administration_Languages = "Pages.Administration.Languages";
        public const string Pages_Administration_Languages_Create = "Pages.Administration.Languages.Create";
        public const string Pages_Administration_Languages_Edit = "Pages.Administration.Languages.Edit";
        public const string Pages_Administration_Languages_Delete = "Pages.Administration.Languages.Delete";
        public const string Pages_Administration_Languages_ChangeTexts = "Pages.Administration.Languages.ChangeTexts";
        public const string Pages_Administration_Languages_ChangeDefaultLanguage = "Pages.Administration.Languages.ChangeDefaultLanguage";

        public const string Pages_Administration_AuditLogs = "Pages.Administration.AuditLogs";

        public const string Pages_Administration_OrganizationUnits = "Pages.Administration.OrganizationUnits";
        public const string Pages_Administration_OrganizationUnits_ManageOrganizationTree = "Pages.Administration.OrganizationUnits.ManageOrganizationTree";
        public const string Pages_Administration_OrganizationUnits_ManageMembers = "Pages.Administration.OrganizationUnits.ManageMembers";
        public const string Pages_Administration_OrganizationUnits_ManageRoles = "Pages.Administration.OrganizationUnits.ManageRoles";

        public const string Pages_Administration_HangfireDashboard = "Pages.Administration.HangfireDashboard";

        public const string Pages_Administration_UiCustomization = "Pages.Administration.UiCustomization";

        public const string Pages_Administration_WebhookSubscription = "Pages.Administration.WebhookSubscription";
        public const string Pages_Administration_WebhookSubscription_Create = "Pages.Administration.WebhookSubscription.Create";
        public const string Pages_Administration_WebhookSubscription_Edit = "Pages.Administration.WebhookSubscription.Edit";
        public const string Pages_Administration_WebhookSubscription_ChangeActivity = "Pages.Administration.WebhookSubscription.ChangeActivity";
        public const string Pages_Administration_WebhookSubscription_Detail = "Pages.Administration.WebhookSubscription.Detail";
        public const string Pages_Administration_Webhook_ListSendAttempts = "Pages.Administration.Webhook.ListSendAttempts";
        public const string Pages_Administration_Webhook_ResendWebhook = "Pages.Administration.Webhook.ResendWebhook";

        public const string Pages_Administration_DynamicProperties = "Pages.Administration.DynamicProperties";
        public const string Pages_Administration_DynamicProperties_Create = "Pages.Administration.DynamicProperties.Create";
        public const string Pages_Administration_DynamicProperties_Edit = "Pages.Administration.DynamicProperties.Edit";
        public const string Pages_Administration_DynamicProperties_Delete = "Pages.Administration.DynamicProperties.Delete";

        public const string Pages_Administration_DynamicPropertyValue = "Pages.Administration.DynamicPropertyValue";
        public const string Pages_Administration_DynamicPropertyValue_Create = "Pages.Administration.DynamicPropertyValue.Create";
        public const string Pages_Administration_DynamicPropertyValue_Edit = "Pages.Administration.DynamicPropertyValue.Edit";
        public const string Pages_Administration_DynamicPropertyValue_Delete = "Pages.Administration.DynamicPropertyValue.Delete";

        public const string Pages_Administration_DynamicEntityProperties = "Pages.Administration.DynamicEntityProperties";
        public const string Pages_Administration_DynamicEntityProperties_Create = "Pages.Administration.DynamicEntityProperties.Create";
        public const string Pages_Administration_DynamicEntityProperties_Edit = "Pages.Administration.DynamicEntityProperties.Edit";
        public const string Pages_Administration_DynamicEntityProperties_Delete = "Pages.Administration.DynamicEntityProperties.Delete";

        public const string Pages_Administration_DynamicEntityPropertyValue = "Pages.Administration.DynamicEntityPropertyValue";
        public const string Pages_Administration_DynamicEntityPropertyValue_Create = "Pages.Administration.DynamicEntityPropertyValue.Create";
        public const string Pages_Administration_DynamicEntityPropertyValue_Edit = "Pages.Administration.DynamicEntityPropertyValue.Edit";
        public const string Pages_Administration_DynamicEntityPropertyValue_Delete = "Pages.Administration.DynamicEntityPropertyValue.Delete";
        
        //TENANT-SPECIFIC PERMISSIONS

        public const string Pages_Tenant_Dashboard = "Pages.Tenant.Dashboard";
        public const string Pages_Administration_Tenant_Settings = "Pages.Administration.Tenant.Settings";
        public const string Pages_Administration_Tenant_SubscriptionManagement = "Pages.Administration.Tenant.SubscriptionManagement";

        //HOST-SPECIFIC PERMISSIONS

        public const string Pages_Editions = "Pages.Editions";
        public const string Pages_Editions_Create = "Pages.Editions.Create";
        public const string Pages_Editions_Edit = "Pages.Editions.Edit";
        public const string Pages_Editions_Delete = "Pages.Editions.Delete";
        public const string Pages_Editions_MoveTenantsToAnotherEdition = "Pages.Editions.MoveTenantsToAnotherEdition";

        public const string Pages_Tenants = "Pages.Tenants";
        public const string Pages_Tenants_Create = "Pages.Tenants.Create";
        public const string Pages_Tenants_Edit = "Pages.Tenants.Edit";
        public const string Pages_Tenants_ChangeFeatures = "Pages.Tenants.ChangeFeatures";
        public const string Pages_Tenants_Delete = "Pages.Tenants.Delete";
        public const string Pages_Tenants_Impersonation = "Pages.Tenants.Impersonation";

        public const string Pages_Administration_Host_Maintenance = "Pages.Administration.Host.Maintenance";
        public const string Pages_Administration_Host_Settings = "Pages.Administration.Host.Settings";
        public const string Pages_Administration_Host_Dashboard = "Pages.Administration.Host.Dashboard";

    }
}
