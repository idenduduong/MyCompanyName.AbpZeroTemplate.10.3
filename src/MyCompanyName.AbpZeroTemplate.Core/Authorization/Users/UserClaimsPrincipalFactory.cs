using Abp.Authorization;
using Abp.Dependency;
using Abp.Extensions;
using Abp.Runtime.Security;
using Abp.Runtime.Session;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using MyCompanyName.AbpZeroTemplate.Authorization.Roles;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace MyCompanyName.AbpZeroTemplate.Authorization.Users
{
    public class UserClaimsPrincipalFactory : AbpUserClaimsPrincipalFactory<User, Role>, ITransientDependency
    {
        public IPrincipalAccessor PrincipalAccessor { get; set; }

        public UserClaimsPrincipalFactory(
            UserManager userManager,
            RoleManager roleManager,
            IOptions<IdentityOptions> optionsAccessor)
            : base(
                  userManager,
                  roleManager,
                  optionsAccessor)
        {

        }

        //  datdd: add datafilter to OrganizationUnit
        //We need to store OrganizationUnitId of logged in user in claims, 
        //so we can get it in order to filter IMayHaveOrganizationUnit entities in our DbContext.
        //In order to do that, override the CreateAsync method of UserClaimsPrincipalFactory class and 
        //add logged in users OrganizationUnitId to claims like below.l
        public override async Task<ClaimsPrincipal> CreateAsync(User user)
        {
            try
            {
                var filter = UserManager.Users.Where(e => user.Id == e.Id).Include(u => u.OrganizationUnits).Where(o => o.IsDeleted == false);
                var filterToObj = filter.ToList();
                var strSql = filter.ToQueryString();
                if (filter.Any()) user.OrganizationUnits = filterToObj[0].OrganizationUnits;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }

            var claim = await base.CreateAsync(user);

            try
            {
                if (user.OrganizationUnits != null)
                {
                    if (user.OrganizationUnits.Count > 0)
                    {
                        claim.Identities.First().AddClaim(new Claim("Application_OrganizationUnitId", string.IsNullOrEmpty(string.Join(",", user.OrganizationUnits.Select(e => e.OrganizationUnitId).ToArray())) ? user.OrganizationUnitId.Value.ToString() : ',' + string.Join(",", user.OrganizationUnits.Select(e => e.OrganizationUnitId).ToArray()) + ','));
                    }
                }
                else
                {
                    claim.Identities.First().AddClaim(new Claim("Application_OrganizationUnitId", ""));
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }

            var currentClaims = PrincipalAccessor.Principal?.Claims.FirstOrDefault(c => c.Type == "Application_OrganizationUnitId");

            return claim;
        }
    }
}
