// crmdemo.Sale.TheKhachHangsAppService
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Runtime.Serialization.Formatters.Binary;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Authorization.Users;
using Abp.Dependency;
using Abp.Domain.Repositories;
using Abp.Domain.Uow;
using Abp.EntityHistory;
using Abp.Events.Bus;
using Abp.Linq.Extensions;
using Abp.Runtime.Session;

using System.Linq.Dynamic;
using System.Linq.Dynamic.Core;

using Abp.UI;
using MyCompanyName.AbpZeroTemplate.crmdemo;
//using crmdemo.Accounting;
//using crmdemo.Authorization.Users;
//using crmdemo.Categories;
//using crmdemo.Categories.Dtos;
//using crmdemo.Common;
//using crmdemo.Common.Dtos;
//using crmdemo.Dto;
//using crmdemo.Organizations.Dto;
//using crmdemo.OrganizationUnits;
using MyCompanyName.AbpZeroTemplate.crmdemo.Sale;
using MyCompanyName.AbpZeroTemplate.crmdemo.Sale.TheKhachHangs;
//using MyCompanyName.AbpZeroTemplate.crmdemo.Sale.Dtos;
//using crmdemo.Sale.Event;
//using crmdemo.Sale.Exporting;
//using crmdemo.Temp;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyCompanyName.AbpZeroTemplate.crmdemo.Sale.Dtos;
using MyCompanyName.AbpZeroTemplate.Authorization.Users;
using MyCompanyName.AbpZeroTemplate.crm.crmdemo.Sale.Exporting;
using MyCompanyName.AbpZeroTemplate.crmdemo.Categories;
using MyCompanyName.AbpZeroTemplate.crmdemo.OrganizationUnits;
using MyCompanyName.AbpZeroTemplate.crmdemo.Temp;
using MyCompanyName.AbpZeroTemplate.crmdemo.Accounting;
using MyCompanyName.AbpZeroTemplate.crmdemo.Organizations.Dto;

using MyCompanyName.AbpZeroTemplate.Common;
using MyCompanyName.AbpZeroTemplate.crmdemo.Dto;

using MyCompanyName.AbpZeroTemplate.crmdemo.Common.Dtos;
using MyCompanyName.AbpZeroTemplate.crmdemo.Categories.Dtos;
using MyCompanyName.AbpZeroTemplate.crmdemo.Sale.Event;
using MyCompanyName.AbpZeroTemplate.Authorization;
using MyCompanyName.AbpZeroTemplate.Dto;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Sale.TheKhachHangs
{
	//[AbpAuthorize(new string[] { "Pages.TheKhachHangs" })]
	public class TheKhachHangsAppService : AbpZeroTemplateAppServiceBase, ITheKhachHangsAppService
        , IApplicationService, ITransientDependency
	{
        private readonly IRepository<TheKhachHang, Guid> _theKhachHangRepository;

        private readonly ITheKhachHangsExcelExporter _theKhachHangsExcelExporter;

        private readonly IRepository<DM_NhomThe, Guid> _dM_NhomTheRepository;

        private readonly IRepository<DM_DoiTuong, Guid> _dM_DoiTuongRepository;

        private readonly IRepository<DM_TienTe, Guid> _dM_TienTeRepository;

        private readonly IRepository<User, long> _userRepository;

        private readonly IRepository<CustomOrganizationUnit, long> _organizationUnitRepository;

        private readonly IRepository<DM_DacDiemKhachHang, Guid> _dM_DacDiemKhachHangRepository;

        private readonly IRepository<DM_LienHe, Guid> _dM_LienHeRepository;

        private readonly IRepository<DM_HangHoa, Guid> _dM_HangHoaRepository;

        private readonly IRepository<TheKhachHangChiTiet, Guid> _dM_TheKhachHangChiTietRepository;

        private readonly IRepository<DM_KhuyenMai, Guid> _dM_KhuyenMaiRepository;

        private readonly IRepository<UserOrganizationUnit, long> _userOrganizationUnitRepository;

        private readonly IRepository<EntityOrder, Guid> _entityOrderRepository;

        private readonly UserManager _userManager;

        private readonly IRepository<DM_NhomDoiTuong, Guid> _nhomDoiTuongRepository;

        public readonly IRepository<EntityChange, long> _entityChangeRepository;

        public readonly IRepository<EntityChangeSet, long> _entityChangeSetSetRepository;

        public readonly IRepository<EntityPropertyChange, long> _entityPropertyChangeRepository;

        private readonly IRepository<TheKhachHangChiTiet, Guid> _theKhachHangChiTietRepository;

        private readonly IRepository<PhieuThuChiTiet, Guid> _phieuThuChiTietRepository;

        private readonly IRepository<NhatKySuDungThe, Guid> _nhatKySuDungTheRepository;

        private readonly IRepository<NhanVienThucHien, Guid> _nhanVienThucHienRepository;

        private readonly ICommonLookupAppService _commonLookupAppService;

        private new readonly IAbpSession AbpSession;

        private readonly IRepository<Voucher, Guid> _voucherRepository;

        private readonly IRepository<HoaDonBanLe, Guid> _invoiceRepository;

        private readonly IRepository<HoaDonBanLeChiTiet, Guid> _invoiceDetailRepository;

        public TheKhachHangsAppService(
            IRepository<TheKhachHang, Guid> theKhachHangRepository
            , ITheKhachHangsExcelExporter theKhachHangsExcelExporter
            , IRepository<DM_NhomThe, Guid> dM_NhomTheRepository
            , IRepository<DM_DoiTuong, Guid> dM_DoiTuongRepository
            , IRepository<DM_TienTe, Guid> dM_TienTeRepository
            , IRepository<User, long> userRepository
            , IRepository<CustomOrganizationUnit, long> organizationUnitRepository
            , IRepository<DM_DacDiemKhachHang, Guid> dM_DacDiemKhachHangRepository
            , IRepository<DM_LienHe, Guid> dM_LienHeRepository
            , IRepository<DM_HangHoa, Guid> dM_HangHoaRepository
            , IRepository<TheKhachHangChiTiet, Guid> dM_TheKhachHangChiTietRepository
            , IRepository<DM_KhuyenMai, Guid> dM_KhuyenMaiRepository
            , IRepository<UserOrganizationUnit, long> userOrganizationUnitRepository
            , IRepository<EntityOrder, Guid> entityOrderRepository
            , UserManager userManager, IRepository<DM_NhomDoiTuong, Guid> nhomDoiTuongRepository
            , IRepository<EntityChange, long> entityChangeRepository
            , IRepository<EntityChangeSet, long> entityChangeSetSetRepository
            , IRepository<EntityPropertyChange, long> entityPropertyChangeRepository
            , IRepository<TheKhachHangChiTiet, Guid> theKhachHangChiTietRepository
            , IRepository<PhieuThuChiTiet, Guid> phieuThuChiTietRepository
            , IRepository<NhatKySuDungThe, Guid> nhatKySuDungTheRepository
            , IRepository<NhanVienThucHien, Guid> nhanVienThucHienRepository
            , ICommonLookupAppService commonLookupAppService
            , IAbpSession abpSession, IRepository<Voucher, Guid> voucherRepository
            , IRepository<HoaDonBanLe, Guid> invoiceRepository
            , IRepository<HoaDonBanLeChiTiet, Guid> invoiceDetailRepository)
        {
            _theKhachHangRepository = theKhachHangRepository;
            _theKhachHangsExcelExporter = theKhachHangsExcelExporter;
            _dM_NhomTheRepository = dM_NhomTheRepository;
            _dM_DoiTuongRepository = dM_DoiTuongRepository;
            _dM_TienTeRepository = dM_TienTeRepository;
            _userRepository = userRepository;
            _organizationUnitRepository = organizationUnitRepository;
            _dM_DacDiemKhachHangRepository = dM_DacDiemKhachHangRepository;
            _dM_LienHeRepository = dM_LienHeRepository;
            _dM_HangHoaRepository = dM_HangHoaRepository;
            _dM_TheKhachHangChiTietRepository = dM_TheKhachHangChiTietRepository;
            _dM_KhuyenMaiRepository = dM_KhuyenMaiRepository;
            _userOrganizationUnitRepository = userOrganizationUnitRepository;
            _entityOrderRepository = entityOrderRepository;
            _userManager = userManager;
            _nhomDoiTuongRepository = nhomDoiTuongRepository;
            _entityChangeRepository = entityChangeRepository;
            _entityChangeSetSetRepository = entityChangeSetSetRepository;
            _entityPropertyChangeRepository = entityPropertyChangeRepository;
            _theKhachHangChiTietRepository = theKhachHangChiTietRepository;
            _phieuThuChiTietRepository = phieuThuChiTietRepository;
            _nhatKySuDungTheRepository = nhatKySuDungTheRepository;
            _nhanVienThucHienRepository = nhanVienThucHienRepository;
            _commonLookupAppService = commonLookupAppService;
            AbpSession = abpSession;
            _voucherRepository = voucherRepository;
            _invoiceRepository = invoiceRepository;
            _invoiceDetailRepository = invoiceDetailRepository;
        }

        //[HttpGet]
        [HttpPost]
        //public async Task<PagedResultDto<GetTheKhachHangForView>> GetAll()
        public async Task<PagedResultDto<GetTheKhachHangForView>> GetAll(GetAllTheKhachHangsInput input)
        {
            //var input = new GetAllTheKhachHangsInput();
            //input.Sorting = null;
            //input.SkipCount = 1;
            //input.MaxResultCount = 100;

            int? loaiThe = null;
            if (input.IsTheLan.HasValue)
            {
                if (input.IsTheLan.Value)
                {
                    loaiThe = 2;
                }
                else
                {
                    loaiThe = 1;
                }
            }
            bool withoutFilter = string.IsNullOrWhiteSpace(input.MaTheFilter) && string.IsNullOrWhiteSpace(input.DM_DoiTuongMaFilter) && string.IsNullOrWhiteSpace(input.DM_DoiTuongPhoneFilter) && string.IsNullOrWhiteSpace(input.DM_DoiTuongCMTFilter) && string.IsNullOrWhiteSpace(input.DM_DoiTuongDiaChiFilter) && string.IsNullOrWhiteSpace(input.DM_DoiTuongTenDoiTuongFilter);
            //await PermissionChecker.IsGrantedAsync(AppPermissions.Pages_Administration_UiCustomization)
            bool hasSearchFull = PermissionChecker.IsGranted(AppPermissions.Pages_TheKhachHangs_SearchFull);
            bool hasLoadFull = PermissionChecker.IsGranted(AppPermissions.Pages_TheKhachHangs_LoadFull);
             
            var listTheKhachHangRepository = _theKhachHangRepository.GetAll();
            IQueryable <TheKhachHang> filteredTheKhachHangs = listTheKhachHangRepository
                .WhereIf(loaiThe.HasValue, (TheKhachHang x) => x.TheGiaTri_SoLan_GiamGia == loaiThe.Value);
            User currentUser = await _userRepository.FirstOrDefaultAsync((User x) => x.Id == AbpSession.GetUserId());
            CustomOrganizationUnitDto currentUserOrg = await _commonLookupAppService.GetCurrentUserOrganization();
            
            if (currentUser == null || currentUserOrg == null)
            {
                throw new UserFriendlyException("Thao tác không hợp lệ");
            }
            filteredTheKhachHangs = filteredTheKhachHangs
                .WhereIf(!string.IsNullOrWhiteSpace(input.MaTheFilter), 
                (TheKhachHang e) => e.MaThe.ToLower() == input.MaTheFilter.ToLower().Trim());

            var dM_NhomTheRepository = _dM_NhomTheRepository.GetAll();

            var dM_DoiTuongRepository = _dM_DoiTuongRepository.GetAll();

            IQueryable<GetTheKhachHangForView> query = (from o in filteredTheKhachHangs
                                                        join o1 in dM_NhomTheRepository on o.ID_NhomThe equals o1.Id into j1
                                                        from s1 in j1.DefaultIfEmpty()
                                                        join o2 in dM_DoiTuongRepository.WhereIf(!string.IsNullOrWhiteSpace(input.DM_DoiTuongTenDoiTuongFilter), (DM_DoiTuong e) => e.TenDoiTuong.ToLower().Contains(input.DM_DoiTuongTenDoiTuongFilter.ToLower().Trim())).WhereIf(!string.IsNullOrWhiteSpace(input.DM_DoiTuongCMTFilter), (DM_DoiTuong e) => e.SoCMTND_DKKD.ToLower().Contains(input.DM_DoiTuongCMTFilter.ToLower().Trim()))
                                                            .WhereIf(!string.IsNullOrWhiteSpace(input.DM_DoiTuongPhoneFilter), (DM_DoiTuong e) => e.DienThoai.ToLower().Contains(input.DM_DoiTuongPhoneFilter.ToLower().Trim()))
                                                            .WhereIf(!string.IsNullOrWhiteSpace(input.DM_DoiTuongDiaChiFilter), (DM_DoiTuong e) => e.DiaChi.ToLower().Contains(input.DM_DoiTuongDiaChiFilter.ToLower().Trim()))
                                                            .WhereIf(!string.IsNullOrWhiteSpace(input.DM_DoiTuongMaFilter), (DM_DoiTuong e) => e.MaDoiTuong.ToLower() == input.DM_DoiTuongMaFilter.ToLower().Trim()) on o.ID_KhachHang equals o2.Id into j2
                                                        from s2 in j2.DefaultIfEmpty()
                                                        where (!hasLoadFull && (!hasSearchFull || (hasSearchFull && withoutFilter)) && (currentUserOrg.Lineage.Contains(string.Concat("/" + ((object)o.ID_DonVi).ToString(), "/")) || currentUserOrg.Lineage.Contains(string.Concat("/" + ((object)o.ID_DonViThucHien).ToString(), "/")) || currentUserOrg.Lineage.Contains(string.Concat("/" + ((object)o.ID_DonViThuHuong).ToString(), "/")))) || !(!hasLoadFull && (!hasSearchFull || (hasSearchFull && withoutFilter)))
                                                        select new GetTheKhachHangForView
                                                        {
                                                            NgayMua = o.NgayMua,
                                                            LastModificationTime = o.LastModificationTime,
                                                            TheKhachHang = ObjectMapper.Map<TheKhachHangDto>(o),
                                                            DM_NhomTheTenNhomThe = ((s1 == null) ? "" : s1.TenNhomThe.ToString()),
                                                            DM_DoiTuongTenDoiTuong = ((s2 == null) ? "" : s2.TenDoiTuong.ToString()),
                                                            DM_DoiTuongPhone = ((s2 == null) ? "" : s2.DienThoai),
                                                            DM_DoiTuongCMT = ((s2 == null) ? "" : s2.SoCMTND_DKKD),
                                                            DM_DoiTuongDiaChi = ((s2 == null) ? "" : s2.DiaChi),
                                                            DM_DoiTuongMaDoiTuong = ((s2 == null) ? "" : s2.MaDoiTuong),
                                                            OrganizationUnitDisplayName = o.SellingOrganizationName,
                                                            DaThanhToan = o.DaThanhToan,
                                                            LaDonViThucHien = (o.ID_DonViThucHien == (long?)currentUserOrg.Id)
                                                        }).WhereIf(!string.IsNullOrWhiteSpace(input.Filter), (GetTheKhachHangForView e) => e.DM_DoiTuongCMT.ToLower().Contains(input.Filter.ToLower().Trim()) || e.DM_DoiTuongPhone.ToLower().Contains(input.Filter.ToLower().Trim()) || e.DM_DoiTuongDiaChi.ToLower().Contains(input.Filter.ToLower().Trim()) || e.TheKhachHang.MaThe.ToLower().Contains(input.Filter.ToLower().Trim()));
            //debug
            var Testquery = query.OrderByDescending(q=>q.NgayMua).ToQueryString();
            //debug
            //Task<int> countAsync = query.CountAsync();
            int count = query.Count();

            //Task<List<GetTheKhachHangForView>> list = query.ToListAsync();

            List<GetTheKhachHangForView> list;
            if (input.Sorting == null)
            {
                list = query.OrderByDescending(q => q.NgayMua).PageBy(input.SkipCount, input.MaxResultCount).ToList();
            }
            else
            {
                list = query.OrderBy(q => q.LastModificationTime).PageBy(input.SkipCount, input.MaxResultCount).ToList();
            }

            //var orderBy = query.OrderBy("creationTime desc").ToQueryString();

            var result = new PagedResultDto<GetTheKhachHangForView>();

            if (query.Any())
            {
                //debug
                result = new PagedResultDto<GetTheKhachHangForView>(count, list);
                //result = new PagedResultDto<GetTheKhachHangForView>(await query.CountAsync(), await query.ToListAsync());
            }

            //if (query.Any())
            //{
            //    result = new PagedResultDto<GetTheKhachHangForView>(await query.CountAsync(), await query.OrderBy(input.Sorting ?? "theKhachHang.creationTime desc").PageBy(1, 100).ToListAsync());
            //}

            return result;
        }

        public static T DeepClone<T>(T obj)
        {
            using MemoryStream ms = new MemoryStream();
            BinaryFormatter binaryFormatter = new BinaryFormatter();
            binaryFormatter.Serialize(ms, obj);
            ms.Position = 0L;
            return (T)binaryFormatter.Deserialize(ms);
        }

        public async Task<PagedResultDto<GetTheKhachHangChiTietForView>> GetAllPackageByCardForRelease(GetAllTheKhachHangChiTietsInput input)
        {
            if (!input.ID_TheKhachHang.HasValue)
            {
                input.ID_TheKhachHang = Guid.Empty;
            }
            IQueryable<TheKhachHangChiTiet> filteredTheKhachHangChiTiets = from e in _theKhachHangChiTietRepository.GetAll().WhereIf(input.ID_TheKhachHang.HasValue, (TheKhachHangChiTiet e) => e.ID_TheKhachHang == input.ID_TheKhachHang.Value)
                                                                           where e.LaTangKem == false && e.SoLuong > e.SoLuongDaSuDung
                                                                           select e;
            IQueryable<GetTheKhachHangChiTietForView> subquery = from o in filteredTheKhachHangChiTiets
                                                                 join o1 in _theKhachHangRepository.GetAll() on o.ID_TheKhachHang equals o1.Id into j1
                                                                 from s1 in j1.DefaultIfEmpty()
                                                                 select new GetTheKhachHangChiTietForView
                                                                 {
                                                                     TheKhachHangChiTiet = ObjectMapper.Map<TheKhachHangChiTietDto>(o),
                                                                     TheKhachHangMaThe = ((s1 == null) ? "" : s1.MaThe.ToString())
                                                                 };
            return new PagedResultDto<GetTheKhachHangChiTietForView>(await subquery.CountAsync(), await subquery.OrderBy(input.Sorting ?? "theKhachHangChiTiet.id asc").PageBy(input).ToListAsync());
        }

        [HttpPost]
        public async Task<PagedResultDto<GetTheKhachHangHistoryForView>> GetAllHistory(GetTheKhachHangHistoryForView input)
        {
            new List<string>();
            List<GetTheKhachHangHistoryForView> theKhachHangHistorys = new List<GetTheKhachHangHistoryForView>();
            return new PagedResultDto<GetTheKhachHangHistoryForView>(0, theKhachHangHistorys);
        }

        [AbpAuthorize(new string[] { "Pages.TheKhachHangs.Edit" })]
        public async Task<GetTheKhachHangForEditOutput> GetTheKhachHangForEdit(EntityDto<Guid> input)
        {
            TheKhachHang theKhachHang = await _theKhachHangRepository.FirstOrDefaultAsync(input.Id);
            GetTheKhachHangForEditOutput output = new GetTheKhachHangForEditOutput
            {
                TheKhachHang = base.ObjectMapper.Map<CreateOrEditTheKhachHangDto>(theKhachHang)
            };
            if (output.TheKhachHang.ID_NhomThe.HasValue)
            {
                DM_NhomThe dM_NhomThe = await _dM_NhomTheRepository.FirstOrDefaultAsync(output.TheKhachHang.ID_NhomThe.Value);
                output.DM_NhomTheTenNhomThe = dM_NhomThe.TenNhomThe.ToString();
            }
            if (output.TheKhachHang.ID_KhachHang.HasValue)
            {
                DM_DoiTuong dM_DoiTuong = await _dM_DoiTuongRepository.FirstOrDefaultAsync((DM_DoiTuong x) => x.Id == (Guid)output.TheKhachHang.ID_KhachHang);
                if (dM_DoiTuong.DM_NhomDoiTuongId.HasValue)
                {
                    DM_NhomDoiTuong nhomDoiTuong = await _nhomDoiTuongRepository.FirstOrDefaultAsync(dM_DoiTuong.DM_NhomDoiTuongId.Value);
                    output.DM_DoiTuongNhomDoiTuong = nhomDoiTuong.TenNhom;
                }
                output.DM_DoiTuongTenDoiTuong = dM_DoiTuong.TenDoiTuong.ToString();
                output.DM_DoiTuongCMT = dM_DoiTuong.SoCMTND_DKKD.ToString();
                output.DM_DoiTuongDiaChi = dM_DoiTuong.DiaChi.ToString();
                output.DM_DoiTuongPhone = dM_DoiTuong.DienThoai.ToString();
                output.DM_DoiTuongNgaySinh = dM_DoiTuong.NgaySinh_NgayTLap;
            }
            if (output.TheKhachHang.ID_TheCu.HasValue)
            {
                TheKhachHang theCu = await _theKhachHangRepository.FirstOrDefaultAsync(output.TheKhachHang.ID_TheCu.Value);
                output.TheCuMaThe = theCu.MaThe.ToString();
            }
            if (output.TheKhachHang.ID_NhanVienLap.HasValue)
            {
                User user = await _userRepository.FirstOrDefaultAsync(output.TheKhachHang.ID_NhanVienLap.Value);
                output.UserName = user.Name.ToString();
            }
            if (output.TheKhachHang.ID_DonVi.HasValue)
            {
                CustomOrganizationUnit organizationUnit = await _organizationUnitRepository.FirstOrDefaultAsync(output.TheKhachHang.ID_DonVi.Value);
                output.OrganizationUnitDisplayName = organizationUnit.DisplayName.ToString();
            }
            if (output.TheKhachHang.ID_DonViThuHuong.HasValue)
            {
                CustomOrganizationUnit organizationUnit2 = await _organizationUnitRepository.FirstOrDefaultAsync(output.TheKhachHang.ID_DonViThuHuong.Value);
                output.DonViThuHuongTenDonVi = organizationUnit2.DisplayName.ToString();
            }
            if (output.TheKhachHang.ID_DonViThucHien.HasValue)
            {
                CustomOrganizationUnit organizationUnit3 = await _organizationUnitRepository.FirstOrDefaultAsync(output.TheKhachHang.ID_DonViThucHien.Value);
                output.DonViThucHienTenDonVi = organizationUnit3.DisplayName.ToString();
            }
            if (output.TheKhachHang.ID_KhuyenMai.HasValue)
            {
                DM_KhuyenMai khuyenMai = await _dM_KhuyenMaiRepository.FirstOrDefaultAsync(output.TheKhachHang.ID_KhuyenMai.Value);
                if (khuyenMai != null)
                {
                    output.DM_KhuyenMaiTenKhuyenMai = khuyenMai.DisplayName;
                }
            }
            await (from hdblct in _invoiceDetailRepository.GetAll()
                   join hdbl in _invoiceRepository.GetAll() on hdblct.ID_HoaDon equals hdbl.Id into j1
                   from s1 in j1
                   join nksd in from x in _nhatKySuDungTheRepository.GetAll()
                                where x.ID_TheKhachHang == output.TheKhachHang.Id
                                select x on s1.Id equals nksd.ID_ChungTu into j2
                   from s2 in j2
                   select hdblct).SumAsync((HoaDonBanLeChiTiet x) => x.ThanhTien);
            if (output.TheKhachHang.VoucherId.HasValue)
            {
                Voucher voucher = await _voucherRepository.FirstOrDefaultAsync(output.TheKhachHang.VoucherId.Value);
                output.MaVoucher = voucher.VoucherCode;
                if (output.TheKhachHang.ID_KhuyenMai.HasValue)
                {
                    DM_KhuyenMai dM_KhuyenMai = await _dM_KhuyenMaiRepository.FirstOrDefaultAsync(output.TheKhachHang.ID_KhuyenMai.Value);
                    output.DM_KhuyenMaiTenKhuyenMai = dM_KhuyenMai.DisplayName.ToString();
                    output.IsPercentage = dM_KhuyenMai.IsPercentage;
                    if (dM_KhuyenMai.IsPercentage)
                    {
                        output.VoucherValue = voucher.VoucherValue;
                    }
                    else
                    {
                        output.VoucherValue = voucher.VoucherValue;
                        foreach (TheKhachHangChiTiet item in await (from x in _theKhachHangChiTietRepository.GetAll()
                                                                    where x.ID_TheKhachHang == output.TheKhachHang.Id
                                                                    orderby x.CreationTime
                                                                    select x).ToListAsync())
                        {
                            if (output.VoucherValue > 0m)
                            {
                                output.VoucherValue -= item.DonGia * (decimal)item.SoLuong;
                            }
                        }
                        if (output.VoucherValue < 0m)
                        {
                            output.VoucherValue = 0m;
                        }
                    }
                }
            }
            decimal phieuThu = await (from x in _phieuThuChiTietRepository.GetAll()
                                      where x.ID_ChungTu == input.Id
                                      select x).SumAsync((PhieuThuChiTiet x) => x.TienThu);
            output.DaThanhToan = phieuThu;
            return output;
        }

        [UnitOfWork]
        public virtual async Task<Guid> CreateOrEdit(CreateOrEditTheKhachHangDto input)
        {
            _ = Guid.Empty;
            return (input.Id.HasValue && !(input.Id == Guid.Empty)) ? (await Update(input)) : (await Create(input));
        }

        [AbpAuthorize(new string[] { "Pages.TheKhachHangs.Create" })]
        private async Task<Guid> Create(CreateOrEditTheKhachHangDto input)
        {
            TheKhachHang theKhachHang = base.ObjectMapper.Map<TheKhachHang>(input);
            if (!input.ID_KhachHang.HasValue)
            {
                throw new UserFriendlyException("Bạn chưa chọn khách hàng");
            }
            DM_DoiTuong khachHang = await _dM_DoiTuongRepository.FirstOrDefaultAsync(input.ID_KhachHang.Value);
            if (khachHang == null)
            {
                throw new UserFriendlyException("Thông tin khách hàng không tồn tại");
            }
            int existTheKhachHangs = await (from x in _theKhachHangRepository.GetAll()
                                            where x.ID_KhachHang == khachHang.Id
                                            select x).CountAsync();
            string maThe = (theKhachHang.MaThe = khachHang.MaDoiTuong + "-" + (existTheKhachHangs + 1).ToString("D3"));
            if (input.ID_TheCu.HasValue)
            {
                TheKhachHang theCu = await _theKhachHangRepository.FirstOrDefaultAsync(input.ID_TheCu.Value);
                if (!theCu.DaChuyenThe)
                {
                    theKhachHang.ReleaseBalance = theCu.SoDu;
                    theKhachHang.SoDu = theCu.SoDu;
                    theCu.SoDu = 0m;
                    theCu.DaChuyenThe = true;
                }
            }
            if (theKhachHang.ID_DonVi.HasValue)
            {
                CustomOrganizationUnit sellingOrg = await _organizationUnitRepository.FirstOrDefaultAsync(theKhachHang.ID_DonVi.Value);
                theKhachHang.SellingOrganizationCode = sellingOrg.UnitCode;
                theKhachHang.SellingOrganizationName = sellingOrg.DisplayName;
            }
            if (theKhachHang.ID_DonViThucHien.HasValue)
            {
                CustomOrganizationUnit sellingOrg2 = await _organizationUnitRepository.FirstOrDefaultAsync(theKhachHang.ID_DonViThucHien.Value);
                theKhachHang.AuthorizedOrganizationCode = sellingOrg2.UnitCode;
                theKhachHang.AuthorizedOrganizationName = sellingOrg2.DisplayName;
            }
            Guid id = await _theKhachHangRepository.InsertAndGetIdAsync(theKhachHang);
            base.UnitOfWorkManager.Current.SaveChanges();
            bool isTrial = true;
            if (input.TempId.HasValue)
            {
                Voucher voucher = null;
                DM_KhuyenMai khuyenMai = null;
                if (input.VoucherId.HasValue)
                {
                    voucher = await _voucherRepository.FirstOrDefaultAsync(input.VoucherId.Value);
                    khuyenMai = await _dM_KhuyenMaiRepository.FirstOrDefaultAsync(voucher.KhuyenMaiId.Value);
                }
                IQueryable<TheKhachHangChiTiet> theKhachHangChiTiets = from e in _dM_TheKhachHangChiTietRepository.GetAll()
                                                                       where e.ID_TheKhachHang == input.TempId.Value
                                                                       select e;
                decimal menhGiaThe = default(decimal);
                decimal phaiThanhToan = default(decimal);
                if (theKhachHang.TheGiaTri_SoLan_GiamGia == 2 && theKhachHangChiTiets.Count() > 0)
                {
                    if (voucher != null)
                    {
                        decimal voucherValue2 = voucher.VoucherValue;
                        foreach (TheKhachHangChiTiet item2 in theKhachHangChiTiets)
                        {
                            if (!item2.LaTangKem)
                            {
                                decimal thanhTien2 = (item2.ThanhToan = (decimal)item2.SoLuong * item2.DonGia);
                                if (thanhTien2 == 0m)
                                {
                                    item2.PTChietKhau = 0m;
                                    item2.TienChietKhau = 0m;
                                }
                                else if (khuyenMai.IsPercentage)
                                {
                                    decimal discountFromVoucher = thanhTien2 * voucherValue2 / 100m;
                                    item2.PTChietKhau = item2.TienChietKhau / (thanhTien2 - discountFromVoucher) * 100m;
                                    item2.ThanhToan = thanhTien2 - discountFromVoucher - item2.TienChietKhau;
                                }
                                else if (voucherValue2 > thanhTien2)
                                {
                                    item2.ThanhToan = 0m;
                                    voucherValue2 -= item2.DonGia * (decimal)item2.SoLuong;
                                }
                                else
                                {
                                    item2.ThanhToan = thanhTien2 - voucherValue2;
                                    if (item2.ThanhToan == 0m)
                                    {
                                        item2.PTChietKhau = 0m;
                                        item2.TienChietKhau = 0m;
                                    }
                                    else
                                    {
                                        item2.PTChietKhau = item2.TienChietKhau / item2.ThanhToan * 100m;
                                    }
                                    item2.ThanhToan -= item2.TienChietKhau;
                                    voucherValue2 = default(decimal);
                                }
                            }
                            phaiThanhToan += item2.ThanhToan;
                            menhGiaThe += item2.DonGia * (decimal)item2.SoLuong;
                            item2.ID_TheKhachHang = id;
                            _theKhachHangChiTietRepository.Update(item2);
                        }
                    }
                    else
                    {
                        foreach (TheKhachHangChiTiet item in theKhachHangChiTiets)
                        {
                            if (!item.LaTangKem)
                            {
                                decimal thanhTien = (decimal)item.SoLuong * item.DonGia;
                                if (thanhTien == 0m)
                                {
                                    item.PTChietKhau = 0m;
                                }
                                else
                                {
                                    item.PTChietKhau = item.TienChietKhau / thanhTien * 100m;
                                }
                                item.ThanhToan = thanhTien - item.TienChietKhau;
                            }
                            phaiThanhToan += item.ThanhToan;
                            menhGiaThe += item.DonGia * (decimal)item.SoLuong;
                            item.ID_TheKhachHang = id;
                            _theKhachHangChiTietRepository.Update(item);
                        }
                    }
                }
                else if (voucher != null)
                {
                    decimal voucherValue = voucher.VoucherValue;
                    if (khuyenMai.IsPercentage)
                    {
                        theKhachHang.PhaiThanhToan = theKhachHang.MenhGiaThe * (100m - voucherValue) / 100m - theKhachHang.TienChietKhau;
                        theKhachHang.PTChietKhau = theKhachHang.TienChietKhau / (theKhachHang.MenhGiaThe * (100m - voucherValue) / 100m);
                    }
                    else
                    {
                        theKhachHang.PhaiThanhToan = theKhachHang.MenhGiaThe - ((voucherValue <= theKhachHang.MenhGiaThe) ? voucherValue : theKhachHang.MenhGiaThe);
                        if (theKhachHang.PhaiThanhToan == 0m)
                        {
                            theKhachHang.TienChietKhau = 0m;
                            theKhachHang.PTChietKhau = 0m;
                        }
                        else
                        {
                            theKhachHang.PTChietKhau = theKhachHang.TienChietKhau / theKhachHang.PhaiThanhToan * 100m;
                        }
                    }
                }
                else
                {
                    theKhachHang.PTChietKhau = theKhachHang.TienChietKhau / theKhachHang.MenhGiaThe * 100m;
                    _ = theKhachHang.MenhGiaThe;
                    phaiThanhToan = theKhachHang.MenhGiaThe - theKhachHang.TienChietKhau;
                }
                theKhachHang.PhaiThanhToan = phaiThanhToan;
                await _theKhachHangRepository.UpdateAsync(theKhachHang);
                isTrial = ((phaiThanhToan == 0m) ? true : false);
            }
            (from x in _nhanVienThucHienRepository.GetAll()
             where x.MaChungTu == input.TempId.Value
             select x).ForEachAsync(delegate (NhanVienThucHien x)
             {
                 x.MaChungTu = id;
             });
            DM_DoiTuong customer = await _dM_DoiTuongRepository.FirstOrDefaultAsync(theKhachHang.ID_KhachHang.Value);
            if (customer.CustomerDataId.HasValue)
            {
                EventBus.Default.Trigger(new TransactionCreattionEvent
                {
                    CustomerDataId = customer.CustomerDataId.Value,
                    CustomerId = customer.Id,
                    IsTrial = isTrial,
                    CustomerCode = customer.MaDoiTuong
                });
            }
            return id;
        }

        [AbpAuthorize(new string[] { "Pages.TheKhachHangs.Edit" })]
        private async Task<Guid> Update(CreateOrEditTheKhachHangDto input)
        {
            TheKhachHang theKhachHang = await _theKhachHangRepository.FirstOrDefaultAsync(input.Id.Value);
            if (theKhachHang.ID_TheCu != input.ID_TheCu && input.ID_TheCu.HasValue)
            {
                TheKhachHang theCu = await _theKhachHangRepository.FirstOrDefaultAsync(input.ID_TheCu.Value);
                if (!theCu.DaChuyenThe)
                {
                    theKhachHang.ReleaseBalance = theCu.SoDu;
                    theKhachHang.SoDu += theCu.SoDu;
                    theCu.SoDu = 0m;
                    theCu.DaChuyenThe = true;
                    theKhachHang.ID_TheCu = input.ID_TheCu;
                }
            }
            if (theKhachHang.ID_DonVi.HasValue)
            {
                CustomOrganizationUnit sellingOrg = await _organizationUnitRepository.FirstOrDefaultAsync(theKhachHang.ID_DonVi.Value);
                theKhachHang.SellingOrganizationCode = sellingOrg.UnitCode;
                theKhachHang.SellingOrganizationName = sellingOrg.DisplayName;
            }
            if (theKhachHang.ID_DonViThucHien.HasValue)
            {
                CustomOrganizationUnit sellingOrg2 = await _organizationUnitRepository.FirstOrDefaultAsync(theKhachHang.ID_DonViThucHien.Value);
                theKhachHang.AuthorizedOrganizationCode = sellingOrg2.UnitCode;
                theKhachHang.AuthorizedOrganizationName = sellingOrg2.DisplayName;
            }
            theKhachHang.NgayApDung = input.NgayApDung;
            theKhachHang.NgayHetHan = input.NgayHetHan;
            theKhachHang.NgayMua = input.NgayMua;
            theKhachHang.ID_DonVi = input.ID_DonVi;
            theKhachHang.ID_DonViThucHien = input.ID_DonViThucHien;
            theKhachHang.ID_DonViThuHuong = input.ID_DonViThuHuong;
            theKhachHang.ID_KhuyenMai = input.ID_KhuyenMai;
            theKhachHang.VoucherId = input.VoucherId;
            theKhachHang.ID_NhomThe = input.ID_NhomThe;
            theKhachHang.Status = input.Status;
            theKhachHang.HuyThe = input.HuyThe;
            theKhachHang.MenhGiaThe = input.MenhGiaThe;
            theKhachHang.PTChietKhau = input.PTChietKhau;
            theKhachHang.TienChietKhau = input.TienChietKhau;
            theKhachHang.PTTangThem = input.PTTangThem;
            theKhachHang.TienTangThem = input.TienTangThem;
            theKhachHang.GhiChu = input.GhiChu;
            theKhachHang.ID_KhuyenMai = input.ID_KhuyenMai;
            theKhachHang.VoucherId = input.VoucherId;
            IQueryable<TheKhachHangChiTiet> theKhachHangChiTiets = from e in _dM_TheKhachHangChiTietRepository.GetAll()
                                                                   where e.ID_TheKhachHang == theKhachHang.Id
                                                                   select e;
            decimal menhGiaThe = default(decimal);
            decimal phaiThanhToan = default(decimal);
            Voucher voucher = null;
            DM_KhuyenMai khuyenMai = null;
            if (input.VoucherId.HasValue)
            {
                voucher = await _voucherRepository.FirstOrDefaultAsync(input.VoucherId.Value);
                khuyenMai = await _dM_KhuyenMaiRepository.FirstOrDefaultAsync(voucher.KhuyenMaiId.Value);
            }
            if (theKhachHang.TheGiaTri_SoLan_GiamGia == 2 && theKhachHangChiTiets.Count() > 0)
            {
                if (voucher != null)
                {
                    decimal voucherValue = voucher.VoucherValue;
                    foreach (TheKhachHangChiTiet item in theKhachHangChiTiets)
                    {
                        if (!item.LaTangKem)
                        {
                            decimal thanhTien = (item.ThanhToan = (decimal)item.SoLuong * item.DonGia);
                            if (thanhTien == 0m)
                            {
                                item.PTChietKhau = 0m;
                                item.TienChietKhau = 0m;
                            }
                            else if (khuyenMai.IsPercentage)
                            {
                                decimal discountFromVoucher = thanhTien * voucherValue / 100m;
                                item.PTChietKhau = item.TienChietKhau / (thanhTien - discountFromVoucher) * 100m;
                                item.ThanhToan = thanhTien - discountFromVoucher - item.TienChietKhau;
                            }
                            else if (voucherValue > thanhTien)
                            {
                                item.ThanhToan = 0m;
                                voucherValue -= item.DonGia * (decimal)item.SoLuong;
                            }
                            else
                            {
                                item.ThanhToan = thanhTien - voucherValue;
                                if (item.ThanhToan == 0m)
                                {
                                    item.PTChietKhau = 0m;
                                    item.TienChietKhau = 0m;
                                }
                                else
                                {
                                    item.PTChietKhau = item.TienChietKhau / item.ThanhToan * 100m;
                                }
                                item.ThanhToan -= item.TienChietKhau;
                                voucherValue = default(decimal);
                            }
                        }
                        phaiThanhToan += item.ThanhToan;
                        menhGiaThe += item.DonGia * (decimal)item.SoLuong;
                        _theKhachHangChiTietRepository.Update(item);
                    }
                }
                else
                {
                    foreach (TheKhachHangChiTiet item2 in theKhachHangChiTiets)
                    {
                        if (!item2.LaTangKem)
                        {
                            decimal thanhTien2 = (decimal)item2.SoLuong * item2.DonGia;
                            if (thanhTien2 == 0m)
                            {
                                item2.PTChietKhau = 0m;
                            }
                            else
                            {
                                item2.PTChietKhau = item2.TienChietKhau / thanhTien2 * 100m;
                            }
                            item2.ThanhToan = thanhTien2 - item2.TienChietKhau;
                        }
                        phaiThanhToan += (item2.TraLaiHHDV ? item2.TienDaSuDung : item2.ThanhToan);
                        menhGiaThe += item2.DonGia * (decimal)item2.SoLuong;
                        _theKhachHangChiTietRepository.Update(item2);
                    }
                }
                theKhachHang.SoDu = theKhachHang.DaThanhToan + theKhachHang.ReleaseBalance + input.AdjustedAmount;
                theKhachHang.VirtualBalance = theKhachHang.SoDu;
                List<NhatKySuDungThe> usingLogs2 = await (from x in _nhatKySuDungTheRepository.GetAll()
                                                          where x.ID_TheKhachHang == theKhachHang.Id
                                                          select x).ToListAsync();
                if (usingLogs2.Count() > 0)
                {
                    foreach (NhatKySuDungThe usingLog2 in usingLogs2)
                    {
                        HoaDonBanLeChiTiet invoice2 = await _invoiceDetailRepository.FirstOrDefaultAsync((HoaDonBanLeChiTiet x) => x.Id == usingLog2.ID_ChiTietChungTu);
                        if (invoice2 == null)
                        {
                            invoice2 = await _invoiceDetailRepository.FirstOrDefaultAsync((HoaDonBanLeChiTiet x) => usingLog2.ID_ChungTu == x.ID_HoaDon && usingLog2.ID_HangHoaDichVu == x.ID_HangHoa);
                        }
                        if (invoice2 != null)
                        {
                            usingLog2.SoTien = invoice2.ThanhToan;
                            usingLog2.SoLuong = invoice2.SoLuong;
                            usingLog2.ID_ChiTietChungTu = invoice2.Id;
                            await _nhatKySuDungTheRepository.UpdateAsync(usingLog2);
                            theKhachHang.VirtualBalance -= usingLog2.SoTien;
                        }
                    }
                    theKhachHang.SoDu = theKhachHang.VirtualBalance;
                }
            }
            else
            {
                if (voucher != null)
                {
                    decimal voucherValue2 = voucher.VoucherValue;
                    if (khuyenMai.IsPercentage)
                    {
                        theKhachHang.PhaiThanhToan = theKhachHang.MenhGiaThe * (100m - voucherValue2) / 100m - theKhachHang.TienChietKhau;
                        theKhachHang.PTChietKhau = theKhachHang.TienChietKhau / (theKhachHang.MenhGiaThe * (100m - voucherValue2) / 100m);
                    }
                    else
                    {
                        theKhachHang.PhaiThanhToan = theKhachHang.MenhGiaThe - ((voucherValue2 <= theKhachHang.MenhGiaThe) ? voucherValue2 : theKhachHang.MenhGiaThe);
                        if (theKhachHang.PhaiThanhToan == 0m)
                        {
                            theKhachHang.TienChietKhau = 0m;
                            theKhachHang.PTChietKhau = 0m;
                        }
                        else
                        {
                            theKhachHang.PTChietKhau = theKhachHang.TienChietKhau / theKhachHang.PhaiThanhToan * 100m;
                        }
                    }
                }
                else
                {
                    theKhachHang.PTChietKhau = theKhachHang.TienChietKhau / theKhachHang.MenhGiaThe * 100m;
                    menhGiaThe = theKhachHang.MenhGiaThe;
                    phaiThanhToan = theKhachHang.MenhGiaThe - theKhachHang.TienChietKhau;
                }
                theKhachHang.SoDu = theKhachHang.DaThanhToan + theKhachHang.ReleaseBalance + input.AdjustedAmount;
                theKhachHang.VirtualBalance = theKhachHang.SoDu;
                List<NhatKySuDungThe> usingLogs = await (from x in _nhatKySuDungTheRepository.GetAll()
                                                         where x.ID_TheKhachHang == theKhachHang.Id
                                                         select x).ToListAsync();
                if (usingLogs.Count() > 0)
                {
                    foreach (NhatKySuDungThe usingLog in usingLogs)
                    {
                        HoaDonBanLeChiTiet invoice = await _invoiceDetailRepository.FirstOrDefaultAsync((HoaDonBanLeChiTiet x) => x.Id == usingLog.ID_ChiTietChungTu);
                        if (invoice == null)
                        {
                            invoice = await _invoiceDetailRepository.FirstOrDefaultAsync((HoaDonBanLeChiTiet x) => usingLog.ID_ChungTu == x.ID_HoaDon && usingLog.ID_HangHoaDichVu == x.ID_HangHoa);
                        }
                        if (invoice != null)
                        {
                            usingLog.SoTien = invoice.ThanhToan;
                            usingLog.SoLuong = invoice.SoLuong;
                            usingLog.ID_ChiTietChungTu = invoice.Id;
                            await _nhatKySuDungTheRepository.UpdateAsync(usingLog);
                            theKhachHang.VirtualBalance -= usingLog.SoTien;
                        }
                    }
                    theKhachHang.SoDu = theKhachHang.VirtualBalance;
                }
            }
            theKhachHang.MenhGiaThe = menhGiaThe;
            theKhachHang.PhaiThanhToan = phaiThanhToan;
            await _theKhachHangRepository.UpdateAsync(theKhachHang);
            return theKhachHang.Id;
        }

        [AbpAuthorize(new string[] { "Pages.TheKhachHangs.Delete" })]
        public async Task Delete(EntityDto<Guid> input)
        {
            int isInUse = await _nhatKySuDungTheRepository.CountAsync((NhatKySuDungThe x) => x.ID_TheKhachHang == input.Id);
            int isPay = await _phieuThuChiTietRepository.CountAsync((PhieuThuChiTiet x) => x.ID_ChungTu == input.Id);
            if (!base.PermissionChecker.IsGranted("Pages.TheKhachHangs.AbsoluteDelete") && (isInUse > 0 || isPay > 0))
            {
                throw new UserFriendlyException("Bạn không thể xóa thẻ");
            }
            await _theKhachHangRepository.DeleteAsync(input.Id);
            await _nhatKySuDungTheRepository.DeleteAsync((NhatKySuDungThe x) => x.ID_TheKhachHang == input.Id);
            await _nhanVienThucHienRepository.DeleteAsync((NhanVienThucHien x) => x.MaChungTu == input.Id);
        }

        public async Task<FileDto> GetTheKhachHangsToExcel(GetAllTheKhachHangsForExcelInput input)
        {
            List<GetTheKhachHangForView> theKhachHangListDtos = await (from o in _theKhachHangRepository.GetAll().WhereIf(!string.IsNullOrWhiteSpace(input.MaTheFilter), (TheKhachHang e) => e.MaThe.ToLower() == input.MaTheFilter.ToLower().Trim()).WhereIf(input.MinNgayMuaFilter.HasValue, (TheKhachHang e) => e.NgayMua >= input.MinNgayMuaFilter)
                    .WhereIf(input.MaxNgayMuaFilter.HasValue, (TheKhachHang e) => e.NgayMua <= input.MaxNgayMuaFilter)
                    .WhereIf(input.MinNgayApDungFilter.HasValue, (TheKhachHang e) => e.NgayApDung >= input.MinNgayApDungFilter)
                    .WhereIf(input.MaxNgayApDungFilter.HasValue, (TheKhachHang e) => e.NgayApDung <= input.MaxNgayApDungFilter)
                    .WhereIf(input.MinNgayHetHanFilter.HasValue, (TheKhachHang e) => e.NgayHetHan >= input.MinNgayHetHanFilter)
                    .WhereIf(input.MaxNgayHetHanFilter.HasValue, (TheKhachHang e) => e.NgayHetHan <= input.MaxNgayHetHanFilter)
                    .WhereIf(input.ApDungTatCaSanPhamFilter > -1, (TheKhachHang e) => Convert.ToInt32(e.ApDungTatCaSanPham) == input.ApDungTatCaSanPhamFilter)
                    .WhereIf(input.DuocChoMuonFilter > -1, (TheKhachHang e) => Convert.ToInt32(e.DuocChoMuon) == input.DuocChoMuonFilter)
                    .WhereIf(input.MinTheGiaTri_SoLan_GiamGiaFilter.HasValue, (TheKhachHang e) => (int?)e.TheGiaTri_SoLan_GiamGia >= input.MinTheGiaTri_SoLan_GiamGiaFilter)
                    .WhereIf(input.MaxTheGiaTri_SoLan_GiamGiaFilter.HasValue, (TheKhachHang e) => (int?)e.TheGiaTri_SoLan_GiamGia <= input.MaxTheGiaTri_SoLan_GiamGiaFilter)
                    .WhereIf(input.MinNgayVaoSoFilter.HasValue, (TheKhachHang e) => e.NgayVaoSo >= input.MinNgayVaoSoFilter)
                    .WhereIf(input.MaxNgayVaoSoFilter.HasValue, (TheKhachHang e) => e.NgayVaoSo <= input.MaxNgayVaoSoFilter)
                    .WhereIf(!string.IsNullOrWhiteSpace(input.GhiChuFilter), (TheKhachHang e) => e.GhiChu.ToLower() == input.GhiChuFilter.ToLower().Trim())
                    .WhereIf(input.HuyTheFilter > -1, (TheKhachHang e) => Convert.ToInt32(e.HuyThe) == input.HuyTheFilter)
                    .WhereIf(input.MinNgayHuyFilter.HasValue, (TheKhachHang e) => e.NgayHuy >= input.MinNgayHuyFilter)
                    .WhereIf(input.MaxNgayHuyFilter.HasValue, (TheKhachHang e) => e.NgayHuy <= input.MaxNgayHuyFilter)
                    .WhereIf(input.MinSoLanDuocSuDungFilter.HasValue, (TheKhachHang e) => e.SoLanDuocSuDung >= input.MinSoLanDuocSuDungFilter)
                    .WhereIf(input.MaxSoLanDuocSuDungFilter.HasValue, (TheKhachHang e) => e.SoLanDuocSuDung <= input.MaxSoLanDuocSuDungFilter)
                    .WhereIf(!string.IsNullOrWhiteSpace(input.MaNhanVienTuVanFilter), (TheKhachHang e) => e.MaNhanVienTuVan.ToLower() == input.MaNhanVienTuVanFilter.ToLower().Trim())
                    .WhereIf(!string.IsNullOrWhiteSpace(input.TenNhanVienTuVanFilter), (TheKhachHang e) => e.TenNhanVienTuVan.ToLower() == input.TenNhanVienTuVanFilter.ToLower().Trim())
                                                                       join o1 in _dM_NhomTheRepository.GetAll() on o.ID_NhomThe equals o1.Id into j1
                                                                       from s1 in j1.DefaultIfEmpty()
                                                                       join o2 in _dM_DoiTuongRepository.GetAll() on o.ID_KhachHang equals o2.Id into j2
                                                                       from s2 in j2.DefaultIfEmpty()
                                                                       join o3 in _dM_TienTeRepository.GetAll() on o.ID_TienTe equals o3.Id into j3
                                                                       from s3 in j3.DefaultIfEmpty()
                                                                       join o4 in _userRepository.GetAll() on o.ID_NhanVienLap equals o4.Id into j4
                                                                       from s4 in j4.DefaultIfEmpty()
                                                                       join o5 in _organizationUnitRepository.GetAll() on o.ID_DonVi equals o5.Id into j5
                                                                       from s5 in j5.DefaultIfEmpty()
                                                                       select new GetTheKhachHangForView
                                                                       {
                                                                           TheKhachHang = ObjectMapper.Map<TheKhachHangDto>(o),
                                                                           DM_NhomTheTenNhomThe = ((s1 == null) ? "" : s1.TenNhomThe.ToString()),
                                                                           DM_DoiTuongTenDoiTuong = ((s2 == null) ? "" : s2.TenDoiTuong.ToString()),
                                                                           DM_TienTeTenNgoaiTe = ((s3 == null) ? "" : s3.TenNgoaiTe.ToString()),
                                                                           UserName = ((s4 == null) ? "" : s4.Name.ToString()),
                                                                           OrganizationUnitDisplayName = ((s5 == null) ? "" : s5.DisplayName.ToString())
                                                                       }).WhereIf(!string.IsNullOrWhiteSpace(input.DM_NhomTheTenNhomTheFilter), (GetTheKhachHangForView e) => e.DM_NhomTheTenNhomThe.ToLower() == input.DM_NhomTheTenNhomTheFilter.ToLower().Trim()).WhereIf(!string.IsNullOrWhiteSpace(input.DM_DoiTuongTenDoiTuongFilter), (GetTheKhachHangForView e) => e.DM_DoiTuongTenDoiTuong.ToLower() == input.DM_DoiTuongTenDoiTuongFilter.ToLower().Trim()).WhereIf(!string.IsNullOrWhiteSpace(input.DM_TienTeTenNgoaiTeFilter), (GetTheKhachHangForView e) => e.DM_TienTeTenNgoaiTe.ToLower() == input.DM_TienTeTenNgoaiTeFilter.ToLower().Trim())
                .WhereIf(!string.IsNullOrWhiteSpace(input.UserNameFilter), (GetTheKhachHangForView e) => e.UserName.ToLower() == input.UserNameFilter.ToLower().Trim())
                .WhereIf(!string.IsNullOrWhiteSpace(input.OrganizationUnitDisplayNameFilter), (GetTheKhachHangForView e) => e.OrganizationUnitDisplayName.ToLower() == input.OrganizationUnitDisplayNameFilter.ToLower().Trim())
                .WhereIf(!string.IsNullOrWhiteSpace(input.DM_DacDiemKhachHangTenDacDiemFilter), (GetTheKhachHangForView e) => e.DM_DacDiemKhachHangTenDacDiem.ToLower() == input.DM_DacDiemKhachHangTenDacDiemFilter.ToLower().Trim())
                .WhereIf(!string.IsNullOrWhiteSpace(input.DM_LienHeMaLienHeFilter), (GetTheKhachHangForView e) => e.DM_LienHeMaLienHe.ToLower() == input.DM_LienHeMaLienHeFilter.ToLower().Trim())
                .ToListAsync();
            return _theKhachHangsExcelExporter.ExportToFile(theKhachHangListDtos);
        }

        [AbpAuthorize(new string[] { "Pages.TheKhachHangs" })]
        public async Task<PagedResultDto<DM_NhomTheLookupTableDto>> GetAllDM_NhomTheForLookupTable(GetAllForLookupTableInput input)
        {
            IQueryable<DM_NhomThe> query = _dM_NhomTheRepository.GetAll().WhereIf(!string.IsNullOrWhiteSpace(input.Filter), (DM_NhomThe e) => e.TenNhomThe.ToString().Contains(input.Filter));
            int totalCount = await query.CountAsync();
            List<DM_NhomThe> obj = await query.PageBy(input).ToListAsync();
            List<DM_NhomTheLookupTableDto> lookupTableDtoList = new List<DM_NhomTheLookupTableDto>();
            foreach (DM_NhomThe dM_NhomThe in obj)
            {
                lookupTableDtoList.Add(new DM_NhomTheLookupTableDto
                {
                    Id = dM_NhomThe.Id.ToString(),
                    DisplayName = dM_NhomThe.TenNhomThe.ToString()
                });
            }
            return new PagedResultDto<DM_NhomTheLookupTableDto>(totalCount, lookupTableDtoList);
        }

        [AbpAuthorize(new string[] { "Pages.TheKhachHangs" })]
        public async Task<PagedResultDto<DM_KhuyenMaiDto>> GetAllDM_KhuyenMaiForLookupTable(GetAllForLookupTableInput input)
        {
            IQueryable<DM_KhuyenMai> query = from x in _dM_KhuyenMaiRepository.GetAll().WhereIf(!string.IsNullOrWhiteSpace(input.Filter), (DM_KhuyenMai e) => e.DisplayName.ToString().Contains(input.Filter))
                                             where (!x.StartDate.HasValue || (x.StartDate.HasValue && x.StartDate <= DateTime.Now.Date)) && (!x.EndDate.HasValue || (x.EndDate.HasValue && x.EndDate >= DateTime.Now.Date))
                                             select x;
            int totalCount = await query.CountAsync();
            List<DM_KhuyenMai> obj = await query.PageBy(input).ToListAsync();
            List<DM_KhuyenMaiDto> lookupTableDtoList = new List<DM_KhuyenMaiDto>();
            foreach (DM_KhuyenMai dM_KhuyenMai in obj)
            {
                lookupTableDtoList.Add(new DM_KhuyenMaiDto
                {
                    Id = dM_KhuyenMai.Id,
                    DisplayName = dM_KhuyenMai.DisplayName.ToString(),
                    IsPercentage = dM_KhuyenMai.IsPercentage
                });
            }
            return new PagedResultDto<DM_KhuyenMaiDto>(totalCount, lookupTableDtoList);
        }

        [AbpAuthorize(new string[] { "Pages.TheKhachHangs" })]
        public async Task<PagedResultDto<OrganizationUnitLookupTableDto>> GetAllOrganizationUnitForLookupTable(GetAllForLookupTableInput input)
        {
            IQueryable<CustomOrganizationUnit> query = _organizationUnitRepository.GetAll().WhereIf(!string.IsNullOrWhiteSpace(input.Filter), (CustomOrganizationUnit e) => e.DisplayName.ToString().Contains(input.Filter));
            int totalCount = await query.CountAsync();
            List<CustomOrganizationUnit> obj = await query.PageBy(input).ToListAsync();
            List<OrganizationUnitLookupTableDto> lookupTableDtoList = new List<OrganizationUnitLookupTableDto>();
            foreach (CustomOrganizationUnit org in obj)
            {
                lookupTableDtoList.Add(new OrganizationUnitLookupTableDto
                {
                    Id = org.Id,
                    DisplayName = org.DisplayName.ToString()
                });
            }
            return new PagedResultDto<OrganizationUnitLookupTableDto>(totalCount, lookupTableDtoList);
        }

        [AbpAuthorize(new string[] { "Pages.TheKhachHangs" })]
        public async Task<PagedResultDto<DM_TienTeLookupTableDto>> GetAllDM_TienTeForLookupTable(GetAllForLookupTableInput input)
        {
            IQueryable<DM_TienTe> query = _dM_TienTeRepository.GetAll().WhereIf(!string.IsNullOrWhiteSpace(input.Filter), (DM_TienTe e) => e.TenNgoaiTe.ToString().Contains(input.Filter));
            int totalCount = await query.CountAsync();
            List<DM_TienTe> obj = await query.PageBy(input).ToListAsync();
            List<DM_TienTeLookupTableDto> lookupTableDtoList = new List<DM_TienTeLookupTableDto>();
            foreach (DM_TienTe dM_TienTe in obj)
            {
                lookupTableDtoList.Add(new DM_TienTeLookupTableDto
                {
                    Id = dM_TienTe.Id.ToString(),
                    DisplayName = dM_TienTe.TenNgoaiTe.ToString()
                });
            }
            return new PagedResultDto<DM_TienTeLookupTableDto>(totalCount, lookupTableDtoList);
        }

        [HttpPost]
        public async Task<PagedResultDto<TheKhachHangLookupTableDto>> GetAllTheKhachHangForLookupTable(GetAllForLookupTableInput input)
        {
            IQueryable<TheKhachHang> query = (from x in _theKhachHangRepository.GetAll()
                                              where x.HuyThe == true && x.DaChuyenThe == false
                                              select x).WhereIf(!string.IsNullOrWhiteSpace(input.Filter), (TheKhachHang e) => e.MaThe.ToString().Contains(input.Filter));
            return new PagedResultDto<TheKhachHangLookupTableDto>(items: await (from the in query
                                                                                from khachHang in (from x in _dM_DoiTuongRepository.GetAll()
                                                                                                   where x.Id == the.ID_KhachHang
                                                                                                   select x).DefaultIfEmpty()
                                                                                select new TheKhachHangLookupTableDto
                                                                                {
                                                                                    Id = ((object)the.Id).ToString(),
                                                                                    MaThe = the.MaThe.ToString(),
                                                                                    MaKhachHang = khachHang.MaDoiTuong,
                                                                                    SoDu = the.SoDu
                                                                                }).PageBy(input).ToListAsync(), totalCount: await query.CountAsync());
        }

        [AbpAuthorize(new string[] { "Pages.TheKhachHangs" })]
        public async Task<PagedResultDto<DM_DacDiemKhachHangLookupTableDto>> GetAllDM_DacDiemKhachHangForLookupTable(GetAllForLookupTableInput input)
        {
            IQueryable<DM_DacDiemKhachHang> query = _dM_DacDiemKhachHangRepository.GetAll().WhereIf(!string.IsNullOrWhiteSpace(input.Filter), (DM_DacDiemKhachHang e) => e.TenDacDiem.ToString().Contains(input.Filter));
            int totalCount = await query.CountAsync();
            List<DM_DacDiemKhachHang> obj = await query.PageBy(input).ToListAsync();
            List<DM_DacDiemKhachHangLookupTableDto> lookupTableDtoList = new List<DM_DacDiemKhachHangLookupTableDto>();
            foreach (DM_DacDiemKhachHang dM_DacDiemKhachHang in obj)
            {
                lookupTableDtoList.Add(new DM_DacDiemKhachHangLookupTableDto
                {
                    Id = dM_DacDiemKhachHang.Id.ToString(),
                    DisplayName = dM_DacDiemKhachHang.TenDacDiem.ToString()
                });
            }
            return new PagedResultDto<DM_DacDiemKhachHangLookupTableDto>(totalCount, lookupTableDtoList);
        }

    }
}