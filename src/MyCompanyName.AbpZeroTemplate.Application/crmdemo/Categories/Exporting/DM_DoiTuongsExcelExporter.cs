// crmdemo.Categories.Exporting.DM_DoiTuongsExcelExporter
using System.Collections.Generic;
using System.IO;
using Abp.Runtime.Session;
using Abp.Timing.Timezone;
//using crmdemo;
//using crmdemo.Categories.Dtos;
//using crmdemo.Categories.Exporting;
//using crmdemo.DataExporting.Excel.EpPlus;
//using crmdemo.Dto;
using MyCompanyName.AbpZeroTemplate.crmdemo.Categories.Dtos;
using MyCompanyName.AbpZeroTemplate.crmdemo.DataExporting.Excel.EpPlus;
using MyCompanyName.AbpZeroTemplate.crmdemo.Dto;
using OfficeOpenXml;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Categories.Exporting
{
	public class DM_DoiTuongsExcelExporter : EpPlusExcelExporterBase, IDM_DoiTuongsExcelExporter
	{
		private readonly ITimeZoneConverter _timeZoneConverter;

		private readonly IAbpSession _abpSession;

		private readonly IAppFolders _appFolders;

		public DM_DoiTuongsExcelExporter(ITimeZoneConverter timeZoneConverter, IAbpSession abpSession, IAppFolders appFolders)
		{
			_timeZoneConverter = timeZoneConverter;
			_abpSession = abpSession;
			_appFolders = appFolders;
		}

		public FileDto ExportToFile(List<GetDM_DoiTuongForView> data)
		{
			ExcelPackage package = new ExcelPackage(new FileInfo(Path.Combine(_appFolders.TempFileDownloadFolder, "doituong_template.xlsx")));
			ExcelWorksheet ws = package.Workbook.Worksheets[1];
			if (data != null && data.Count > 0)
			{
				int i = 2;
				int stt = 1;
				int nextRow = 0;
				foreach (GetDM_DoiTuongForView item in data)
				{
					ExcelRange range = ws.Cells[2 + nextRow, 1, 2 + nextRow, 24];
					if (stt > 1 && stt <= data.Count)
					{
						ws.Cells[2, 1, 2, 24].Copy(range);
					}
					ws.Cells[i, 1].Value = stt;
					ws.Cells[i, 2].Value = item.DM_NhomDoiTuongTenNhom;
					ws.Cells[i, 3].Value = item.DonViQuanLy;
					ws.Cells[i, 4].Value = item.DM_DoiTuong.MaDoiTuong;
					ws.Cells[i, 5].Value = item.DM_DoiTuong.TenDoiTuong;
					ws.Cells[i, 6].Value = item.DM_DoiTuong.DienThoai;
					ws.Cells[i, 7].Value = item.DM_DoiTuong.SoCMTND_DKKD;
					ws.Cells[i, 8].Value = item.DM_DoiTuong.NgaySinh_NgayTLap;
					ws.Cells[i, 9].Value = (item.DM_DoiTuong.GioiTinhNam ? "Nam" : "Nữ");
					ws.Cells[i, 10].Value = item.DM_DoiTuong.DiaChi;
					ws.Cells[i, 11].Value = item.DM_DoiTuong.NgheNghiep;
					ws.Cells[i, 12].Value = item.DM_QuanHuyenTenQuanHuyen;
					ws.Cells[i, 13].Value = item.DM_TinhThanhTenTinhThanh;
					ws.Cells[i, 14].Value = item.DM_QuocGiaTenNuoc;
					ws.Cells[i, 15].Value = item.DM_DoiTuong.Email;
					ws.Cells[i, 16].Value = item.NguonKhachHangTenNguonKhach;
					ws.Cells[i, 17].Value = item.DM_DoiTuong.NgayDoiNhom;
					ws.Cells[i, 18].Value = item.NguoiGioiThieu;
					ws.Cells[i, 19].Value = item.UserName;
					ws.Cells[i, 20].Value = item.TenNguoiTao;
					ws.Cells[i, 21].Value = item.DM_DoiTuong.CreationTime;
					ws.Cells[i, 22].Value = item.TenNguoiSuaCuoi;
					ws.Cells[i, 23].Value = item.DM_DoiTuong.LastModificationTime;
					ws.Cells[i, 24].Value = item.DM_DoiTuong.GhiChu;
					i++;
					stt++;
					nextRow++;
				}
			}
			return CreateExcelPackage("Dm_KhachHang.xlsx", package);
		}
	}

}
