using MyCompanyName.AbpZeroTemplate.BDHN.Dtos;
using System;

namespace MyCompanyName.AbpZeroTemplate.BDHN.Dtos
{
    public class GetBuuCucForEditOutput
    {
        public CreateOrEditBuuCucDto BuuCuc { get; set; }

        public string ProvinceName { get; set; }

        public string CommuneName { get; set; }

        public string UnitName { get; set; }

        public string OrganizationUnitDisplayName { get; set; }
    }
}