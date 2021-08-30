// crmdemo.Sale.Dtos.GetAllTheKhachHangsInput
using Abp.Application.Services.Dto;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Sale.Dtos
{
	public class GetAllTheKhachHangsInput : PagedAndSortedResultRequestDto
	{
		public string Filter { get; set; }

		public bool? IsTheLan { get; set; }

		public string MaTheFilter { get; set; }

		public string MaKhachHangFilter { get; set; }

		public string PhoneFilter { get; set; }

		public int ApDungTatCaSanPhamFilter { get; set; }

		public int HuyTheFilter { get; set; }

		public string DM_NhomTheTenNhomTheFilter { get; set; }

		public string DM_DoiTuongTenDoiTuongFilter { get; set; }

		public string DM_TienTeTenNgoaiTeFilter { get; set; }

		public string UserNameFilter { get; set; }

		public string OrganizationUnitDisplayNameFilter { get; set; }

		public string DM_DacDiemKhachHangTenDacDiemFilter { get; set; }

		public string DM_LienHeMaLienHeFilter { get; set; }

		public string DM_DoiTuongPhoneFilter { get; set; }

		public string DM_DoiTuongDiaChiFilter { get; set; }

		public string DM_DoiTuongCMTFilter { get; set; }

		public string DM_DoiTuongMaFilter { get; set; }

		public string MaVoucherFilter { get; set; }
	}

}
