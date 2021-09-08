using System;
using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.IdentityFramework;
using Abp.MultiTenancy;
using Abp.Runtime.Session;
using Abp.Threading;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using MyCompanyName.AbpZeroTemplate.Authorization.Users;
using MyCompanyName.AbpZeroTemplate.Extensions;
using MyCompanyName.AbpZeroTemplate.MultiTenancy;

namespace MyCompanyName.AbpZeroTemplate
{
    /// <summary>
    /// Derive your application services from this class.
    /// </summary>
    public abstract class AbpZeroTemplateAppServiceBase : ApplicationService
    {
        public new IAbpSessionExtension AbpSession { get; set; }

        public TenantManager TenantManager { get; set; }

        public UserManager UserManager { get; set; }

        protected AbpZeroTemplateAppServiceBase()
        {
            LocalizationSourceName = AbpZeroTemplateConsts.LocalizationSourceName;
        }

        protected virtual async Task<User> GetCurrentUserAsync()
        {
            var user = await UserManager.FindByIdAsync(AbpSession.GetUserId().ToString());

            var filter = UserManager.Users.Where(e => user.Id == e.Id).Include(u => u.OrganizationUnits);

            var filterToObj = filter.ToList();

            //var strSql = filter.ToQueryString();

            //var orgs = (from f in filter select new UserOrganizationUnit {
            //    OrganizationUnitId = f.OrganizationUnitId == null ? 0 : 1
            //}).ToList();

            if (filter.Any()) user.OrganizationUnits = filterToObj[0].OrganizationUnits;

            //foreach (var org in orgs)
            //{ 
            //    user. = string.Join(",", orgs.Select(e => e.OrganizationUnitId).ToArray());
            //}

            if (user == null)
            {
                throw new Exception("There is no current user!");
            }

            return user;
        }

        protected virtual User GetCurrentUser()
        {
            return AsyncHelper.RunSync(GetCurrentUserAsync);
        }

        protected virtual Task<Tenant> GetCurrentTenantAsync()
        {
            using (CurrentUnitOfWork.SetTenantId(null))
            {
                return TenantManager.GetByIdAsync(AbpSession.GetTenantId());
            }
        }

        protected virtual Tenant GetCurrentTenant()
        {
            using (CurrentUnitOfWork.SetTenantId(null))
            {
                return TenantManager.GetById(AbpSession.GetTenantId());
            }
        }

        protected virtual void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}