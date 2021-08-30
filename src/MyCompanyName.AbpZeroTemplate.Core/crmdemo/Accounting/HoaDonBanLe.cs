// crmdemo.Accounting.HoaDonBanLe
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;


namespace MyCompanyName.AbpZeroTemplate.crmdemo.Accounting
{
	[Table("HoaDonBanLes")]
	public class HoaDonBanLe : FullAuditedEntity<Guid>, IMayHaveTenant
	{
		public int? TenantId { get; set; }

		[Required]
		public virtual string MaHoaDon { get; set; }

		[Required]
		public virtual DateTime NgayLapHoaDon { get; set; }

		public virtual DateTime? GioVao { get; set; }

		public virtual DateTime? GioRa { get; set; }

		public virtual Guid? ID_CheckIn { get; set; }

		public virtual string CustomerAddress { get; set; }

		public virtual string CustomerPhone { get; set; }

		[Required]
		public virtual double TyGia { get; set; }

		[Required]
		public virtual int LoaiHoaDon { get; set; }

		[Required]
		public virtual bool ChoThanhToan { get; set; }

		[Required]
		public virtual double TongTienHang { get; set; }

		[Required]
		public virtual double TongChietKhau { get; set; }

		[Required]
		public virtual double TongTienThue { get; set; }

		[Required]
		public virtual double TongGiamGia { get; set; }

		[Required]
		public virtual double TongChiPhi { get; set; }

		[Required]
		public virtual double PhaiThanhToan { get; set; }

		public virtual string DienGiai { get; set; }

		public virtual int? SoLanIn { get; set; }

		public virtual string YeuCau { get; set; }

		public virtual Guid? ID_ViTri { get; set; }

		public virtual string Room { get; set; }

		public virtual Guid? ID_DoiTuong { get; set; }

		public virtual Guid? ID_NgoaiTe { get; set; }

		public virtual long? ID_DonVi { get; set; }

		public virtual string SellingOrganizationName { get; set; }

		public virtual string SellingOrganizationCode { get; set; }

		public virtual long? ID_NhanVien { get; set; }

		public virtual string EmployeeCode { get; set; }

		public virtual string EmployeeName { get; set; }

		public virtual Guid? ID_DacDiemKhachHang { get; set; }

		public virtual long? ID_DonViThucHien { get; set; }

		public virtual string PerformedOrganizationName { get; set; }

		public virtual string PerformedOrganizationCode { get; set; }

		public virtual int? LoaiChungTu { get; set; }

		public virtual string FileDinhKems { get; set; }

		public virtual int Status { get; set; }

		public virtual Guid? Ma { get; set; }

		public virtual int? CSKH { get; set; }

		public virtual int? Sale { get; set; }

		public virtual int? KeToan { get; set; }

		public virtual int? VeSinh { get; set; }

		public virtual string YKienKhachHang { get; set; }

		public virtual string KhongHaiLong { get; set; }

		public virtual DateTime? NgayDanhGia { get; set; }

		public virtual long? NguoiNhapKS { get; set; }

		public virtual string KSNote { get; set; }
	}
}
