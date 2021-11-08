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
    public class ToolsRepairHistoryAppService : AbpZeroTemplateAppServiceBase, IToolsRepairHistory
    {
        private readonly IRepository<ToolRepairHistory, Guid> _repository;
        private readonly IRepository<Tool, Guid> _lookup_toolRepository;
        private readonly IRepository<BuuCuc, Guid> _lookup_buucucRepository;
        private readonly IRepository<OrganizationUnit, long> _lookup_organizationUnitRepository;

        public ToolsRepairHistoryAppService(IRepository<ToolRepairHistory, Guid> repository, IRepository<OrganizationUnit, long> lookup_organizationUnitRepository, IRepository<BuuCuc, Guid> lookup_buucucRepository, IRepository<Tool, Guid> lookup_toolRepository)
        {
            _repository = repository;
            _lookup_toolRepository = lookup_toolRepository;
            _lookup_buucucRepository = lookup_buucucRepository;
            _lookup_organizationUnitRepository = lookup_organizationUnitRepository;
        }

        public async Task<PagedResultDto<GetToolRepairForViewDto>> GetAll(GetAllToolRepairInput input)
        {
            bool foreingSort = false;// input.Sorting != null && (input.Sorting.Contains("provinceName") || input.Sorting.Contains("communeName") || input.Sorting.Contains("unitName"));
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

                           join o2 in _lookup_toolRepository.GetAll()
                           .WhereIf(!string.IsNullOrWhiteSpace(input.Note),
                                   (Tool e) => EF.Functions.Like(e.Note.Trim().ToLower(), "%" + input.Note.Trim().ToLower() + "%"))
                           on o.ToolId equals o2.Id into j2
                           from s2 in (!string.IsNullOrWhiteSpace(input.Note) ? j2 : j2.DefaultIfEmpty())

                           join o3 in _lookup_buucucRepository.GetAll()
                           .WhereIf(!string.IsNullOrWhiteSpace(input.POSCode),
                                    (BuuCuc e) => EF.Functions.Like(e.POSCode.Trim().ToLower(), "%" + input.POSCode.Trim().ToLower() + "%"))
                           on o.POSCode equals o3.POSCode into j3
                           from s3 in (!string.IsNullOrWhiteSpace(input.POSCode) ? j3 : j3.DefaultIfEmpty())

                            //join o4 in _lookup_provinceRepository.GetAll()
                            //.WhereIf(!string.IsNullOrWhiteSpace(input.ProvinceName),
                            //         (Province e) => EF.Functions.Like(e.ProvinceName.Trim().ToLower(), "%" + input.ProvinceName.Trim().ToLower() + "%"))
                            //on o.ProvinceCode equals o4.ProvinceCode into j4
                            //from s4 in j4
                            //from s4 in (!string.IsNullOrWhiteSpace(input.ProvinceName) ? j4 : j4.DefaultIfEmpty())

                           select new
                           {
                               o.RepairFrom,
                               o.RepairTo,
                               s2.Configuration,
                               //o.Configuration,
                               s2.Condition,
                               //o.Condition,
                               o.ToolStatus,
                               o.Note,
                               o.POSCode,
                               s3.POSName,
                               o.ToolId,
                               o.TenantId,
                               o.OrganizationUnitId,
                               o.IsDeleted,
                               o.Id,
                               s2.Type,
                               s2.Serial,
                               s2.UsedFrom,
                               s2.ToolName,
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
            var results = new List<GetToolRepairForViewDto>();

            foreach (var o in dbList)
            {
                try
                {
                    var res = new GetToolRepairForViewDto()
                    {
                        ToolRepairHistory = new ToolRepairHistoryDto
                        {
                            RepairFrom = o.RepairFrom,
                            RepairTo = o.RepairTo,
                            Configuration = o.Configuration,
                            Condition = o.Condition,
                            ToolStatus = o.ToolStatus,
                            Note = o.Note,
                            POSCode = o.POSCode,
                            POSName = o.POSName,
                            IsDeleted = o.IsDeleted,
                            Id = o.Id,
                        },
                        ToolId = o.ToolId,
                        ToolName = o.ToolName,
                        Type = (int)o.Type,
                        Serial = o.Serial,
                        UsedFrom = o.UsedFrom,
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

            return new PagedResultDto<GetToolRepairForViewDto>(
                totalCount,
                results
            );
        }
    }
}