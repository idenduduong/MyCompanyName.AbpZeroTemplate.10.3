// crmdemo.Common.Dto.GetAllImportDataListForLookupTableInput
using Abp.Application.Services.Dto;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Common.Dto
{
	public class GetAllImportDataListForLookupTableInput : PagedAndSortedResultRequestDto
	{
		public string Filter { get; set; }
	}
}
