using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using MyCompanyName.AbpZeroTemplate.BDHN.Dtos;

namespace MyCompanyName.AbpZeroTemplate.BDHN
{
    public interface ICommunesAppService : IApplicationService
    {
        Task<PagedResultDto<GetCommuneForViewDto>> GetAll(GetAllCommuneInput input);

        Task<PagedResultDto<CommuneDistrictLookupTableDto>> GetAllCommuneDistrictForLookupTable(GetAllForLookupTableInput input);
    }
}
