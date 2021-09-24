using Abp.Application.Services.Dto;
using Abp.Collections.Extensions;
using Abp.Domain.Repositories;
using Abp.Organizations;
using Microsoft.EntityFrameworkCore;
using MyCompanyName.AbpZeroTemplate.BDHN.Dtos;
using System;
using System.Linq;
using System.Threading.Tasks;

using Abp.Linq.Extensions;
using MyCompanyName.AbpZeroTemplate.Authorization;
using MyCompanyName.AbpZeroTemplate.Dto;
using System.Collections.Generic;
using System.Linq.Dynamic.Core;
using Microsoft.AspNetCore.Mvc;
using Abp.Authorization;
using MyCompanyName.AbpZeroTemplate.BDHN.BuuCucs.Dtos;

namespace MyCompanyName.AbpZeroTemplate.BDHN
{
    [AbpAuthorize(AppPermissions.Pages_BuuCucs)]
    public class BuuCucsAppService : AbpZeroTemplateAppServiceBase, IBuuCucsAppService
    {
        private readonly IRepository<BuuCuc, Guid> _repository;
        //private readonly IBaseEntitiesExcelExporter _baseEntitiesExcelExporter;
        private readonly IRepository<OrganizationUnit, long> _lookup_organizationUnitRepository;

        public BuuCucsAppService(IRepository<BuuCuc, Guid> buuCucRepository, IRepository<OrganizationUnit, long> lookup_organizationUnitRepository)
        {
            _repository = buuCucRepository;
            _lookup_organizationUnitRepository = lookup_organizationUnitRepository;
        }

        public async Task<PagedResultDto<GetBuuCucForViewDto>> GetAll(GetAllBuuCucInput input)
        {
            var entityRepository = IsGranted("Filter.OrganizationUnit") ? _repository.GetAll().Include(e => e.OrganizationUnitFk) : _repository.GetAll().Include(e => e.OrganizationUnitFk).IgnoreQueryFilters();

            var filteredEntities = entityRepository
                .Where(e => !e.IsDeleted)
                .WhereIf(!string.IsNullOrWhiteSpace(input.Filter), e => false || e.POSName.Contains(input.Filter))
                .WhereIf(!string.IsNullOrWhiteSpace(input.POSCode), e => e.POSCode == input.POSCode)
                .WhereIf(!string.IsNullOrWhiteSpace(input.POSName), e => e.POSName == input.POSName)
                .WhereIf(!string.IsNullOrWhiteSpace(input.Address), e => e.Address == input.Address)
                .WhereIf(!string.IsNullOrWhiteSpace(input.Tel), e => e.Tel == input.Tel)
                .WhereIf(!string.IsNullOrWhiteSpace(input.OrganizationUnitDisplayNameFilter), e => e.OrganizationUnitFk != null && e.OrganizationUnitFk.DisplayName == input.OrganizationUnitDisplayNameFilter);

            var pagedAndFilteredBaseEntities = filteredEntities
                .OrderBy(input.Sorting ?? "id asc")
                .PageBy(input);

            var entities = from o in pagedAndFilteredBaseEntities
                               join o1 in _lookup_organizationUnitRepository.GetAll() on o.OrganizationUnitId equals o1.Id into j1
                               from s1 in j1.DefaultIfEmpty()

                               select new
                               {
                                   o.POSCode,
                                   o.POSName,
                                   o.Address,
                                   o.POSTypeCode,
                                   o.Tel,
                                   o.ProvinceCode,
                                   o.CommuneCode,
                                   o.IsOffline,
                                   o.UnitCode,
                                   o.IsDeleted,
                                   Id = o.Id,
                                   OrganizationUnitDisplayName = s1 == null || s1.DisplayName == null ? "" : s1.DisplayName.ToString()
                               };

            var totalCount = await filteredEntities.CountAsync();

            var dbList = await entities.ToListAsync();
            var results = new List<GetBuuCucForViewDto>();

            foreach (var o in dbList)
            {
                var res = new GetBuuCucForViewDto()
                {
                    BuuCuc = new BuuCucDto
                    {
                        POSCode = o.POSCode,
                        POSName = o.POSName,
                        Address = o.Address,
                        POSTypeCode = o.POSTypeCode,
                        Tel = o.Tel,
                        ProvinceCode = o.ProvinceCode,
                        CommuneCode = o.CommuneCode,
                        IsOffline = o.IsOffline,
                        UnitCode = o.UnitCode,
                        IsDeleted = o.IsDeleted,
                        Id = o.Id,
                    },
                    OrganizationUnitDisplayName = o.OrganizationUnitDisplayName
                };

                results.Add(res);
            }

            return new PagedResultDto<GetBuuCucForViewDto>(
                totalCount,
                results
            );
        }

        public async Task<GetBuuCucForViewDto> GetForView(Guid id)
        {
            var entity = await _repository.GetAsync(id);

            var output = new GetBuuCucForViewDto { BuuCuc = ObjectMapper.Map<BuuCucDto>(entity) };

            if (output.BuuCuc.OrganizationUnitId != null)
            {
                var _lookupOrganizationUnit = await _lookup_organizationUnitRepository.FirstOrDefaultAsync((long)output.BuuCuc.OrganizationUnitId);
                output.OrganizationUnitDisplayName = _lookupOrganizationUnit?.DisplayName?.ToString();
            }

            return output;
        }

        [AbpAuthorize(AppPermissions.Pages_BuuCucs_Edit)]
        public async Task<GetBuuCucForEditOutput> GetForEdit(EntityDto<Guid> input)
        {
            var entity = await _repository.FirstOrDefaultAsync(input.Id);

            var output = new GetBuuCucForEditOutput { BuuCuc = ObjectMapper.Map<CreateOrEditBuuCucDto>(entity) };

            if (output.BuuCuc.OrganizationUnitId != null)
            {
                var _lookupOrganizationUnit = await _lookup_organizationUnitRepository.FirstOrDefaultAsync((long)output.BuuCuc.OrganizationUnitId);
                output.OrganizationUnitDisplayName = _lookupOrganizationUnit?.DisplayName?.ToString();
            }

            return output;
        }

        public async Task CreateOrEdit(CreateOrEditBuuCucDto input)
        {
            if (input.Id == null)
            {
                await Create(input);
            }
            else
            {
                await Update(input);
            }
        }

        [AbpAuthorize(AppPermissions.Pages_BuuCucs_Create)]
        protected virtual async Task Create(CreateOrEditBuuCucDto input)
        {
            var entity = ObjectMapper.Map<BuuCuc>(input);

            if (AbpSession.TenantId != null)
            {
                entity.TenantId = (int?)AbpSession.TenantId;
            }

            await _repository.InsertAsync(entity);
        }

        [AbpAuthorize(AppPermissions.Pages_BuuCucs_Edit)]
        protected virtual async Task Update(CreateOrEditBuuCucDto input)
        {
            var entity = await _repository.FirstOrDefaultAsync(input.Id.Value);
            ObjectMapper.Map(input, entity);
        }

        [AbpAuthorize(AppPermissions.Pages_BuuCucs_Delete)]
        public async Task Delete(EntityDto<Guid> input)
        {
            await _repository.DeleteAsync(input.Id);
        }

        //public async Task<FileDto> GetBaseEntitiesToExcel(GetAllBaseEntitiesForExcelInput input)
        //{
        //    var filteredBaseEntities = _baseEntityRepository.GetAll()
        //                .Include(e => e.OrganizationUnitFk)
        //                .WhereIf(!string.IsNullOrWhiteSpace(input.Filter), e => false || e.BaseProp1.Contains(input.Filter))
        //                .WhereIf(!string.IsNullOrWhiteSpace(input.BaseProp1Filter), e => e.BaseProp1 == input.BaseProp1Filter)
        //                .WhereIf(!string.IsNullOrWhiteSpace(input.OrganizationUnitDisplayNameFilter), e => e.OrganizationUnitFk != null && e.OrganizationUnitFk.DisplayName == input.OrganizationUnitDisplayNameFilter);

        //    var query = (from o in filteredBaseEntities
        //                 join o1 in _lookup_organizationUnitRepository.GetAll() on o.OrganizationUnitId equals o1.Id into j1
        //                 from s1 in j1.DefaultIfEmpty()

        //                 select new GetBaseEntityForViewDto()
        //                 {
        //                     BaseEntity = new BaseEntityDto
        //                     {
        //                         BaseProp1 = o.BaseProp1,
        //                         Id = o.Id
        //                     },
        //                     OrganizationUnitDisplayName = s1 == null || s1.DisplayName == null ? "" : s1.DisplayName.ToString()
        //                 });

        //    var baseEntityListDtos = await query.ToListAsync();

        //    return _baseEntitiesExcelExporter.ExportToFile(baseEntityListDtos);
        //}

        [AbpAuthorize(AppPermissions.Pages_BuuCucs)]
        public async Task<PagedResultDto<BuuCucOrganizationUnitLookupTableDto>> GetAllOrganizationUnitForLookupTable(GetAllForLookupTableInput input)
        {
            var query = _lookup_organizationUnitRepository.GetAll().WhereIf(
                   !string.IsNullOrWhiteSpace(input.Filter),
                  e => e.DisplayName != null && e.DisplayName.Contains(input.Filter)
               );

            var totalCount = await query.CountAsync();

            var organizationUnitList = await query
                .PageBy(input)
                .ToListAsync();

            var lookupTableDtoList = new List<BuuCucOrganizationUnitLookupTableDto>();
            foreach (var organizationUnit in organizationUnitList)
            {
                lookupTableDtoList.Add(new BuuCucOrganizationUnitLookupTableDto
                {
                    Id = organizationUnit.Id,
                    DisplayName = organizationUnit.DisplayName?.ToString()
                });
            }

            return new PagedResultDto<BuuCucOrganizationUnitLookupTableDto>(
                totalCount,
                lookupTableDtoList
            );
        }

    }
}