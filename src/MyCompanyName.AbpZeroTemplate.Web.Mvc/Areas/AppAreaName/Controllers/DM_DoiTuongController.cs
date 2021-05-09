using System;
using System.Threading.Tasks;
using Abp.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyCompanyName.AbpZeroTemplate.Web.Areas.AppAreaName.Models.DM_DoiTuong;
using MyCompanyName.AbpZeroTemplate.Web.Controllers;
using MyCompanyName.AbpZeroTemplate.Authorization;
using MyCompanyName.AbpZeroTemplate.DM_DoiTuongs;
using MyCompanyName.AbpZeroTemplate.DM_DoiTuongs.Dtos;
using Abp.Application.Services.Dto;
using Abp.Extensions;

namespace MyCompanyName.AbpZeroTemplate.Web.Areas.AppAreaName.Controllers
{
    [Area("AppAreaName")]
    [AbpMvcAuthorize(AppPermissions.Pages_DM_DoiTuong)]
    public class DM_DoiTuongController : AbpZeroTemplateControllerBase
    {
        private readonly IDM_DoiTuongAppService _dM_DoiTuongAppService;

        public DM_DoiTuongController(IDM_DoiTuongAppService dM_DoiTuongAppService)
        {
            _dM_DoiTuongAppService = dM_DoiTuongAppService;

        }

        public ActionResult Index()
        {
            var model = new DM_DoiTuongViewModel
            {
                //FilterText = ""
            };

            return View(model);
        }

        [AbpMvcAuthorize(AppPermissions.Pages_DM_DoiTuong_Create, AppPermissions.Pages_DM_DoiTuong_Edit)]
        public async Task<PartialViewResult> CreateOrEditModal(Guid? id)
        {
            GetDM_DoiTuongForEditOutput getDM_DoiTuongForEditOutput;

            if (id.HasValue)
            {
                getDM_DoiTuongForEditOutput = await _dM_DoiTuongAppService.GetDM_DoiTuongForEdit(new EntityDto<Guid> { Id = (Guid)id });
            }
            else
            {
                getDM_DoiTuongForEditOutput = new GetDM_DoiTuongForEditOutput
                {
                    DM_DoiTuong = new CreateOrEditDM_DoiTuongDto()
                };
                getDM_DoiTuongForEditOutput.DM_DoiTuong.NgaySinh_NgayTLap = DateTime.Now;
                getDM_DoiTuongForEditOutput.DM_DoiTuong.NgayDoiNhom = DateTime.Now;
                getDM_DoiTuongForEditOutput.DM_DoiTuong.NgayCapCMTND_DKKD = DateTime.Now;
                getDM_DoiTuongForEditOutput.DM_DoiTuong.NgayGiaoDichGanNhat = DateTime.Now;
                getDM_DoiTuongForEditOutput.DM_DoiTuong.NgaySuaTrangThai = DateTime.Now;
                getDM_DoiTuongForEditOutput.DM_DoiTuong.CreationTime = DateTime.Now;
                getDM_DoiTuongForEditOutput.DM_DoiTuong.LastModificationTime = DateTime.Now;
                getDM_DoiTuongForEditOutput.DM_DoiTuong.DeletionTime = DateTime.Now;
            }

            var viewModel = new CreateOrEditDM_DoiTuongModalViewModel()
            {
                DM_DoiTuong = getDM_DoiTuongForEditOutput.DM_DoiTuong,

            };

            return PartialView("_CreateOrEditModal", viewModel);
        }

        public async Task<PartialViewResult> ViewDM_DoiTuongModal(Guid id)
        {
            var getDM_DoiTuongForViewDto = await _dM_DoiTuongAppService.GetDM_DoiTuongForView(id);

            var model = new DM_DoiTuongViewModel()
            {
                DM_DoiTuong = getDM_DoiTuongForViewDto.DM_DoiTuong
            };

            return PartialView("_ViewDM_DoiTuongModal", model);
        }

    }
}