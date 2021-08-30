// crmdemo.Sale.Dtos.GetTheKhachHangChiTietForView
using MyCompanyName.AbpZeroTemplate.crmdemo.Sale.Dtos;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Sale.Dtos
{
	public class GetTheKhachHangChiTietForView
	{
		public TheKhachHangChiTietDto TheKhachHangChiTiet { get; set; }

		public string TheKhachHangMaThe { get; set; }

		public string DM_HangHoaTenHangHoa { get; set; }

		public double? TongSoLuongDaSuDung { get; set; }

		public double? SoLuongHangTangDaSuDung { get; set; }

		public double? SoLuongHangTangDaSuDungThuc
		{
			get
			{
				if (TheKhachHangChiTiet != null && !TheKhachHangChiTiet.LaTangKem)
				{
					if (SoLuongHangTangDaSuDung.HasValue && SoLuongHangTangDaSuDung >= TheKhachHangChiTiet.SoLuongTang)
					{
						return TheKhachHangChiTiet.SoLuongTang;
					}
					return SoLuongHangTangDaSuDung;
				}
				return 0.0;
			}
		}

		public double? SoLuongHangChinhDaSuDung
		{
			get
			{
				try
				{
					return TongSoLuongDaSuDung - SoLuongHangTangDaSuDungThuc;
				}
				catch
				{
					return 0.0;
				}
			}
		}
	}
}
