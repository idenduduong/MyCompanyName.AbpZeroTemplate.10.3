using System.Collections.Generic;
using Abp.Runtime.Session;
using Abp.Timing.Timezone;
using MyCompanyName.AbpZeroTemplate.DataExporting.Excel.NPOI;
using MyCompanyName.AbpZeroTemplate.ChildNamespace1.Dtos;
using MyCompanyName.AbpZeroTemplate.Dto;
using MyCompanyName.AbpZeroTemplate.Storage;

namespace MyCompanyName.AbpZeroTemplate.ChildNamespace1.Exporting
{
    public class ChildsExcelExporter : NpoiExcelExporterBase, IChildsExcelExporter
    {

        private readonly ITimeZoneConverter _timeZoneConverter;
        private readonly IAbpSession _abpSession;

        public ChildsExcelExporter(
            ITimeZoneConverter timeZoneConverter,
            IAbpSession abpSession,
            ITempFileCacheManager tempFileCacheManager) :
    base(tempFileCacheManager)
        {
            _timeZoneConverter = timeZoneConverter;
            _abpSession = abpSession;
        }

        public FileDto ExportToFile(List<GetChildForViewDto> childs)
        {
            return CreateExcelPackage(
                "Childs.xlsx",
                excelPackage =>
                {

                    var sheet = excelPackage.CreateSheet(L("Childs"));

                    AddHeader(
                        sheet,
                        L("ChildProp1"),
                        (L("BaseEntity")) + L("BaseProp1"),
                        (L("User")) + L("Name")
                        );

                    AddObjects(
                        sheet, 2, childs,
                        _ => _.Child.ChildProp1,
                        _ => _.BaseEntityBaseProp1,
                        _ => _.UserName
                        );

                });
        }
    }
}