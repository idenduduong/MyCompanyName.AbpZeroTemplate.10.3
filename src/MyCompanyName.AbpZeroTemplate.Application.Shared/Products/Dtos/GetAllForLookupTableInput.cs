using Abp.Application.Services.Dto;

namespace MyCompanyName.AbpZeroTemplate.Products.Dtos
{
    public class GetAllForLookupTableInput : PagedAndSortedResultRequestDto
    {
        public string Filter { get; set; }
    }
}