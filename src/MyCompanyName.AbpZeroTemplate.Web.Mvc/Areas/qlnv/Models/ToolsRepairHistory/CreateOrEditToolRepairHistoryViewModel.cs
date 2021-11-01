using MyCompanyName.AbpZeroTemplate.BDHN.Dtos;
using System;
using System.Linq;

namespace MyCompanyName.AbpZeroTemplate.Web.Areas.qlnv.Models
{
    public class CreateOrEditToolRepairHistoryViewModel
    {
        public CreateOrEditToolRepairHistoryDto Tool { get; set; }

        public string ToolName { get; set; }

        public string OrganizationUnitDisplayName { get; set; }

        public bool IsEditMode => Tool.Id.HasValue;
    }
}
