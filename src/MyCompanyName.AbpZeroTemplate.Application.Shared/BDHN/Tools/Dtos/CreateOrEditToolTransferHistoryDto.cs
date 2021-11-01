using System;
using Abp.Application.Services.Dto;
using System.ComponentModel.DataAnnotations;
namespace MyCompanyName.AbpZeroTemplate.BDHN.Dtos
{
    public class CreateOrEditToolTransferHistoryDto : FullAuditedEntityDto<Guid?>
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
