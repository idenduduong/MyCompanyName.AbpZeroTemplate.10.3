using Abp.Application.Navigation;

namespace MyCompanyName.AbpZeroTemplate.Web.Areas.qlnv.Views.Shared.Components.qlnvMenu
{
    public class UserMenuItemViewModel
    {
        public UserMenuItem MenuItem { get; set; }

        public string CurrentPageName { get; set; }

        public int MenuItemIndex { get; set; }

        public int ItemDepth { get; set; }

        public bool RootLevel { get; set; }
        
        public bool IsTabMenuUsed { get; set; }
    }
}
