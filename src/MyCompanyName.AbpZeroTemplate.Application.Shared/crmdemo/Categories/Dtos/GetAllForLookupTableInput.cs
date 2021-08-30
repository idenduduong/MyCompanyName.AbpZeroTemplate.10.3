// crmdemo.Common.Dtos.GetAllForLookupTableInput
using Abp.Application.Services.Dto;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Categories.Dtos
{
	public class GetAllForLookupTableInput : PagedAndSortedResultRequestDto
	{
		public string Filter { get; set; }
	}
}
