using Abp.Authorization.Users;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyCompanyName.AbpZeroTemplate.Authorization.Users
{
    public class CustomUserOrganizationUnit : UserOrganizationUnit
    {
        [NotMapped]
        [ForeignKey("UserId")]
        public virtual User UserInOrg { get; set; }
    }
}