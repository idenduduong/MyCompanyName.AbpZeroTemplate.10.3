﻿using System;
using System.Collections.Generic;
using System.Text;

namespace MyCompanyName.AbpZeroTemplate.BDHN.Dtos
{
    public class GetToolRepairForViewDto
    {
        public ToolTransferHistoryDto ToolTransferHistory { get; set; }

        public string ToolName { get; set; }

        public string Serial { get; set; }

        public string OrganizationUnitDisplayName { get; set; }
    }
}
