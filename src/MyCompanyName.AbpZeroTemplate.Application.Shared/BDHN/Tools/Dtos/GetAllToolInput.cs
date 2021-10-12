using System;
using System.Collections.Generic;
using System.Text;
using Abp.Application.Services.Dto;

namespace MyCompanyName.AbpZeroTemplate.BDHN.Dtos
{
    public class GetAllToolInput : PagedAndSortedResultRequestDto
    {
        public string Filter { get; set; }

		public virtual string ToolName { get; set; }

		public virtual ToolType Type { get; set; }

		public virtual string? Serial { get; set; }

		public virtual DateTime? UsedFrom { get; set; }

		public virtual DateTime? UsedTo { get; set; }

		public virtual string? Configuration { get; set; }

		public virtual ToolCondition? Condition { get; set; }

		public virtual ToolStatus? ToolStatus { get; set; }

		public virtual string? Note { get; set; }

		public virtual string? BuuCucCode { get; set; }

		public virtual string? BuuCucName { get; set; }

		public string OrganizationUnitDisplayNameFilter { get; set; }
    }
}
