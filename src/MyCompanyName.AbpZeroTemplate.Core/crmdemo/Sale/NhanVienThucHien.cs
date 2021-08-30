// crmdemo.Sale.NhanVienThucHien
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Sale
{
	[Table("NhanVienThucHiens")]
	public class NhanVienThucHien : FullAuditedEntity<Guid>, IMayHaveTenant
	{
		public int? TenantId { get; set; }

		[Required]
		public virtual Guid? MaChungTu { get; set; }

		public virtual Guid? ID_ChiTietChungTu { get; set; }

		[Required]
		public virtual decimal TienChietKhau { get; set; }

		[Required]
		public virtual bool LaPhanTram { get; set; }

		[Required]
		public virtual bool LaNhanVienChinh { get; set; }

		public virtual string DienGiai { get; set; }

		public virtual bool ChietKhauTheoThucThu { get; set; }

		public virtual decimal PTDoanhThuDuocHuong { get; set; }

		public virtual bool DuocYeuCau { get; set; }

		public virtual decimal ChiPhiThucHien { get; set; }

		public virtual bool LaPTChiPhiThucHien { get; set; }

		public virtual int? LoaiChungTu { get; set; }

		public virtual long? NhanVien { get; set; }

		public virtual DateTime? NgayThucHien { get; set; }

		public virtual int? DanhGia { get; set; }

		public virtual Guid? ID_CongViec { get; set; }

		public virtual string StageName { get; set; }

		public virtual long? ID_NhanVienChinh { get; set; }

		public virtual string EmployeeCode { get; set; }

		public virtual string EmployeeName { get; set; }

		public virtual long? OrganizationId { get; set; }
	}
}
