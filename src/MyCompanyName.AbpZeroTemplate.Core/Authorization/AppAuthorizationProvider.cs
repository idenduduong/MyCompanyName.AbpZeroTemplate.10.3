﻿using Abp.Authorization;
using Abp.Configuration.Startup;
using Abp.Localization;
using Abp.MultiTenancy;

namespace MyCompanyName.AbpZeroTemplate.Authorization
{
    /// <summary>
    /// Application's authorization provider.
    /// Defines permissions for the application.
    /// See <see cref="AppPermissions"/> for all permission names.
    /// </summary>
    public class AppAuthorizationProvider : AuthorizationProvider
    {
        private readonly bool _isMultiTenancyEnabled;

        public AppAuthorizationProvider(bool isMultiTenancyEnabled)
        {
            _isMultiTenancyEnabled = isMultiTenancyEnabled;
        }

        public AppAuthorizationProvider(IMultiTenancyConfig multiTenancyConfig)
        {
            _isMultiTenancyEnabled = multiTenancyConfig.IsEnabled;
        }

        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            //COMMON PERMISSIONS (FOR BOTH OF TENANTS AND HOST)

            var pages = context.GetPermissionOrNull(AppPermissions.Pages) ?? context.CreatePermission(AppPermissions.Pages, L("Pages"));

            var dm_DoiTuongs = pages.CreateChildPermission(AppPermissions.Pages_Dm_DoiTuongs, L("DmDoiTuong"));
            dm_DoiTuongs.CreateChildPermission(AppPermissions.Pages_Dm_DoiTuongs_Create, L("CreateDmDoiTuong"));
            dm_DoiTuongs.CreateChildPermission(AppPermissions.Pages_Dm_DoiTuongs_Edit, L("EditDmDoiTuongs"));
            dm_DoiTuongs.CreateChildPermission(AppPermissions.Pages_Dm_DoiTuongs_Delete, L("DeleteDmDoiTuong"));
            dm_DoiTuongs.CreateChildPermission(AppPermissions.Pages_Dm_DoiTuongs_SearchFull, L("SearchFullDmDoiTuong"));
            dm_DoiTuongs.CreateChildPermission(AppPermissions.Pages_Dm_DoiTuongs_LoadFull, L("LoadFullDmDoiTuong"));

            var theKhachHangs = pages.CreateChildPermission(AppPermissions.Pages_TheKhachHangs, L("TheKhachHang"));
            theKhachHangs.CreateChildPermission(AppPermissions.Pages_TheKhachHangs_Create, L("CreateTheKhachHang"));
            theKhachHangs.CreateChildPermission(AppPermissions.Pages_TheKhachHangs_Edit, L("EditTheKhachHang"));
            theKhachHangs.CreateChildPermission(AppPermissions.Pages_TheKhachHangs_Delete, L("DeleteTheKhachHang"));
            theKhachHangs.CreateChildPermission(AppPermissions.Pages_TheKhachHangs_SearchFull, L("SearchFullTheKhachHang"));
            theKhachHangs.CreateChildPermission(AppPermissions.Pages_TheKhachHangs_LoadFull, L("LoadFullTheKhachHang"));

            var dm_TinhThanhs = pages.CreateChildPermission(AppPermissions.Pages_Administration_DM_TinhThanhs, L("TinhThanhs"));
            dm_TinhThanhs.CreateChildPermission(AppPermissions.Pages_Administration_DM_TinhThanhs_Create, L("CreateTheKhachHang"));
            dm_TinhThanhs.CreateChildPermission(AppPermissions.Pages_Administration_DM_TinhThanhs_Edit, L("EditTheKhachHang"));
            dm_TinhThanhs.CreateChildPermission(AppPermissions.Pages_Administration_DM_TinhThanhs_Delete, L("DeleteTheKhachHang"));

            var baseEntities = pages.CreateChildPermission(AppPermissions.Pages_BaseEntities, L("BaseEntities"));
            baseEntities.CreateChildPermission(AppPermissions.Pages_BaseEntities_Create, L("CreateNewBaseEntity"));
            baseEntities.CreateChildPermission(AppPermissions.Pages_BaseEntities_Edit, L("EditBaseEntity"));
            baseEntities.CreateChildPermission(AppPermissions.Pages_BaseEntities_Delete, L("DeleteBaseEntity"));

            //  datdd
            var filters = pages.CreateChildPermission(AppPermissions.Disable_Filters, L("Disable_Filters"));
            filters.CreateChildPermission(AppPermissions.Disable_Filters_MayHaveOrganizationUnit, L("Disable_Filters_MayHaveOrganizationUnit"));
            filters.CreateChildPermission(AppPermissions.Disable_Filters_Tenant, L("Disable_Filters_Tenant"));

            var childs = pages.CreateChildPermission(AppPermissions.Pages_Childs, L("Childs"));
            childs.CreateChildPermission(AppPermissions.Pages_Childs_Create, L("CreateNewChild"));
            childs.CreateChildPermission(AppPermissions.Pages_Childs_Edit, L("EditChild"));
            childs.CreateChildPermission(AppPermissions.Pages_Childs_Delete, L("DeleteChild"));

            var products = pages.CreateChildPermission(AppPermissions.Pages_Products, L("Products"));
            products.CreateChildPermission(AppPermissions.Pages_Products_Create, L("CreateNewProduct"));
            products.CreateChildPermission(AppPermissions.Pages_Products_Edit, L("EditProduct"));
            products.CreateChildPermission(AppPermissions.Pages_Products_Delete, L("DeleteProduct"));

            var dM_DoiTuong = pages.CreateChildPermission(AppPermissions.Pages_DM_DoiTuong, L("DM_DoiTuong"));
            dM_DoiTuong.CreateChildPermission(AppPermissions.Pages_DM_DoiTuong_Create, L("CreateNewDM_DoiTuong"));
            dM_DoiTuong.CreateChildPermission(AppPermissions.Pages_DM_DoiTuong_Edit, L("EditDM_DoiTuong"));
            dM_DoiTuong.CreateChildPermission(AppPermissions.Pages_DM_DoiTuong_Delete, L("DeleteDM_DoiTuong"));

            var dM_NhomDoiTuongs = pages.CreateChildPermission(AppPermissions.Pages_DM_NhomDoiTuongs, L("DM_NhomDoiTuongs"));
            dM_NhomDoiTuongs.CreateChildPermission(AppPermissions.Pages_DM_NhomDoiTuongs_Create, L("CreateNewDM_NhomDoiTuongs"));
            dM_NhomDoiTuongs.CreateChildPermission(AppPermissions.Pages_DM_NhomDoiTuongs_Edit, L("EditDM_NhomDoiTuongs"));
            dM_NhomDoiTuongs.CreateChildPermission(AppPermissions.Pages_DM_NhomDoiTuongs_Delete, L("DeleteDM_NhomDoiTuongs"));

            var phones = pages.CreateChildPermission(AppPermissions.Pages_Phones, L("Phones"));
            phones.CreateChildPermission(AppPermissions.Pages_Phones_Create, L("CreateNewPhone"));
            phones.CreateChildPermission(AppPermissions.Pages_Phones_Edit, L("EditPhone"));
            phones.CreateChildPermission(AppPermissions.Pages_Phones_Delete, L("DeletePhone"));

            pages.CreateChildPermission(AppPermissions.Pages_DemoUiComponents, L("DemoUiComponents"));

            var administration = pages.CreateChildPermission(AppPermissions.Pages_Administration, L("Administration"));

            var roles = administration.CreateChildPermission(AppPermissions.Pages_Administration_Roles, L("Roles"));
            roles.CreateChildPermission(AppPermissions.Pages_Administration_Roles_Create, L("CreatingNewRole"));
            roles.CreateChildPermission(AppPermissions.Pages_Administration_Roles_Edit, L("EditingRole"));
            roles.CreateChildPermission(AppPermissions.Pages_Administration_Roles_Delete, L("DeletingRole"));

            var users = administration.CreateChildPermission(AppPermissions.Pages_Administration_Users, L("Users"));
            users.CreateChildPermission(AppPermissions.Pages_Administration_Users_Create, L("CreatingNewUser"));
            users.CreateChildPermission(AppPermissions.Pages_Administration_Users_Edit, L("EditingUser"));
            users.CreateChildPermission(AppPermissions.Pages_Administration_Users_Delete, L("DeletingUser"));
            users.CreateChildPermission(AppPermissions.Pages_Administration_Users_ChangePermissions, L("ChangingPermissions"));
            users.CreateChildPermission(AppPermissions.Pages_Administration_Users_Impersonation, L("LoginForUsers"));
            users.CreateChildPermission(AppPermissions.Pages_Administration_Users_Unlock, L("Unlock"));

            var languages = administration.CreateChildPermission(AppPermissions.Pages_Administration_Languages, L("Languages"));
            languages.CreateChildPermission(AppPermissions.Pages_Administration_Languages_Create, L("CreatingNewLanguage"), multiTenancySides: _isMultiTenancyEnabled ? MultiTenancySides.Host : MultiTenancySides.Tenant);
            languages.CreateChildPermission(AppPermissions.Pages_Administration_Languages_Edit, L("EditingLanguage"), multiTenancySides: _isMultiTenancyEnabled ? MultiTenancySides.Host : MultiTenancySides.Tenant);
            languages.CreateChildPermission(AppPermissions.Pages_Administration_Languages_Delete, L("DeletingLanguages"), multiTenancySides: _isMultiTenancyEnabled ? MultiTenancySides.Host : MultiTenancySides.Tenant);
            languages.CreateChildPermission(AppPermissions.Pages_Administration_Languages_ChangeTexts, L("ChangingTexts"));
            languages.CreateChildPermission(AppPermissions.Pages_Administration_Languages_ChangeDefaultLanguage, L("ChangeDefaultLanguage"));

            administration.CreateChildPermission(AppPermissions.Pages_Administration_AuditLogs, L("AuditLogs"));

            var organizationUnits = administration.CreateChildPermission(AppPermissions.Pages_Administration_OrganizationUnits, L("OrganizationUnits"));
            organizationUnits.CreateChildPermission(AppPermissions.Pages_Administration_OrganizationUnits_ManageOrganizationTree, L("ManagingOrganizationTree"));
            organizationUnits.CreateChildPermission(AppPermissions.Pages_Administration_OrganizationUnits_ManageMembers, L("ManagingMembers"));
            organizationUnits.CreateChildPermission(AppPermissions.Pages_Administration_OrganizationUnits_ManageRoles, L("ManagingRoles"));

            administration.CreateChildPermission(AppPermissions.Pages_Administration_UiCustomization, L("VisualSettings"));

            var webhooks = administration.CreateChildPermission(AppPermissions.Pages_Administration_WebhookSubscription, L("Webhooks"));
            webhooks.CreateChildPermission(AppPermissions.Pages_Administration_WebhookSubscription_Create, L("CreatingWebhooks"));
            webhooks.CreateChildPermission(AppPermissions.Pages_Administration_WebhookSubscription_Edit, L("EditingWebhooks"));
            webhooks.CreateChildPermission(AppPermissions.Pages_Administration_WebhookSubscription_ChangeActivity, L("ChangingWebhookActivity"));
            webhooks.CreateChildPermission(AppPermissions.Pages_Administration_WebhookSubscription_Detail, L("DetailingSubscription"));
            webhooks.CreateChildPermission(AppPermissions.Pages_Administration_Webhook_ListSendAttempts, L("ListingSendAttempts"));
            webhooks.CreateChildPermission(AppPermissions.Pages_Administration_Webhook_ResendWebhook, L("ResendingWebhook"));

            var dynamicProperties = administration.CreateChildPermission(AppPermissions.Pages_Administration_DynamicProperties, L("DynamicProperties"));
            dynamicProperties.CreateChildPermission(AppPermissions.Pages_Administration_DynamicProperties_Create, L("CreatingDynamicProperties"));
            dynamicProperties.CreateChildPermission(AppPermissions.Pages_Administration_DynamicProperties_Edit, L("EditingDynamicProperties"));
            dynamicProperties.CreateChildPermission(AppPermissions.Pages_Administration_DynamicProperties_Delete, L("DeletingDynamicProperties"));

            var dynamicPropertyValues = dynamicProperties.CreateChildPermission(AppPermissions.Pages_Administration_DynamicPropertyValue, L("DynamicPropertyValue"));
            dynamicPropertyValues.CreateChildPermission(AppPermissions.Pages_Administration_DynamicPropertyValue_Create, L("CreatingDynamicPropertyValue"));
            dynamicPropertyValues.CreateChildPermission(AppPermissions.Pages_Administration_DynamicPropertyValue_Edit, L("EditingDynamicPropertyValue"));
            dynamicPropertyValues.CreateChildPermission(AppPermissions.Pages_Administration_DynamicPropertyValue_Delete, L("DeletingDynamicPropertyValue"));

            var dynamicEntityProperties = dynamicProperties.CreateChildPermission(AppPermissions.Pages_Administration_DynamicEntityProperties, L("DynamicEntityProperties"));
            dynamicEntityProperties.CreateChildPermission(AppPermissions.Pages_Administration_DynamicEntityProperties_Create, L("CreatingDynamicEntityProperties"));
            dynamicEntityProperties.CreateChildPermission(AppPermissions.Pages_Administration_DynamicEntityProperties_Edit, L("EditingDynamicEntityProperties"));
            dynamicEntityProperties.CreateChildPermission(AppPermissions.Pages_Administration_DynamicEntityProperties_Delete, L("DeletingDynamicEntityProperties"));

            var dynamicEntityPropertyValues = dynamicProperties.CreateChildPermission(AppPermissions.Pages_Administration_DynamicEntityPropertyValue, L("EntityDynamicPropertyValue"));
            dynamicEntityPropertyValues.CreateChildPermission(AppPermissions.Pages_Administration_DynamicEntityPropertyValue_Create, L("CreatingDynamicEntityPropertyValue"));
            dynamicEntityPropertyValues.CreateChildPermission(AppPermissions.Pages_Administration_DynamicEntityPropertyValue_Edit, L("EditingDynamicEntityPropertyValue"));
            dynamicEntityPropertyValues.CreateChildPermission(AppPermissions.Pages_Administration_DynamicEntityPropertyValue_Delete, L("DeletingDynamicEntityPropertyValue"));

            //TENANT-SPECIFIC PERMISSIONS

            pages.CreateChildPermission(AppPermissions.Pages_Tenant_Dashboard, L("Dashboard"), multiTenancySides: MultiTenancySides.Tenant);

            administration.CreateChildPermission(AppPermissions.Pages_Administration_Tenant_Settings, L("Settings"), multiTenancySides: MultiTenancySides.Tenant);
            administration.CreateChildPermission(AppPermissions.Pages_Administration_Tenant_SubscriptionManagement, L("Subscription"), multiTenancySides: MultiTenancySides.Tenant);

            //HOST-SPECIFIC PERMISSIONS

            var editions = pages.CreateChildPermission(AppPermissions.Pages_Editions, L("Editions"), multiTenancySides: MultiTenancySides.Host);
            editions.CreateChildPermission(AppPermissions.Pages_Editions_Create, L("CreatingNewEdition"), multiTenancySides: MultiTenancySides.Host);
            editions.CreateChildPermission(AppPermissions.Pages_Editions_Edit, L("EditingEdition"), multiTenancySides: MultiTenancySides.Host);
            editions.CreateChildPermission(AppPermissions.Pages_Editions_Delete, L("DeletingEdition"), multiTenancySides: MultiTenancySides.Host);
            editions.CreateChildPermission(AppPermissions.Pages_Editions_MoveTenantsToAnotherEdition, L("MoveTenantsToAnotherEdition"), multiTenancySides: MultiTenancySides.Host);

            var tenants = pages.CreateChildPermission(AppPermissions.Pages_Tenants, L("Tenants"), multiTenancySides: MultiTenancySides.Host);
            tenants.CreateChildPermission(AppPermissions.Pages_Tenants_Create, L("CreatingNewTenant"), multiTenancySides: MultiTenancySides.Host);
            tenants.CreateChildPermission(AppPermissions.Pages_Tenants_Edit, L("EditingTenant"), multiTenancySides: MultiTenancySides.Host);
            tenants.CreateChildPermission(AppPermissions.Pages_Tenants_ChangeFeatures, L("ChangingFeatures"), multiTenancySides: MultiTenancySides.Host);
            tenants.CreateChildPermission(AppPermissions.Pages_Tenants_Delete, L("DeletingTenant"), multiTenancySides: MultiTenancySides.Host);
            tenants.CreateChildPermission(AppPermissions.Pages_Tenants_Impersonation, L("LoginForTenants"), multiTenancySides: MultiTenancySides.Host);

            administration.CreateChildPermission(AppPermissions.Pages_Administration_Host_Settings, L("Settings"), multiTenancySides: MultiTenancySides.Host);
            administration.CreateChildPermission(AppPermissions.Pages_Administration_Host_Maintenance, L("Maintenance"), multiTenancySides: _isMultiTenancyEnabled ? MultiTenancySides.Host : MultiTenancySides.Tenant);
            administration.CreateChildPermission(AppPermissions.Pages_Administration_HangfireDashboard, L("HangfireDashboard"), multiTenancySides: _isMultiTenancyEnabled ? MultiTenancySides.Host : MultiTenancySides.Tenant);
            administration.CreateChildPermission(AppPermissions.Pages_Administration_Host_Dashboard, L("Dashboard"), multiTenancySides: MultiTenancySides.Host);
        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, AbpZeroTemplateConsts.LocalizationSourceName);
        }
    }
}
