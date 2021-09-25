using System;
using System.Collections.Generic;
using System.Text;

namespace MyCompanyName.AbpZeroTemplate.BDHN.Dtos
{
    public class GetDistrictForViewDto
    {
        public DistrictDto District { get; set; }

        public string OrganizationUnitDisplayName { get; set; }
    }
}
