// crmdemo.Categories.DM_NhomDoiTuong
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Categories
{
	[Table("DM_NhomDoiTuongs")]
	public class DM_NhomDoiTuong : FullAuditedEntity<Guid>, IMayHaveTenant
	{
		public int? TenantId { get; set; }

		[Required]
		public virtual int LoaiDoiTuong { get; set; }

		public virtual string MaNhom { get; set; }

		[Required]
		public virtual string TenNhom { get; set; }

		public virtual double MucDiem { get; set; }

		public virtual string GhiChu { get; set; }

		public virtual string UserTao { get; set; }

		public virtual DateTime? NgayTao { get; set; }

		public virtual string UserSuaCuoi { get; set; }

		public virtual DateTime? NgaySuaCuoi { get; set; }
	}
}
