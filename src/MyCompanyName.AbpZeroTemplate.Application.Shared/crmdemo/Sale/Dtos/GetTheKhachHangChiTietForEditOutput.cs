// crmdemo.Sale.Dtos.GetTheKhachHangChiTietForEditOutput
using MyCompanyName.AbpZeroTemplate.crmdemo.Sale.Dtos;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Sale.Dtos
{
	public class GetTheKhachHangChiTietForEditOutput
	{
		public CreateOrEditTheKhachHangChiTietDto TheKhachHangChiTiet { get; set; }

		public string TheKhachHangMaThe { get; set; }

		public int TongSuDung { get; set; }

		public int TongSoLuongDaSuDung { get; set; }

		public int SoLuongHangTangDaSuDung { get; set; }

		public int SoLuongHangTangDaSuDungThuc
		{
			get
			{
				if (TheKhachHangChiTiet != null)
				{
					int soLuongTang = 0;
					soLuongTang = (TheKhachHangChiTiet.LaTangKem ? TheKhachHangChiTiet.SoLuong : TheKhachHangChiTiet.SoLuongTang);
					if (SoLuongHangTangDaSuDung > 0 && SoLuongHangTangDaSuDung >= soLuongTang)
					{
						return soLuongTang;
					}
					return SoLuongHangTangDaSuDung;
				}
				return 0;
			}
		}

		public int SoLuongHangChinhDaSuDung
		{
			get
			{
				try
				{
					return TongSoLuongDaSuDung - SoLuongHangTangDaSuDungThuc;
				}
				catch
				{
					return 0;
				}
			}
		}

		public int SoLuongHangTangConLai
		{
			get
			{
				try
				{
					if (TheKhachHangChiTiet.LaTangKem)
					{
						return TheKhachHangChiTiet.SoLuong - SoLuongHangTangDaSuDungThuc;
					}
					return TheKhachHangChiTiet.SoLuongTang - SoLuongHangTangDaSuDungThuc;
				}
				catch
				{
					return 0;
				}
			}
		}

		public int SoLuongHangChinhConLai
		{
			get
			{
				try
				{
					return TheKhachHangChiTiet.SoLuong - SoLuongHangChinhDaSuDung;
				}
				catch
				{
					return 0;
				}
			}
		}

		public string DM_HangHoaTenHangHoa { get; set; }

		public int? SoPhutThucHien { get; set; }
	}

}
