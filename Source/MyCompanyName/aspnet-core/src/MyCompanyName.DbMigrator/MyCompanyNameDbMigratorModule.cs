using MyCompanyName.EntityFrameworkCore;
using Volo.Abp.Autofac;
using Volo.Abp.BackgroundJobs;
using Volo.Abp.Modularity;

namespace MyCompanyName.DbMigrator
{
    [DependsOn(
        typeof(AbpAutofacModule),
        typeof(MyCompanyNameEntityFrameworkCoreDbMigrationsModule),
        typeof(MyCompanyNameApplicationContractsModule)
        )]
    public class MyCompanyNameDbMigratorModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            Configure<AbpBackgroundJobOptions>(options => options.IsJobExecutionEnabled = false);
        }
    }
}
