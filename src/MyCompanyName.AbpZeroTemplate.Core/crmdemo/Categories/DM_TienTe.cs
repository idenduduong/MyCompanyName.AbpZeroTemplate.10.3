// crmdemo.Categories.DM_TienTe
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Categories
{
	[Table("DM_TienTes")]
	public class DM_TienTe : FullAuditedEntity<Guid>, IMayHaveTenant
	{
		public int? TenantId { get; set; }

		public virtual string MaNgoaiTe { get; set; }

		[Required]
		public virtual string TenNgoaiTe { get; set; }

		public virtual string GhiChu { get; set; }

		[Required]
		public virtual bool LaNoiTe { get; set; }

		public virtual string UserTao { get; set; }

		public virtual DateTime? NgayTao { get; set; }

		public virtual string UserSuaCuoi { get; set; }

		public virtual DateTime? NgaySuaCuoi { get; set; }

		public virtual Guid? ID_QuocGia { get; set; }
	}
}
