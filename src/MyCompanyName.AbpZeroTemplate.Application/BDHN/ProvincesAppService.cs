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
    public class ProvincesAppService : AbpZeroTemplateAppServiceBase, IProvincesAppService
    {
        private readonly IRepository<Province, Guid> _repository;
        //private readonly IBaseEntitiesExcelExporter _baseEntitiesExcelExporter;
        private readonly IRepository<Region, Guid> _lookup_regionRepository;
        private readonly IRepository<OrganizationUnit, long> _lookup_organizationUnitRepository;

        public ProvincesAppService(IRepository<Province, Guid> repository, IRepository<Region, Guid> lookup_regionRepository, IRepository<OrganizationUnit, long> lookup_organizationUnitRepository)
        {
            _repository = repository;
            _lookup_regionRepository = lookup_regionRepository;
            _lookup_organizationUnitRepository = lookup_organizationUnitRepository;
        }

        public async Task<PagedResultDto<GetProvinceForViewDto>> FindByCodeAsync(string code)
        {
            var entityRepository = IsGranted("Filter.OrganizationUnit") ?
               _repository.GetAll().Include(e => e.OrganizationUnitFk) :
               _repository.GetAll().Include(e => e.OrganizationUnitFk).IgnoreQueryFilters();

            var filteredEntities = entityRepository
                .Where(e => !e.IsDeleted)
                .Where(p => p.ProvinceName == code)
                //.FirstOrDefaultAsync()
                ;

            var pagedAndFilteredBaseEntities = filteredEntities
                .OrderBy("id asc")
                .PageBy(0,1)
                ;

            var entities = from o in pagedAndFilteredBaseEntities
                           join o1 in _lookup_organizationUnitRepository.GetAll() on o.OrganizationUnitId equals o1.Id into j1
                           from s1 in j1.DefaultIfEmpty()

                           select new
                           {
                               o.ProvinceCode,
                               o.ProvinceName,
                               o.Description,
                               o.RegionCode,
                               o.IsDeleted,
                               Id = o.Id,
                               OrganizationUnitDisplayName = s1 == null || s1.DisplayName == null ? string.Empty : s1.DisplayName.ToString()
                           };

            var totalCount = await filteredEntities.CountAsync();

            var dbList = await entities.ToListAsync();
            var results = new List<GetProvinceForViewDto>();

            foreach (var o in dbList)
            {
                try
                {
                    var res = new GetProvinceForViewDto()
                    {
                        Province = new ProvinceDto
                        {
                            ProvinceCode = o.ProvinceCode,
                            ProvinceName = o.ProvinceName,
                            Description = o.Description,
                            RegionCode = o.RegionCode,
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

            return new PagedResultDto<GetProvinceForViewDto>(
                totalCount,
                results
            );
        }

        public async Task<PagedResultDto<GetProvinceForViewDto>> GetAll(GetAllProvinceInput input)
        {
            var entityRepository = IsGranted("Filter.OrganizationUnit") ?
                _repository.GetAll().Include(e => e.OrganizationUnitFk) :
                _repository.GetAll().Include(e => e.OrganizationUnitFk).IgnoreQueryFilters();

            var filteredEntities = entityRepository
                .Where(e => !e.IsDeleted)
                .WhereIf(!string.IsNullOrWhiteSpace(input.Filter), e => false || e.ProvinceName.Contains(input.Filter))
                .WhereIf(!string.IsNullOrWhiteSpace(input.ProvinceCode), e => e.ProvinceCode == input.ProvinceCode)
                .WhereIf(!string.IsNullOrWhiteSpace(input.ProvinceName), e => e.ProvinceName == input.ProvinceName)
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
                               o.ProvinceCode,
                               o.ProvinceName,
                               o.Description,
                               o.RegionCode,
                               o.IsDeleted,
                               Id = o.Id,
                               OrganizationUnitDisplayName = s1 == null || s1.DisplayName == null ? string.Empty : s1.DisplayName.ToString()
                           };

            var totalCount = await filteredEntities.CountAsync();

            var dbList = await entities.ToListAsync();
            var results = new List<GetProvinceForViewDto>();

            foreach (var o in dbList)
            {
                try
                {
                    var res = new GetProvinceForViewDto()
                    {
                        Province = new ProvinceDto
                        {
                            ProvinceCode = o.ProvinceCode,
                            ProvinceName = o.ProvinceName,
                            Description = o.Description,
                            RegionCode = o.RegionCode,
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

            return new PagedResultDto<GetProvinceForViewDto>(
                totalCount,
                results
            );
        }

        public async Task<PagedResultDto<ProvinceRegionLookupTableDto>> GetAllProvinceRegionForLookupTable(GetAllForLookupTableInput input)
        {
            var query = _lookup_regionRepository.GetAll().WhereIf(
                  !string.IsNullOrWhiteSpace(input.Filter),
                  e => e.RegionCode != null && e.RegionName.Contains(input.Filter) 
               );

            var totalCount = await query.CountAsync();

            var regionList = await query
                .PageBy(input)
                .ToListAsync();

            var lookupTableDtoList = new List<ProvinceRegionLookupTableDto>();
            foreach (var region in regionList)
            {
                lookupTableDtoList.Add(new ProvinceRegionLookupTableDto
                {
                    Code = region.RegionCode,
                    Name = region.RegionName,
                    Description = region.Description,
                    Id = region.Id
                });
            }

            return new PagedResultDto<ProvinceRegionLookupTableDto>(
                totalCount,
                lookupTableDtoList
            );
        }
    }
}