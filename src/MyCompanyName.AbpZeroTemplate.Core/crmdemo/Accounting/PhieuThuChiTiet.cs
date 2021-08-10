// crmdemo.Accounting.PhieuThuChiTiet
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Accounting
{
	[Table("PhieuThuChiTiets")]
	public class PhieuThuChiTiet : FullAuditedEntity<Guid>, IMayHaveTenant
	{
		public int? TenantId { get; set; }

		[Required]
		public virtual decimal ThuTuThe { get; set; }

		[Required]
		public virtual decimal TienMat { get; set; }

		[Required]
		public virtual decimal TienGui { get; set; }

		[Required]
		public virtual decimal TienThu { get; set; }

		public virtual string GhiChu { get; set; }

		public virtual Guid? ID_ChungTu { get; set; }

		public virtual decimal ChiPhiNganHang { get; set; }

		public virtual bool LaPTChiPhiNganHang { get; set; }

		public virtual string DiaChi_KhachHang { get; set; }

		public virtual bool ThuPhiTienGui { get; set; }

		public virtual Guid? ID_PhieuThu { get; set; }

		public virtual Guid? ID_KhachHang { get; set; }

		public virtual Guid? ID_NganHang { get; set; }

		public virtual long? UserId { get; set; }

		public virtual Guid? ID_KhoanThu { get; set; }

		public virtual Guid? ID_TheThoanhToan { get; set; }

		public virtual int? LoaiCT { get; set; }

		public virtual string MaChuanChi { get; set; }
	}

}
