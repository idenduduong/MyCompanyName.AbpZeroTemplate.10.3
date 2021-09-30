﻿using Abp.Application.Services.Dto;
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
using System.Linq.Dynamic;

namespace MyCompanyName.AbpZeroTemplate.BDHN
{
    [AbpAuthorize(AppPermissions.Pages_BuuCucs)]
    public class BuuCucsAppService : AbpZeroTemplateAppServiceBase, IBuuCucsAppService
    {
        private readonly IRepository<BuuCuc, Guid> _repository;
        //private readonly IBaseEntitiesExcelExporter _baseEntitiesExcelExporter;
        private readonly IRepository<Province, Guid> _lookup_provinceRepository;
        private readonly IRepository<Commune, Guid> _lookup_communeRepository;
        private readonly IRepository<Unit, Guid> _lookup_unitRepository;
        private readonly IRepository<OrganizationUnit, long> _lookup_organizationUnitRepository;

        public BuuCucsAppService(IRepository<BuuCuc, Guid> repository, IRepository<OrganizationUnit, long> lookup_organizationUnitRepository, IRepository<Province, Guid> lookup_provinceRepository, IRepository<Commune, Guid> lookup_communeRepository, IRepository<Unit, Guid> lookup_unitRepository)
        {
            _repository = repository;
            _lookup_provinceRepository = lookup_provinceRepository;
            _lookup_communeRepository = lookup_communeRepository;
            _lookup_unitRepository = lookup_unitRepository;
            _lookup_organizationUnitRepository = lookup_organizationUnitRepository;
        }

        public async Task<PagedResultDto<GetBuuCucForViewDto>> GetAll(GetAllBuuCucInput input)
        {
            if (input.Sorting != null) input.Sorting = (input.Sorting.Contains(".") ? input.Sorting.Split(".")[1].ToString() : input.Sorting);

            var entityRepository = IsGranted("Filter.OrganizationUnit") ?
                _repository.GetAll().Include(e => e.OrganizationUnitFk) :
                _repository.GetAll().Include(e => e.OrganizationUnitFk).IgnoreQueryFilters();

            var filteredEntities = entityRepository
                .Where(e => !e.IsDeleted)
                .WhereIf(!string.IsNullOrWhiteSpace(input.Filter), e => false || e.POSName.Contains(input.Filter))
                .WhereIf(!string.IsNullOrWhiteSpace(input.POSCode), e => e.POSCode == input.POSCode)
                .WhereIf(!string.IsNullOrWhiteSpace(input.POSName), e => e.POSName == input.POSName)
                .WhereIf(!string.IsNullOrWhiteSpace(input.Address), e => e.Address == input.Address)
                .WhereIf(!string.IsNullOrWhiteSpace(input.Tel), e => e.Tel == input.Tel)
                .WhereIf(!string.IsNullOrWhiteSpace(input.OrganizationUnitDisplayNameFilter), e => e.OrganizationUnitFk != null && e.OrganizationUnitFk.DisplayName == input.OrganizationUnitDisplayNameFilter);

            var pagedAndFilteredBaseEntities = entityRepository;
            if (input.Sorting != null && !input.Sorting.Contains("unitName") && !input.Sorting.Contains("communeName"))
            {
                pagedAndFilteredBaseEntities = filteredEntities
                    .OrderBy(input.Sorting ?? "id asc")
                    .PageBy(input)
                    ;
            }
            else if(input.Sorting == null)
            {
                pagedAndFilteredBaseEntities = filteredEntities
                    .OrderBy(input.Sorting ?? "id asc")
                    .PageBy(input)
                    ;
            }

            var entities = from o in pagedAndFilteredBaseEntities
                           join o1 in _lookup_organizationUnitRepository.GetAll() on o.OrganizationUnitId equals o1.Id into j1
                           from s1 in j1.DefaultIfEmpty()

                           join o2 in _lookup_communeRepository.GetAll()
                           .WhereIf(!string.IsNullOrWhiteSpace(input.CommuneName),
                                    (Commune e) => e.CommuneName.ToLower() == input.CommuneName.ToLower().Trim())
                           on o.CommuneCode equals o2.CommuneCode into j2
                           from s2 in (!string.IsNullOrWhiteSpace(input.CommuneName) ? j2 : j2.DefaultIfEmpty())

                           join o3 in _lookup_unitRepository.GetAll()
                           .WhereIf(!string.IsNullOrWhiteSpace(input.UnitName),
                                    (Unit e) => e.UnitName.ToLower() == input.UnitName.ToLower().Trim())
                           on o.UnitCode equals o3.UnitCode into j3
                           from s3 in (!string.IsNullOrWhiteSpace(input.UnitName) ? j3 : j3.DefaultIfEmpty())

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
                               o.Id,
                               s2.CommuneName,
                               s3.UnitName,
                               OrganizationUnitDisplayName = s1 == null || s1.DisplayName == null ? "" : s1.DisplayName.ToString()
                           };

            var totalCount = 0;
            if (string.IsNullOrWhiteSpace(input.CommuneName) && string.IsNullOrWhiteSpace(input.UnitName))
            {
                totalCount = await filteredEntities.CountAsync();
            }
            else
            {
                totalCount = await entities.CountAsync();
            }

            var sql = entities.ToQueryString();

            var dbList = await entities.ToListAsync();
            var results = new List<GetBuuCucForViewDto>();

            foreach (var o in dbList)
            {
                try
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
                        CommuneName = o.CommuneName,
                        UnitName = o.UnitName,
                        OrganizationUnitDisplayName = o.OrganizationUnitDisplayName
                    };
                    results.Add(res);
                }
                catch (Exception e)
                {
                    string x = e.StackTrace;
                }
            }

            if (input.Sorting != null && (input.Sorting.Contains("communeName") || input.Sorting.Contains("unitName")))
            {
                switch (input.Sorting)
                {
                    case "communeName asc":
                        results = results.OrderBy(e => e.CommuneName).AsQueryable()
                            .PageBy(input.SkipCount, input.MaxResultCount).ToList();
                        break;

                    case "communeName desc":
                        results = results.OrderByDescending(e => e.CommuneName).AsQueryable()
                                .PageBy(input.SkipCount, input.MaxResultCount).ToList();
                        break;

                    case "unitName asc":
                        results = results.OrderBy(e => e.UnitName).AsQueryable()
                               .PageBy(input.SkipCount, input.MaxResultCount).ToList();
                        break;

                    case "unitName desc":
                        results = results.OrderByDescending(e => e.UnitName).AsQueryable()
                               .PageBy(input.SkipCount, input.MaxResultCount).ToList();
                        break;

                    default:
                        results = results.AsQueryable().OrderBy(input.Sorting ?? "id asc")
                               .PageBy(input.SkipCount, input.MaxResultCount).ToList();
                        break;
                }
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
            if (!string.IsNullOrEmpty(output.BuuCuc.ProvinceCode))
            {
                output.ProvinceName = (await _lookup_provinceRepository.GetAll().Where(e => !e.IsDeleted).Where(e => e.ProvinceCode.Trim() == output.BuuCuc.ProvinceCode.Trim()).FirstOrDefaultAsync()).ProvinceName.Trim();
            }
            if (!string.IsNullOrEmpty(output.BuuCuc.CommuneCode))
            {
                output.CommuneName = (await _lookup_communeRepository.GetAll().Where(e => !e.IsDeleted).Where(e => e.CommuneCode.Trim() == output.BuuCuc.CommuneCode.Trim()).FirstOrDefaultAsync()).CommuneName.Trim();
            }
            if (!string.IsNullOrEmpty(output.BuuCuc.UnitCode))
            {
                output.UnitName = (await _lookup_unitRepository.GetAll().Where(e => !e.IsDeleted).Where(e => e.UnitCode.Trim() == output.BuuCuc.UnitCode.Trim()).FirstOrDefaultAsync()).UnitName.Trim();
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
            var result = ObjectMapper.Map(input, entity);
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

        public async Task<PagedResultDto<BuuCucProvinceLookupTableDto>> GetAllProvinceForLookupTable(GetAllForLookupTableInput input)
        {
            var query = _lookup_provinceRepository.GetAll().WhereIf(
                   !string.IsNullOrWhiteSpace(input.Filter),
                  e => e.ProvinceName != null && e.ProvinceName.Contains(input.Filter)
               );

            var totalCount = await query.CountAsync();

            var provinceList = await query
                .PageBy(input)
                .ToListAsync();

            var lookupTableDtoList = new List<BuuCucProvinceLookupTableDto>();
            foreach (var province in provinceList)
            {
                lookupTableDtoList.Add(new BuuCucProvinceLookupTableDto
                {
                    Id = province.ProvinceCode,
                    DisplayName = province.ProvinceName
                });
            }

            return new PagedResultDto<BuuCucProvinceLookupTableDto>(
                totalCount,
                lookupTableDtoList
            );
        }

        public async Task<PagedResultDto<BuuCucCommuneLookupTableDto>> GetAllCommuneForLookupTable(GetAllForLookupTableInput input)
        {
            var query = _lookup_communeRepository.GetAll().WhereIf(
                   !string.IsNullOrWhiteSpace(input.Filter),
                  e => e.CommuneName != null && e.CommuneName.Contains(input.Filter)
               );

            var totalCount = await query.CountAsync();

            var communeList = await query
                .PageBy(input)
                .ToListAsync();

            var lookupTableDtoList = new List<BuuCucCommuneLookupTableDto>();
            foreach (var commune in communeList)
            {
                lookupTableDtoList.Add(new BuuCucCommuneLookupTableDto
                {
                    //Id = commune.Id,
                    //CommuneCode = commune.CommuneCode,
                    //CommuneName = commune.CommuneName?.ToString()

                    Id = commune.CommuneCode,
                    DisplayName = commune.CommuneName
                });
            }

            return new PagedResultDto<BuuCucCommuneLookupTableDto>(
                totalCount,
                lookupTableDtoList
            );
        }

        public async Task<PagedResultDto<BuuCucUnitLookupTableDto>> GetAllUnitForLookupTable(GetAllForLookupTableInput input)
        {
            var query = _lookup_unitRepository.GetAll().WhereIf(
                   !string.IsNullOrWhiteSpace(input.Filter),
                  e => e.UnitName != null && e.UnitName.Contains(input.Filter)
               );

            var totalCount = await query.CountAsync();

            var unitList = await query
                .PageBy(input)
                .ToListAsync();

            var lookupTableDtoList = new List<BuuCucUnitLookupTableDto>();
            foreach (var unit in unitList)
            {
                lookupTableDtoList.Add(new BuuCucUnitLookupTableDto
                {
                    Id = unit.UnitCode,
                    DisplayName = unit.UnitName
                });
            }

            return new PagedResultDto<BuuCucUnitLookupTableDto>(
                totalCount,
                lookupTableDtoList
            );
        }
    }
}