using MyCompanyName.AbpZeroTemplate.BDHN.Dtos;

namespace MyCompanyName.AbpZeroTemplate.Web.Areas.qlnv.Models
{
    public class ToolRepairHistoryViewModel : GetToolRepairForViewDto
    {
        public string FilterText { get; set; }
    }
}
