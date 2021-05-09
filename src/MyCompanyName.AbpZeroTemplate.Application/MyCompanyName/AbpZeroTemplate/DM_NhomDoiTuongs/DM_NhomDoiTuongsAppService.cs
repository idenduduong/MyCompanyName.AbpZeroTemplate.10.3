using System;
using System.Linq;
using System.Linq.Dynamic.Core;
using Abp.Linq.Extensions;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using MyCompanyName.AbpZeroTemplate.MyCompanyName.AbpZeroTemplate.DM_NhomDoiTuongs.Exporting;
using MyCompanyName.AbpZeroTemplate.MyCompanyName.AbpZeroTemplate.DM_NhomDoiTuongs.Dtos;
using MyCompanyName.AbpZeroTemplate.Dto;
using Abp.Application.Services.Dto;
using MyCompanyName.AbpZeroTemplate.Authorization;
using Abp.Extensions;
using Abp.Authorization;
using Microsoft.EntityFrameworkCore;
using Abp.UI;
using MyCompanyName.AbpZeroTemplate.Storage;

namespace MyCompanyName.AbpZeroTemplate.MyCompanyName.AbpZeroTemplate.DM_NhomDoiTuongs
{
    [AbpAuthorize(AppPermissions.Pages_DM_NhomDoiTuongs)]
    public class DM_NhomDoiTuongsAppService : AbpZeroTemplateAppServiceBase, IDM_NhomDoiTuongsAppService
    {
        private readonly IRepository<DM_NhomDoiTuongs, Guid> _dM_NhomDoiTuongsRepository;
        private readonly IDM_NhomDoiTuongsExcelExporter _dM_NhomDoiTuongsExcelExporter;

        public DM_NhomDoiTuongsAppService(IRepository<DM_NhomDoiTuongs, Guid> dM_NhomDoiTuongsRepository, IDM_NhomDoiTuongsExcelExporter dM_NhomDoiTuongsExcelExporter)
        {
            _dM_NhomDoiTuongsRepository = dM_NhomDoiTuongsRepository;
            _dM_NhomDoiTuongsExcelExporter = dM_NhomDoiTuongsExcelExporter;

        }

        public async Task<PagedResultDto<GetDM_NhomDoiTuongsForViewDto>> GetAll(GetAllDM_NhomDoiTuongsInput input)
        {

            var filteredDM_NhomDoiTuongs = _dM_NhomDoiTuongsRepository.GetAll()
                        .WhereIf(!string.IsNullOrWhiteSpace(input.Filter), e => false || e.MaNhom.Contains(input.Filter) || e.TenNhom.Contains(input.Filter) || e.GhiChu.Contains(input.Filter) || e.UserTao.Contains(input.Filter) || e.UserSuaCuoi.Contains(input.Filter))
                        .WhereIf(input.MinLoaiDoiTuongFilter != null, e => e.LoaiDoiTuong >= input.MinLoaiDoiTuongFilter)
                        .WhereIf(input.MaxLoaiDoiTuongFilter != null, e => e.LoaiDoiTuong <= input.MaxLoaiDoiTuongFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.MaNhomFilter), e => e.MaNhom == input.MaNhomFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.TenNhomFilter), e => e.TenNhom == input.TenNhomFilter)
                        .WhereIf(input.MinMucDiemFilter != null, e => e.MucDiem >= input.MinMucDiemFilter)
                        .WhereIf(input.MaxMucDiemFilter != null, e => e.MucDiem <= input.MaxMucDiemFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.GhiChuFilter), e => e.GhiChu == input.GhiChuFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.UserTaoFilter), e => e.UserTao == input.UserTaoFilter)
                        .WhereIf(input.MinNgayTaoFilter != null, e => e.NgayTao >= input.MinNgayTaoFilter)
                        .WhereIf(input.MaxNgayTaoFilter != null, e => e.NgayTao <= input.MaxNgayTaoFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.UserSuaCuoiFilter), e => e.UserSuaCuoi == input.UserSuaCuoiFilter)
                        .WhereIf(input.MinNgaySuaCuoiFilter != null, e => e.NgaySuaCuoi >= input.MinNgaySuaCuoiFilter)
                        .WhereIf(input.MaxNgaySuaCuoiFilter != null, e => e.NgaySuaCuoi <= input.MaxNgaySuaCuoiFilter)
                        .WhereIf(input.MinCreationTimeFilter != null, e => e.CreationTime >= input.MinCreationTimeFilter)
                        .WhereIf(input.MaxCreationTimeFilter != null, e => e.CreationTime <= input.MaxCreationTimeFilter)
                        .WhereIf(input.MinLastModificationTimeFilter != null, e => e.LastModificationTime >= input.MinLastModificationTimeFilter)
                        .WhereIf(input.MaxLastModificationTimeFilter != null, e => e.LastModificationTime <= input.MaxLastModificationTimeFilter)
                        .WhereIf(input.IsDeletedFilter.HasValue && input.IsDeletedFilter > -1, e => (input.IsDeletedFilter == 1 && e.IsDeleted) || (input.IsDeletedFilter == 0 && !e.IsDeleted))
                        .WhereIf(input.MinDeletionTimeFilter != null, e => e.DeletionTime >= input.MinDeletionTimeFilter)
                        .WhereIf(input.MaxDeletionTimeFilter != null, e => e.DeletionTime <= input.MaxDeletionTimeFilter);

            var pagedAndFilteredDM_NhomDoiTuongs = filteredDM_NhomDoiTuongs
                .OrderBy(input.Sorting ?? "id asc")
                .PageBy(input);

            var dM_NhomDoiTuongs = from o in pagedAndFilteredDM_NhomDoiTuongs
                                   select new
                                   {

                                       o.LoaiDoiTuong,
                                       o.MaNhom,
                                       o.TenNhom,
                                       o.MucDiem,
                                       o.GhiChu,
                                       o.UserTao,
                                       o.NgayTao,
                                       o.UserSuaCuoi,
                                       o.NgaySuaCuoi,
                                       o.CreationTime,
                                       o.LastModificationTime,
                                       o.IsDeleted,
                                       o.DeletionTime,
                                       Id = o.Id
                                   };

            var totalCount = await filteredDM_NhomDoiTuongs.CountAsync();

            var dbList = await dM_NhomDoiTuongs.ToListAsync();
            var results = new List<GetDM_NhomDoiTuongsForViewDto>();

            foreach (var o in dbList)
            {
                var res = new GetDM_NhomDoiTuongsForViewDto()
                {
                    DM_NhomDoiTuongs = new DM_NhomDoiTuongsDto
                    {

                        LoaiDoiTuong = o.LoaiDoiTuong,
                        MaNhom = o.MaNhom,
                        TenNhom = o.TenNhom,
                        MucDiem = o.MucDiem,
                        GhiChu = o.GhiChu,
                        UserTao = o.UserTao,
                        NgayTao = o.NgayTao,
                        UserSuaCuoi = o.UserSuaCuoi,
                        NgaySuaCuoi = o.NgaySuaCuoi,
                        CreationTime = o.CreationTime,
                        LastModificationTime = o.LastModificationTime,
                        IsDeleted = o.IsDeleted,
                        DeletionTime = o.DeletionTime,
                        Id = o.Id,
                    }
                };

                results.Add(res);
            }

            return new PagedResultDto<GetDM_NhomDoiTuongsForViewDto>(
                totalCount,
                results
            );

        }

        public async Task<GetDM_NhomDoiTuongsForViewDto> GetDM_NhomDoiTuongsForView(Guid id)
        {
            var dM_NhomDoiTuongs = await _dM_NhomDoiTuongsRepository.GetAsync(id);

            var output = new GetDM_NhomDoiTuongsForViewDto { DM_NhomDoiTuongs = ObjectMapper.Map<DM_NhomDoiTuongsDto>(dM_NhomDoiTuongs) };

            return output;
        }

        [AbpAuthorize(AppPermissions.Pages_DM_NhomDoiTuongs_Edit)]
        public async Task<GetDM_NhomDoiTuongsForEditOutput> GetDM_NhomDoiTuongsForEdit(EntityDto<Guid> input)
        {
            var dM_NhomDoiTuongs = await _dM_NhomDoiTuongsRepository.FirstOrDefaultAsync(input.Id);

            var output = new GetDM_NhomDoiTuongsForEditOutput { DM_NhomDoiTuongs = ObjectMapper.Map<CreateOrEditDM_NhomDoiTuongsDto>(dM_NhomDoiTuongs) };

            return output;
        }

        public async Task CreateOrEdit(CreateOrEditDM_NhomDoiTuongsDto input)
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

        [AbpAuthorize(AppPermissions.Pages_DM_NhomDoiTuongs_Create)]
        protected virtual async Task Create(CreateOrEditDM_NhomDoiTuongsDto input)
        {
            var dM_NhomDoiTuongs = ObjectMapper.Map<DM_NhomDoiTuongs>(input);

            if (AbpSession.TenantId != null)
            {
                dM_NhomDoiTuongs.TenantId = (int?)AbpSession.TenantId;
            }

            await _dM_NhomDoiTuongsRepository.InsertAsync(dM_NhomDoiTuongs);

        }

        [AbpAuthorize(AppPermissions.Pages_DM_NhomDoiTuongs_Edit)]
        protected virtual async Task Update(CreateOrEditDM_NhomDoiTuongsDto input)
        {
            var dM_NhomDoiTuongs = await _dM_NhomDoiTuongsRepository.FirstOrDefaultAsync((Guid)input.Id);
            ObjectMapper.Map(input, dM_NhomDoiTuongs);

        }

        [AbpAuthorize(AppPermissions.Pages_DM_NhomDoiTuongs_Delete)]
        public async Task Delete(EntityDto<Guid> input)
        {
            await _dM_NhomDoiTuongsRepository.DeleteAsync(input.Id);
        }

        public async Task<FileDto> GetDM_NhomDoiTuongsToExcel(GetAllDM_NhomDoiTuongsForExcelInput input)
        {

            var filteredDM_NhomDoiTuongs = _dM_NhomDoiTuongsRepository.GetAll()
                        .WhereIf(!string.IsNullOrWhiteSpace(input.Filter), e => false || e.MaNhom.Contains(input.Filter) || e.TenNhom.Contains(input.Filter) || e.GhiChu.Contains(input.Filter) || e.UserTao.Contains(input.Filter) || e.UserSuaCuoi.Contains(input.Filter))
                        .WhereIf(input.MinLoaiDoiTuongFilter != null, e => e.LoaiDoiTuong >= input.MinLoaiDoiTuongFilter)
                        .WhereIf(input.MaxLoaiDoiTuongFilter != null, e => e.LoaiDoiTuong <= input.MaxLoaiDoiTuongFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.MaNhomFilter), e => e.MaNhom == input.MaNhomFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.TenNhomFilter), e => e.TenNhom == input.TenNhomFilter)
                        .WhereIf(input.MinMucDiemFilter != null, e => e.MucDiem >= input.MinMucDiemFilter)
                        .WhereIf(input.MaxMucDiemFilter != null, e => e.MucDiem <= input.MaxMucDiemFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.GhiChuFilter), e => e.GhiChu == input.GhiChuFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.UserTaoFilter), e => e.UserTao == input.UserTaoFilter)
                        .WhereIf(input.MinNgayTaoFilter != null, e => e.NgayTao >= input.MinNgayTaoFilter)
                        .WhereIf(input.MaxNgayTaoFilter != null, e => e.NgayTao <= input.MaxNgayTaoFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.UserSuaCuoiFilter), e => e.UserSuaCuoi == input.UserSuaCuoiFilter)
                        .WhereIf(input.MinNgaySuaCuoiFilter != null, e => e.NgaySuaCuoi >= input.MinNgaySuaCuoiFilter)
                        .WhereIf(input.MaxNgaySuaCuoiFilter != null, e => e.NgaySuaCuoi <= input.MaxNgaySuaCuoiFilter)
                        .WhereIf(input.MinCreationTimeFilter != null, e => e.CreationTime >= input.MinCreationTimeFilter)
                        .WhereIf(input.MaxCreationTimeFilter != null, e => e.CreationTime <= input.MaxCreationTimeFilter)
                        .WhereIf(input.MinLastModificationTimeFilter != null, e => e.LastModificationTime >= input.MinLastModificationTimeFilter)
                        .WhereIf(input.MaxLastModificationTimeFilter != null, e => e.LastModificationTime <= input.MaxLastModificationTimeFilter)
                        .WhereIf(input.IsDeletedFilter.HasValue && input.IsDeletedFilter > -1, e => (input.IsDeletedFilter == 1 && e.IsDeleted) || (input.IsDeletedFilter == 0 && !e.IsDeleted))
                        .WhereIf(input.MinDeletionTimeFilter != null, e => e.DeletionTime >= input.MinDeletionTimeFilter)
                        .WhereIf(input.MaxDeletionTimeFilter != null, e => e.DeletionTime <= input.MaxDeletionTimeFilter);

            var query = (from o in filteredDM_NhomDoiTuongs
                         select new GetDM_NhomDoiTuongsForViewDto()
                         {
                             DM_NhomDoiTuongs = new DM_NhomDoiTuongsDto
                             {
                                 LoaiDoiTuong = o.LoaiDoiTuong,
                                 MaNhom = o.MaNhom,
                                 TenNhom = o.TenNhom,
                                 MucDiem = o.MucDiem,
                                 GhiChu = o.GhiChu,
                                 UserTao = o.UserTao,
                                 NgayTao = o.NgayTao,
                                 UserSuaCuoi = o.UserSuaCuoi,
                                 NgaySuaCuoi = o.NgaySuaCuoi,
                                 CreationTime = o.CreationTime,
                                 LastModificationTime = o.LastModificationTime,
                                 IsDeleted = o.IsDeleted,
                                 DeletionTime = o.DeletionTime,
                                 Id = o.Id
                             }
                         });

            var dM_NhomDoiTuongsListDtos = await query.ToListAsync();

            return _dM_NhomDoiTuongsExcelExporter.ExportToFile(dM_NhomDoiTuongsListDtos);
        }

    }
}