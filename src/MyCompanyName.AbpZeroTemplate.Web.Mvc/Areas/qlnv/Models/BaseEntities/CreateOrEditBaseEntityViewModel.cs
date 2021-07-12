using MyCompanyName.AbpZeroTemplate.BaseNamespace.Dtos;

using Abp.Extensions;

namespace MyCompanyName.AbpZeroTemplate.Web.Areas.qlnv.Models.BaseEntities
{
    public class CreateOrEditBaseEntityModalViewModel
    {
        public CreateOrEditBaseEntityDto BaseEntity { get; set; }

        public string OrganizationUnitDisplayName { get; set; }

        public bool IsEditMode => BaseEntity.Id.HasValue;
    }
}