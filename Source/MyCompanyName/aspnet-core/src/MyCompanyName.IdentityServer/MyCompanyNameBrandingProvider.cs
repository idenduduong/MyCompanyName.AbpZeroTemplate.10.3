using Volo.Abp.Ui.Branding;
using Volo.Abp.DependencyInjection;

namespace MyCompanyName
{
    [Dependency(ReplaceServices = true)]
    public class MyCompanyNameBrandingProvider : DefaultBrandingProvider
    {
        public override string AppName => "MyCompanyName";
    }
}
