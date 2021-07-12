using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;

namespace MyCompanyName.Data
{
    /* This is used if database provider does't define
     * IMyCompanyNameDbSchemaMigrator implementation.
     */
    public class NullMyCompanyNameDbSchemaMigrator : IMyCompanyNameDbSchemaMigrator, ITransientDependency
    {
        public Task MigrateAsync()
        {
            return Task.CompletedTask;
        }
    }
}