using Abp.Application.Services.Dto;
using Abp.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyCompanyName.AbpZeroTemplate.Authorization;
using MyCompanyName.AbpZeroTemplate.crmdemo.Categories;
using MyCompanyName.AbpZeroTemplate.crmdemo.Categories.Dtos;
using MyCompanyName.AbpZeroTemplate.Web.Areas.qlnv.Models.DM_TinhThanhs;
using MyCompanyName.AbpZeroTemplate.Web.Controllers;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace MyCompanyName.AbpZeroTemplate.Web.Areas.qlnv.Controllers
{
    [Area("qlnv")]
    [AbpAuthorize(AppPermissions.Pages_Administration_DM_TinhThanhs)]
    public class DM_TinhThanhsController : AbpZeroTemplateControllerBase
    {
        private readonly IDM_TinhThanhsAppService _dM_TinhThanhsAppService;

        public DM_TinhThanhsController(IDM_TinhThanhsAppService dM_TinhThanhsAppService)
        {
            _dM_TinhThanhsAppService = dM_TinhThanhsAppService;
        }

        public ActionResult Index()
        {
            DM_TinhThanhsViewModel model = new DM_TinhThanhsViewModel
            {
                FilterText = string.Empty
            };
            return View(model);
        }

        [AbpAuthorize(AppPermissions.Pages_Administration_DM_TinhThanhs_Create, AppPermissions.Pages_Administration_DM_TinhThanhs_Edit)]
        public async Task<PartialViewResult> CreateOrEditModal(Guid? id)
        {
            GetDM_TinhThanhForEditOutput getDM_TinhThanhForEditOutput = (
                !id.HasValue ?
                new GetDM_TinhThanhForEditOutput { DM_TinhThanh = new CreateOrEditDM_TinhThanhDto() } :
                await _dM_TinhThanhsAppService.GetDM_TinhThanhForEdit(new EntityDto<Guid> { Id = id.Value })
            );
            CreateOrEditDM_TinhThanhModalViewModel viewModel = new CreateOrEditDM_TinhThanhModalViewModel
            {
                DM_TinhThanh = getDM_TinhThanhForEditOutput.DM_TinhThanh,
                DM_QuocGiaTenNuoc = getDM_TinhThanhForEditOutput.DM_QuocGiaTenNuoc,
                DM_VungMienTenVung = getDM_TinhThanhForEditOutput.DM_VungMienTenVung
            };
            return PartialView("_CreateOrEditModal", viewModel);
        }

        public PartialViewResult ViewDM_TinhThanhModal(GetDM_TinhThanhForView data)
        {
            DM_TinhThanhViewModel model = new DM_TinhThanhViewModel
            {
                DM_TinhThanh = data.DM_TinhThanh,
                DM_QuocGiaTenNuoc = data.DM_QuocGiaTenNuoc,
                DM_VungMienTenVung = data.DM_VungMienTenVung
            };
            return PartialView("_ViewDM_TinhThanhModal", model);
        }

        [AbpAuthorize(AppPermissions.Pages_Administration_DM_TinhThanhs_Create, AppPermissions.Pages_Administration_DM_TinhThanhs_Edit)]
        public PartialViewResult DM_QuocGiaLookupTableModal(Guid? id, string displayName)
        {
            DM_QuocGiaLookupTableViewModel viewModel = new DM_QuocGiaLookupTableViewModel
            {
                Id = id.ToString(),
                DisplayName = displayName,
                FilterText = string.Empty
            };
            return PartialView("_DM_QuocGiaLookupTableModal", viewModel);
        }

        [AbpAuthorize(AppPermissions.Pages_Administration_DM_TinhThanhs_Create, AppPermissions.Pages_Administration_DM_TinhThanhs_Edit)]
        public PartialViewResult DM_VungMienLookupTableModal(Guid? id, string displayName)
        {
            DM_VungMienLookupTableViewModel viewModel = new DM_VungMienLookupTableViewModel
            {
                Id = id.ToString(),
                DisplayName = displayName,
                FilterText = string.Empty
            };
            return PartialView("_DM_VungMienLookupTableModal", viewModel);
        }
    }
}
