using Abp.Application.Services.Dto;
using System;

namespace MyCompanyName.AbpZeroTemplate.BDHN.Dtos
{
    public class UnitDto : FullAuditedEntityDto<Guid>
    {
        public virtual string UnitCode { get; set; }

        public virtual string UnitName { get; set; }

        public virtual string ParentUnitCode { get; set; }

        public virtual string CommuneCode { get; set; }

        public virtual string UnitTypeCode { get; set; }

        public virtual int? TenantId { get; set; }

        public virtual long? OrganizationUnitId { get; set; }
    }
}
