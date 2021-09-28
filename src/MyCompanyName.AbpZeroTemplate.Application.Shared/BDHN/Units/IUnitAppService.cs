using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using MyCompanyName.AbpZeroTemplate.BDHN.Dtos;

namespace MyCompanyName.AbpZeroTemplate.BDHN.Units
{
    public interface IUnitAppService : IApplicationService
    {
        Task<PagedResultDto<GetUnitForViewDto>> GetAll(GetAllUnitInput input);
    }
}
