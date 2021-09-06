using Abp.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using MyCompanyName.AbpZeroTemplate.Authorization.Roles;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace MyCompanyName.AbpZeroTemplate.Authorization.Users
{
    public class UserClaimsPrincipalFactory : AbpUserClaimsPrincipalFactory<User, Role>
    {
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
            var claim = await base.CreateAsync(user);

            //claim.Identities.First().AddClaim(new Claim("Application_OrganizationUnitId", user.OrganizationUnitId.HasValue ? user.OrganizationUnitId.Value.ToString() : string.Empty));
            //claim.Identities.First().AddClaim(new Claim("Application_OrganizationUnit", ",1,5,6"));

            //foreach (var org in user.OrganizationUnits)
            //{
            //    claim.Identities.First().AddClaim(new Claim("Application_OrganizationUnitId", string.IsNullOrEmpty(org.OrganizationUnitId.ToString()) ? user.OrganizationUnitId.Value.ToString() : string.Empty));
            //}
            try
            {
                if (user.OrganizationUnits != null)
                {
                    if (user.OrganizationUnits.Count > 0)
                    {
                        claim.Identities.First().AddClaim(new Claim("Application_OrganizationUnitId", string.IsNullOrEmpty(string.Join(",", user.OrganizationUnits.Select(e => e.OrganizationUnitId).ToArray())) ? user.OrganizationUnitId.Value.ToString() : ',' + string.Join(",", user.OrganizationUnits.Select(e => e.OrganizationUnitId).ToArray()) + ','));
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
            
            return claim;
        }
    }
}
