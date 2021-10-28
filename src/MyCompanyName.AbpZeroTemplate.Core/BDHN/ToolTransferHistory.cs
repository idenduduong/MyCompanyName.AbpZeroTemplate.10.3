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
    [Table("BDHN_ToolTransferHistorys")]
    public class ToolTransferHistory : FullAuditedEntity<Guid>, IMayHaveTenant, IMayHaveOrganizationUnit
    {
        [MaxLength(500)]
        public virtual string? From { get; set; }

        [MaxLength(500)]
        public virtual string? To { get; set; }

        public virtual DateTime? UsedFrom { get; set; }

        public virtual DateTime? UsedTo { get; set; }

        [MaxLength(500)]
        public virtual string? Configuration { get; set; }

        [Required]
        public virtual ToolCondition? Condition { get; set; }

        [Required]
        public virtual ToolStatus? ToolStatus { get; set; }

        [MaxLength(500)]
        public virtual string? Note { get; set; }

        [MaxLength(6)]
        public virtual string? FromPOSCode { get; set; }

        [ForeignKey("FromPOSCode")]
        public BuuCuc FromBuuCucFk { get; set; }

        [MaxLength(6)]
        public virtual string? ToPOSCode { get; set; }

        [ForeignKey("ToPOSCode")]
        public BuuCuc ToBuuCucFk { get; set; }

        public virtual Guid? ToolId { get; set; }

        [ForeignKey("ToolId")]
        public Tool ToolFk { get; set; }

        public virtual int? TenantId { get; set; }

        public virtual long? OrganizationUnitId { get; set; }

        [ForeignKey("OrganizationUnitId")]
        public OrganizationUnit OrganizationUnitFk { get; set; }
    }
}
