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
	[Table("BDHN_BuuCucs")]
	public class BuuCuc : FullAuditedEntity<Guid>, IMayHaveTenant, IMayHaveOrganizationUnit
	{
		[Required]
		[MaxLength(6)]
		public virtual string POSCode { get; set; }

		[Required]
		[MaxLength(100)]
		public virtual string POSName { get; set; }

		[MaxLength(200)]
		public virtual string? Address { get; set; }

		[MaxLength(50)]
		public virtual string? AddressCode { get; set; }

		[MaxLength(50)]
		public virtual string? Tel { get; set; }

		[MaxLength(50)]
		public virtual string? Fax { get; set; }

		[MaxLength(50)]
		public virtual string? IP { get; set; }

		[MaxLength(50)]
		public virtual string? DatabaseServer { get; set; }

		[MaxLength(255)]
		public virtual string? DatabaseUsername { get; set; }

		[MaxLength(255)]
		public virtual string? DatabasePassword { get; set; }

		[MaxLength(2)]
		public virtual string? POSTypeCode { get; set; }

		[MaxLength(3)]
		public virtual string? ProvinceCode { get; set; }

		[MaxLength(50)]
		public virtual string? ServiceServer { get; set; }

		public virtual int? ServicePort { get; set; }

		[MaxLength(3)]
		public virtual string? POSLevelCode { get; set; }

		[MaxLength(6)]
		public virtual string? CommuneCode { get; set; }

		public virtual bool? IsOffline { get; set; }

		[MaxLength(6)]
		public virtual string? UnitCode { get; set; }

		public virtual int? TenantId { get; set; }

		public virtual long? OrganizationUnitId { get; set; }

		[ForeignKey("OrganizationUnitId")]
		public OrganizationUnit OrganizationUnitFk { get; set; }
	}
}
