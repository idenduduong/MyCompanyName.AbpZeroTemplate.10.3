// crmdemo.Sale.Dtos.GetAllTheKhachHangChiTietsForExcelInput
using System;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Sale.Dtos
{
	public class GetAllTheKhachHangChiTietsForExcelInput
	{
		public string Filter { get; set; }

		public double? MaxSoLuongFilter { get; set; }

		public double? MinSoLuongFilter { get; set; }

		public double? MaxDonGiaFilter { get; set; }

		public double? MinDonGiaFilter { get; set; }

		public double? MaxPTChietKhauFilter { get; set; }

		public double? MinPTChietKhauFilter { get; set; }

		public double? MaxTienChietKhauFilter { get; set; }

		public double? MinTienChietKhauFilter { get; set; }

		public double? MaxThanhToanFilter { get; set; }

		public double? MinThanhToanFilter { get; set; }

		public string GhiChuFilter { get; set; }

		public double? MaxSoLuongTangFilter { get; set; }

		public double? MinSoLuongTangFilter { get; set; }

		public DateTime? MaxNgayTraLaiFilter { get; set; }

		public DateTime? MinNgayTraLaiFilter { get; set; }

		public double? MaxSoLuongTraLaiFilter { get; set; }

		public double? MinSoLuongTraLaiFilter { get; set; }

		public double? MaxTienDaSuDungFilter { get; set; }

		public double? MinTienDaSuDungFilter { get; set; }

		public int TraLaiHHDVFilter { get; set; }

		public Guid ID_SanPhamChinhFilter { get; set; }

		public int LaTangKemFilter { get; set; }

		public double? MaxSoLuongDaSuDungFilter { get; set; }

		public double? MinSoLuongDaSuDungFilter { get; set; }

		public string TheKhachHangMaTheFilter { get; set; }

		public string DM_HangHoaTenHangHoaFilter { get; set; }
	}
}
