// crmdemo.Sale.NhatKySuDungThe
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using MyCompanyName.AbpZeroTemplate.crmdemo.Accounting;
using MyCompanyName.AbpZeroTemplate.crmdemo.Sale;
using MyCompanyName.AbpZeroTemplate.crmdemo.Sale.TheKhachHangs;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Sale
{
	[Serializable]
	[Table("NhatKySuDungThes")]
	public class NhatKySuDungThe : FullAuditedEntity<Guid>, IMayHaveTenant
	{
		public int? TenantId { get; set; }

		[Required]
		public virtual Guid? ID_ChungTu { get; set; }

		[ForeignKey("ID_ChungTu")]
		public HoaDonBanLe ChungTu { get; set; }

		public virtual Guid? ID_ChiTietChungTu { get; set; }

		[ForeignKey("ID_ChiTietChungTu")]
		public HoaDonBanLeChiTiet ChiTietChungTu { get; set; }

		public virtual int SoLuong { get; set; }

		public virtual decimal SoTien { get; set; }

		public virtual DateTime? Ngay { get; set; }

		public virtual string UserName { get; set; }

		public virtual bool LaSoLuongDuocTang { get; set; }

		public virtual Guid? ID_TheKhachHang { get; set; }

		[ForeignKey("ID_TheKhachHang")]
		public TheKhachHang TheKhachHang { get; set; }

		public virtual Guid? ID_TheKhachHangChiTiet { get; set; }

		[ForeignKey("ID_TheKhachHangChiTiet")]
		public TheKhachHangChiTiet TheKhachHangChiTiet { get; set; }

		public virtual int? LoaiChungTu { get; set; }

		public virtual long? ID_NhanVien { get; set; }

		public virtual Guid? ID_HangHoaDichVu { get; set; }

		public virtual bool IsLastActivity { get; set; }

		public virtual string ServiceName { get; set; }

		public virtual string ServiceGroup { get; set; }
	}

}
