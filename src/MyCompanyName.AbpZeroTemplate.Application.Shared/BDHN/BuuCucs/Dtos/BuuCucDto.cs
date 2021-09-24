using Abp.Application.Services.Dto;
using System;

namespace MyCompanyName.AbpZeroTemplate.BDHN.Dtos
{
    public class BuuCucDto : FullAuditedEntityDto<Guid>
    {
        public string POSCode { get; set; }

        public string POSName { get; set; }

        public string? Address { get; set; }

        public string? POSTypeCode { get; set; }

        public string? Tel { get; set; }

        public string? ProvinceCode { get; set; }

        public string? CommuneCode { get; set; }

        public bool? IsOffline { get; set; }

        public string? UnitCode { get; set; }

        public long? OrganizationUnitId { get; set; }

        //public bool? IsDeleted { get; set; }
    }
}