﻿using Abp.Application.Services.Dto;
using System;


namespace MyCompanyName.AbpZeroTemplate.BDHN.Dtos
{
    public class ToolDto : FullAuditedEntityDto<Guid>
    {

		public virtual string ToolName { get; set; }

		public virtual ToolType Type { get; set; }

		public virtual string? Serial { get; set; }

		public virtual DateTime? UsedFrom { get; set; }

		public virtual DateTime? UsedTo { get; set; }

		public virtual string? Configuration { get; set; }

		public virtual ToolCondition? Condition { get; set; }

		public virtual ToolStatus? ToolStatus { get; set; }

		public virtual string? Note { get; set; }

		public virtual string? PosCode { get; set; }

		public virtual int? TenantId { get; set; }

		public long? OrganizationUnitId { get; set; }
    }
}