using System;
using System.Collections.Generic;
using System.Text;
using MyCompanyName.Localization;
using Volo.Abp.Application.Services;

namespace MyCompanyName
{
    /* Inherit your application services from this class.
     */
    public abstract class MyCompanyNameAppService : ApplicationService
    {
        protected MyCompanyNameAppService()
        {
            LocalizationResource = typeof(MyCompanyNameResource);
        }
    }
}
