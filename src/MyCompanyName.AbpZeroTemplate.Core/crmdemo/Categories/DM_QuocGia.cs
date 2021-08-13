// crmdemo.Categories.DM_QuocGia
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Categories
{
	[Table("DM_QuocGias")]
	public class DM_QuocGia : FullAuditedEntity<Guid>, IMayHaveTenant
	{
		public int? TenantId { get; set; }

		public virtual string MaNuoc { get; set; }

		[Required]
		public virtual string TenNuoc { get; set; }

		public virtual string GhiChu { get; set; }

		public virtual string UserTao { get; set; }

		public virtual DateTime? NgayTao { get; set; }

		public virtual string UserSuaCuoi { get; set; }

		public virtual DateTime? NgaySuaCuoi { get; set; }
	}
}
