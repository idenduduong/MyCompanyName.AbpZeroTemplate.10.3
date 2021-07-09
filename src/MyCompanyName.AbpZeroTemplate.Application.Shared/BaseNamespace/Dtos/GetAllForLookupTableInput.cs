using Abp.Application.Services.Dto;

namespace MyCompanyName.AbpZeroTemplate.BaseNamespace.Dtos
{
    public class GetAllForLookupTableInput : PagedAndSortedResultRequestDto
    {
        public string Filter { get; set; }
    }
}