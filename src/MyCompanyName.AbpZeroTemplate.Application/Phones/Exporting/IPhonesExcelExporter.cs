using System.Collections.Generic;
using MyCompanyName.AbpZeroTemplate.Phones.Dtos;
using MyCompanyName.AbpZeroTemplate.Dto;

namespace MyCompanyName.AbpZeroTemplate.Phones.Exporting
{
    public interface IPhonesExcelExporter
    {
        FileDto ExportToFile(List<GetPhoneForViewDto> phones);
    }
}