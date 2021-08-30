// crmdemo.Categories.DM_NhomHangHoa
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Categories
{
	[Table("DM_NhomHangHoas")]
	public class DM_NhomHangHoa : FullAuditedEntity<Guid>, IMayHaveTenant
	{
		public int? TenantId { get; set; }

		[Required]
		public virtual string MaNhom { get; set; }

		[Required]
		public virtual string TenNhom { get; set; }

		public virtual string GhiChu { get; set; }

		public virtual Guid? ID_Parent { get; set; }

		[Required]
		public virtual bool LaNhomHangHoa { get; set; }

		public virtual string UserTao { get; set; }

		public virtual DateTime? NgayTao { get; set; }

		public virtual string UserSuaCuoi { get; set; }

		public virtual DateTime? NgaySuaCuoi { get; set; }

		public virtual bool HienThi_Chinh { get; set; }

		public virtual bool HienThi_Phu { get; set; }

		public virtual string MayIn { get; set; }

		public virtual bool HienThi_BanThe { get; set; }

		public virtual int? MauHienThi { get; set; }

		public virtual string ID_DonVis { get; set; }

		public virtual string TenDonVis { get; set; }

		public virtual Guid? ID_Kho { get; set; }
	}

}
