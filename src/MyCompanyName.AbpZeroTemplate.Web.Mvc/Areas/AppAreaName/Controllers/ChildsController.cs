using System;
using System.Threading.Tasks;
using Abp.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyCompanyName.AbpZeroTemplate.Web.Areas.AppAreaName.Models.Childs;
using MyCompanyName.AbpZeroTemplate.Web.Controllers;
using MyCompanyName.AbpZeroTemplate.Authorization;
using MyCompanyName.AbpZeroTemplate.ChildNamespace1;
using MyCompanyName.AbpZeroTemplate.ChildNamespace1.Dtos;
using Abp.Application.Services.Dto;
using Abp.Extensions;

namespace MyCompanyName.AbpZeroTemplate.Web.Areas.AppAreaName.Controllers
{
    [Area("AppAreaName")]
    [AbpMvcAuthorize(AppPermissions.Pages_Childs)]
    public class ChildsController : AbpZeroTemplateControllerBase
    {
        private readonly IChildsAppService _childsAppService;

        public ChildsController(IChildsAppService childsAppService)
        {
            _childsAppService = childsAppService;

        }

        public ActionResult Index()
        {
            var model = new ChildsViewModel
            {
                FilterText = ""
            };

            return View(model);
        }

        [AbpMvcAuthorize(AppPermissions.Pages_Childs_Create, AppPermissions.Pages_Childs_Edit)]
        public async Task<PartialViewResult> CreateOrEditModal(int? id)
        {
            GetChildForEditOutput getChildForEditOutput;

            if (id.HasValue)
            {
                getChildForEditOutput = await _childsAppService.GetChildForEdit(new EntityDto { Id = (int)id });
            }
            else
            {
                getChildForEditOutput = new GetChildForEditOutput
                {
                    Child = new CreateOrEditChildDto()
                };
            }

            var viewModel = new CreateOrEditChildModalViewModel()
            {
                Child = getChildForEditOutput.Child,
                BaseEntityBaseProp1 = getChildForEditOutput.BaseEntityBaseProp1,
                UserName = getChildForEditOutput.UserName,

            };

            return PartialView("_CreateOrEditModal", viewModel);
        }

        public async Task<PartialViewResult> ViewChildModal(int id)
        {
            var getChildForViewDto = await _childsAppService.GetChildForView(id);

            var model = new ChildViewModel()
            {
                Child = getChildForViewDto.Child
                ,
                BaseEntityBaseProp1 = getChildForViewDto.BaseEntityBaseProp1

                ,
                UserName = getChildForViewDto.UserName

            };

            return PartialView("_ViewChildModal", model);
        }

        [AbpMvcAuthorize(AppPermissions.Pages_Childs_Create, AppPermissions.Pages_Childs_Edit)]
        public PartialViewResult BaseEntityLookupTableModal(int? id, string displayName)
        {
            var viewModel = new ChildBaseEntityLookupTableViewModel()
            {
                Id = id,
                DisplayName = displayName,
                FilterText = ""
            };

            return PartialView("_ChildBaseEntityLookupTableModal", viewModel);
        }
        [AbpMvcAuthorize(AppPermissions.Pages_Childs_Create, AppPermissions.Pages_Childs_Edit)]
        public PartialViewResult UserLookupTableModal(long? id, string displayName)
        {
            var viewModel = new ChildUserLookupTableViewModel()
            {
                Id = id,
                DisplayName = displayName,
                FilterText = ""
            };

            return PartialView("_ChildUserLookupTableModal", viewModel);
        }

    }
}