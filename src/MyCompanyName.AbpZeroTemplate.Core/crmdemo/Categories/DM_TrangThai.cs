// crmdemo.Categories.DM_TrangThai
using System;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Categories
{
	[Table("DM_TrangThais")]
	public class DM_TrangThai : FullAuditedEntity, IMayHaveTenant
	{
		public int? TenantId { get; set; }

		public virtual string TenTrangThai { get; set; }

		public virtual string UserTao { get; set; }

		public virtual DateTime? NgayTao { get; set; }

		public virtual string UserSuaCuoi { get; set; }

		public virtual DateTime? NgaySuaCuoi { get; set; }
	}
}
