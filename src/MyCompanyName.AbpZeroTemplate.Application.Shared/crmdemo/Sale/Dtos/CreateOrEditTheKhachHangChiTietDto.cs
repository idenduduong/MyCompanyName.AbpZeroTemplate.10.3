// crmdemo.Sale.Dtos.CreateOrEditTheKhachHangChiTietDto
using System;
using Abp.Application.Services.Dto;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Sale.Dtos
{
	public class CreateOrEditTheKhachHangChiTietDto : FullAuditedEntityDto<Guid?>
	{
		public int SoLuong { get; set; }

		public decimal DonGia { get; set; }

		public decimal PTChietKhau { get; set; }

		public decimal TienChietKhau { get; set; }

		public decimal ThanhToan { get; set; }

		public string GhiChu { get; set; }

		public int SoLuongTang { get; set; }

		public DateTime? NgayTraLai { get; set; }

		public int SoLuongTraLai { get; set; }

		public decimal TienDaSuDung { get; set; }

		public bool TraLaiHHDV { get; set; }

		public Guid ID_SanPhamChinh { get; set; }

		public bool LaTangKem { get; set; }

		public int SoLuongDaSuDung { get; set; }

		public Guid? ID_TheKhachHang { get; set; }

		public Guid? ID_HangHoa { get; set; }
	}
}
