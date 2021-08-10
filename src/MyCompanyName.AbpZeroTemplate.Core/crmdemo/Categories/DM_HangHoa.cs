// crmdemo.Categories.DM_HangHoa
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Categories
{
	[Table("DM_HangHoas")]
	public class DM_HangHoa : FullAuditedEntity<Guid>, IMayHaveTenant
	{
		public int? TenantId { get; set; }

		public virtual string Anh { get; set; }

		[Required]
		public virtual string MaHangHoa { get; set; }

		[Required]
		public virtual string TenHangHoa { get; set; }

		[Required]
		public virtual bool LaHangHoa { get; set; }

		public virtual Guid? ID_PhanLoai { get; set; }

		[Required]
		public virtual double? GiaBanLe { get; set; }

		public virtual double? TiSuatBanLe { get; set; }

		[Required]
		public virtual double? GiaNhap { get; set; }

		public virtual double? GiaBan1 { get; set; }

		public virtual int? TiSuatTheoGiaBan1 { get; set; }

		public virtual double? GiaBan2 { get; set; }

		public virtual int? TiSuatTheoGiaBan2 { get; set; }

		public virtual double? GiaBan3 { get; set; }

		public virtual int? TiSuatTheoGiaBan3 { get; set; }

		public virtual string IDs_NhomKH2 { get; set; }

		public virtual string IDs_NhomKH3 { get; set; }

		public virtual string MaVach { get; set; }

		public virtual double? QuyCach { get; set; }

		public virtual Guid? ID_DVTQuyCach { get; set; }

		public virtual int? LoaiBaoHanh { get; set; }

		public virtual int? ThoiGianBaoHanh { get; set; }

		public virtual string TenTGBaoHanh { get; set; }

		[Required]
		public virtual double ChiPhiThucHien { get; set; }

		[Required]
		public virtual bool? ChiPhiTinhTheoPT { get; set; }

		public virtual bool? TinhCPSauChietKhau { get; set; }

		public virtual string GhiChu { get; set; }

		public virtual int? SoPhutThucHien { get; set; }

		public virtual double? ChietKhauMD_NV { get; set; }

		public virtual bool? ChietKhauMD_NVTheoPT { get; set; }

		public virtual Guid? ID_DonViTinhPhu1 { get; set; }

		public virtual double? TyLeChuyenDoi1 { get; set; }

		public virtual Guid? ID_DonViTinhPhu2 { get; set; }

		public virtual double? TyLeChuyenDoi2 { get; set; }

		public virtual Guid? ID_DonViTinhPhu3 { get; set; }

		public virtual double? TyLeChuyenDoi3 { get; set; }

		public virtual int? TinhGiaVon { get; set; }

		[Required]
		public virtual bool? TheoDoi { get; set; }

		public virtual string UserTao { get; set; }

		public virtual DateTime? NgayTao { get; set; }

		public virtual string UserSuaCuoi { get; set; }

		public virtual DateTime? NgaySuaCuoi { get; set; }

		public virtual string TenKhac { get; set; }

		public virtual string ChatLieu { get; set; }

		public virtual string KichCo { get; set; }

		public virtual string MauSac { get; set; }

		public virtual double? TiSuat1 { get; set; }

		public virtual double? TiSuat2 { get; set; }

		public virtual double? TiSuat3 { get; set; }

		public virtual string IDs_NhomKH1 { get; set; }

		public virtual Guid? DM_NhomHangHoaId { get; set; }

		public virtual Guid? DM_QuocGiaId { get; set; }

		public virtual Guid? DM_DoiTuongId { get; set; }

		public virtual Guid? DM_ThueSuatId { get; set; }

		public virtual Guid? DM_DonViTinhId { get; set; }

		public virtual string ServiceGroup { get; set; }

		public virtual bool IsActive { get; set; }

		public virtual bool IsTrial { get; set; }
	}

}
