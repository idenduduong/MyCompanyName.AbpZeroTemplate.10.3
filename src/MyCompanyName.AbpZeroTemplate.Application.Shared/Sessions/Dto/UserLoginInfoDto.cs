using Abp.Application.Services.Dto;
using Abp.Authorization.Users;
using System.Collections.Generic;

namespace MyCompanyName.AbpZeroTemplate.Sessions.Dto
{
    public class UserLoginInfoDto : EntityDto<long>
    {
        public string Name { get; set; }

        public string Surname { get; set; }

        public string UserName { get; set; }

        public string EmailAddress { get; set; }

        public string ProfilePictureId { get; set; }

        public List<UserOrganizationUnit> OrganizationUnits { get; set; }
    }
}
