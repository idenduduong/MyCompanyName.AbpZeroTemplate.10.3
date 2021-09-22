using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.Organizations;
using MyCompanyName.AbpZeroTemplate.BDHN.Dtos;
using System;
using System.Threading.Tasks;

namespace MyCompanyName.AbpZeroTemplate.BDHN
{
    public class DM_BuuCucsAppService : AbpZeroTemplateAppServiceBase, IDM_BuuCucsAppService
    {
        private readonly IRepository<DM_BuuCucs, Guid> _dM_BuuCucRepository;
        //private readonly IBaseEntitiesExcelExporter _baseEntitiesExcelExporter;
        private readonly IRepository<OrganizationUnit, long> _lookup_organizationUnitRepository;

        public DM_BuuCucsAppService(IRepository<DM_BuuCucs, Guid> dM_BuuCucRepository, IRepository<OrganizationUnit, long> lookup_organizationUnitRepository)
        {
            _dM_BuuCucRepository = dM_BuuCucRepository;
            _lookup_organizationUnitRepository = lookup_organizationUnitRepository;
        }

        public Task<PagedResultDto<GetBuuCucForViewDto>> GetAll(GetAllBuuCucInput input)
        {
            throw new System.NotImplementedException();
        }
    }
}