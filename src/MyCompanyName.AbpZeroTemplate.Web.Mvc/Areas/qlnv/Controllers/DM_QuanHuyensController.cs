using Abp.Application.Services.Dto;
using Abp.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyCompanyName.AbpZeroTemplate.crmdemo.Categories;
using MyCompanyName.AbpZeroTemplate.crmdemo.Categories.Dtos;
using MyCompanyName.AbpZeroTemplate.Web.Areas.qlnv.Models.DM_QuanHuyens;
using MyCompanyName.AbpZeroTemplate.Web.Controllers;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace MyCompanyName.AbpZeroTemplate.Web.Areas.qlnv.Controllers
{
    [Area("qlnv")]
    //[AbpMvcAuthorize(new string[] { "Pages.Categories.Locations.DM_QuanHuyens" })]
    public class DM_QuanHuyensController : AbpZeroTemplateControllerBase
    {
        private readonly IDM_QuanHuyensAppService _dM_QuanHuyensAppService;

        public DM_QuanHuyensController(IDM_QuanHuyensAppService dM_QuanHuyensAppService)
        {
            _dM_QuanHuyensAppService = dM_QuanHuyensAppService;
        }

        public ActionResult Index()
        {
            DM_QuanHuyensViewModel model = new DM_QuanHuyensViewModel
            {
                FilterText = ""
            };
            return View(model);
        }

        //[AbpMvcAuthorize(new string[] { "Pages.Categories.Locations.DM_QuanHuyens.Create", "Pages.Categories.Locations.DM_QuanHuyens.Edit" })]
        //[AbpMvcAuthorize(apppermissions.)]
        public async Task<PartialViewResult> CreateOrEditModal(Guid? id)
        {
            GetDM_QuanHuyenForEditOutput getDM_QuanHuyenForEditOutput = ((!id.HasValue) ? new GetDM_QuanHuyenForEditOutput
            {
                DM_QuanHuyen = new CreateOrEditDM_QuanHuyenDto()
            } : (await _dM_QuanHuyensAppService.GetDM_QuanHuyenForEdit(new EntityDto<Guid>
            {
                Id = id.Value
            })));
            CreateOrEditDM_QuanHuyenViewModel viewModel = new CreateOrEditDM_QuanHuyenViewModel
            {
                DM_QuanHuyen = getDM_QuanHuyenForEditOutput.DM_QuanHuyen,
                DM_TinhThanhTenTinhThanh = getDM_QuanHuyenForEditOutput.DM_TinhThanhTenTinhThanh
            };
            return PartialView("_CreateOrEditModal", viewModel);
        }

        public PartialViewResult ViewDM_QuanHuyenModal(GetDM_QuanHuyenForView data)
        {
            DM_QuanHuyenViewModel model = new DM_QuanHuyenViewModel
            {
                DM_QuanHuyen = data.DM_QuanHuyen,
                DM_TinhThanhTenTinhThanh = data.DM_TinhThanhTenTinhThanh
            };
            return PartialView("_ViewDM_QuanHuyenModal", model);
        }

        //[AbpMvcAuthorize(new string[] { "Pages.Categories.Locations.DM_QuanHuyens.Create", "Pages.Categories.Locations.DM_QuanHuyens.Edit" })]
        public PartialViewResult DM_TinhThanhLookupTableModal(Guid? id, string displayName)
        {
            DM_TinhThanhLookupTableViewModel viewModel = new DM_TinhThanhLookupTableViewModel
            {
                Id = id.ToString(),
                DisplayName = displayName,
                FilterText = ""
            };
            return PartialView("_DM_TinhThanhLookupTableModal", viewModel);
        }
    }
}
