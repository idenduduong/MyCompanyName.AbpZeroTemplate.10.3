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
using System.Linq.Dynamic;

namespace MyCompanyName.AbpZeroTemplate.BDHN
{
    public class ToolsAppService : AbpZeroTemplateAppServiceBase, IToolsAppService
    {
        private readonly IRepository<Tool, Guid> _repository;
        //private readonly IBaseEntitiesExcelExporter _baseEntitiesExcelExporter;
        private readonly IRepository<BuuCuc, Guid> _lookup_buuCucRepository;
        private readonly IRepository<OrganizationUnit, long> _lookup_organizationUnitRepository;

        public ToolsAppService(IRepository<Tool, Guid> repository, IRepository<BuuCuc, Guid> lookup_buuCucRepository, IRepository<OrganizationUnit, long> lookup_organizationUnitRepository)
        {
            _repository = repository;
            _lookup_buuCucRepository = lookup_buuCucRepository;
            _lookup_organizationUnitRepository = lookup_organizationUnitRepository;
        }

        public async Task<PagedResultDto<GetToolForViewDto>> GetAll(GetAllToolInput input)
        {
            bool foreingSort = input.Sorting != null && (input.Sorting.Contains("provinceName") || input.Sorting.Contains("communeName") || input.Sorting.Contains("unitName"));
            bool foreignSearch = false;// !string.IsNullOrEmpty(input.ProvinceName) || !string.IsNullOrEmpty(input.CommuneName) || !string.IsNullOrEmpty(input.UnitName);

            if (input.Sorting != null) input.Sorting = (input.Sorting.Contains(".") ? input.Sorting.Split(".")[1].ToString() : input.Sorting);

            var entityRepository = IsGranted("Filter.OrganizationUnit") ?
                _repository.GetAll().Include(e => e.OrganizationUnitFk) :
                _repository.GetAll().Include(e => e.OrganizationUnitFk).IgnoreQueryFilters();

            var filteredEntities = entityRepository
                .Where(e => !e.IsDeleted)
                //.Where(e => e.ProvinceCode == "10")
                //.WhereIf(!string.IsNullOrWhiteSpace(input.Filter), e => false || EF.Functions.Like(e.POSName.ToLower(), "%" + input.Filter.Trim().ToLower() + "%"))
                //.WhereIf(!string.IsNullOrWhiteSpace(input.POSCode), e => EF.Functions.Like(e.POSCode.Trim().ToLower(), "%" + input.POSCode.Trim().ToLower() + "%"))
                //.WhereIf(!string.IsNullOrWhiteSpace(input.POSName), e => EF.Functions.Like(e.POSName.Trim().ToLower(), "%" + input.POSName.Trim().ToLower() + "%"))
                //.WhereIf(!string.IsNullOrWhiteSpace(input.Address), e => EF.Functions.Like(e.Address.Trim().ToLower(), "%" + input.Address.Trim().ToLower() + "%"))
                //.WhereIf(!string.IsNullOrWhiteSpace(input.Tel), e => EF.Functions.Like(e.Tel.ToLower(), "%" + input.Tel.Trim().ToLower().Trim() + "%"))
                .WhereIf(!string.IsNullOrWhiteSpace(input.OrganizationUnitDisplayNameFilter), e => e.OrganizationUnitFk != null && e.OrganizationUnitFk.DisplayName == input.OrganizationUnitDisplayNameFilter);

            var pagedAndFilteredBaseEntities = entityRepository;
            if (!foreingSort && !foreignSearch)
            {
                pagedAndFilteredBaseEntities = filteredEntities
                    .OrderBy(input.Sorting ?? "id asc")
                    .PageBy(input)
                    ;
            }
            else if (input.Sorting == null && (!foreingSort && !foreignSearch))
            {
                pagedAndFilteredBaseEntities = filteredEntities
                    .OrderBy(input.Sorting ?? "id asc")
                    .PageBy(input)
                    ;
            }

            var entities = from o in pagedAndFilteredBaseEntities

                           join o1 in _lookup_organizationUnitRepository.GetAll() on o.OrganizationUnitId equals o1.Id into j1
                           from s1 in j1.DefaultIfEmpty()

                           join o2 in _lookup_buuCucRepository.GetAll()
                           .WhereIf(!string.IsNullOrWhiteSpace(input.BuuCucName),
                                   (BuuCuc e) => EF.Functions.Like(e.POSName.Trim().ToLower(), "%" + input.BuuCucName.Trim().ToLower() + "%"))
                           on o.POSCode equals o2.POSCode into j2
                           from s2 in (!string.IsNullOrWhiteSpace(input.BuuCucName) ? j2 : j2.DefaultIfEmpty())

                               //join o3 in _lookup_unitRepository.GetAll()
                               //.WhereIf(!string.IsNullOrWhiteSpace(input.UnitName),
                               //         (Unit e) => EF.Functions.Like(e.UnitName.Trim().ToLower(), "%" + input.UnitName.Trim().ToLower() + "%"))
                               //on o.UnitCode equals o3.UnitCode into j3
                               //from s3 in (!string.IsNullOrWhiteSpace(input.UnitName) ? j3 : j3.DefaultIfEmpty())

                               //join o4 in _lookup_provinceRepository.GetAll()
                               //.WhereIf(!string.IsNullOrWhiteSpace(input.ProvinceName),
                               //         (Province e) => EF.Functions.Like(e.ProvinceName.Trim().ToLower(), "%" + input.ProvinceName.Trim().ToLower() + "%"))
                               //on o.ProvinceCode equals o4.ProvinceCode into j4
                               //from s4 in j4
                               //from s4 in (!string.IsNullOrWhiteSpace(input.ProvinceName) ? j4 : j4.DefaultIfEmpty())

                           select new
                           {
                               o.ToolName,
                               o.Type,
                               o.Serial,
                               o.UsedFrom,
                               o.UsedTo,
                               o.Configuration,
                               o.Condition,
                               o.ToolStatus,
                               o.Note,
                               o.POSCode,
                               o.TenantId,
                               o.OrganizationUnitId,
                               o.IsDeleted,
                               o.Id,
                               s2.POSName,
                               OrganizationUnitDisplayName = s1 == null || s1.DisplayName == null ? "" : s1.DisplayName.ToString()
                           };

            var totalCount = 0;
            if (!foreignSearch && !foreingSort)
            {
                totalCount = await filteredEntities.CountAsync();
            }
            else
            {
                totalCount = await entities.CountAsync();
            }

            var sql = entities.ToQueryString();

            var dbList = await entities.ToListAsync();
            var results = new List<GetToolForViewDto>();

            foreach (var o in dbList)
            {
                try
                {
                    var res = new GetToolForViewDto()
                    {
                        Tool = new ToolDto
                        {
                            ToolName = o.ToolName,
                            Type = o.Type,
                            Serial = o.Serial,
                            UsedFrom = o.UsedFrom,
                            UsedTo = o.UsedTo,
                            Configuration = o.Configuration,
                            Condition = o.Condition,
                            ToolStatus = o.ToolStatus,
                            Note = o.Note,
                            PosCode = o.POSCode,
                            TenantId = o.TenantId,
                            OrganizationUnitId = o.OrganizationUnitId,
                            IsDeleted = o.IsDeleted,
                            Id = o.Id,
                        },
                        PosName = o.POSName,
                        OrganizationUnitDisplayName = o.OrganizationUnitDisplayName
                    };
                    results.Add(res);
                }
                catch (Exception e)
                {
                    string x = e.StackTrace;
                }
            }

            try
            {
                if (foreingSort || foreignSearch)
                {
                    results = results.AsQueryable().OrderBy(input.Sorting ?? "UnitName asc")
                                        .PageBy(input.SkipCount, input.MaxResultCount).ToList();
                    //  datdd: set skipcount because page once only
                    input.SkipCount = 0;
                }
                if (input.Sorting != null && foreingSort)
                {
                    switch (input.Sorting)
                    {
                        //case "provinceName asc":
                        //    results = results.OrderBy(e => e.ProvinceName).AsQueryable()
                        //                .PageBy(input.SkipCount, input.MaxResultCount).ToList();
                        //    break;

                        //case "provinceName desc":
                        //    results = results.OrderByDescending(e => e.ProvinceName).AsQueryable()
                        //                .PageBy(input.SkipCount, input.MaxResultCount).ToList();
                        //    break;

                        //case "communeName asc":
                        //    results = results.OrderBy(e => e.CommuneName).AsQueryable()
                        //                .PageBy(input.SkipCount, input.MaxResultCount).ToList();
                        //    break;

                        //case "communeName desc":
                        //    results = results.OrderByDescending(e => e.CommuneName).AsQueryable()
                        //                .PageBy(input.SkipCount, input.MaxResultCount).ToList();
                        //    break;

                        //case "unitName asc":
                        //    results = results.OrderBy(e => e.UnitName).AsQueryable()
                        //                .PageBy(input.SkipCount, input.MaxResultCount).ToList();
                        //    break;

                        //case "unitName desc":
                        //    results = results.OrderByDescending(e => e.UnitName).AsQueryable()
                        //                .PageBy(input.SkipCount, input.MaxResultCount).ToList();
                        //    break;

                        default:
                            results = results.AsQueryable().OrderBy(input.Sorting ?? "Id asc")
                                        .PageBy(input.SkipCount, input.MaxResultCount).ToList();
                            break;
                    }
                }
            }
            catch (Exception ex)
            {
                results = results.AsQueryable().OrderBy(input.Sorting ?? "id asc")
                            .PageBy(input.SkipCount, input.MaxResultCount).ToList();
            }

            return new PagedResultDto<GetToolForViewDto>(
                totalCount,
                results
            );
        }

        public async Task<GetToolForViewDto> GetForView(Guid id)
        {
            var entity = await _repository.GetAsync(id);

            var output = new GetToolForViewDto { Tool = ObjectMapper.Map<ToolDto>(entity) };

            if (output.Tool.PosCode != null)
            {
                var _lookupBuuCuc = await _lookup_buuCucRepository.FirstOrDefaultAsync(id);
                output.PosName = _lookupBuuCuc?.POSName?.ToString();
            }

            if (output.Tool.OrganizationUnitId != null)
            {
                var _lookupOrganizationUnit = await _lookup_organizationUnitRepository.FirstOrDefaultAsync((long)output.Tool.OrganizationUnitId);
                output.OrganizationUnitDisplayName = _lookupOrganizationUnit?.DisplayName?.ToString();
            }

            return output;
        }

        public async Task<GetToolForEditOutput> GetForEdit(EntityDto<Guid> input)
        {
            var entity = await _repository.FirstOrDefaultAsync(input.Id);

            var output = new GetToolForEditOutput { Tool = ObjectMapper.Map<CreateOrEditToolDto>(entity) };

            if (output.Tool.OrganizationUnitId != null)
            {
                var _lookupOrganizationUnit = await _lookup_organizationUnitRepository.FirstOrDefaultAsync((long)output.Tool.OrganizationUnitId);
                output.OrganizationUnitDisplayName = _lookupOrganizationUnit?.DisplayName?.ToString();
            }
            if (!string.IsNullOrEmpty(output.Tool.PosCode))
            {
                output.PosName = (await _lookup_buuCucRepository.GetAll().Where(e => !e.IsDeleted).Where(e => e.POSCode.Trim() == output.Tool.PosCode.Trim()).FirstOrDefaultAsync()).POSName.Trim();
            }
            return output;
        }

        public async Task CreateOrEdit(CreateOrEditToolDto input)
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

        protected virtual async Task Create(CreateOrEditToolDto input)
        {
            var entity = ObjectMapper.Map<Tool>(input);

            if (AbpSession.TenantId != null)
            {
                entity.TenantId = (int?)AbpSession.TenantId;
            }

            await _repository.InsertAsync(entity);
        }

        protected virtual async Task Update(CreateOrEditToolDto input)
        {
            var entity = await _repository.FirstOrDefaultAsync(input.Id.Value);
            var result = ObjectMapper.Map(input, entity);
        }

        public async Task Delete(EntityDto<Guid> input)
        {
            await _repository.DeleteAsync(input.Id);
        }
    }
}
