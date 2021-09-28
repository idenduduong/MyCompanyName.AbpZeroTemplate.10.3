using Abp.Application.Services.Dto;
using Abp.Organizations;

namespace MyCompanyName.AbpZeroTemplate.BDHN.Dtos
{
    public class GetAllUnitInput : PagedAndSortedResultRequestDto
    {
        public string Filter { get; set; }

        public virtual string UnitCode { get; set; }

        public virtual string UnitName { get; set; }

        public virtual string ParentUnitCode { get; set; }

        public virtual string CommuneCode { get; set; }

        
        public virtual string UnitTypeCode { get; set; }

        public virtual long? OrganizationUnitId { get; set; }

        public string OrganizationUnitDisplayNameFilter { get; set; }
    }
}
