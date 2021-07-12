using Microsoft.EntityFrameworkCore;
using Volo.Abp;

namespace MyCompanyName.EntityFrameworkCore
{
    public static class MyCompanyNameDbContextModelCreatingExtensions
    {
        public static void ConfigureMyCompanyName(this ModelBuilder builder)
        {
            Check.NotNull(builder, nameof(builder));

            /* Configure your own tables/entities inside here */

            //builder.Entity<YourEntity>(b =>
            //{
            //    b.ToTable(MyCompanyNameConsts.DbTablePrefix + "YourEntities", MyCompanyNameConsts.DbSchema);
            //    b.ConfigureByConvention(); //auto configure for the base class props
            //    //...
            //});
        }
    }
}