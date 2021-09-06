using Abp.Authorization.Users;
using Abp.Runtime.Session;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyCompanyName.AbpZeroTemplate.Extensions
{
    public interface IAbpSessionExtension : IAbpSession
    {
        string ApplicationOrganizationUnits { get; }
    }
}
