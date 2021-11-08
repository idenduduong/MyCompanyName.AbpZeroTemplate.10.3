﻿using Abp.Application.Services.Dto;
using System;

namespace MyCompanyName.AbpZeroTemplate.BDHN.Dtos
{
    public class ToolRepairHistoryDto : FullAuditedEntityDto<Guid>
    {
        public virtual DateTime? RepairFrom { get; set; }

        public virtual DateTime? RepairTo { get; set; }

        public virtual string? Configuration { get; set; }

        public virtual ToolCondition? Condition { get; set; }

        public virtual ToolStatus? ToolStatus { get; set; }

        public virtual string? Note { get; set; }

        public virtual string? POSCode { get; set; }

        public virtual string? POSName { get; set; }


    }
}
