﻿using Abp;
using Abp.Dapper;
using Abp.Dependency;
using Abp.EntityFrameworkCore.Configuration;
using Abp.IdentityServer4vNext;
using Abp.Modules;
using Abp.Reflection.Extensions;
using Abp.Zero.EntityFrameworkCore;
using MyCompanyName.AbpZeroTemplate.Configuration;
using MyCompanyName.AbpZeroTemplate.EntityHistory;
using MyCompanyName.AbpZeroTemplate.Migrations.Seed;
using System.Collections.Generic;
using System.Reflection;

namespace MyCompanyName.AbpZeroTemplate.EntityFrameworkCore
{
    [DependsOn(
        typeof(AbpZeroCoreEntityFrameworkCoreModule),
        typeof(AbpZeroTemplateCoreModule),
        typeof(AbpZeroCoreIdentityServervNextEntityFrameworkCoreModule),
        typeof(AbpDapperModule)
        )]
    public class AbpZeroTemplateEntityFrameworkCoreModule : AbpModule
    {
        /* Used it tests to skip DbContext registration, in order to use in-memory database of EF Core */
        public bool SkipDbContextRegistration { get; set; }

        public bool SkipDbSeed { get; set; }

        public override void PreInitialize()
        {
            if (!SkipDbContextRegistration)
            {
                Configuration.Modules.AbpEfCore().AddDbContext<AbpZeroTemplateDbContext>(options =>
                {
                    if (options.ExistingConnection != null)
                    {
                        AbpZeroTemplateDbContextConfigurer.Configure(options.DbContextOptions, options.ExistingConnection);
                    }
                    else
                    {
                        AbpZeroTemplateDbContextConfigurer.Configure(options.DbContextOptions, options.ConnectionString);
                    }
                });
            }

            //  datdd: enabling entity history
            // Set this setting to true for enabling entity history.
            Configuration.EntityHistory.IsEnabled = true;

            // Uncomment below line to write change logs for the entities below:
            // Configuration.EntityHistory.Selectors.Add("AbpZeroTemplateEntities", EntityHistoryHelper.TrackedTypes);
            // Configuration.CustomConfigProviders.Add(new EntityHistoryConfigProvider(Configuration));
            //Configuration.EntityHistory.Selectors.Add("Abp.Domain.Entities.Auditing.FullAuditedEntity", EntityHistoryHelper.TrackedTypes);
            //Configuration.CustomConfigProviders.Add(new EntityHistoryConfigProvider(Configuration));
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(AbpZeroTemplateEntityFrameworkCoreModule).GetAssembly());

            //  datdd: add datafilter to OrganizationUnit

            //register filter with default value
            Configuration.UnitOfWork.RegisterFilter("MayHaveOrganizationUnit", true);

            //dapper
            DapperExtensions.DapperExtensions.SetMappingAssemblies(new List<Assembly> { typeof(AbpZeroTemplateEntityFrameworkCoreModule).GetAssembly() });
            //DapperExtensions.DapperExtensions.SqlDialect = new MySqlDialect ();
        }

        public override void PostInitialize()
        {
            var configurationAccessor = IocManager.Resolve<IAppConfigurationAccessor>();

            using (var scope = IocManager.CreateScope())
            {
                if (!SkipDbSeed && scope.Resolve<DatabaseCheckHelper>().Exist(configurationAccessor.Configuration["ConnectionStrings:Default"]))
                {
                    SeedHelper.SeedHostDb(IocManager);
                }
            }
        }
    }
}
