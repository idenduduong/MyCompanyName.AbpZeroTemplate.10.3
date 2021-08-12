using System;
using System.Collections.Generic;
using Abp.Auditing;
using Abp.Authorization.Users;
using Abp.Extensions;
using Abp.Timing;

using MyCompanyName.AbpZeroTemplate.Authorization.OrganizationUnit;

namespace MyCompanyName.AbpZeroTemplate.Authorization.OrganizationUnit
{
    /// <summary>
    /// Represents a user in the system.
    /// </summary>
    public class OrganizationUnit : AbpUser<OrganizationUnit>
    {
        //  crmdemo
        public string AccountNumber { get; set; }

        
    }
}