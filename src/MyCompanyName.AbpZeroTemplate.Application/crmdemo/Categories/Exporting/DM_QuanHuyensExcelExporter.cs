using Abp.Runtime.Session;
using Abp.Timing.Timezone;
using MyCompanyName.AbpZeroTemplate.crmdemo.Categories.Dtos;
using MyCompanyName.AbpZeroTemplate.crmdemo.DataExporting.Excel.EpPlus;
using MyCompanyName.AbpZeroTemplate.Dto;
using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Categories.Exporting
{
	public class DM_QuanHuyensExcelExporter : EpPlusExcelExporterBase, IDM_QuanHuyensExcelExporter
	{
		private readonly ITimeZoneConverter _timeZoneConverter;

		private readonly IAbpSession _abpSession;

		public DM_QuanHuyensExcelExporter(ITimeZoneConverter timeZoneConverter, IAbpSession abpSession)
		{
			_timeZoneConverter = timeZoneConverter;
			_abpSession = abpSession;
		}

		public FileDto ExportToFile(List<GetDM_QuanHuyenForView> dM_QuanHuyens)
		{
			return CreateExcelPackage("DM_QuanHuyens.xlsx", delegate (ExcelPackage excelPackage)
			{
				ExcelWorksheet excelWorksheet = excelPackage.Workbook.Worksheets.Add(L("DM_QuanHuyens"));
				excelWorksheet.OutLineApplyStyle = true;
				AddHeader(excelWorksheet, L("MaQuanHuyen"), L("TenQuanHuyen"), L("GhiChu"), L("UserTao"), L("NgayTao"), L("UserSuaCuoi"), L("NgaySuaCuoi"), L("DM_TinhThanh") + L("TenTinhThanh"));
				AddObjects(excelWorksheet, 2, dM_QuanHuyens, (GetDM_QuanHuyenForView _) => _.DM_QuanHuyen.MaQuanHuyen, (GetDM_QuanHuyenForView _) => _.DM_QuanHuyen.TenQuanHuyen, (GetDM_QuanHuyenForView _) => _.DM_QuanHuyen.GhiChu, (GetDM_QuanHuyenForView _) => _.DM_QuanHuyen.UserTao, (GetDM_QuanHuyenForView _) => _timeZoneConverter.Convert(_.DM_QuanHuyen.NgayTao, _abpSession.TenantId, _abpSession.GetUserId()), (GetDM_QuanHuyenForView _) => _.DM_QuanHuyen.UserSuaCuoi, (GetDM_QuanHuyenForView _) => _timeZoneConverter.Convert(_.DM_QuanHuyen.NgaySuaCuoi, _abpSession.TenantId, _abpSession.GetUserId()), (GetDM_QuanHuyenForView _) => _.DM_TinhThanhTenTinhThanh);
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
