// crmdemo.Categories.Dtos.DM_LienHeDto
using System;
using Abp.Application.Services.Dto;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Categories.Dtos
{
	public class DM_LienHeDto : EntityDto<Guid>
	{
		public string MaLienHe { get; set; }

		public string TenLienHe { get; set; }

		public string ChucVu { get; set; }

		public string SoDienThoai { get; set; }

		public string Email { get; set; }

		public string GhiChu { get; set; }

		public string DiaChi { get; set; }

		public DateTime? NgaySinh { get; set; }

		public string CanNang { get; set; }

		public string ChieuCao { get; set; }

		public Guid? ID_DoiTuong { get; set; }
	}
}
