using System;
using System.Collections.Generic;
using System.Text;

namespace MyCompanyName.AbpZeroTemplate.BDHN.Dtos
{
    public class GetUnitForViewDto
    {
        public UnitDto Unit { get; set; }

        public string OrganizationUnitDisplayName { get; set; }
    }
}
