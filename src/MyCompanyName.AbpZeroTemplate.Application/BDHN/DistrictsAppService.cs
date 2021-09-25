using Abp.Application.Services.Dto;
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
    public class DistrictsAppService : AbpZeroTemplateAppServiceBase, IDistrictsAppService
    {
        private readonly IRepository<District, Guid> _repository;
        //private readonly IBaseEntitiesExcelExporter _baseEntitiesExcelExporter;
        private readonly IRepository<Province, Guid> _lookup_provinceRepository;
        private readonly IRepository<OrganizationUnit, long> _lookup_organizationUnitRepository;

        public DistrictsAppService(IRepository<District, Guid> repository, IRepository<Province, Guid> lookup_provinceRepository, IRepository<OrganizationUnit, long> lookup_organizationUnitRepository)
        {
            _repository = repository;
            _lookup_provinceRepository = lookup_provinceRepository;
            _lookup_organizationUnitRepository = lookup_organizationUnitRepository;
        }

        public async Task<PagedResultDto<GetDistrictForViewDto>> GetAll(GetAllDistrictInput input)
        {
            var entityRepository = IsGranted("Filter.OrganizationUnit") ?
                _repository.GetAll().Include(e => e.OrganizationUnitFk) :
                _repository.GetAll().Include(e => e.OrganizationUnitFk).IgnoreQueryFilters();

            var filteredEntities = entityRepository
                .Where(e => !e.IsDeleted)
                .WhereIf(!string.IsNullOrWhiteSpace(input.Filter), e => false || e.DistrictName.Contains(input.Filter))
                .WhereIf(!string.IsNullOrWhiteSpace(input.DistrictCode), e => e.DistrictCode == input.DistrictCode)
                .WhereIf(!string.IsNullOrWhiteSpace(input.DistrictName), e => e.DistrictName == input.DistrictName)
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
                               o.DistrictCode,
                               o.DistrictName,
                               o.Description,
                               o.ProvinceCode,
                               o.IsDeleted,
                               Id = o.Id,
                               OrganizationUnitDisplayName = s1 == null || s1.DisplayName == null ? string.Empty : s1.DisplayName.ToString()
                           };

            var totalCount = await filteredEntities.CountAsync();

            var dbList = await entities.ToListAsync();
            var results = new List<GetDistrictForViewDto>();

            foreach (var o in dbList)
            {
                try
                {
                    var res = new GetDistrictForViewDto()
                    {
                        District = new DistrictDto
                        {
                            DistrictCode = o.DistrictCode,
                            DistrictName = o.DistrictName,
                            Description = o.Description,
                            ProvinceCode = o.ProvinceCode,
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

            return new PagedResultDto<GetDistrictForViewDto>(
                totalCount,
                results
            );
        }

        public async Task<PagedResultDto<DistrictProvinceLookupTableDto>> GetAllDistrictProvinceForLookupTable(GetAllForLookupTableInput input)
        {
            var query = _lookup_provinceRepository.GetAll().WhereIf(
                  !string.IsNullOrWhiteSpace(input.Filter),
                  e => e.ProvinceCode != null && e.ProvinceName.Contains(input.Filter)
               );

            var totalCount = await query.CountAsync();

            var provinceList = await query
                .PageBy(input)
                .ToListAsync();

            var lookupTableDtoList = new List<DistrictProvinceLookupTableDto>();
            foreach (var province in provinceList)
            {
                lookupTableDtoList.Add(new DistrictProvinceLookupTableDto
                {
                    Code = province.ProvinceCode,
                    Name = province.ProvinceName,
                    Description = province.Description,
                    RegionCode = province.ProvinceCode,
                    Id = province.Id
                });
            }

            return new PagedResultDto<DistrictProvinceLookupTableDto>(
                totalCount,
                lookupTableDtoList
            );
        }
    }
}