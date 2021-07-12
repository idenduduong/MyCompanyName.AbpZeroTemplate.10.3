using System.Collections.Generic;
using Abp.Localization;

namespace MyCompanyName.AbpZeroTemplate.Web.Areas.qlnv.Models.Layout
{
    public class LanguageSwitchViewModel
    {
        public IReadOnlyList<LanguageInfo> Languages { get; set; }

        public LanguageInfo CurrentLanguage { get; set; }
        
        public string CssClass { get; set; }
    }
}
