using Abp.Application.Services.Dto;
using Abp.AspNetCore.Mvc.Authorization;
using Abp.Domain.Uow;
using Microsoft.AspNetCore.Mvc;
using MyCompanyName.AbpZeroTemplate.Authorization;
using MyCompanyName.AbpZeroTemplate.BaseNamespace;
using MyCompanyName.AbpZeroTemplate.BaseNamespace.Dtos;
using MyCompanyName.AbpZeroTemplate.Web.Areas.qlnv.Models.BaseEntities;
using MyCompanyName.AbpZeroTemplate.Web.Controllers;
using System;
using System.Threading.Tasks;

namespace MyCompanyName.AbpZeroTemplate.Web.Areas.qlnv.Controllers
{
    [Area("qlnv")]
    [AbpMvcAuthorize(AppPermissions.Pages_BaseEntities)]
    public class BaseEntitiesController : AbpZeroTemplateControllerBase //AbpZeroTemplateControllerBase AbpZeroTemplateFilterControllerBase 
    {
        private readonly IBaseEntitiesAppService _baseEntitiesAppService;
        private readonly IUnitOfWorkManager _unitOfWorkManager;

        public BaseEntitiesController(IBaseEntitiesAppService baseEntitiesAppService, IUnitOfWorkManager unitOfWorkManager)
        {
            _baseEntitiesAppService = baseEntitiesAppService;
            _unitOfWorkManager = unitOfWorkManager;
        }

        //[AbpMvcAuthorize(AppPermissions.Pages_BaseEntities_Create, AppPermissions.Pages_BaseEntities_Edit)]
        public ActionResult Index()
        {
            //if (IsGranted("Disable.Filter.MayHaveOrganizationUnit"))
            //{
            //    //_unitOfWorkManager.Current.DisableFilter("MayHaveOrganizationUnit");
            //    bool IsOUFilterEnabled = _unitOfWorkManager.Current.IsFilterEnabled("MayHaveOrganizationUnit");
            //    using (_unitOfWorkManager.Current.DisableFilter("MayHaveOrganizationUnit"))
            //    {
            //        var model = new BaseEntitiesViewModel { FilterText = string.Empty };
            //        return View(model);
            //    }
            //}

            if (IsGranted("Disable.Filter.OrganizationUnit"))
            {
                //CurrentUnitOfWork.SetFilterParameter("MayHaveOrganizationUnit", "CurrentOUId", "1");
                //_unitOfWorkManager.Current.DisableFilter("MayHaveOrganizationUnit")
                bool IsOUFilterEnabled = _unitOfWorkManager.Current.IsFilterEnabled("MayHaveOrganizationUnit");
                using (_unitOfWorkManager.Current.DisableFilter("MayHaveOrganizationUnit"))
                {
                    IsOUFilterEnabled = _unitOfWorkManager.Current.IsFilterEnabled("MayHaveOrganizationUnit");
                    var model = new BaseEntitiesViewModel
                    {
                        FilterText = string.Empty
                    };
                    return View(model);
                }
            }
            else
            {
                var model = new BaseEntitiesViewModel
                {
                    FilterText = string.Empty
                };
                return View(model);
            }
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
                BaseEntity = getBaseEntityForViewDto.BaseEntity,
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
                FilterText = string.Empty
            };

            return PartialView("_BaseEntityOrganizationUnitLookupTableModal", viewModel);
        }

    }
}