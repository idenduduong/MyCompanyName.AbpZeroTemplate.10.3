using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Abp.Linq.Extensions;
using Abp.Organizations;
using Microsoft.EntityFrameworkCore;
using MyCompanyName.AbpZeroTemplate.Authorization;
using MyCompanyName.AbpZeroTemplate.BDHN.Dtos;
using System;
using System.Collections.Generic;

using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;

namespace MyCompanyName.AbpZeroTemplate.BDHN
{
    public class CommunesAppService : AbpZeroTemplateAppServiceBase, ICommunesAppService
    {
        private readonly IRepository<Commune, Guid> _repository;
        //private readonly IBaseEntitiesExcelExporter _baseEntitiesExcelExporter;
        private readonly IRepository<District, Guid> _lookup_districtRepository;
        private readonly IRepository<OrganizationUnit, long> _lookup_organizationUnitRepository;

        public CommunesAppService(IRepository<Commune, Guid> repository, IRepository<District, Guid> lookup_districtRepository, IRepository<OrganizationUnit, long> lookup_organizationUnitRepository)
        {
            _repository = repository;
            _lookup_districtRepository = lookup_districtRepository;
            _lookup_organizationUnitRepository = lookup_organizationUnitRepository;
        }

        public async Task<PagedResultDto<GetCommuneForViewDto>> GetAll(GetAllCommuneInput input)
        {
            var entityRepository = IsGranted("Filter.OrganizationUnit") ?
                _repository.GetAll().Include(e => e.OrganizationUnitFk) :
                _repository.GetAll().Include(e => e.OrganizationUnitFk).IgnoreQueryFilters();

            var filteredEntities = entityRepository
                .Where(e => !e.IsDeleted)
                .WhereIf(!string.IsNullOrWhiteSpace(input.Filter), e => false || e.CommuneName.Contains(input.Filter))
                .WhereIf(!string.IsNullOrWhiteSpace(input.CommuneCode), e => e.CommuneCode == input.CommuneCode)
                .WhereIf(!string.IsNullOrWhiteSpace(input.CommuneName), e => e.CommuneName == input.CommuneName)
                .WhereIf(!string.IsNullOrWhiteSpace(input.DistrictCode), e => e.DistrictCode == input.DistrictCode)
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
                               o.CommuneCode,
                               o.CommuneName,
                               o.DistrictCode,
                               o.IsDeleted,
                               Id = o.Id,
                               OrganizationUnitDisplayName = s1 == null || s1.DisplayName == null ? string.Empty : s1.DisplayName.ToString()
                           };

            var totalCount = await filteredEntities.CountAsync();

            var dbList = await entities.ToListAsync();
            var results = new List<GetCommuneForViewDto>();

            foreach (var o in dbList)
            {
                try
                {
                    var res = new GetCommuneForViewDto()
                    {
                        Commune = new CommuneDto
                        {
                            CommuneCode = o.CommuneCode,
                            CommuneName = o.CommuneName,
                            DistrictCode = o.DistrictCode,
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

            return new PagedResultDto<GetCommuneForViewDto>(
                totalCount,
                results
            );
        }

        public async Task<PagedResultDto<CommuneDistrictLookupTableDto>> GetAllCommuneDistrictForLookupTable(GetAllForLookupTableInput input)
        {
            var query = _lookup_districtRepository.GetAll().WhereIf(
                  !string.IsNullOrWhiteSpace(input.Filter),
                  e => e.DistrictCode != null && e.DistrictName.Contains(input.Filter)
               );

            var totalCount = await query.CountAsync();

            var districtList = await query
                .PageBy(input)
                .ToListAsync();

            var lookupTableDtoList = new List<CommuneDistrictLookupTableDto>();
            foreach (var district in districtList)
            {
                lookupTableDtoList.Add(new CommuneDistrictLookupTableDto
                {
                    Code = district.DistrictCode,
                    Name = district.DistrictName,
                    Description = district.Description,
                    ProvinceCode = district.ProvinceCode,
                    Id = district.Id
                });
            }

            return new PagedResultDto<CommuneDistrictLookupTableDto>(
                totalCount,
                lookupTableDtoList
            );
        }
    }
}