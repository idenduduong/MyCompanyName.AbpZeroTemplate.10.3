using MyCompanyName.EntityFrameworkCore;
using Volo.Abp.Modularity;

namespace MyCompanyName
{
    [DependsOn(
        typeof(MyCompanyNameEntityFrameworkCoreTestModule)
        )]
    public class MyCompanyNameDomainTestModule : AbpModule
    {

    }
}