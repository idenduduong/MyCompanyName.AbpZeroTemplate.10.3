// crmdemo.Sale.Exporting.TheKhachHangsExcelExporter
using System.Collections.Generic;
using Abp.Runtime.Session;
using Abp.Timing.Timezone;
using MyCompanyName.AbpZeroTemplate.crmdemo.DataExporting.Excel.EpPlus;

using MyCompanyName.AbpZeroTemplate.crm.crmdemo.Sale.Exporting;
using MyCompanyName.AbpZeroTemplate.crmdemo.Dto;
using MyCompanyName.AbpZeroTemplate.crmdemo.Sale.Dtos;
using OfficeOpenXml;
using MyCompanyName.AbpZeroTemplate.Dto;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Sale.Exporting
{
	public class TheKhachHangsExcelExporter : EpPlusExcelExporterBase, ITheKhachHangsExcelExporter
	{
		private readonly ITimeZoneConverter _timeZoneConverter;

		private readonly IAbpSession _abpSession;

		public TheKhachHangsExcelExporter(ITimeZoneConverter timeZoneConverter, IAbpSession abpSession)
		{
			_timeZoneConverter = timeZoneConverter;
			_abpSession = abpSession;
		}

		public FileDto ExportToFile(List<GetTheKhachHangForView> theKhachHangs)
		{
			return CreateExcelPackage("TheKhachHangs.xlsx", delegate (ExcelPackage excelPackage)
			{
				ExcelWorksheet excelWorksheet = excelPackage.Workbook.Worksheets.Add(L("TheKhachHangs"));
				excelWorksheet.OutLineApplyStyle = true;
				AddHeader(excelWorksheet, L("MaThe"), L("NgayMua"), L("NgayApDung"), L("NgayHetHan"), L("MenhGiaThe"), L("PTChietKhau"), L("TienChietKhau"), L("PhaiThanhToan"), L("TyGia"), L("ApDungTatCaSanPham"), L("DuocChoMuon"), L("TheGiaTri_SoLan_GiamGia"), L("NgayVaoSo"), L("GhiChu"), L("PTTangThem"), L("TienTangThem"), L("HuyThe"), L("NgayHuy"), L("SoLanDuocSuDung"), L("MaNhanVienTuVan"), L("TenNhanVienTuVan"), L("DM_NhomThe") + L("TenNhomThe"), L("DM_DoiTuong") + L("TenDoiTuong"), L("DM_TienTe") + L("TenNgoaiTe"), L("User") + L("Name"), L("OrganizationUnit") + L("DisplayName"), L("DM_DacDiemKhachHang") + L("TenDacDiem"), L("DM_LienHe") + L("MaLienHe"));
				AddObjects(excelWorksheet, 2, theKhachHangs, (GetTheKhachHangForView _) => _.TheKhachHang.MaThe, (GetTheKhachHangForView _) => _timeZoneConverter.Convert(_.TheKhachHang.NgayMua, _abpSession.TenantId, _abpSession.GetUserId()), (GetTheKhachHangForView _) => _timeZoneConverter.Convert(_.TheKhachHang.NgayApDung, _abpSession.TenantId, _abpSession.GetUserId()), (GetTheKhachHangForView _) => _timeZoneConverter.Convert(_.TheKhachHang.NgayHetHan, _abpSession.TenantId, _abpSession.GetUserId()), (GetTheKhachHangForView _) => _.TheKhachHang.MenhGiaThe, (GetTheKhachHangForView _) => _.TheKhachHang.PTChietKhau, (GetTheKhachHangForView _) => _.TheKhachHang.TienChietKhau, (GetTheKhachHangForView _) => _.TheKhachHang.PhaiThanhToan, (GetTheKhachHangForView _) => _.TheKhachHang.TyGia, (GetTheKhachHangForView _) => _.TheKhachHang.ApDungTatCaSanPham, (GetTheKhachHangForView _) => _.TheKhachHang.DuocChoMuon, (GetTheKhachHangForView _) => _.TheKhachHang.TheGiaTri_SoLan_GiamGia, (GetTheKhachHangForView _) => _timeZoneConverter.Convert(_.TheKhachHang.NgayVaoSo, _abpSession.TenantId, _abpSession.GetUserId()), (GetTheKhachHangForView _) => _.TheKhachHang.GhiChu, (GetTheKhachHangForView _) => _.TheKhachHang.PTTangThem, (GetTheKhachHangForView _) => _.TheKhachHang.TienTangThem, (GetTheKhachHangForView _) => _.TheKhachHang.HuyThe, (GetTheKhachHangForView _) => _timeZoneConverter.Convert(_.TheKhachHang.NgayHuy, _abpSession.TenantId, _abpSession.GetUserId()), (GetTheKhachHangForView _) => _.TheKhachHang.SoLanDuocSuDung, (GetTheKhachHangForView _) => _.TheKhachHang.MaNhanVienTuVan, (GetTheKhachHangForView _) => _.TheKhachHang.TenNhanVienTuVan, (GetTheKhachHangForView _) => _.DM_NhomTheTenNhomThe, (GetTheKhachHangForView _) => _.DM_DoiTuongTenDoiTuong, (GetTheKhachHangForView _) => _.DM_TienTeTenNgoaiTe, (GetTheKhachHangForView _) => _.UserName, (GetTheKhachHangForView _) => _.OrganizationUnitDisplayName, (GetTheKhachHangForView _) => _.DM_DacDiemKhachHangTenDacDiem, (GetTheKhachHangForView _) => _.DM_LienHeMaLienHe);
				ExcelColumn excelColumn = excelWorksheet.Column(2);
				excelColumn.Style.Numberformat.Format = "yyyy-mm-dd";
				excelColumn.AutoFit();
				ExcelColumn excelColumn2 = excelWorksheet.Column(3);
				excelColumn2.Style.Numberformat.Format = "yyyy-mm-dd";
				excelColumn2.AutoFit();
				ExcelColumn excelColumn3 = excelWorksheet.Column(4);
				excelColumn3.Style.Numberformat.Format = "yyyy-mm-dd";
				excelColumn3.AutoFit();
				ExcelColumn excelColumn4 = excelWorksheet.Column(13);
				excelColumn4.Style.Numberformat.Format = "yyyy-mm-dd";
				excelColumn4.AutoFit();
				ExcelColumn excelColumn5 = excelWorksheet.Column(18);
				excelColumn5.Style.Numberformat.Format = "yyyy-mm-dd";
				excelColumn5.AutoFit();
			});
		}
	}

}
