using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.Modularity;

namespace MyCompanyName.EntityFrameworkCore
{
    [DependsOn(
        typeof(MyCompanyNameEntityFrameworkCoreModule)
        )]
    public class MyCompanyNameEntityFrameworkCoreDbMigrationsModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            context.Services.AddAbpDbContext<MyCompanyNameMigrationsDbContext>();
        }
    }
}
