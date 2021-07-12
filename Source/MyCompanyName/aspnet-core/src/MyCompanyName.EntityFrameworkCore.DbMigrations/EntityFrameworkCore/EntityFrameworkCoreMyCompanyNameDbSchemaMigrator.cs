using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using MyCompanyName.Data;
using Volo.Abp.DependencyInjection;

namespace MyCompanyName.EntityFrameworkCore
{
    public class EntityFrameworkCoreMyCompanyNameDbSchemaMigrator
        : IMyCompanyNameDbSchemaMigrator, ITransientDependency
    {
        private readonly IServiceProvider _serviceProvider;

        public EntityFrameworkCoreMyCompanyNameDbSchemaMigrator(
            IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public async Task MigrateAsync()
        {
            /* We intentionally resolving the MyCompanyNameMigrationsDbContext
             * from IServiceProvider (instead of directly injecting it)
             * to properly get the connection string of the current tenant in the
             * current scope.
             */

            await _serviceProvider
                .GetRequiredService<MyCompanyNameMigrationsDbContext>()
                .Database
                .MigrateAsync();
        }
    }
}