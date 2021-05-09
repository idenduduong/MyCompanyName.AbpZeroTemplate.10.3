using Abp.Application.Services.Dto;

namespace MyCompanyName.AbpZeroTemplate.Phones.Dtos
{
    public class GetAllForLookupTableInput : PagedAndSortedResultRequestDto
    {
        public string Filter { get; set; }
    }
}