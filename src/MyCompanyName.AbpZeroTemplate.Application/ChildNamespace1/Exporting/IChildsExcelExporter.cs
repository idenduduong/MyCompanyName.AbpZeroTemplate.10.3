using System.Collections.Generic;
using MyCompanyName.AbpZeroTemplate.ChildNamespace1.Dtos;
using MyCompanyName.AbpZeroTemplate.Dto;

namespace MyCompanyName.AbpZeroTemplate.ChildNamespace1.Exporting
{
    public interface IChildsExcelExporter
    {
        FileDto ExportToFile(List<GetChildForViewDto> childs);
    }
}