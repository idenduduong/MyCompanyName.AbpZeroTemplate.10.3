using Abp.Application.Services.Dto;
using System;

namespace MyCompanyName.AbpZeroTemplate.DM_DoiTuongs.Dtos
{
    public class GetAllDM_DoiTuongForExcelInput
    {
        public string Filter { get; set; }

        public int? MaxLoaiDoiTuongFilter { get; set; }
        public int? MinLoaiDoiTuongFilter { get; set; }

        public int? LaCaNhanFilter { get; set; }

        public string MaDoiTuongFilter { get; set; }

        public string TenDoiTuongFilter { get; set; }

        public string DienThoaiFilter { get; set; }

        public string FaxFilter { get; set; }

        public string EmailFilter { get; set; }

        public string WebsiteFilter { get; set; }

        public string AnhFilter { get; set; }

        public string MaSoThueFilter { get; set; }

        public string TaiKhoanNganHangFilter { get; set; }

        public double? MaxGioiHanCongNoFilter { get; set; }
        public double? MinGioiHanCongNoFilter { get; set; }

        public string GhiChuFilter { get; set; }

        public DateTime? MaxNgaySinh_NgayTLapFilter { get; set; }
        public DateTime? MinNgaySinh_NgayTLapFilter { get; set; }

        public int? ChiaSeFilter { get; set; }

        public int? TheoDoiFilter { get; set; }

        public int? MaxID_IndexFilter { get; set; }
        public int? MinID_IndexFilter { get; set; }

        public int? TheoDoiVanTayFilter { get; set; }

        public DateTime? MaxNgayDoiNhomFilter { get; set; }
        public DateTime? MinNgayDoiNhomFilter { get; set; }

        public double? MaxDiemKhoiTaoFilter { get; set; }
        public double? MinDiemKhoiTaoFilter { get; set; }

        public double? MaxDoanhSoKhoiTaoFilter { get; set; }
        public double? MinDoanhSoKhoiTaoFilter { get; set; }

        public Guid? ID_NguoiGioiThieuFilter { get; set; }

        public string CapTai_DKKDFilter { get; set; }

        public string DiaChiFilter { get; set; }

        public int? GioiTinhNamFilter { get; set; }

        public string NganHangFilter { get; set; }

        public DateTime? MaxNgayCapCMTND_DKKDFilter { get; set; }
        public DateTime? MinNgayCapCMTND_DKKDFilter { get; set; }

        public string NoiCapCMTND_DKKDFilter { get; set; }

        public string SDT_CoQuanFilter { get; set; }

        public string SDT_NhaRiengFilter { get; set; }

        public string SoCMTND_DKKDFilter { get; set; }

        public string ThuongTruFilter { get; set; }

        public string XungHoFilter { get; set; }

        public DateTime? MaxNgayGiaoDichGanNhatFilter { get; set; }
        public DateTime? MinNgayGiaoDichGanNhatFilter { get; set; }

        public string TenNguonKhachFilter { get; set; }

        public string TenNhomFilter { get; set; }

        public string ChucVuFilter { get; set; }

        public string LinhVucFilter { get; set; }

        public string TenKhacFilter { get; set; }

        public string DiaChiKhacFilter { get; set; }

        public DateTime? MaxNgaySuaTrangThaiFilter { get; set; }
        public DateTime? MinNgaySuaTrangThaiFilter { get; set; }

        public long? MaxID_DonViQuanLyFilter { get; set; }
        public long? MinID_DonViQuanLyFilter { get; set; }

        public string CustomerManagementOrganizationCodeFilter { get; set; }

        public string CustomerManagementOrganizationNameFilter { get; set; }

        public Guid? ID_NhomCuFilter { get; set; }

        public long? MaxID_NhanVienPhuTrachFilter { get; set; }
        public long? MinID_NhanVienPhuTrachFilter { get; set; }

        public double? MaxTongDiemFilter { get; set; }
        public double? MinTongDiemFilter { get; set; }

        public string FileDinhKemsFilter { get; set; }

        public Guid? MaFilter { get; set; }

        public string ProfileFilter { get; set; }

        public int? IsNewCustomerFilter { get; set; }

        public int? MaxOrderFilter { get; set; }
        public int? MinOrderFilter { get; set; }

        public DateTime? MaxCreationTimeFilter { get; set; }
        public DateTime? MinCreationTimeFilter { get; set; }

        public DateTime? MaxLastModificationTimeFilter { get; set; }
        public DateTime? MinLastModificationTimeFilter { get; set; }

        public int? IsDeletedFilter { get; set; }

        public DateTime? MaxDeletionTimeFilter { get; set; }
        public DateTime? MinDeletionTimeFilter { get; set; }

    }
}