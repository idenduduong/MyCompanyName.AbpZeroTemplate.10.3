using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace MyCompanyName.AbpZeroTemplate.BDHN.Dtos
{
    public class DistrictDto : FullAuditedEntityDto<Guid>
    {
        public string DistrictCode { get; set; }

        public string DistrictName { get; set; }

        public string? Description { get; set; }

        public string ProvinceCode { get; set; }

        public long? OrganizationUnitId { get; set; }
    }
}
