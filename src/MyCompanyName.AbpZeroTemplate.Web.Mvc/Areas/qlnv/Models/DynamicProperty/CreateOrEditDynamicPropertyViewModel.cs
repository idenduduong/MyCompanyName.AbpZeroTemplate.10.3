using System.Collections.Generic;
using MyCompanyName.AbpZeroTemplate.DynamicEntityProperties.Dto;

namespace MyCompanyName.AbpZeroTemplate.Web.Areas.qlnv.Models.DynamicProperty
{
    public class CreateOrEditDynamicPropertyViewModel
    {
        public DynamicPropertyDto DynamicPropertyDto { get; set; }

        public List<string> AllowedInputTypes { get; set; }
    }
}
