﻿using Abp.Application.Services.Dto;
using Abp.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyCompanyName.AbpZeroTemplate.Authorization;
using MyCompanyName.AbpZeroTemplate.BDHN;
using MyCompanyName.AbpZeroTemplate.BDHN.Dtos;
using MyCompanyName.AbpZeroTemplate.Web.Areas.qlnv.Models;

using MyCompanyName.AbpZeroTemplate.Web.Controllers;

using System;
using System.Linq;
using System.Threading.Tasks;

namespace MyCompanyName.AbpZeroTemplate.Web.Areas.qlnv.Controllers
{
    [Area("qlnv")]
    public class ToolsController : AbpZeroTemplateControllerBase
    {
        private readonly IToolsAppService _toolAppService;

        public ToolsController(IToolsAppService toolAppService)
        {
            _toolAppService = toolAppService;
        }
        public IActionResult Index()
        {
            return View();
        }

        public async Task<PartialViewResult> CreateOrEditModal(Guid? id)
        {
            GetToolForEditOutput getForEditOutput;
            if (id.HasValue)
            {
                getForEditOutput = await _toolAppService.GetForEdit(new EntityDto<Guid> { Id = id.Value });
            }
            else
            {
                getForEditOutput = new GetToolForEditOutput
                {
                    Tool = new CreateOrEditToolDto()
                };
            }

            var viewModel = new CreateOrEditToolViewModel()
            {
                Tool = getForEditOutput.Tool,
                //PosName = getForEditOutput.,
                //CommuneName = getForEditOutput.CommuneName,
                //UnitName = getForEditOutput.UnitName,
                OrganizationUnitDisplayName = getForEditOutput.OrganizationUnitDisplayName,
            };

            return PartialView("_CreateOrEditModal", viewModel);
        }

        public PartialViewResult ViewModal(GetToolForViewDto data)
        {
            ToolViewModel model = new ToolViewModel
            {
                Tool = data.Tool,
                OrganizationUnitDisplayName = data.OrganizationUnitDisplayName
            };
            return PartialView("_ViewModal", model);
        }

    }
}