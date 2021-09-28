using MyCompanyName.AbpZeroTemplate.BDHN.Dtos;
using System;
using System.Linq;

namespace MyCompanyName.AbpZeroTemplate.Web.Areas.qlnv.Models
{
    public class CreateOrEditBuuCucViewModel
    {
        public CreateOrEditBuuCucDto BuuCuc { get; set; }

        public string ProvinceName { get; set; }

        public string CommuneName { get; set; }

        public string UnitName { get; set; }

        public string OrganizationUnitDisplayName { get; set; }

        public bool IsEditMode => BuuCuc.Id.HasValue;
    }
}
