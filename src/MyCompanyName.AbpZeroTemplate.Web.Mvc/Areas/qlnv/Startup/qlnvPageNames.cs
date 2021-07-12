namespace MyCompanyName.AbpZeroTemplate.Web.Areas.qlnv.Startup
{
    public class qlnvPageNames
    {
        public static class Common
        {
            public const string Persons = "Persons.Person";
            public const string BaseEntities = "BaseNamespace.BaseEntities";
            public const string Childs = "ChildNamespace1.Childs";
            public const string Products = "Products.Products";
            public const string DM_DoiTuong = "DM_DoiTuongs.DM_DoiTuong";
            public const string DM_NhomDoiTuongs = "DM_NhomDoiTuongs.DM_NhomDoiTuongs";
            public const string Phones = "Phones.Phones";
            public const string Administration = "Administration";
            public const string Roles = "Administration.Roles";
            public const string Users = "Administration.Users";
            public const string AuditLogs = "Administration.AuditLogs";
            public const string OrganizationUnits = "Administration.OrganizationUnits";
            public const string Languages = "Administration.Languages";
            public const string DemoUiComponents = "Administration.DemoUiComponents";
            public const string UiCustomization = "Administration.UiCustomization";
            public const string WebhookSubscriptions = "Administration.WebhookSubscriptions";
            public const string DynamicProperties = "Administration.DynamicProperties";
            public const string DynamicEntityProperties = "Administration.DynamicEntityProperties";
        }

        public static class Host
        {
            public const string Tenants = "Tenants";
            public const string Editions = "Editions";
            public const string Maintenance = "Administration.Maintenance";
            public const string Settings = "Administration.Settings.Host";
            public const string Dashboard = "Dashboard";
        }

        public static class Tenant
        {
            public const string Dashboard = "Dashboard.Tenant";
            public const string Settings = "Administration.Settings.Tenant";
            public const string SubscriptionManagement = "Administration.SubscriptionManagement.Tenant";
        }
    }
}