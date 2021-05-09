using System;
using System.Linq;
using System.Linq.Dynamic.Core;
using Abp.Linq.Extensions;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using MyCompanyName.AbpZeroTemplate.DM_DoiTuongs.Exporting;
using MyCompanyName.AbpZeroTemplate.DM_DoiTuongs.Dtos;
using MyCompanyName.AbpZeroTemplate.Dto;
using Abp.Application.Services.Dto;
using MyCompanyName.AbpZeroTemplate.Authorization;
using Abp.Extensions;
using Abp.Authorization;
using Microsoft.EntityFrameworkCore;
using Abp.UI;
using MyCompanyName.AbpZeroTemplate.Storage;

namespace MyCompanyName.AbpZeroTemplate.DM_DoiTuongs
{
    [AbpAuthorize(AppPermissions.Pages_DM_DoiTuong)]
    public class DM_DoiTuongAppService : AbpZeroTemplateAppServiceBase, IDM_DoiTuongAppService
    {
        private readonly IRepository<DM_DoiTuong, Guid> _dM_DoiTuongRepository;
        private readonly IDM_DoiTuongExcelExporter _dM_DoiTuongExcelExporter;

        public DM_DoiTuongAppService(IRepository<DM_DoiTuong, Guid> dM_DoiTuongRepository, IDM_DoiTuongExcelExporter dM_DoiTuongExcelExporter)
        {
            _dM_DoiTuongRepository = dM_DoiTuongRepository;
            _dM_DoiTuongExcelExporter = dM_DoiTuongExcelExporter;

        }

        public async Task<PagedResultDto<GetDM_DoiTuongForViewDto>> GetAll(GetAllDM_DoiTuongInput input)
        {

            var filteredDM_DoiTuong = _dM_DoiTuongRepository.GetAll()
                        .WhereIf(!string.IsNullOrWhiteSpace(input.Filter), e => false || e.MaDoiTuong.Contains(input.Filter) || e.TenDoiTuong.Contains(input.Filter) || e.DienThoai.Contains(input.Filter) || e.Fax.Contains(input.Filter) || e.Email.Contains(input.Filter) || e.Website.Contains(input.Filter) || e.Anh.Contains(input.Filter) || e.MaSoThue.Contains(input.Filter) || e.TaiKhoanNganHang.Contains(input.Filter) || e.GhiChu.Contains(input.Filter) || e.CapTai_DKKD.Contains(input.Filter) || e.DiaChi.Contains(input.Filter) || e.NganHang.Contains(input.Filter) || e.NoiCapCMTND_DKKD.Contains(input.Filter) || e.SDT_CoQuan.Contains(input.Filter) || e.SDT_NhaRieng.Contains(input.Filter) || e.SoCMTND_DKKD.Contains(input.Filter) || e.ThuongTru.Contains(input.Filter) || e.XungHo.Contains(input.Filter) || e.TenNguonKhach.Contains(input.Filter) || e.TenNhom.Contains(input.Filter) || e.ChucVu.Contains(input.Filter) || e.LinhVuc.Contains(input.Filter) || e.TenKhac.Contains(input.Filter) || e.DiaChiKhac.Contains(input.Filter) || e.CustomerManagementOrganizationCode.Contains(input.Filter) || e.CustomerManagementOrganizationName.Contains(input.Filter) || e.FileDinhKems.Contains(input.Filter) || e.Profile.Contains(input.Filter))
                        .WhereIf(input.MinLoaiDoiTuongFilter != null, e => e.LoaiDoiTuong >= input.MinLoaiDoiTuongFilter)
                        .WhereIf(input.MaxLoaiDoiTuongFilter != null, e => e.LoaiDoiTuong <= input.MaxLoaiDoiTuongFilter)
                        .WhereIf(input.LaCaNhanFilter.HasValue && input.LaCaNhanFilter > -1, e => (input.LaCaNhanFilter == 1 && e.LaCaNhan) || (input.LaCaNhanFilter == 0 && !e.LaCaNhan))
                        .WhereIf(!string.IsNullOrWhiteSpace(input.MaDoiTuongFilter), e => e.MaDoiTuong == input.MaDoiTuongFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.TenDoiTuongFilter), e => e.TenDoiTuong == input.TenDoiTuongFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.DienThoaiFilter), e => e.DienThoai == input.DienThoaiFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.FaxFilter), e => e.Fax == input.FaxFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.EmailFilter), e => e.Email == input.EmailFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.WebsiteFilter), e => e.Website == input.WebsiteFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.AnhFilter), e => e.Anh == input.AnhFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.MaSoThueFilter), e => e.MaSoThue == input.MaSoThueFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.TaiKhoanNganHangFilter), e => e.TaiKhoanNganHang == input.TaiKhoanNganHangFilter)
                        .WhereIf(input.MinGioiHanCongNoFilter != null, e => e.GioiHanCongNo >= input.MinGioiHanCongNoFilter)
                        .WhereIf(input.MaxGioiHanCongNoFilter != null, e => e.GioiHanCongNo <= input.MaxGioiHanCongNoFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.GhiChuFilter), e => e.GhiChu == input.GhiChuFilter)
                        .WhereIf(input.MinNgaySinh_NgayTLapFilter != null, e => e.NgaySinh_NgayTLap >= input.MinNgaySinh_NgayTLapFilter)
                        .WhereIf(input.MaxNgaySinh_NgayTLapFilter != null, e => e.NgaySinh_NgayTLap <= input.MaxNgaySinh_NgayTLapFilter)
                        .WhereIf(input.ChiaSeFilter.HasValue && input.ChiaSeFilter > -1, e => (input.ChiaSeFilter == 1 && e.ChiaSe) || (input.ChiaSeFilter == 0 && !e.ChiaSe))
                        .WhereIf(input.TheoDoiFilter.HasValue && input.TheoDoiFilter > -1, e => (input.TheoDoiFilter == 1 && e.TheoDoi) || (input.TheoDoiFilter == 0 && !e.TheoDoi))
                        .WhereIf(input.MinID_IndexFilter != null, e => e.ID_Index >= input.MinID_IndexFilter)
                        .WhereIf(input.MaxID_IndexFilter != null, e => e.ID_Index <= input.MaxID_IndexFilter)
                        .WhereIf(input.TheoDoiVanTayFilter.HasValue && input.TheoDoiVanTayFilter > -1, e => (input.TheoDoiVanTayFilter == 1 && e.TheoDoiVanTay) || (input.TheoDoiVanTayFilter == 0 && !e.TheoDoiVanTay))
                        .WhereIf(input.MinNgayDoiNhomFilter != null, e => e.NgayDoiNhom >= input.MinNgayDoiNhomFilter)
                        .WhereIf(input.MaxNgayDoiNhomFilter != null, e => e.NgayDoiNhom <= input.MaxNgayDoiNhomFilter)
                        .WhereIf(input.MinDiemKhoiTaoFilter != null, e => e.DiemKhoiTao >= input.MinDiemKhoiTaoFilter)
                        .WhereIf(input.MaxDiemKhoiTaoFilter != null, e => e.DiemKhoiTao <= input.MaxDiemKhoiTaoFilter)
                        .WhereIf(input.MinDoanhSoKhoiTaoFilter != null, e => e.DoanhSoKhoiTao >= input.MinDoanhSoKhoiTaoFilter)
                        .WhereIf(input.MaxDoanhSoKhoiTaoFilter != null, e => e.DoanhSoKhoiTao <= input.MaxDoanhSoKhoiTaoFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.ID_NguoiGioiThieuFilter.ToString()), e => e.ID_NguoiGioiThieu.ToString() == input.ID_NguoiGioiThieuFilter.ToString())
                        .WhereIf(!string.IsNullOrWhiteSpace(input.CapTai_DKKDFilter), e => e.CapTai_DKKD == input.CapTai_DKKDFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.DiaChiFilter), e => e.DiaChi == input.DiaChiFilter)
                        .WhereIf(input.GioiTinhNamFilter.HasValue && input.GioiTinhNamFilter > -1, e => (input.GioiTinhNamFilter == 1 && e.GioiTinhNam) || (input.GioiTinhNamFilter == 0 && !e.GioiTinhNam))
                        .WhereIf(!string.IsNullOrWhiteSpace(input.NganHangFilter), e => e.NganHang == input.NganHangFilter)
                        .WhereIf(input.MinNgayCapCMTND_DKKDFilter != null, e => e.NgayCapCMTND_DKKD >= input.MinNgayCapCMTND_DKKDFilter)
                        .WhereIf(input.MaxNgayCapCMTND_DKKDFilter != null, e => e.NgayCapCMTND_DKKD <= input.MaxNgayCapCMTND_DKKDFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.NoiCapCMTND_DKKDFilter), e => e.NoiCapCMTND_DKKD == input.NoiCapCMTND_DKKDFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.SDT_CoQuanFilter), e => e.SDT_CoQuan == input.SDT_CoQuanFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.SDT_NhaRiengFilter), e => e.SDT_NhaRieng == input.SDT_NhaRiengFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.SoCMTND_DKKDFilter), e => e.SoCMTND_DKKD == input.SoCMTND_DKKDFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.ThuongTruFilter), e => e.ThuongTru == input.ThuongTruFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.XungHoFilter), e => e.XungHo == input.XungHoFilter)
                        .WhereIf(input.MinNgayGiaoDichGanNhatFilter != null, e => e.NgayGiaoDichGanNhat >= input.MinNgayGiaoDichGanNhatFilter)
                        .WhereIf(input.MaxNgayGiaoDichGanNhatFilter != null, e => e.NgayGiaoDichGanNhat <= input.MaxNgayGiaoDichGanNhatFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.TenNguonKhachFilter), e => e.TenNguonKhach == input.TenNguonKhachFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.TenNhomFilter), e => e.TenNhom == input.TenNhomFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.ChucVuFilter), e => e.ChucVu == input.ChucVuFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.LinhVucFilter), e => e.LinhVuc == input.LinhVucFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.TenKhacFilter), e => e.TenKhac == input.TenKhacFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.DiaChiKhacFilter), e => e.DiaChiKhac == input.DiaChiKhacFilter)
                        .WhereIf(input.MinNgaySuaTrangThaiFilter != null, e => e.NgaySuaTrangThai >= input.MinNgaySuaTrangThaiFilter)
                        .WhereIf(input.MaxNgaySuaTrangThaiFilter != null, e => e.NgaySuaTrangThai <= input.MaxNgaySuaTrangThaiFilter)
                        .WhereIf(input.MinID_DonViQuanLyFilter != null, e => e.ID_DonViQuanLy >= input.MinID_DonViQuanLyFilter)
                        .WhereIf(input.MaxID_DonViQuanLyFilter != null, e => e.ID_DonViQuanLy <= input.MaxID_DonViQuanLyFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.CustomerManagementOrganizationCodeFilter), e => e.CustomerManagementOrganizationCode == input.CustomerManagementOrganizationCodeFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.CustomerManagementOrganizationNameFilter), e => e.CustomerManagementOrganizationName == input.CustomerManagementOrganizationNameFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.ID_NhomCuFilter.ToString()), e => e.ID_NhomCu.ToString() == input.ID_NhomCuFilter.ToString())
                        .WhereIf(input.MinID_NhanVienPhuTrachFilter != null, e => e.ID_NhanVienPhuTrach >= input.MinID_NhanVienPhuTrachFilter)
                        .WhereIf(input.MaxID_NhanVienPhuTrachFilter != null, e => e.ID_NhanVienPhuTrach <= input.MaxID_NhanVienPhuTrachFilter)
                        .WhereIf(input.MinTongDiemFilter != null, e => e.TongDiem >= input.MinTongDiemFilter)
                        .WhereIf(input.MaxTongDiemFilter != null, e => e.TongDiem <= input.MaxTongDiemFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.FileDinhKemsFilter), e => e.FileDinhKems == input.FileDinhKemsFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.MaFilter.ToString()), e => e.Ma.ToString() == input.MaFilter.ToString())
                        .WhereIf(!string.IsNullOrWhiteSpace(input.ProfileFilter), e => e.Profile == input.ProfileFilter)
                        .WhereIf(input.IsNewCustomerFilter.HasValue && input.IsNewCustomerFilter > -1, e => (input.IsNewCustomerFilter == 1 && e.IsNewCustomer) || (input.IsNewCustomerFilter == 0 && !e.IsNewCustomer))
                        .WhereIf(input.MinOrderFilter != null, e => e.Order >= input.MinOrderFilter)
                        .WhereIf(input.MaxOrderFilter != null, e => e.Order <= input.MaxOrderFilter)
                        .WhereIf(input.MinCreationTimeFilter != null, e => e.CreationTime >= input.MinCreationTimeFilter)
                        .WhereIf(input.MaxCreationTimeFilter != null, e => e.CreationTime <= input.MaxCreationTimeFilter)
                        .WhereIf(input.MinLastModificationTimeFilter != null, e => e.LastModificationTime >= input.MinLastModificationTimeFilter)
                        .WhereIf(input.MaxLastModificationTimeFilter != null, e => e.LastModificationTime <= input.MaxLastModificationTimeFilter)
                        .WhereIf(input.IsDeletedFilter.HasValue && input.IsDeletedFilter > -1, e => (input.IsDeletedFilter == 1 && e.IsDeleted) || (input.IsDeletedFilter == 0 && !e.IsDeleted))
                        .WhereIf(input.MinDeletionTimeFilter != null, e => e.DeletionTime >= input.MinDeletionTimeFilter)
                        .WhereIf(input.MaxDeletionTimeFilter != null, e => e.DeletionTime <= input.MaxDeletionTimeFilter);

            var pagedAndFilteredDM_DoiTuong = filteredDM_DoiTuong
                .OrderBy(input.Sorting ?? "id asc")
                .PageBy(input);

            var dM_DoiTuong = from o in pagedAndFilteredDM_DoiTuong
                              select new
                              {

                                  o.LoaiDoiTuong,
                                  o.LaCaNhan,
                                  o.MaDoiTuong,
                                  o.TenDoiTuong,
                                  o.DienThoai,
                                  o.Fax,
                                  o.Email,
                                  o.Website,
                                  o.Anh,
                                  o.MaSoThue,
                                  o.TaiKhoanNganHang,
                                  o.GioiHanCongNo,
                                  o.GhiChu,
                                  o.NgaySinh_NgayTLap,
                                  o.ChiaSe,
                                  o.TheoDoi,
                                  o.ID_Index,
                                  o.TheoDoiVanTay,
                                  o.NgayDoiNhom,
                                  o.DiemKhoiTao,
                                  o.DoanhSoKhoiTao,
                                  o.ID_NguoiGioiThieu,
                                  o.CapTai_DKKD,
                                  o.DiaChi,
                                  o.GioiTinhNam,
                                  o.NganHang,
                                  o.NgayCapCMTND_DKKD,
                                  o.NoiCapCMTND_DKKD,
                                  o.SDT_CoQuan,
                                  o.SDT_NhaRieng,
                                  o.SoCMTND_DKKD,
                                  o.ThuongTru,
                                  o.XungHo,
                                  o.NgayGiaoDichGanNhat,
                                  o.TenNguonKhach,
                                  o.TenNhom,
                                  o.ChucVu,
                                  o.LinhVuc,
                                  o.TenKhac,
                                  o.DiaChiKhac,
                                  o.NgaySuaTrangThai,
                                  o.ID_DonViQuanLy,
                                  o.CustomerManagementOrganizationCode,
                                  o.CustomerManagementOrganizationName,
                                  o.ID_NhomCu,
                                  o.ID_NhanVienPhuTrach,
                                  o.TongDiem,
                                  o.FileDinhKems,
                                  o.Ma,
                                  o.Profile,
                                  o.IsNewCustomer,
                                  o.Order,
                                  o.CreationTime,
                                  o.LastModificationTime,
                                  o.IsDeleted,
                                  o.DeletionTime,
                                  Id = o.Id
                              };

            var totalCount = await filteredDM_DoiTuong.CountAsync();

            var dbList = await dM_DoiTuong.ToListAsync();
            var results = new List<GetDM_DoiTuongForViewDto>();

            foreach (var o in dbList)
            {
                var res = new GetDM_DoiTuongForViewDto()
                {
                    DM_DoiTuong = new DM_DoiTuongDto
                    {

                        LoaiDoiTuong = o.LoaiDoiTuong,
                        LaCaNhan = o.LaCaNhan,
                        MaDoiTuong = o.MaDoiTuong,
                        TenDoiTuong = o.TenDoiTuong,
                        DienThoai = o.DienThoai,
                        Fax = o.Fax,
                        Email = o.Email,
                        Website = o.Website,
                        Anh = o.Anh,
                        MaSoThue = o.MaSoThue,
                        TaiKhoanNganHang = o.TaiKhoanNganHang,
                        GioiHanCongNo = o.GioiHanCongNo,
                        GhiChu = o.GhiChu,
                        NgaySinh_NgayTLap = o.NgaySinh_NgayTLap,
                        ChiaSe = o.ChiaSe,
                        TheoDoi = o.TheoDoi,
                        ID_Index = o.ID_Index,
                        TheoDoiVanTay = o.TheoDoiVanTay,
                        NgayDoiNhom = o.NgayDoiNhom,
                        DiemKhoiTao = o.DiemKhoiTao,
                        DoanhSoKhoiTao = o.DoanhSoKhoiTao,
                        ID_NguoiGioiThieu = o.ID_NguoiGioiThieu,
                        CapTai_DKKD = o.CapTai_DKKD,
                        DiaChi = o.DiaChi,
                        GioiTinhNam = o.GioiTinhNam,
                        NganHang = o.NganHang,
                        NgayCapCMTND_DKKD = o.NgayCapCMTND_DKKD,
                        NoiCapCMTND_DKKD = o.NoiCapCMTND_DKKD,
                        SDT_CoQuan = o.SDT_CoQuan,
                        SDT_NhaRieng = o.SDT_NhaRieng,
                        SoCMTND_DKKD = o.SoCMTND_DKKD,
                        ThuongTru = o.ThuongTru,
                        XungHo = o.XungHo,
                        NgayGiaoDichGanNhat = o.NgayGiaoDichGanNhat,
                        TenNguonKhach = o.TenNguonKhach,
                        TenNhom = o.TenNhom,
                        ChucVu = o.ChucVu,
                        LinhVuc = o.LinhVuc,
                        TenKhac = o.TenKhac,
                        DiaChiKhac = o.DiaChiKhac,
                        NgaySuaTrangThai = o.NgaySuaTrangThai,
                        ID_DonViQuanLy = o.ID_DonViQuanLy,
                        CustomerManagementOrganizationCode = o.CustomerManagementOrganizationCode,
                        CustomerManagementOrganizationName = o.CustomerManagementOrganizationName,
                        ID_NhomCu = o.ID_NhomCu,
                        ID_NhanVienPhuTrach = o.ID_NhanVienPhuTrach,
                        TongDiem = o.TongDiem,
                        FileDinhKems = o.FileDinhKems,
                        Ma = o.Ma,
                        Profile = o.Profile,
                        IsNewCustomer = o.IsNewCustomer,
                        Order = o.Order,
                        CreationTime = o.CreationTime,
                        LastModificationTime = o.LastModificationTime,
                        IsDeleted = o.IsDeleted,
                        DeletionTime = o.DeletionTime,
                        Id = o.Id,
                    }
                };

                results.Add(res);
            }

            return new PagedResultDto<GetDM_DoiTuongForViewDto>(
                totalCount,
                results
            );

        }

        public async Task<GetDM_DoiTuongForViewDto> GetDM_DoiTuongForView(Guid id)
        {
            var dM_DoiTuong = await _dM_DoiTuongRepository.GetAsync(id);

            var output = new GetDM_DoiTuongForViewDto { DM_DoiTuong = ObjectMapper.Map<DM_DoiTuongDto>(dM_DoiTuong) };

            return output;
        }

        [AbpAuthorize(AppPermissions.Pages_DM_DoiTuong_Edit)]
        public async Task<GetDM_DoiTuongForEditOutput> GetDM_DoiTuongForEdit(EntityDto<Guid> input)
        {
            var dM_DoiTuong = await _dM_DoiTuongRepository.FirstOrDefaultAsync(input.Id);

            var output = new GetDM_DoiTuongForEditOutput { DM_DoiTuong = ObjectMapper.Map<CreateOrEditDM_DoiTuongDto>(dM_DoiTuong) };

            return output;
        }

        public async Task CreateOrEdit(CreateOrEditDM_DoiTuongDto input)
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

        [AbpAuthorize(AppPermissions.Pages_DM_DoiTuong_Create)]
        protected virtual async Task Create(CreateOrEditDM_DoiTuongDto input)
        {
            var dM_DoiTuong = ObjectMapper.Map<DM_DoiTuong>(input);

            if (AbpSession.TenantId != null)
            {
                dM_DoiTuong.TenantId = (int?)AbpSession.TenantId;
            }

            await _dM_DoiTuongRepository.InsertAsync(dM_DoiTuong);

        }

        [AbpAuthorize(AppPermissions.Pages_DM_DoiTuong_Edit)]
        protected virtual async Task Update(CreateOrEditDM_DoiTuongDto input)
        {
            var dM_DoiTuong = await _dM_DoiTuongRepository.FirstOrDefaultAsync((Guid)input.Id);
            ObjectMapper.Map(input, dM_DoiTuong);

        }

        [AbpAuthorize(AppPermissions.Pages_DM_DoiTuong_Delete)]
        public async Task Delete(EntityDto<Guid> input)
        {
            await _dM_DoiTuongRepository.DeleteAsync(input.Id);
        }

        public async Task<FileDto> GetDM_DoiTuongToExcel(GetAllDM_DoiTuongForExcelInput input)
        {

            var filteredDM_DoiTuong = _dM_DoiTuongRepository.GetAll()
                        .WhereIf(!string.IsNullOrWhiteSpace(input.Filter), e => false || e.MaDoiTuong.Contains(input.Filter) || e.TenDoiTuong.Contains(input.Filter) || e.DienThoai.Contains(input.Filter) || e.Fax.Contains(input.Filter) || e.Email.Contains(input.Filter) || e.Website.Contains(input.Filter) || e.Anh.Contains(input.Filter) || e.MaSoThue.Contains(input.Filter) || e.TaiKhoanNganHang.Contains(input.Filter) || e.GhiChu.Contains(input.Filter) || e.CapTai_DKKD.Contains(input.Filter) || e.DiaChi.Contains(input.Filter) || e.NganHang.Contains(input.Filter) || e.NoiCapCMTND_DKKD.Contains(input.Filter) || e.SDT_CoQuan.Contains(input.Filter) || e.SDT_NhaRieng.Contains(input.Filter) || e.SoCMTND_DKKD.Contains(input.Filter) || e.ThuongTru.Contains(input.Filter) || e.XungHo.Contains(input.Filter) || e.TenNguonKhach.Contains(input.Filter) || e.TenNhom.Contains(input.Filter) || e.ChucVu.Contains(input.Filter) || e.LinhVuc.Contains(input.Filter) || e.TenKhac.Contains(input.Filter) || e.DiaChiKhac.Contains(input.Filter) || e.CustomerManagementOrganizationCode.Contains(input.Filter) || e.CustomerManagementOrganizationName.Contains(input.Filter) || e.FileDinhKems.Contains(input.Filter) || e.Profile.Contains(input.Filter))
                        .WhereIf(input.MinLoaiDoiTuongFilter != null, e => e.LoaiDoiTuong >= input.MinLoaiDoiTuongFilter)
                        .WhereIf(input.MaxLoaiDoiTuongFilter != null, e => e.LoaiDoiTuong <= input.MaxLoaiDoiTuongFilter)
                        .WhereIf(input.LaCaNhanFilter.HasValue && input.LaCaNhanFilter > -1, e => (input.LaCaNhanFilter == 1 && e.LaCaNhan) || (input.LaCaNhanFilter == 0 && !e.LaCaNhan))
                        .WhereIf(!string.IsNullOrWhiteSpace(input.MaDoiTuongFilter), e => e.MaDoiTuong == input.MaDoiTuongFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.TenDoiTuongFilter), e => e.TenDoiTuong == input.TenDoiTuongFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.DienThoaiFilter), e => e.DienThoai == input.DienThoaiFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.FaxFilter), e => e.Fax == input.FaxFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.EmailFilter), e => e.Email == input.EmailFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.WebsiteFilter), e => e.Website == input.WebsiteFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.AnhFilter), e => e.Anh == input.AnhFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.MaSoThueFilter), e => e.MaSoThue == input.MaSoThueFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.TaiKhoanNganHangFilter), e => e.TaiKhoanNganHang == input.TaiKhoanNganHangFilter)
                        .WhereIf(input.MinGioiHanCongNoFilter != null, e => e.GioiHanCongNo >= input.MinGioiHanCongNoFilter)
                        .WhereIf(input.MaxGioiHanCongNoFilter != null, e => e.GioiHanCongNo <= input.MaxGioiHanCongNoFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.GhiChuFilter), e => e.GhiChu == input.GhiChuFilter)
                        .WhereIf(input.MinNgaySinh_NgayTLapFilter != null, e => e.NgaySinh_NgayTLap >= input.MinNgaySinh_NgayTLapFilter)
                        .WhereIf(input.MaxNgaySinh_NgayTLapFilter != null, e => e.NgaySinh_NgayTLap <= input.MaxNgaySinh_NgayTLapFilter)
                        .WhereIf(input.ChiaSeFilter.HasValue && input.ChiaSeFilter > -1, e => (input.ChiaSeFilter == 1 && e.ChiaSe) || (input.ChiaSeFilter == 0 && !e.ChiaSe))
                        .WhereIf(input.TheoDoiFilter.HasValue && input.TheoDoiFilter > -1, e => (input.TheoDoiFilter == 1 && e.TheoDoi) || (input.TheoDoiFilter == 0 && !e.TheoDoi))
                        .WhereIf(input.MinID_IndexFilter != null, e => e.ID_Index >= input.MinID_IndexFilter)
                        .WhereIf(input.MaxID_IndexFilter != null, e => e.ID_Index <= input.MaxID_IndexFilter)
                        .WhereIf(input.TheoDoiVanTayFilter.HasValue && input.TheoDoiVanTayFilter > -1, e => (input.TheoDoiVanTayFilter == 1 && e.TheoDoiVanTay) || (input.TheoDoiVanTayFilter == 0 && !e.TheoDoiVanTay))
                        .WhereIf(input.MinNgayDoiNhomFilter != null, e => e.NgayDoiNhom >= input.MinNgayDoiNhomFilter)
                        .WhereIf(input.MaxNgayDoiNhomFilter != null, e => e.NgayDoiNhom <= input.MaxNgayDoiNhomFilter)
                        .WhereIf(input.MinDiemKhoiTaoFilter != null, e => e.DiemKhoiTao >= input.MinDiemKhoiTaoFilter)
                        .WhereIf(input.MaxDiemKhoiTaoFilter != null, e => e.DiemKhoiTao <= input.MaxDiemKhoiTaoFilter)
                        .WhereIf(input.MinDoanhSoKhoiTaoFilter != null, e => e.DoanhSoKhoiTao >= input.MinDoanhSoKhoiTaoFilter)
                        .WhereIf(input.MaxDoanhSoKhoiTaoFilter != null, e => e.DoanhSoKhoiTao <= input.MaxDoanhSoKhoiTaoFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.ID_NguoiGioiThieuFilter.ToString()), e => e.ID_NguoiGioiThieu.ToString() == input.ID_NguoiGioiThieuFilter.ToString())
                        .WhereIf(!string.IsNullOrWhiteSpace(input.CapTai_DKKDFilter), e => e.CapTai_DKKD == input.CapTai_DKKDFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.DiaChiFilter), e => e.DiaChi == input.DiaChiFilter)
                        .WhereIf(input.GioiTinhNamFilter.HasValue && input.GioiTinhNamFilter > -1, e => (input.GioiTinhNamFilter == 1 && e.GioiTinhNam) || (input.GioiTinhNamFilter == 0 && !e.GioiTinhNam))
                        .WhereIf(!string.IsNullOrWhiteSpace(input.NganHangFilter), e => e.NganHang == input.NganHangFilter)
                        .WhereIf(input.MinNgayCapCMTND_DKKDFilter != null, e => e.NgayCapCMTND_DKKD >= input.MinNgayCapCMTND_DKKDFilter)
                        .WhereIf(input.MaxNgayCapCMTND_DKKDFilter != null, e => e.NgayCapCMTND_DKKD <= input.MaxNgayCapCMTND_DKKDFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.NoiCapCMTND_DKKDFilter), e => e.NoiCapCMTND_DKKD == input.NoiCapCMTND_DKKDFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.SDT_CoQuanFilter), e => e.SDT_CoQuan == input.SDT_CoQuanFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.SDT_NhaRiengFilter), e => e.SDT_NhaRieng == input.SDT_NhaRiengFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.SoCMTND_DKKDFilter), e => e.SoCMTND_DKKD == input.SoCMTND_DKKDFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.ThuongTruFilter), e => e.ThuongTru == input.ThuongTruFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.XungHoFilter), e => e.XungHo == input.XungHoFilter)
                        .WhereIf(input.MinNgayGiaoDichGanNhatFilter != null, e => e.NgayGiaoDichGanNhat >= input.MinNgayGiaoDichGanNhatFilter)
                        .WhereIf(input.MaxNgayGiaoDichGanNhatFilter != null, e => e.NgayGiaoDichGanNhat <= input.MaxNgayGiaoDichGanNhatFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.TenNguonKhachFilter), e => e.TenNguonKhach == input.TenNguonKhachFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.TenNhomFilter), e => e.TenNhom == input.TenNhomFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.ChucVuFilter), e => e.ChucVu == input.ChucVuFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.LinhVucFilter), e => e.LinhVuc == input.LinhVucFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.TenKhacFilter), e => e.TenKhac == input.TenKhacFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.DiaChiKhacFilter), e => e.DiaChiKhac == input.DiaChiKhacFilter)
                        .WhereIf(input.MinNgaySuaTrangThaiFilter != null, e => e.NgaySuaTrangThai >= input.MinNgaySuaTrangThaiFilter)
                        .WhereIf(input.MaxNgaySuaTrangThaiFilter != null, e => e.NgaySuaTrangThai <= input.MaxNgaySuaTrangThaiFilter)
                        .WhereIf(input.MinID_DonViQuanLyFilter != null, e => e.ID_DonViQuanLy >= input.MinID_DonViQuanLyFilter)
                        .WhereIf(input.MaxID_DonViQuanLyFilter != null, e => e.ID_DonViQuanLy <= input.MaxID_DonViQuanLyFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.CustomerManagementOrganizationCodeFilter), e => e.CustomerManagementOrganizationCode == input.CustomerManagementOrganizationCodeFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.CustomerManagementOrganizationNameFilter), e => e.CustomerManagementOrganizationName == input.CustomerManagementOrganizationNameFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.ID_NhomCuFilter.ToString()), e => e.ID_NhomCu.ToString() == input.ID_NhomCuFilter.ToString())
                        .WhereIf(input.MinID_NhanVienPhuTrachFilter != null, e => e.ID_NhanVienPhuTrach >= input.MinID_NhanVienPhuTrachFilter)
                        .WhereIf(input.MaxID_NhanVienPhuTrachFilter != null, e => e.ID_NhanVienPhuTrach <= input.MaxID_NhanVienPhuTrachFilter)
                        .WhereIf(input.MinTongDiemFilter != null, e => e.TongDiem >= input.MinTongDiemFilter)
                        .WhereIf(input.MaxTongDiemFilter != null, e => e.TongDiem <= input.MaxTongDiemFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.FileDinhKemsFilter), e => e.FileDinhKems == input.FileDinhKemsFilter)
                        .WhereIf(!string.IsNullOrWhiteSpace(input.MaFilter.ToString()), e => e.Ma.ToString() == input.MaFilter.ToString())
                        .WhereIf(!string.IsNullOrWhiteSpace(input.ProfileFilter), e => e.Profile == input.ProfileFilter)
                        .WhereIf(input.IsNewCustomerFilter.HasValue && input.IsNewCustomerFilter > -1, e => (input.IsNewCustomerFilter == 1 && e.IsNewCustomer) || (input.IsNewCustomerFilter == 0 && !e.IsNewCustomer))
                        .WhereIf(input.MinOrderFilter != null, e => e.Order >= input.MinOrderFilter)
                        .WhereIf(input.MaxOrderFilter != null, e => e.Order <= input.MaxOrderFilter)
                        .WhereIf(input.MinCreationTimeFilter != null, e => e.CreationTime >= input.MinCreationTimeFilter)
                        .WhereIf(input.MaxCreationTimeFilter != null, e => e.CreationTime <= input.MaxCreationTimeFilter)
                        .WhereIf(input.MinLastModificationTimeFilter != null, e => e.LastModificationTime >= input.MinLastModificationTimeFilter)
                        .WhereIf(input.MaxLastModificationTimeFilter != null, e => e.LastModificationTime <= input.MaxLastModificationTimeFilter)
                        .WhereIf(input.IsDeletedFilter.HasValue && input.IsDeletedFilter > -1, e => (input.IsDeletedFilter == 1 && e.IsDeleted) || (input.IsDeletedFilter == 0 && !e.IsDeleted))
                        .WhereIf(input.MinDeletionTimeFilter != null, e => e.DeletionTime >= input.MinDeletionTimeFilter)
                        .WhereIf(input.MaxDeletionTimeFilter != null, e => e.DeletionTime <= input.MaxDeletionTimeFilter);

            var query = (from o in filteredDM_DoiTuong
                         select new GetDM_DoiTuongForViewDto()
                         {
                             DM_DoiTuong = new DM_DoiTuongDto
                             {
                                 LoaiDoiTuong = o.LoaiDoiTuong,
                                 LaCaNhan = o.LaCaNhan,
                                 MaDoiTuong = o.MaDoiTuong,
                                 TenDoiTuong = o.TenDoiTuong,
                                 DienThoai = o.DienThoai,
                                 Fax = o.Fax,
                                 Email = o.Email,
                                 Website = o.Website,
                                 Anh = o.Anh,
                                 MaSoThue = o.MaSoThue,
                                 TaiKhoanNganHang = o.TaiKhoanNganHang,
                                 GioiHanCongNo = o.GioiHanCongNo,
                                 GhiChu = o.GhiChu,
                                 NgaySinh_NgayTLap = o.NgaySinh_NgayTLap,
                                 ChiaSe = o.ChiaSe,
                                 TheoDoi = o.TheoDoi,
                                 ID_Index = o.ID_Index,
                                 TheoDoiVanTay = o.TheoDoiVanTay,
                                 NgayDoiNhom = o.NgayDoiNhom,
                                 DiemKhoiTao = o.DiemKhoiTao,
                                 DoanhSoKhoiTao = o.DoanhSoKhoiTao,
                                 ID_NguoiGioiThieu = o.ID_NguoiGioiThieu,
                                 CapTai_DKKD = o.CapTai_DKKD,
                                 DiaChi = o.DiaChi,
                                 GioiTinhNam = o.GioiTinhNam,
                                 NganHang = o.NganHang,
                                 NgayCapCMTND_DKKD = o.NgayCapCMTND_DKKD,
                                 NoiCapCMTND_DKKD = o.NoiCapCMTND_DKKD,
                                 SDT_CoQuan = o.SDT_CoQuan,
                                 SDT_NhaRieng = o.SDT_NhaRieng,
                                 SoCMTND_DKKD = o.SoCMTND_DKKD,
                                 ThuongTru = o.ThuongTru,
                                 XungHo = o.XungHo,
                                 NgayGiaoDichGanNhat = o.NgayGiaoDichGanNhat,
                                 TenNguonKhach = o.TenNguonKhach,
                                 TenNhom = o.TenNhom,
                                 ChucVu = o.ChucVu,
                                 LinhVuc = o.LinhVuc,
                                 TenKhac = o.TenKhac,
                                 DiaChiKhac = o.DiaChiKhac,
                                 NgaySuaTrangThai = o.NgaySuaTrangThai,
                                 ID_DonViQuanLy = o.ID_DonViQuanLy,
                                 CustomerManagementOrganizationCode = o.CustomerManagementOrganizationCode,
                                 CustomerManagementOrganizationName = o.CustomerManagementOrganizationName,
                                 ID_NhomCu = o.ID_NhomCu,
                                 ID_NhanVienPhuTrach = o.ID_NhanVienPhuTrach,
                                 TongDiem = o.TongDiem,
                                 FileDinhKems = o.FileDinhKems,
                                 Ma = o.Ma,
                                 Profile = o.Profile,
                                 IsNewCustomer = o.IsNewCustomer,
                                 Order = o.Order,
                                 CreationTime = o.CreationTime,
                                 LastModificationTime = o.LastModificationTime,
                                 IsDeleted = o.IsDeleted,
                                 DeletionTime = o.DeletionTime,
                                 Id = o.Id
                             }
                         });

            var dM_DoiTuongListDtos = await query.ToListAsync();

            return _dM_DoiTuongExcelExporter.ExportToFile(dM_DoiTuongListDtos);
        }

    }
}