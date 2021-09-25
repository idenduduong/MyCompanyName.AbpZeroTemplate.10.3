using System;
using System.Collections.Generic;
using System.Text;

namespace MyCompanyName.AbpZeroTemplate.BDHN.Dtos
{
    public class  GetProvinceForViewDto
    {
        public ProvinceDto Province { get; set; }

        public string OrganizationUnitDisplayName { get; set; }
    }
}
