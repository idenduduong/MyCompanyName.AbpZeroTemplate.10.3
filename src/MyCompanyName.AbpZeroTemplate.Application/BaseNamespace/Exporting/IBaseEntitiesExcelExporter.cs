using System.Collections.Generic;
using MyCompanyName.AbpZeroTemplate.BaseNamespace.Dtos;
using MyCompanyName.AbpZeroTemplate.Dto;

namespace MyCompanyName.AbpZeroTemplate.BaseNamespace.Exporting
{
    public interface IBaseEntitiesExcelExporter
    {
        FileDto ExportToFile(List<GetBaseEntityForViewDto> baseEntities);
    }
}