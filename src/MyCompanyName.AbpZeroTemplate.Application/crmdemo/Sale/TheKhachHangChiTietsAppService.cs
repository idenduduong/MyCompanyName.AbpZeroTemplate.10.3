// crmdemo.Sale.TheKhachHangChiTietsAppService
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Dependency;
using Abp.Domain.Repositories;
using Abp.Domain.Uow;
using Abp.Linq.Extensions;
using Abp.UI;
using MyCompanyName.AbpZeroTemplate.crmdemo;
using MyCompanyName.AbpZeroTemplate.crmdemo.Accounting;
using MyCompanyName.AbpZeroTemplate.crmdemo.Categories;
using MyCompanyName.AbpZeroTemplate.crmdemo.Categories.Dtos;
using MyCompanyName.AbpZeroTemplate.crmdemo.Common.Dtos;
using MyCompanyName.AbpZeroTemplate.crmdemo.Dto;
using MyCompanyName.AbpZeroTemplate.crmdemo.Sale;
using MyCompanyName.AbpZeroTemplate.crmdemo.Sale.Dtos;
//using MyCompanyName.AbpZeroTemplate.crmdemo.Sale.Exporting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyCompanyName.AbpZeroTemplate.crmdemo.Sale.TheKhachHangs;
using MyCompanyName.AbpZeroTemplate.crmdemo.Sale.Exporting;

namespace MyCompanyName.AbpZeroTemplate.crmdemo.Sale
{
	[AbpAuthorize(new string[] { "Pages.TheKhachHangs" })]
	public class TheKhachHangChiTietsAppService : AbpZeroTemplateAppServiceBase, ITheKhachHangChiTietsAppService, IApplicationService, ITransientDependency
	{
		private readonly IRepository<TheKhachHangChiTiet, Guid> _theKhachHangChiTietRepository;

		private readonly ITheKhachHangChiTietsExcelExporter _theKhachHangChiTietsExcelExporter;

		private readonly IRepository<TheKhachHang, Guid> _theKhachHangRepository;

		private readonly IRepository<DM_HangHoa, Guid> _dM_HangHoaRepository;

		private readonly IRepository<NhatKySuDungThe, Guid> _nhatKySuDungTheRepository;

		private readonly IRepository<PhieuThuChiTiet, Guid> _phieuThuChiTietRepository;

		private readonly IRepository<HoaDonBanLeChiTiet, Guid> _hoaDonBanLeChiTietRepository;

		public TheKhachHangChiTietsAppService(IRepository<TheKhachHangChiTiet, Guid> theKhachHangChiTietRepository, IRepository<HoaDonBanLeChiTiet, Guid> hoaDonBanLeChiTietRepository, IRepository<PhieuThuChiTiet, Guid> phieuThuChiTietRepository, IRepository<NhatKySuDungThe, Guid> nhatKySuDungTheRepository
			, ITheKhachHangChiTietsExcelExporter theKhachHangChiTietsExcelExporter
			, IRepository<TheKhachHang, Guid> theKhachHangRepository, IRepository<DM_HangHoa, Guid> dM_HangHoaRepository)
		{
			_theKhachHangChiTietRepository = theKhachHangChiTietRepository;
			_theKhachHangChiTietsExcelExporter = theKhachHangChiTietsExcelExporter;
			_theKhachHangRepository = theKhachHangRepository;
			_dM_HangHoaRepository = dM_HangHoaRepository;
			_nhatKySuDungTheRepository = nhatKySuDungTheRepository;
			_phieuThuChiTietRepository = phieuThuChiTietRepository;
			_hoaDonBanLeChiTietRepository = hoaDonBanLeChiTietRepository;
		}

		[HttpPost]
		public async Task<PagedResultDto<GetTheKhachHangChiTietForView>> GetAll(GetAllTheKhachHangChiTietsInput input)
		{
			if (!input.ID_TheKhachHang.HasValue)
			{
				input.ID_TheKhachHang = Guid.Empty;
			}
			IQueryable<TheKhachHangChiTiet> filteredTheKhachHangChiTiets = _theKhachHangChiTietRepository.GetAll().WhereIf(input.ID_TheKhachHang.HasValue, (TheKhachHangChiTiet e) => e.ID_TheKhachHang == input.ID_TheKhachHang.Value).WhereIf(!string.IsNullOrWhiteSpace(input.Filter), (TheKhachHangChiTiet e) => false || e.GhiChu.Contains(input.Filter))
				.WhereIf(input.MinSoLuongFilter.HasValue, (TheKhachHangChiTiet e) => (double?)(double)e.SoLuong >= input.MinSoLuongFilter)
				.WhereIf(input.MaxSoLuongFilter.HasValue, (TheKhachHangChiTiet e) => (double?)(double)e.SoLuong <= input.MaxSoLuongFilter)
				.WhereIf(!string.IsNullOrWhiteSpace(input.GhiChuFilter), (TheKhachHangChiTiet e) => e.GhiChu.ToLower() == input.GhiChuFilter.ToLower().Trim())
				.WhereIf(input.MinSoLuongTangFilter.HasValue, (TheKhachHangChiTiet e) => (double?)(double)e.SoLuongTang >= input.MinSoLuongTangFilter)
				.WhereIf(input.MaxSoLuongTangFilter.HasValue, (TheKhachHangChiTiet e) => (double?)(double)e.SoLuongTang <= input.MaxSoLuongTangFilter)
				.WhereIf(input.MinNgayTraLaiFilter.HasValue, (TheKhachHangChiTiet e) => e.NgayTraLai >= input.MinNgayTraLaiFilter)
				.WhereIf(input.MaxNgayTraLaiFilter.HasValue, (TheKhachHangChiTiet e) => e.NgayTraLai <= input.MaxNgayTraLaiFilter)
				.WhereIf(input.MinSoLuongTraLaiFilter.HasValue, (TheKhachHangChiTiet e) => (double?)(double)e.SoLuongTraLai >= input.MinSoLuongTraLaiFilter)
				.WhereIf(input.MaxSoLuongTraLaiFilter.HasValue, (TheKhachHangChiTiet e) => (double?)(double)e.SoLuongTraLai <= input.MaxSoLuongTraLaiFilter)
				.WhereIf(!string.IsNullOrWhiteSpace(input.ID_SanPhamChinhFilter.ToString()), (TheKhachHangChiTiet e) => ((object)e.ID_SanPhamChinh).ToString() == ((object)input.ID_SanPhamChinhFilter).ToString().Trim())
				.WhereIf(input.MinSoLuongDaSuDungFilter.HasValue, (TheKhachHangChiTiet e) => (double?)(double)e.SoLuongDaSuDung >= input.MinSoLuongDaSuDungFilter)
				.WhereIf(input.MaxSoLuongDaSuDungFilter.HasValue, (TheKhachHangChiTiet e) => (double?)(double)e.SoLuongDaSuDung <= input.MaxSoLuongDaSuDungFilter);
			IQueryable<GetTheKhachHangChiTietForView> query = (from o in filteredTheKhachHangChiTiets
															   join o1 in _theKhachHangRepository.GetAll() on o.ID_TheKhachHang equals o1.Id into j1
															   from s1 in j1.DefaultIfEmpty()
															   join o2 in _dM_HangHoaRepository.GetAll() on o.ID_HangHoa equals o2.Id into j2
															   from s2 in j2.DefaultIfEmpty()
															   join o3 in _nhatKySuDungTheRepository.GetAll().WhereIf(input.ID_TheKhachHang.HasValue, (NhatKySuDungThe e) => e.ID_TheKhachHang == input.ID_TheKhachHang) on o.ID_HangHoa equals o3.ID_HangHoaDichVu into j3
															   from s3 in j3.DefaultIfEmpty()
															   group new { o, s3 } by new { o, s1, s2 } into g
															   select new GetTheKhachHangChiTietForView
															   {
																   TheKhachHangChiTiet = ObjectMapper.Map<TheKhachHangChiTietDto>(g.Key.o),
																   TheKhachHangMaThe = ((g.Key.s1 == null) ? "" : g.Key.s1.MaThe.ToString()),
																   DM_HangHoaTenHangHoa = ((g.Key.s2 == null) ? "" : g.Key.s2.TenHangHoa.ToString()),
																   TongSoLuongDaSuDung = (double)g.Sum(x => (x.s3 == null) ? 0 : x.s3.SoLuong),
																   SoLuongHangTangDaSuDung = (double)g.Sum(x => (x.s3 == null || (!x.s3.LaSoLuongDuocTang && !g.Key.o.LaTangKem)) ? 0 : x.s3.SoLuong)
															   }).WhereIf(!string.IsNullOrWhiteSpace(input.TheKhachHangMaTheFilter), (GetTheKhachHangChiTietForView e) => e.TheKhachHangMaThe.ToLower() == input.TheKhachHangMaTheFilter.ToLower().Trim()).WhereIf(!string.IsNullOrWhiteSpace(input.DM_HangHoaTenHangHoaFilter), (GetTheKhachHangChiTietForView e) => e.DM_HangHoaTenHangHoa.ToLower() == input.DM_HangHoaTenHangHoaFilter.ToLower().Trim());
			return new PagedResultDto<GetTheKhachHangChiTietForView>(await query.CountAsync(), await query.OrderBy(input.Sorting ?? "theKhachHangChiTiet.id asc").PageBy(input).ToListAsync());
		}

		[AbpAuthorize(new string[] { "Pages.TheKhachHangs.Create", "Pages.TheKhachHangs.Edit" })]
		public async Task<GetTheKhachHangChiTietForEditOutput> GetTheKhachHangChiTietForEdit(EntityDto<Guid> input)
		{
			TheKhachHangChiTiet theKhachHangChiTiet = await _theKhachHangChiTietRepository.FirstOrDefaultAsync(input.Id);
			GetTheKhachHangChiTietForEditOutput output = new GetTheKhachHangChiTietForEditOutput
			{
				TheKhachHangChiTiet = base.ObjectMapper.Map<CreateOrEditTheKhachHangChiTietDto>(theKhachHangChiTiet)
			};
			if (output.TheKhachHangChiTiet.ID_TheKhachHang.HasValue)
			{
				TheKhachHang theKhachHang = await _theKhachHangRepository.FirstOrDefaultAsync(output.TheKhachHangChiTiet.ID_TheKhachHang.Value);
				output.TheKhachHangMaThe = theKhachHang.MaThe.ToString();
			}
			if (output.TheKhachHangChiTiet.ID_HangHoa.HasValue)
			{
				DM_HangHoa dM_HangHoa = await _dM_HangHoaRepository.FirstOrDefaultAsync(output.TheKhachHangChiTiet.ID_HangHoa.Value);
				output.DM_HangHoaTenHangHoa = dM_HangHoa.TenHangHoa.ToString();
				output.SoPhutThucHien = dM_HangHoa.SoPhutThucHien;
			}
			List<NhatKySuDungThe> nhatKySuDungs = await (from e in _nhatKySuDungTheRepository.GetAll()
														 where e.ID_TheKhachHangChiTiet == output.TheKhachHangChiTiet.Id
														 select e).ToListAsync();
			output.TongSoLuongDaSuDung = nhatKySuDungs.Sum((NhatKySuDungThe x) => x.SoLuong);
			output.SoLuongHangTangDaSuDung = nhatKySuDungs.Sum((NhatKySuDungThe x) => x.LaSoLuongDuocTang ? x.SoLuong : 0);
			return output;
		}

		[AbpAuthorize(new string[] { "Pages.TheKhachHangs.Create", "Pages.TheKhachHangs.Edit" })]
		public async Task<GetTheKhachHangChiTietForEditOutput> GetTheKhachHangChiTietByTheKhachHangId(EntityDto<Guid> input)
		{
			TheKhachHangChiTiet theKhachHangChiTiet = await _theKhachHangChiTietRepository.FirstOrDefaultAsync((TheKhachHangChiTiet x) => x.ID_TheKhachHang == input.Id);
			GetTheKhachHangChiTietForEditOutput output = new GetTheKhachHangChiTietForEditOutput
			{
				TheKhachHangChiTiet = base.ObjectMapper.Map<CreateOrEditTheKhachHangChiTietDto>(theKhachHangChiTiet)
			};
			if (output.TheKhachHangChiTiet.ID_TheKhachHang.HasValue)
			{
				TheKhachHang theKhachHang = await _theKhachHangRepository.FirstOrDefaultAsync(output.TheKhachHangChiTiet.ID_TheKhachHang.Value);
				output.TheKhachHangMaThe = theKhachHang.MaThe.ToString();
			}
			if (output.TheKhachHangChiTiet.ID_HangHoa.HasValue)
			{
				DM_HangHoa dM_HangHoa = await _dM_HangHoaRepository.FirstOrDefaultAsync(output.TheKhachHangChiTiet.ID_HangHoa.Value);
				output.DM_HangHoaTenHangHoa = dM_HangHoa.TenHangHoa.ToString();
				output.SoPhutThucHien = dM_HangHoa.SoPhutThucHien;
			}
			List<NhatKySuDungThe> nhatKySuDungs = await (from e in _nhatKySuDungTheRepository.GetAll()
														 where e.ID_TheKhachHang == output.TheKhachHangChiTiet.ID_TheKhachHang && e.ID_HangHoaDichVu == output.TheKhachHangChiTiet.ID_HangHoa
														 select e).ToListAsync();
			output.TongSoLuongDaSuDung = nhatKySuDungs.Sum((NhatKySuDungThe x) => x.SoLuong);
			output.SoLuongHangTangDaSuDung = nhatKySuDungs.Sum((NhatKySuDungThe x) => x.LaSoLuongDuocTang ? x.SoLuong : 0);
			return output;
		}

		public async Task CreateOrEdit(CreateOrEditTheKhachHangChiTietDto input)
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

		[AbpAuthorize(new string[] { "Pages.TheKhachHangs.Create", "Pages.TheKhachHangs.Edit" })]
		private async Task Create(CreateOrEditTheKhachHangChiTietDto input)
		{
			TheKhachHangChiTiet theKhachHangChiTiet = base.ObjectMapper.Map<TheKhachHangChiTiet>(input);
			DM_HangHoa service = await _dM_HangHoaRepository.FirstOrDefaultAsync(input.ID_HangHoa.Value);
			if (service == null)
			{
				theKhachHangChiTiet.ServiceGroup = string.Empty;
				theKhachHangChiTiet.ServiceName = string.Empty;
			}
			else
			{
				theKhachHangChiTiet.ServiceName = service.TenHangHoa;
				theKhachHangChiTiet.ServiceGroup = service.ServiceGroup;
			}
			await _theKhachHangChiTietRepository.InsertAsync(theKhachHangChiTiet);
		}

		[AbpAuthorize(new string[] { "Pages.TheKhachHangs.Create", "Pages.TheKhachHangs.Edit" })]
		[UnitOfWork]
		private async Task Update(CreateOrEditTheKhachHangChiTietDto input)
		{
			TheKhachHangChiTiet theKhachHangChiTiet = await _theKhachHangChiTietRepository.FirstOrDefaultAsync(input.Id.Value);
			base.ObjectMapper.Map(input, theKhachHangChiTiet);
			TheKhachHang theKhachHang = await _theKhachHangRepository.FirstOrDefaultAsync((TheKhachHang x) => x.Id == theKhachHangChiTiet.ID_TheKhachHang);
			_ = theKhachHangChiTiet.TienDaSuDung;
			List<NhatKySuDungThe> nhatKys = await (from x in _nhatKySuDungTheRepository.GetAll()
												   where x.ID_TheKhachHangChiTiet == theKhachHangChiTiet.Id
												   select x).ToListAsync();
			foreach (NhatKySuDungThe item in nhatKys)
			{
				if (item.LaSoLuongDuocTang && !theKhachHangChiTiet.LaTangKem && theKhachHangChiTiet.SoLuongTang == 0 && theKhachHangChiTiet.SoLuong > 0)
				{
					item.LaSoLuongDuocTang = false;
					item.SoTien = theKhachHangChiTiet.ThanhToan / (decimal)theKhachHangChiTiet.SoLuong * (decimal)item.SoLuong;
				}
				else if (item.LaSoLuongDuocTang || (theKhachHangChiTiet.SoLuong == 0 && theKhachHangChiTiet.SoLuongTang > 0))
				{
					item.SoTien = 0m;
				}
				else
				{
					item.SoTien = theKhachHangChiTiet.ThanhToan / (decimal)theKhachHangChiTiet.SoLuong * (decimal)item.SoLuong;
				}
				await _nhatKySuDungTheRepository.UpdateAsync(item);
			}
			theKhachHangChiTiet.SoLuongDaSuDung = nhatKys.Sum((NhatKySuDungThe x) => x.SoLuong);
			theKhachHangChiTiet.TienDaSuDung = nhatKys.Sum((NhatKySuDungThe x) => x.SoTien);
			theKhachHang.SoDu = theKhachHang.DaThanhToan - nhatKys.Sum((NhatKySuDungThe x) => x.SoTien) + theKhachHang.ReleaseBalance + theKhachHang.AdjustedAmount;
			if (theKhachHangChiTiet.TraLaiHHDV)
			{
				theKhachHangChiTiet.SoLuongTraLai = theKhachHangChiTiet.SoLuong + theKhachHangChiTiet.SoLuongTang - theKhachHangChiTiet.SoLuongDaSuDung;
				if (!theKhachHangChiTiet.NgayTraLai.HasValue)
				{
					theKhachHangChiTiet.NgayTraLai = DateTime.Now;
				}
				_ = theKhachHangChiTiet.DonGia * (decimal)theKhachHangChiTiet.SoLuongDaSuDung * (100m - theKhachHangChiTiet.PTChietKhau) / 100m;
			}
			List<TheKhachHangChiTiet> theChiTiets = await (from x in _theKhachHangChiTietRepository.GetAll()
														   where x.ID_TheKhachHang == theKhachHang.Id
														   select x).ToListAsync();
			theKhachHang.PhaiThanhToan = theChiTiets.Sum((TheKhachHangChiTiet x) => (!x.TraLaiHHDV) ? x.ThanhToan : x.TienDaSuDung);
			if (theKhachHang != null)
			{
				await _theKhachHangRepository.UpdateAsync(theKhachHang);
			}
			DM_HangHoa service = await _dM_HangHoaRepository.FirstOrDefaultAsync(input.ID_HangHoa.Value);
			if (service == null)
			{
				theKhachHangChiTiet.ServiceGroup = string.Empty;
				theKhachHangChiTiet.ServiceName = string.Empty;
			}
			else
			{
				theKhachHangChiTiet.ServiceName = service.TenHangHoa;
				theKhachHangChiTiet.ServiceGroup = service.ServiceGroup;
			}
			await _theKhachHangChiTietRepository.UpdateAsync(theKhachHangChiTiet);
		}

		[AbpAuthorize(new string[] { "Pages.TheKhachHangs.Create", "Pages.TheKhachHangs.Edit" })]
		public async Task Delete(EntityDto<Guid> input)
		{
			TheKhachHangChiTiet theKhachHangChiTiet = await _theKhachHangChiTietRepository.FirstOrDefaultAsync(input.Id);
			if (theKhachHangChiTiet == null)
			{
				throw new UserFriendlyException("Dịch vụ không tồn tại");
			}
			TheKhachHang theKhachHang = await _theKhachHangRepository.FirstOrDefaultAsync(theKhachHangChiTiet.ID_TheKhachHang.Value);
			if (theKhachHang == null)
			{
				await _theKhachHangChiTietRepository.DeleteAsync(input.Id);
				return;
			}
			if (await _nhatKySuDungTheRepository.CountAsync((NhatKySuDungThe x) => x.ID_TheKhachHangChiTiet == theKhachHangChiTiet.Id) > 0)
			{
				throw new UserFriendlyException("Dịch vụ đã được sử dụng. Không thể xóa");
			}
			theKhachHang.MenhGiaThe -= (decimal)theKhachHangChiTiet.SoLuong * theKhachHangChiTiet.DonGia;
			theKhachHang.PhaiThanhToan -= theKhachHangChiTiet.ThanhToan;
			await _theKhachHangRepository.UpdateAsync(theKhachHang);
			await _theKhachHangChiTietRepository.DeleteAsync(input.Id);
		}

		public async Task<FileDto> GetTheKhachHangChiTietsToExcel(GetAllTheKhachHangChiTietsForExcelInput input)
		{
			List<GetTheKhachHangChiTietForView> theKhachHangChiTietListDtos = await (from o in _theKhachHangChiTietRepository.GetAll().WhereIf(!string.IsNullOrWhiteSpace(input.Filter), (TheKhachHangChiTiet e) => false || e.GhiChu.Contains(input.Filter)).WhereIf(input.MinSoLuongFilter.HasValue, (TheKhachHangChiTiet e) => (double?)(double)e.SoLuong >= input.MinSoLuongFilter)
					.WhereIf(input.MaxSoLuongFilter.HasValue, (TheKhachHangChiTiet e) => (double?)(double)e.SoLuong <= input.MaxSoLuongFilter)
					.WhereIf(!string.IsNullOrWhiteSpace(input.GhiChuFilter), (TheKhachHangChiTiet e) => e.GhiChu.ToLower() == input.GhiChuFilter.ToLower().Trim())
					.WhereIf(input.MinSoLuongTangFilter.HasValue, (TheKhachHangChiTiet e) => (double?)(double)e.SoLuongTang >= input.MinSoLuongTangFilter)
					.WhereIf(input.MaxSoLuongTangFilter.HasValue, (TheKhachHangChiTiet e) => (double?)(double)e.SoLuongTang <= input.MaxSoLuongTangFilter)
					.WhereIf(input.MinNgayTraLaiFilter.HasValue, (TheKhachHangChiTiet e) => e.NgayTraLai >= input.MinNgayTraLaiFilter)
					.WhereIf(input.MaxNgayTraLaiFilter.HasValue, (TheKhachHangChiTiet e) => e.NgayTraLai <= input.MaxNgayTraLaiFilter)
					.WhereIf(input.MinSoLuongTraLaiFilter.HasValue, (TheKhachHangChiTiet e) => (double?)(double)e.SoLuongTraLai >= input.MinSoLuongTraLaiFilter)
					.WhereIf(input.MaxSoLuongTraLaiFilter.HasValue, (TheKhachHangChiTiet e) => (double?)(double)e.SoLuongTraLai <= input.MaxSoLuongTraLaiFilter)
					.WhereIf(input.TraLaiHHDVFilter > -1, (TheKhachHangChiTiet e) => Convert.ToInt32(e.TraLaiHHDV) == input.TraLaiHHDVFilter)
					.WhereIf(!string.IsNullOrWhiteSpace(input.ID_SanPhamChinhFilter.ToString()), (TheKhachHangChiTiet e) => ((object)e.ID_SanPhamChinh).ToString() == ((object)input.ID_SanPhamChinhFilter).ToString().Trim())
					.WhereIf(input.LaTangKemFilter > -1, (TheKhachHangChiTiet e) => Convert.ToInt32(e.LaTangKem) == input.LaTangKemFilter)
					.WhereIf(input.MinSoLuongDaSuDungFilter.HasValue, (TheKhachHangChiTiet e) => (double?)(double)e.SoLuongDaSuDung >= input.MinSoLuongDaSuDungFilter)
					.WhereIf(input.MaxSoLuongDaSuDungFilter.HasValue, (TheKhachHangChiTiet e) => (double?)(double)e.SoLuongDaSuDung <= input.MaxSoLuongDaSuDungFilter)
																					 join o1 in _theKhachHangRepository.GetAll() on o.ID_TheKhachHang equals o1.Id into j1
																					 from s1 in j1.DefaultIfEmpty()
																					 join o2 in _dM_HangHoaRepository.GetAll() on o.ID_HangHoa equals o2.Id into j2
																					 from s2 in j2.DefaultIfEmpty()
																					 select new GetTheKhachHangChiTietForView
																					 {
																						 TheKhachHangChiTiet = ObjectMapper.Map<TheKhachHangChiTietDto>(o),
																						 TheKhachHangMaThe = ((s1 == null) ? "" : s1.MaThe.ToString()),
																						 DM_HangHoaTenHangHoa = ((s2 == null) ? "" : s2.TenHangHoa.ToString())
																					 }).WhereIf(!string.IsNullOrWhiteSpace(input.TheKhachHangMaTheFilter), (GetTheKhachHangChiTietForView e) => e.TheKhachHangMaThe.ToLower() == input.TheKhachHangMaTheFilter.ToLower().Trim()).WhereIf(!string.IsNullOrWhiteSpace(input.DM_HangHoaTenHangHoaFilter), (GetTheKhachHangChiTietForView e) => e.DM_HangHoaTenHangHoa.ToLower() == input.DM_HangHoaTenHangHoaFilter.ToLower().Trim()).ToListAsync();
			return _theKhachHangChiTietsExcelExporter.ExportToFile(theKhachHangChiTietListDtos);
		}

		[AbpAuthorize(new string[] { "Pages.TheKhachHangs.Create", "Pages.TheKhachHangs.Edit" })]
		public async Task<PagedResultDto<TheKhachHangLookupTableDto>> GetAllTheKhachHangForLookupTable(GetAllForLookupTableInput input)
		{
			IQueryable<TheKhachHang> query = _theKhachHangRepository.GetAll().WhereIf(!string.IsNullOrWhiteSpace(input.Filter), (TheKhachHang e) => e.MaThe.ToString().Contains(input.Filter));
			int totalCount = await query.CountAsync();
			List<TheKhachHang> obj = await query.PageBy(input).ToListAsync();
			List<TheKhachHangLookupTableDto> lookupTableDtoList = new List<TheKhachHangLookupTableDto>();
			foreach (TheKhachHang theKhachHang in obj)
			{
				lookupTableDtoList.Add(new TheKhachHangLookupTableDto
				{
					Id = theKhachHang.Id.ToString(),
					MaThe = theKhachHang.MaThe.ToString()
				});
			}
			return new PagedResultDto<TheKhachHangLookupTableDto>(totalCount, lookupTableDtoList);
		}

		[AbpAuthorize(new string[] { "Pages.TheKhachHangs.Create", "Pages.TheKhachHangs.Edit" })]
		public async Task<PagedResultDto<DM_HangHoaLookupTableDto>> GetAllDM_HangHoaForLookupTable(GetAllForLookupTableInput input)
		{
			IQueryable<DM_HangHoa> query = (from x in _dM_HangHoaRepository.GetAll()
											where x.IsActive
											select x).WhereIf(!string.IsNullOrWhiteSpace(input.Filter), (DM_HangHoa e) => e.TenHangHoa.ToString().Contains(input.Filter));
			int totalCount = await query.CountAsync();
			List<DM_HangHoa> obj = await query.PageBy(input).ToListAsync();
			List<DM_HangHoaLookupTableDto> lookupTableDtoList = new List<DM_HangHoaLookupTableDto>();
			foreach (DM_HangHoa dM_HangHoa in obj)
			{
				lookupTableDtoList.Add(new DM_HangHoaLookupTableDto
				{
					Id = dM_HangHoa.Id.ToString(),
					DisplayName = dM_HangHoa.TenHangHoa.ToString()
				});
			}
			return new PagedResultDto<DM_HangHoaLookupTableDto>(totalCount, lookupTableDtoList);
		}
	}
}
