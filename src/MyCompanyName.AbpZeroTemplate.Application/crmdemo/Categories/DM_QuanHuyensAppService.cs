using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Dependency;
using Abp.Domain.Repositories;
using Abp.Linq.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyCompanyName.AbpZeroTemplate.Authorization;
using MyCompanyName.AbpZeroTemplate.crmdemo.Categories.Dtos;
using MyCompanyName.AbpZeroTemplate.crmdemo.Categories.Exporting;
using MyCompanyName.AbpZeroTemplate.crmdemo.Common.Dtos;
using MyCompanyName.AbpZeroTemplate.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Categories
{
    [AbpAuthorize(AppPermissions.Pages_Administration_DM_QuanHuyens)]
    public class DM_QuanHuyensAppService : AbpZeroTemplateAppServiceBase, IDM_QuanHuyensAppService, IApplicationService, ITransientDependency
    {
        private readonly IRepository<DM_QuanHuyen, Guid> _dM_QuanHuyenRepository;

        private readonly IDM_QuanHuyensExcelExporter _dM_QuanHuyensExcelExporter;

        private readonly IRepository<DM_TinhThanh, Guid> _dM_TinhThanhRepository;

        public DM_QuanHuyensAppService(IRepository<DM_QuanHuyen, Guid> dM_QuanHuyenRepository, IDM_QuanHuyensExcelExporter dM_QuanHuyensExcelExporter, IRepository<DM_TinhThanh, Guid> dM_TinhThanhRepository)
        {
            _dM_QuanHuyenRepository = dM_QuanHuyenRepository;
            _dM_QuanHuyensExcelExporter = dM_QuanHuyensExcelExporter;
            _dM_TinhThanhRepository = dM_TinhThanhRepository;
        }

        [HttpPost]
        public async Task<PagedResultDto<GetDM_QuanHuyenForView>> GetAll(GetAllDM_QuanHuyensInput input)
        {
            //IQueryable<DM_QuanHuyen> filteredDM_QuanHuyens = _dM_QuanHuyenRepository.GetAll().WhereIf(!string.IsNullOrWhiteSpace(input.Filter), (DM_QuanHuyen e) => false || e.MaQuanHuyen.Contains(input.Filter) || e.TenQuanHuyen.Contains(input.Filter) || e.GhiChu.Contains(input.Filter) || e.UserTao.Contains(input.Filter) || e.UserSuaCuoi.Contains(input.Filter)).WhereIf(!string.IsNullOrWhiteSpace(input.MaQuanHuyenFilter), (DM_QuanHuyen e) => e.MaQuanHuyen.ToLower() == input.MaQuanHuyenFilter.ToLower().Trim())
            //    .WhereIf(!string.IsNullOrWhiteSpace(input.TenQuanHuyenFilter), (DM_QuanHuyen e) => e.TenQuanHuyen.ToLower() == input.TenQuanHuyenFilter.ToLower().Trim())
            //    .WhereIf(!string.IsNullOrWhiteSpace(input.GhiChuFilter), (DM_QuanHuyen e) => e.GhiChu.ToLower() == input.GhiChuFilter.ToLower().Trim());
            //IQueryable<GetDM_QuanHuyenForView> query = (from o in filteredDM_QuanHuyens
            //                                            join o1 in _dM_TinhThanhRepository.GetAll() on o.ID_TinhThanh equals o1.Id into j1
            //                                            from s1 in j1.DefaultIfEmpty()
            //                                            select new GetDM_QuanHuyenForView
            //                                            {
            //                                                DM_QuanHuyen = ObjectMapper.Map<DM_QuanHuyenDto>(o),
            //                                                DM_TinhThanhTenTinhThanh = ((s1 == null) ? "" : s1.TenTinhThanh.ToString())
            //                                            }).WhereIf(!string.IsNullOrWhiteSpace(input.DM_TinhThanhTenTinhThanhFilter), (GetDM_QuanHuyenForView e) => e.DM_TinhThanhTenTinhThanh.ToLower() == input.DM_TinhThanhTenTinhThanhFilter.ToLower().Trim());
            //return new PagedResultDto<GetDM_QuanHuyenForView>(await query.CountAsync(), await query.OrderBy(input.Sorting ?? "dM_QuanHuyen.id asc").PageBy(input).ToListAsync());

            IQueryable<DM_QuanHuyen> filteredDM_QuanHuyens = _dM_QuanHuyenRepository.GetAll()
                .WhereIf(
                    !string.IsNullOrWhiteSpace(input.Filter), 
                    (DM_QuanHuyen e) => false || e.MaQuanHuyen.Contains(input.Filter) || e.TenQuanHuyen.Contains(input.Filter) || e.GhiChu.Contains(input.Filter) || e.UserTao.Contains(input.Filter) || e.UserSuaCuoi.Contains(input.Filter))
                .WhereIf(
                    !string.IsNullOrWhiteSpace(input.MaQuanHuyenFilter), 
                    (DM_QuanHuyen e) => e.MaQuanHuyen.ToLower() == input.MaQuanHuyenFilter.ToLower().Trim())
                .WhereIf(
                    !string.IsNullOrWhiteSpace(input.TenQuanHuyenFilter), 
                    (DM_QuanHuyen e) => e.TenQuanHuyen.ToLower() == input.TenQuanHuyenFilter.ToLower().Trim())
                .WhereIf(
                    !string.IsNullOrWhiteSpace(input.GhiChuFilter), 
                    (DM_QuanHuyen e) => e.GhiChu.ToLower() == input.GhiChuFilter.ToLower().Trim());

            var strfilterQuery = filteredDM_QuanHuyens.ToQueryString();

            IQueryable<GetDM_QuanHuyenForView> query = (from o in filteredDM_QuanHuyens
                                                        join o1 in _dM_TinhThanhRepository.GetAll()
                                                        
                                                        .WhereIf(!string.IsNullOrWhiteSpace(input.DM_TinhThanhTenTinhThanhFilter),
                                                            (DM_TinhThanh f) => f.TenTinhThanh.ToLower().Equals(input.DM_TinhThanhTenTinhThanhFilter.ToLower().Trim()))
                                                        
                                                        on o.ID_TinhThanh equals o1.Id into j1
                                                        from s1 in j1.DefaultIfEmpty()
                                                        select new GetDM_QuanHuyenForView
                                                        {
                                                            DM_QuanHuyen = ObjectMapper.Map<DM_QuanHuyenDto>(o),
                                                            DM_TinhThanhTenTinhThanh = ((s1 == null) ? "" : s1.TenTinhThanh.ToString())
                                                        });
                                                        //.Whereif(
                                                        //    !string.IsNullOrWhiteSpace(input.DM_TinhThanhTenTinhThanhFilter),
                                                        //    (GetDM_QuanHuyenForView e) => e.DM_TinhThanhTenTinhThanh.ToLower().Equals(input.DM_TinhThanhTenTinhThanhFilter.ToLower().Trim()));


            var strquery = query.ToQueryString();

            int count = query.Count();
            List<GetDM_QuanHuyenForView> list;

            var result = new PagedResultDto<GetDM_QuanHuyenForView>();

            if (input.Sorting == null)
            {
                //OrderByDescending(q => q.DM_QuanHuyen.MaQuanHuyen)
                list = query.PageBy(input.SkipCount, input.MaxResultCount).ToList();
                //list = query.PageBy(10, 10).ToList();
            }
            else
            {
                //OrderBy(q => q.DM_QuanHuyen.NgayTao).
                list = query.PageBy(input.SkipCount, input.MaxResultCount).ToList();
            }

            if (query.Any())
            {
                result = new PagedResultDto<GetDM_QuanHuyenForView>(count, list);
            }

            return result;
        }

        [AbpAuthorize(AppPermissions.Pages_Administration_DM_QuanHuyens_Edit)]
        public async Task<GetDM_QuanHuyenForEditOutput> GetDM_QuanHuyenForEdit(EntityDto<Guid> input)
        {
            DM_QuanHuyen dM_QuanHuyen = await _dM_QuanHuyenRepository.FirstOrDefaultAsync(input.Id);
            GetDM_QuanHuyenForEditOutput output = new GetDM_QuanHuyenForEditOutput
            {
                DM_QuanHuyen = base.ObjectMapper.Map<CreateOrEditDM_QuanHuyenDto>(dM_QuanHuyen)
            };
            if (output.DM_QuanHuyen.ID_TinhThanh.HasValue)
            {
                output.DM_TinhThanhTenTinhThanh = (await _dM_TinhThanhRepository.FirstOrDefaultAsync(output.DM_QuanHuyen.ID_TinhThanh.Value)).TenTinhThanh.ToString();
            }
            return output;
        }

        [AbpAuthorize(AppPermissions.Pages_Administration_DM_QuanHuyens_Edit)]
        public async Task CreateOrEdit(CreateOrEditDM_QuanHuyenDto input)
        {
            if (!input.Id.HasValue)
            {
                await Create(input);
            }
            else
            {
                await Update(input);
            }
        }

        [AbpAuthorize(AppPermissions.Pages_Administration_DM_QuanHuyens_Edit)]
        private async Task Create(CreateOrEditDM_QuanHuyenDto input)
        {
            DM_QuanHuyen dM_QuanHuyen = base.ObjectMapper.Map<DM_QuanHuyen>(input);
            if (base.AbpSession.TenantId.HasValue)
            {
                dM_QuanHuyen.TenantId = base.AbpSession.TenantId;
            }
            await _dM_QuanHuyenRepository.InsertAsync(dM_QuanHuyen);
        }

        [AbpAuthorize(AppPermissions.Pages_Administration_DM_QuanHuyens_Edit)]
        private async Task Update(CreateOrEditDM_QuanHuyenDto input)
        {
            DM_QuanHuyen dM_QuanHuyen = await _dM_QuanHuyenRepository.FirstOrDefaultAsync(input.Id.Value);
            base.ObjectMapper.Map(input, dM_QuanHuyen);
        }

        [AbpAuthorize(AppPermissions.Pages_Administration_DM_QuanHuyens_Delete)]
        public async Task Delete(EntityDto<Guid> input)
        {
            await _dM_QuanHuyenRepository.DeleteAsync(input.Id);
        }

        public async Task<FileDto> GetDM_QuanHuyensToExcel(GetAllDM_QuanHuyensForExcelInput input)
        {
            List<GetDM_QuanHuyenForView> dM_QuanHuyenListDtos = await (from o in _dM_QuanHuyenRepository.GetAll().WhereIf(!string.IsNullOrWhiteSpace(input.Filter), (DM_QuanHuyen e) => false || e.MaQuanHuyen.Contains(input.Filter) || e.TenQuanHuyen.Contains(input.Filter) || e.GhiChu.Contains(input.Filter) || e.UserTao.Contains(input.Filter) || e.UserSuaCuoi.Contains(input.Filter)).WhereIf(!string.IsNullOrWhiteSpace(input.MaQuanHuyenFilter), (DM_QuanHuyen e) => e.MaQuanHuyen.ToLower() == input.MaQuanHuyenFilter.ToLower().Trim())
                    .WhereIf(!string.IsNullOrWhiteSpace(input.TenQuanHuyenFilter), (DM_QuanHuyen e) => e.TenQuanHuyen.ToLower() == input.TenQuanHuyenFilter.ToLower().Trim())
                    .WhereIf(!string.IsNullOrWhiteSpace(input.GhiChuFilter), (DM_QuanHuyen e) => e.GhiChu.ToLower() == input.GhiChuFilter.ToLower().Trim())
                                                                       join o1 in _dM_TinhThanhRepository.GetAll() on o.ID_TinhThanh equals o1.Id into j1
                                                                       from s1 in j1.DefaultIfEmpty()
                                                                       select new GetDM_QuanHuyenForView
                                                                       {
                                                                           DM_QuanHuyen = ObjectMapper.Map<DM_QuanHuyenDto>(o),
                                                                           DM_TinhThanhTenTinhThanh = ((s1 == null) ? "" : s1.TenTinhThanh.ToString())
                                                                       }).WhereIf(!string.IsNullOrWhiteSpace(input.DM_TinhThanhTenTinhThanhFilter), (GetDM_QuanHuyenForView e) => e.DM_TinhThanhTenTinhThanh.ToLower() == input.DM_TinhThanhTenTinhThanhFilter.ToLower().Trim()).ToListAsync();
            return _dM_QuanHuyensExcelExporter.ExportToFile(dM_QuanHuyenListDtos);
        }

        public async Task<PagedResultDto<DM_TinhThanhLookupTableDto>> GetAllDM_TinhThanhForLookupTable(GetAllForLookupTableInput input)
        {
            IQueryable<DM_TinhThanh> query = _dM_TinhThanhRepository.GetAll().WhereIf(!string.IsNullOrWhiteSpace(input.Filter), (DM_TinhThanh e) => e.TenTinhThanh.ToString().Contains(input.Filter));
            int totalCount = await query.CountAsync();
            List<DM_TinhThanh> obj = await query.PageBy(input).ToListAsync();
            List<DM_TinhThanhLookupTableDto> lookupTableDtoList = new List<DM_TinhThanhLookupTableDto>();
            foreach (DM_TinhThanh dM_TinhThanh in obj)
            {
                lookupTableDtoList.Add(new DM_TinhThanhLookupTableDto
                {
                    Id = dM_TinhThanh.Id.ToString(),
                    DisplayName = dM_TinhThanh.TenTinhThanh.ToString()
                });
            }
            return new PagedResultDto<DM_TinhThanhLookupTableDto>(totalCount, lookupTableDtoList);
        }
    }
}
