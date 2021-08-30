using MyCompanyName.AbpZeroTemplate.crmdemo.Sale.Dtos;
using System;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Sale.Dtos
{
	public class GetTheKhachHangForView
	{
		public DateTime? NgayMua { get; set; }

		public DateTime? LastModificationTime { get; set; }

		public TheKhachHangDto TheKhachHang { get; set; }

		public string DM_NhomTheTenNhomThe { get; set; }

		public string DM_DoiTuongTenDoiTuong { get; set; }

		public string DM_DoiTuongCMT { get; set; }

		public string DM_DoiTuongPhone { get; set; }

		public string DM_DoiTuongMaDoiTuong { get; set; }

		public string DM_DoiTuongDiaChi { get; set; }

		public string DM_TienTeTenNgoaiTe { get; set; }

		public string UserName { get; set; }

		public string Seller { get; set; }

		public string OrganizationUnitDisplayName { get; set; }

		public string DM_DacDiemKhachHangTenDacDiem { get; set; }

		public string DM_LienHeMaLienHe { get; set; }

		public decimal DaThanhToan { get; set; }

		public bool HetCongNo
		{
			get
			{
				try
				{
					return DaThanhToan >= TheKhachHang.PhaiThanhToan;
				}
				catch
				{
					return false;
				}
			}
		}

		public bool LaDonViThucHien { get; set; }
	}
}
