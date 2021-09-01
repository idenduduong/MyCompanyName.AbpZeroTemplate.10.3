using Abp.Runtime.Session;
using Abp.Timing.Timezone;
using MyCompanyName.AbpZeroTemplate.crmdemo.Categories.Dtos;
using MyCompanyName.AbpZeroTemplate.Dto;
using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MyCompanyName.AbpZeroTemplate.crmdemo.DataExporting.Excel.EpPlus;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Categories.Exporting
{
	public class DM_TinhThanhsExcelExporter : EpPlusExcelExporterBase, IDM_TinhThanhsExcelExporter
	{
		private readonly ITimeZoneConverter _timeZoneConverter;

		private readonly IAbpSession _abpSession;

		public DM_TinhThanhsExcelExporter(ITimeZoneConverter timeZoneConverter, IAbpSession abpSession)
		{
			_timeZoneConverter = timeZoneConverter;
			_abpSession = abpSession;
		}

		public FileDto ExportToFile(List<GetDM_TinhThanhForView> dM_TinhThanhs)
		{
			return CreateExcelPackage("DM_TinhThanhs.xlsx", delegate (ExcelPackage excelPackage)
			{
				ExcelWorksheet excelWorksheet = excelPackage.Workbook.Worksheets.Add(L("DM_TinhThanhs"));
				excelWorksheet.OutLineApplyStyle = true;
				AddHeader(excelWorksheet, L("MaTinhThanh"), L("TenTinhThanh"), L("GhiChu"), L("UserTao"), L("NgayTao"), L("UserSuaCuoi"), L("NgaySuaCuoi"), L("DM_QuocGia") + L("TenNuoc"), L("DM_VungMien") + L("TenVung"));
				AddObjects(excelWorksheet, 2, dM_TinhThanhs, (GetDM_TinhThanhForView _) => _.MaTinhThanh, (GetDM_TinhThanhForView _) => _.TenTinhThanh, (GetDM_TinhThanhForView _) => _.GhiChu, (GetDM_TinhThanhForView _) => _.UserTao, (GetDM_TinhThanhForView _) => _timeZoneConverter.Convert(_.NgayTao, _abpSession.TenantId, _abpSession.GetUserId()), (GetDM_TinhThanhForView _) => _.UserSuaCuoi, (GetDM_TinhThanhForView _) => _timeZoneConverter.Convert(_.NgaySuaCuoi, _abpSession.TenantId, _abpSession.GetUserId()), (GetDM_TinhThanhForView _) => _.DM_QuocGiaTenNuoc, (GetDM_TinhThanhForView _) => _.DM_VungMienTenVung);
				ExcelColumn excelColumn = excelWorksheet.Column(5);
				excelColumn.Style.Numberformat.Format = "yyyy-mm-dd";
				excelColumn.AutoFit();
				ExcelColumn excelColumn2 = excelWorksheet.Column(7);
				excelColumn2.Style.Numberformat.Format = "yyyy-mm-dd";
				excelColumn2.AutoFit();
			});
		}
	}
}
