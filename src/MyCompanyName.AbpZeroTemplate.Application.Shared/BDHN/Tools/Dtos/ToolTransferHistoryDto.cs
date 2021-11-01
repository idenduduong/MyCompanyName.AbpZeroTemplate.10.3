using Abp.Application.Services.Dto;
using System;

namespace MyCompanyName.AbpZeroTemplate.BDHN.Dtos
{
    public class ToolTransferHistoryDto : FullAuditedEntityDto<Guid>
    {
        public virtual string? From { get; set; }

        public virtual string? To { get; set; }

        public virtual DateTime? UsedFrom { get; set; }

        public virtual DateTime? UsedTo { get; set; }

        public virtual string? Configuration { get; set; }

        public virtual ToolCondition? Condition { get; set; }

        public virtual ToolStatus? ToolStatus { get; set; }

        public virtual string? Note { get; set; }

        public virtual string? FromPOSCode { get; set; }

        public virtual string? ToPOSCode { get; set; }

    }
}
