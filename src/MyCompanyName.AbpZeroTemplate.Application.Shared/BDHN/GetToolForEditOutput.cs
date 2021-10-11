using System;
using System.Collections.Generic;
using System.Text;

namespace MyCompanyName.AbpZeroTemplate.BDHN.Dtos
{
    public class GetToolForEditOutput
    {
        public CreateOrEditToolDto BuuCuc { get; set; }

        public string ProvinceName { get; set; }

        public string CommuneName { get; set; }

        public string UnitName { get; set; }

        public string OrganizationUnitDisplayName { get; set; }
    }
}
