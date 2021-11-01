using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using MyCompanyName.AbpZeroTemplate.BDHN.Dtos;

namespace MyCompanyName.AbpZeroTemplate.BDHN
{
    public interface IToolsRepairHistory : IApplicationService
    {
        Task<PagedResultDto<GetToolRepairForViewDto>> GetAll(GetAllToolRepairInput input);

        Task<GetToolRepairForViewDto> GetForView(Guid id);

        Task<GetToolRepairForEditOutput> GetForEdit(EntityDto<Guid> input);

        Task CreateOrEdit(CreateOrEditToolRepairHistoryDto input);

        Task Delete(EntityDto<Guid> input);

        //Task<PagedResultDto<BuuCucUnitLookupTableDto>> GetAllPosForLookupTable(GetAllForLookupTableInput input);

        //Task<PagedResultDto<BuuCucUnitLookupTableDto>> GetAllUnitForLookupTable(GetAllForLookupTableInput input);
    }
}
