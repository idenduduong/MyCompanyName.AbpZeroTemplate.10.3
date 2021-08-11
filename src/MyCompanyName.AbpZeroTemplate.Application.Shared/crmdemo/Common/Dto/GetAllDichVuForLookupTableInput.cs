// crmdemo.Common.Dto.GetAllDichVuForLookupTableInput
using Abp.Application.Services.Dto;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Common.Dto
{
	public class GetAllDichVuForLookupTableInput : PagedAndSortedResultRequestDto
	{
		public string TenNhomDichVuFilter { get; set; }

		public string TenDichVuFilter { get; set; }

		public string MaDichVuFilter { get; set; }
	}
}
