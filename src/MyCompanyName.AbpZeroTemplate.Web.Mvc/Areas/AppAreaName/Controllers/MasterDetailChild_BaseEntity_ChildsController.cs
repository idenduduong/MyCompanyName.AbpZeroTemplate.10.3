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
    public class MasterDetailChild_BaseEntity_ChildsController : AbpZeroTemplateControllerBase
    {
        private readonly IChildsAppService _childsAppService;

        public MasterDetailChild_BaseEntity_ChildsController(IChildsAppService childsAppService)
        {
            _childsAppService = childsAppService;
        }

        public ActionResult Index(int baseEntityId)
        {
            var model = new MasterDetailChild_BaseEntity_ChildsViewModel
            {
                FilterText = "",
                BaseEntityId = baseEntityId
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

            var viewModel = new MasterDetailChild_BaseEntity_CreateOrEditChildModalViewModel()
            {
                Child = getChildForEditOutput.Child,
                UserName = getChildForEditOutput.UserName,
            };

            return PartialView("_CreateOrEditModal", viewModel);
        }

        public async Task<PartialViewResult> ViewChildModal(int id)
        {
            var getChildForViewDto = await _childsAppService.GetChildForView(id);

            var model = new MasterDetailChild_BaseEntity_ChildViewModel()
            {
                Child = getChildForViewDto.Child
                ,
                UserName = getChildForViewDto.UserName

            };

            return PartialView("_ViewChildModal", model);
        }

        [AbpMvcAuthorize(AppPermissions.Pages_Childs_Create, AppPermissions.Pages_Childs_Edit)]
        public PartialViewResult UserLookupTableModal(long? id, string displayName)
        {
            var viewModel = new MasterDetailChild_BaseEntity_ChildUserLookupTableViewModel()
            {
                Id = id,
                DisplayName = displayName,
                FilterText = ""
            };

            return PartialView("_ChildUserLookupTableModal", viewModel);
        }
    }
}