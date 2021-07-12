using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace MyCompanyName.EntityFrameworkCore
{
    /* This class is needed for EF Core console commands
     * (like Add-Migration and Update-Database commands) */
    public class MyCompanyNameMigrationsDbContextFactory : IDesignTimeDbContextFactory<MyCompanyNameMigrationsDbContext>
    {
        public MyCompanyNameMigrationsDbContext CreateDbContext(string[] args)
        {
            MyCompanyNameEfCoreEntityExtensionMappings.Configure();

            var configuration = BuildConfiguration();

            var builder = new DbContextOptionsBuilder<MyCompanyNameMigrationsDbContext>()
                .UseSqlServer(configuration.GetConnectionString("Default"));

            return new MyCompanyNameMigrationsDbContext(builder.Options);
        }

        private static IConfigurationRoot BuildConfiguration()
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), "../MyCompanyName.DbMigrator/"))
                .AddJsonFile("appsettings.json", optional: false);

            return builder.Build();
        }
    }
}
