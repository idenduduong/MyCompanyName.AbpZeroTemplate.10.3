using Abp.Organizations;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;
using Abp.Domain.Entities;
using Abp.Auditing;

namespace MyCompanyName.AbpZeroTemplate.BaseNamespace
{
    [Table("BaseEntities")]
    [Audited]
    public class BaseEntity : FullAuditedEntity, IMayHaveTenant
    {
        public int? TenantId { get; set; }

        public virtual string BaseProp1 { get; set; }

        public virtual long? OrganizationUnitId { get; set; }

        [ForeignKey("OrganizationUnitId")]
        public OrganizationUnit OrganizationUnitFk { get; set; }

    }
}