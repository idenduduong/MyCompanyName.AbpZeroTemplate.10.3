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
    [Table("BDHN_Tools")]
    public class Tool : FullAuditedEntity<Guid>, IMayHaveTenant, IMayHaveOrganizationUnit
    {
		[MaxLength(100)]
		public virtual string ToolName { get; set; }

		public virtual ToolType Type { get; set; }
		
		[MaxLength(100)]
		public virtual string? Serial { get; set; }

		public virtual DateTime? UsedFrom { get; set; }

		public virtual DateTime? UsedTo { get; set; }

		[MaxLength(500)]
		public virtual string? Configuration { get; set; }

		public virtual ToolCondition? Condition { get; set; }

		public virtual ToolStatus? ToolStatus { get; set; }

		[MaxLength(500)]
		public virtual string? Note { get; set; }

		[MaxLength(6)]
		public virtual string? POSCode { get; set; }

        [ForeignKey("POSCode")]
        public BuuCuc BuuCucFk { get; set; }

        public virtual int? TenantId { get; set; }

		public virtual long? OrganizationUnitId { get; set; }

		[ForeignKey("OrganizationUnitId")]
		public OrganizationUnit OrganizationUnitFk { get; set; }
	}
}