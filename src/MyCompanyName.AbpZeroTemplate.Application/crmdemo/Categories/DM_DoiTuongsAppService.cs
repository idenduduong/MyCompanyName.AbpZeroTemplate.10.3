// crmdemo.Categories.DM_DoiTuongsAppService
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Auditing;
using Abp.Authorization;
using Abp.Authorization.Users;
using Abp.Dependency;
using Abp.Domain.Repositories;
using Abp.Domain.Uow;
using Abp.Events.Bus.Handlers;
using Abp.IO;
using Abp.Linq.Extensions;
using Abp.Runtime.Session;
using Abp.UI;
//using crmdemo;
//using crmdemo.Authorization.Users;
//using crmdemo.Categories;
//using crmdemo.Categories.Dtos;
//using crmdemo.Categories.Exporting;
//using crmdemo.CodeGenerateHelper;
//using crmdemo.Common;
//using crmdemo.Common.Dtos;
//using crmdemo.Dto;
//using crmdemo.Organizations.Dto;
//using crmdemo.Organizations.Event;
//using crmdemo.OrganizationUnits;
//using crmdemo.Sale;
//using crmdemo.Storage;
//using crmdemo.Temp;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyCompanyName.AbpZeroTemplate.Authorization.Users;
using MyCompanyName.AbpZeroTemplate.Common;
using MyCompanyName.AbpZeroTemplate.crmdemo.Categories.Dtos;
using MyCompanyName.AbpZeroTemplate.crmdemo.Categories.Exporting;
using MyCompanyName.AbpZeroTemplate.crmdemo.CodeGenerateHelper;
using MyCompanyName.AbpZeroTemplate.crmdemo.Common.Dtos;
using MyCompanyName.AbpZeroTemplate.crmdemo.Dto;
using MyCompanyName.AbpZeroTemplate.crmdemo.Organizations.Dto;
using MyCompanyName.AbpZeroTemplate.crmdemo.Organizations.Event;
using MyCompanyName.AbpZeroTemplate.crmdemo.OrganizationUnits;
using MyCompanyName.AbpZeroTemplate.crmdemo.Sale;
using MyCompanyName.AbpZeroTemplate.crmdemo.Sale.TheKhachHangs;
//using MyCompanyName.AbpZeroTemplate.crmdemo.Storage;
using MyCompanyName.AbpZeroTemplate.crmdemo.Temp;
using MyCompanyName.AbpZeroTemplate.Storage;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Categories
{
	//[AbpAuthorize(new string[] { "Pages.DM_DoiTuongs" })]
	public class DM_DoiTuongsAppService : AbpZeroTemplateAppServiceBase, IDM_DoiTuongsAppService, IApplicationService, ITransientDependency, IEventHandler<OrganizationUnitUpdateEvent>, IEventHandler
	{
		private const int MaxDoiTuongImageBytes = 1048576;

		private readonly IRepository<DM_DoiTuong, Guid> _dM_DoiTuongRepository;

		private readonly IDM_DoiTuongsExcelExporter _dM_DoiTuongsExcelExporter;

		private readonly IRepository<DM_NhomDoiTuong, Guid> _dM_NhomDoiTuongRepository;

		private readonly IRepository<DM_TinhThanh, Guid> _dM_TinhThanhRepository;

		private readonly IRepository<DM_QuanHuyen, Guid> _dM_QuanHuyenRepository;

		private readonly IRepository<User, long> _userRepository;

		private readonly IRepository<NguonKhachHang, Guid> _nguonKhachHangRepository;

		private readonly IRepository<DM_QuocGia, Guid> _dM_QuocGiaRepository;

		private readonly IRepository<DM_TrangThai, int> _dM_TrangThaiRepository;

		private readonly Storage.IBinaryObjectManager _binaryObjectManager;

		private readonly IAppFolders _appFolders;

		private readonly IRepository<EntityOrder, Guid> _entityOrderRepository;

		private readonly IRepository<UserOrganizationUnit, long> _userOrganizationUnitRepository;

		private readonly IRepository<CustomOrganizationUnit, long> _organizationUnitRepository;

		private readonly ICommonLookupAppService _commonLookupAppService;

		private readonly IRepository<DM_NgheNghiep> _ngheNghiepRepository;

		private readonly IRepository<TheKhachHang, Guid> _theKhachHangsRepository;

		private readonly IRepository<CustomerData, Guid> _customerDatasRepository;

        public DM_DoiTuongsAppService(IRepository<DM_DoiTuong, Guid> dM_DoiTuongRepository, IDM_DoiTuongsExcelExporter dM_DoiTuongsExcelExporter, IRepository<DM_NhomDoiTuong, Guid> dM_NhomDoiTuongRepository, IRepository<DM_TinhThanh, Guid> dM_TinhThanhRepository, IRepository<DM_QuanHuyen, Guid> dM_QuanHuyenRepository, IRepository<User, long> userRepository, IRepository<NguonKhachHang, Guid> nguonKhachHangRepository, IRepository<DM_QuocGia, Guid> dM_QuocGiaRepository, IRepository<DM_TrangThai, int> dM_TrangThaiRepository, IBinaryObjectManager binaryObjectManager, IAppFolders appFolders, IRepository<EntityOrder, Guid> entityOrderRepository, IRepository<UserOrganizationUnit, long> userOrganizationUnitRepository, IRepository<CustomOrganizationUnit, long> organizationUnitRepository, ICommonLookupAppService commonLookupAppService, IRepository<DM_NgheNghiep> ngheNghiepRepository, IRepository<TheKhachHang, Guid> theKhachHangsRepository, IRepository<CustomerData, Guid> customerDatasRepository)
		{
			_dM_DoiTuongRepository = dM_DoiTuongRepository;
			_dM_DoiTuongsExcelExporter = dM_DoiTuongsExcelExporter;
			_dM_NhomDoiTuongRepository = dM_NhomDoiTuongRepository;
			_dM_TinhThanhRepository = dM_TinhThanhRepository;
			_dM_QuanHuyenRepository = dM_QuanHuyenRepository;
			_userRepository = userRepository;
			_nguonKhachHangRepository = nguonKhachHangRepository;
			_dM_QuocGiaRepository = dM_QuocGiaRepository;
			_dM_TrangThaiRepository = dM_TrangThaiRepository;
			_binaryObjectManager = binaryObjectManager;
			_appFolders = appFolders;
			_entityOrderRepository = entityOrderRepository;
			_userOrganizationUnitRepository = userOrganizationUnitRepository;
			_organizationUnitRepository = organizationUnitRepository;
			_commonLookupAppService = commonLookupAppService;
			_ngheNghiepRepository = ngheNghiepRepository;
			_theKhachHangsRepository = theKhachHangsRepository;
			_customerDatasRepository = customerDatasRepository;
		}

		[HttpGet]
		//[HttpPost]
		public async Task<PagedResultDto<GetDM_DoiTuongForView>> GetAll()
		{
			var input = new GetAllDM_DoiTuongsInput();
			input.SkipCount = 0;
			input.MaxResultCount = 100;
			//input.Sorting = "creationTime";

			CustomOrganizationUnitDto currentUserOrg = await _commonLookupAppService.GetCurrentUserOrganization();
			//bool withoutFilter = string.IsNullOrWhiteSpace(input.MaDoiTuongFilter) && string.IsNullOrWhiteSpace(input.TenDoiTuongFilter) && string.IsNullOrWhiteSpace(input.DienThoaiFilter) && string.IsNullOrWhiteSpace(input.SoCMTND_DKKDFilter);
			//bool hasSearchFull = base.PermissionChecker.IsGranted("Pages.DM_DoiTuongs.SearchFull");
			//bool hasLoadFull = base.PermissionChecker.IsGranted("Pages.DM_DoiTuongs.LoadFull");
			
			bool withoutFilter = true;
			bool hasSearchFull = true;
			bool hasLoadFull = true;

			if (await _userRepository.FirstOrDefaultAsync((User x) => x.Id == AbpSession.GetUserId()) == null || currentUserOrg == null)
			{
				throw new UserFriendlyException("Thao tác không hợp lệ");
			}
			IQueryable<DM_DoiTuong> filteredDM_DoiTuongs = from x in _dM_DoiTuongRepository.GetAll()
														   where x.LaCaNhan == true
														   select x;
			filteredDM_DoiTuongs = filteredDM_DoiTuongs.WhereIf(!string.IsNullOrWhiteSpace(input.TenDoiTuongFilter), (DM_DoiTuong e) => e.TenDoiTuong.ToLower().Contains(input.TenDoiTuongFilter.ToLower().Trim())).WhereIf(!string.IsNullOrWhiteSpace(input.DienThoaiFilter), (DM_DoiTuong e) => e.DienThoai.ToLower().Contains(input.DienThoaiFilter.ToLower().Trim())).WhereIf(!string.IsNullOrWhiteSpace(input.SoCMTND_DKKDFilter), (DM_DoiTuong e) => e.SoCMTND_DKKD.ToLower().Contains(input.SoCMTND_DKKDFilter.ToLower().Trim()))
				.WhereIf(!string.IsNullOrWhiteSpace(input.TenKhacFilter), (DM_DoiTuong e) => e.TenKhac.ToLower().Contains(input.TenKhacFilter.ToLower().Trim()))
				.WhereIf(!string.IsNullOrWhiteSpace(input.MaDoiTuongFilter), (DM_DoiTuong e) => e.MaDoiTuong.ToLower() == input.MaDoiTuongFilter.ToLower().Trim());
			IQueryable<GetDM_DoiTuongForView> query = (from o in filteredDM_DoiTuongs
													   join o1 in _dM_NhomDoiTuongRepository.GetAll() on o.DM_NhomDoiTuongId equals o1.Id into j1
													   from s1 in j1.DefaultIfEmpty()
													   join o2 in _dM_TinhThanhRepository.GetAll() on o.DM_TinhThanhId equals o2.Id into j2
													   from s2 in j2.DefaultIfEmpty()
													   join o3 in _dM_QuanHuyenRepository.GetAll() on o.DM_QuanHuyenId equals o3.Id into j3
													   from s3 in j3.DefaultIfEmpty()
													   join o4 in _userRepository.GetAll() on o.ID_NhanVienPhuTrach equals o4.Id into j4
													   from s4 in j4.DefaultIfEmpty()
													   join o5 in _nguonKhachHangRepository.GetAll() on o.NguonKhachHangId equals o5.Id into j5
													   from s5 in j5.DefaultIfEmpty()
													   join o7 in _dM_TrangThaiRepository.GetAll() on o.DM_TrangThaiId equals o7.Id into j7
													   from s7 in j7.DefaultIfEmpty()
													   join o8 in _dM_DoiTuongRepository.GetAll() on o.ID_NguoiGioiThieu equals o8.Id into j8
													   from s8 in j8.DefaultIfEmpty()
													   join o9 in _organizationUnitRepository.GetAll() on o.ID_DonViQuanLy equals o9.Id into j9
													   from s9 in j9.DefaultIfEmpty()
													   where (!hasLoadFull && (!hasSearchFull || (hasSearchFull && withoutFilter)) && s9.Lineage.Contains(currentUserOrg.Lineage)) || !(!hasLoadFull && (!hasSearchFull || (hasSearchFull && withoutFilter)))
													   select new GetDM_DoiTuongForView
													   {
														   DM_DoiTuong = ObjectMapper.Map<DM_DoiTuongDto>(o),
														   DM_NhomDoiTuongTenNhom = ((s1 == null) ? "" : s1.TenNhom.ToString()),
														   DM_TinhThanhTenTinhThanh = ((s2 == null) ? "" : s2.TenTinhThanh.ToString()),
														   DM_QuanHuyenTenQuanHuyen = ((s3 == null) ? "" : s3.TenQuanHuyen.ToString()),
														   UserName = ((s4 == null) ? "" : s4.Name.ToString()),
														   NguonKhachHangTenNguonKhach = ((s5 == null) ? "" : s5.TenNguonKhach.ToString()),
														   DM_TrangThaiTenTrangThai = ((s7 == null) ? "" : s7.TenTrangThai.ToString()),
														   NguoiGioiThieu = ((s8 == null) ? "" : s8.TenDoiTuong.ToString()),
														   DonViQuanLy = ((s9 == null) ? "" : s9.DisplayName.ToString())
													   }).WhereIf(!string.IsNullOrWhiteSpace(input.DM_NhomDoiTuongTenNhomFilter), (GetDM_DoiTuongForView e) => e.DM_NhomDoiTuongTenNhom.ToLower() == input.DM_NhomDoiTuongTenNhomFilter.ToLower().Trim()).WhereIf(!string.IsNullOrWhiteSpace(input.DM_TinhThanhTenTinhThanhFilter), (GetDM_DoiTuongForView e) => e.DM_TinhThanhTenTinhThanh.ToLower() == input.DM_TinhThanhTenTinhThanhFilter.ToLower().Trim()).WhereIf(!string.IsNullOrWhiteSpace(input.DM_QuanHuyenTenQuanHuyenFilter), (GetDM_DoiTuongForView e) => e.DM_QuanHuyenTenQuanHuyen.ToLower() == input.DM_QuanHuyenTenQuanHuyenFilter.ToLower().Trim())
				.WhereIf(!string.IsNullOrWhiteSpace(input.UserNameFilter), (GetDM_DoiTuongForView e) => e.UserName.ToLower() == input.UserNameFilter.ToLower().Trim())
				.WhereIf(!string.IsNullOrWhiteSpace(input.NguonKhachHangTenNguonKhachFilter), (GetDM_DoiTuongForView e) => e.NguonKhachHangTenNguonKhach.ToLower() == input.NguonKhachHangTenNguonKhachFilter.ToLower().Trim())
				.WhereIf(!string.IsNullOrWhiteSpace(input.DM_QuocGiaTenNuocFilter), (GetDM_DoiTuongForView e) => e.DM_QuocGiaTenNuoc.ToLower() == input.DM_QuocGiaTenNuocFilter.ToLower().Trim())
				.WhereIf(!string.IsNullOrWhiteSpace(input.DM_TrangThaiTenTrangThaiFilter), (GetDM_DoiTuongForView e) => e.DM_TrangThaiTenTrangThai.ToLower() == input.DM_TrangThaiTenTrangThaiFilter.ToLower().Trim());

			//return new PagedResultDto<GetDM_DoiTuongForView>(await query.CountAsync(), await query.OrderBy(input.Sorting ?? "dM_DoiTuong.creationTime desc").PageBy(input).ToListAsync());

			var strQuery = query.ToQueryString();

			var result = new PagedResultDto<GetDM_DoiTuongForView>();

			var count = await query.CountAsync();
			
			List<GetDM_DoiTuongForView> listExecutor = query.ToList();

			if (query.Any())
			{
				result = new PagedResultDto<GetDM_DoiTuongForView>(count, listExecutor);
			}

			return result;
		}

		[AbpAuthorize(new string[] { "Pages.DM_DoiTuongs.Edit" })]
		public async Task<GetDM_DoiTuongForEditOutput> GetDM_DoiTuongForEdit(EntityDto<Guid> input)
		{
			DM_DoiTuong dM_DoiTuong = await _dM_DoiTuongRepository.FirstOrDefaultAsync(input.Id);
			GetDM_DoiTuongForEditOutput output = new GetDM_DoiTuongForEditOutput
			{
				DM_DoiTuong = base.ObjectMapper.Map<CreateOrEditDM_DoiTuongDto>(dM_DoiTuong)
			};
			if (!string.IsNullOrEmpty(output.DM_DoiTuong.FileDinhKems))
			{
				output.DM_DoiTuong.Ma = dM_DoiTuong.Ma.Value;
			}
			else
			{
				output.DM_DoiTuong.Ma = Guid.NewGuid();
			}
			if (output.DM_DoiTuong.DM_NhomDoiTuongId.HasValue)
			{
				output.DM_NhomDoiTuongTenNhom = (await _dM_NhomDoiTuongRepository.FirstOrDefaultAsync(output.DM_DoiTuong.DM_NhomDoiTuongId.Value)).TenNhom.ToString();
			}
			if (output.DM_DoiTuong.DM_TinhThanhId.HasValue)
			{
				output.DM_TinhThanhTenTinhThanh = (await _dM_TinhThanhRepository.FirstOrDefaultAsync(output.DM_DoiTuong.DM_TinhThanhId.Value)).TenTinhThanh.ToString();
			}
			if (output.DM_DoiTuong.DM_QuanHuyenId.HasValue)
			{
				output.DM_QuanHuyenTenQuanHuyen = (await _dM_QuanHuyenRepository.FirstOrDefaultAsync(output.DM_DoiTuong.DM_QuanHuyenId.Value)).TenQuanHuyen.ToString();
			}
			if (output.DM_DoiTuong.ID_NhanVienPhuTrach.HasValue)
			{
				User user = await _userRepository.FirstOrDefaultAsync(output.DM_DoiTuong.ID_NhanVienPhuTrach.Value);
				if (user != null)
				{
					output.UserName = user.FullName.ToString();
				}
			}
			if (output.DM_DoiTuong.NguonKhachHangId.HasValue)
			{
				output.NguonKhachHangTenNguonKhach = (await _nguonKhachHangRepository.FirstOrDefaultAsync(output.DM_DoiTuong.NguonKhachHangId.Value)).TenNguonKhach.ToString();
			}
			if (output.DM_DoiTuong.NgheNghiepId.HasValue)
			{
				output.NgheNghiepDisplayName = (await _ngheNghiepRepository.FirstOrDefaultAsync(output.DM_DoiTuong.NgheNghiepId.Value)).DisplayName;
			}
			if (output.DM_DoiTuong.DM_TrangThaiId.HasValue)
			{
				output.DM_TrangThaiTenTrangThai = (await _dM_TrangThaiRepository.FirstOrDefaultAsync(output.DM_DoiTuong.DM_TrangThaiId.Value)).TenTrangThai.ToString();
			}
			if (output.DM_DoiTuong.ID_NguoiGioiThieu.HasValue && output.DM_DoiTuong.ID_NguoiGioiThieu != Guid.Empty)
			{
				output.NguoiGioiThieu = (await _dM_DoiTuongRepository.FirstOrDefaultAsync(output.DM_DoiTuong.ID_NguoiGioiThieu.Value)).TenDoiTuong;
			}
			if (output.DM_DoiTuong.ID_DonViQuanLy.HasValue)
			{
				output.DonViThucHienDisplayName = (await _organizationUnitRepository.FirstOrDefaultAsync(output.DM_DoiTuong.ID_DonViQuanLy.Value)).DisplayName.ToString();
			}
			return output;
		}

		public async Task<DM_DoiTuongDto> CreateOrEdit(CreateOrEditDM_DoiTuongDto input)
		{
			if (!input.Id.HasValue)
			{
				return await Create(input);
			}
			return await Update(input);
		}

		[AbpAuthorize(new string[] { "Pages.DM_DoiTuongs.Create" })]
		[UnitOfWork(false)]
		private async Task<DM_DoiTuongDto> Create(CreateOrEditDM_DoiTuongDto input)
		{
			CustomOrganizationUnitDto currentOrg = await _commonLookupAppService.GetCurrentUserOrganization();
			if (currentOrg == null)
			{
				throw new UserFriendlyException("Thao tác không hợp lệ");
			}
			DM_DoiTuong dM_DoiTuong = base.ObjectMapper.Map<DM_DoiTuong>(input);
			if (!string.IsNullOrWhiteSpace(input.SoCMTND_DKKD) && await _dM_DoiTuongRepository.CountAsync((DM_DoiTuong x) => x.SoCMTND_DKKD == input.SoCMTND_DKKD) > 0)
			{
				throw new UserFriendlyException("Số CMT đã tồn tại");
			}
			if (!string.IsNullOrWhiteSpace(input.DienThoai) && await _dM_DoiTuongRepository.CountAsync((DM_DoiTuong x) => x.DienThoai == input.DienThoai) > 0)
			{
				throw new UserFriendlyException("Số điện thoại đã tồn tại");
			}
			dM_DoiTuong.ID_DonViQuanLy = currentOrg.Id;
			CustomOrganizationUnit managementOrg = await _organizationUnitRepository.FirstOrDefaultAsync(dM_DoiTuong.ID_DonViQuanLy.Value);
			if (managementOrg == null)
			{
				dM_DoiTuong.CustomerManagementOrganizationCode = string.Empty;
				dM_DoiTuong.CustomerManagementOrganizationName = string.Empty;
			}
			else
			{
				dM_DoiTuong.CustomerManagementOrganizationCode = managementOrg.UnitCode;
				dM_DoiTuong.CustomerManagementOrganizationName = managementOrg.DisplayName;
			}
			List<CustomerData> customerDatas = await (from x in _customerDatasRepository.GetAll()
													  where x.PrimaryPhone == input.DienThoai || x.SecondaryPhone == input.DienThoai
													  select x).ToListAsync();
			if (customerDatas.Count() > 0)
			{
				CustomerData dataTargeted = customerDatas.Where((CustomerData x) => x.TargetOrganizationUnitId == currentOrg.Id).FirstOrDefault();
				if (dataTargeted == null)
				{
					dataTargeted = customerDatas.FirstOrDefault();
				}
				dataTargeted.CustomerCode = dM_DoiTuong.MaDoiTuong;
				dM_DoiTuong.CustomerDataId = dataTargeted.Id;
				await _customerDatasRepository.UpdateAsync(dataTargeted);
			}
			dM_DoiTuong.MaDoiTuong = "Default";
			await _dM_DoiTuongRepository.InsertAndGetIdAsync(dM_DoiTuong);
			await base.UnitOfWorkManager.Current.SaveChangesAsync();
			return base.ObjectMapper.Map<DM_DoiTuongDto>(dM_DoiTuong);
		}

		[AbpAuthorize(new string[] { "Pages.DM_DoiTuongs.Edit" })]
		private async Task<DM_DoiTuongDto> Update(CreateOrEditDM_DoiTuongDto input)
		{
			if (!string.IsNullOrWhiteSpace(input.SoCMTND_DKKD) && await _dM_DoiTuongRepository.CountAsync((DM_DoiTuong x) => x.Id != input.Id && x.SoCMTND_DKKD == input.SoCMTND_DKKD) > 0)
			{
				throw new UserFriendlyException("Số CMT đã tồn tại");
			}
			if (!string.IsNullOrWhiteSpace(input.DienThoai) && await _dM_DoiTuongRepository.CountAsync((DM_DoiTuong x) => x.Id != input.Id && x.DienThoai == input.DienThoai) > 0)
			{
				throw new UserFriendlyException("Số điện thoại đã tồn tại");
			}
			DM_DoiTuong dM_DoiTuong = await _dM_DoiTuongRepository.FirstOrDefaultAsync(input.Id.Value);
			CustomOrganizationUnit managementOrg = await _organizationUnitRepository.FirstOrDefaultAsync(dM_DoiTuong.ID_DonViQuanLy.Value);
			if (managementOrg == null)
			{
				dM_DoiTuong.CustomerManagementOrganizationCode = string.Empty;
				dM_DoiTuong.CustomerManagementOrganizationName = string.Empty;
			}
			else
			{
				dM_DoiTuong.CustomerManagementOrganizationCode = managementOrg.UnitCode;
				dM_DoiTuong.CustomerManagementOrganizationName = managementOrg.DisplayName;
			}
			base.ObjectMapper.Map(input, dM_DoiTuong);
			return base.ObjectMapper.Map<DM_DoiTuongDto>(dM_DoiTuong);
		}

		[AbpAuthorize(new string[] { "Pages.DM_DoiTuongs.Delete" })]
		public async Task Delete(EntityDto<Guid> input)
		{
			if (await _theKhachHangsRepository.CountAsync((TheKhachHang x) => x.ID_KhachHang == input.Id) > 0)
			{
				throw new UserFriendlyException("Khách hàng đã có hóa đơn phát sinh");
			}
			await _dM_DoiTuongRepository.DeleteAsync(input.Id);
		}

		[AbpAuthorize(new string[] { "Pages.DM_DoiTuongs.Export" })]
		public async Task<FileDto> GetDM_DoiTuongsToExcel(GetAllDM_DoiTuongsForExcelInput input)
		{
			CustomOrganizationUnitDto currentUserOrg = await _commonLookupAppService.GetCurrentUserOrganization();
			bool withoutFilter = string.IsNullOrWhiteSpace(input.MaDoiTuongFilter) && string.IsNullOrWhiteSpace(input.TenDoiTuongFilter) && string.IsNullOrWhiteSpace(input.DienThoaiFilter) && string.IsNullOrWhiteSpace(input.SoCMTND_DKKDFilter);
			bool hasSearchFull = base.PermissionChecker.IsGranted("Pages.DM_DoiTuongs.SearchFull");
			bool hasLoadFull = base.PermissionChecker.IsGranted("Pages.DM_DoiTuongs.LoadFull");
			if (await _userRepository.FirstOrDefaultAsync((User x) => x.Id == AbpSession.GetUserId()) == null || currentUserOrg == null)
			{
				throw new UserFriendlyException("Thao tác không hợp lệ");
			}
			IQueryable<DM_DoiTuong> filteredDM_DoiTuongs = from x in _dM_DoiTuongRepository.GetAll()
														   where x.LaCaNhan == true
														   select x;
			if (!hasLoadFull && (!hasSearchFull || (hasSearchFull && withoutFilter)))
			{
				filteredDM_DoiTuongs = filteredDM_DoiTuongs.Where((DM_DoiTuong x) => currentUserOrg.Lineage.Contains(string.Concat("/" + ((object)x.ID_DonViQuanLy).ToString(), "/")));
			}
			filteredDM_DoiTuongs = filteredDM_DoiTuongs.WhereIf(!string.IsNullOrWhiteSpace(input.TenDoiTuongFilter), (DM_DoiTuong e) => e.TenDoiTuong.ToLower().Contains(input.TenDoiTuongFilter.ToLower().Trim())).WhereIf(!string.IsNullOrWhiteSpace(input.DienThoaiFilter), (DM_DoiTuong e) => e.DienThoai.ToLower().Contains(input.DienThoaiFilter.ToLower().Trim())).WhereIf(!string.IsNullOrWhiteSpace(input.SoCMTND_DKKDFilter), (DM_DoiTuong e) => e.SoCMTND_DKKD.ToLower().Contains(input.SoCMTND_DKKDFilter.ToLower().Trim()))
				.WhereIf(!string.IsNullOrWhiteSpace(input.TenKhacFilter), (DM_DoiTuong e) => e.TenKhac.ToLower().Contains(input.TenKhacFilter.ToLower().Trim()))
				.WhereIf(!string.IsNullOrWhiteSpace(input.MaDoiTuongFilter), (DM_DoiTuong e) => e.MaDoiTuong.ToLower() == input.MaDoiTuongFilter.ToLower().Trim());
			List<GetDM_DoiTuongForView> dM_DoiTuongListDtos = await (from o in filteredDM_DoiTuongs
																	 join o1 in _dM_NhomDoiTuongRepository.GetAll() on o.DM_NhomDoiTuongId equals o1.Id into j1
																	 from s1 in j1.DefaultIfEmpty()
																	 join o2 in _dM_TinhThanhRepository.GetAll() on o.DM_TinhThanhId equals o2.Id into j2
																	 from s2 in j2.DefaultIfEmpty()
																	 join o3 in _dM_QuanHuyenRepository.GetAll() on o.DM_QuanHuyenId equals o3.Id into j3
																	 from s3 in j3.DefaultIfEmpty()
																	 join o4 in _userRepository.GetAll() on o.ID_NhanVienPhuTrach equals o4.Id into j4
																	 from s4 in j4.DefaultIfEmpty()
																	 join o5 in _nguonKhachHangRepository.GetAll() on o.NguonKhachHangId equals o5.Id into j5
																	 from s5 in j5.DefaultIfEmpty()
																	 join o7 in _dM_TrangThaiRepository.GetAll() on o.DM_TrangThaiId equals o7.Id into j7
																	 from s7 in j7.DefaultIfEmpty()
																	 join o8 in _dM_DoiTuongRepository.GetAll() on o.ID_NguoiGioiThieu equals o8.Id into j8
																	 from s8 in j8.DefaultIfEmpty()
																	 join o9 in _organizationUnitRepository.GetAll() on o.ID_DonViQuanLy equals o9.Id into j9
																	 from s9 in j9.DefaultIfEmpty()
																	 join o10 in _userRepository.GetAll() on o.CreatorUserId equals o10.Id into j10
																	 from s10 in j10.DefaultIfEmpty()
																	 join o11 in _userRepository.GetAll() on o.LastModifierUserId equals o11.Id into j11
																	 from s11 in j11.DefaultIfEmpty()
																	 join o12 in _ngheNghiepRepository.GetAll() on o.NgheNghiepId equals o12.Id into j12
																	 from s12 in j12.DefaultIfEmpty()
																	 select new GetDM_DoiTuongForView
																	 {
																		 DM_DoiTuong = ObjectMapper.Map<DM_DoiTuongDto>(o),
																		 DM_NhomDoiTuongTenNhom = ((s1 == null) ? "" : s1.TenNhom.ToString()),
																		 DM_TinhThanhTenTinhThanh = ((s2 == null) ? "" : s2.TenTinhThanh.ToString()),
																		 DM_QuanHuyenTenQuanHuyen = ((s3 == null) ? "" : s3.TenQuanHuyen.ToString()),
																		 UserName = ((s4 == null) ? "" : s4.FullName.ToString()),
																		 NguonKhachHangTenNguonKhach = ((s5 == null) ? "" : s5.TenNguonKhach.ToString()),
																		 DM_TrangThaiTenTrangThai = ((s7 == null) ? "" : s7.TenTrangThai.ToString()),
																		 NguoiGioiThieu = ((s8 == null) ? "" : s8.TenDoiTuong.ToString()),
																		 DonViQuanLy = ((s9 == null) ? "" : s9.DisplayName.ToString()),
																		 TenNguoiTao = ((s10 == null) ? "" : s10.FullName.ToString()),
																		 TenNguoiSuaCuoi = ((s11 == null) ? "" : s11.FullName.ToString()),
																		 NgheNghiepDisplayName = ((s12 == null) ? "" : s12.DisplayName.ToString())
																	 }).WhereIf(!string.IsNullOrWhiteSpace(input.DM_NhomDoiTuongTenNhomFilter), (GetDM_DoiTuongForView e) => e.DM_NhomDoiTuongTenNhom.ToLower() == input.DM_NhomDoiTuongTenNhomFilter.ToLower().Trim()).WhereIf(!string.IsNullOrWhiteSpace(input.DM_TinhThanhTenTinhThanhFilter), (GetDM_DoiTuongForView e) => e.DM_TinhThanhTenTinhThanh.ToLower() == input.DM_TinhThanhTenTinhThanhFilter.ToLower().Trim()).WhereIf(!string.IsNullOrWhiteSpace(input.DM_QuanHuyenTenQuanHuyenFilter), (GetDM_DoiTuongForView e) => e.DM_QuanHuyenTenQuanHuyen.ToLower() == input.DM_QuanHuyenTenQuanHuyenFilter.ToLower().Trim())
				.WhereIf(!string.IsNullOrWhiteSpace(input.UserNameFilter), (GetDM_DoiTuongForView e) => e.UserName.ToLower() == input.UserNameFilter.ToLower().Trim())
				.WhereIf(!string.IsNullOrWhiteSpace(input.NguonKhachHangTenNguonKhachFilter), (GetDM_DoiTuongForView e) => e.NguonKhachHangTenNguonKhach.ToLower() == input.NguonKhachHangTenNguonKhachFilter.ToLower().Trim())
				.WhereIf(!string.IsNullOrWhiteSpace(input.DM_QuocGiaTenNuocFilter), (GetDM_DoiTuongForView e) => e.DM_QuocGiaTenNuoc.ToLower() == input.DM_QuocGiaTenNuocFilter.ToLower().Trim())
				.WhereIf(!string.IsNullOrWhiteSpace(input.DM_TrangThaiTenTrangThaiFilter), (GetDM_DoiTuongForView e) => e.DM_TrangThaiTenTrangThai.ToLower() == input.DM_TrangThaiTenTrangThaiFilter.ToLower().Trim())
				.ToListAsync();
			return _dM_DoiTuongsExcelExporter.ExportToFile(dM_DoiTuongListDtos);
		}

		[AbpAuthorize(new string[] { "Pages.DM_DoiTuongs" })]
		public async Task<PagedResultDto<DM_NhomDoiTuongLookupTableDto>> GetAllDM_NhomDoiTuongForLookupTable(GetAllForLookupTableInput input)
		{
			IQueryable<DM_NhomDoiTuong> query = _dM_NhomDoiTuongRepository.GetAll().WhereIf(!string.IsNullOrWhiteSpace(input.Filter), (DM_NhomDoiTuong e) => e.TenNhom.ToString().Contains(input.Filter));
			int totalCount = await query.CountAsync();
			List<DM_NhomDoiTuong> obj = await query.PageBy(input).ToListAsync();
			List<DM_NhomDoiTuongLookupTableDto> lookupTableDtoList = new List<DM_NhomDoiTuongLookupTableDto>();
			foreach (DM_NhomDoiTuong dM_NhomDoiTuong in obj)
			{
				lookupTableDtoList.Add(new DM_NhomDoiTuongLookupTableDto
				{
					Id = dM_NhomDoiTuong.Id.ToString(),
					DisplayName = dM_NhomDoiTuong.TenNhom.ToString()
				});
			}
			return new PagedResultDto<DM_NhomDoiTuongLookupTableDto>(totalCount, lookupTableDtoList);
		}

		[AbpAuthorize(new string[] { "Pages.DM_DoiTuongs" })]
		public async Task<PagedResultDto<DM_DoiTuongLookupTableDto>> GetAllDM_DoiTuongForSelfLookupTable(GetAllForSelfLookupInput<Guid?> input)
		{
			IQueryable<DM_DoiTuong> query = _dM_DoiTuongRepository.GetAll().WhereIf(input.CurrentId.HasValue && input.CurrentId.Value != Guid.Empty, (DM_DoiTuong x) => x.Id != input.CurrentId).WhereIf(!string.IsNullOrWhiteSpace(input.Filter), (DM_DoiTuong e) => e.TenNhom.ToString().Contains(input.Filter));
			int totalCount = await query.CountAsync();
			List<DM_DoiTuong> obj = await query.PageBy(input).ToListAsync();
			List<DM_DoiTuongLookupTableDto> lookupTableDtoList = new List<DM_DoiTuongLookupTableDto>();
			foreach (DM_DoiTuong dM_DoiTuong in obj)
			{
				lookupTableDtoList.Add(new DM_DoiTuongLookupTableDto
				{
					Id = dM_DoiTuong.Id.ToString(),
					DisplayName = dM_DoiTuong.TenDoiTuong.ToString()
				});
			}
			return new PagedResultDto<DM_DoiTuongLookupTableDto>(totalCount, lookupTableDtoList);
		}

		[AbpAuthorize(new string[] { "Pages.DM_DoiTuongs" })]
		public async Task<PagedResultDto<OrganizationUnitLookupTableDto>> GetAllOrganizationUnitForLookupTable(GetAllForLookupTableInput input)
		{
			IQueryable<CustomOrganizationUnit> query = _organizationUnitRepository.GetAll().WhereIf(!string.IsNullOrWhiteSpace(input.Filter), (CustomOrganizationUnit e) => e.DisplayName.ToString().Contains(input.Filter));
			int totalCount = await query.CountAsync();
			List<CustomOrganizationUnit> obj = await query.PageBy(input).ToListAsync();
			List<OrganizationUnitLookupTableDto> lookupTableDtoList = new List<OrganizationUnitLookupTableDto>();
			foreach (CustomOrganizationUnit organizationUnit in obj)
			{
				lookupTableDtoList.Add(new OrganizationUnitLookupTableDto
				{
					Id = organizationUnit.Id,
					DisplayName = organizationUnit.DisplayName.ToString()
				});
			}
			return new PagedResultDto<OrganizationUnitLookupTableDto>(totalCount, lookupTableDtoList);
		}

		[AbpAuthorize(new string[] { "Pages.DM_DoiTuongs" })]
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

		[AbpAuthorize(new string[] { "Pages.DM_DoiTuongs" })]
		public async Task<PagedResultDto<DM_QuanHuyenLookupTableDto>> GetAllDM_QuanHuyenForLookupTable(GetAllQuanHuyenForLookupTableInput input)
		{
			IQueryable<DM_QuanHuyen> query = _dM_QuanHuyenRepository.GetAll().WhereIf(input.ID_TinhThanh.HasValue, (DM_QuanHuyen x) => x.ID_TinhThanh == input.ID_TinhThanh.Value).WhereIf(!string.IsNullOrWhiteSpace(input.Filter), (DM_QuanHuyen e) => e.TenQuanHuyen.ToString().Contains(input.Filter));
			int totalCount = await query.CountAsync();
			List<DM_QuanHuyen> obj = await query.PageBy(input).ToListAsync();
			List<DM_QuanHuyenLookupTableDto> lookupTableDtoList = new List<DM_QuanHuyenLookupTableDto>();
			foreach (DM_QuanHuyen dM_QuanHuyen in obj)
			{
				lookupTableDtoList.Add(new DM_QuanHuyenLookupTableDto
				{
					Id = dM_QuanHuyen.Id.ToString(),
					DisplayName = dM_QuanHuyen.TenQuanHuyen.ToString()
				});
			}
			return new PagedResultDto<DM_QuanHuyenLookupTableDto>(totalCount, lookupTableDtoList);
		}

		[AbpAuthorize(new string[] { "Pages.DM_DoiTuongs" })]
		public async Task<PagedResultDto<UserLookupTableDto>> GetAllUserForLookupTable(GetAllForLookupTableInput input)
		{
			IQueryable<User> query = _userRepository.GetAll().WhereIf(!string.IsNullOrWhiteSpace(input.Filter), (User e) => e.Name.ToString().Contains(input.Filter));
			int totalCount = await query.CountAsync();
			List<User> obj = await query.PageBy(input).ToListAsync();
			List<UserLookupTableDto> lookupTableDtoList = new List<UserLookupTableDto>();
			foreach (User user in obj)
			{
				lookupTableDtoList.Add(new UserLookupTableDto
				{
					Id = user.Id,
					DisplayName = user.Name.ToString()
				});
			}
			return new PagedResultDto<UserLookupTableDto>(totalCount, lookupTableDtoList);
		}

		[AbpAuthorize(new string[] { "Pages.DM_DoiTuongs" })]
		public async Task<PagedResultDto<NguonKhachHangLookupTableDto>> GetAllNguonKhachHangForLookupTable(GetAllForLookupTableInput input)
		{
			IQueryable<NguonKhachHang> query = _nguonKhachHangRepository.GetAll().WhereIf(!string.IsNullOrWhiteSpace(input.Filter), (NguonKhachHang e) => e.TenNguonKhach.ToString().Contains(input.Filter));
			int totalCount = await query.CountAsync();
			List<NguonKhachHang> obj = await query.PageBy(input).ToListAsync();
			List<NguonKhachHangLookupTableDto> lookupTableDtoList = new List<NguonKhachHangLookupTableDto>();
			foreach (NguonKhachHang nguonKhachHang in obj)
			{
				lookupTableDtoList.Add(new NguonKhachHangLookupTableDto
				{
					Id = nguonKhachHang.Id.ToString(),
					DisplayName = nguonKhachHang.TenNguonKhach.ToString()
				});
			}
			return new PagedResultDto<NguonKhachHangLookupTableDto>(totalCount, lookupTableDtoList);
		}

		[AbpAuthorize(new string[] { "Pages.DM_DoiTuongs" })]
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

		[AbpAuthorize(new string[] { "Pages.DM_DoiTuongs" })]
		public async Task<PagedResultDto<DM_TrangThaiLookupTableDto>> GetAllDM_TrangThaiForLookupTable(GetAllForLookupTableInput input)
		{
			IQueryable<DM_TrangThai> query = _dM_TrangThaiRepository.GetAll().WhereIf(!string.IsNullOrWhiteSpace(input.Filter), (DM_TrangThai e) => e.TenTrangThai.ToString().Contains(input.Filter));
			int totalCount = await query.CountAsync();
			List<DM_TrangThai> obj = await query.PageBy(input).ToListAsync();
			List<DM_TrangThaiLookupTableDto> lookupTableDtoList = new List<DM_TrangThaiLookupTableDto>();
			foreach (DM_TrangThai dM_TrangThai in obj)
			{
				lookupTableDtoList.Add(new DM_TrangThaiLookupTableDto
				{
					Id = dM_TrangThai.Id,
					DisplayName = dM_TrangThai.TenTrangThai.ToString()
				});
			}
			return new PagedResultDto<DM_TrangThaiLookupTableDto>(totalCount, lookupTableDtoList);
		}

		public async Task UpdateDoiTuongImage(UpdateDoiTuongImageInput input)
		{
			string tempDoiTuongImagePath = Path.Combine(_appFolders.TempFileDownloadFolder, input.FileName);
			byte[] byteArray;
			using (FileStream fsTempProfilePicture = new FileStream(tempDoiTuongImagePath, FileMode.Open))
			{
				using Bitmap bmpImage = new Bitmap(fsTempProfilePicture);
				int width = ((input.Width == 0 || input.Width > bmpImage.Width) ? bmpImage.Width : input.Width);
				int height = ((input.Height == 0 || input.Height > bmpImage.Height) ? bmpImage.Height : input.Height);
				Bitmap bmCrop = bmpImage.Clone(new Rectangle(input.X, input.Y, width, height), bmpImage.PixelFormat);
				using MemoryStream stream = new MemoryStream();
				bmCrop.Save(stream, bmpImage.RawFormat);
				byteArray = stream.ToArray();
			}
			if (byteArray.Length > 1048576)
			{
				throw new UserFriendlyException(L("ResizedHangHoaImage_Warn_SizeLimit", 2014));
			}
			_ = input.DM_DoiTuongId;
			if (input.DM_DoiTuongId != Guid.Empty)
			{
				DM_DoiTuong editingDoiTuong = await _dM_DoiTuongRepository.GetAsync(input.DM_DoiTuongId);
				Guid imageId = Guid.Empty;
				if (string.IsNullOrEmpty(editingDoiTuong.Anh) && Guid.TryParse(editingDoiTuong.Anh, out imageId))
				{
					await _binaryObjectManager.DeleteAsync(imageId);
				}
				BinaryObject storedFile = new BinaryObject(base.AbpSession.TenantId, byteArray);
				await _binaryObjectManager.SaveAsync(storedFile);
				editingDoiTuong.Anh = storedFile.Id.ToString();
				FileHelper.DeleteIfExists(tempDoiTuongImagePath);
			}
		}

		[DisableAuditing]
		public async Task<GetImageOutput> GetDoiTuongImage(Guid doiTuongId)
		{
			DM_DoiTuong doiTuong = await _dM_DoiTuongRepository.GetAsync(doiTuongId);
			Guid imageId = Guid.Empty;
			if (string.IsNullOrEmpty(doiTuong.Anh) || !Guid.TryParse(doiTuong.Anh, out imageId))
			{
				return new GetImageOutput(string.Empty);
			}
			return await GetDoiTuongImageById(imageId);
		}

		public async Task<GetImageOutput> GetDoiTuongImageById(Guid doiTuongImageId)
		{
			return await GetDoiTuongImageByIdInternal(doiTuongImageId);
		}

		private async Task<byte[]> GetDoiTuongImageByIdOrNull(Guid doiTuongImageId)
		{
			BinaryObject file = await _binaryObjectManager.GetOrNullAsync(doiTuongImageId);
			if (file == null)
			{
				return null;
			}
			return file.Bytes;
		}

		private async Task<GetImageOutput> GetDoiTuongImageByIdInternal(Guid profilePictureId)
		{
			byte[] bytes = await GetDoiTuongImageByIdOrNull(profilePictureId);
			if (bytes == null)
			{
				return new GetImageOutput(string.Empty);
			}
			return new GetImageOutput(Convert.ToBase64String(bytes));
		}

		public async Task<string> GetMaKhachHang()
		{
			_ = string.Empty;
			EntityOrder currentOrder = await _entityOrderRepository.FirstOrDefaultAsync((EntityOrder x) => x.EntityCode == "KhachHangEntity");
			if (currentOrder == null)
			{
				currentOrder = new EntityOrder
				{
					EntityCode = "KhachHangEntity",
					OrderNumber = 1.0
				};
				await _entityOrderRepository.InsertAsync(currentOrder);
			}
			else
			{
				currentOrder.OrderNumber++;
			}
			return CodeGenerator.Genrerate((await (from x in _userOrganizationUnitRepository.GetAll()
												   where (long?)x.UserId == AbpSession.UserId
												   select x into uo
												   join o in _organizationUnitRepository.GetAll() on uo.OrganizationUnitId equals o.Id into j1
												   from s1 in j1.DefaultIfEmpty()
												   select s1).FirstAsync()).UnitCode, currentOrder.OrderNumber, ".");
		}

		public void HandleEvent(OrganizationUnitUpdateEvent eventData)
		{
			foreach (DM_DoiTuong all in _dM_DoiTuongRepository.GetAllList((DM_DoiTuong x) => x.ID_DonViQuanLy == (long?)eventData.OrganizationId))
			{
				all.CustomerManagementOrganizationCode = eventData.OrganizationCode;
				all.CustomerManagementOrganizationName = eventData.OrganizationName;
			}
		}
	}

}
