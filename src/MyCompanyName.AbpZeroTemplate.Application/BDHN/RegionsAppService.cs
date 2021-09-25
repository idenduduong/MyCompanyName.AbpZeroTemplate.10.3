using Abp.Application.Services.Dto;
using Abp.Collections.Extensions;
using Abp.Domain.Repositories;
using Abp.Linq.Extensions;
using Abp.Organizations;
using Microsoft.EntityFrameworkCore;
using MyCompanyName.AbpZeroTemplate.BDHN.Dtos;
using System;
using System.Collections.Generic;

using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;

namespace MyCompanyName.AbpZeroTemplate.BDHN
{
    public class RegionsAppService : AbpZeroTemplateAppServiceBase, IRegionsAppService
    {
        private readonly IRepository<Region, Guid> _repository;
        //private readonly IBaseEntitiesExcelExporter _baseEntitiesExcelExporter;
        private readonly IRepository<OrganizationUnit, long> _lookup_organizationUnitRepository;

        public RegionsAppService(IRepository<Region, Guid> repository, IRepository<OrganizationUnit, long> lookup_organizationUnitRepository)
        {
            _repository = repository;
            _lookup_organizationUnitRepository = lookup_organizationUnitRepository;
        }

        public async Task<PagedResultDto<GetRegionForViewDto>> GetAll(GetAllRegionInput input)
        {
            var entityRepository = IsGranted("Filter.OrganizationUnit") ?
                _repository.GetAll().Include(e => e.OrganizationUnitFk) :
                _repository.GetAll().Include(e => e.OrganizationUnitFk).IgnoreQueryFilters();

            var filteredEntities = entityRepository
                .Where(e => !e.IsDeleted)
                .WhereIf(!string.IsNullOrWhiteSpace(input.Filter), e => false || e.RegionName.Contains(input.Filter))
                .WhereIf(!string.IsNullOrWhiteSpace(input.RegionCode), e => e.RegionCode == input.RegionCode)
                .WhereIf(!string.IsNullOrWhiteSpace(input.RegionName), e => e.RegionName == input.RegionName)
                .WhereIf(!string.IsNullOrWhiteSpace(input.Description), e => e.Description == input.Description)
                .WhereIf(!string.IsNullOrWhiteSpace(input.OrganizationUnitDisplayNameFilter), e => e.OrganizationUnitFk != null && e.OrganizationUnitFk.DisplayName == input.OrganizationUnitDisplayNameFilter)
                ;

            var pagedAndFilteredBaseEntities = filteredEntities
                .OrderBy(input.Sorting ?? "id asc")
                .PageBy(input);

            var entities = from o in pagedAndFilteredBaseEntities
                           join o1 in _lookup_organizationUnitRepository.GetAll() on o.OrganizationUnitId equals o1.Id into j1
                           from s1 in j1.DefaultIfEmpty()

                           select new
                           {
                               o.RegionCode,
                               o.RegionName,
                               o.Description,
                               o.IsDeleted,
                               Id = o.Id,
                               OrganizationUnitDisplayName = s1 == null || s1.DisplayName == null ? string.Empty : s1.DisplayName.ToString()
                           };

            var totalCount = await filteredEntities.CountAsync();

            var dbList = await entities.ToListAsync();
            var results = new List<GetRegionForViewDto>();

            foreach (var o in dbList)
            {
                try
                {
                    var res = new GetRegionForViewDto()
                    {
                        BuuCuc = new RegionDto
                        {
                            RegionCode = o.RegionCode,
                            RegionName = o.RegionName,
                            Description = o.Description,
                            IsDeleted = o.IsDeleted,
                            Id = o.Id,
                        },
                        OrganizationUnitDisplayName = o.OrganizationUnitDisplayName
                    };
                    results.Add(res);
                }
                catch (Exception e)
                {
                    string x = e.StackTrace;
                }

            }
            return null;

            //return new PagedResultDto<GetBuuCucForViewDto>(
            //    totalCount,
            //    results
            //);
        }
    }

}