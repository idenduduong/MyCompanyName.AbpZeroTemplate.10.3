// crmdemo.Categories.DM_LienHe
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Categories
{
	[Table("DM_LienHes")]
	public class DM_LienHe : FullAuditedEntity<Guid>, IMayHaveTenant
	{
		public int? TenantId { get; set; }

		public virtual string MaLienHe { get; set; }

		[Required]
		public virtual string TenLienHe { get; set; }

		public virtual string ChucVu { get; set; }

		public virtual string SoDienThoai { get; set; }

		public virtual string Email { get; set; }

		public virtual string GhiChu { get; set; }

		public virtual string UserTao { get; set; }

		public virtual DateTime? NgayTao { get; set; }

		public virtual string UserSuaCuoi { get; set; }

		public virtual DateTime? NgaySuaCuoi { get; set; }

		public virtual string DiaChi { get; set; }

		public virtual DateTime? NgaySinh { get; set; }

		public virtual string CanNang { get; set; }

		public virtual string ChieuCao { get; set; }

		public virtual Guid? ID_DoiTuong { get; set; }
	}

}
