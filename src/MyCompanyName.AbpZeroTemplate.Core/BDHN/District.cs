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
    [Table("BDHN_Districts")]
    public class District : FullAuditedEntity<Guid>, IMayHaveTenant, IMayHaveOrganizationUnit
    {
        [Key]
        [MaxLength(4)]
        public virtual string DistrictCode { get; set; }

        [Required]
        [MaxLength(100)]
        public virtual string DistrictName { get; set; }

        [MaxLength(500)]
        public virtual string? Description { get; set; }

        [Required]
        [MaxLength(3)]
        public virtual string ProvinceCode { get; set; }

        [ForeignKey("ProvinceCode")]
        public Province ProvinceFk { get; set; }

        public virtual int? TenantId { get; set; }

        public virtual long? OrganizationUnitId { get; set; }

        [ForeignKey("OrganizationUnitId")]
        public OrganizationUnit OrganizationUnitFk { get; set; }
    }
}
