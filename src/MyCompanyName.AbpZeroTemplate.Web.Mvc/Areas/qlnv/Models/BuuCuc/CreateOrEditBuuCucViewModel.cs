using MyCompanyName.AbpZeroTemplate.BDHN.Dtos;
using System;
using System.Linq;

namespace MyCompanyName.AbpZeroTemplate.Web.Areas.qlnv.Models.BuuCuc
{
    public class CreateOrEditBuuCucViewModel
    {
        public CreateOrEditBuuCucDto BuuCuc { get; set; }
        
        public string OrganizationUnitDisplayName { get; set; }

        public bool IsEditMode => BuuCuc.Id.HasValue;
    }
}
