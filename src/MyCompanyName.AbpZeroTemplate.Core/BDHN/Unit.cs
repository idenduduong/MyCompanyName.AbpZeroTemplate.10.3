using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Auditing;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using Abp.Organizations;

namespace MyCompanyName.AbpZeroTemplate.BDHN
{
	[Audited]
    [Table("BDHN_Units")]
    public class Unit : FullAuditedEntity<Guid>, IMayHaveTenant, IMayHaveOrganizationUnit
    {
        [Key]
        [MaxLength(6)]
        public virtual string UnitCode { get; set; }

        [Required]
        [MaxLength(200)]
        public virtual string UnitName { get; set; }

        [MaxLength(6)]
        public virtual string? ParentUnitCode { get; set; }

        [MaxLength(6)]
        public virtual string? CommuneCode { get; set; }

        [ForeignKey("CommuneCode")]
        public Commune CommuneCodeFk { get; set; }

        [MaxLength(3)]
        public virtual string? UnitTypeCode { get; set; }
        
        public virtual int? TenantId { get; set; }

        public virtual long? OrganizationUnitId { get; set; }

        [ForeignKey("OrganizationUnitId")]
        public OrganizationUnit OrganizationUnitFk { get; set; }
    }
}
