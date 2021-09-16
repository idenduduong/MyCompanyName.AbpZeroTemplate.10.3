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
using System.Threading.Tasks;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Categories
{
    [AbpAuthorize(AppPermissions.Pages_Administration_DM_TinhThanhs)]
    public class DM_TinhThanhsAppService : AbpZeroTemplateAppServiceBase, IDM_TinhThanhsAppService, IApplicationService, ITransientDependency
    {
        private readonly IRepository<DM_TinhThanh, Guid> _dM_TinhThanhRepository;

        private readonly IDM_TinhThanhsExcelExporter _dM_TinhThanhsExcelExporter;

        private readonly IRepository<DM_QuocGia, Guid> _dM_QuocGiaRepository;

        private readonly IRepository<DM_VungMien, Guid> _dM_VungMienRepository;

        public DM_TinhThanhsAppService(IRepository<DM_TinhThanh, Guid> dM_TinhThanhRepository, IDM_TinhThanhsExcelExporter dM_TinhThanhsExcelExporter, IRepository<DM_QuocGia, Guid> dM_QuocGiaRepository, IRepository<DM_VungMien, Guid> dM_VungMienRepository)
        {
            _dM_TinhThanhRepository = dM_TinhThanhRepository;
            _dM_TinhThanhsExcelExporter = dM_TinhThanhsExcelExporter;
            _dM_QuocGiaRepository = dM_QuocGiaRepository;
            _dM_VungMienRepository = dM_VungMienRepository;
        }

        [HttpPost]
        //[HttpGet]
        public async Task<PagedResultDto<GetDM_TinhThanhForView>> GetAll(GetAllDM_TinhThanhsInput input)
        //public async Task<PagedResultDto<GetDM_TinhThanhForView>> GetAll()
        {
            //GetAllDM_TinhThanhsInput input = new GetAllDM_TinhThanhsInput();
            //input.SkipCount = 0;
            //input.MaxResultCount = 10;
            //input.Filter = "";

            IQueryable<DM_TinhThanh> filteredDM_TinhThanhs = _dM_TinhThanhRepository.GetAll()
                .WhereIf(
                    !string.IsNullOrWhiteSpace(input.Filter),
                    (DM_TinhThanh e) => false || e.MaTinhThanh.Contains(input.Filter) || e.TenTinhThanh.Contains(input.Filter) || e.GhiChu.Contains(input.Filter) || e.UserTao.Contains(input.Filter) || e.UserSuaCuoi.Contains(input.Filter))
                .WhereIf(
                    !string.IsNullOrWhiteSpace(input.MaTinhThanhFilter),
                    (DM_TinhThanh e) => e.MaTinhThanh.ToLower() == input.MaTinhThanhFilter.ToLower().Trim())
                .WhereIf(
                    !string.IsNullOrWhiteSpace(input.TenTinhThanhFilter),
                    (DM_TinhThanh e) => e.TenTinhThanh.ToLower() == input.TenTinhThanhFilter.ToLower().Trim())
                .WhereIf(
                    !string.IsNullOrWhiteSpace(input.GhiChuFilter),
                    (DM_TinhThanh e) => e.GhiChu.ToLower() == input.GhiChuFilter.ToLower().Trim());

            IQueryable<GetDM_TinhThanhForView> query = (from o in filteredDM_TinhThanhs
                                                        join o1 in _dM_QuocGiaRepository.GetAll() on o.ID_QuocGia equals o1.Id into j1
                                                        from s1 in j1.DefaultIfEmpty()
                                                        join o2 in _dM_VungMienRepository.GetAll() on o.ID_VungMien equals o2.Id into j2
                                                        from s2 in j2.DefaultIfEmpty()
                                                        select new GetDM_TinhThanhForView
                                                        {
                                                            MaTinhThanh = o.MaTinhThanh,
                                                            TenTinhThanh = o.TenTinhThanh,
                                                            GhiChu = o.GhiChu,
                                                            DM_TinhThanh = ObjectMapper.Map<DM_TinhThanhDto>(o),
                                                            DM_QuocGiaTenNuoc = ((s1 == null) ? "" : s1.TenNuoc.ToString()),
                                                            DM_VungMienTenVung = ((s2 == null) ? "" : s2.TenVung.ToString())
                                                        })
                                                    .WhereIf(
                                                        !string.IsNullOrWhiteSpace(input.DM_QuocGiaTenNuocFilter),
                                                        (GetDM_TinhThanhForView e) => e.DM_QuocGiaTenNuoc.ToLower() == input.DM_QuocGiaTenNuocFilter.ToLower().Trim())
                                                    .WhereIf(
                                                        !string.IsNullOrWhiteSpace(input.DM_VungMienTenVungFilter),
                                                        (GetDM_TinhThanhForView e) => e.DM_VungMienTenVung.ToLower() == input.DM_VungMienTenVungFilter.ToLower().Trim());

            var strquery = query.ToQueryString();

            int count = query.Count();
            List<GetDM_TinhThanhForView> list;

            var result = new PagedResultDto<GetDM_TinhThanhForView>();

            if (input.Sorting == null)
            {
                list = query.OrderByDescending(q => q.MaTinhThanh).PageBy(input.SkipCount, input.MaxResultCount).ToList();
                //list = query.PageBy(10, 10).ToList();
            }
            else
            {
                list = query.OrderBy(q => q.NgayTao).PageBy(input.SkipCount, input.MaxResultCount).ToList();
            }

            if (query.Any())
            {
                result = new PagedResultDto<GetDM_TinhThanhForView>(count, list);
            }

            return result;
            //OrderBy(input.Sorting ?? "dM_TinhThanh.id asc"
            //.PageBy(input).ToListAsync());
            //list = query.OrderBy(q => q.DM_TinhThanh.MaTinhThanh).PageBy(input.SkipCount, input.MaxResultCount).ToList();
            //return new PagedResultDto<GetDM_TinhThanhForView>(count,list);
        }

        [AbpAuthorize(AppPermissions.Pages_Administration_DM_TinhThanhs_Edit)]
        public async Task<GetDM_TinhThanhForEditOutput> GetDM_TinhThanhForEdit(EntityDto<Guid> input)
        {
            DM_TinhThanh dM_TinhThanh = await _dM_TinhThanhRepository.FirstOrDefaultAsync(input.Id);

            //GetDM_TinhThanhForEditOutput output = new GetDM_TinhThanhForEditOutput();

            //if (dM_TinhThanh == null)
            //{
            //	return output;
            //}
            //output.DM_TinhThanh = ObjectMapper.Map<CreateOrEditDM_TinhThanhDto>(dM_TinhThanh);

            GetDM_TinhThanhForEditOutput output = new GetDM_TinhThanhForEditOutput
            {
                DM_TinhThanh = base.ObjectMapper.Map<CreateOrEditDM_TinhThanhDto>(dM_TinhThanh)
            };

            if (output.DM_TinhThanh.ID_QuocGia.HasValue)
            {
                output.DM_QuocGiaTenNuoc = (await _dM_QuocGiaRepository.FirstOrDefaultAsync(output.DM_TinhThanh.ID_QuocGia.Value)).TenNuoc.ToString();
            }
            if (output.DM_TinhThanh.ID_VungMien.HasValue)
            {
                output.DM_VungMienTenVung = (await _dM_VungMienRepository.FirstOrDefaultAsync(output.DM_TinhThanh.ID_VungMien.Value)).TenVung.ToString();
            }
            return output;
        }

        public async Task CreateOrEdit(CreateOrEditDM_TinhThanhDto input)
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

        [AbpAuthorize(AppPermissions.Pages_Administration_DM_TinhThanhs_Create)]
        private async Task Create(CreateOrEditDM_TinhThanhDto input)
        {
            DM_TinhThanh dM_TinhThanh = base.ObjectMapper.Map<DM_TinhThanh>(input);
            if (base.AbpSession.TenantId.HasValue)
            {
                dM_TinhThanh.TenantId = base.AbpSession.TenantId;
            }
            await _dM_TinhThanhRepository.InsertAsync(dM_TinhThanh);
        }

        [AbpAuthorize(AppPermissions.Pages_Administration_DM_TinhThanhs_Edit)]
        private async Task Update(CreateOrEditDM_TinhThanhDto input)
        {
            DM_TinhThanh dM_TinhThanh = await _dM_TinhThanhRepository.FirstOrDefaultAsync(input.Id.Value);
            base.ObjectMapper.Map(input, dM_TinhThanh);
        }

        [AbpAuthorize(AppPermissions.Pages_Administration_DM_TinhThanhs_Delete)]
        public async Task Delete(EntityDto<Guid> input)
        {
            await _dM_TinhThanhRepository.DeleteAsync(input.Id);
        }

        public async Task<FileDto> GetDM_TinhThanhsToExcel(GetAllDM_TinhThanhsForExcelInput input)
        {
            List<GetDM_TinhThanhForView> dM_TinhThanhListDtos = await (from o in _dM_TinhThanhRepository.GetAll().WhereIf(!string.IsNullOrWhiteSpace(input.Filter), (DM_TinhThanh e) => false || e.MaTinhThanh.Contains(input.Filter) || e.TenTinhThanh.Contains(input.Filter) || e.GhiChu.Contains(input.Filter) || e.UserTao.Contains(input.Filter) || e.UserSuaCuoi.Contains(input.Filter)).WhereIf(!string.IsNullOrWhiteSpace(input.MaTinhThanhFilter), (DM_TinhThanh e) => e.MaTinhThanh.ToLower() == input.MaTinhThanhFilter.ToLower().Trim())
                    .WhereIf(!string.IsNullOrWhiteSpace(input.TenTinhThanhFilter), (DM_TinhThanh e) => e.TenTinhThanh.ToLower() == input.TenTinhThanhFilter.ToLower().Trim())
                    .WhereIf(!string.IsNullOrWhiteSpace(input.GhiChuFilter), (DM_TinhThanh e) => e.GhiChu.ToLower() == input.GhiChuFilter.ToLower().Trim())
                                                                       join o1 in _dM_QuocGiaRepository.GetAll() on o.ID_QuocGia equals o1.Id into j1
                                                                       from s1 in j1.DefaultIfEmpty()
                                                                       join o2 in _dM_VungMienRepository.GetAll() on o.ID_VungMien equals o2.Id into j2
                                                                       from s2 in j2.DefaultIfEmpty()
                                                                       select new GetDM_TinhThanhForView
                                                                       {
                                                                           //DM_TinhThanh = ObjectMapper.Map<DM_TinhThanhDto>(o),
                                                                           DM_QuocGiaTenNuoc = ((s1 == null) ? "" : s1.TenNuoc.ToString()),
                                                                           DM_VungMienTenVung = ((s2 == null) ? "" : s2.TenVung.ToString())
                                                                       }).WhereIf(!string.IsNullOrWhiteSpace(input.DM_QuocGiaTenNuocFilter), (GetDM_TinhThanhForView e) => e.DM_QuocGiaTenNuoc.ToLower() == input.DM_QuocGiaTenNuocFilter.ToLower().Trim()).WhereIf(!string.IsNullOrWhiteSpace(input.DM_VungMienTenVungFilter), (GetDM_TinhThanhForView e) => e.DM_VungMienTenVung.ToLower() == input.DM_VungMienTenVungFilter.ToLower().Trim()).ToListAsync();
            return _dM_TinhThanhsExcelExporter.ExportToFile(dM_TinhThanhListDtos);
        }

        //[AbpAuthorize(new string[] { "Pages.Categories.Locations.DM_TinhThanhs" })]
        public async Task<PagedResultDto<DM_QuocGiaLookupTableDto>> GetAllDM_QuocGiaForLookupTable(GetAllForLookupTableInput input)
        {
            IQueryable<DM_QuocGia> query = _dM_QuocGiaRepository.GetAll().WhereIf(!string.IsNullOrWhiteSpace(input.Filter), (DM_QuocGia e) => e.TenNuoc.ToString().Contains(input.Filter));
            int totalCount = await query.CountAsync();
            List<DM_QuocGia> obj = await query.PageBy(input).ToListAsync();
            List<DM_QuocGiaLookupTableDto> lookupTableDtoList = new List<DM_QuocGiaLookupTableDto>();
            foreach (DM_QuocGia dM_QuocGia in obj)
            {
                lookupTableDtoList.Add(new DM_QuocGiaLookupTableDto
                {
                    Id = dM_QuocGia.Id.ToString(),
                    DisplayName = dM_QuocGia.TenNuoc.ToString()
                });
            }
            return new PagedResultDto<DM_QuocGiaLookupTableDto>(totalCount, lookupTableDtoList);
        }

        //[AbpAuthorize(new string[] { "Pages.Categories.Locations.DM_TinhThanhs" })]
        public async Task<PagedResultDto<DM_VungMienLookupTableDto>> GetAllDM_VungMienForLookupTable(GetAllForLookupTableInput input)
        {
            IQueryable<DM_VungMien> query = _dM_VungMienRepository.GetAll().WhereIf(!string.IsNullOrWhiteSpace(input.Filter), (DM_VungMien e) => e.TenVung.ToString().Contains(input.Filter));
            int totalCount = await query.CountAsync();
            List<DM_VungMien> obj = await query.PageBy(input).ToListAsync();
            List<DM_VungMienLookupTableDto> lookupTableDtoList = new List<DM_VungMienLookupTableDto>();
            foreach (DM_VungMien dM_VungMien in obj)
            {
                lookupTableDtoList.Add(new DM_VungMienLookupTableDto
                {
                    Id = dM_VungMien.Id.ToString(),
                    DisplayName = dM_VungMien.TenVung.ToString()
                });
            }
            return new PagedResultDto<DM_VungMienLookupTableDto>(totalCount, lookupTableDtoList);
        }
    }

}
