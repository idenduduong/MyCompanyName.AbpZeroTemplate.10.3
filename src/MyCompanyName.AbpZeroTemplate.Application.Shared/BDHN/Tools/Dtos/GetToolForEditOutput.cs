using System;
using System.Collections.Generic;
using System.Text;

namespace MyCompanyName.AbpZeroTemplate.BDHN.Dtos
{
    public class GetToolForEditOutput
    {
        public CreateOrEditToolDto Tool { get; set; }

        public string PosName { get; set; }

        public string OrganizationUnitDisplayName { get; set; }
    }
}
