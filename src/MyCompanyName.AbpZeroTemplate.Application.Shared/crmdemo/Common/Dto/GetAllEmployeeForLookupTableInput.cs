// crmdemo.Common.Dto.GetAllEmployeeForLookupTableInput
using Abp.Application.Services.Dto;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Common.Dto
{
	public class GetAllEmployeeForLookupTableInput : PagedAndSortedResultRequestDto
	{
		public long OrganizationId { get; set; }

		public string Filter { get; set; }

		public string MaNhanVienFilter { get; set; }

		public string TenNhanVienFilter { get; set; }

		public string TenDonViFilter { get; set; }
	}

}
