using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using MyCompanyName.AbpZeroTemplate.BaseNamespace.Dtos;
using MyCompanyName.AbpZeroTemplate.Dto;

namespace MyCompanyName.AbpZeroTemplate.BaseNamespace
{
    public interface IBaseEntitiesAppService : IApplicationService
    {
        Task<PagedResultDto<GetBaseEntityForViewDto>> GetAll(GetAllBaseEntitiesInput input);

        Task<GetBaseEntityForViewDto> GetBaseEntityForView(int id);

        Task<GetBaseEntityForEditOutput> GetBaseEntityForEdit(EntityDto input);

        Task CreateOrEdit(CreateOrEditBaseEntityDto input);

        Task Delete(EntityDto input);

        Task<FileDto> GetBaseEntitiesToExcel(GetAllBaseEntitiesForExcelInput input);

        Task<PagedResultDto<BaseEntityOrganizationUnitLookupTableDto>> GetAllOrganizationUnitForLookupTable(GetAllForLookupTableInput input);

    }
}