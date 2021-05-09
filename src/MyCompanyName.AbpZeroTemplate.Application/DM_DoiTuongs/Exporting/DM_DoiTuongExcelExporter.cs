using System.Collections.Generic;
using Abp.Runtime.Session;
using Abp.Timing.Timezone;
using MyCompanyName.AbpZeroTemplate.DataExporting.Excel.NPOI;
using MyCompanyName.AbpZeroTemplate.DM_DoiTuongs.Dtos;
using MyCompanyName.AbpZeroTemplate.Dto;
using MyCompanyName.AbpZeroTemplate.Storage;

namespace MyCompanyName.AbpZeroTemplate.DM_DoiTuongs.Exporting
{
    public class DM_DoiTuongExcelExporter : NpoiExcelExporterBase, IDM_DoiTuongExcelExporter
    {

        private readonly ITimeZoneConverter _timeZoneConverter;
        private readonly IAbpSession _abpSession;

        public DM_DoiTuongExcelExporter(
            ITimeZoneConverter timeZoneConverter,
            IAbpSession abpSession,
            ITempFileCacheManager tempFileCacheManager) :
    base(tempFileCacheManager)
        {
            _timeZoneConverter = timeZoneConverter;
            _abpSession = abpSession;
        }

        public FileDto ExportToFile(List<GetDM_DoiTuongForViewDto> dM_DoiTuong)
        {
            return CreateExcelPackage(
                "DM_DoiTuong.xlsx",
                excelPackage =>
                {

                    var sheet = excelPackage.CreateSheet(L("DM_DoiTuong"));

                    AddHeader(
                        sheet,
                        L("LoaiDoiTuong"),
                        L("LaCaNhan"),
                        L("MaDoiTuong"),
                        L("TenDoiTuong"),
                        L("DienThoai"),
                        L("Fax"),
                        L("Email"),
                        L("Website"),
                        L("Anh"),
                        L("MaSoThue"),
                        L("TaiKhoanNganHang"),
                        L("GioiHanCongNo"),
                        L("GhiChu"),
                        L("NgaySinh_NgayTLap"),
                        L("ChiaSe"),
                        L("TheoDoi"),
                        L("ID_Index"),
                        L("TheoDoiVanTay"),
                        L("NgayDoiNhom"),
                        L("DiemKhoiTao"),
                        L("DoanhSoKhoiTao"),
                        L("ID_NguoiGioiThieu"),
                        L("CapTai_DKKD"),
                        L("DiaChi"),
                        L("GioiTinhNam"),
                        L("NganHang"),
                        L("NgayCapCMTND_DKKD"),
                        L("NoiCapCMTND_DKKD"),
                        L("SDT_CoQuan"),
                        L("SDT_NhaRieng"),
                        L("SoCMTND_DKKD"),
                        L("ThuongTru"),
                        L("XungHo"),
                        L("NgayGiaoDichGanNhat"),
                        L("TenNguonKhach"),
                        L("TenNhom"),
                        L("ChucVu"),
                        L("LinhVuc"),
                        L("TenKhac"),
                        L("DiaChiKhac"),
                        L("NgaySuaTrangThai"),
                        L("ID_DonViQuanLy"),
                        L("CustomerManagementOrganizationCode"),
                        L("CustomerManagementOrganizationName"),
                        L("ID_NhomCu"),
                        L("ID_NhanVienPhuTrach"),
                        L("TongDiem"),
                        L("FileDinhKems"),
                        L("Ma"),
                        L("Profile"),
                        L("IsNewCustomer"),
                        L("Order"),
                        L("CreationTime"),
                        L("LastModificationTime"),
                        L("IsDeleted"),
                        L("DeletionTime")
                        );

                    AddObjects(
                        sheet, 2, dM_DoiTuong,
                        _ => _.DM_DoiTuong.LoaiDoiTuong,
                        _ => _.DM_DoiTuong.LaCaNhan,
                        _ => _.DM_DoiTuong.MaDoiTuong,
                        _ => _.DM_DoiTuong.TenDoiTuong,
                        _ => _.DM_DoiTuong.DienThoai,
                        _ => _.DM_DoiTuong.Fax,
                        _ => _.DM_DoiTuong.Email,
                        _ => _.DM_DoiTuong.Website,
                        _ => _.DM_DoiTuong.Anh,
                        _ => _.DM_DoiTuong.MaSoThue,
                        _ => _.DM_DoiTuong.TaiKhoanNganHang,
                        _ => _.DM_DoiTuong.GioiHanCongNo,
                        _ => _.DM_DoiTuong.GhiChu,
                        _ => _timeZoneConverter.Convert(_.DM_DoiTuong.NgaySinh_NgayTLap, _abpSession.TenantId, _abpSession.GetUserId()),
                        _ => _.DM_DoiTuong.ChiaSe,
                        _ => _.DM_DoiTuong.TheoDoi,
                        _ => _.DM_DoiTuong.ID_Index,
                        _ => _.DM_DoiTuong.TheoDoiVanTay,
                        _ => _timeZoneConverter.Convert(_.DM_DoiTuong.NgayDoiNhom, _abpSession.TenantId, _abpSession.GetUserId()),
                        _ => _.DM_DoiTuong.DiemKhoiTao,
                        _ => _.DM_DoiTuong.DoanhSoKhoiTao,
                        _ => _.DM_DoiTuong.ID_NguoiGioiThieu,
                        _ => _.DM_DoiTuong.CapTai_DKKD,
                        _ => _.DM_DoiTuong.DiaChi,
                        _ => _.DM_DoiTuong.GioiTinhNam,
                        _ => _.DM_DoiTuong.NganHang,
                        _ => _timeZoneConverter.Convert(_.DM_DoiTuong.NgayCapCMTND_DKKD, _abpSession.TenantId, _abpSession.GetUserId()),
                        _ => _.DM_DoiTuong.NoiCapCMTND_DKKD,
                        _ => _.DM_DoiTuong.SDT_CoQuan,
                        _ => _.DM_DoiTuong.SDT_NhaRieng,
                        _ => _.DM_DoiTuong.SoCMTND_DKKD,
                        _ => _.DM_DoiTuong.ThuongTru,
                        _ => _.DM_DoiTuong.XungHo,
                        _ => _timeZoneConverter.Convert(_.DM_DoiTuong.NgayGiaoDichGanNhat, _abpSession.TenantId, _abpSession.GetUserId()),
                        _ => _.DM_DoiTuong.TenNguonKhach,
                        _ => _.DM_DoiTuong.TenNhom,
                        _ => _.DM_DoiTuong.ChucVu,
                        _ => _.DM_DoiTuong.LinhVuc,
                        _ => _.DM_DoiTuong.TenKhac,
                        _ => _.DM_DoiTuong.DiaChiKhac,
                        _ => _timeZoneConverter.Convert(_.DM_DoiTuong.NgaySuaTrangThai, _abpSession.TenantId, _abpSession.GetUserId()),
                        _ => _.DM_DoiTuong.ID_DonViQuanLy,
                        _ => _.DM_DoiTuong.CustomerManagementOrganizationCode,
                        _ => _.DM_DoiTuong.CustomerManagementOrganizationName,
                        _ => _.DM_DoiTuong.ID_NhomCu,
                        _ => _.DM_DoiTuong.ID_NhanVienPhuTrach,
                        _ => _.DM_DoiTuong.TongDiem,
                        _ => _.DM_DoiTuong.FileDinhKems,
                        _ => _.DM_DoiTuong.Ma,
                        _ => _.DM_DoiTuong.Profile,
                        _ => _.DM_DoiTuong.IsNewCustomer,
                        _ => _.DM_DoiTuong.Order,
                        _ => _timeZoneConverter.Convert(_.DM_DoiTuong.CreationTime, _abpSession.TenantId, _abpSession.GetUserId()),
                        _ => _timeZoneConverter.Convert(_.DM_DoiTuong.LastModificationTime, _abpSession.TenantId, _abpSession.GetUserId()),
                        _ => _.DM_DoiTuong.IsDeleted,
                        _ => _timeZoneConverter.Convert(_.DM_DoiTuong.DeletionTime, _abpSession.TenantId, _abpSession.GetUserId())
                        );

                    for (var i = 1; i <= dM_DoiTuong.Count; i++)
                    {
                        SetCellDataFormat(sheet.GetRow(i).Cells[14], "yyyy-mm-dd");
                    }
                    sheet.AutoSizeColumn(14); for (var i = 1; i <= dM_DoiTuong.Count; i++)
                    {
                        SetCellDataFormat(sheet.GetRow(i).Cells[19], "yyyy-mm-dd");
                    }
                    sheet.AutoSizeColumn(19); for (var i = 1; i <= dM_DoiTuong.Count; i++)
                    {
                        SetCellDataFormat(sheet.GetRow(i).Cells[27], "yyyy-mm-dd");
                    }
                    sheet.AutoSizeColumn(27); for (var i = 1; i <= dM_DoiTuong.Count; i++)
                    {
                        SetCellDataFormat(sheet.GetRow(i).Cells[34], "yyyy-mm-dd");
                    }
                    sheet.AutoSizeColumn(34); for (var i = 1; i <= dM_DoiTuong.Count; i++)
                    {
                        SetCellDataFormat(sheet.GetRow(i).Cells[41], "yyyy-mm-dd");
                    }
                    sheet.AutoSizeColumn(41); for (var i = 1; i <= dM_DoiTuong.Count; i++)
                    {
                        SetCellDataFormat(sheet.GetRow(i).Cells[53], "yyyy-mm-dd");
                    }
                    sheet.AutoSizeColumn(53); for (var i = 1; i <= dM_DoiTuong.Count; i++)
                    {
                        SetCellDataFormat(sheet.GetRow(i).Cells[54], "yyyy-mm-dd");
                    }
                    sheet.AutoSizeColumn(54); for (var i = 1; i <= dM_DoiTuong.Count; i++)
                    {
                        SetCellDataFormat(sheet.GetRow(i).Cells[56], "yyyy-mm-dd");
                    }
                    sheet.AutoSizeColumn(56);
                });
        }
    }
}