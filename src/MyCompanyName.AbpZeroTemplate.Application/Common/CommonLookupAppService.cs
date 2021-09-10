using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Authorization.Users;
using Abp.Collections.Extensions;
using Abp.Domain.Repositories;
using Abp.Extensions;
using Abp.Linq.Extensions;
using Abp.Runtime.Session;
using Abp.UI;
using Microsoft.EntityFrameworkCore;
using MyCompanyName.AbpZeroTemplate.Authorization.Users;
using MyCompanyName.AbpZeroTemplate.Authorization.Users.Dto;
using MyCompanyName.AbpZeroTemplate.Common.Dto;
using MyCompanyName.AbpZeroTemplate.crmdemo.Categories;
using MyCompanyName.AbpZeroTemplate.crmdemo.Categories.Dtos;
using MyCompanyName.AbpZeroTemplate.crmdemo.Common.Dto;
using MyCompanyName.AbpZeroTemplate.crmdemo.Common.Dtos;
using MyCompanyName.AbpZeroTemplate.crmdemo.Config;
using MyCompanyName.AbpZeroTemplate.crmdemo.Organizations.Dto;
using MyCompanyName.AbpZeroTemplate.crmdemo.OrganizationUnits;
using MyCompanyName.AbpZeroTemplate.crmdemo.Sale;
using MyCompanyName.AbpZeroTemplate.crmdemo.Sale.Dtos;
using MyCompanyName.AbpZeroTemplate.crmdemo.Sale.TheKhachHangs;
using MyCompanyName.AbpZeroTemplate.Editions;
using MyCompanyName.AbpZeroTemplate.Editions.Dto;

namespace MyCompanyName.AbpZeroTemplate.Common
{
    [AbpAuthorize]
    public class CommonLookupAppService : AbpZeroTemplateAppServiceBase, ICommonLookupAppService
    {
        private readonly EditionManager _editionManager;

        public CommonLookupAppService(EditionManager editionManager)
        {
            _editionManager = editionManager;
        }

        public async Task<ListResultDto<SubscribableEditionComboboxItemDto>> GetEditionsForCombobox(bool onlyFreeItems = false)
        {
            var subscribableEditions = (await _editionManager.Editions.Cast<SubscribableEdition>().ToListAsync())
                .WhereIf(onlyFreeItems, e => e.IsFree)
                .OrderBy(e => e.MonthlyPrice);

            return new ListResultDto<SubscribableEditionComboboxItemDto>(
                subscribableEditions.Select(e => new SubscribableEditionComboboxItemDto(e.Id.ToString(), e.DisplayName, e.IsFree)).ToList()
            );
        }

        public async Task<PagedResultDto<NameValueDto>> FindUsers(FindUsersInput input)
        {
            if (AbpSession.TenantId != null)
            {
                //Prevent tenants to get other tenant's users.
                input.TenantId = AbpSession.TenantId;
            }

            using (CurrentUnitOfWork.SetTenantId(input.TenantId))
            {
                var query = UserManager.Users
                    .WhereIf(
                        !input.Filter.IsNullOrWhiteSpace(),
                        u =>
                            u.Name.Contains(input.Filter) ||
                            u.Surname.Contains(input.Filter) ||
                            u.UserName.Contains(input.Filter) ||
                            u.EmailAddress.Contains(input.Filter)
                    ).WhereIf(input.ExcludeCurrentUser, u => u.Id != AbpSession.GetUserId());

                var userCount = await query.CountAsync();
                var users = await query
                    .OrderBy(u => u.Name)
                    .ThenBy(u => u.Surname)
                    .PageBy(input)
                    .ToListAsync();

                return new PagedResultDto<NameValueDto>(
                    userCount,
                    users.Select(u =>
                        new NameValueDto(
                            u.FullName + " (" + u.EmailAddress + ")",
                            u.Id.ToString()
                            )
                        ).ToList()
                    );
            }
        }

        public GetDefaultEditionNameOutput GetDefaultEditionName()
        {
            return new GetDefaultEditionNameOutput
            {
                Name = EditionManager.DefaultEditionName
            };
        }

        //  crmdemo
        //private readonly EditionManager _editionManager;

        private readonly IRepository<DM_DoiTuong, Guid> _doiTuongRepository;

        private readonly IRepository<User, long> _userRepository;

        private new readonly IAbpSession AbpSession;

        private readonly UserManager _userManager;

        private readonly IRepository<CustomOrganizationUnit, long> _organizationRepository;

        private readonly IRepository<UserOrganizationUnit, long> _userOrganizationRepository;

        private readonly IRepository<DM_NgheNghiep> _ngheNghiepRepository;

        private readonly IRepository<DM_HangHoa, Guid> _hangHoaRepository;

        private readonly IRepository<DM_NhomHangHoa, Guid> _nhomHangHoaRepository;

        private readonly IRepository<TheKhachHangChiTiet, Guid> _theKhachHangChiTietRepository;

        private readonly IRepository<TheKhachHang, Guid> _theKhachHangRepository;

        private readonly IRepository<ImportData, Guid> _importDataRepository;

        private readonly IRepository<DataProcessStatus> _statusRepository;

        private readonly IRepository<ChangeStatusFlow> _flowRepository;

        private readonly IRepository<DataSource, Guid> _dataSourceRepository;

        public CommonLookupAppService(EditionManager editionManager, IRepository<DM_DoiTuong, Guid> doiTuongRepository, IRepository<User, long> userRepository, IAbpSession abpSession, UserManager userManager, IRepository<CustomOrganizationUnit, long> organizationRepository, IRepository<UserOrganizationUnit, long> userOrganizationRepository, IRepository<DM_NgheNghiep> ngheNghiepRepository, IRepository<DM_HangHoa, Guid> hangHoaRepository, IRepository<DM_NhomHangHoa, Guid> nhomHangHoaRepository, IRepository<TheKhachHangChiTiet, Guid> theKhachHangChiTietRepository, IRepository<TheKhachHang, Guid> theKhachHangRepository, IRepository<ImportData, Guid> importDataRepository, IRepository<DataProcessStatus> statusRepository, IRepository<ChangeStatusFlow> flowRepository, IRepository<DataSource, Guid> dataSourceRepository)
        {
            _editionManager = editionManager;
            _doiTuongRepository = doiTuongRepository;
            _userRepository = userRepository;
            AbpSession = abpSession;
            _userManager = userManager;
            _organizationRepository = organizationRepository;
            _userOrganizationRepository = userOrganizationRepository;
            _ngheNghiepRepository = ngheNghiepRepository;
            _hangHoaRepository = hangHoaRepository;
            _nhomHangHoaRepository = nhomHangHoaRepository;
            _theKhachHangChiTietRepository = theKhachHangChiTietRepository;
            _theKhachHangRepository = theKhachHangRepository;
            _importDataRepository = importDataRepository;
            _statusRepository = statusRepository;
            _flowRepository = flowRepository;
            _dataSourceRepository = dataSourceRepository;
        }

        //public async Task<ListResultDto<SubscribableEditionComboboxItemDto>> GetEditionsForCombobox(bool onlyFreeItems = false)
        //{
        //	return new ListResultDto<SubscribableEditionComboboxItemDto>((from e in (await _editionManager.Editions.Cast<SubscribableEdition>().ToListAsync()).WhereIf(onlyFreeItems, (SubscribableEdition e) => e.IsFree)
        //																  orderby e.MonthlyPrice
        //																  select new SubscribableEditionComboboxItemDto(e.Id.ToString(), e.DisplayName, e.IsFree)).ToList());
        //}

        //public async Task<PagedResultDto<NameValueDto>> FindUsers(FindUsersInput input)
        //{
        //	if (AbpSession.TenantId.HasValue)
        //	{
        //		input.TenantId = AbpSession.TenantId;
        //	}
        //	using (base.CurrentUnitOfWork.SetTenantId(input.TenantId))
        //	{
        //		IQueryable<User> query = base.UserManager.Users.WhereIf(!input.Filter.IsNullOrWhiteSpace(), (User u) => u.Name.Contains(input.Filter) || u.Surname.Contains(input.Filter) || u.UserName.Contains(input.Filter) || u.EmailAddress.Contains(input.Filter));
        //		return new PagedResultDto<NameValueDto>(await query.CountAsync(), (await (from u in query
        //																				  orderby u.Name, u.Surname
        //																				  select u).PageBy(input).ToListAsync()).Select((User u) => new NameValueDto(u.FullName + " (" + u.EmailAddress + ")", u.Id.ToString())).ToList());
        //	}
        //}

        public async Task<CustomOrganizationUnitDto> GetCurrentUserOrganization()
        {
            long? userId = AbpSession.UserId;
            CustomOrganizationUnit organization = await (from x in _userOrganizationRepository.GetAll()
                                                         where (long?)x.UserId == userId
                                                         select x into ou
                                                         from o in from x in _organizationRepository.GetAll()
                                                                   where x.Id == ou.OrganizationUnitId
                                                                   select x
                                                         select o into x
                                                         orderby x.ParentId descending
                                                         select x).FirstOrDefaultAsync();
            if (organization == null)
            {
                var strSql = (from x in _userOrganizationRepository.GetAll()
                              where (long?)x.UserId == userId
                              select x into ou
                              from o in from x in _organizationRepository.GetAll()
                                        where x.Id == ou.OrganizationUnitId
                                        select x
                              select o into x
                              orderby x.ParentId descending
                              select x).ToQueryString();
                throw new UserFriendlyException("Tài khoản chưa được thiết lập đơn vị");
            }
            return base.ObjectMapper.Map<CustomOrganizationUnitDto>(organization);
        }

        public async Task<string> GetCurrentUserOrganizationsString()
        {
            long? userId = AbpSession.UserId;
            List<CustomOrganizationUnit> organizations = await (from x in _userOrganizationRepository.GetAll()
                                                                where (long?)x.UserId == userId
                                                                select x into ou
                                                                from o in from x in _organizationRepository.GetAll()
                                                                          where x.Id == ou.OrganizationUnitId && x.ParentId > (long?)0L
                                                                          select x
                                                                select o).ToListAsync();
            if (organizations.Count() == 0)
            {
                throw new UserFriendlyException("Tài khoản chưa được thiết lập đơn vị");
            }
            return "/" + string.Join("/", organizations.Select((CustomOrganizationUnit x) => x.Id)) + "/";
        }

        public async Task<List<CustomOrganizationUnitDto>> GetCurrentUserOrganizations()
        {
            long? userId = AbpSession.UserId;
            List<CustomOrganizationUnitDto> obj = await (from x in _userOrganizationRepository.GetAll()
                                                         where (long?)x.UserId == userId
                                                         select x into ou
                                                         from o in from x in _organizationRepository.GetAll()
                                                                   where x.Id == ou.OrganizationUnitId && x.ParentId > (long?)0L
                                                                   select x
                                                         select ObjectMapper.Map<CustomOrganizationUnitDto>(o)).ToListAsync();
            if (obj.Count() == 0)
            {
                throw new UserFriendlyException("Tài khoản chưa được thiết lập đơn vị");
            }
            return obj;
        }

        [AbpAuthorize(new string[] { })]
        public async Task<PagedResultDto<DM_DoiTuongLookupTableDto>> GetAllDM_DoiTuongForLookupTable(GetAllKhachHangForLookupTableInput input)
        {
            IQueryable<DM_DoiTuong> query = _doiTuongRepository.GetAll().WhereIf(!string.IsNullOrWhiteSpace(input.CMTFilter), (DM_DoiTuong e) => e.SoCMTND_DKKD.Contains(input.CMTFilter)).WhereIf(!string.IsNullOrWhiteSpace(input.PhoneFilter), (DM_DoiTuong e) => e.DienThoai.Contains(input.PhoneFilter))
                .WhereIf(!string.IsNullOrWhiteSpace(input.MaKhachHangFilter), (DM_DoiTuong e) => e.MaDoiTuong.Contains(input.MaKhachHangFilter))
                .WhereIf(!string.IsNullOrWhiteSpace(input.TenKhachHangFilter), (DM_DoiTuong e) => e.TenDoiTuong.Contains(input.TenKhachHangFilter));
            int totalCount = await query.CountAsync();
            List<DM_DoiTuong> obj = await query.PageBy(input).ToListAsync();
            List<DM_DoiTuongLookupTableDto> lookupTableDtoList = new List<DM_DoiTuongLookupTableDto>();
            foreach (DM_DoiTuong dM_DoiTuong in obj)
            {
                lookupTableDtoList.Add(new DM_DoiTuongLookupTableDto
                {
                    Id = dM_DoiTuong.Id.ToString(),
                    DisplayName = dM_DoiTuong.TenDoiTuong.ToString(),
                    CMT = dM_DoiTuong.SoCMTND_DKKD.ToString(),
                    Phone = dM_DoiTuong.DienThoai,
                    Address = dM_DoiTuong.DiaChi,
                    Code = dM_DoiTuong.MaDoiTuong
                });
            }
            return new PagedResultDto<DM_DoiTuongLookupTableDto>(totalCount, lookupTableDtoList);
        }

        [AbpAuthorize(new string[] { })]
        public async Task<PagedResultDto<PackageLookupTableDto>> GetAllPackageForLookupTable(GetAllPackageForLookupTableInput input)
        {
            IQueryable<PackageLookupTableDto> query = from x in _theKhachHangChiTietRepository.GetAll()
                                                      where !x.IsComplete
                                                      select x into pck
                                                      join tk in (from x in _theKhachHangRepository.GetAll()
                                                                  where x.PhaiThanhToan == x.DaThanhToan + x.ReleaseBalance
                                                                  select x).WhereIf(!string.IsNullOrWhiteSpace(input.CardCode), (TheKhachHang e) => e.MaThe.Contains(input.CardCode)) on pck.ID_TheKhachHang equals tk.Id into tks
                                                      from tkh in tks
                                                      join cust in _doiTuongRepository.GetAll().WhereIf(!string.IsNullOrWhiteSpace(input.CustomerNameFilter), (DM_DoiTuong e) => e.SoCMTND_DKKD.Contains(input.CustomerNameFilter)).WhereIf(!string.IsNullOrWhiteSpace(input.CustomerPhoneFilter), (DM_DoiTuong e) => e.DienThoai.Contains(input.CustomerPhoneFilter)) on tkh.ID_KhachHang equals cust.Id into custs
                                                      from cst in custs
                                                      select new PackageLookupTableDto
                                                      {
                                                          CardId = tkh.Id,
                                                          CardCode = tkh.MaThe,
                                                          PackageId = pck.Id,
                                                          Package = pck.ServiceName,
                                                          CustomerName = cst.TenDoiTuong,
                                                          CustomerPhone = cst.DienThoai
                                                      };
            return new PagedResultDto<PackageLookupTableDto>(await query.CountAsync(), await query.PageBy(input).ToListAsync());
        }

        [AbpAuthorize(new string[] { })]
        public async Task<PagedResultDto<ValueCardLookupTableDto>> GetAllValueCardForLookupTable(GetAllValueCardForLookupTableInput input)
        {
            IQueryable<ValueCardLookupTableDto> query = from tk in (from x in _theKhachHangRepository.GetAll()
                                                                    where x.PhaiThanhToan == x.DaThanhToan + x.ReleaseBalance && (x.TheGiaTri_SoLan_GiamGia == 1 || (x.TheGiaTri_SoLan_GiamGia == 2 && x.HuyThe)) && x.SoDu > 0m
                                                                    select x).WhereIf(!string.IsNullOrWhiteSpace(input.CardCode), (TheKhachHang e) => e.MaThe.Contains(input.CardCode))
                                                        join cust in _doiTuongRepository.GetAll().WhereIf(!string.IsNullOrWhiteSpace(input.CustomerNameFilter), (DM_DoiTuong e) => e.SoCMTND_DKKD.Contains(input.CustomerNameFilter)).WhereIf(!string.IsNullOrWhiteSpace(input.CustomerPhoneFilter), (DM_DoiTuong e) => e.DienThoai.Contains(input.CustomerPhoneFilter)) on tk.ID_KhachHang equals cust.Id into custs
                                                        from cst in custs
                                                        select new ValueCardLookupTableDto
                                                        {
                                                            CardId = tk.Id,
                                                            CardCode = tk.MaThe,
                                                            CustomerName = cst.TenDoiTuong,
                                                            CustomerPhone = cst.DienThoai,
                                                            CardBalance = ((tk.TheGiaTri_SoLan_GiamGia == 1) ? (tk.SoDu / tk.PhaiThanhToan * (tk.MenhGiaThe + tk.TienTangThem)) : 0m)
                                                        };
            return new PagedResultDto<ValueCardLookupTableDto>(await query.CountAsync(), await query.PageBy(input).ToListAsync());
        }

        public async Task<PagedResultDto<ImportDataForLookupTableDto>> GetAllImportDataListForLookupTable(GetAllImportDataListForLookupTableInput input)
        {
            IQueryable<ImportData> query = _importDataRepository.GetAll().WhereIf(!string.IsNullOrWhiteSpace(input.Filter), (ImportData e) => e.ImportCode.Contains(input.Filter));
            int totalCount = await query.CountAsync();
            List<ImportData> obj = await query.PageBy(input).ToListAsync();
            List<ImportDataForLookupTableDto> lookupTableDtoList = new List<ImportDataForLookupTableDto>();
            foreach (ImportData importData in obj)
            {
                lookupTableDtoList.Add(new ImportDataForLookupTableDto
                {
                    Id = importData.Id,
                    ImportCode = importData.ImportCode,
                    ImportDate = importData.ImportTime
                });
            }
            return new PagedResultDto<ImportDataForLookupTableDto>(totalCount, lookupTableDtoList);
        }

        [AbpAuthorize(new string[] { })]
        public async Task<PagedResultDto<DM_NgheNghiepLookupTableDto>> GetAllDM_NgheNghiepForLookupTable(GetAllDM_NgheNghiepForLookupTableInput input)
        {
            IQueryable<DM_NgheNghiep> query = _ngheNghiepRepository.GetAll().WhereIf(!string.IsNullOrWhiteSpace(input.Filter), (DM_NgheNghiep e) => e.DisplayName.Contains(input.Filter));
            int totalCount = await query.CountAsync();
            List<DM_NgheNghiep> obj = await query.PageBy(input).ToListAsync();
            List<DM_NgheNghiepLookupTableDto> lookupTableDtoList = new List<DM_NgheNghiepLookupTableDto>();
            foreach (DM_NgheNghiep ngheNghiep in obj)
            {
                lookupTableDtoList.Add(new DM_NgheNghiepLookupTableDto
                {
                    Id = ngheNghiep.Id.ToString(),
                    DisplayName = ngheNghiep.DisplayName
                });
            }
            return new PagedResultDto<DM_NgheNghiepLookupTableDto>(totalCount, lookupTableDtoList);
        }

        [AbpAuthorize(new string[] { })]
        public async Task<PagedResultDto<DM_HangHoaLookupTableDto>> GetAllDM_DichVuForLookupTable(GetAllDichVuForLookupTableInput input)
        {
            IQueryable<DM_HangHoaLookupTableDto> query = (from dv in (from x in _hangHoaRepository.GetAll()
                                                                      where x.LaHangHoa == false && x.IsActive
                                                                      select x).WhereIf(!string.IsNullOrWhiteSpace(input.TenDichVuFilter), (DM_HangHoa e) => e.TenHangHoa.Trim().ToLower().Contains(input.TenDichVuFilter.ToLower())).WhereIf(!string.IsNullOrWhiteSpace(input.MaDichVuFilter), (DM_HangHoa e) => e.MaHangHoa.Trim().ToLower().Contains(input.MaDichVuFilter.Trim().ToLower()))
                                                          from ndv in from x in _nhomHangHoaRepository.GetAll()
                                                                      where x.Id == dv.DM_NhomHangHoaId
                                                                      select x
                                                          select new DM_HangHoaLookupTableDto
                                                          {
                                                              Id = ((object)dv.Id).ToString(),
                                                              DisplayName = dv.TenHangHoa.ToString(),
                                                              ThoiGianThucHien = dv.SoPhutThucHien,
                                                              TenNhom = ndv.TenNhom,
                                                              DonGia = dv.GiaBanLe,
                                                              Code = dv.MaHangHoa
                                                          }).WhereIf(!string.IsNullOrEmpty(input.TenNhomDichVuFilter), (DM_HangHoaLookupTableDto e) => (e.TenNhom.IsNullOrEmpty() && false) || (!e.TenNhom.IsNullOrEmpty() && e.TenNhom.ToLower().Contains(input.TenNhomDichVuFilter.Trim().ToLower())));
            return new PagedResultDto<DM_HangHoaLookupTableDto>(await query.CountAsync(), await query.PageBy(input).ToListAsync());
        }

        [AbpAuthorize(new string[] { })]
        public async Task<PagedResultDto<EmployeeLookupTableDto>> GetAllSalesForLookupTable(GetAllEmployeeForLookupTableInput input)
        {
            IQueryable<EmployeeLookupTableDto> query = from user in (from x in _userRepository.GetAll()
                                                                     where x.UserType == "SALE"
                                                                     select x).WhereIf(!string.IsNullOrWhiteSpace(input.MaNhanVienFilter), (User e) => e.MaNhanVien.ToString().Contains(input.MaNhanVienFilter)).WhereIf(!string.IsNullOrWhiteSpace(input.TenNhanVienFilter), (User e) => e.FullName.ToString().Contains(input.TenNhanVienFilter))
                                                       from ou in from x in _userOrganizationRepository.GetAll()
                                                                  where x.UserId == user.Id
                                                                  select x
                                                       from o in from x in _organizationRepository.GetAll().DefaultIfEmpty()
                                                                 where x.Id == ou.OrganizationUnitId && x.ParentId.HasValue
                                                                 select x
                                                       select new EmployeeLookupTableDto
                                                       {
                                                           Id = user.Id,
                                                           MaNhanVien = user.MaNhanVien,
                                                           TenNhanVien = user.FullName,
                                                           PTChietKhau = user.PTCKBanThe,
                                                           OrganizationId = ((o == null) ? 0 : o.Id),
                                                           OrganizationName = ((o == null) ? "" : o.DisplayName)
                                                       };
            return new PagedResultDto<EmployeeLookupTableDto>(await query.CountAsync(), await query.PageBy(input).ToListAsync());
        }

        public async Task<PagedResultDto<EmployeeLookupTableDto>> GetAllSalesForLookupTableByOrganization(GetAllEmployeeForLookupTableInput input)
        {
            IQueryable<EmployeeLookupTableDto> query = from user in (from x in _userRepository.GetAll()
                                                                     where x.UserType == "SALE"
                                                                     select x).WhereIf(!string.IsNullOrWhiteSpace(input.MaNhanVienFilter), (User e) => e.MaNhanVien.ToString().Contains(input.MaNhanVienFilter)).WhereIf(!string.IsNullOrWhiteSpace(input.TenNhanVienFilter), (User e) => e.FullName.ToString().Contains(input.TenNhanVienFilter))
                                                       from ou in from x in _userOrganizationRepository.GetAll()
                                                                  where x.UserId == user.Id
                                                                  where x.OrganizationUnitId == input.OrganizationId
                                                                  select x
                                                       from o in from x in _organizationRepository.GetAll().DefaultIfEmpty()
                                                                 where x.Id == ou.OrganizationUnitId
                                                                 select x
                                                       select new EmployeeLookupTableDto
                                                       {
                                                           Id = user.Id,
                                                           MaNhanVien = user.MaNhanVien,
                                                           TenNhanVien = user.FullName,
                                                           PTChietKhau = user.PTCKBanThe,
                                                           OrganizationId = ((o == null) ? 0 : o.Id),
                                                           OrganizationName = ((o == null) ? "" : o.DisplayName)
                                                       };
            return new PagedResultDto<EmployeeLookupTableDto>(await query.CountAsync(), await query.PageBy(input).ToListAsync());
        }

        [AbpAuthorize(new string[] { })]
        public async Task<PagedResultDto<EmployeeLookupTableDto>> GetAllKTVForLookupTable(GetAllEmployeeForLookupTableInput input)
        {
            User currentUser = await _userRepository.FirstOrDefaultAsync(AbpSession.UserId.Value);
            (await _userManager.GetOrganizationUnitsAsync(currentUser)).FirstOrDefault();
            IQueryable<EmployeeLookupTableDto> query = from user in (from x in _userRepository.GetAll()
                                                                     where x.UserType == "KTV"
                                                                     select x).WhereIf(!string.IsNullOrWhiteSpace(input.MaNhanVienFilter), (User e) => e.MaNhanVien.ToString().Contains(input.MaNhanVienFilter)).WhereIf(!string.IsNullOrWhiteSpace(input.TenNhanVienFilter), (User e) => e.FullName.ToString().Contains(input.TenNhanVienFilter))
                                                       from ou in from x in _userOrganizationRepository.GetAll()
                                                                  where x.UserId == user.Id
                                                                  select x
                                                       from o in from x in _organizationRepository.GetAll().DefaultIfEmpty()
                                                                 where x.Id == ou.OrganizationUnitId && x.ParentId.HasValue
                                                                 select x
                                                       select new EmployeeLookupTableDto
                                                       {
                                                           Id = user.Id,
                                                           MaNhanVien = user.MaNhanVien,
                                                           TenNhanVien = user.FullName,
                                                           PTChietKhau = user.PTCKBanThe,
                                                           OrganizationId = ((o == null) ? 0 : o.Id),
                                                           OrganizationName = ((o == null) ? "" : o.DisplayName)
                                                       };
            return new PagedResultDto<EmployeeLookupTableDto>(await query.CountAsync(), await query.PageBy(input).ToListAsync());
        }

        //public GetDefaultEditionNameOutput GetDefaultEditionName()
        //{
        //	return new GetDefaultEditionNameOutput
        //	{
        //		Name = "Standard"
        //	};
        //}

        public new async Task<UserEditDto> GetCurrentUser()
        {
            User user = await _userRepository.FirstOrDefaultAsync((User x) => x.Id == AbpSession.GetUserId());
            if (user == null)
            {
                throw new UserFriendlyException("Tài khoản không tồn tại trong hệ thống");
            }
            return base.ObjectMapper.Map<UserEditDto>(user);
        }

        public async Task<List<CustomOrganizationUnitDto>> GetAvailableOrganizations()
        {
            List<CustomOrganizationUnit> allOrganizationUnits = await _organizationRepository.GetAllListAsync();
            return base.ObjectMapper.Map<List<CustomOrganizationUnitDto>>(allOrganizationUnits);
        }

        public async Task<List<ProcessStatusDto>> GetStatusesInFlow(int statusId)
        {
            return await (from x in _flowRepository.GetAll()
                          where x.FromStatusId == (int?)statusId
                          select x into f
                          from s in from x in _statusRepository.GetAll()
                                    where (int?)x.Id == f.ToStatusId && x.IsActive
                                    select x
                          select new ProcessStatusDto
                          {
                              Status = s.DisplayName,
                              StatusId = s.Id,
                              NeedAdditionalData = (s.IsReasonRequired || s.IsScheduleRequired || s.IsFileRequired)
                          }).ToListAsync();
        }

        public async Task<List<DataSourceDto>> GetAvailableDataSources()
        {
            List<DataSource> dataSources = await (from x in _dataSourceRepository.GetAll()
                                                  where x.IsActive
                                                  select x).ToListAsync();
            return base.ObjectMapper.Map<List<DataSourceDto>>(dataSources);
        }
    }
}
