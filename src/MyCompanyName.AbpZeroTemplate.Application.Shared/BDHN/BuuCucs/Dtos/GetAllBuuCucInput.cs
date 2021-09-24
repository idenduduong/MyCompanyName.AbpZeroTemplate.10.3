using Abp.Application.Services.Dto;

namespace MyCompanyName.AbpZeroTemplate.BDHN.Dtos
{
    public class GetAllBuuCucInput : PagedAndSortedResultRequestDto
    {
        public string Filter { get; set; }

        public string POSCode { get; set; }

        public string POSName { get; set; }

        public string Address { get; set; }

        public string Tel { get; set; }

        public string OrganizationUnitDisplayNameFilter { get; set; }

    }
}