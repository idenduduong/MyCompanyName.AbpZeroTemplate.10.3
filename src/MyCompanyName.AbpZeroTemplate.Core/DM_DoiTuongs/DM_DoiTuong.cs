using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;
using Abp.Domain.Entities;
using Abp.Auditing;

namespace MyCompanyName.AbpZeroTemplate.DM_DoiTuongs
{
    [Table("DM_DoiTuongs")]
    [Audited]
    public class DM_DoiTuong : Entity<Guid>, IMayHaveTenant
    {
        public int? TenantId { get; set; }

        [Required]
        public virtual int LoaiDoiTuong { get; set; }

        [Required]
        public virtual bool LaCaNhan { get; set; }

        [Required]
        public virtual string MaDoiTuong { get; set; }

        [Required]
        public virtual string TenDoiTuong { get; set; }

        public virtual string DienThoai { get; set; }

        public virtual string Fax { get; set; }

        public virtual string Email { get; set; }

        public virtual string Website { get; set; }

        public virtual string Anh { get; set; }

        public virtual string MaSoThue { get; set; }

        public virtual string TaiKhoanNganHang { get; set; }

        public virtual double? GioiHanCongNo { get; set; }

        public virtual string GhiChu { get; set; }

        public virtual DateTime? NgaySinh_NgayTLap { get; set; }

        [Required]
        public virtual bool ChiaSe { get; set; }

        [Required]
        public virtual bool TheoDoi { get; set; }

        public virtual int? ID_Index { get; set; }

        [Required]
        public virtual bool TheoDoiVanTay { get; set; }

        public virtual DateTime? NgayDoiNhom { get; set; }

        public virtual double? DiemKhoiTao { get; set; }

        public virtual double? DoanhSoKhoiTao { get; set; }

        public virtual Guid ID_NguoiGioiThieu { get; set; }

        public virtual string CapTai_DKKD { get; set; }

        public virtual string DiaChi { get; set; }

        [Required]
        public virtual bool GioiTinhNam { get; set; }

        public virtual string NganHang { get; set; }

        public virtual DateTime? NgayCapCMTND_DKKD { get; set; }

        public virtual string NoiCapCMTND_DKKD { get; set; }

        public virtual string SDT_CoQuan { get; set; }

        public virtual string SDT_NhaRieng { get; set; }

        public virtual string SoCMTND_DKKD { get; set; }

        public virtual string ThuongTru { get; set; }

        public virtual string XungHo { get; set; }

        public virtual DateTime? NgayGiaoDichGanNhat { get; set; }

        public virtual string TenNguonKhach { get; set; }

        public virtual string TenNhom { get; set; }

        public virtual string ChucVu { get; set; }

        public virtual string LinhVuc { get; set; }

        public virtual string TenKhac { get; set; }

        public virtual string DiaChiKhac { get; set; }

        public virtual DateTime? NgaySuaTrangThai { get; set; }

        public virtual long? ID_DonViQuanLy { get; set; }

        public virtual string CustomerManagementOrganizationCode { get; set; }

        public virtual string CustomerManagementOrganizationName { get; set; }

        public virtual Guid ID_NhomCu { get; set; }

        public virtual long? ID_NhanVienPhuTrach { get; set; }

        [Required]
        public virtual double TongDiem { get; set; }

        public virtual string FileDinhKems { get; set; }

        public virtual Guid Ma { get; set; }

        public virtual string Profile { get; set; }

        [Required]
        public virtual bool IsNewCustomer { get; set; }

        [Required]
        public virtual int Order { get; set; }

        [Required]
        public virtual DateTime CreationTime { get; set; }

        public virtual DateTime? LastModificationTime { get; set; }

        [Required]
        public virtual bool IsDeleted { get; set; }

        public virtual DateTime? DeletionTime { get; set; }

    }
}