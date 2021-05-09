using System;
using Abp.Application.Services.Dto;

namespace MyCompanyName.AbpZeroTemplate.DM_DoiTuongs.Dtos
{
    public class DM_DoiTuongDto : EntityDto<Guid>
    {
        public int LoaiDoiTuong { get; set; }

        public bool LaCaNhan { get; set; }

        public string MaDoiTuong { get; set; }

        public string TenDoiTuong { get; set; }

        public string DienThoai { get; set; }

        public string Fax { get; set; }

        public string Email { get; set; }

        public string Website { get; set; }

        public string Anh { get; set; }

        public string MaSoThue { get; set; }

        public string TaiKhoanNganHang { get; set; }

        public double? GioiHanCongNo { get; set; }

        public string GhiChu { get; set; }

        public DateTime? NgaySinh_NgayTLap { get; set; }

        public bool ChiaSe { get; set; }

        public bool TheoDoi { get; set; }

        public int? ID_Index { get; set; }

        public bool TheoDoiVanTay { get; set; }

        public DateTime? NgayDoiNhom { get; set; }

        public double? DiemKhoiTao { get; set; }

        public double? DoanhSoKhoiTao { get; set; }

        public Guid ID_NguoiGioiThieu { get; set; }

        public string CapTai_DKKD { get; set; }

        public string DiaChi { get; set; }

        public bool GioiTinhNam { get; set; }

        public string NganHang { get; set; }

        public DateTime? NgayCapCMTND_DKKD { get; set; }

        public string NoiCapCMTND_DKKD { get; set; }

        public string SDT_CoQuan { get; set; }

        public string SDT_NhaRieng { get; set; }

        public string SoCMTND_DKKD { get; set; }

        public string ThuongTru { get; set; }

        public string XungHo { get; set; }

        public DateTime? NgayGiaoDichGanNhat { get; set; }

        public string TenNguonKhach { get; set; }

        public string TenNhom { get; set; }

        public string ChucVu { get; set; }

        public string LinhVuc { get; set; }

        public string TenKhac { get; set; }

        public string DiaChiKhac { get; set; }

        public DateTime? NgaySuaTrangThai { get; set; }

        public long? ID_DonViQuanLy { get; set; }

        public string CustomerManagementOrganizationCode { get; set; }

        public string CustomerManagementOrganizationName { get; set; }

        public Guid ID_NhomCu { get; set; }

        public long? ID_NhanVienPhuTrach { get; set; }

        public double TongDiem { get; set; }

        public string FileDinhKems { get; set; }

        public Guid Ma { get; set; }

        public string Profile { get; set; }

        public bool IsNewCustomer { get; set; }

        public int Order { get; set; }

        public DateTime CreationTime { get; set; }

        public DateTime? LastModificationTime { get; set; }

        public bool IsDeleted { get; set; }

        public DateTime? DeletionTime { get; set; }

    }
}