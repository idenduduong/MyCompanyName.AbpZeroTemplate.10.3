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
    [Table("BDHN_Provinces")]
    public class Province : FullAuditedEntity<Guid>, IMayHaveTenant, IMayHaveOrganizationUnit
    {
        [Key]
        [MaxLength(3)]
        public virtual string ProvinceCode { get; set; }

        [Required]
        [MaxLength(100)]
        public virtual string ProvinceName { get; set; }

        [Required]
        [MaxLength(500)]
        public virtual string? Description { get; set; }

        [Required]
        [MaxLength(2)]
        public virtual string RegionCode { get; set; }

        [ForeignKey("RegionCode")]
        public Region RegionFk { get; set; }

        [MaxLength(100)]
        public virtual string? ProvinceListCode { get; set; }

        public virtual int? TenantId { get; set; }

        public virtual long? OrganizationUnitId { get; set; }

        [ForeignKey("OrganizationUnitId")]
        public OrganizationUnit OrganizationUnitFk { get; set; }
    }
}
