// crmdemo.Categories.DM_TinhThanh
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Categories
{
	[Table("DM_TinhThanhs")]
	public class DM_TinhThanh : FullAuditedEntity<Guid>, IMayHaveTenant
	{
		public int? TenantId { get; set; }

		public virtual string MaTinhThanh { get; set; }

		[Required]
		public virtual string TenTinhThanh { get; set; }

		public virtual string GhiChu { get; set; }

		public virtual string UserTao { get; set; }

		public virtual DateTime? NgayTao { get; set; }

		public virtual string UserSuaCuoi { get; set; }

		public virtual DateTime? NgaySuaCuoi { get; set; }

		public virtual Guid? ID_QuocGia { get; set; }

		public virtual Guid? ID_VungMien { get; set; }
	}
}
