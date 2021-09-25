using MyCompanyName.AbpZeroTemplate.BDHN.Dtos;
using System;

namespace MyCompanyName.AbpZeroTemplate.BDHN.Dtos
{
    public class GetBuuCucForEditOutput
    {
        public CreateOrEditBuuCucDto BuuCuc { get; set; }

        public string OrganizationUnitDisplayName { get; set; }
    }
}