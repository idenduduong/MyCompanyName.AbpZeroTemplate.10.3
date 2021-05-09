using System;
using System.Threading.Tasks;
using Abp.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyCompanyName.AbpZeroTemplate.Web.Areas.AppAreaName.Models.DM_NhomDoiTuongs;
using MyCompanyName.AbpZeroTemplate.Web.Controllers;
using MyCompanyName.AbpZeroTemplate.Authorization;
using MyCompanyName.AbpZeroTemplate.MyCompanyName.AbpZeroTemplate.DM_NhomDoiTuongs;
using MyCompanyName.AbpZeroTemplate.MyCompanyName.AbpZeroTemplate.DM_NhomDoiTuongs.Dtos;
using Abp.Application.Services.Dto;
using Abp.Extensions;

namespace MyCompanyName.AbpZeroTemplate.Web.Areas.AppAreaName.Controllers
{
    [Area("AppAreaName")]
    [AbpMvcAuthorize(AppPermissions.Pages_DM_NhomDoiTuongs)]
    public class DM_NhomDoiTuongsController : AbpZeroTemplateControllerBase
    {
        private readonly IDM_NhomDoiTuongsAppService _dM_NhomDoiTuongsAppService;

        public DM_NhomDoiTuongsController(IDM_NhomDoiTuongsAppService dM_NhomDoiTuongsAppService)
        {
            _dM_NhomDoiTuongsAppService = dM_NhomDoiTuongsAppService;

        }

        public ActionResult Index()
        {
            //datdd
            //var model = new DM_NhomDoiTuongsViewModel
            //{
            //    //FilterText = ""
            //};

            //return View();
            return View();
        }

        [AbpMvcAuthorize(AppPermissions.Pages_DM_NhomDoiTuongs_Create, AppPermissions.Pages_DM_NhomDoiTuongs_Edit)]
        public async Task<PartialViewResult> CreateOrEditModal(Guid? id)
        {
            GetDM_NhomDoiTuongsForEditOutput getDM_NhomDoiTuongsForEditOutput;

            if (id.HasValue)
            {
                getDM_NhomDoiTuongsForEditOutput = await _dM_NhomDoiTuongsAppService.GetDM_NhomDoiTuongsForEdit(new EntityDto<Guid> { Id = (Guid)id });
            }
            else
            {
                getDM_NhomDoiTuongsForEditOutput = new GetDM_NhomDoiTuongsForEditOutput
                {
                    DM_NhomDoiTuongs = new CreateOrEditDM_NhomDoiTuongsDto()
                };
                getDM_NhomDoiTuongsForEditOutput.DM_NhomDoiTuongs.NgayTao = DateTime.Now;
                getDM_NhomDoiTuongsForEditOutput.DM_NhomDoiTuongs.NgaySuaCuoi = DateTime.Now;
                getDM_NhomDoiTuongsForEditOutput.DM_NhomDoiTuongs.CreationTime = DateTime.Now;
                getDM_NhomDoiTuongsForEditOutput.DM_NhomDoiTuongs.LastModificationTime = DateTime.Now;
                getDM_NhomDoiTuongsForEditOutput.DM_NhomDoiTuongs.DeletionTime = DateTime.Now;
            }

            var viewModel = new CreateOrEditDM_NhomDoiTuongsModalViewModel()
            {
                DM_NhomDoiTuongs = getDM_NhomDoiTuongsForEditOutput.DM_NhomDoiTuongs,

            };

            return PartialView("_CreateOrEditModal", viewModel);
        }

        public async Task<PartialViewResult> ViewDM_NhomDoiTuongsModal(Guid id)
        {
            var getDM_NhomDoiTuongsForViewDto = await _dM_NhomDoiTuongsAppService.GetDM_NhomDoiTuongsForView(id);

            var model = new DM_NhomDoiTuongsViewModel()
            {
                DM_NhomDoiTuongs = getDM_NhomDoiTuongsForViewDto.DM_NhomDoiTuongs
            };

            return PartialView("_ViewDM_NhomDoiTuongsModal", model);
        }

    }
}