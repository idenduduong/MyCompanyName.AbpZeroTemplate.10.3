using Abp.Application.Services.Dto;

namespace MyCompanyName.AbpZeroTemplate.BDHN.Dtos
{
    public class DM_BuuCucDto : EntityDto
    {
        public string POSCode { get; set; }

        public string POSName { get; set; }

        public long? OrganizationUnitId { get; set; }

    }
}