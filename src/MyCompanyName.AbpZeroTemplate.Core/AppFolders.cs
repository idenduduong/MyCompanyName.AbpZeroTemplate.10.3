using Abp.Dependency;

namespace MyCompanyName.AbpZeroTemplate
{
    public class AppFolders : IAppFolders, ISingletonDependency
    {
        public string SampleProfileImagesFolder { get; set; }

        public string WebLogsFolder { get; set; }

        public string TempFileDownloadFolder { get; set; }

        //  crmdemo

        public string TemplateFolder { get; set; }

        public string ImportDataFolder { get; set; }
    }
}