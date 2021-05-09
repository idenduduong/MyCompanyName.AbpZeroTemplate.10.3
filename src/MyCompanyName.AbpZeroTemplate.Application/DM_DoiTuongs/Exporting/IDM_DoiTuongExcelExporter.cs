using System.Collections.Generic;
using MyCompanyName.AbpZeroTemplate.DM_DoiTuongs.Dtos;
using MyCompanyName.AbpZeroTemplate.Dto;

namespace MyCompanyName.AbpZeroTemplate.DM_DoiTuongs.Exporting
{
    public interface IDM_DoiTuongExcelExporter
    {
        FileDto ExportToFile(List<GetDM_DoiTuongForViewDto> dM_DoiTuong);
    }
}