using System.Collections.Generic;
using Abp.Runtime.Session;
using Abp.Timing.Timezone;
using MyCompanyName.AbpZeroTemplate.DataExporting.Excel.NPOI;
using MyCompanyName.AbpZeroTemplate.MyCompanyName.AbpZeroTemplate.DM_NhomDoiTuongs.Dtos;
using MyCompanyName.AbpZeroTemplate.Dto;
using MyCompanyName.AbpZeroTemplate.Storage;

namespace MyCompanyName.AbpZeroTemplate.MyCompanyName.AbpZeroTemplate.DM_NhomDoiTuongs.Exporting
{
    public class DM_NhomDoiTuongsExcelExporter : NpoiExcelExporterBase, IDM_NhomDoiTuongsExcelExporter
    {

        private readonly ITimeZoneConverter _timeZoneConverter;
        private readonly IAbpSession _abpSession;

        public DM_NhomDoiTuongsExcelExporter(
            ITimeZoneConverter timeZoneConverter,
            IAbpSession abpSession,
            ITempFileCacheManager tempFileCacheManager) :
    base(tempFileCacheManager)
        {
            _timeZoneConverter = timeZoneConverter;
            _abpSession = abpSession;
        }

        public FileDto ExportToFile(List<GetDM_NhomDoiTuongsForViewDto> dM_NhomDoiTuongs)
        {
            return CreateExcelPackage(
                "DM_NhomDoiTuongs.xlsx",
                excelPackage =>
                {

                    var sheet = excelPackage.CreateSheet(L("DM_NhomDoiTuongs"));

                    AddHeader(
                        sheet,
                        L("LoaiDoiTuong"),
                        L("MaNhom"),
                        L("TenNhom"),
                        L("MucDiem"),
                        L("GhiChu"),
                        L("UserTao"),
                        L("NgayTao"),
                        L("UserSuaCuoi"),
                        L("NgaySuaCuoi"),
                        L("CreationTime"),
                        L("LastModificationTime"),
                        L("IsDeleted"),
                        L("DeletionTime")
                        );

                    AddObjects(
                        sheet, 2, dM_NhomDoiTuongs,
                        _ => _.DM_NhomDoiTuongs.LoaiDoiTuong,
                        _ => _.DM_NhomDoiTuongs.MaNhom,
                        _ => _.DM_NhomDoiTuongs.TenNhom,
                        _ => _.DM_NhomDoiTuongs.MucDiem,
                        _ => _.DM_NhomDoiTuongs.GhiChu,
                        _ => _.DM_NhomDoiTuongs.UserTao,
                        _ => _timeZoneConverter.Convert(_.DM_NhomDoiTuongs.NgayTao, _abpSession.TenantId, _abpSession.GetUserId()),
                        _ => _.DM_NhomDoiTuongs.UserSuaCuoi,
                        _ => _timeZoneConverter.Convert(_.DM_NhomDoiTuongs.NgaySuaCuoi, _abpSession.TenantId, _abpSession.GetUserId()),
                        _ => _timeZoneConverter.Convert(_.DM_NhomDoiTuongs.CreationTime, _abpSession.TenantId, _abpSession.GetUserId()),
                        _ => _timeZoneConverter.Convert(_.DM_NhomDoiTuongs.LastModificationTime, _abpSession.TenantId, _abpSession.GetUserId()),
                        _ => _.DM_NhomDoiTuongs.IsDeleted,
                        _ => _timeZoneConverter.Convert(_.DM_NhomDoiTuongs.DeletionTime, _abpSession.TenantId, _abpSession.GetUserId())
                        );

                    for (var i = 1; i <= dM_NhomDoiTuongs.Count; i++)
                    {
                        SetCellDataFormat(sheet.GetRow(i).Cells[7], "yyyy-mm-dd");
                    }
                    sheet.AutoSizeColumn(7); for (var i = 1; i <= dM_NhomDoiTuongs.Count; i++)
                    {
                        SetCellDataFormat(sheet.GetRow(i).Cells[9], "yyyy-mm-dd");
                    }
                    sheet.AutoSizeColumn(9); for (var i = 1; i <= dM_NhomDoiTuongs.Count; i++)
                    {
                        SetCellDataFormat(sheet.GetRow(i).Cells[10], "yyyy-mm-dd");
                    }
                    sheet.AutoSizeColumn(10); for (var i = 1; i <= dM_NhomDoiTuongs.Count; i++)
                    {
                        SetCellDataFormat(sheet.GetRow(i).Cells[11], "yyyy-mm-dd");
                    }
                    sheet.AutoSizeColumn(11); for (var i = 1; i <= dM_NhomDoiTuongs.Count; i++)
                    {
                        SetCellDataFormat(sheet.GetRow(i).Cells[13], "yyyy-mm-dd");
                    }
                    sheet.AutoSizeColumn(13);
                });
        }
    }
}