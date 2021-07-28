using Abp.Organizations;

using System;
using System.Linq;
using System.Linq.Dynamic.Core;
using Abp.Linq.Extensions;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using MyCompanyName.AbpZeroTemplate.BaseNamespace.Exporting;
using MyCompanyName.AbpZeroTemplate.BaseNamespace.Dtos;
using MyCompanyName.AbpZeroTemplate.Dto;
using Abp.Application.Services.Dto;
using MyCompanyName.AbpZeroTemplate.Authorization;
using Abp.Extensions;
using Abp.Authorization;
using Microsoft.EntityFrameworkCore;
using Abp.UI;
using MyCompanyName.AbpZeroTemplate.Storage;

namespace MyCompanyName.AbpZeroTemplate.BaseNamespace
{
    [AbpAuthorize(AppPermissions.Pages_BaseEntities)]
    public class BaseEntitiesAppService : AbpZeroTemplateAppServiceBase, IBaseEntitiesAppService
    {
        private readonly IRepository<BaseEntity> _baseEntityRepository;
        private readonly IBaseEntitiesExcelExporter _baseEntitiesExcelExporter;
        private readonly IRepository<OrganizationUnit, long> _lookup_organizationUnitRepository;

        public BaseEntitiesAppService(IRepository<BaseEntity> baseEntityRepository, IBaseEntitiesExcelExporter baseEntitiesExcelExporter, IRepository<OrganizationUnit, long> lookup_organizationUnitRepository)
        {
            _baseEntityRepository = baseEntityRepository;
            _baseEntitiesExcelExporter = baseEntitiesExcelExporter;
            _lookup_organizationUnitRepository = lookup_organizationUnitRepository;

        }

        public async Task<PagedResultDto<GetBaseEntityForViewDto>> GetAll(GetAllBaseEntitiesInput input)
        {
                var filteredBaseEntities = _baseEntityRepository.GetAll()
                        .Include(e => e.OrganizationUnitFk)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.Filter), e => false || e.BaseProp1.Contains(input.Filter))
                        .WhereIf(!string.IsNullOrWhiteSpace(input.BaseProp1Filter), e => e.BaseProp1 == input.BaseProp1Filter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.OrganizationUnitDisplayNameFilter), e => e.OrganizationUnitFk != null && e.OrganizationUnitFk.DisplayName == input.OrganizationUnitDisplayNameFilter);

            var pagedAndFilteredBaseEntities = filteredBaseEntities
                .OrderBy(input.Sorting ?? "id asc")
                .PageBy(input);

            var baseEntities = from o in pagedAndFilteredBaseEntities
                               join o1 in _lookup_organizationUnitRepository.GetAll() on o.OrganizationUnitId equals o1.Id into j1
                               from s1 in j1.DefaultIfEmpty()

                               select new
                               {

                                   o.BaseProp1,
                                   Id = o.Id,
                                   OrganizationUnitDisplayName = s1 == null || s1.DisplayName == null ? "" : s1.DisplayName.ToString()
                               };

            var totalCount = await filteredBaseEntities.CountAsync();

            var dbList = await baseEntities.ToListAsync();
            var results = new List<GetBaseEntityForViewDto>();

            foreach (var o in dbList)
            {
                var res = new GetBaseEntityForViewDto()
                {
                    BaseEntity = new BaseEntityDto
                    {

                        BaseProp1 = o.BaseProp1,
                        Id = o.Id,
                    },
                    OrganizationUnitDisplayName = o.OrganizationUnitDisplayName
                };

                results.Add(res);
            }

            return new PagedResultDto<GetBaseEntityForViewDto>(
                totalCount,
                results
            );

        }

        public async Task<GetBaseEntityForViewDto> GetBaseEntityForView(int id)
        {
            var baseEntity = await _baseEntityRepository.GetAsync(id);

            var output = new GetBaseEntityForViewDto { BaseEntity = ObjectMapper.Map<BaseEntityDto>(baseEntity) };

            if (output.BaseEntity.OrganizationUnitId != null)
            {
                var _lookupOrganizationUnit = await _lookup_organizationUnitRepository.FirstOrDefaultAsync((long)output.BaseEntity.OrganizationUnitId);
                output.OrganizationUnitDisplayName = _lookupOrganizationUnit?.DisplayName?.ToString();
            }

            return output;
        }

        [AbpAuthorize(AppPermissions.Pages_BaseEntities_Edit)]
        public async Task<GetBaseEntityForEditOutput> GetBaseEntityForEdit(EntityDto input)
        {
            var baseEntity = await _baseEntityRepository.FirstOrDefaultAsync(input.Id);

            var output = new GetBaseEntityForEditOutput { BaseEntity = ObjectMapper.Map<CreateOrEditBaseEntityDto>(baseEntity) };

            if (output.BaseEntity.OrganizationUnitId != null)
            {
                var _lookupOrganizationUnit = await _lookup_organizationUnitRepository.FirstOrDefaultAsync((long)output.BaseEntity.OrganizationUnitId);
                output.OrganizationUnitDisplayName = _lookupOrganizationUnit?.DisplayName?.ToString();
            }

            return output;
        }

        public async Task CreateOrEdit(CreateOrEditBaseEntityDto input)
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

        [AbpAuthorize(AppPermissions.Pages_BaseEntities_Create)]
        protected virtual async Task Create(CreateOrEditBaseEntityDto input)
        {
            var baseEntity = ObjectMapper.Map<BaseEntity>(input);

            if (AbpSession.TenantId != null)
            {
                baseEntity.TenantId = (int?)AbpSession.TenantId;
            }

            await _baseEntityRepository.InsertAsync(baseEntity);

        }

        [AbpAuthorize(AppPermissions.Pages_BaseEntities_Edit)]
        protected virtual async Task Update(CreateOrEditBaseEntityDto input)
        {
            var baseEntity = await _baseEntityRepository.FirstOrDefaultAsync((int)input.Id);
            ObjectMapper.Map(input, baseEntity);

        }

        [AbpAuthorize(AppPermissions.Pages_BaseEntities_Delete)]
        public async Task Delete(EntityDto input)
        {
            await _baseEntityRepository.DeleteAsync(input.Id);
        }

        public async Task<FileDto> GetBaseEntitiesToExcel(GetAllBaseEntitiesForExcelInput input)
        {

            var filteredBaseEntities = _baseEntityRepository.GetAll()
                        .Include(e => e.OrganizationUnitFk)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.Filter), e => false || e.BaseProp1.Contains(input.Filter))
                        .WhereIf(!string.IsNullOrWhiteSpace(input.BaseProp1Filter), e => e.BaseProp1 == input.BaseProp1Filter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.OrganizationUnitDisplayNameFilter), e => e.OrganizationUnitFk != null && e.OrganizationUnitFk.DisplayName == input.OrganizationUnitDisplayNameFilter);

            var query = (from o in filteredBaseEntities
                         join o1 in _lookup_organizationUnitRepository.GetAll() on o.OrganizationUnitId equals o1.Id into j1
                         from s1 in j1.DefaultIfEmpty()

                         select new GetBaseEntityForViewDto()
                         {
                             BaseEntity = new BaseEntityDto
                             {
                                 BaseProp1 = o.BaseProp1,
                                 Id = o.Id
                             },
                             OrganizationUnitDisplayName = s1 == null || s1.DisplayName == null ? "" : s1.DisplayName.ToString()
                         });

            var baseEntityListDtos = await query.ToListAsync();

            return _baseEntitiesExcelExporter.ExportToFile(baseEntityListDtos);
        }

        [AbpAuthorize(AppPermissions.Pages_BaseEntities)]
        public async Task<PagedResultDto<BaseEntityOrganizationUnitLookupTableDto>> GetAllOrganizationUnitForLookupTable(GetAllForLookupTableInput input)
        {
            var query = _lookup_organizationUnitRepository.GetAll().WhereIf(
                   !string.IsNullOrWhiteSpace(input.Filter),
                  e => e.DisplayName != null && e.DisplayName.Contains(input.Filter)
               );

            var totalCount = await query.CountAsync();

            var organizationUnitList = await query
                .PageBy(input)
                .ToListAsync();

            var lookupTableDtoList = new List<BaseEntityOrganizationUnitLookupTableDto>();
            foreach (var organizationUnit in organizationUnitList)
            {
                lookupTableDtoList.Add(new BaseEntityOrganizationUnitLookupTableDto
                {
                    Id = organizationUnit.Id,
                    DisplayName = organizationUnit.DisplayName?.ToString()
                });
            }

            return new PagedResultDto<BaseEntityOrganizationUnitLookupTableDto>(
                totalCount,
                lookupTableDtoList
            );
        }

    }
}