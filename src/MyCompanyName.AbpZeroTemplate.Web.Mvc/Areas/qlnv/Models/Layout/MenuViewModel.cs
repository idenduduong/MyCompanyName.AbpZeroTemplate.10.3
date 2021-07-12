using Abp.Application.Navigation;

namespace MyCompanyName.AbpZeroTemplate.Web.Areas.qlnv.Models.Layout
{
    public class MenuViewModel
    {
        public UserMenu Menu { get; set; }

        public string CurrentPageName { get; set; }
    }
}