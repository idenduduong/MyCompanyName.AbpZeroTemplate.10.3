// crmdemo.Sale.Dtos.GetTheKhachHangForEditOutput
using System;
using MyCompanyName.AbpZeroTemplate.crmdemo.Sale.Dtos;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Sale.Dtos
{
	public class GetTheKhachHangForEditOutput
	{
		public CreateOrEditTheKhachHangDto TheKhachHang { get; set; }

		public Guid? TempId { get; set; }

		public string DM_NhomTheTenNhomThe { get; set; }

		public bool? IsPercentage { get; set; }

		public decimal VoucherValue { get; set; }

		public string MaVoucher { get; set; }

		public string DM_DoiTuongTenDoiTuong { get; set; }

		public string DM_DoiTuongPhone { get; set; }

		public string DM_DoiTuongDiaChi { get; set; }

		public string DM_DoiTuongCMT { get; set; }

		public string DM_DoiTuongNhomDoiTuong { get; set; }

		public DateTime? DM_DoiTuongNgaySinh { get; set; }

		public string DM_KhuyenMaiTenKhuyenMai { get; set; }

		public string DM_TienTeTenNgoaiTe { get; set; }

		public string UserName { get; set; }

		public string OrganizationUnitDisplayName { get; set; }

		public string DonViThuHuongTenDonVi { get; set; }

		public string DonViThucHienTenDonVi { get; set; }

		public string DM_DacDiemKhachHangTenDacDiem { get; set; }

		public string DM_LienHeMaLienHe { get; set; }

		public decimal DaThanhToan { get; set; }

		public decimal SoDuConLai { get; set; }

		public string TheCuMaThe { get; set; }

		public bool XongCongNo
		{
			get
			{
				try
				{
					return DaThanhToan == TheKhachHang.PhaiThanhToan;
				}
				catch
				{
					return false;
				}
			}
		}
	}

}
