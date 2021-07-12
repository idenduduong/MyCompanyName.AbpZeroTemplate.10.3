using MyCompanyName.Localization;
using Volo.Abp.AspNetCore.Mvc;

namespace MyCompanyName.Controllers
{
    /* Inherit your controllers from this class.
     */
    public abstract class MyCompanyNameController : AbpController
    {
        protected MyCompanyNameController()
        {
            LocalizationResource = typeof(MyCompanyNameResource);
        }
    }
}