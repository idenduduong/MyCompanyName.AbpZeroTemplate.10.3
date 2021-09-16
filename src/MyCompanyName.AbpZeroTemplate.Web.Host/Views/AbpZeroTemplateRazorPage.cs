using Abp.AspNetCore.Mvc.Views;
using Abp.Runtime.Session;
using Microsoft.AspNetCore.Mvc.Razor.Internal;

namespace MyCompanyName.AbpZeroTemplate.Web.Views
{
#pragma warning disable CS1591 // Missing XML comment for publicly visible type or member
    public abstract class AbpZeroTemplateRazorPage<TModel> : AbpRazorPage<TModel>
#pragma warning restore CS1591 // Missing XML comment for publicly visible type or member
    {
        [RazorInject]
#pragma warning disable CS1591 // Missing XML comment for publicly visible type or member
        public IAbpSession AbpSession { get; set; }
#pragma warning restore CS1591 // Missing XML comment for publicly visible type or member

#pragma warning disable CS1591 // Missing XML comment for publicly visible type or member
        protected AbpZeroTemplateRazorPage()
#pragma warning restore CS1591 // Missing XML comment for publicly visible type or member
        {
            LocalizationSourceName = AbpZeroTemplateConsts.LocalizationSourceName;
        }
    }
}