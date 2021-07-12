using System.Threading.Tasks;

namespace MyCompanyName.Data
{
    public interface IMyCompanyNameDbSchemaMigrator
    {
        Task MigrateAsync();
    }
}
