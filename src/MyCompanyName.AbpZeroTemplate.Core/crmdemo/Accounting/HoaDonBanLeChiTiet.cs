// crmdemo.Accounting.HoaDonBanLeChiTiet
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using MyCompanyName.AbpZeroTemplate.crmdemo.Accounting;
using MyCompanyName.AbpZeroTemplate.crmdemo.Categories;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Accounting
{
	[Table("HoaDonBanLeChiTiets")]
	public class HoaDonBanLeChiTiet : FullAuditedEntity<Guid>, IMayHaveTenant
	{
		public int? TenantId { get; set; }

		public virtual bool IsTempData { get; set; }

		[Required]
		public virtual int SoThuTu { get; set; }

		public virtual DateTime? ThoiGian { get; set; }

		public virtual int ThoiGianBaoHanh { get; set; }

		public virtual int? LoaiThoiGianBH { get; set; }

		public virtual Guid? ID_MaVach { get; set; }

		public virtual string ChatLieu { get; set; }

		public virtual string MauSac { get; set; }

		public virtual string KichCo { get; set; }

		[Required]
		public virtual int SoLuong { get; set; }

		[Required]
		public virtual decimal DonGia { get; set; }

		[Required]
		public virtual decimal ThanhTien { get; set; }

		[Required]
		public virtual decimal PTChietKhau { get; set; }

		[Required]
		public virtual decimal TienChietKhau { get; set; }

		[Required]
		public virtual decimal TienThue { get; set; }

		[Required]
		public virtual decimal PTChiPhi { get; set; }

		[Required]
		public virtual decimal TienChiPhi { get; set; }

		[Required]
		public virtual decimal ThanhToan { get; set; }

		public virtual decimal? GiaVon { get; set; }

		public virtual string GhiChu { get; set; }

		public virtual string UserNhap { get; set; }

		public virtual int SoLanDaIn { get; set; }

		public virtual Guid? ID_TangKem { get; set; }

		public virtual bool TangKem { get; set; }

		public virtual int ThoiGianThucHien { get; set; }

		public virtual int SoLuong_TL { get; set; }

		public virtual int SoLuong_YC { get; set; }

		public virtual bool? Chieu { get; set; }

		public virtual bool? Sang { get; set; }

		public virtual decimal? PTThue { get; set; }

		public virtual string MaNhanVienThucHien { get; set; }

		public virtual string TenNhanVienThucHien { get; set; }

		public virtual string MaNhanVienTuVan { get; set; }

		public virtual string TenNhanVienTuVan { get; set; }

		public virtual string MaTheLan { get; set; }

		public virtual string MaTheGiaTri { get; set; }

		public virtual Guid? ID_HoaDon { get; set; }

		[ForeignKey("ID_HoaDon")]
		public HoaDonBanLe HoaDon { get; set; }

		public virtual Guid? ID_HangHoa { get; set; }

		[ForeignKey("ID_HangHoa")]
		public DM_HangHoa HangHoa { get; set; }

		public virtual Guid? ID_KhoHang { get; set; }

		public virtual Guid? ID_DonViTinh { get; set; }

		public virtual Guid? ID_LoHang { get; set; }

		public virtual Guid? ID_ThueSuat { get; set; }
	}

}
