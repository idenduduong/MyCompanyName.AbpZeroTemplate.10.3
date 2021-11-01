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
    [Table("BDHN_ToolRepairHistorys")]
    public class ToolRepairHistory : FullAuditedEntity<Guid>, IMayHaveTenant, IMayHaveOrganizationUnit
    {
        public virtual DateTime? RepairFrom { get; set; }

        public virtual DateTime? RepairTo { get; set; }

        [MaxLength(500)]
        public virtual string? Configuration { get; set; }

        [Required]
        public virtual ToolCondition? Condition { get; set; }

        [Required]
        public virtual ToolStatus? ToolStatus { get; set; }

        [MaxLength(500)]
        public virtual string? Note { get; set; }

        [MaxLength(6)]
        public virtual string? POSCode { get; set; }

        [ForeignKey("POSCode")]
        public BuuCuc BuuCucFk { get; set; }

        public virtual Guid? ToolId { get; set; }

        [ForeignKey("ToolId")]
        public Tool ToolFk { get; set; }

        public virtual int? TenantId { get; set; }

        public virtual long? OrganizationUnitId { get; set; }

        [ForeignKey("OrganizationUnitId")]
        public OrganizationUnit OrganizationUnitFk { get; set; }
    }
}