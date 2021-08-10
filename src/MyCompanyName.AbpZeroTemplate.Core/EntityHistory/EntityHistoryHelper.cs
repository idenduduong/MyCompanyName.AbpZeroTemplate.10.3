using MyCompanyName.AbpZeroTemplate.ChildNamespace1;
using MyCompanyName.AbpZeroTemplate.BaseNamespace;
using MyCompanyName.AbpZeroTemplate.Products;
using MyCompanyName.AbpZeroTemplate.DM_DoiTuongs;
//using MyCompanyName.AbpZeroTemplate.MyCompanyName.AbpZeroTemplate.DM_NhomDoiTuongs;
using MyCompanyName.AbpZeroTemplate.Phones;
using System;
using System.Linq;
using Abp.Organizations;
using MyCompanyName.AbpZeroTemplate.Authorization.Roles;
using MyCompanyName.AbpZeroTemplate.MultiTenancy;

namespace MyCompanyName.AbpZeroTemplate.EntityHistory
{
    public static class EntityHistoryHelper
    {
        public const string EntityHistoryConfigurationName = "EntityHistory";

        public static readonly Type[] HostSideTrackedTypes =
        {
            typeof(Child),
            typeof(BaseEntity),
            typeof(Product),
            //typeof(DM_DoiTuong),
            //typeof(DM_NhomDoiTuongs),
            typeof(Phone),
            typeof(OrganizationUnit), typeof(Role), typeof(Tenant)
        };

        public static readonly Type[] TenantSideTrackedTypes =
        {
            typeof(Child),
            typeof(BaseEntity),
            typeof(Product),
            //typeof(DM_DoiTuong),
            //typeof(DM_NhomDoiTuongs),
            typeof(Phone),
            typeof(OrganizationUnit), typeof(Role)
        };

        public static readonly Type[] TrackedTypes =
            HostSideTrackedTypes
                .Concat(TenantSideTrackedTypes)
                .GroupBy(type => type.FullName)
                .Select(types => types.First())
                .ToArray();
    }
}