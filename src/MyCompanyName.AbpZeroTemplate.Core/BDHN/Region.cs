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
    [Table("BDHN_Regions")]
    public class Region : FullAuditedEntity<Guid>, IMayHaveTenant, IMayHaveOrganizationUnit
    {
        [Key]
        [MaxLength(2)]
        public virtual string RegionCode { get; set; }

        [Required]
        [MaxLength(50)]
        public virtual string RegionName { get; set; }

        [MaxLength(500)]
        public virtual string? Description { get; set; }

        public virtual int? TenantId { get; set; }

        public virtual long? OrganizationUnitId { get; set; }

        [ForeignKey("OrganizationUnitId")]
        public OrganizationUnit OrganizationUnitFk { get; set; }
    }
}
