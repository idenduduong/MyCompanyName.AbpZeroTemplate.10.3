using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using MyCompanyName.AbpZeroTemplate.BDHN.Dtos;

namespace MyCompanyName.AbpZeroTemplate.BDHN
{
    public interface IUnitsAppService : IApplicationService
    {
        Task<PagedResultDto<GetUnitForViewDto>> GetAll(GetAllUnitInput input);
    }
}
