// crmdemo.Sale.DM_KhuyenMai
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Categories
{
	[Table("DM_KhuyenMais")]
	public class DM_KhuyenMai : FullAuditedEntity<Guid>, IMayHaveTenant
	{
		public int? TenantId { get; set; }

		public virtual bool IsPercentage { get; set; }

		public virtual string DisplayName { get; set; }

		[Required]
		public virtual string Code { get; set; }

		public virtual string SoQuyetDinh { get; set; }

		public virtual DateTime? StartDate { get; set; }

		public virtual DateTime? EndDate { get; set; }
	}

}
