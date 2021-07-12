using MyCompanyName.AbpZeroTemplate.ChildNamespace1.Dtos;

using Abp.Extensions;

namespace MyCompanyName.AbpZeroTemplate.Web.Areas.qlnv.Models.Childs
{
    public class CreateOrEditChildModalViewModel
    {
        public CreateOrEditChildDto Child { get; set; }

        public string BaseEntityBaseProp1 { get; set; }

        public string UserName { get; set; }

        public bool IsEditMode => Child.Id.HasValue;
    }
}