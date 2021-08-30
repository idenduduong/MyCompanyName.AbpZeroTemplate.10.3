// crmdemo.Sale.Exporting.TheKhachHangChiTietsExcelExporter
using System.Collections.Generic;
using Abp.Runtime.Session;
using Abp.Timing.Timezone;
using MyCompanyName.AbpZeroTemplate.crmdemo.DataExporting.Excel.EpPlus;
using MyCompanyName.AbpZeroTemplate.crmdemo.Dto;
using MyCompanyName.AbpZeroTemplate.crmdemo.Sale.Dtos;
using MyCompanyName.AbpZeroTemplate.crmdemo.Sale.Exporting;
using OfficeOpenXml;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Sale.Exporting
{
	public class TheKhachHangChiTietsExcelExporter : EpPlusExcelExporterBase, ITheKhachHangChiTietsExcelExporter
	{
		private readonly ITimeZoneConverter _timeZoneConverter;

		private readonly IAbpSession _abpSession;

		public TheKhachHangChiTietsExcelExporter(ITimeZoneConverter timeZoneConverter, IAbpSession abpSession)
		{
			_timeZoneConverter = timeZoneConverter;
			_abpSession = abpSession;
		}

		public FileDto ExportToFile(List<GetTheKhachHangChiTietForView> theKhachHangChiTiets)
		{
			return CreateExcelPackage("TheKhachHangChiTiets.xlsx", delegate (ExcelPackage excelPackage)
			{
				ExcelWorksheet excelWorksheet = excelPackage.Workbook.Worksheets.Add(L("TheKhachHangChiTiets"));
				excelWorksheet.OutLineApplyStyle = true;
				AddHeader(excelWorksheet, L("SoLuong"), L("DonGia"), L("PTChietKhau"), L("TienChietKhau"), L("ThanhToan"), L("GhiChu"), L("SoLuongTang"), L("NgayTraLai"), L("SoLuongTraLai"), L("TienDaSuDung"), L("TraLaiHHDV"), L("ID_SanPhamChinh"), L("LaTangKem"), L("SoLuongDaSuDung"), L("TheKhachHang") + L("MaThe"), L("DM_HangHoa") + L("TenHangHoa"));
				AddObjects(excelWorksheet, 2, theKhachHangChiTiets, (GetTheKhachHangChiTietForView _) => _.TheKhachHangChiTiet.SoLuong, (GetTheKhachHangChiTietForView _) => _.TheKhachHangChiTiet.DonGia, (GetTheKhachHangChiTietForView _) => _.TheKhachHangChiTiet.PTChietKhau, (GetTheKhachHangChiTietForView _) => _.TheKhachHangChiTiet.TienChietKhau, (GetTheKhachHangChiTietForView _) => _.TheKhachHangChiTiet.ThanhToan, (GetTheKhachHangChiTietForView _) => _.TheKhachHangChiTiet.GhiChu, (GetTheKhachHangChiTietForView _) => _.TheKhachHangChiTiet.SoLuongTang, (GetTheKhachHangChiTietForView _) => _timeZoneConverter.Convert(_.TheKhachHangChiTiet.NgayTraLai, _abpSession.TenantId, _abpSession.GetUserId()), (GetTheKhachHangChiTietForView _) => _.TheKhachHangChiTiet.SoLuongTraLai, (GetTheKhachHangChiTietForView _) => _.TheKhachHangChiTiet.TienDaSuDung, (GetTheKhachHangChiTietForView _) => _.TheKhachHangChiTiet.TraLaiHHDV, (GetTheKhachHangChiTietForView _) => _.TheKhachHangChiTiet.ID_SanPhamChinh, (GetTheKhachHangChiTietForView _) => _.TheKhachHangChiTiet.LaTangKem, (GetTheKhachHangChiTietForView _) => _.TheKhachHangChiTiet.SoLuongDaSuDung, (GetTheKhachHangChiTietForView _) => _.TheKhachHangMaThe, (GetTheKhachHangChiTietForView _) => _.DM_HangHoaTenHangHoa);
				ExcelColumn excelColumn = excelWorksheet.Column(8);
				excelColumn.Style.Numberformat.Format = "yyyy-mm-dd";
				excelColumn.AutoFit();
			});
		}
	}

}
