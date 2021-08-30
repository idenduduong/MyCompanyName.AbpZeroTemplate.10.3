// crmdemo.Common.Dtos.GetAllForLookupTableInput
using Abp.Application.Services.Dto;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Common.Dto
{
	public class GetAllForLookupTableInput : PagedAndSortedResultRequestDto
	{
		public string Filter { get; set; }
	}
}
