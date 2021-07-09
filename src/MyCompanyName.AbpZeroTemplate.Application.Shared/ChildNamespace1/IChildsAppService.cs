using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using MyCompanyName.AbpZeroTemplate.ChildNamespace1.Dtos;
using MyCompanyName.AbpZeroTemplate.Dto;

namespace MyCompanyName.AbpZeroTemplate.ChildNamespace1
{
    public interface IChildsAppService : IApplicationService
    {
        Task<PagedResultDto<GetChildForViewDto>> GetAll(GetAllChildsInput input);

        Task<GetChildForViewDto> GetChildForView(int id);

        Task<GetChildForEditOutput> GetChildForEdit(EntityDto input);

        Task CreateOrEdit(CreateOrEditChildDto input);

        Task Delete(EntityDto input);

        Task<FileDto> GetChildsToExcel(GetAllChildsForExcelInput input);

        Task<PagedResultDto<ChildBaseEntityLookupTableDto>> GetAllBaseEntityForLookupTable(GetAllForLookupTableInput input);

        Task<PagedResultDto<ChildUserLookupTableDto>> GetAllUserForLookupTable(GetAllForLookupTableInput input);

    }
}