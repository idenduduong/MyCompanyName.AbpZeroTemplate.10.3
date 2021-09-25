using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace MyCompanyName.AbpZeroTemplate.BDHN.Dtos
{
    public class CommuneDto : FullAuditedEntityDto<Guid>
    {
        public string CommuneCode { get; set; }

        public string CommuneName { get; set; }

        public string DistrictCode { get; set; }

        public long? OrganizationUnitId { get; set; }
    }
}
