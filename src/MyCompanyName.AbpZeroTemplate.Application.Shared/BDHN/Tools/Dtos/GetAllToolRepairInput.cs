using System;
using System.Collections.Generic;
using System.Text;
using Abp.Application.Services.Dto;

namespace MyCompanyName.AbpZeroTemplate.BDHN.Dtos
{
	public class GetAllToolRepairInput : PagedAndSortedResultRequestDto
	{
		public string Filter { get; set; }

        public virtual DateTime? RepairFrom { get; set; }

        public virtual DateTime? RepairTo { get; set; }

        public virtual string? Configuration { get; set; }

        public virtual ToolCondition? Condition { get; set; }

        public virtual ToolStatus? ToolStatus { get; set; }

        public virtual string? Note { get; set; }

        public virtual string? POSCode { get; set; }

        public string OrganizationUnitDisplayNameFilter { get; set; }
    }
}
