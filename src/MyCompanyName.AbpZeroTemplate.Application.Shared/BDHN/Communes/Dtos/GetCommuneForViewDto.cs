using System;
using System.Collections.Generic;
using System.Text;

namespace MyCompanyName.AbpZeroTemplate.BDHN.Dtos
{
    public class GetCommuneForViewDto
    {
        public CommuneDto Commune { get; set; }

        public string OrganizationUnitDisplayName { get; set; }
    }
}
