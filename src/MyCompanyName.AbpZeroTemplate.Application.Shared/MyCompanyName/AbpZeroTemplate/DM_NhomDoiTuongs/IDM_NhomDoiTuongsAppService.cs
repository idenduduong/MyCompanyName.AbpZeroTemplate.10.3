using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using MyCompanyName.AbpZeroTemplate.MyCompanyName.AbpZeroTemplate.DM_NhomDoiTuongs.Dtos;
using MyCompanyName.AbpZeroTemplate.Dto;

namespace MyCompanyName.AbpZeroTemplate.MyCompanyName.AbpZeroTemplate.DM_NhomDoiTuongs
{
    public interface IDM_NhomDoiTuongsAppService : IApplicationService
    {
        Task<PagedResultDto<GetDM_NhomDoiTuongsForViewDto>> GetAll(GetAllDM_NhomDoiTuongsInput input);

        Task<GetDM_NhomDoiTuongsForViewDto> GetDM_NhomDoiTuongsForView(Guid id);

        Task<GetDM_NhomDoiTuongsForEditOutput> GetDM_NhomDoiTuongsForEdit(EntityDto<Guid> input);

        Task CreateOrEdit(CreateOrEditDM_NhomDoiTuongsDto input);

        Task Delete(EntityDto<Guid> input);

        Task<FileDto> GetDM_NhomDoiTuongsToExcel(GetAllDM_NhomDoiTuongsForExcelInput input);

    }
}