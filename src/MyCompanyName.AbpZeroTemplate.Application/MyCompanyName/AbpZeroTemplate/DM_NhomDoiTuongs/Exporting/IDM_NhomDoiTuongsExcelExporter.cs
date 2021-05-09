using System.Collections.Generic;
using MyCompanyName.AbpZeroTemplate.MyCompanyName.AbpZeroTemplate.DM_NhomDoiTuongs.Dtos;
using MyCompanyName.AbpZeroTemplate.Dto;

namespace MyCompanyName.AbpZeroTemplate.MyCompanyName.AbpZeroTemplate.DM_NhomDoiTuongs.Exporting
{
    public interface IDM_NhomDoiTuongsExcelExporter
    {
        FileDto ExportToFile(List<GetDM_NhomDoiTuongsForViewDto> dM_NhomDoiTuongs);
    }
}