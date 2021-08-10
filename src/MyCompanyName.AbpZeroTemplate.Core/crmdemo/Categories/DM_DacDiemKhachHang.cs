// crmdemo.Categories.DM_DacDiemKhachHang
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Categories
{
	[Table("DM_DacDiemKhachHangs")]
	public class DM_DacDiemKhachHang : FullAuditedEntity<Guid>, IMayHaveTenant
	{
		public int? TenantId { get; set; }

		[Required]
		public virtual string MaDacDiem { get; set; }

		[Required]
		public virtual string TenDacDiem { get; set; }
	}

}
