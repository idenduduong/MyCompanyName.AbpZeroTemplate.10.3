// crmdemo.Sale.Dtos.TheKhachHangChiTietDto
using System;
using Abp.Application.Services.Dto;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Sale.Dtos
{
	public class TheKhachHangChiTietDto : EntityDto<Guid>
	{
		public double? SoLuong { get; set; }

		public double? DonGia { get; set; }

		public double? PTChietKhau { get; set; }

		public double? TienChietKhau { get; set; }

		public double? ThanhToan { get; set; }

		public string GhiChu { get; set; }

		public double? SoLuongTang { get; set; }

		public DateTime? NgayTraLai { get; set; }

		public double? SoLuongTraLai { get; set; }

		public double? TienDaSuDung { get; set; }

		public bool TraLaiHHDV { get; set; }

		public Guid ID_SanPhamChinh { get; set; }

		public bool LaTangKem { get; set; }

		public double? SoLuongDaSuDung { get; set; }

		public int NumberOfReturn { get; set; }

		public int TotalNumber { get; set; }

		public Guid? ID_TheKhachHang { get; set; }

		public Guid? ID_HangHoa { get; set; }

		public virtual string ServiceName { get; set; }

		public virtual string ServiceGroup { get; set; }

		public virtual bool IsComplete { get; set; }

		public virtual int PackageOrder { get; set; }

		public virtual bool MultipleSeller { get; set; }
	}
}
