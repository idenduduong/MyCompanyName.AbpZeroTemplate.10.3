using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Sale.TheKhachHangs
{
	[Table("TheKhachHangs")]
	public class TheKhachHang : FullAuditedEntity<Guid>, IMayHaveTenant
	{
		public int? TenantId { get; set; }

		[Required]
		public virtual string MaThe { get; set; }

		[Required]
		public virtual DateTime? NgayMua { get; set; }

		[Required]
		public virtual DateTime? NgayApDung { get; set; }

		public virtual DateTime? NgayHetHan { get; set; }

		[Required]
		public virtual decimal MenhGiaThe { get; set; }

		public virtual decimal PTChietKhau { get; set; }

		public virtual decimal TienChietKhau { get; set; }

		[Required]
		public virtual decimal PhaiThanhToan { get; set; }

		public virtual decimal? TyGia { get; set; }

		public virtual DateTime? NgayVaoSo { get; set; }

		[Required]
		public virtual bool ApDungTatCaSanPham { get; set; }

		[Required]
		public virtual bool DuocChoMuon { get; set; }

		[Required]
		public virtual int TheGiaTri_SoLan_GiamGia { get; set; }

		public virtual string GhiChu { get; set; }

		public virtual decimal PTTangThem { get; set; }

		public virtual decimal TienTangThem { get; set; }

		public virtual bool HuyThe { get; set; }

		public virtual DateTime? NgayHuy { get; set; }

		public virtual int? SoLanDuocSuDung { get; set; }

		public virtual string MaNhanVienTuVan { get; set; }

		public virtual string TenNhanVienTuVan { get; set; }

		public virtual Guid? ID_KhuyenMai { get; set; }

		public virtual Guid? ID_NhomThe { get; set; }

		public virtual string CardType { get; set; }

		public virtual Guid? ID_KhachHang { get; set; }

		public virtual Guid? ID_TienTe { get; set; }

		public virtual long? ID_NhanVienLap { get; set; }

		public virtual long? ID_DonVi { get; set; }

		public virtual string SellingOrganizationCode { get; set; }

		public virtual string SellingOrganizationName { get; set; }

		public virtual long? ID_DonViThuHuong { get; set; }

		public virtual long? ID_DonViThucHien { get; set; }

		public virtual string AuthorizedOrganizationCode { get; set; }

		public virtual string AuthorizedOrganizationName { get; set; }

		public virtual bool Status { get; set; }

		public virtual decimal DaThanhToan { get; set; }

		public virtual decimal SoDu { get; set; }

		public virtual bool DaChuyenThe { get; set; }

		public virtual Guid? ID_TheCu { get; set; }

		public virtual decimal ReleaseBalance { get; set; }

		public virtual decimal ReleasedBalance { get; set; }

		public virtual Guid? VoucherId { get; set; }

		public virtual decimal DiscountFromVoucher { get; set; }

		public virtual decimal VirtualBalance { get; set; }

		public virtual decimal AdjustedAmount { get; set; }
	}
}
