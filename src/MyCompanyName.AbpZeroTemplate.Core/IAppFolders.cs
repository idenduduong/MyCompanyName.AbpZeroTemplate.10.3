namespace MyCompanyName.AbpZeroTemplate
{
    public interface IAppFolders
    {
        string SampleProfileImagesFolder { get; }

        string WebLogsFolder { get; set; }

        //  crmdemo
        string TempFileDownloadFolder { get; }

        string TemplateFolder { get; set; }

        string ImportDataFolder { get; set; }

    }
}