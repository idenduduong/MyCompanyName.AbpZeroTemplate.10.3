using System;
using System.Threading.Tasks;
using Abp.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyCompanyName.AbpZeroTemplate.Web.Areas.AppAreaName.Models.BaseEntities;
using MyCompanyName.AbpZeroTemplate.Web.Controllers;
using MyCompanyName.AbpZeroTemplate.Authorization;
using MyCompanyName.AbpZeroTemplate.BaseNamespace;
using MyCompanyName.AbpZeroTemplate.BaseNamespace.Dtos;
using Abp.Application.Services.Dto;
using Abp.Extensions;

namespace MyCompanyName.AbpZeroTemplate.Web.Areas.AppAreaName.Controllers
{
    [Area("AppAreaName")]
    [AbpMvcAuthorize(AppPermissions.Pages_BaseEntities)]
    public class BaseEntitiesController : AbpZeroTemplateControllerBase
    {
        private readonly IBaseEntitiesAppService _baseEntitiesAppService;

        public BaseEntitiesController(IBaseEntitiesAppService baseEntitiesAppService)
        {
            _baseEntitiesAppService = baseEntitiesAppService;

        }

        public ActionResult Index()
        {
            var model = new BaseEntitiesViewModel
            {
                FilterText = ""
            };

            return View(model);
        }

        [AbpMvcAuthorize(AppPermissions.Pages_BaseEntities_Create, AppPermissions.Pages_BaseEntities_Edit)]
        public async Task<PartialViewResult> CreateOrEditModal(int? id)
        {
            GetBaseEntityForEditOutput getBaseEntityForEditOutput;

            if (id.HasValue)
            {
                getBaseEntityForEditOutput = await _baseEntitiesAppService.GetBaseEntityForEdit(new EntityDto { Id = (int)id });
            }
            else
            {
                getBaseEntityForEditOutput = new GetBaseEntityForEditOutput
                {
                    BaseEntity = new CreateOrEditBaseEntityDto()
                };
            }

            var viewModel = new CreateOrEditBaseEntityModalViewModel()
            {
                BaseEntity = getBaseEntityForEditOutput.BaseEntity,
                OrganizationUnitDisplayName = getBaseEntityForEditOutput.OrganizationUnitDisplayName,

            };

            return PartialView("_CreateOrEditModal", viewModel);
        }

        public async Task<PartialViewResult> ViewBaseEntityModal(int id)
        {
            var getBaseEntityForViewDto = await _baseEntitiesAppService.GetBaseEntityForView(id);

            var model = new BaseEntityViewModel()
            {
                BaseEntity = getBaseEntityForViewDto.BaseEntity
                ,
                OrganizationUnitDisplayName = getBaseEntityForViewDto.OrganizationUnitDisplayName

            };

            return PartialView("_ViewBaseEntityModal", model);
        }

        [AbpMvcAuthorize(AppPermissions.Pages_BaseEntities_Create, AppPermissions.Pages_BaseEntities_Edit)]
        public PartialViewResult OrganizationUnitLookupTableModal(long? id, string displayName)
        {
            var viewModel = new BaseEntityOrganizationUnitLookupTableViewModel()
            {
                Id = id,
                DisplayName = displayName,
                FilterText = ""
            };

            return PartialView("_BaseEntityOrganizationUnitLookupTableModal", viewModel);
        }

    }
}