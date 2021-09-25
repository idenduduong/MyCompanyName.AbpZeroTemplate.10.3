﻿using Abp.Application.Services.Dto;
using Abp.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyCompanyName.AbpZeroTemplate.Authorization;
using MyCompanyName.AbpZeroTemplate.BDHN;
using MyCompanyName.AbpZeroTemplate.BDHN.Dtos;
using MyCompanyName.AbpZeroTemplate.Web.Areas.qlnv.Models.BuuCuc;
using MyCompanyName.AbpZeroTemplate.Web.Areas.qlnv.Models.DM_QuanHuyens;

using MyCompanyName.AbpZeroTemplate.Web.Controllers;

using System;
using System.Linq;
using System.Threading.Tasks;

namespace MyCompanyName.AbpZeroTemplate.Web.Areas.qlnv.Controllers
{
    [Area("qlnv")]
    public class BuuCucsController : AbpZeroTemplateControllerBase
    {
        private readonly IBuuCucsAppService _buuCucAppService;

        public BuuCucsController(IBuuCucsAppService buuCucAppService)
        {
            _buuCucAppService = buuCucAppService;
        }

        [Area("qlnv")]
        public ActionResult Index()
        {
            BuuCucsViewModel model = new BuuCucsViewModel
            {
                FilterText = string.Empty
            };
            return View(model);
        }

        [AbpMvcAuthorize(AppPermissions.Pages_BuuCucs_Create, AppPermissions.Pages_BuuCucs_Edit)]
        public async Task<PartialViewResult> CreateOrEditModal(Guid? id)
        {
            GetBuuCucForEditOutput getForEditOutput;
            if (id.HasValue)
            {
                getForEditOutput = await _buuCucAppService.GetForEdit(new EntityDto<Guid> { Id = id.Value });
            }
            else
            {
                getForEditOutput = new GetBuuCucForEditOutput
                {
                    BuuCuc = new CreateOrEditBuuCucDto()
                };
            }

            var viewModel = new CreateOrEditBuuCucViewModel()
            {
                BuuCuc = getForEditOutput.BuuCuc,
                OrganizationUnitDisplayName = getForEditOutput.OrganizationUnitDisplayName,

            };

            return PartialView("_CreateOrEditModal", viewModel);
        }
        //public async Task<PartialViewResult> CreateOrEditModal(Guid? id)
        //{
        //    GetBuuCucForEditOutput getEntityForEditOutput;

        //    if (id.HasValue)
        //    {
        //        getEntityForEditOutput = await _buuCucAppService.GetForEdit(new EntityDto<Guid> { Id = id });
        //    }
        //    else
        //    {
        //        getEntityForEditOutput = new GetBuuCucForEditOutput
        //        {
        //            BaseEntity = new CreateOrEditBuuCucDto()
        //        };
        //    }

        //    var viewModel = new CreateOrEditBaseEntityModalViewModel()
        //    {
        //        BaseEntity = getBaseEntityForEditOutput.BaseEntity,
        //        OrganizationUnitDisplayName = getBaseEntityForEditOutput.OrganizationUnitDisplayName,
        //    };

        //    return PartialView("_CreateOrEditModal", null);
        //}

        public PartialViewResult ViewModal(GetBuuCucForViewDto data)
        {
            BuuCucViewModel model = new BuuCucViewModel
            {
                BuuCuc = data.BuuCuc,
                OrganizationUnitDisplayName = data.OrganizationUnitDisplayName
            };
            return PartialView("_ViewModal", model);
        }

        ////[AbpMvcAuthorize(new string[] { "Pages.Categories.Locations.DM_QuanHuyens.Create", "Pages.Categories.Locations.DM_QuanHuyens.Edit" })]
        //public PartialViewResult DM_TinhThanhLookupTableModal(Guid? id, string displayName)
        //{
        //    DM_TinhThanhLookupTableViewModel viewModel = new DM_TinhThanhLookupTableViewModel
        //    {
        //        Id = id.ToString(),
        //        DisplayName = displayName,
        //        FilterText = string.Empty
        //    };
        //    return PartialView("_DM_TinhThanhLookupTableModal", viewModel);
        //}
    }
}