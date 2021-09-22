using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using MyCompanyName.AbpZeroTemplate.BDHN.Dtos;

namespace MyCompanyName.AbpZeroTemplate.BDHN
{
    public interface IDM_BuuCucsAppService : IApplicationService
    {
        Task<PagedResultDto<GetBuuCucForViewDto>> GetAll(GetAllBuuCucInput input);

        //Task<GetBaseEntityForViewDto> GetBaseEntityForView(int id);

        //Task<GetBaseEntityForEditOutput> GetBaseEntityForEdit(EntityDto input);

        //Task CreateOrEdit(CreateOrEditBaseEntityDto input);

        //Task Delete(EntityDto input);

        //Task<FileDto> GetBaseEntitiesToExcel(GetAllBaseEntitiesForExcelInput input);

        //Task<PagedResultDto<BaseEntityOrganizationUnitLookupTableDto>> GetAllOrganizationUnitForLookupTable(GetAllForLookupTableInput input);
    }
}