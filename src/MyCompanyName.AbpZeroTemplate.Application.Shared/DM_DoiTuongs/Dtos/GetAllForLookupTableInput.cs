using Abp.Application.Services.Dto;

namespace MyCompanyName.AbpZeroTemplate.DM_DoiTuongs.Dtos
{
    public class GetAllForLookupTableInput : PagedAndSortedResultRequestDto
    {
        public string Filter { get; set; }
    }
}