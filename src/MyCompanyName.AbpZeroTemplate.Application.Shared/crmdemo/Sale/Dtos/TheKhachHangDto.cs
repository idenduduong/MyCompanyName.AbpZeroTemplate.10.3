using System;
using Abp.Application.Services.Dto;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Sale.Dtos
{
	public class TheKhachHangDto : FullAuditedEntityDto<Guid>
	{
		public string MaVoucher { get; set; }

		public string MaThe { get; set; }

		public DateTime NgayMua { get; set; }

		public DateTime NgayApDung { get; set; }

		public DateTime? NgayHetHan { get; set; }

		public decimal MenhGiaThe { get; set; }

		public decimal PTChietKhau { get; set; }

		public decimal TienChietKhau { get; set; }

		public decimal PhaiThanhToan { get; set; }

		public decimal TyGia { get; set; }

		public bool ApDungTatCaSanPham { get; set; }

		public bool DuocChoMuon { get; set; }

		public int TheGiaTri_SoLan_GiamGia { get; set; }

		public DateTime? NgayVaoSo { get; set; }

		public string GhiChu { get; set; }

		public decimal PTTangThem { get; set; }

		public decimal TienTangThem { get; set; }

		public bool HuyThe { get; set; }

		public bool Status { get; set; }

		public decimal SoDu { get; set; }

		public decimal DaThanhToan { get; set; }

		public DateTime? NgayHuy { get; set; }

		public int? SoLanDuocSuDung { get; set; }

		public string MaNhanVienTuVan { get; set; }

		public string TenNhanVienTuVan { get; set; }

		public Guid? ID_NhomThe { get; set; }

		public Guid? ID_KhachHang { get; set; }

		public Guid? ID_TienTe { get; set; }

		public long? ID_NhanVienLap { get; set; }

		public long? ID_DonVi { get; set; }

		public Guid? ID_DacDiemKhachHang { get; set; }

		public Guid? ID_LienHe { get; set; }

		public Guid? ID_KhuyenMai { get; set; }

		public bool DaChuyenThe { get; set; }

		public long? ID_DonViThucHien { get; set; }

		public decimal TienNhanTuTheCu { get; set; }

		public decimal VirtualBalance { get; set; }
	}
}
