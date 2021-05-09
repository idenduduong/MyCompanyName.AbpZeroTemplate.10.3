using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using MyCompanyName.AbpZeroTemplate.DM_DoiTuongs.Dtos;
using MyCompanyName.AbpZeroTemplate.Dto;

namespace MyCompanyName.AbpZeroTemplate.DM_DoiTuongs
{
    public interface IDM_DoiTuongAppService : IApplicationService
    {
        Task<PagedResultDto<GetDM_DoiTuongForViewDto>> GetAll(GetAllDM_DoiTuongInput input);

        Task<GetDM_DoiTuongForViewDto> GetDM_DoiTuongForView(Guid id);

        Task<GetDM_DoiTuongForEditOutput> GetDM_DoiTuongForEdit(EntityDto<Guid> input);

        Task CreateOrEdit(CreateOrEditDM_DoiTuongDto input);

        Task Delete(EntityDto<Guid> input);

        Task<FileDto> GetDM_DoiTuongToExcel(GetAllDM_DoiTuongForExcelInput input);

    }
}