using MyCompanyName.AbpZeroTemplate.crmdemo.Common.Dtos;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Sale.Dtos
{
	public class GetAllKhachHangForLookupTableInput : GetAllForLookupTableInput
	{
		public string CMTFilter { get; set; }

		public string PhoneFilter { get; set; }

		public string MaKhachHangFilter { get; set; }

		public string TenKhachHangFilter { get; set; }
	}

}
