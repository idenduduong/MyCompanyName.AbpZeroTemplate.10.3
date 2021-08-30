// crmdemo.Common.Dto.GetAllDM_NgheNghiepForLookupTableInput
using Abp.Application.Services.Dto;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Common.Dto
{
	public class GetAllDM_NgheNghiepForLookupTableInput : PagedAndSortedResultRequestDto
	{
		public string Filter { get; set; }
	}
}
