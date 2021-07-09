using MyCompanyName.AbpZeroTemplate.ChildNamespace1.Dtos;

using Abp.Extensions;

namespace MyCompanyName.AbpZeroTemplate.Web.Areas.AppAreaName.Models.Childs
{
    public class MasterDetailChild_BaseEntity_CreateOrEditChildModalViewModel
    {
        public CreateOrEditChildDto Child { get; set; }

        public string UserName { get; set; }

        public bool IsEditMode => Child.Id.HasValue;
    }
}