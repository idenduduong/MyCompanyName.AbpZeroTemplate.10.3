using System.Collections.Generic;
using Abp.Runtime.Session;
using Abp.Timing.Timezone;
using MyCompanyName.AbpZeroTemplate.DataExporting.Excel.NPOI;
using MyCompanyName.AbpZeroTemplate.Phones.Dtos;
using MyCompanyName.AbpZeroTemplate.Dto;
using MyCompanyName.AbpZeroTemplate.Storage;

namespace MyCompanyName.AbpZeroTemplate.Phones.Exporting
{
    public class PhonesExcelExporter : NpoiExcelExporterBase, IPhonesExcelExporter
    {

        private readonly ITimeZoneConverter _timeZoneConverter;
        private readonly IAbpSession _abpSession;

        public PhonesExcelExporter(
            ITimeZoneConverter timeZoneConverter,
            IAbpSession abpSession,
            ITempFileCacheManager tempFileCacheManager) :
    base(tempFileCacheManager)
        {
            _timeZoneConverter = timeZoneConverter;
            _abpSession = abpSession;
        }

        public FileDto ExportToFile(List<GetPhoneForViewDto> phones)
        {
            return CreateExcelPackage(
                "Phones.xlsx",
                excelPackage =>
                {

                    var sheet = excelPackage.CreateSheet(L("Phones"));

                    AddHeader(
                        sheet,
                        L("PhoneId"),
                        L("isDelete"),
                        L("Name"),
                        L("Mobile")
                        );

                    AddObjects(
                        sheet, 2, phones,
                        _ => _.Phone.PhoneId,
                        _ => _.Phone.isDelete,
                        _ => _.Phone.Name,
                        _ => _.Phone.Mobile
                        );

                });
        }
    }
}