using System;
using System.Collections.Generic;
using System.Text;

namespace MyCompanyName.AbpZeroTemplate.BDHN.Dtos
{
    public class GetToolTransferHistoryForViewDto
    {
        public ToolTransferHistoryDto ToolTransferHistory { get; set; }



        public string OrganizationUnitDisplayName { get; set; }
    }
}
