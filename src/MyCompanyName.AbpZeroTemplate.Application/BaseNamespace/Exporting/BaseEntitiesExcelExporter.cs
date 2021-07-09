using System.Collections.Generic;
using Abp.Runtime.Session;
using Abp.Timing.Timezone;
using MyCompanyName.AbpZeroTemplate.DataExporting.Excel.NPOI;
using MyCompanyName.AbpZeroTemplate.BaseNamespace.Dtos;
using MyCompanyName.AbpZeroTemplate.Dto;
using MyCompanyName.AbpZeroTemplate.Storage;

namespace MyCompanyName.AbpZeroTemplate.BaseNamespace.Exporting
{
    public class BaseEntitiesExcelExporter : NpoiExcelExporterBase, IBaseEntitiesExcelExporter
    {

        private readonly ITimeZoneConverter _timeZoneConverter;
        private readonly IAbpSession _abpSession;

        public BaseEntitiesExcelExporter(
            ITimeZoneConverter timeZoneConverter,
            IAbpSession abpSession,
            ITempFileCacheManager tempFileCacheManager) :
    base(tempFileCacheManager)
        {
            _timeZoneConverter = timeZoneConverter;
            _abpSession = abpSession;
        }

        public FileDto ExportToFile(List<GetBaseEntityForViewDto> baseEntities)
        {
            return CreateExcelPackage(
                "BaseEntities.xlsx",
                excelPackage =>
                {

                    var sheet = excelPackage.CreateSheet(L("BaseEntities"));

                    AddHeader(
                        sheet,
                        L("BaseProp1"),
                        (L("OrganizationUnit")) + L("DisplayName")
                        );

                    AddObjects(
                        sheet, 2, baseEntities,
                        _ => _.BaseEntity.BaseProp1,
                        _ => _.OrganizationUnitDisplayName
                        );

                });
        }
    }
}