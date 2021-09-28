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

namespace MyCompanyName.AbpZeroTemplate.BDHN
{
    public class UnitAppService : AbpZeroTemplateAppServiceBase, IUnitsAppService
    {
        private readonly IRepository<Unit, Guid> _repository;
        //private readonly IBaseEntitiesExcelExporter _baseEntitiesExcelExporter;
        private readonly IRepository<Commune, Guid> _lookup_communeRepository;
        private readonly IRepository<OrganizationUnit, long> _lookup_organizationUnitRepository;

        public UnitAppService(IRepository<Unit, Guid> repository, IRepository<OrganizationUnit, long> lookup_organizationUnitRepository, IRepository<Commune, Guid> lookup_communeRepository)
        {
            _repository = repository;
            _lookup_communeRepository = lookup_communeRepository;
            _lookup_organizationUnitRepository = lookup_organizationUnitRepository;

        }

        public async Task<PagedResultDto<GetUnitForViewDto>> GetAll(GetAllUnitInput input)
        {
            var entityRepository = IsGranted("Filter.OrganizationUnit") ?
                _repository.GetAll().Include(e => e.OrganizationUnitFk) :
                _repository.GetAll().Include(e => e.OrganizationUnitFk).IgnoreQueryFilters();

            var filteredEntities = entityRepository
                                    .Where(e => !e.IsDeleted)
                                    .WhereIf(!string.IsNullOrWhiteSpace(input.Filter), e => false || e.UnitName.Contains(input.Filter))
                                    .WhereIf(!string.IsNullOrWhiteSpace(input.UnitCode), e => e.UnitCode == input.UnitCode)
                                    .WhereIf(!string.IsNullOrWhiteSpace(input.UnitName), e => e.UnitName == input.UnitName)
                                    ;

            var pagedAndFilteredBaseEntities = filteredEntities
                                                .OrderBy(input.Sorting ?? "id asc")
                                                .PageBy(input);

            var entities = from o in pagedAndFilteredBaseEntities
                           join o1 in _lookup_organizationUnitRepository.GetAll() on o.OrganizationUnitId equals o1.Id into j1
                           from s1 in j1.DefaultIfEmpty()

                           select new
                           {
                               o.UnitCode,
                               o.UnitName,
                               o.ParentUnitCode,
                               o.CommuneCode,
                               o.UnitTypeCode,
                               o.IsDeleted,
                               Id = o.Id,
                               OrganizationUnitDisplayName = s1 == null || s1.DisplayName == null ? "" : s1.DisplayName.ToString()
                           };

            var totalCount = await filteredEntities.CountAsync();

            var dbList = await entities.ToListAsync();
            var results = new List<GetUnitForViewDto>();

            foreach (var o in dbList)
            {
                try
                {
                    var res = new GetUnitForViewDto()
                    {
                        Unit = new UnitDto
                        {
                            UnitCode = o.UnitCode,
                            UnitName = o.UnitName,
                            ParentUnitCode = o.ParentUnitCode,
                            CommuneCode = o.CommuneCode,
                            UnitTypeCode = o.UnitTypeCode,
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

            return new PagedResultDto<GetUnitForViewDto>(
                totalCount,
                results
            );
        }

        //public async Task<GetBuuCucForViewDto> GetForView(Guid id)
        //{
        //    var entity = await _repository.GetAsync(id);

        //    var output = new GetBuuCucForViewDto { BuuCuc = ObjectMapper.Map<BuuCucDto>(entity) };

        //    if (output.BuuCuc.OrganizationUnitId != null)
        //    {
        //        var _lookupOrganizationUnit = await _lookup_organizationUnitRepository.FirstOrDefaultAsync((long)output.BuuCuc.OrganizationUnitId);
        //        output.OrganizationUnitDisplayName = _lookupOrganizationUnit?.DisplayName?.ToString();
        //    }

        //    return output;
        //}

        //[AbpAuthorize(AppPermissions.Pages_BuuCucs_Edit)]
        //public async Task<GetBuuCucForEditOutput> GetForEdit(EntityDto<Guid> input)
        //{
        //    var entity = await _repository.FirstOrDefaultAsync(input.Id);

        //    var output = new GetBuuCucForEditOutput { BuuCuc = ObjectMapper.Map<CreateOrEditBuuCucDto>(entity) };

        //    if (output.BuuCuc.OrganizationUnitId != null)
        //    {
        //        var _lookupOrganizationUnit = await _lookup_organizationUnitRepository.FirstOrDefaultAsync((long)output.BuuCuc.OrganizationUnitId);
        //        output.OrganizationUnitDisplayName = _lookupOrganizationUnit?.DisplayName?.ToString();
        //    }
        //    if (!string.IsNullOrEmpty(output.BuuCuc.ProvinceCode))
        //    {
        //        output.ProvinceName = (await _lookup_provinceRepository.GetAll().Where(e => !e.IsDeleted).Where(e => e.ProvinceCode == output.BuuCuc.ProvinceCode).FirstOrDefaultAsync()).ProvinceName;
        //    }
        //    if (!string.IsNullOrEmpty(output.BuuCuc.CommuneCode))
        //    {
        //        output.CommuneName = (await _lookup_communeRepository.GetAll().Where(e => !e.IsDeleted).Where(e => e.CommuneCode == output.BuuCuc.CommuneCode).FirstOrDefaultAsync()).CommuneName;
        //    }
        //    //if (!string.IsNullOrEmpty(output.BuuCuc.UnitCode))
        //    //{
        //    //    output.UnitName = (await _dM_TinhThanhRepository.FirstOrDefaultAsync(output.DM_QuanHuyen.ID_TinhThanh.Value)).TenTinhThanh.ToString();
        //    //}

        //    return output;
        //}

        //public async Task CreateOrEdit(CreateOrEditBuuCucDto input)
        //{
        //    if (input.Id == null)
        //    {
        //        await Create(input);
        //    }
        //    else
        //    {
        //        await Update(input);
        //    }
        //}

        //[AbpAuthorize(AppPermissions.Pages_BuuCucs_Create)]
        //protected virtual async Task Create(CreateOrEditBuuCucDto input)
        //{
        //    var entity = ObjectMapper.Map<BuuCuc>(input);

        //    if (AbpSession.TenantId != null)
        //    {
        //        entity.TenantId = (int?)AbpSession.TenantId;
        //    }

        //    await _repository.InsertAsync(entity);
        //}

        //[AbpAuthorize(AppPermissions.Pages_BuuCucs_Edit)]
        //protected virtual async Task Update(CreateOrEditBuuCucDto input)
        //{
        //    var entity = await _repository.FirstOrDefaultAsync(input.Id.Value);
        //    var result = ObjectMapper.Map(input, entity);
        //}

        //[AbpAuthorize(AppPermissions.Pages_BuuCucs_Delete)]
        //public async Task Delete(EntityDto<Guid> input)
        //{
        //    await _repository.DeleteAsync(input.Id);
        //}

        ////public async Task<FileDto> GetBaseEntitiesToExcel(GetAllBaseEntitiesForExcelInput input)
        ////{
        ////    var filteredBaseEntities = _baseEntityRepository.GetAll()
        ////                .Include(e => e.OrganizationUnitFk)
        ////                .WhereIf(!string.IsNullOrWhiteSpace(input.Filter), e => false || e.BaseProp1.Contains(input.Filter))
        ////                .WhereIf(!string.IsNullOrWhiteSpace(input.BaseProp1Filter), e => e.BaseProp1 == input.BaseProp1Filter)
        ////                .WhereIf(!string.IsNullOrWhiteSpace(input.OrganizationUnitDisplayNameFilter), e => e.OrganizationUnitFk != null && e.OrganizationUnitFk.DisplayName == input.OrganizationUnitDisplayNameFilter);

        ////    var query = (from o in filteredBaseEntities
        ////                 join o1 in _lookup_organizationUnitRepository.GetAll() on o.OrganizationUnitId equals o1.Id into j1
        ////                 from s1 in j1.DefaultIfEmpty()

        ////                 select new GetBaseEntityForViewDto()
        ////                 {
        ////                     BaseEntity = new BaseEntityDto
        ////                     {
        ////                         BaseProp1 = o.BaseProp1,
        ////                         Id = o.Id
        ////                     },
        ////                     OrganizationUnitDisplayName = s1 == null || s1.DisplayName == null ? "" : s1.DisplayName.ToString()
        ////                 });

        ////    var baseEntityListDtos = await query.ToListAsync();

        ////    return _baseEntitiesExcelExporter.ExportToFile(baseEntityListDtos);
        ////}

        //[AbpAuthorize(AppPermissions.Pages_BuuCucs)]
        //public async Task<PagedResultDto<BuuCucOrganizationUnitLookupTableDto>> GetAllOrganizationUnitForLookupTable(GetAllForLookupTableInput input)
        //{
        //    var query = _lookup_organizationUnitRepository.GetAll().WhereIf(
        //           !string.IsNullOrWhiteSpace(input.Filter),
        //          e => e.DisplayName != null && e.DisplayName.Contains(input.Filter)
        //       );

        //    var totalCount = await query.CountAsync();

        //    var organizationUnitList = await query
        //        .PageBy(input)
        //        .ToListAsync();

        //    var lookupTableDtoList = new List<BuuCucOrganizationUnitLookupTableDto>();
        //    foreach (var organizationUnit in organizationUnitList)
        //    {
        //        lookupTableDtoList.Add(new BuuCucOrganizationUnitLookupTableDto
        //        {
        //            Id = organizationUnit.Id,
        //            DisplayName = organizationUnit.DisplayName?.ToString()
        //        });
        //    }

        //    return new PagedResultDto<BuuCucOrganizationUnitLookupTableDto>(
        //        totalCount,
        //        lookupTableDtoList
        //    );
        //}

        //public async Task<PagedResultDto<BuuCucProvinceLookupTableDto>> GetAllProvinceForLookupTable(GetAllForLookupTableInput input)
        //{
        //    var query = _lookup_provinceRepository.GetAll().WhereIf(
        //           !string.IsNullOrWhiteSpace(input.Filter),
        //          e => e.ProvinceName != null && e.ProvinceName.Contains(input.Filter)
        //       );

        //    var totalCount = await query.CountAsync();

        //    var provinceList = await query
        //        .PageBy(input)
        //        .ToListAsync();

        //    var lookupTableDtoList = new List<BuuCucProvinceLookupTableDto>();
        //    foreach (var province in provinceList)
        //    {
        //        lookupTableDtoList.Add(new BuuCucProvinceLookupTableDto
        //        {
        //            //Id = province.Id,
        //            //ProvinceCode = province.ProvinceCode,
        //            //ProvinceName = province.ProvinceName?.ToString()

        //            Id = province.ProvinceCode,
        //            DisplayName = province.ProvinceName
        //        });
        //    }

        //    return new PagedResultDto<BuuCucProvinceLookupTableDto>(
        //        totalCount,
        //        lookupTableDtoList
        //    );
        //}

        //public async Task<PagedResultDto<BuuCucCommuneLookupTableDto>> GetAllCommuneForLookupTable(GetAllForLookupTableInput input)
        //{
        //    var query = _lookup_communeRepository.GetAll().WhereIf(
        //           !string.IsNullOrWhiteSpace(input.Filter),
        //          e => e.CommuneName != null && e.CommuneName.Contains(input.Filter)
        //       );

        //    var totalCount = await query.CountAsync();

        //    var communeList = await query
        //        .PageBy(input)
        //        .ToListAsync();

        //    var lookupTableDtoList = new List<BuuCucCommuneLookupTableDto>();
        //    foreach (var commune in communeList)
        //    {
        //        lookupTableDtoList.Add(new BuuCucCommuneLookupTableDto
        //        {
        //            //Id = commune.Id,
        //            //CommuneCode = commune.CommuneCode,
        //            //CommuneName = commune.CommuneName?.ToString()

        //            Id = commune.CommuneCode,
        //            DisplayName = commune.CommuneName
        //        });
        //    }

        //    return new PagedResultDto<BuuCucCommuneLookupTableDto>(
        //        totalCount,
        //        lookupTableDtoList
        //    );
        //}
    }

}