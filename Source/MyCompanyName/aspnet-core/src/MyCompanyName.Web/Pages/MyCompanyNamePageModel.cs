using MyCompanyName.Localization;
using Volo.Abp.AspNetCore.Mvc.UI.RazorPages;

namespace MyCompanyName.Web.Pages
{
    public abstract class MyCompanyNamePageModel : AbpPageModel
    {
        protected MyCompanyNamePageModel()
        {
            LocalizationResourceType = typeof(MyCompanyNameResource);
        }
    }
}