using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using MyCompanyName.AbpZeroTemplate.BDHN.Dtos;

namespace MyCompanyName.AbpZeroTemplate.BDHN
{
    public interface IRegionsAppService : IApplicationService
    {
        Task<PagedResultDto<GetRegionForViewDto>> GetAll(GetAllRegionInput input);
    }
}
