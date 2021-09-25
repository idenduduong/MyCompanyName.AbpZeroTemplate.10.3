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
    [Table("BDHN_Communes")]
    public class Commune : FullAuditedEntity<Guid>, IMayHaveTenant, IMayHaveOrganizationUnit
    {
		[Key]
		[MaxLength(6)]
		public virtual string CommuneCode { get; set; }

		[Required]
		[MaxLength(50)]
		public virtual string CommuneName { get; set; }

		[Required]
		[MaxLength(4)]
		public virtual string DistrictCode { get; set; }

		[ForeignKey("DistrictCode")]
		public District DistrictFk { get; set; }

		public virtual int? TenantId { get; set; }

		public virtual long? OrganizationUnitId { get; set; }

		[ForeignKey("OrganizationUnitId")]
		public OrganizationUnit OrganizationUnitFk { get; set; }
	}
}
