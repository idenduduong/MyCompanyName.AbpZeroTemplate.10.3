using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace MyCompanyName.AbpZeroTemplate.BDHN.Dtos
{
    public class RegionDto : FullAuditedEntityDto<Guid>
    {
        public string RegionCode { get; set; }

        public string RegionName { get; set; }

        public string? Description { get; set; }

        public long? OrganizationUnitId { get; set; }
    }
}