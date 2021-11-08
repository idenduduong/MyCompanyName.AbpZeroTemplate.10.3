using System;
using System.Collections.Generic;
using System.Text;

namespace MyCompanyName.AbpZeroTemplate.BDHN.Dtos
{
    public class GetToolRepairForViewDto
    {
        public ToolRepairHistoryDto ToolRepairHistory { get; set; }

        public virtual Guid? ToolId { get; set; }

        public string? ToolName { get; set; }

        public string? Serial { get; set; }

        public virtual DateTime? UsedFrom { get; set; }

        public int? Type { get; set; }

        public string? OrganizationUnitDisplayName { get; set; }
    }
}
