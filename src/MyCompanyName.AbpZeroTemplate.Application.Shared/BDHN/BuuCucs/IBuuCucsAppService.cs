using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using MyCompanyName.AbpZeroTemplate.BDHN.Dtos;

namespace MyCompanyName.AbpZeroTemplate.BDHN
{
    public interface IBuuCucsAppService : IApplicationService
    {
        Task<PagedResultDto<GetBuuCucForViewDto>> GetAll(GetAllBuuCucInput input);

        Task<GetBuuCucForViewDto> GetForView(Guid id);

        Task<GetBuuCucForEditOutput> GetForEdit(EntityDto<Guid> input);

        Task CreateOrEdit(CreateOrEditBuuCucDto input);

        //Task Delete(EntityDto input);

        //Task<FileDto> GetBaseEntitiesToExcel(GetAllBaseEntitiesForExcelInput input);

        //Task<PagedResultDto<BaseEntityOrganizationUnitLookupTableDto>> GetAllOrganizationUnitForLookupTable(GetAllForLookupTableInput input);
    }
}