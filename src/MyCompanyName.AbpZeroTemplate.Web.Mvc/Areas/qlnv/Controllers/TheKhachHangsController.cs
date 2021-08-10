using Abp.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyCompanyName.AbpZeroTemplate.crmdemo.Sale;
using MyCompanyName.AbpZeroTemplate.Web.Controllers;

using System;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using MyCompanyName.AbpZeroTemplate.crmdemo.Authorization.Users.Dto;
using MyCompanyName.AbpZeroTemplate.crmdemo.Common;
using MyCompanyName.AbpZeroTemplate.crmdemo.Organizations.Dto;
using MyCompanyName.AbpZeroTemplate.crmdemo.Sale.Dtos;
using MyCompanyName.AbpZeroTemplate.Web.Areas.qlnv.Models.TheKhachHangs;

//using MyCompanyName.AbpZeroTemplate.crmdemo.Web.Areas.crm.Models.TheKhachHangs;
//using MyCompanyName.AbpZeroTemplate.crmdemo.Web.Controllers;

namespace MyCompanyName.AbpZeroTemplate.Web.Areas.qlnv.Controllers
{
	[Area("qlnv")]
	//[AbpMvcAuthorize(new string[] { "Pages.TheKhachHangs" })]
	public class TheKhachHangsController : AbpZeroTemplateControllerBase
	{
		private readonly ITheKhachHangsAppService _theKhachHangsAppService;

		//private readonly ICrmDemoCommonLookupAppService _commonAppService;

		public TheKhachHangsController(ITheKhachHangsAppService theKhachHangsAppService
			//, ICrmDemoCommonLookupAppService commonAppService
			)
		{
			_theKhachHangsAppService = theKhachHangsAppService;
			//_commonAppService = commonAppService;
		}

		public ActionResult Index()
		{
			TheKhachHangsViewModel model = new TheKhachHangsViewModel
			{
				FilterText = ""
			};
			return View(model);
		}

		//[AbpMvcAuthorize(new string[] { "Pages.TheKhachHangs.Create", "Pages.TheKhachHangs.Edit" })]
		//public async Task<PartialViewResult> CreateOrEditTheLanModal(Guid? id, Guid? idKhachHang, string tenKhachHang)
		//{
		//	GetTheKhachHangForEditOutput getTheKhachHangForEditOutput;
		//	if (id.HasValue)
		//	{
		//		getTheKhachHangForEditOutput = await _theKhachHangsAppService.GetTheKhachHangForEdit(new EntityDto<Guid>
		//		{
		//			Id = id.Value
		//		});
		//	}
		//	else
		//	{
		//		getTheKhachHangForEditOutput = new GetTheKhachHangForEditOutput
		//		{
		//			TheKhachHang = new CreateOrEditTheKhachHangDto(),
		//			TempId = Guid.NewGuid()
		//		};
		//		getTheKhachHangForEditOutput.TheKhachHang.MaThe = string.Empty;
		//		getTheKhachHangForEditOutput.TheKhachHang.Status = true;
		//		getTheKhachHangForEditOutput.TheKhachHang.TheGiaTri_SoLan_GiamGia = 2;
		//		CustomOrganizationUnitDto currentOrg = await _commonAppService.GetCurrentUserOrganization();
		//		UserEditDto currentUser = await _commonAppService.GetCurrentUser();
		//		getTheKhachHangForEditOutput.TheKhachHang.ID_DonVi = currentOrg.Id;
		//		getTheKhachHangForEditOutput.TheKhachHang.ID_DonViThuHuong = currentOrg.Id;
		//		getTheKhachHangForEditOutput.TheKhachHang.ID_DonViThucHien = currentOrg.Id;
		//		getTheKhachHangForEditOutput.OrganizationUnitDisplayName = currentOrg.DisplayName;
		//		getTheKhachHangForEditOutput.DonViThuHuongTenDonVi = currentOrg.DisplayName;
		//		getTheKhachHangForEditOutput.DonViThucHienTenDonVi = currentOrg.DisplayName;
		//		getTheKhachHangForEditOutput.TheKhachHang.ID_NhanVienLap = base.AbpSession.UserId;
		//		getTheKhachHangForEditOutput.UserName = currentUser.Surname + " " + currentUser.Name;
		//		getTheKhachHangForEditOutput.TheKhachHang.NgayMua = DateTime.Now;
		//		getTheKhachHangForEditOutput.TheKhachHang.NgayApDung = DateTime.Now;
		//		getTheKhachHangForEditOutput.TheKhachHang.NgayHetHan = DateTime.Now.AddYears(5);
		//	}
		//	CreateOrEditTheKhachHangModalViewModel viewModel = new CreateOrEditTheKhachHangModalViewModel
		//	{
		//		TheKhachHang = getTheKhachHangForEditOutput.TheKhachHang,
		//		DM_NhomTheTenNhomThe = getTheKhachHangForEditOutput.DM_NhomTheTenNhomThe,
		//		DM_DoiTuongTenDoiTuong = getTheKhachHangForEditOutput.DM_DoiTuongTenDoiTuong,
		//		DM_DoiTuongCMT = getTheKhachHangForEditOutput.DM_DoiTuongCMT,
		//		DM_DoiTuongDiaChi = getTheKhachHangForEditOutput.DM_DoiTuongDiaChi,
		//		DM_DoiTuongNgaySinh = (getTheKhachHangForEditOutput.DM_DoiTuongNgaySinh.HasValue ? getTheKhachHangForEditOutput.DM_DoiTuongNgaySinh.Value.ToString("dd/MM/yyyy") : ""),
		//		DM_DoiTuongPhone = getTheKhachHangForEditOutput.DM_DoiTuongPhone,
		//		DM_DoiTuongNhomDoiTuong = getTheKhachHangForEditOutput.DM_DoiTuongNhomDoiTuong,
		//		UserName = getTheKhachHangForEditOutput.UserName,
		//		OrganizationUnitDisplayName = getTheKhachHangForEditOutput.OrganizationUnitDisplayName,
		//		DonViThuHuongDisplayName = getTheKhachHangForEditOutput.DonViThuHuongTenDonVi,
		//		DonViThucHienDisplayName = getTheKhachHangForEditOutput.DonViThucHienTenDonVi,
		//		DM_DacDiemKhachHangTenDacDiem = getTheKhachHangForEditOutput.DM_DacDiemKhachHangTenDacDiem,
		//		DM_KhuyenMaiTenKhuyenMai = getTheKhachHangForEditOutput.DM_KhuyenMaiTenKhuyenMai,
		//		TenKhachHang = tenKhachHang,
		//		IdKhachHang = idKhachHang,
		//		TempId = getTheKhachHangForEditOutput.TempId,
		//		TheCuMaThe = getTheKhachHangForEditOutput.TheCuMaThe,
		//		MaVoucher = getTheKhachHangForEditOutput.MaVoucher,
		//		VoucherValue = getTheKhachHangForEditOutput.VoucherValue
		//	};
		//	return PartialView("_CreateOrEditTheLanModal", viewModel);
		//}

		//[AbpMvcAuthorize(new string[] { "Pages.TheKhachHangs.Create", "Pages.TheKhachHangs.Edit" })]
		//public async Task<PartialViewResult> CreateOrEditTheGiaTriModal(Guid? id, Guid? idKhachHang, string tenKhachHang)
		//{
		//	GetTheKhachHangForEditOutput getTheKhachHangForEditOutput;
		//	if (id.HasValue)
		//	{
		//		getTheKhachHangForEditOutput = await _theKhachHangsAppService.GetTheKhachHangForEdit(new EntityDto<Guid>
		//		{
		//			Id = id.Value
		//		});
		//	}
		//	else
		//	{
		//		getTheKhachHangForEditOutput = new GetTheKhachHangForEditOutput
		//		{
		//			TheKhachHang = new CreateOrEditTheKhachHangDto()
		//		};
		//		getTheKhachHangForEditOutput.TheKhachHang.TempId = Guid.NewGuid();
		//		getTheKhachHangForEditOutput.TheKhachHang.Status = true;
		//		getTheKhachHangForEditOutput.TheKhachHang.TheGiaTri_SoLan_GiamGia = 1;
		//		CustomOrganizationUnitDto currentOrg = await _commonAppService.GetCurrentUserOrganization();
		//		UserEditDto currentUser = await _commonAppService.GetCurrentUser();
		//		getTheKhachHangForEditOutput.TheKhachHang.ID_DonVi = currentOrg.Id;
		//		getTheKhachHangForEditOutput.TheKhachHang.ID_DonViThuHuong = currentOrg.Id;
		//		getTheKhachHangForEditOutput.TheKhachHang.ID_DonViThucHien = currentOrg.Id;
		//		getTheKhachHangForEditOutput.OrganizationUnitDisplayName = currentOrg.DisplayName;
		//		getTheKhachHangForEditOutput.DonViThuHuongTenDonVi = currentOrg.DisplayName;
		//		getTheKhachHangForEditOutput.DonViThucHienTenDonVi = currentOrg.DisplayName;
		//		getTheKhachHangForEditOutput.TheKhachHang.ID_NhanVienLap = currentUser.Id;
		//		getTheKhachHangForEditOutput.UserName = currentUser.Surname + " " + currentUser.Name;
		//		getTheKhachHangForEditOutput.TheKhachHang.NgayMua = DateTime.Now;
		//		getTheKhachHangForEditOutput.TheKhachHang.NgayApDung = DateTime.Now;
		//		getTheKhachHangForEditOutput.TheKhachHang.NgayHetHan = DateTime.Now.AddYears(5);
		//	}
		//	CreateOrEditTheKhachHangModalViewModel viewModel = new CreateOrEditTheKhachHangModalViewModel
		//	{
		//		TheKhachHang = getTheKhachHangForEditOutput.TheKhachHang,
		//		DM_NhomTheTenNhomThe = getTheKhachHangForEditOutput.DM_NhomTheTenNhomThe,
		//		DM_DoiTuongTenDoiTuong = getTheKhachHangForEditOutput.DM_DoiTuongTenDoiTuong,
		//		DM_DoiTuongCMT = getTheKhachHangForEditOutput.DM_DoiTuongCMT,
		//		DM_DoiTuongDiaChi = getTheKhachHangForEditOutput.DM_DoiTuongDiaChi,
		//		DM_DoiTuongNgaySinh = (getTheKhachHangForEditOutput.DM_DoiTuongNgaySinh.HasValue ? getTheKhachHangForEditOutput.DM_DoiTuongNgaySinh.Value.ToString("dd/MM/yyyy") : ""),
		//		DM_DoiTuongPhone = getTheKhachHangForEditOutput.DM_DoiTuongPhone,
		//		DM_DoiTuongNhomDoiTuong = getTheKhachHangForEditOutput.DM_DoiTuongNhomDoiTuong,
		//		DM_TienTeTenNgoaiTe = getTheKhachHangForEditOutput.DM_TienTeTenNgoaiTe,
		//		UserName = getTheKhachHangForEditOutput.UserName,
		//		OrganizationUnitDisplayName = getTheKhachHangForEditOutput.OrganizationUnitDisplayName,
		//		DonViThucHienDisplayName = getTheKhachHangForEditOutput.DonViThucHienTenDonVi,
		//		DonViThuHuongDisplayName = getTheKhachHangForEditOutput.DonViThuHuongTenDonVi,
		//		DM_DacDiemKhachHangTenDacDiem = getTheKhachHangForEditOutput.DM_DacDiemKhachHangTenDacDiem,
		//		TenKhachHang = tenKhachHang,
		//		IdKhachHang = idKhachHang,
		//		MaVoucher = getTheKhachHangForEditOutput.MaVoucher,
		//		VoucherValue = getTheKhachHangForEditOutput.VoucherValue,
		//		DM_KhuyenMaiTenKhuyenMai = getTheKhachHangForEditOutput.DM_KhuyenMaiTenKhuyenMai
		//	};
		//	return PartialView("_CreateOrEditTheGiaTriModal", viewModel);
		//}

		//public PartialViewResult ViewTheKhachHangModal(GetTheKhachHangForView data)
		//{
		//	TheKhachHangViewModel model = new TheKhachHangViewModel
		//	{
		//		TheKhachHang = data.TheKhachHang,
		//		DM_NhomTheTenNhomThe = data.DM_NhomTheTenNhomThe,
		//		DM_DoiTuongTenDoiTuong = data.DM_DoiTuongTenDoiTuong,
		//		DM_TienTeTenNgoaiTe = data.DM_TienTeTenNgoaiTe,
		//		UserName = data.UserName,
		//		OrganizationUnitDisplayName = data.OrganizationUnitDisplayName,
		//		DM_DacDiemKhachHangTenDacDiem = data.DM_DacDiemKhachHangTenDacDiem,
		//		DM_LienHeMaLienHe = data.DM_LienHeMaLienHe
		//	};
		//	return PartialView("_ViewTheKhachHangModal", model);
		//}

		//[AbpMvcAuthorize(new string[] { "Pages.TheKhachHangs.Create", "Pages.TheKhachHangs.Edit" })]
		//public PartialViewResult DM_NhomTheLookupTableModal(Guid? id, string displayName)
		//{
		//	DM_NhomTheLookupTableViewModel viewModel = new DM_NhomTheLookupTableViewModel
		//	{
		//		Id = id.ToString(),
		//		DisplayName = displayName,
		//		FilterText = ""
		//	};
		//	return PartialView("_DM_NhomTheLookupTableModal", viewModel);
		//}

		//[AbpMvcAuthorize(new string[] { "Pages.TheKhachHangs.Create", "Pages.TheKhachHangs.Edit" })]
		//public PartialViewResult DM_TienTeLookupTableModal(Guid? id, string displayName)
		//{
		//	DM_TienTeLookupTableViewModel viewModel = new DM_TienTeLookupTableViewModel
		//	{
		//		Id = id.ToString(),
		//		DisplayName = displayName,
		//		FilterText = ""
		//	};
		//	return PartialView("_DM_TienTeLookupTableModal", viewModel);
		//}

		//[AbpMvcAuthorize(new string[] { "Pages.TheKhachHangs.Create", "Pages.TheKhachHangs.Edit" })]
		//public PartialViewResult UserLookupTableModal(long? id, string displayName)
		//{
		//	UserLookupTableViewModel viewModel = new UserLookupTableViewModel
		//	{
		//		Id = id,
		//		DisplayName = displayName,
		//		FilterText = ""
		//	};
		//	return PartialView("_UserLookupTableModal", viewModel);
		//}

		//[AbpMvcAuthorize(new string[] { "Pages.TheKhachHangs.Create", "Pages.TheKhachHangs.Edit" })]
		//public PartialViewResult OrganizationUnitLookupTableModal(long? id, string displayName)
		//{
		//	OrganizationUnitLookupTableViewModel viewModel = new OrganizationUnitLookupTableViewModel
		//	{
		//		Id = id,
		//		DisplayName = displayName,
		//		FilterText = ""
		//	};
		//	return PartialView("_OrganizationUnitLookupTableModal", viewModel);
		//}

		//[AbpMvcAuthorize(new string[] { "Pages.TheKhachHangs.Create", "Pages.TheKhachHangs.Edit" })]
		//public PartialViewResult DM_DacDiemKhachHangLookupTableModal(Guid? id, string displayName)
		//{
		//	DM_DacDiemKhachHangLookupTableViewModel viewModel = new DM_DacDiemKhachHangLookupTableViewModel
		//	{
		//		Id = id.ToString(),
		//		DisplayName = displayName,
		//		FilterText = ""
		//	};
		//	return PartialView("_DM_DacDiemKhachHangLookupTableModal", viewModel);
		//}

		//[AbpMvcAuthorize(new string[] { "Pages.TheKhachHangs.Create", "Pages.TheKhachHangs.Edit" })]
		//public PartialViewResult DM_LienHeLookupTableModal(Guid? id, string displayName)
		//{
		//	DM_LienHeLookupTableViewModel viewModel = new DM_LienHeLookupTableViewModel
		//	{
		//		Id = id.ToString(),
		//		DisplayName = displayName,
		//		FilterText = ""
		//	};
		//	return PartialView("_DM_LienHeLookupTableModal", viewModel);
		//}

		//[AbpMvcAuthorize(new string[] { "Pages.TheKhachHangs.Create", "Pages.TheKhachHangs.Edit" })]
		//public PartialViewResult DM_KhuyenMaiLookupTableModal(Guid? id, string displayName)
		//{
		//	DM_KhuyenMaiLookupTableViewModel viewModel = new DM_KhuyenMaiLookupTableViewModel
		//	{
		//		Id = id.ToString(),
		//		DisplayName = displayName,
		//		FilterText = ""
		//	};
		//	return PartialView("_DM_KhuyenMaiLookupTableModal", viewModel);
		//}

		//[AbpMvcAuthorize(new string[] { "Pages.TheKhachHangs.Create", "Pages.TheKhachHangs.Edit" })]
		//public PartialViewResult GetTheHuyLookupTableModal(Guid? id, string displayName)
		//{
		//	TheKhachHangLookupTableViewModel viewModel = new TheKhachHangLookupTableViewModel
		//	{
		//		Id = id.ToString(),
		//		DisplayName = displayName,
		//		FilterText = ""
		//	};
		//	return PartialView("_TheHuyLookupTableModal", viewModel);
		//}
	}

}
