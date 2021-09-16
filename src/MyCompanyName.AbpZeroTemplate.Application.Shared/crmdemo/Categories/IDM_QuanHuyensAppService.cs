using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Dependency;
using MyCompanyName.AbpZeroTemplate.crmdemo.Categories.Dtos;
using MyCompanyName.AbpZeroTemplate.crmdemo.Common.Dtos;
using MyCompanyName.AbpZeroTemplate.Dto;
using System;
using System.Threading.Tasks;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Categories
{
    public interface IDM_QuanHuyensAppService : IApplicationService, ITransientDependency
    {
        Task<PagedResultDto<GetDM_QuanHuyenForView>> GetAll(GetAllDM_QuanHuyensInput input);

        Task<GetDM_QuanHuyenForEditOutput> GetDM_QuanHuyenForEdit(EntityDto<Guid> input);

        Task CreateOrEdit(CreateOrEditDM_QuanHuyenDto input);

        Task Delete(EntityDto<Guid> input);

        Task<FileDto> GetDM_QuanHuyensToExcel(GetAllDM_QuanHuyensForExcelInput input);

        Task<PagedResultDto<DM_TinhThanhLookupTableDto>> GetAllDM_TinhThanhForLookupTable(GetAllForLookupTableInput input);
    }
}
