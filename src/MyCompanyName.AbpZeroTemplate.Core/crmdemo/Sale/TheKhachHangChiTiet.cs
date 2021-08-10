// crmdemo.Sale.TheKhachHangChiTiet
using System;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Sale
{
	[Table("TheKhachHangChiTiets")]
	public class TheKhachHangChiTiet : FullAuditedEntity<Guid>, IMayHaveTenant
	{
		public int? TenantId { get; set; }

		public virtual int SoLuong { get; set; }

		public virtual decimal DonGia { get; set; }

		public virtual decimal PTChietKhau { get; set; }

		public virtual decimal TienChietKhau { get; set; }

		public virtual decimal ThanhToan { get; set; }

		public virtual Guid? ID_LopHoc { get; set; }

		public virtual string GhiChu { get; set; }

		public virtual int SoLuongTang { get; set; }

		public virtual DateTime? NgayTraLai { get; set; }

		public virtual int SoLuongTraLai { get; set; }

		public virtual decimal TienDaSuDung { get; set; }

		public virtual bool TraLaiHHDV { get; set; }

		public virtual Guid? ID_SanPhamChinh { get; set; }

		public virtual bool LaTangKem { get; set; }

		public virtual int SoLuongDaSuDung { get; set; }

		public virtual Guid? ID_TheKhachHang { get; set; }

		public virtual Guid? ID_HangHoa { get; set; }

		public virtual string ServiceName { get; set; }

		public virtual string ServiceGroup { get; set; }

		public virtual bool IsComplete { get; set; }

		public virtual int PackageOrder { get; set; }

		public virtual bool MultipleSeller { get; set; }

		public virtual int ReleaseAmount { get; set; }
	}

}
