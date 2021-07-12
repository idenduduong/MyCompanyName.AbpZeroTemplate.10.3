using Volo.Abp.Modularity;

namespace MyCompanyName
{
    [DependsOn(
        typeof(MyCompanyNameApplicationModule),
        typeof(MyCompanyNameDomainTestModule)
        )]
    public class MyCompanyNameApplicationTestModule : AbpModule
    {

    }
}